from asyncio import exceptions
from datetime import datetime
from django.shortcuts import redirect, render
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User

import jwt, datetime

# Create your views here.

class UserView(APIView):
    def post(self,request):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
        

    
class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        pw = request.data['pw']

        user = User.objects.filter(email = email).first()

        if user is None:
            raise AuthenticationFailed('user not found')
        
        if not user.check_password(pw):
            raise AuthenticationFailed("incorrect password")

        payload = {
            "id": user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()

        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        #'str' object has no attribute 'decode' -> .decode('utf-8')우선 지움

        response = Response()

        response.set_cookie(key='jwt',value=token, httponly=True)
        response.data = {
            "token": token
            
        }

        return response



# {"name": "test", "email": "test.com","pw": "test"} => { "email": "test.com","pw": "test"}

class UserDataView(APIView):
    def get(self,request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticatied!')

        try:
            payload = jwt.decode(token,'secret',algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.filter(id = payload['id']).first()
        serializer = UserSerializer(user)


        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success logout'
        }

        return (response)

