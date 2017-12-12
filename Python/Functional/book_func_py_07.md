# 7. 튜플을 사용하는 다른 기법

## 변경 불가능한 이름 있는 튜플을 레코드로 사용하기
> 튜플을 사용하는 방법
> * 인덱스를 사용해 이름이 붙은 원소를 선택하는 람다(또는 함수)
> * 매개변수를 사용해 인덱스에 매핑되는 매개변수 이름에 따라 원소를 선택하는 람다
> * 애트리뷰트 이름이나 인덱스를 사용해 원소를 선택하는 이름 있는 튜플

```py
first_leg = ((xxx.xxx, yyy.yyyy), (zzz.zzzz, kkk.kkkk), rrrr.rrr)
```
> 튜플에 튜플을 내포한 것은 가독성이 좋지 않다.

> 튜플에서 값을 선택할 때 사용할 수 있는 세 가지 방법을 살펴보자. 첫 번째 기법은 튜플에서 인덱스를 가지고 원소를 선택하는 간단한 함수를 정의하는 것이다.

```py
start = lambda leg: leg[0]
end lambda leg: leg[1]
distance = lambda leg: leg[2]
latitude = lambda pt: pt[0]
longitude = lambda pt: pt[1]
```
> 이러한 정의가 있다면 latitude(start(first_leg))를 사용해 원하는 데이터를 참조할 수 있다.

> 이러한 정의는 대상 데이터 타입에 대한 정보를 그리 많이 제공하지 않는다. 이를 좀 더 분명히 하기 위해 간단한 명명 규칙을 사용할 수 있다. 다음은 이름에 접두사를 붙인 선택 함수를 보여준다.

```py
start_point = lambda leg: leg[0]
distance_nm = lambda leg: leg[2]
latitude_value = lambda point: point[0]
```
> 이러한 방식을 너무 추구하면 각 변수 이름마다 접두사를 붙이는 헝가리 표기법 처럼 복잡해질 수도 있다.

> 두 번째 기법은 *매개변수 표기를 사용해 인덱스에 대한 세부 정보를 드러내는 것이다.
```py
start = lambda start, end, distance: start
end = lambda start, end, distance: end
distance = lambda start, end, distance: distance
latitude = lambda lat, lon: lat
```
> 이러한 정의가 있다면, latitude(*start(*first_leg))를 사용해 데이터에서 원하는 부분을 참조할 수 있다. 이 코드는 좀 더 명확하다는 장점이 있다. 하지만 함수에 튜플을 제공하면서 *를 앞에 붙여야만 한다는 사실이 조금 이상해 보일 수 있다.

> 세 번째 기법은 이름 있는 튜플을 만드는 namedtuple 함수를 사용하는 것이다. 이 경우, 다음과 같이 이름 있는 튜플을 내포시켜 사용할 수 있다.
```py
Leg = namedtuple('Leg', ('start', 'end', 'distance'))
Point = namedtuple('Point', ('latitude', 'longitude'))
```
> 이렇게 하면 first_leg.start.latitude를 사용해 데이터의 특정 부분을 가져올 수 있다. 전위 형식의 함수가 후위 형식의 애트리뷰트로 바뀐 것이 이름 있는 튜플로 쓰였다는 것을 알아챌 수 있도록 해준다. 반면, 구분이 바뀌는 것이 혼동을 초래할 수도 있다.

## 함수형 생성자로 이름 있는 튜플 만들기
> namedtuple의 인스턴스를 만드는 방법은 세 가지다. 어떤 기법을 선택할 것인지는 객체를 생성할 때 얼마나 많은 정보가 있느냐에 따라 달라진다.

> * 매개변수 값을 위치에 따라 제공할 수 있다. 평가할 식이 하나 이상 있다면 이러한 방식이 잘 작동할 것이다. Leg 객체를 만들면서 start, end에 haversine() 함수를 적용할 때 이러한 방법을 사용했다.
```py
Leg(start, end, round(haversine(start, end), 4))
```

> * 매개변수 구문을 사용해 튜플 안에서의 위치에 따라 매개변수를 대입한다. 인자를 기존 튜플이나 반복 가능 객체로부터 지정할 경우, 이러한 방식이 잘 작동한다. map()을 사용해 float() 함수를 latitude, longitude 값에 적용할 때 이를 사용했다.
```py
Point(map(float, pick_lat_lon(row)))
```

> * 키워드 대입을 활용할 수 있다. 지금까지 다룬 예제에서는 사용한 적이 없지만, 다음과 같은 형식을 사용하면, 각각의 관계를 좀 더 명확하게 보여줄 수 있다.
```py
Point(longitude=float(row[0]), latitude=float(row[1]))
```

## 상태가 있는 클래스 사용을 피하기 위해 튜플 사용하기

