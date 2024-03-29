from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token
from django.urls import path, include
from api.views import *

urlpatterns = [
    path('categories/', category_list),
    path('categories/<int:category_id>/', CategoryDetail.as_view()),
    path('categories/<int:category_id>/products/', product_list_by_category_id),

    path('products/', product_list),
    path('products/<int:product_id>/', product_detail),

    path('news/', NewsList.as_view()),
    path('images/', ImageList.as_view()),
    path('comments/', CommentList.as_view()),

    path('user/<str:username>/', user_by_username),
    path('sign-up/', sign_up_user),

    # path('dosmth/', set_categories),
    # path('dosmth1/', set_products),
    # path('dosmth2/', set_news),
    # path('deletedosmth/', delete_categories),
    # path('delete/', delete_categories())
    # path('set_images/', set_images),

    path('login/', obtain_jwt_token),
    path('verify-token/', verify_jwt_token)
]
