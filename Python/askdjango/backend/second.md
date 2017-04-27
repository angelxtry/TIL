# 두번째 반복 연습

## project 생성, app 생성 등

`python startproject second`

`cd second`

`python startapp blog`

`second/settings.py` -> `INSTALL_APPS`에 blog app 추가

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blog',
]
```

`blog/views.py` 파일 수정

```py
from django.shortcuts import render

def post_list(request):
    return render(request, 'blog/post_list.html')
```

`blog`에 `urls.py` 파일 추가

```py
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.post_list),
]
```

`second/urls.py` 파일 수정

`include`를 import에 추가한다.

그리고 생성한 `blog/urls.py` 파일을 등록한다.

```py
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^blog/', include('blog.urls')),
]
```

여기까지 진행한 후 http://127.0.0.1:8000 에 접속하면 page not found 404 에러가 발생한다.

http://127.0.0.1:8000/blog/ 에 접속하면 TemplateDoesNotExist at /blog/ 메시지가 출력된다.

`blog` 하위 디렉토리에 `templates/blog` 디렉토리를 생성하고 `post_list.html` 파일을 생성한다.

```html
<h1>AskDjango 두번째 테스트</h1>

<p>
    Django 열심히 해보자.
</p>

<ul>
    <li>리스트 하나</li>
    <li>리스트 둘</li>
</ul>
```

서버는 실행중이고 웹페이지를 refresh 해도 TemplateDoesNotExist는 처리되지 않는다.

서버를 중단하고 다시 실행해야만 TemplateDoesNotExist가 처리되고 http://127.0.0.1:8000/blog/ 주소에 페이지가 출력된다.

서버를 다시 실행하면 `python manage.py migrate`를 실행하라고 메시지가 출력된다.

----

## 휴대폰망으로 접속하기

ngrok

Secure tunnels to localhost

다운받아서 압축을 풀고 `manage.py` 파일이 있는 디렉토리에 copy

`python manange.py runserver`로 실행하면 8000번 포트로 실행된다.

그 후에 `./rgrok http 8000`을 실행한다.

핸드폰을 이용해 Forwrading 주소로 접속해보면 404 Bad Request 가 발생한다.

`second/settings.py` -> `ALLOWED_HOSTS = ['ADDRESS']` 를 적어준다.

그 후 다시 핸드폰으로 접속하면 정상적으로 페이지가 출력된다.

`ALLOWED_HOSTS = ['*']` 라고 입력하면 모든 도메인을 다 허용한다.

## 간단한 모바일 최적화

휴대폰으로 접속해보면 화면이 좀 어색해보인다.

크게 나이지지는 않지만 meta 태그를 이용하여 간단한 모바일 최적화를 해보자.

`blog/templates/blog/post_view.html` 파일을 수정한다.

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0,
        minium-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Django Study</title>
    </head>
    <body>
        <h1>AskDjango Test</h1>

        <p>
            Django 열심히 하자.
        </p>

        <ul>
            <li>리스트 하나</li>
            <li>리스트 둘</li>
        </ul>
    </body>
</html>
```