from django.shortcuts import redirect, render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ImageViewSerializer
from .models import Image
from django.http import Http404
import re

from PIL import Image as Image_pil
import urllib.request
import pytesseract

from user_models.models import User
import json
from django.http import JsonResponse
from base64 import b64decode
from rest_framework.exceptions import AuthenticationFailed

from .kakao_api import kakao_ocr_resize,kakao_ocr


def ocr():
    image_path = '/Users/baeksujin/Desktop/allergy/samdasu/backend/gfg.png'
    app_key = '25c2569db9057649e482e1ba35a1f3a6'

    resize_impath = kakao_ocr_resize(image_path)


    if resize_impath is not None:
        image_path = resize_impath
        print("원본 대신 리사이즈된 이미지를 사용합니다.")
    
    output = kakao_ocr(image_path, app_key).json()
    print(output.keys())
    print(len(output['result']))
    words = ''
    for i in range(0,len(output['result'])):
        print(output['result'][i])
        print(output['result'][i]['recognition_words'])
        print(type(output['result'][i]['recognition_words'][0]))
        words = words+output['result'][i]['recognition_words'][0]

    print(words)
    return words


class ImageView(APIView):
    
    def get(self,request):

        serializer_class = ImageViewSerializer

        img = Image.objects.last()
        url = img.image_url

        #사용자가 찍은 사진을 url을 이용해서 gtg.png로 저장하고 gfg.png를 사용해서 text를 뽑아낼것임. ocr 이용파트 코드는 다음과 같음.
        urllib.request.urlretrieve(url,"gfg.png")
        image_test = Image_pil.open('gfg.png')

        #tesseract => 인식이 잘 안 됨.
        # text = pytesseract.image_to_string(image_test,lang='kor')
        # 글씨를 안 찍을경우->text에 아무것도 추출되지 않은경우 -> 안뜸!

        #사진 찍기 않고 test 
        # text = "마요네즈 우유"
        # => 사진에서 text에 우유와 마요네즈가 찍혀서 잘 ocr기능을 수행해서 text로 우유 마요네즈가 저장됐다고 가정.
        #text변수에 image에서 뽑아낸 text값이 저장됨

        text = ocr()

        img.text = re.split('\n',text)
        
        img.save()

        queryset2 = Image.objects.all()
        serializer_data2 =serializer_class(queryset2,many=True)

        ############## 알레르기 유발성분 체크 코드###########

        # 보유 알러지 / 확인하고 싶은 재료: component => 회원가입시 사용자에게 입력받은 정보.
        auth_token = request.headers.get("Authorization", None)
        print("auth_token :",auth_token)
        
      
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
        print(User.objects.all())
        user = User.objects.filter(id = payload['user_id'])
        dic_user = user.values()[0]
        print(dic_user.keys())
        print(dic_user['allergy'])
        
        user_data= dic_user['allergy']
        

        #알러지 유발 재료 모음 (추후 보충하기)

        check = {"egg": ['달걀','계란', '마요네즈','난백','난황','전란','머랭파우더','레시틴','리베틴','글로불린','오보글로불린','라이소자임','알부민','오브알부민','난백알부민'],
                "milk": ['우유','분유','요구르트','치즈','크림','버터','마가린','유청','피자','푸딩','초콜렛','캐러멜','빵류','카제인','락토알부민','락토글로불린','락토페린','락토즈'],
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
                print(user_data)
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




        

        

    
    