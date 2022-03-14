from django.db import models

class Food(models.Model):
    restaurant = models.CharField(max_length=100, null = False) #음식의 회사를 저장
    name = models.CharField(max_length=100, null = False) #음식의 이름을 저장
    image_url = models.TextField(null = True) #음식의 사진을 보여줄 음식경로 저장
    allergy = models.TextField(null = True) #알레르기 항목들을 넣을때 json을 인코딩 : text로 변환해서 저장.