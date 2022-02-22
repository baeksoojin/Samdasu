from django.urls import path,include
from .views import UserView,LoginView,UserDataView,LogoutView
from . import views

urlpatterns = [
    path('user/signup',UserView.as_view(),name='singup'),
    path('user/login',LoginView.as_view(),name='login'),
    path('user/data',UserDataView.as_view(),name='data'),
    path('user/logout',LogoutView.as_view(),name='logout'),


]

