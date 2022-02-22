from django.shortcuts import redirect, render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ImageViewSerializer
from .models import Image
from django.http import Http404
import re
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

        pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/Cellar/tesseract/5.0.1/bin/tesseract'

        img = Image.objects.last()
        url = img.image_url

        #사용자가 찍은 사진을 url을 이용해서 gtg.png로 저장하고 gfg.png를 사용해서 text를 뽑아낼것임. ocr 이용파트 코드는 다음과 같음.
        urllib.request.urlretrieve(url,"gfg.png")
        image_test = Image_pil.open('gfg.png')
        text = pytesseract.image_to_string(image_test,lang='kor') 
        print("text:"+text)
        #text변수에 image에서 뽑아낸 text값이 저장됨
        text = text.replace(" ","")
        img.text = re.split('\n',text)
        
        img.save()

        queryset2 = Image.objects.all()
        serializer_data2 =serializer_class(queryset2,many=True)

        ############## 알레르기 유발성분 체크 코드###########

        # 보유 알러지 / 확인하고 싶은 재료: component => 회원가입시 사용자에게 입력받은 정보.
        user_data=["egg","milk"]
        #test
        #text = "우유 마요네즈"

        #알러지 유발 재료 모음 (추후 보충하기)

        check = {"egg": ['달걀','계란', '마요네즈','난백','난황','전란','머랭파우더','레시틴','리베틴','글로불린','오보글로불린','라이소자임','알부민','오브알부민','난백알부민'],
                "milk": ['우유','분유','요구르트','치즈','크림','버터','마가린','유청','기','피자','푸딩','초콜렛','캐러멜','빵류','카제인','락토알부민','락토글로불린','락토페린','락토즈'],
                "bean": ['콩','대두','두유','두유요거트','낫또','미소','간장류','아시아소스','대두육수','소야','소이검','식물성 가수분해 단백질','식물성 조직 단백질'],
                "wheat": ['맥아','전분류','각종시럽','세몰리나','쿠스쿠스(세몰리나에 수분을 가해 만든 좁쌀 모양의 파스타','글루텐','글라이아딘','스펠트밀'],
                "nut": ['호두','견과','견과류','아몬드','캐슈넛','헤이즐넛','브라질넛','피칸','너트류','그래놀라바','샐러드드레싱','낙화생','낙화생유'],
                "shellfish": ['굴','홍합','전복','대합','한치','새조개','가리비','문어'],
                "crustacean": ['게','새우','가재']}

        is_Warn = False
        components = []

        print("=================사진에서 보여지는 알레르기 유발 성분을 체크합니다==================")
        for i,j in enumerate(check):
            for case in check[j]:
                if case in text:
                    print(j,"알레르기 유발 성분이 존재합니다.")
                    components.append(j)

        print("음식에 존재하는 알레르기 유발성분 : ",components)


        print("=================사용자의 알레르기 유발 성분 정보와 비교합니다==================")

        user_warn = []

        for i in components:
            if i in user_data:
                is_Warn = True
                user_warn.append(i)
                print("사용자가 체크한 알레르기 항목",i,"이 존재합니다.")

        result = {
            "text": text,
            "check": is_Warn,
            "allergies": components,
            "warn": user_warn,
            "serializer_data": serializer_data2.data
        }

        return Response(result)

    def post(self,request):

        serializer_data = ImageViewSerializer(data = request.data)
        if serializer_data.is_valid():
            serializer_data.save()
            return Response(serializer_data.data, status = status.HTTP_201_CREATED)
        return Response(serializer_data.errors, status = status.HTTP_201_CREATED)




        

        

    
    