# Samdasu
Description : Food allergy check website for the visually impaired

## 1. 실행방법

#### 서버 실행방법
###### backend
- manage.py와 동일한 위치에서 진행
``` c
python manage.py runserver
```
###### frontend
- src와 동일한 위치에서 진행
 ``` c
run start
```

###### 데이터베이스 모델 저장 및 적용
- manage.py와 동일한 위치에서 진행
``` c
python manage.py makemigrations
python manage.py migrate
```

## 2. 구현현황
#### 홈
<img width="1512" alt="스크린샷 2022-05-15 오전 1 48 09" src="https://user-images.githubusercontent.com/74058047/168441638-061547f4-1a30-4875-a95e-f5f885922d97.png">

#### 회원가입 및 로그인
<img width="1512" alt="스크린샷 2022-05-15 오전 2 06 30" src="https://user-images.githubusercontent.com/74058047/168441719-11fd3856-987c-4fa2-92e2-6d9f5f5ea3cf.png">
<img width="1512" alt="스크린샷 2022-05-15 오전 2 06 55" src="https://user-images.githubusercontent.com/74058047/168441720-80fea4d1-1a7c-4c46-b487-ab694552a584.png">

###### api
[회원가입]
<img width="1512" alt="스크린샷 2022-05-15 오전 2 14 50" src="https://user-images.githubusercontent.com/74058047/168442618-8d1a2804-b795-4ec2-b6e9-a79e2968c254.png">
[token생성]
<img width="1512" alt="스크린샷 2022-05-15 오전 2 18 26" src="https://user-images.githubusercontent.com/74058047/168442621-4e8608b9-c06d-4dcf-896b-44cf172e229c.png">
[사용자정보확인]
<img width="1512" alt="스크린샷 2022-05-15 오전 2 19 31" src="https://user-images.githubusercontent.com/74058047/168442625-941d0b0e-5896-4971-b8fa-9eb966c3aa03.png">
[로그아웃]
<img width="1512" alt="스크린샷 2022-05-15 오전 2 33 48" src="https://user-images.githubusercontent.com/74058047/168442651-e1518e5c-e5e0-48e4-ab17-638aa677c89a.png">

#### 웹캠을 통한 알레르기 체크
<img width="1512" alt="스크린샷 2022-05-15 오전 2 02 59" src="https://user-images.githubusercontent.com/74058047/168441592-0bfa781a-6576-4b1b-ba75-cddbe9b6b3ba.png">

###### api
[post]
<img width="1512" alt="스크린샷 2022-05-15 오전 2 47 25" src="https://user-images.githubusercontent.com/74058047/168443125-07226a9f-8b10-4e28-a2d3-0f24c1ca82aa.png">
[get]
<img width="1349" alt="스크린샷 2022-05-15 오전 2 51 51" src="https://user-images.githubusercontent.com/74058047/168443140-44f31caf-90ec-4d34-ac90-4c6f77be9504.png">


### 결과🎖 대상
성균관대학교 사회복지연구소 주관<br>
제 1회 사회복지 더하기 디지털기술 아이디어 공모전 시상식 및 포럼
