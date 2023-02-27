from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Lead(models.Model):
    owner= models.ForeignKey(User,related_name="leads",on_delete=models.CASCADE,null=False,blank=False)
    name = models.CharField(max_length=24)
    email=models.EmailField(max_length=40,unique=True)
    message= models.CharField(max_length=500,blank=True)
    created_at= models.DateTimeField(auto_now_add=True)