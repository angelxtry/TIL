# 5. 고차 함수
> 고차 함수는 다른 함수를 인자로 받거나 함수를 결과로 반환하는 함수다.

> 함수를 만들어 내는 함수라는 개념은 조금 이상하게 들릴수도 있다. 하지만 Callable 클래스의 객체에 대해 공부한다면 호출 가능한 객체를 반환하는 함수를 보게 된다. 그러한 함수는 다른 함수를 만들어 내는 함수의 한 가지 예다.

> 이번 장에서는 다음과 같은 함수를 살펴본다.
> * max() 와 min()
> * 고차 함수를 호출할 때 편하게 쓸 수 있는 람다식
> * map()
> * filter()
> * iter()
> * sorted()

> max(), min(), sorted() 함수는 고차 함수 역할 외에도 기본적으로 적용되는 동작 방식이 있다. 함수를 인자로 넘기기 위해서는 key=인자 형태를 사용해야 한다. map()과 filter() 함수는 함수를 첫 번째 위치 기반 인자로 받아들인다.

## max()와 min()을 사용해 최댓값, 최솟값 알아내기
> 각 3-튜플에는 시작 지점의 위치, 끝 지점 위치, 거리 값이 들어 있다. 위치는 위도와 경도의 쌍이다. 이 시퀀스에서 최대와 최소 거리를 찾는 데에는 세 가지 방법이 있다. 

> * 거리를 제네레이터 함수로 뽑아낸다. 그 함수는 오직 거리만을 돌려주고, 해당 구간의 시작과 끝 위치는 버린다. 최댓값이나 최솟값 구간의 위치 정보를 가지고 추가 처리를 해야 하는 경우에는 이러한 방식이 잘 들어맞지 않을 것이다.

> * `풀기(처리(감싸기()))` 패턴을 사용한다. 이렇게 하면 최대, 최소 거리가 있는 구간을 얻을 수 있다. 그로부터 거리만 필요하다면 거리만을 뽑아낼 수도 있다. 구간을 나태내는 두 위치 정보를 사용해 어떤 구간이 최대 또는 최소인지를 파악할 수 있다.

> * max()와 min()을 고차 함수로 사용한다.

```py
from ch02_ex3 import float_from_pair, lat_lon_kml, limits, haversine, legs

path = float_from_pair(lat_lon_kml())
trip = tuple((start, end, round(haversine(start, end), 4))
    for start, end in legs(iter(path)))
```

> 이 부분은 KML 파일에서 읽은 경로 정보에서 얻은 각 구간의 하버사인 거리를 기반으로 trip 튜플을 만든다. 일단 trip 객체를 만들고 나면 거리를 뽑아내 최대와 최소를 구할 수 있다.

```py
long, short = max(dist for start, end, dist in trip),
              min(dist for start, end, dist in trip)
print(long, short)
```

> 제네레이터 함수를 사용해 trip 튜플의 각 구간에서 필요한 원소를 뽑아낸다. 각 제네레이터 식이 오직 한 구간만을 소모하기 때문에 이 제네레이터 식을 반복해야만 한다.

> 다음은 풀기(처리(감싸기())) 패턴을 사용한 것이다. 실제로도 warp()과 unwarp()이라는 이름의 함수를 정의하여 패턴이 어떻게 동작하는지 명확히 이해할 수 있게 했다.

```py
def warp(leg_iter):
    return ((leg[2], leg) for leg in leg_iter)

def unwarp(dist_leg):
    distance, leg = dist_leg
    return leg

long, short = unwarp(max(warp(trip))), unwarp(min(warp(trip)))
print(long, short)
```

> 앞의 예와 달리 이 메서드는 최대와 최소 거리 구간의 모든 특성을 가져올 수 있다. 감싸는 함수는 튜플에서 거리를 뽑아내 거리와 원래의 튜플의 쌍을 만든다. 그 후 min(), max()의 기본 형태를 사용하여 거리과 구간 정보가 들어 있는 튜플을 처리한다. 처리한 후 첫 번째 원소를 없애면 구간 정보만 남는다.

> 마지막으로 가장 중요한 형태는 max()와 min()의 고차 함수 기능을 사용한다. 이를 위해 먼저 도우미 함수를 정의하고, 그 함수를 사용하여 구간의 컬렉션을 원하는 요약 형태로 축약한다.

