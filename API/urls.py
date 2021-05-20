from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('products/', views.GetProduct, name="GetProduct"),
    path('products/add/', views.AddProduct, name="AddProduct"),
    path('products/<int:id>/', views.ViewProduct, name="ViewProduct"),
    path('products/update/<int:id>/', views.UpdateProduct, name="UpdateProduct"),
    path('products/delete/<int:id>/', views.DeleteProduct, name="DeleteProduct"),

]

