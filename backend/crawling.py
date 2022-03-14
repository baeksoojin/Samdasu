#bs를 활용해서 text형태의 data에서 원하는 형태의 html태그를 추출
from bs4 import BeautifulSoup as bs
#selenium을 사용해서 동적 크롤링을 진행.
#selenium을 통한 크롤링
from selenium.webdriver.common.by import By
# selenium webdriver 설정
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
#문자열 조작을 위해 re 불러오기
import re
# manage.py에서처럼 django 모델을 사용하기 위해서 세팅을 진행.
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
## 이제 장고를 가져와 장고 프로젝트를 사용할 수 있도록 환경을 만듭니다.
import django
django.setup()
# setting 진행후 Foods에서 Food 모델을 사용해서 mysql db에 데이터 저장.
from Foods.models import Food


# 스크롤을 내리면서 2초간 작ㄷ
def infinite_scroll(driver):
    SCROLL_PAUSE_TIME = 2

    last_height = driver.execute_script("return document.body.scrollHeight")

    while True:
        # Scroll down to bottom                                                    
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Wait to load page
        time.sleep(SCROLL_PAUSE_TIME)                                                
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight-50);")  
        time.sleep(SCROLL_PAUSE_TIME)

        # Calculate new scroll height and compare with last scroll height           
        new_height = driver.execute_script("return document.body.scrollHeight")

        if new_height == last_height: break

        last_height = new_height


def set_chrome_driver():
    #크롬드라이버를 버전에 맞춰주기.
    chrome_options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    return driver

def TLJ():

    #1. 뚜레쥬르
    image_base = 'https://www.tlj.co.kr:7008'
    url = 'https://www.tlj.co.kr:7008/product/list.asp?ref=2'

    driver = set_chrome_driver()
    driver.get(url)

    # # 무한 스크롤을 하며 크롤링을 위해 infinite_scroll함수를 적용.
    infinite_scroll(driver)

    
    # #스크롤해온 html source code를 가져옴.
    html = driver.page_source #request.text대신 사용
    soup = bs(html, 'html.parser')
    
    #name, image_url, allergy 뽑아내기.
    breads = soup.select("div.product_list2>ul>li>a>span.img>img")
    print(breads)
    #값을 저장할 dictionary를 만듦.
    dict={}
    # name, image_url, allergy 정보를 담을 예정.
    name=[]
    image_url =[]
    allergy = []
    
    
    # name, url을 뽑아내는 코드를 작성.
    for i in breads:
        # print("이름:  ",i.get('alt'))
        name.append(i.get('alt'))
        # print("이미지: ",image_base,i.get('src'))
        image_temp = image_base+(i.get('src'))
        image_url.append(image_temp.strip(" "))
        # print(i,"\n\n")
    dict['name'] = name
    dict['image_url'] = image_url
    

    links = soup.select("div.product_list2>ul>li>span.over>span.btn_more2>a")


    for i in links:
        i = i.get('href')
        link_num = re.sub(r'[^0-9]', '', str(i))
        link_num = int(link_num)
        driver.execute_script('viewDetail(%d)' %link_num)
        print(link_num)
        try:
            select2 = driver.find_element(By.CSS_SELECTOR, '#content > div > div > ul > li > div.right_area > div.table_nutrition > table > tbody > tr.is-allergy > td')
            allergy.append(select2.text)
        except:
            allergy.append('nan')
        #  3925 일때, 예외가 발생. 또 알레르기 성분이 없는 제품이 있을 수 있으니, 예외처리.
        
        time.sleep(1)


    dict['allergy'] = allergy
    return dict
    

def Bread():

    restaurant = {}
    restaurant['뚜레주르'] = TLJ()

    bread_info = restaurant

    # mysql table을 하나 만들어서 저장시키기.
    print(bread_info)

    for i in range(0,len(bread_info['뚜레주르']['name'])):
        print(bread_info['뚜레주르']['name'][i])
        print(bread_info['뚜레주르']['image_url'][i])
        print(bread_info['뚜레주르']['allergy'][i])
        Food(restaurant = '뚜레주르', 
        name = bread_info['뚜레주르']['name'][i],
        image_url = bread_info['뚜레주르']['image_url'][i],
        allergy = bread_info['뚜레주르']['allergy'][i]).save()

    
Bread()