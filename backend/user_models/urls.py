from django.urls import path,include
from .views import UserView,UserDataView
from .views import LogoutAndBlacklistRefreshTokenForUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    path('user/signup',UserView.as_view(),name='singup'),
    # path('user/login',LoginView.as_view(),name='login'),
    path('user/data',UserDataView.as_view(),name='data'),
    # path('user/logout',LogoutView.as_view(),name='logout'),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist')

]

