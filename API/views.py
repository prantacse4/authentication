from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

#Serializers
from .serializers import ProductSerializer

#Models
from .models import Product

# Create your views here.

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def GetProduct(request):
    products = {}
    if request.method=="GET":
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    else:
        return Response({})

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def AddProduct(request):
    if request.method=="POST":
        serializer = ProductSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({})



@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def ViewProduct(request, id):
    if request.method=="GET":
        try:
            getproduct = Product.objects.get(pk=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(getproduct)
        return Response(serializer.data)
    else:
        return Response({})







@api_view(['PUT'])
# @permission_classes([IsAuthenticated])
def UpdateProduct(request, id):
    if request.method=="PUT":
        try:
            getproduct = Product.objects.get(pk=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(getproduct, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({})




@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
def DeleteProduct(request, id):
    if request.method=="DELETE":
        try:
            getproduct = Product.objects.get(pk=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        getproduct.delete()
        return Response({'Success':"Product Deleted Successfully"})
    else:
        return Response({})
