from rest_framework import serializers
from api.models import Category, Product, News, Image, Comment
from django.contrib.auth.models import User


class CategorySerializer(serializers.Serializer):  # 1/2 with serializer.Serializer
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=300)
    image_url = serializers.CharField(max_length=10000, required=False)

    def create(self, validated_data):
        category = Category.objects.create(name=validated_data.get('name'),
                                           image_url=validated_data.get('image_url'))
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.image_url = validated_data.get('image_url', instance.image_url)
        instance.save()
        return instance


class ImageSerializerForProduct(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'url')


class CommentSerializerForProduct(serializers.ModelSerializer):
    date = serializers.DateTimeField(read_only=True, format='%H:%M, %d.%m.%Y')

    class Meta:
        model = Comment
        fields = ('id', 'username', 'date', 'text', 'likes')


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.IntegerField()
    image_urls = ImageSerializerForProduct(read_only=True, many=True, source='image_set')
    comments = CommentSerializerForProduct(read_only=True, many=True, source='comment_set')
    likes = serializers.IntegerField(default=0)
    views = serializers.IntegerField(default=0)

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'description', 'rating', 'likes',
                  'views', 'category_id', 'image_urls', 'comments')


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
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.image_url = validated_data.get('image_url', instance.image_url)
        instance.link = validated_data.get('link', instance.link)
        instance.save()
        return instance


class ImageSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()

    class Meta:
        model = Image
        fields = ('id', 'url', 'product_id')


class CommentSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    date = serializers.DateTimeField(read_only=True, format='%H:%M, %d.%m.%Y')
    likes = serializers.IntegerField(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'username', 'date', 'text', 'likes', 'product_id')


class UserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    is_staff = serializers.BooleanField(default=False, read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'is_staff', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