```py
def by_dist(leg):
    lat, lon dist = leg
    return dist
long, short = max(trip, key=by_dist), min(trip, key=by_dist)
print(long, short)
```

> max()와 min()은 모두 반복 가능 객체와 함수를 인자로 받는다. 파이썬의 모든 고차 함수에서는 키워드 매개변수 `key=`를 사용해 필요한 키 값을 뽑아내도록 할 수 있다.

```py
wrap = ((key(leg), leg) for leg in trip)
return max(wrap)[1]
```

> max()와 min() 함수는 주어진 key 함수가 시퀀스의 각 원소를 2-튜플로 감싸고, 그 2-튜플을 처리한 후 2-튜플을 분해해 원래의 값으로 돌려놓는 것처럼 작동한다.

## 파이썬의 람다 식 사용하기
> 많은 경우 도우미 함수를 따로 정의하는 것은 필요 이상의 코드를 작성하게 된다. key 함수의 핵심을 식 하나로 표현할 수 있는 경우가 자주 있다. 그러한 경우조차 식 하나를 일일히 def문과 return문으로 감싸는 것은 낭비같아 보인다.

> 파이썬은 람다 형식을 사용해 고차 함수를 쉽게 사용할 수 있게 해준다. 람다 형식을 사용하면 작은 무명 함수를 쉽게 정의할 수 있다. 다만, 함수의 본문이 단일 식으로 이뤄져야 한다.

```py
long, short = max(trip, key=lambda leg: leg[2]),
              min(trip, key=lambda leg: leg[2])
```

> 파이썬에서 튜플의 원소에 대해 의미 있는 이름을 정의하는 방법은 namedtuple을 사용하는 것과 람다를 사용하는 두 가지가 있다. 두 방법은 동등하다.

> 람다를 사용하는 것이 이름 있는 튜플을 사용하는 것보다 더 쓸모 있는지는 분명하지 않다. 필드를 뽑아내기 위해 여러 람다를 정의하는 것은 이름 있는 튜플을 정의하는 것보다 더 많은 코드가 필요하다. 반면, 람다를 사용하면 전위 형식의 함수 호출 표기법을 사용할 수 있기 때문에 함수형 프로그래밍을 하는 상황에서는 그 편이 더 나을 것이다.

> 더 중요한 것은, 나중에 sorted() 예제에서 볼 수 있는 것처럼, sorted(), min(), max() 등의 함수에서 이름 있는 튜플보다 람다를 더 효과적으로 사용할 수 있다는 점이다.

## 람다와 람다대수
> 순수 함수 언어에 대한 책에서는 람다 대수와 하스켈 커리가 발명한 커링(currying)이라는 기법에 대해 설명할 필요가 있을 것이다. 하지만 파이썬은 그러한 람다 대수와는 거리가 멀다. 파이썬의 함수는 단일 인자의 람다 형식으로 환원되지 않는다.

> 커링은 functools.partial 함수를 사용해 구현할 수 있다.

## map() 함수를 사용해 함수를 컬렉션에 적용하기
map() 함수는 한 컬렉션을 다른 컬렉션으로 매핑한다. 이 함수는 주어진 함수를 원래 컬렉션의 모든 원소에 적용하여 결과 컬렉션을 만들어 내는 것을 보장한다. 이는 내장 함수를 데이터의 컬렉션에 적용하는 이상적인 방법이다.

## map에 람다 형식 사용하기
> 여행 경로의 각 구간 거리를 해리에서 일반 마일로 변경

```py
map(lambda x: (start(x), end(x), dist(x)*6076.2/5280), trip)

((start(x), end(x), dist*6076.12/5280) for x in trip)
```

> map()과 제네레이터 식은 완전히 동일하다.

> map() 함수와 제네레이터 식 사이의 중요한 차이점은 map() 함수가 제네레이터 식보다 더 빠른 경향이 있다는 점이다. 속도 향상은 보통 20퍼센트 정도다.

진짜일까? 간단한 코드를 만들어 비교해보자!

## map()을 여러 시퀀스에 활용하기
> 두 컬렉션에 있는 데이터를 각각 짝지워 사용해야 할 경우

