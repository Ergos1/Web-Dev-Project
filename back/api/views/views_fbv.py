import json

from django.http.response import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from api.models import Category, Product
from api.serializers import CategorySerializer, ProductSerializer, NewsSerializer


@api_view(['GET', 'POST'])
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
        categories = Product.objects.all()
        serializer = ProductSerializer(categories, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = json.loads(request.body)
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Exception as e:
        return Response({'Message': str(e)})

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductSerializer(instance=product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    elif request.method == 'DELETE':
        product.delete()
        return Response({'Message': 'Deleted'})


import pandas as pd


def set_categories(request):
    dates = pd.read_csv('D:\Programming\PpP\web\cat.csv')

    cate = dates['categories']
    urls = dates['links']

    for i in range(len(cate)):
        di = {'name': cate[i], 'image_url': urls[i]}
        serializer = CategorySerializer(data=di)
        if serializer.is_valid():
            serializer.save()
            print('Good')
        else:
            print('Bad' + str(di))
    return Response({'Message': 'All good'})


def delete_categories(request):
    # 12
    for i in range(1, 13):
        category = Category.objects.get(id=i)
        category.delete()
    return JsonResponse({'Message': "all good"})


def set_products(request):
    dates = pd.read_csv('D:\Programming\PpP\web\cat.csv')

    name = dates['name'].values
    price = dates['price'].values
    description = dates['description'].values
    rating = dates['rating'].values
    likes = dates['likes'].values
    views = dates['views'].values
    category_id = dates['category_id'].values

    for i in range(len(name)):
        di = {'name': name[i], 'price': price[i], 'description': description[i], 'rating': rating[i],
              'likes': likes[i], 'views': views[i], 'category_id': category_id[i]}
        serializer = ProductSerializer(data=di)
        if serializer.is_valid():
            serializer.save()
            print('Good')
        else:
            print('Bad')
            return JsonResponse(serializer.errors)
    return JsonResponse({'Message': 'All good'})


def set_news(request):
    dates = pd.read_csv('D:\Programming\PpP\web\cat.csv')

    title = dates['title']
    description = dates['description']
    image_url = dates['image_url']
    link = dates['link']

    for i in range(len(title)):
        if (type(link[i]) != type('')):
            link[i] = ''
        print(title[i])
        di = {'title': title[i], 'description': description[i], 'image_url': image_url[i], 'link': link[i]}
        serializer = NewsSerializer(data=di)
        if serializer.is_valid():
            serializer.save()
            print('Good')
        else:
            print('Bad')
            return JsonResponse(serializer.errors)
    return JsonResponse({'Message': 'All good'})
