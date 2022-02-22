from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    pw = models.CharField(max_length=100)

    username = None
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
