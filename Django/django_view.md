# views

## Class-based views
----

### URLconf에서 직접 TemplateView 사용하기

```
from django.conf.urls import url
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^about/$', TemplateView.as_view(template_name="about.html")),
]
```

django 공식 페이지에 있는 소스를 그대로 가져왔다.

about.html 처럼 단순하고 정적인 화면만 출력하는 템플릿은 urls.py에서
TemplateView를 import 하여 처리한다.

당연히 views.py와 urls.py를 모두 사용하여 위와 동일하게 처리할 수 있다.

```
# some_app/views.py
from django.views.generic import TemplateView

class AboutView(TemplateView):
    template_name = "about.html"
```

```
# urls.py
from django.conf.urls import url
from some_app.views import AboutView

urlpatterns = [
    url(r'^about/$', AboutView.as_view()),
]
```

아는 게 없어서; 어느 것이 더 일반적인지는 모르겠지만 
단순하고 정적인 템플릿을 출력할 때는 위의 방법이 더 바람직해 보인다. 
