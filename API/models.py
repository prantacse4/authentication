from django.db import models

# Create your models here.


class Product(models.Model):
    product_name = models.CharField(max_length=250)
    product_company = models.CharField(max_length=250)
    product_quantity = models.IntegerField()
    product_price = models.FloatField()


