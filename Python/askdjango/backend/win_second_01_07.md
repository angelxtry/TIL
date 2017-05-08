# windows 01 07 복습

가상환경 시작

`$ myvenv\script\activate.bat`

django project 생성

`django-admin startproject winSecond`

migrate

`python manage.py migrate`

app 생성

`python manage.py startapp blog`

생성 후 project/settings.py 에 등록한다.

blog/views.py 파일 수정

```py
from django.shortcuts import render


def post_view(request):
    return render(request, 'blog/post_view.html')

```

blog/url.py 파일 수정

```py
from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.post_view),
]

```

project/urls.py

```py
from django.conf.urls import url, include
from django.contrib import admin


urlpatterns = [
    url(r'^admin/$', admin.site.urls),
    url(r'^blog/$', include('blog.urls')),
]

```

blog/templates/blog/post_view.html 파일 생성 후 수정

```html
<!doctype html>
<head>
    <meta charset="utf-8">
    <title>Django Study</title>
</head>
<body>
    <h1>Django Study</h1>
    <p>python django selery</p>
    <ul>
        <li>list 1</li>
        <li>list 2</li>
    </ul>
</body>
```

dojo app 생성

`python manage.py startapp dojo`

project/settings.py 에 등록

url/dojo/sum/100/200/300/ 등으로 입력되면 숫자의 합을 구하여 출력하도록 수정

dojo/views.py

```py
from djnago.http import HttpResponse


def mysum(request, numbers):
    result = sum(map(lambda s: int(s or 0), numbers.split('/')))
    return HttpResponse(result)

```

dojo/urls.py
```py
from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^mysum/(?P<numbers>[\d/]+)/$', views.mysum),
]
```

project/urls.py에도 dojo를 등록한다.


dojo/이름/나이 url을 받아 처리해보자.

dojo/views.py

```py
from django.http import HttpResponse


def hello(request, name, age):
    return HttpResponse('''
        안녕하세요. {}. {}살이시군요.
    '''.format(name, age))

```

dojo/urls.py

```py
from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^hello/(?P<name>[ㄱ-힣]+)/(?P<age>\d+)/$', views.hello),
]

```

함수 기반 뷰의 4가지 방법

1. HttpResponse를 이용한 응답

2. render 함수와 템플릿을 이용한 응답

3. JsonResponse를 이용한 응답

4. 파일 다운로드

```py
from django.http import JsonResponse


def post_view3(request):
    return JsonResponse(
        {
            'message': 'Ask Django',
            'item': ['python', 'django',]
        }, json_dumps_params={'ensure_ascii': False}
    )

```

```py
from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^postview3/$', views.post_view3),
]

```

```py

```