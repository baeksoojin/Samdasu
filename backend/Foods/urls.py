from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = "I2W"

urlpatterns = [
    path("", views.FoodView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns) # view.py에서 format 형식을 추가할 수 있음.
