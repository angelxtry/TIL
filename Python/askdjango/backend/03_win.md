# 03

## 정규표현식

최대 3자리 숫자

`"[0=9]{1, 3}" 또는 "\d{1, 3}"`

휴대폰 번호

`"010[1-9]\d{7}"`

한글이름 2글자 혹은 3글자

`"[ㄱ-힣]{2, 3}"`

성이 "이"인 이름

`"이[ㄱ-힣]{1, 2}"`

정규표현식의 대괄호'[]'

특정 위치에 들어갈 수 있는 숫자 혹은 문자의 후보들

숫자 1글자

`"[0123456789]" 또는 "[0-9]" 또는 "\d"`

알파벳 소문자 1글자 : `"[a-z]"`

알파벳 대문자 1글자 : `"[A-Z]"`

알파벳 대/소문자 1글자 : `"[a-zA-Z]"`

16진수 1글자 : `"[0-9a-fA-F]"`

한글 1글자 : `"[ㄱ-힣]"`

"힣"의 의미는 한글 1글자에서 가장 큰 유니코드 값을 가진 문자다.

문자열의 시작을 지정 : `"^"`

문자열의 끝을 지정 : `"$"`

반복횟수 지정

`"\d?"` : 숫자 0회 또는 1회

`"\d*"` : 숫자 0회 이상

`"\d+"` : 숫자 1회 이상

`"\d{m}"` : 숫자 m개

`"\d{m,n}"` : 숫자 m개 이상, n개 이하 (,이후에 띄어쓰기가 있으면 안된다.)

----

`pip install "ipython[notebook]"`

ipython과 쥬피터 노트북이 같이 설치된다.

----

URLConf : URL라우팅

`프로젝트/settings.py`에 최상위 URLConf 모듈을 지정

`ROOT_URLCONF = '프로젝트.urls'` # 프로젝트/urls.py 파일을 의미한다.

특정 URL과 뷰 매핑 List

Django 서버로 http 요청이 들어올 때마다, URLConf 매핑 List를 처음부터 끝까지 순차적으로 검색한다.

매칭되는 URL Rule을 찾지 못했을 경우 404 Page Not Found 응답을 발생시킨다.

`(?P)` : 이 영역의 문자열에 정규표현식을 적용한다.(P는 대문자)

`\d+` : \d+ 패턴에 부합한다면

`<x>` : x라는 변수명으로 인자를 넘긴다.

뷰의 인자로 넘겨받은 값들은 모두 문자열 타입이다.

----

app을 하나 더 만든다.

`python manage.py startapp dojo`

askdjangowin/settings.py의 INSTALLED_APPS에 추가

dojo에 urls.py 파일 추가 및 수정

```py
# dojo/urls.py
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^sum/(?P<x>\d+)/$', views.mysum),
]
```
url에서 숫자 하나를 받아 x 변수에 담아 mysum으로 넘겨준다.

askdjangowin/urls.py에 dojo.urls 등록


dojo/views.py 파일에 mysum 함수를 생성한다.

```py
from django.http import HttpResponse
from django.shortcuts import render

def mysum(request, x):
    return HttpResponse(x)
```

view의 모든 함수는 `request`가 필요하다.

`HttpResponse`를 이용하여 x를 출력한다.


매개변수를 하나 이상 처리할 수도 있다.

일단 mysum 함수를 수정한다.

```py
from django.http import HttpResponse
from django.shortcuts import render

def mysum(request, x, y, z):
    return HttpResponse(x + y + z)
```

그리고 dogo/urls.py 파일을 수정한다.

```py
# dojo/urls.py
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^sum/(?P<x>\d+)/(?P<y>\d+)/(?P<z>\d+)/$', views.mysum),
]
```

위와 같이 작성하면 `/sum/100/200/300/` 형식으로 된 url을 처리할 수 있다.

하지만 `/sum/100/` 과 같은 형식을 처리할 수 없게 된다.

url을 `/sum/100/200/300/` 이렇게 입력하면 결과값은 `100200300`이 나온다.

의도한 결과는 sum 이었지만 세 개의 숫자가 단순하게 붙어서 출력된다.