```py
map(function, zip(one_iterable, two_iterable))

(function(x, y) for x, y in zip(one_iterable, two_iterable))
```

> map()과 동일한 기능을 하는 제네리이터

> 우리는 평면적인 리스트에서 튜플의 시퀀스를 끌어냈다. 각 튜플은 인접한 두 값을 포함할 것이다. zip() 함소는 더 짧은 목록이 끝나면 제대로 수행을 멈춘다. 하지만 zip(x, x[1:]) 패턴은 실체화한 시퀀스나 range() 함수로 만들어 낸 반복 가능 객체에만 작동한다.

```py
from ch02_ex3 import lat_lon_kml, float_from_pair, haversine

path = tuple(float_from_pair(lat_lon_kml()))
distance1 = map( lambda s_e: (s_e[0], s_e[1], haversine(*s_e)),
                zip(path, path[1:]))
```

> 여기서는 필요한 지점의 경로를 path 변수에 넣었다. 이는 위도, 경도로 이뤄진 쌍으로 이뤄진 수서가 있는 시퀀스다. 우리가 zip(path, path[1:]) 패턴을 사용할 것이기 때문에 일반적인 반복 가능 객체를 사용할 수 없으므로 이 시퀀스를 반드시 실체화해야 한다.

```py
distance2 = map(lambda s, e: ( s, e, haversine(s, e)), path, path[1:])
```

> 함수 하나와 반복 가능 객체 2개를 map() 함수에 제공했다. map() 함수는 각 반복 가능 객체의 다음 원소를 가져와서 그 두 값을 첫 번째 인자로 받은 함수에 전달한다.

## filter()를 사용해 데이터를 받아들이거나 거부하기
> filter() 함수의 목적은 술어(predicate)라고 불리는 어떤 의사결정 함수를 주어진 컬렉션의 모든 원소에 적용하는 것이다. True라는 결과가 나오면 그 값을 통과시키고, 그렇지 않으면 그 값을 거부한다. itertools 모듈에는 이와 비슷한 목적의 filterfalse() 라는 함수가 있다.

```py
long = list(filter(lambda leg: dist(leg) >= 50, trip))
```

```py
filter(lambda x: x%3==0 or x%5==0, range(10))
sum(_)
# 23
```

> 다음과 같이 제네레이터로 표현할 수도 있다.

```py
sum(x for x in range(10) if x%3==0 or x%5==0)
```

## filter()를 사용해 이상 값 식별하기
...

## iter() 함수와 끝을 표시하는 특별한 값 사용하기
> 내장 iter() 함수는 어떤 컬렉션 객체를 기반으로 하는 반복자를 만들어 낸다. 이를 사용해 어떤 컬렉션을 감싸 반복자를 만들 수 있다.

...

## sorted()를 사용해 데이터 정렬하기
> 파이썬에서 어떤 순서대로 결과를 만들어 내는 데에는 두 가지 방법이 있다. list 객체를 만들고, list.sort() 메서드를 사용해 원소를 정렬할 수 있다. 다른 방법은 sorted() 함수를 사용하는 것이다. 이 함수는 어떤 반복 객체에도 사용할 수 잇다. 다만, 정렬한 결과 list 객체를 만들어 낸다.

> sorted() 함수를 사용하는 방법은 두 가지다. 그냥 컬렉션에 이 함수를 적용할 수도 있다. 또한 key= 인자를 사용하는 고차 함수로 사용할 수도 있다.

```py
sorted(dist(x) for x in trip)
```
> 제네레이터 식을 사용하여 여행 데이터로 부터 거리만을 가져왔다. 거리를 원래의 3-튜플과 함꼐 계속 유지하고 싶다면, sorted() 함수에 key 함수를 지정하여 튜플을 정렬하는 방식을 사용할 수 있다.

```py
sorted(trip, key=dist)
dist = lambda leg: leg[2]
```

## 고차 함수 작성하기
> 고차 함수에는 세 가지 종류가 있다.
> * 인자 중 하나로 함수를 요구하는 함수
> * 함수를 반환하는 함수. Callable 클래스는 이러한 경우의 전형적인 예다. 제네레이터 식을 만들어 내는 함수도 고차 함수라고 생각할 수 있다.
> * 함수를 인자로 받고, 함수를 반환하는 함수. functools.partial() 함수가 전형적인 예다. 데커레이터도 여기에 속한다.

