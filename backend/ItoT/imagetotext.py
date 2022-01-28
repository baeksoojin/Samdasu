from re import A
from PIL import Image
import pytesseract
import numpy as np
import matplotlib.pyplot as plt


#이미지 text로 변환
pytesseract.pytesseract.tesseract_cmd=R'C:\Program Files\Tesseract-OCR\tesseract' #저장 위치는 따로 설정하기 
str=pytesseract.image_to_string(Image.open('food4.png'),lang='kor') 

result=str.replace(" ","")
print("---------------------------------------식품 원재료 목록-----------------------------------------------------")
print(result)
print("-------------------------------------------분석 결과------------------------------------------------------")
# 보유 알러지 / 확인하고 싶은 재료: component
component='우유'

#알러지 유발 재료 모음 (추후 보충하기)
egg=['달걀','마요네즈','난백','난황','전란','머랭파우더','레시틴','리베틴','글로불린','오보글로불린','라이소자임','알부민','오브알부민','난백알부민']
milk=['우유','분유','요구르트','치즈','크림','버터','마가린','유청','기','피자','푸딩','초콜렛','캐러멜','빵류','카제인','락토알부민','락토글로불린','락토페린','락토즈']
bean=['콩','대두','두유','두유요거트','낫또','미소','간장류','아시아소스','대두육수','소야','소이검','식물성 가수분해 단백질','식물성 조직 단백질']
wheat=['맥아','전분류','각종시럽','세몰리나','쿠스쿠스(세몰리나에 수분을 가해 만든 좁쌀 모양의 파스타','글루텐','글라이아딘','스펠트밀']
nut=['호두','견과','견과류','아몬드','캐슈넛','헤이즐넛','브라질넛','피칸','너트류','그래놀라바','샐러드드레싱','낙화생','낙화생유']
shellfish=['굴','홍합','전복','대합','한치','새조개','가리비','문어']
crustacean=['게','새우','가재']

#알러지 유발 성분 유무 확인
if component in egg:
    if component in result:
        print("고객님이 설정하신 달걀 알러지 유발 물질이 존재합니다.")
    else:
        print("고객님이 설정하신 달걀 알러지 유발 물질은 존재하지 않습니다. 혹시 모르니 추가 위험 성분도 확인하실래요?") 
if component in milk:
    if component in result:
        print("고객님이 설정하신 우유 알러지 유발 물질이 존재합니다.")
    else:
        print("고객님이 설정하신 우유 알러지 유발 물질은 존재하지 않습니다. 혹시 모르니 추가 위험 성분도 확인하실래요?") 
if component in bean:
    if component in result:
        print("고객님이 설정하신 콩 알러지 유발 물질이 존재합니다.")
    else:
        print("고객님이 설정하신 콩 알러지 유발 물질은 존재하지 않습니다. 혹시 모르니 추가 위험 성분도 확인하실래요?")

if component in wheat:
    if component in result:
        print("고객님이 설정하신 밀가루 알러지 유발 물질이 존재합니다.")
    else:
        print("고객님이 설정하신 밀가루 알러지 유발 물질은 존재하지 않습니다. 혹시 모르니 추가 위험 성분도 확인하실래요?")
if component in nut:
    if component in result:
        print("고객님이 설정하신 견과류 알러지 유발 물질이 존재합니다.")
    else:
        print("고객님이 설정하신 견과류 알러지 유발 물질은 존재하지 않습니다. 혹시 모르니 추가 위험 성분도 확인하실래요?")
if component in shellfish:
    if component in result:
        print("고객님이 설정하신 갑각류 알러지 유발 물질이 존재합니다.")
    else:
        print("고객님이 설정하신 갑각류 알러지 유발 물질은 존재하지 않습니다. 혹시 모르니 추가 위험 성분도 확인하실래요?")


