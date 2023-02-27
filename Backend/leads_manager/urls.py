from django.contrib import admin
from django.urls import path,include
from django.views.generic import TemplateView  


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('leads.urls')),
    path('',include('accounts.urls')),
    path('',TemplateView.as_view(template_name='index.html')),
    path('login',TemplateView.as_view(template_name='index.html')),
    path('register',TemplateView.as_view(template_name='index.html')),
]
