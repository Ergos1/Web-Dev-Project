from django.contrib import admin
from django.urls import path, include
from api.views import category_list, product_list, product_detail, set_categories, \
    delete_categories, NewsList, ImageList, set_products, set_news

urlpatterns = [
    path('categories/', category_list),
    path('products/', product_list),
    path('products/<int:product_id>/', product_detail),
    path('news/', NewsList.as_view()),
    path('images/', ImageList.as_view()),
    # path('dosmth/', set_categories),
    # path('dosmth1/', set_products),
    # path('dosmth2/', set_news),
    # path('deletedosmth/', delete_categories)
]
