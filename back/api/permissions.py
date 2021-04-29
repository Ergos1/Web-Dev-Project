from rest_framework import permissions


class ProductPermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True

        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class CategoryPermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True

        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class ImagePermissions(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True

        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
