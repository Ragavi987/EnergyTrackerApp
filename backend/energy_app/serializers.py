from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import EnergyData, CSVUpload

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class EnergyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnergyData
        fields = ['id', 'timestamp', 'consumption']

class CSVUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVUpload
        fields = ['id', 'file', 'uploaded_at', 'processed']
        read_only_fields = ['uploaded_at', 'processed']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)