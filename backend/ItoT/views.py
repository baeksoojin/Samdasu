from django.shortcuts import redirect, render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ImageViewSerializer
from .models import Image
from django.http import Http404

import uuid
from django.core.files.base import ContentFile

from PIL import Image as Image_pil
import urllib.request
import pytesseract



class ImageView(APIView):
    
    def get(self,request):

        serializer_class = ImageViewSerializer
        # queryset = Image.objects.all()
        # serializer_data =serializer_class(queryset,many=True)

        img = Image.objects.last()
        url = img.image_url

        #사용자가 찍은 사진을 url을 이용해서 gtg.png로 저장하고 gfg.png를 사용해서 text를 뽑아낼것임. ocr 이용파트 코드는 다음과 같음.
        urllib.request.urlretrieve(url,"gfg.png")
        image_test = Image_pil.open('gfg.png')
        text = pytesseract.image_to_string(image_test) 
        print("text:"+text)
        img.text = text
        img.save()

        queryset2 = Image.objects.all()
        serializer_data2 =serializer_class(queryset2,many=True)


        return Response(serializer_data2.data)

    def post(self,request):

        serializer_data = ImageViewSerializer(data = request.data)
        if serializer_data.is_valid():
            serializer_data.save()
            return Response(serializer_data.data, status = status.HTTP_201_CREATED)
        return Response(serializer_data.errors, status = status.HTTP_201_CREATED)




        

        

    
    