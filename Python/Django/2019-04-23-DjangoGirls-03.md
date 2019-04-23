# django ORM과 queryset

console에서 django 가상환경을 실행한 상태에서 다음과 같이 입력해보자.

```cmd
python manage.py shell
```

InteractiveConsole이 실행된다.

이전에 생성했던 Post model을 불러와보자.

```py
from blog.models import Post


Post.objects.all()
```

Post model에 입력했던 항목들이 출력된다.

신규 Post를 등록해보자.

```py
Post.objects.create(author=me, title='NEWNEW', text='new post')
```

에러가 발생한다.

```cmd
"Post.author" must be a "User" instance.
```

에러를 해결해보자.

```py
from django.contrib.auth.models import User


User.objects.all()
```

User에 무엇이 들어있는지 확인하기위해 출력해봤다.

```cmd
<QuerySet [<User: superuser>]>
```

super user로 등록했던 사용자가 들어있다.

사용자의 인스턴스를 만든다.

```py
me = User.objects.get(username='superuser')
```

다시 post를 생성해보자.

```py
Post.objects.create(auther=me, title='NEWNEW', text='new post')
```

등록 후 Post를 다시 조회해본다.

```py
Post.objects.all()
```

신규 Post가 입력된 것을 확인할 수 있다.

## filter

queryset은 조건을 걸어 데이터를 조회할 수 있다.

all 대신 filter를 이용한다.

```py
Post.objects.filter(author=me)
```

title에 특정 단어가 포함된 Post만 출력할 수도 있다.

```py
Post.objects.filter(title__contains='NEW')
```

django ORM은 title이라는 필드와 ​contains라는 filter를 `__`로 구분하여 연결한다.

published_date로 filter 할 수도 있다.

```py
from django.utils import timezone


Post.objects.filter(published_date__lte=timezone.now())
```

출력되는 결과가 없다.

post를 publish 해보자. 일단 post 인스턴스를 하나 가져온다.

```py
post = Post.objects.get(title='NEWNWE')
post.publish()
```

post라는 인스턴스를 가져와서 publish 했다.

published_date__lte=timezone.now()로 다시 확인해보자.

## order_by

queryset은 정렬할 수 있다.

```py
Post.objects.order_by('created_date')
```

## 템플릿 동적 데이터

view는 model과 template을 연결하는 역할을 한다.

blog/views.py 파일을 수정해보자.

```py
# blog/views.py

from django.shortcuts import render
from django.utils import timezone
from .models import Post


def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now())\
                        .order_by('published_date')
    return render(request', 'blog/post_list.html', {'posts': posts})
```

filter와 order_by를 이용하여 posts 변수에 queryset을 담았다.
그리고 render 함수의 세 번째 인자로 `{ 'posts': posts }`를 전달했다.
dictionary의 key는 템플릿에서 사용할 변수가 된다.

## 템플릿 태그

blog/templates/blog/post_list.html을 수정한다.

```html
<body>
  {{ posts }}
</body>
```

위와 같이 수정한 후 root url에 접속하면 queryset이 그대로 출력된다.

템플릿에서 for loop를 사용할 수 있다.

```html
{% for post in posts %}
  {{ post }}
{% endfor %}
```

for loop와 endfor 사이의 html을 포함한 모든 항목을 반복한다.
