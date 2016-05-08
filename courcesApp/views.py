from django.shortcuts import HttpResponse
from django.template import loader
# Create your views here.

def index(request):
    template = loader.get_template('index.html')
    context = {

    }
    return HttpResponse(template.render(context, request))

def courses(request):
    template = loader.get_template('courses.html')
    context = {

    }
    return HttpResponse(template.render(context, request))