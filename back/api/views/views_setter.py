import json

from django.http.response import JsonResponse
from django.contrib.auth.models import User

from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from api.models import Category, Product
from api.serializers import CategorySerializer, ProductSerializer, NewsSerializer, ImageSerializer, UserSerializer

import pandas as pd
import random


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
    return JsonResponse({'Message': 'All good'})


def delete_categories(request):
    categories = Category.objects.all()
    for category in categories:
        category.delete()
    return JsonResponse({'Message': 'Deleted'})


def set_products(request):
    # dates = pd.read_csv('D:\Programming\PpP\web\cat.csv')
    dates = pd.read_csv(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vSgzUi6BNlGD2U6RmJcvT2kiszysNj9WISt746Jo67wtwD2DVJb-Iuwrkj6hL6bgDU1KotRaOS_IJL3/pub?gid=1763850928&single=true&output=csv')

    name = dates['name'].values
    price = dates['price'].values
    description = dates['description'].values
    rating = [random.randint(1, 10) for i in range(len(name))]
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
    return JsonResponse({'Message': 'Good'})


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


def set_images(request):
    dates = pd.read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vSgzUi6BNlGD2U6RmJcvT2kiszysNj9WISt746Jo67wtwD2DVJb-Iuwrkj6hL6bgDU1KotRaOS_IJL3/pub?gid=1053381469&single=true&output=csv')

    first = dates['first']
    second = dates['second']
    third = dates['third']

    urls = [first, second, third]

    id = 46

    for i in range(len(first)):
        id += 1
        for j in range(3):
            if type(urls[j][i]) != type(''): continue
            di = {'url': urls[j][i], 'product_id': id}
            serializer = ImageSerializer(data=di)
            if serializer.is_valid():
                serializer.save()
                print('Good')
            else:
                print('Bad')
                return JsonResponse(serializer.errors)

    return JsonResponse({'Message': 'All good'})


def delete_all_categories(request):
    categories = Category.objects.all()
    for category in categories:
        category.delete()
    return JsonResponse({'Message': 'Deleted'})
