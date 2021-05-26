import json

from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from api.serializers import UserSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_by_username(request, username):
    if request.method == 'GET':
        try:
            user = User.objects.get(username=username)
        except Exception as e:
            return Response({'Message': str(e)}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def sign_up_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'Message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
