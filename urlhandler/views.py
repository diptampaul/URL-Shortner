from django.shortcuts import render, redirect
from .models import shorturl

import socket
from requests import get
import random, string


hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)
public_ip = get('http://api.ipify.org/').text
#print('Local IP', local_ip)


# Create your views here.
def randomGen():
    return ''.join(random.choice(string.ascii_letters) for _ in range(6))

def short(request):
    try:
        ip_exhists = shorturl.objects.all().filter(local_ip=public_ip)
    except:
        ip_exhists = None
    if request.method == 'POST':
        #generate
        original_url = request.POST['wurl']
        ip = public_ip
        generated = False
        temp = 0
        while not generated:
            short = randomGen()
            check = shorturl.objects.filter(short_query=short)
            ourlCheck = shorturl.objects.filter(original_url=original_url)
            if check:
                continue
            elif ourlCheck:
                temp = 100
                return render(request,'url.htm', { 'ip':public_ip,'ip_exhists':ip_exhists, 'exhist':ourlCheck})
            else:
                generated = True
            

        if not check and temp < 10:
            newurl = shorturl(
                original_url = original_url,
                short_query = short,
                local_ip = ip,
            )
            newurl.save()
            return render(request,'url.htm', {'newurl':newurl,'ip_exhists':ip_exhists, 'ip':public_ip})
        else:
            return render(request,'url.htm', {'ip_exhists':ip_exhists, 'ip':public_ip})


    else:
        return redirect('/url/')

def home(request, query=None):
    if not query or query == None:
        try:
            ip_exhists = shorturl.objects.all().filter(local_ip=public_ip)
            return render(request,'url.htm', {'ip_exhists':ip_exhists, 'ip':public_ip})
        except:
            ip_exhists = None
            return render(request,'url.htm', {'ip_exhists':ip_exhists, 'ip':public_ip})
    else:
        try:
            #print(query)
            check = shorturl.objects.get(short_query=query)
            #print(check)
            check.visits = check.visits + 1
            check.save()
            url_to_redirect = check.original_url
            return redirect(url_to_redirect)
        except:
            return render(request,'url.htm', {'error':'exception error','ip_exhists':ip_exhists, 'ip':public_ip})