> 고차 함수를 사용하는 몇가지 일반적인 변환은 다음과 같다.
> * 객체를 감싸 더 복잡한 객체 만들기
> * 복잡한 객체를 구성 요소별로 분해하기
> * 구조를 평면으로 펼치기
> * 평면 시퀀스를 구조화하기

## 교차 매핑과 필터 작성하기
> 파이썬의 내장 고차 함수인 map()과 filter()는 처리하길 원하는 대두분의 처리를 일반적으로 감당할 수 있다. 하지만 성능을 더 높이기 위해 이를 일반적으로 최적화하기는 어렵다.

> 매핑을 기술하는 방법에는 세 가지가 있다. 어떤 함수 f(x)와 어떤 컬렉션 객체 C가 있다고 가정해보자.

> * map() 함수
```py
map(f, C)
```

> * 제네레이터 식
```py
(f(x) for x in C)
```

> * 제네레이터 함수
```py
def mymap(f, C):
    for x in C:
        yield f(x)
mymap(f, C)
```

> 마찬가지로 filter() 함수를 컬렉션 C와 술어 함수 f에 적용하는 데에도 세 가지 방법이 있다.

> * filter() 함수
```py
filter(f, C)
```

> * 제네레이터 식
```py
(x for x in C if f(x))
```

> * 제네레이터 함수
```py
def myfilter(f, C):
    for x in C:
        if f(x):
            yield x
myfilter(f, C)
```

> 하지만 성능상 다름 점이 있다. map()과 filter() 함수가 가장 빠르다. 더 중요한 것은 각각의 매핑, 필터와 어울리는 확장이 서로 다르다는 것이다.

> 각 원소에 좀 더 복잡한 g(x)를 적용하도록 만들거나 컬렉션 C를 처리하기 전에 함수를 적용할 수 있다. 이는 가장 일반적인 방법이며, 앞에서 설명한 세 가지 방식에 모두 적용할 수 있다. 이 부분에 함수적 설계 역량을 집중해야 한다.

> for 루프를 약간 변경할 수 있다. 분명한 것은 제네레이터 식을 if 절로 확장하여 매핑과 걸러내기를 한 연산과 조합하가는 것이다. 이와 마찬가지로 mymap()과 myfilter()를 합쳐 매핑과 걸러내기를 동시에 수행하게 만들 수도 있다.

> 우리가 만들 수 있는 가장 심오한 변화는 루프가 다루는 데이터의 구조를 변경시키는 것이다.

> 너무 많은 변환을 한 함수로 조합하는 매핑을 설계하는 경우에는 많은 주의를 기울여야 한다. 가능한 한 둘 이상의 개념을 함께 포현하거나 간결하지 못한 함수를 만드는 일을 피해야 한다. 파이썬 컴파일러가 최적화해주지 못하기 때문에 함수를 직접 합쳐 느린 애플리케이션을 최적화해야만 한다. 이러한 종류의 최적화는 가능한 한 피해야 하며, 성능이 떨어지는 프로그램을 프로파일링(profiling)한 후 최적화 여부를 결정해야 한다.

## 매핑하면서 데이터 풀기
> (f(x) for x, y in C)와 같은 구성을 사용할 경우, for문에 여러 가지 대입을 사용해 값이 여럿 들어 있는 튜플을 풀어 함수를 호출하는 것이다. 전체 식은 매핑이다. 이러한 식은 구조를 바꾸고 함수를 적용하기 위한 일반적인 파이썬 최적화 방법 중 하나다.

> 다음은 매핑을 진행하는 과정에서 데이터를 푸는 것을 보여주는 구체적인 예다.
```py
def convert(conversion, trip):
    return (conversion(distance) for start, end, distance in trip)
```

> 이 고차 함수는 다음과 같은 변환 함수에 의해 지원될 수 있다.
```py
to_mile = lambda nm: nm*5280/6076.12
to_km = lambda nm: nm*1.852
to_nm = lambda nm: nm
```

