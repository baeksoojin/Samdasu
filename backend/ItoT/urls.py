#backend/post/urls.py
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = "I2W"

urlpatterns = [
    path("imageshow/", views.ImageView.as_view(), name="imageshow"),
]

urlpatterns = format_suffix_patterns(urlpatterns)