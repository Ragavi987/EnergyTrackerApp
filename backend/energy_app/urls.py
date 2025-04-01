from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UploadCSVView, EnergyDataView, EnergyStatisticsView

urlpatterns = [
    # Authentication endpoints
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Energy data endpoints
    path('upload-csv/', UploadCSVView.as_view(), name='upload-csv'),
    path('energy-data/', EnergyDataView.as_view(), name='energy-data'),
    path('statistics/', EnergyStatisticsView.as_view(), name='statistics'),
]