```py
from collections import namedtuple
import csv
import pprint

def row_iter(source):
        return csv.reader(source, delimiter="\t")

def head_split_fixed(row_iter):
    title = next(row_iter)
    assert len(title) == 1 and title[0] == "Anscombe's quartet"
    header = next(row_iter)
    assert len(header) == 4 and header == ['I', 'II', 'III', 'IV']
    columns = next(row_iter)
    assert len(columns) == 8 and\
        columns == ['x', 'y', 'x', 'y', 'x', 'y', 'x', 'y']

    return row_iter

Pair = namedtuple('Pair', ('x', 'y'))
def series(n, row_iter):
    for row in row_iter:
        yield Pair(*row[n*2:n*2+2])

with open("Anscombe.txt") as source:
    data = tuple(head_split_fixed(row_iter(source)))
    sample_I = tuple(series(0, data))
    sample_II = tuple(series(1, data))
    sample_III = tuple(series(2, data))
    sample_IV = tuple(series(3, data))
    print(sample_I)

y_rank = tuple(enumerate(sorted(sample_I, key=lambda p: float(p.y))))
xy_rank = tuple(enumerate(sorted(y_rank, key=lambda rank: float(rank[1].x))))
pprint.pprint(y_rank)
pprint.pprint(xy_rank)

#((0, Pair(x='4.0', y='4.26')),
# (1, Pair(x='7.0', y='4.82')),
# (2, Pair(x='5.0', y='5.68')),
# (3, Pair(x='8.0', y='6.95')),
# (4, Pair(x='6.0', y='7.24')),
# (5, Pair(x='13.0', y='7.58')),
# (6, Pair(x='10.0', y='8.04')),
# (7, Pair(x='11.0', y='8.33')),
# (8, Pair(x='9.0', y='8.81')),
# (9, Pair(x='14.0', y='9.96')),
# (10, Pair(x='12.0', y='10.84')))
#((0, (0, Pair(x='4.0', y='4.26'))),
# (1, (2, Pair(x='5.0', y='5.68'))),
# (2, (4, Pair(x='6.0', y='7.24'))),
# (3, (1, Pair(x='7.0', y='4.82'))),
# (4, (3, Pair(x='8.0', y='6.95'))),
# (5, (8, Pair(x='9.0', y='8.81'))),
# (6, (6, Pair(x='10.0', y='8.04'))),
# (7, (7, Pair(x='11.0', y='8.33'))),
# (8, (10, Pair(x='12.0', y='10.84'))),
# (9, (5, Pair(x='13.0', y='7.58'))),
# (10, (9, Pair(x='14.0', y='9.96'))))
```

y_rank는 Pair.y를 기준으로 정렬하여 enumerate로 순위를 매긴 후 다시 튜플로 만든다.

xy_rank는 y_rank를 이용하여 Pair.x를 기준으로 정렬하여 한 단계 더 내포된 튜플을 만든다.

> 원칙적으로는 x와 y의 순위를 사용해 두 변수 사이의 순위-순서 상관관계를 계산할 수 있다. 하지만 추출하는 식이 약간 이상해 보인다. 데이터 집합 r에 있는 순위가 붙은 표본에 대해 r[0]을 r[1][0]과 비교해야 한다.

...
> 원래의 Pair 객체를 두 번 감싸 순위가 들어간 새로운 튜플을 만들었다. 복잡한 데이터 구조를 점진적으로 만들기 위해 상태가 있는 클래스 정의를 사용하는 것을 피했다.

> 왜 내표 깊이가 깊은 튜플을 만드는 것일까? 그 이유는 지연 계산을 위해서다. 튜플을 분해하여 새로운 평면적인 튜플을 만드는 데는 많은 시간이 걸린다. 기존 튜플을 감싸기만 하면 처리하는 시간이 덜 걸린다.

> 개선이 필요한 사항은 2가지다.
> 1. 좀 더 평면적인 데이터 구조가 좋다. (x rank, (y rank, Pair()))와 같이 내포된 튜플을 사용하는 것은 간결하지도 않고, 이해하기도 어렵다.
> 2. enumerate() 함수는 동률을 잘 처리하지 못한다.
...

## 통계적인 순위 할당하기


## 다형성과 파이썬 다운 패턴 매치
> 일부 마수형 언어는 정적으로 타입을 지정하는 함수 정의에 대해 작업할 수 있는 멋진 접근 방법을 제공한다. 문제가 되는 것은 우리가 작성하려는 많은 함수가 데이터 타입을 기준으로 볼 때 완전히 제네릭한 경우다. 예를 들어, 우리가 사용하는 통계 함수는 나눗셈이 numbers.Real의 하위 클래스(예를 들어, Decimal, Fraction, flost)인 값을 반환하는 한, int나 float에 대해 모두 동일하다. 단 하나의 제네릭한 정의를 여러 데이터 타입에 사용할 수 있게 만들기 위해 정적 타입 지정 언어의 컴파일러난 복잡한 타입 시스템이나 패턴 매치 규칙을 사용한다.

> 정적 타입 함수형 언어의 복잡한 기능을 사용하는 대신, 파이썬 같은 문제를 사용 중인 데이터의 타입에 기반해 연산자의 구현을 동적으로 선택하는 문제로 바꿨다. 이는 우리가 만든 함수가 제대로 된 데이터 타입을 요구하거나 만들어 내는지에 대해 컴파일러가 인증해주지 않는다는 뜻이다. 보통 우리는 이를 단위 테스트에 의존한다.

> 파이썬에서는 코드가 특정 데이터 ㅇ타입에 한정되지 않기 때문에 사실상 제네릭의 정의를 작성하는 것이나 마찬가지다. 파이썬 런타임이 단순한 규칙을 사용해 적절한 연산자를 선택해준다 파이썬 언어 참조 메뉴얼의 3.4.9 타입 변환 규착(Coercion rule)이나 라이브러리의 numbers 모듈은 연산과 특별한 메서드 이름 사이의 연결이 어떻게 이뤄지는 설명해준다.

> 데이터 원소의 타입에 따라 동작이 달라져야 하는 경우도 있다. 이러한 경우를 처리하는 데에는 다음과 같은 방법이 있다.
> * isinstance() 함수를 사용해 여러 가지 다른 경우를 구분한다.
> * tuple이나 numbers.Number의 하위 클래스를 만들고, 적절한 다형성 특수 메서드를 구현한다.

