# markdown 연습

## 1. 헤더

```
# 이것은 헤더1
## 이것은 헤더2
### 이것은 헤더3
#### 이것은 헤더4
##### 이것은 헤더5
```

## 2. BolckQuote

```>``` 를 사용한다.

```
> 이렇게 사용하면
>> 다음과 같이 표현됩니다.
>>> 이렇게도 됩니다.
```
> 이렇게 사용하면
>> 다음과 같이 표현됩니다.
>>> 이렇게도 됩니다.

## 3. 목록
### 3.1. 순서있는 목록
```
1. 첫번째
2. 두번째
3. 세번째
```
1. 첫번째
2. 두번째
3. 세번째

### 3.2. 순서없는 목록
상위 목록에서 공백 2칸씩 들여쓰기를 한다.

```
* AAA
  * BBB
    * CCC

+ AAA
  + BBB
    + CCC

- AAA
  - BBB
    - CCC
```
* AAA
  * BBB
    * CCC

+ AAA
  + BBB
    + CCC

- AAA
  - BBB
    - CCC

## 4. 코드
```<pre><code></code></pre>``` tag 안에 포함된 항목은 코드 block 이 된다.

`(3개) 안에 포함된 항목은 코드 block 이 된다.

코드 자체를 하나의 탭으로 들여쓰기를 하면 코드 block 이 된다. 

<pre><code>
urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^(?P<pk>\d+)/$', views.DetailView.as_view(), name='detail'),
    url(r'^(?P<pk>\d+)/vote/$', views.vote, name='vote'),
    url(r'^(?P<pk>\d+)/results/$', views.ResultsView.as_view(),
        name='results'),
]
</code></pre>

    urlpatterns = [
        url(r'^$', views.IndexView.as_view(), name='index'),
        url(r'^(?P<pk>\d+)/$', views.DetailView.as_view(), name='detail'),
        url(r'^(?P<pk>\d+)/vote/$', views.vote, name='vote'),
        url(r'^(?P<pk>\d+)/results/$', views.ResultsView.as_view(),
            name='results'),
    ]

## 5. 수평선
아래의 방법들을 수평선을 만든다.
```
---
***
```

## 6. 링크

* 참조
```
Link: [Google][googlelink]
[googlelink]: http://google.com "Go google"
```

Link: [Google][googlelink]
[googlelink]: http://google.com "Go google"

* 인라인
```
Link: [Google](http://google.com, "google link")
```

Link: [Google](http://google.com, "google link")

* 자동
```
<http://google.com>
<abc@gmail.com>
```
<http://google.com>

<abc@gmail.com>

## 7. 강조
```
*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

~~cancelline~~
```

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

~~cancelline~~

## 8. 이미지
```
![고양이](https://pixabay.com/photo-1057829/ "Cat")
```

![고양이](https://pixabay.com/photo-1057829/ "Cat")
