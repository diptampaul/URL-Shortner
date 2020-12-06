from django.contrib import admin
from .models import shorturl

# Register your models here.
admin.site.register(shorturl)


#Admin Url: http://127.0.0.1:8000/admin/login/?next=/admin/   #Username: admin, #Password: admin