이것은 url에서 넘겨받은 변수는 모두 문자열로 처리되기 때문이다.

mysum 함수를 수정하여 문자열을 int로 변환한다.

```py
from django.http import HttpResponse
from django.shortcuts import render

def mysum(request, x, y, z):
    return HttpResponse(int(x) + int(y) + int(z))
```

url을 `/sum/100/200/300/` 이렇게 입력하면 결과값은 `600`이 나오는 것을 확인할 수 있다.

지금 상태는 꼭 숫자 3개를 넘겨야만 실행이 된다.

숫자 1개나 2개는 `dojo/urls.py`에 등록하지 않았으므로 `404 Page not found`가 발생한다.

이것을 해결하려면 다음과 같이 수정한다.

```py
# dojo/urls.py
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^sum/(?P<x>\d+)/$', views.mysum),
    url(r'^sum/(?P<x>\d+)/(?P<y>\d+)/$', views.mysum),
    url(r'^sum/(?P<x>\d+)/(?P<y>\d+)/(?P<z>\d+)/$', views.mysum),
]
```

```py
# dojo/views.py
from django.http import HttpResponse
from django.shortcuts import render

def mysum(request, x, y=0, z=0):
    return HttpResponse(int(x) + int(y) + int(z))
```
`mysum` 함수에  default param을 지정하지 않으면 `Type Error`가 발생한다.

`dojo/urls.py`에 비슷한 url을 세 번이나 반복하는 것은 중복이다.

이것을 깔끔하게 고쳐보자.

```py
# dojo/urls.py
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^sum/(?P<numbers>[\d/]+)/$', views.mysum),
]
```
`\d+` 는 숫자가 한 개 이상 나올 수 있다는 의미다.

이것을 `[\d/]+` 이렇게 바꾸면 숫자와 `/`가 한개 이상 나올 수 있다는 의미가 된다.

즉, `123/123/123/123` 같은 문자열이 처리가능해졌다.

----

`123/123/123/14/123/1234/135`

이렇게 받은 문자열에서 숫자만 파싱하여 합을 구해보자.

ipython에서 실행한다.

`numbers = "123/123/123/14/123/1234/135"`

split함수를 이용하여 / 를 기준으로 나누어 리스트를 만든다.

`numbers.split("/")`

`['123', '123', '123', '14', '123', '1234', '135']`

리스트의 엘리먼트가 모두 문자열이므로 map을 이용하여 숫자로 변환한다.

`map(int, numbers.split("/"))`

결과를 리스트로 변환한다.

`list(map(int, numbers.split("/")))`

`[123, 123, 123, 14, 123, 1234, 135]`

숫자로 잘 변환된 것을 확인했으므로 sum을 구한다.

`sum(map(int, numbers.split("/")))`

이 식은 /가 연속으로 2번 입력이 들어오는 것을 처리하지 못한다.

//는 split에 의해 빈 문자열로 처리된다.

빈 문자열 즉 ''을 int로 변환하면 `ValueError`가 리턴된다.

이 경우 다음과 같이 처리한다.

`sum(map(lambda s: int(s or 0), number.split("/")))`

s or 0은 s가 False일때 0으로 치환된다.

이 내용을 `dojo/views.py`에 적용한다.

```py
# dojo/views.py
from django.http import HttpResponse
from django.shortcuts import render

def mysum(request, numbers):
    result = sum(map(lambda s: int(s or 0) , numbers.split('/')))
    return HttpResponse(result)
```

-----

이제 한글을 param으로 처리하는 작업을 해보자.

```py
# dojo/urls.py
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^sum/(?P<numbers>[\d/]+)/$', views.mysum),
    url(r'^hello/(?P<name>[ㄱ-힣]+)/(?P<age>\d+)/$', views.hello),
]
```

```py
# dojo/views.py
from django.http import HttpResponse
from django.shortcuts import render

def mysum(request, numbers):
    result = sum(map(lambda s: int(s or 0) , numbers.split('/')))
    return HttpResponse(result)

def hello(request, name, age):
    return HttpResponse("안녕하세요. {}. {}살 이시군요.".format(name, age))
```

이렇게 처리하면 url에 한글이름/나이/를 입력하면 그대로 출력이 된다.
