from asyncio import exceptions
from datetime import datetime
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from backend.settings import SIMPLE_JWT
import json
from django.http import JsonResponse
from base64 import b64decode
# Create your views here.

class UserView(APIView):
    def post(self,request):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        
#{"email":"test.com","pw":"test"}
class UserDataView(APIView):
    def get(self,request):
        
        auth_token = request.headers.get("Authorization", None)
        print(auth_token)
        
      
         # 토큰 값이 아예 안 들어왔을 때 401 코드 처리 및 메시지 출력
        if auth_token == None:
            return JsonResponse({'message':'Enter the token.'}, status=401)


        if not auth_token:
            raise AuthenticationFailed('Unauthenticatied!')
        try:
            temp = auth_token.split('.')
            ptemp = temp[1]+"=="
            payload = b64decode(ptemp)
            payload = payload.decode('utf-8')
            payload = json.loads(payload)
            print(payload)

        except Exception as e:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.filter(id = payload['user_id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

