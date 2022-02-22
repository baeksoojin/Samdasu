from django.db import models

# Create your models here.
class Image(models.Model):
    image_url = models.TextField(max_length=200000, null=True, verbose_name="image_url")
    text = models.CharField(max_length=1000, null=True, verbose_name = "text")
    
    def __str__(self):
        return self.image_url