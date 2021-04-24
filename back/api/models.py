from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import AbstractUser


class Category(models.Model):
    name = models.CharField(max_length=300)
    image_url = models.TextField(default='')

    def __str__(self):
        return f'{self.id} : {self.name}'


class Product(models.Model):
    name = models.CharField(max_length=300)
    price = models.FloatField(default=0)
    description = models.TextField(default='')
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0),
                                                        MaxValueValidator(10)])
    likes = models.IntegerField(default=0)
    views = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=None)


class Image(models.Model):
    url = models.TextField(default='');
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class Comment(models.Model):
    username = models.CharField(max_length=300)
    date = models.DateTimeField(auto_now_add=True, blank=True, )
    text = models.TextField(default='')
    likes = models.IntegerField(default=0)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class News(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField(default='')
    image_url = models.TextField(default='')
    link = models.CharField(max_length=300, blank=True)


# class Cart(models.Models):
    
