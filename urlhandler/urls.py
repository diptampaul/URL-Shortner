from django.urls import path
from . import views


urlpatterns = [
    path('',views.home, name='home'),
    path('short', views.short, name='short'),
    path('<str:query>/', views.home, name='home')
]