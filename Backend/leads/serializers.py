from rest_framework import serializers
from .models import *

class LeadSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Lead
        fields= ["id","name","email","message","owner"]