> 이 함수들을 사용해 거리를 뽑아내 변환 함수를 적용할 수 있다.

```py
convert(to_miles, trip)
```

> 고차 convert() 함수에 대해 언급해야 할 중요한 것 하나는 우리가 함수를 인자로 받고, 다른 함수를 결과로 내놓는다는 점이다. convert() 함수는 제네레이터 함수가 아니다. 그 안에는 yield()가 전혀 없다. convert() 함수의 결과는 각각의 값을 누적시키기 위해 평가해야만 하는 제네레이터 식이다.

> 매핑과 거르기를 조합하여 더 복잡한 함수를 만들 수도 있다. 더 복잡한 함수를 만들어 처리량을 감소시키는 것이 좋은 생각처럼 보일 것이다. 하지만 항상 그런 것은 아니다. 복잡한 함수가 단순한 map()과 filter()의 조합보다 성능이 더 나쁠 수도 있다. 일반적으로는 어떤 한 가지 개념을 담고 있거나 소프트웨어를 더 이해하기 쉽게 해주는 경우에만 더 복잡한 함수를 만들어야 한다.

## 매핑하면서 추가 데이터를 감싸기
> ((f(x) , x) for x in C)와 같은 요소를 사용한다면 매핑을 적용하면서 여러 값이 들어 있는 튜플을 생성하기 위해 감싸고 있는 것이다. 이러한 방식은 복잡하게 상태가 바뀌는 객체에 의존하지 않고도 여러 번 재계산하는 것을 피하는 이점을 누리면서 새로운 요소에 필요한 결과를 저장하기 위해 사용하는 일반적인 기법이다.

```py
from ch02_ex3 import float_from_pair, lat_lon_kml, limits, haversion, legs
path = float_from_pair(lat_lon_kml())
trip = tuple((start, end, round(haversine(start, end), 4))
              for start, end in legs(iter(path)))
```

> 이 코드를 변경하여 감싸는 작업을 별도의 함수로 분리할 수 있다.

```py
def cons_distance(distance, legs_iter):
    return ((start, end, round(distance(start, end), 4))
             for start, end in legs_iter)
```

> 이 함수는 각 구간을 두 변수 start와 end로 분해한다. 각각을 주어진 distance() 함수에 사용하여 두 지점 사이의 거리를 구한다. 결과는 두 지점과 계산한 거리를 포함하는 더 복잡한 3-튜플이다.

```py
path = float_from_pair(lat_lon_kml())
trip2 = tuple(cons_distance(haversin, legs(iter(path))))
```

> 제네레이터 식을 고차 함수 cons_distance()로 바꿨다. 이 함수는 함수를 인자로 받을 뿐만 아니라 제네레이터 식을 반환한다.

```py
def cons_distance3(distance, legs_iter):
    return ( leg+(round(distance(*leg), 4), ) for leg in legs_iter)
```

> 이 버전은 원래의 객체로부터 새로운 객체를 만들어 내는 과정을 더 명확하게 보여준다. 여행 구간에 대해 루프를 돌고, 한 구간의 거리를 계한 한 후 주어진 구간에 거리를 이어붙인 새로운 구조를 만든다.

## 매핑하면서 데이터 펼치기

```py
data = list(v for line in text.splitlines() for v in line.split())
```

> 이 식은 텍스트를 줄로 나눈 다음 각 줄에 대해 루프를 돈다. 그리고 각 줄을 단어로 나눈 후 각 단어에 대하 루프를 돈다.

```py
def numbers_from_rows(conversion, text):
    return (conversion(v) for line in text.splitlines() for v in line.split())

print(list(numbers_from_rows(float, text)))
```

> 고차 함수와 제네레이터 식을 조합하는 방식으로도 표현할 수 있다.

```py
map(float, v for line in text.splitlines() for v in line.split())
```

## 걸러내면서 데이터 구조화하기
```py
def group_by_iter(n, iterable):
    row = tuple(next(iterable) for i in range(n))
    while row:
        yield row
        row = tuple(next(iterable) for i in range(n))
```

