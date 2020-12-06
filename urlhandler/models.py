from django.db import models

# Create your models here.
class shorturl(models.Model):
    original_url = models.URLField(blank=False)
    short_query = models.CharField(blank=False, max_length=15, unique=True)
    visits = models.IntegerField(default=0)
    time_stamp = models.DateTimeField(auto_now=True)
    #local_ip = models.GenericIPAddressField(protocol='both', unpack_ipv4=False, null=False, default='127.0.0.1')