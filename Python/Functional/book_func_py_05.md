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

> * 풀기(처리(감싸기())) 패턴을 사용한다. 이렇게 하면 최대, 최소 거리가 있는 구간을 얻을 수 있다. 그로부터 거리만 필요하다면 거리만을 뽑아낼 수도 있다. 구간을 나태내는 두 위치 정보를 사용해 어떤 구간이 최대 또는 최소인지를 파악할 수 있다.

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