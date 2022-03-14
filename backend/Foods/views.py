from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import FoodViewSerializer
from .models import Food


class FoodView(APIView):

    def get(self,request):

        serializer_class = FoodViewSerializer
        TLJ = Food.objects.filter(restaurant = '뚜레주르')
        serializer_data =serializer_class(TLJ,many=True)

        data = {'Bread' : serializer_data.data}

        return Response(data)

    

    

