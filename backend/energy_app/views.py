# backend/energy_app/views.py
import pandas as pd
from django.db.models import Sum, Avg
from django.db.models.functions import TruncMonth, TruncDay, TruncHour
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from .models import EnergyData, CSVUpload
from .serializers import UserSerializer, EnergyDataSerializer, CSVUploadSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

class UploadCSVView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, format=None):
        serializer = CSVUploadSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            csv_upload = serializer.save()
            
            try:
                # Process the CSV file
                df = pd.read_csv(csv_upload.file.path)
                
                # Validate required columns
                required_columns = ['timestamp', 'consumption']
                if not all(col in df.columns for col in required_columns):
                    return Response(
                        {"error": f"CSV must contain columns: {', '.join(required_columns)}"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Convert timestamp to datetime
                df['timestamp'] = pd.to_datetime(df['timestamp'])
                
                # Create EnergyData objects
                energy_data_objects = []
                for _, row in df.iterrows():
                    energy_data_objects.append(
                        EnergyData(
                            user=request.user,
                            timestamp=row['timestamp'],
                            consumption=row['consumption']
                        )
                    )
                
                # Bulk create
                EnergyData.objects.bulk_create(energy_data_objects)
                
                # Mark as processed
                csv_upload.processed = True
                csv_upload.save()
                
                return Response(
                    {"message": f"Successfully processed {len(energy_data_objects)} records"},
                    status=status.HTTP_201_CREATED
                )
                
            except Exception as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnergyDataView(APIView):
    def get(self, request, format=None):
        period = request.query_params.get('period', 'monthly')
        
        if period == 'monthly':
            data = EnergyData.objects.filter(user=request.user)\
                .annotate(month=TruncMonth('timestamp'))\
                .values('month')\
                .annotate(consumption=Sum('consumption'))\
                .order_by('month')
            
            result = [
                {
                    'name': item['month'].strftime('%b'),
                    'consumption': round(item['consumption'], 2)
                }
                for item in data
            ]
            
        elif period == 'daily':
            data = EnergyData.objects.filter(user=request.user)\
                .annotate(day=TruncDay('timestamp'))\
                .values('day')\
                .annotate(consumption=Sum('consumption'))\
                .order_by('day')
            
            result = [
                {
                    'name': item['day'].strftime('%d %b'),
                    'consumption': round(item['consumption'], 2)
                }
                for item in data
            ]
            
        elif period == 'hourly':
            data = EnergyData.objects.filter(user=request.user)\
                .annotate(hour=TruncHour('timestamp'))\
                .values('hour')\
                .annotate(consumption=Avg('consumption'))\
                .order_by('hour')
            
            result = [
                {
                    'hour': item['hour'].strftime('%H:%M'),
                    'consumption': round(item['consumption'], 2)
                }
                for item in data
            ]
        else:
            return Response(
                {"error": "Invalid period parameter. Use 'monthly', 'daily', or 'hourly'"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return Response(result)

class EnergyStatisticsView(APIView):
    def get(self, request, format=None):
        # Get total consumption
        total = EnergyData.objects.filter(user=request.user).aggregate(total=Sum('consumption'))
        
        # Get daily average
        daily_avg = EnergyData.objects.filter(user=request.user)\
            .annotate(day=TruncDay('timestamp'))\
            .values('day')\
            .annotate(daily_consumption=Sum('consumption'))\
            .aggregate(avg=Avg('daily_consumption'))
        
        # Get peak consumption
        peak = EnergyData.objects.filter(user=request.user).order_by('-consumption').first()
        
        # Calculate estimated cost (example rate of $0.12 per kWh)
        rate = 0.12
        estimated_cost = total['total'] * rate if total['total'] else 0
        
        return Response({
            'total_consumption': round(total['total'], 2) if total['total'] else 0,
            'average_daily': round(daily_avg['avg'], 2) if daily_avg['avg'] else 0,
            'peak_consumption': {
                'value': round(peak.consumption, 2) if peak else 0,
                'timestamp': peak.timestamp if peak else None
            },
            'estimated_cost': round(estimated_cost, 2)
        })