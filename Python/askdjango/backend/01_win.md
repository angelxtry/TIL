#

## 가상환경 만들기

`python -m venv myvenv`

## 가상환경 실행

`myvenv\script\activate.bat`

## django 설치

`pip install "django>=1.10"`

덤으로 pip upgrade

`python -m pip install --upgrade pip`

django 설치 확인

`django-admin --version`

## project 생성

`django-admin startproject askdjangowin`

## 테스트 서버 실행

`cd askdjangowin`

`python manage.py runserver`

http://127.0.0.1:8000 접속하면 hello world 같은 화면이 반겨준다.

## vscode 환경 설정

urls.py 파일을 열어보면 import 라인에 빨간 밑줄이 보인다.

python path와 lint 설정을 하자.

`Ctrl + Shift + p` -> `Open Workspace Settings`

```js
{
    "editor.rulers": [80,100],
    "files.autoSave": "onFocusChange",
    "python.pythonPath":"E:\\Private\\develop\\AskDjangoStudy\\myvenv\\Scripts",
    "python.linting.pylintArgs" : [
        "--load-plugin", "pylint_django"
    ]
}
```

## migrate

http://127.0.0.1:8000/admin/ 에 접속하면 제대로 연결이 되지 않는다.

`no such table: django_session` 같은 에러가 발생하는데 migrate를 하면 처리된다.

`python manage.py migrate`

http://127.0.0.1:8000/admin/ 에 다시 접속하면 admin login page를 볼 수 있다.

## app 생성

`python manage.py startapp blog`

blog app이 생성된다.

## app 등록

생성한 blog app을 등록한다.

`askdjangowin\settings.py` 파일을 수정

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

blog를 추가했다.

## blog - view 생성

`blog/views.py` 파일 수정

```py
from django.shortcuts import render

def post_view(request):
    return render(request, 'blog/post_view.html')
```

## blog/urls.py 파일 생성 및 수정

```py
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.post_view),
]
```

## askdjangowin/urls.py 수정

```py
from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^blog/', include('blog.urls')),
]
```

여기까지 작성한 후 http://127.0.0.1:8000/blog 에 접속하면 TamplateDoesNotExist at /blog/ 라는 에러 메시지가 출력된다.

말 그대로 template이 없어서 발생하는 에러다.

## template 생성

`blog/templates/blog/post_view.html` 파일을 생성 후 수정

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0,
        minium-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Django-Study</title>
    </head>
    <body>
        <h1>AskDjango Windows Test</h1>
        <ul>
            <li>첫 번째 리스트</li>
            <li>두 번째 리스트</li>
        </ul>
    </body>
</html>
```

파일 저장 후 http://127.0.0.1:8000/blog/ 페이지를 reload 해도 에러 메시지는 사라지지 않는다.

서버를 재실행하자.