> 이 함수는 iterable에서 가져온 원소를 n개씩 묶은 튜플을 만든다. 튜플에 원소가 있다면, 그 원소들은 결과로 만들어 내는 반복 가능 객체의 일부분으로 내보내진다. 원칙적으로는, 그 다음에 이 함수를 재귀적으로 입력 iterable의 남은 원소에 적용할 수 있다. 파이썬에서는 재귀가 상대적으로 비효율적이기 때문에 이를 while 루프에 명시적으로 활용해 최적화했다.

```py
group_by_iter(7, filter(lambda x: x%3==0 or x%5==0, range(100)))
```

> 그룹으로 묶는 것과 걸러내는 것을 한꺼번에 본문에서 수행하는 함수로 만들 수 있다. 이러한 방식으로 group_by_iter()를 변경하면 다음과 같다.

```py
def group_filter_iter(n, predicate, iterable):
    data = filter(predicate, iterable)
    row = tuple(next(data) for i in range(n))
    while row:
        yield row
        row = tuple(next(data) for i in range(n))
```

> 이 함수는 걸러내기 위한 술어 함수를 입력 iteralbe에 적용한다. 걸러낸 출력 자체는 지연 계산하는 반복 가능 객체이기 때문에 data 변수의 계산도 미뤄진다. 데이터 값은 필요할 때마다 만들어진다.

```py
group_filter_iter(7, lambda x: x%3==0 or x%5==0, range(100))
```

> 여기서는 한 번의 함수 호출만으로 걸러내기 위한 술어를 적용하고, 결과를 그룹으로 묶었다. filter() 함수의 경우 걸러내는 것을 다른 작업과 같이 처리하는 것의 이점이 그리 분명하지는 않다. 오히려 별도로 눈에 보이게 filter() 함수를 표현하는 편이 한꺼번에 걸러내는 것을 처리하는 것보다 더 도움이 되는 것 같아 보인다.

## 제네레이터 함수 작성하기
> 다음과 같은 기능은 제네레이터 식에서는 사용할 수 없다.

> * 외부 자원을 사용하기 위해 with 컨텍스트를 사용하는 경우.

> * for문보다 더 유연한 루프가 필요하여 while을 사용해야 하는 경우.

> * 루프를 일찍 마쳐야 하는 검색을 구현하기 위해 break나 return을 사용해야 하는 경우.

> * 예외를 처리하기 위한 try-except 구문.

> * 내부 함수 정의.

> * 정말 복잡한 if-else의 시퀀스. if-else 조건문에서 대안이 둘 이상 있는 경우를 함수형으로 표현하면 복잡해 보일 수 있다.

> * 이러한 목록의 경계에는 파이썬에서 자주 사용하는 기능인 for-else, while-else, try-else, try-else-finally 등이 있다. 이들은 모두 제네레이터 식에서는 사용할 수 없는 문장 수준의 기능이다.

> break문은 컬렉션 처리를 일찍 끝내기 위해 흔히 사용한다. 특정 조건을 만족하는 첫 번째 원소를 발견하면 처리를 마치고 싶을 때가 있다 이는 어떤 특성을 만족하는 값이 존재하는지 검사하는 any() 함수의 다른 버전이라 할 수 있다. 또한 컬렉션의 모든 객체가 아니라 정해진 숫자의 원소를 처리하고 나서 루프를 마치고 싶을 수도 있다.

```py
def first(predicate, collection):
    for x in collection:
        if predicate(x):
            return x
```

> collection에 대해 루프를 수행하면서 주어진 predicate 술어 함수를 적용한다. 술어가 True를 반환하면 그와 연관된 값을 반환한다. collection에 남은 원소가 없다면, 기본 값으로 None을 반환한다.

> 이 함수를 주어진 수가 소수인지 아닌지 결정할 때 활용할 수 있다. 다음은 어떤 수가 소수인지 검사하는 함수다.

```py
import math
def isprimeh(x):
    if x == 2:
        return True
    if x % 2 == 0:
        return False
    factor = first(lambda n x%n==0, range(3, int(math.sqrt(x)+.5)+1, 2))
    return factor is None
```

> 이 함수는 2나 다른 짝수의 소수 여부와 관련된 몇 가지 경우를 처리한다. 그 후 first() 함수를 사용해 주어진 컬렉션에 있는 첫 번째 약수를 찾는다.

