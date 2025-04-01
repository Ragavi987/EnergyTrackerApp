from django.db import models
from django.contrib.auth.models import User

class EnergyData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='energy_data')
    timestamp = models.DateTimeField()
    consumption = models.FloatField()
    
    class Meta:
        ordering = ['timestamp']

class CSVUpload(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='csv_uploads')
    file = models.FileField(upload_to='csv_uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    processed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"CSV Upload by {self.user.username} at {self.uploaded_at}"