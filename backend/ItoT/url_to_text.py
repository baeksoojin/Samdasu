
# from rest_framework import viewsets
# from .serializers import ImageViewSerializer

# import uuid
# from django.core.files.base import ContentFile

from .models import Image
from PIL import Image as Image_pil
import urllib.request
import pytesseract

def url_to_text():

    pytesseract.pytesseract.tesseract_cmd = r'/opt/homebrew/Cellar/tesseract/5.0.1/bin/tesseract'

    img = Image.objects.last()
    url = img.image_url

    # image를 정적 media에 저장하고 싶을 때 사용할 수 있는 코드. => 이후에 사용자별 데이터를 통해서 영양패턴이나 식습관 개선 등의 알림을 주는 기능을 추가하고 싶을 때 사용가능할 것 같음.
    # image_name = str(uuid.uuid4()) + ".jpeg"
    # img.image = ContentFile(url, image_name)
    # img.save()

    #사용자가 찍은 사진을 url을 이용해서 gtg.png로 저장하고 gfg.png를 사용해서 text를 뽑아낼것임. ocr 이용파트 코드는 다음과 같음.
    urllib.request.urlretrieve(url,"gfg.png")
    image_test = Image_pil.open('gfg.png')
    text = pytesseract.image_to_string(image_test) 
    print("text:"+text)
    img.text = text
    img.save()
