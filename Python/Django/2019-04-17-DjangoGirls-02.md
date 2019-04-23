# Django Girls 02. Django 프로젝트 시작

기본적인 환경 설정이 완료되었으므로 django 프로젝트를 생성한다.

현재 경로는 DjangoGirls 디렉토리다.

```cmd
django-admin startproject mysite .
```

이렇게 명령어를 입력하면 manage.py 파일과 mysite 디렉토리가 생성된다.

일단 실행해보자.

```cmd
python manage.py runserver
```

migrate를 하라고 경고 메시지가 출력되긴 하지만 django가 실행되었다.

다음과 같은 메시지가 출력된다.

```cmd
April 17, 2019 - 13:04:06
Django version 2.2, using settings 'mysite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

날짜와 시간, django 버전, settings, 개발 서버의 주소 등이 나온다.

해당 주소를 웹브라우저에서 실행해보면 로켓이 이륙한 이미지가 보인다.

여기까지 Success!

메시지 중 날짜와 시간을 보면 현재 시간과 맞지 않을 것이다.

시간대를 변경해야 한다. 이런 설정은 mysite/settings.py 파일에 존재한다.

```py
# settings.py

TIME_ZONE = 'Asia/Seoul'
```

다시 한번 `python manage.py runserver`를 실행하면 현재 시각이 잘 나올 것이다.

Django는 sqlite3가 기본으로 설정되어 있다.

settings.py 파일에 다음과 같은 코드를 확인할 수 있다.

```py
# settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

DB를 생성하기 위해 다음과 같이 입력한다.

```cmd
python manage.py migrate
```

이제 다시 `python manage.py runserver`를 입력하면 경고 메시지가 더 이상 출력되지 않고 개발 서버가 실행되었다는 메시지만 출력된다.

Django Girls 튜토리얼은 블로그를 만드는 과정이다.

mysite라는 프로젝트 안에 blog라는 app을 생성한다.

```cmd
python manage.py startapp blog
```

이 명령을 실행하면 blog라는 디렉토리가 생성된 것을 확인할 수 있다.

app을 생성했다면 이 프로젝트에서 app을 사용한다고 알려줘야 한다.

settings.py에 INSTALLED_APPS에 다음과 같이 추가한다.

```py
# settings.py

INSTALLED_APPS = [
    ...
    'django.contrib.staticfiles',
    'blog',
]
```

blog app에서 블로그의 내용을 저장하는 모델을 생성한다.

```py
# blog/models.py

from django.db import models
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title

```

```py
class Post(models.Model):
```

클래스 선언 시 ​models는 Post가 django의 모델인 것을 의미한다. 이 코드 때문에 django가 Post 클래스가 DB에 저장되는 것을 알게된다.

```cmd
python manage.py makemigrations blog

python manage.py migrate blog
```

makemigrations와 migrate 명령으로 DB(sqlite3)에 Post table이 생성되었다.

해당 내용을 admin page에서 쉽게 활용할 수 있도록 admin에 등록한다.

```py
# blog/admin.py


from django.contrib import admin
from .models import Post


admin.site.register(Post)
```

admin page에 접속하기 위해서는 superuser를 생성해야 한다.

```cmd
python manange.py createsuperuser
```

`http://127.0.0.1:8000/admin`에 접속하여 id/pw를 입력하면 admin page에 접속할 수 있다.

## url 추가

mysite/urls.py 파일에서 blog/urls.py를 불러온다.

```py
# mysite/urls.py

from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog/urls')),
]
```

`path('', include('blog/urls')),` 이 코드의 의미는 `http://127.0.0.1:8000`으로 들어오는 모든 요청을 blog/urls로 보내서 처리한다는 의미다.

blog/urls로 요청을 보냈으니 해당 앱에서 요청을 처리해보자.

```py
# blog/urls.py

from django.urls import path
from . import views


urlpatterns = [
    path('', views.post_list, name='post_list'),
]
```

views.post_list라는 view를 root url에 매핑했다.
이 url 패턴은 빈 문자열에 매핑된다. django url resolver는 전체 URL 경로에서 prefix에 해당되는 도메인 이름(`http://127.0.0.1:8000`)을 무시하고 그 이후 문자열을 받아들인다. 빈 문자열이기 때문에 root url로 접근하면 post_list view를 출력한다.

`name='post_list'`는 url에 이름을 붙인 것으로 view를 식별한다.

view는 로직을 넣는 곳이다. view는 model에서 필요한 정보를 받아와서 template에 전달하는 역할을 한다.

blog/views.py 파일을 추가한다.

```py
# blog/views.py

from django.shortcuts import render


def post_list(request):
    return render(request, 'blog/post_list.html', {})
```

이제 template을 생성하자.

blog/templates/blog 폴더 구조를 만들자.
폴더 구조가 복잡해 질 때를 대비하여 관습적으로 이렇게 만든다.
해당 폴더에 post_list.html 이라는 이름으로 빈 파일을 만든다.
여기까지만 진행하고 python manage.py runserver를 실행해보면 root url로 접속했을 때 에러가 발생하지 않고 빈 화면이 출력된다.
