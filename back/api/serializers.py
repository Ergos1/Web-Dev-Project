from rest_framework import serializers
from api.models import Category, Product, News, Image
from django.core.validators import MaxValueValidator, MinValueValidator


class CategorySerializer(serializers.Serializer):  # 1/2 with serializer.Serializer
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=300)
    image_url = serializers.CharField(max_length=10000)

    def create(self, validated_data):
        category = Category.objects.create(name=validated_data.get('name'),
                                           image_url=validated_data.get('image_url'))
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.image_url = validated_data.get('image_url')
        instance.save()
        return instance


class ImageSerializerForProduct(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'url')


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    image_urls = ImageSerializerForProduct(read_only=True, many=True, source='image_set')

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'description', 'rating', 'likes',
                  'views', 'category', 'category_id', 'image_urls')


class NewsSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=300)
    description = serializers.CharField(max_length=10000)
    image_url = serializers.CharField(max_length=10000)
    link = serializers.CharField(max_length=300, allow_blank=True)

    def create(self, validated_data):
        news = News.objects.create(title=validated_data.get('title'),
                                   description=validated_data.get('description'),
                                   image_url=validated_data.get('image_url'),
                                   link=validated_data.get('link')
                                   )
        return news

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title')
        instance.description = validated_data.get('description')
        instance.image_url = validated_data.get('image_url')
        instance.link = validated_data.get('link')
        instance.save()
        return instance


class ImageSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Image
        fields = ('id', 'url', 'product_id', 'product')
