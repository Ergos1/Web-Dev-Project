import json

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from api.models import Category, Product
from api.serializers import CategorySerializer, ProductSerializer, UserSerializer
from api.permissions import ProductPermissions, CategoryPermissions


@api_view(['GET', 'POST'])
@permission_classes([CategoryPermissions])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([ProductPermissions])
def product_list(request):
    if request.method == 'GET':
        category_id = request.GET.get('category_id', 0)#query_params
        if category_id != 0:
            try:
                products = Category.objects.get(id=category_id).product_set.all()
            except Exception as e:
                return Response({"Message": str(e)}, status=status.HTTP_404_NOT_FOUND)
        else:
            products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def product_list_by_category_id(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
    except Exception as e:
        return Response({'Message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        products = category.product_set
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([ProductPermissions])
def product_detail(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Exception as e:
        return Response({'Message': str(e)})

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response({'Message': 'Deleted'}, status=status.HTTP_200_OK)
