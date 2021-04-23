import json

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from api.models import Category, Product
from api.serializers import CategorySerializer, ProductSerializer, UserSerializer


@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


@api_view(['GET', 'POST'])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


@api_view(['GET'])
def product_list_by_category_id(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Exception as e:
        return Response({'Message': str(e)})

    if request.method == 'GET':
        products = category.product_set
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def product_detail_get(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Exception as e:
        return Response({'Message': str(e)})

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def product_detail_manage(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Exception as e:
        return Response({'Message': str(e)})

    if request.method == 'PUT':
        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    elif request.method == 'DELETE':
        product.delete()
        return Response({'Message': 'Deleted'})


@api_view(['GET'])
def product_by_name(request, product_name):
    try:
        product = Product.objects.get(name__iexact=product_name)
    except Exception as e:
        return Response({'Message': str(e)}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