> first() 함수가 약수를 반환하기만 하면 실제 그 수가 무엇인지는 중요하지 않다. 여기서는 약수의 존재 여부만이 중요하다. 따라서 isprimeh() 함수는 약수를 찾을 수 없는 경우 True를 반환한다.

```py
def map_not_none(function, iterable):
    for x in iterable:
        try:
            yield function(x)
        except Exception as e:
            pass # print(e)
```
> 이 함수는 반복 가능 객체의 원소를 하나씩 처리한다 주어진 function을 원소에 적용하고, 예외가 발생하지 않는다면 적용한 결과 값을 발생시킨다. 예외가 발생하는 경우에는 해당 값을 조용히 무시한다.

> 활용할 수 없거나 빠진 값이 있는 데이터르 다루는 경우 이러한 기능이 유용할 것이다. 값을 걸러내기 위해 복잡한 filter()를 사용하는 대신, 각 값을 처리하면서 오류가 나는 값을 버리려고 시도하는 것이다.

> None이 아닌 값을 매핑하기 위해 다음과 같은 함수를 사용할 수도 있을 것이다.

```py
data = map_not_none(int, some_source)
```

> int() 함수를 some_source의 각 원소에 적용한다. some_source 매개변수가 문자열로 이뤄진 반복 가능 객체라면, 이 방식을 사용하여 수로 변환할 수 없는 문자열을 걸러내면서 수의 목록을 만들 수 있다.

## Callable로 고차 함수 만들기
> Callable 클래스 정의에 있어 중요한 것은 class 문으로 만들어지는 클래스 객체에 함수를 만들어 내는 함수가 반드시 정의되어 있어야 한다는 것이다. 보통은 기존 함수를 둘 조합하여 상대적으로 더 복잡한 새로운 함수를 만들 때 callable 객체를 사용한다.

```py
from collections.abc import Callable
class NullAware(Callable):
    def __init__(self, some_func):
        self.some_func = sone_func
    def __call__(self, arg):
        return None if arg is None else self.some_func(arg)
```

> 이 클래스는 NullAware()라는 이름의 함수를 만든다. 그 함수는 새로운 함수를 만들어 내는 고차 함수다. NullAware(math.log)라는 식을 평가하면, 인자 값에 적용할 수 있는 사로운 함수를 만들 수 있다. __init__() 메서드는 객체에 그렇게 만들어진 함수를 저장한다.

> __call__() 메서드는 결과 함수가 평가되는 방식을 지정한다. 이 예제에서는 예외를 발생시키지 않고 None 값을 매끄럽게 처리할 수 있게 해주는 함수를 만들어낸다.

```py
null_log_scale = NullAware(math.log)

some_data = [10, 100, None, 50, 60]
scaled = map(null_log_scale, some_data)
print(list(scaled))
```

```py
scaled = map(NullAware(math.log), some_data)
print(list(scaled))
```

> NullAware(math.log)를 평가하면 함수가 만들어진다. 여기서는 그 이름이 없는 함수를 map() 함수에 사용하여 some_data라는 반복 가능 객체를 처리했다.

> __call__() 메서드는 온전히 식의 평가에만 의존한다. 이는 저수준 함수로부터 합성 함수를 정의하는 고상하고 깔끔한 방법이다.

## 좋은 함수형 설계를 보장하기
> 파이썬 객체를 사용하는 경우, 상태가 없는 함수형 프로그래밍이라는 아이디어를 적용하려면 상당히 주의를 기울여야 한다. 객체에는 보통 상태가 있다. 실제로 객체지향 프로그래밍의 모든 목적이 상태를 클래스 정의 안에 캡슐화하는 것이라고 주장할 수도 있다. 컬렉션을 처리하기 위해 파이썬의 클래스 선언을 사용하는 경우, 함수형 프로그래밍과 명령혐 프로그래밍이라는 서로 반대되는 방향으로 자신이 나뉘는 것을 느낄 수도 있다.

> Callable을 사용해 합성 함수를 만들면, 만들어진 합성 함수를 사용할 때 좀 더 단순한 구문을 사용할 수 있다는 장점이 있다. 반복 가능한 매핑이나 축약으로 작업하는 경우, 우리가 상태가 있는 객체를 어떻게 도입하고, 왜 도입해야 하는지를 잘 알아야만 한다.

