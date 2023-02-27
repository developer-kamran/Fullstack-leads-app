from .models import *
from .serializers import *
from rest_framework import viewsets,permissions

class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated]
    serializer_class=LeadSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        
    def get_queryset(self):
        return self.request.user.leads.all()