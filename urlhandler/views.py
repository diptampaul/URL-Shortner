from django.shortcuts import render, redirect
from .models import shorturl

#import socket
#from requests import get
import random, string

'''
hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)
public_ip =  get('http://ip-api.com/json').json()['query']
#print('Local IP', local_ip)'''


# Create your views here.
def randomGen():
    return ''.join(random.choice(string.ascii_letters) for _ in range(6))

def short(request):
    if request.method == 'POST':
        all_url = shorturl.objects.all()
        #generate
        original_url = request.POST['wurl']
        generated = False
        short = request.POST['wshort']
        print(short)
        if short != 'keyword':
            check = shorturl.objects.filter(short_query=short)
            ourlCheck = shorturl.objects.filter(original_url=original_url)
            if check:
                #print(check)
                return render(request,'url.htm', {'exhist':check, 'all_url': all_url})
            else:
                if ourlCheck:
                    #print(ourlCheck)
                    shorturl.objects.filter(original_url=original_url).update(short_query=short)
                    return render(request,'url.htm', {'updated_short':short, 'all_url': all_url})
                    generated = True
                else:
                    generated = True
        temp = 0
        while not generated:
            short = randomGen()
            check = shorturl.objects.filter(short_query=short)
            ourlCheck = shorturl.objects.filter(original_url=original_url)
            if check:
                continue
            elif ourlCheck:
                temp = 100
                return render(request,'url.htm', {'exhist':ourlCheck, 'all_url': all_url})
            else:
                generated = True
            

        if not check and temp < 10:
            newurl = shorturl(
                original_url = original_url,
                short_query = short,
            )
            newurl.save()
            return render(request,'url.htm', {'newurl':newurl, 'all_url': all_url})
        else:
            return render(request,'url.htm', {})


    else:
        return redirect('/url/')

def home(request, query=None):
    if not query or query == None:
        all_url = shorturl.objects.all()

        return render(request,'url.htm', {'all_url': all_url})
    else:
        try:
            all_url = shorturl.objects.all()
            #print(query)
            check = shorturl.objects.get(short_query=query)
            #print(check)
            check.visits = check.visits + 1
            check.save()
            url_to_redirect = check.original_url
            return redirect(url_to_redirect)
        except:
            return render(request,'url.htm', {'error':'exception error','all_url': all_url})