```py
from collections.abc import Callable
class Sum_Filter(Callable):
    __slots__ = ['filter', 'function']
    def __init__(self, filter, function):
        self.filter = filter
        self.function = function
    def __call__(self, iteralbe):
        return sum(self.function(x) for x in iteralbe if self.filter(x))
```

> 추상 상위 클래스인 Callable을 임포트하여 우리가 만드는 클래스의 기반 클래스로 사용했다. 우리는 이 객체에 정확히 두 가지 슬롯만을 정의했다. 이는 함수를 상태가 있는 객체로 사용하는 것을 제한하기 위한 것이다. 문론 이러한 장치가 결과 객체를 변경하는 것을 모두 막을 수는 없지만, 우리가 오직 두 가지 애트리뷰트만을 사용하도록 제한할 수는 있다 애트리뷰트를 추가하려 시도하면 예외가 발생할 것이다.

> 이 클래스의 인스턴스는 내부에 두 가지 전략을 함수로 저장하고 있는 함수다. 인스턴스는 다음과 같이 만들 수 있다.

```py
count_not_none = Sum_Filter(lambda x: x is not None, lambda x: 1)
```

> 시퀀스에서 None이 아닌 값의 개수를 세는 count_not_none이라는 이름의 함수를 만들었다. None이 아닌 값을 통과시키기 위한 람다와 인자로 받은 값과 관계 없이 1이라는 상수만을 반환하는 람다를 사용해 그러한 함수를 만들 수 있다.

> Callable을 바탕으로 하는 count_not_none 함수는 일반적인 함수처럼 그리 많은 인자를 필요로 하지 않는다. 이로 인해 겉으로는 사용하기가 더 단순해 보인다. 하지만 Callable 클래스를 정의하는 부분과 그 함수를 사용하는 부분으로 함수의 사용과 관련 있는 세부 내용이 소스 코드상에서 나뉘기 때문에 그러한 단순성이 오히려 호출 가능 객체의 사용성을 더 나쁘게 하기도 한다.

## 지다인 패턴 살펴보기
> max(), min(), sorted() 함수에서 key= 함수를 사용하는 것은 일반적인 디자인 패턴이다.

> 고차 컬렉션과 스칼라 함수를 설계하기 위한 여러 가지 다른 디자인 패턴이 있다. 다음은 그 내용을 대략적으로 분류한 것이다.

> * 제네레이터 반환. 고차함수는 제네레이터 식을 반환할 수 있다. 그러한 함수도 고차 함수로 간주하는데, 이유는 스칼라 값이나 값의 컬렉션을 반환하지 않기 때문이다. 이러한 고차 함수 중 일부는 함수를 인자로 받기도 한다.

> * 제네레이터 역할하기. 일부 함수는 yield 문을 사용하여 일급 계층 제네레이터가 되기도 한다. 제네레이터 함수의 값은 지연 계산되는 값의 반복 가능한 컬렉션이다. 우리는 근본적으로는 제네레이터 함수를 제네레이터 식을 반환하는 함수와 구분할 수 없다고 생각한다. 둘 다 엄격하지 않다 둘 다 값의 시퀀스를 내놓는다. 이러한 이유로 제네레이터 함수도 고차함수로 간주할 수 있다. map()이나 filter()와 같은 함수가 이러한 범수에 들어간다.

> * 컬렉션 실체화하기. 일부 함수는 실체화한 컬렉션 객체인 list, tuple, set 또는 매핑 등을 반환한다. 이러한 종류의 함수 중 함수를 인자로 받는 것을 고차 함수라 할 수 있다. 하지만 함수를 인자로 받지 않는다면 컬렉션을 다루는 일반적인 함수일 뿐이다.

> * 컬렉션 축약하기. 일부 함수는 반복 가능(또는 컬렉션) 객체를 사용해 스칼라 결과 값을 만들어 낸다. len(), sum() 등의 함수가 그 예다. 함수를 인자로 받는다면 고차 축약 함수라 할 수 있다.

> * 스칼라. 일부 함수는 개별 데이터에 작용한다. 인자로 함수를 받는 경우, 이 범주에 속한 함수도 고차 함수가 될 수 있다.