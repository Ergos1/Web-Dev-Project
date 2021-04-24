from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token
from django.urls import path, include
from api.views import category_list, product_list, product_detail_get, product_detail_manage, set_categories, \
    delete_categories, NewsList, ImageList, set_products, set_news, set_images, product_list_by_category_id, \
    CategoryDetail, user_by_username, sign_up_user, CommentList, product_by_name

urlpatterns = [
    path('categories/', category_list),
    path('categories/<int:category_id>/', CategoryDetail.as_view()),
    path('categories/<int:category_id>/products/', product_list_by_category_id),

    path('products/', product_list),
    path('products/<int:product_id>/get', product_detail_get),
    path('products/<int:product_id>/manage', product_detail_manage),
    path('products/<str:product_name>/search', product_by_name),

    path('news/', NewsList.as_view()),
    path('images/', ImageList.as_view()),
    path('comments/', CommentList.as_view()),

    path('user/', user_by_username),
    path('sign-up/', sign_up_user),

    path('dosmth/', set_categories),
    path('dosmth1/', set_products),
    # path('dosmth2/', set_news),
    path('deletedosmth/', delete_categories),
    # path('delete/', delete_categories())
    path('set_images/', set_images),

    path('login/', obtain_jwt_token),
    path('verify-token/', verify_jwt_token)
]