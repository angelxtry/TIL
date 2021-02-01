# 8. itertools 모듈

> 반복 가능한 컬렉션을 가지고 작업할 때 도움을 줄 수 있는 함수를 여럿 제공하는 itertools 라이브러리

> 반복 가능 객체는 오직 한 번만 사용할 수 있다. 다른 오류를 발생시키지도 않는다. 일단 한 번 사용하고 나면 반복 가능 객체에는 아무 원소도 없는 것처럼 보이며, 매번 호출할 때마다 StopIteration 예외를 발생시킨다.

## 무한 반복자로 작업하기
### count()로 개수 세기
> 내장 range() 함수를 정의하려면 최댓값이 있어야 한다. 최솟값이나 증분 값은 생략할 수도 있다. count() 함수에는 시작 값과 생략 가능한 증분 값이 있지만, 최댓값은 없다.

> zip()과 count()를 가지고 enumerate()를 다음과 같이 정의할 수 있다.
```py
enumerate = lambda x, start=0, zip(count(start), x)
```
> enumerate() 함수는 zip() 함수를 어떤 반복 가능 객체와 count() 함수에 적용한 것처럼 작동한다.

> 다음 두 명령은 서로 같다.
```py
zip(count(), some_iterator)
enumerate(some_iterator)
```

```py
zip(count(1, 3), some_iterator)
```
> 이렇게 하면 1, 4, 7, 10 등의 수를 반복자의 각 값에 대한 식별자로 제공할 수 있다. enumerate()는 증분 값을 바꿀 수 없기 때문에 이러한 작업을 하기가 조금 어렵다.

```py
((1+3*e, x) for e, x in enumerate(x))
```

```py
a = ['a', 'b', 'c']
result = ((1+3*e, x) for e, x in enumerate(a))
print(tuple(result))
# ((1, 'a'), (4, 'b'), (7, 'c'))
```

> count() 함수에는 정수가 아닌 값도 전달할 수 있다. count(0.5, 0.1)과 같은 방법을 사용해 부동 소수점 수 값을 제공할 수 있다. 증분 값을 2진 부동 소수점수로 정확히 표현할 수 없다면, 이러한 식으로 만든 수의 시퀀스에는 상당한 오류가 누적된다. 

```py
(0.5+x*.1 for x in count())
```
> 위와 같은 방법을 사용하여 표현 방식에 따른 오류를 누적시키지 않는 것이 좋다.

> 다음은 누적에 따른 오류를 관찰하는 방법을 보여준다.
잘 모르겠다...

### cycle()을 사용해 순환되는 원소를 계속 반복하기
> cycle() 함수를 사용해 다음과 같이 True와 False의 시퀀스를 내보낼 수 있다.

```py
m3 = (i == 0 for i in cycle(range(3)))
m5 = (i == 0 for i in cycle(range(5)))

multipliers = zip(range(10), m3, m5)
``` 

> m3, m5를 유한한 개수의 수 컬렉션과 zip() 한다면 어떤 수와 해당 수가 3의 배수인지와 5의 배수인지의 여부를 표시하는 두 불린 값으로 이뤄진 3-튜플을 얼을 수 있다.

> 이 3-튜플을 분해하고 필터를 적용하여 배수인 것인 남기고, 나머지는 없앨 수 있다.

```py
sum(i for i, *multipliers in multipliers if any(multipliers))
```

> 탐색적 데이터 분석. 규모가 큰 표본 데이터 집합을 다뤄야 할 경우가 있다. 초기 데이터 정리 및 모델 개발 단계는 작은 규모의 데이터 집합을 사용해 잘 진행할 수 있고, 더 큰 데이터 집합을 사용해 테스트할 수도 있다. cycle() 함수를 사용해 어떤 커다란 집합에서 일부 행을 공평하게 선택할 수 있다. 모집단의 크기가 Np라면 원하는 표본 크기 Ns를 가지고 우리가 cycle()에서 필요로 하는 반복의 길이를 정할 수 있다.

> c = Np/Ns

```py
chooser = (x == 0 for x in cycle(range(c)))
rdr = csv.reader(source_file)
wtr = csv.writer(target_file)
wtr.writerows(row for pick, row in zip(chooser, rdr) if pick)
```

```py
chooser = (x == 0 for x in range(3))
print(tuple(chooser))
# (True, False, False)
```
위의 코드가 잘 이해가 안되서 간단하게 테스트해봤다. chooser는 range(3)의 결과가 0일때만 True이고 나머지는 모두 False가 된다.

탐색적 데이터 분석이란 문구와 함께 생각해보면 주기적으로 한 줄을 뽑아 테스트할 대상을 만들기 위한 코드인 것 같다.

### repeat()로 단일 값 반복하기
```py
list(tuple(repeat(i, times=i)) for i in range(10))
# [(), (1,), (2, 2), (3, 3, 3), (4, 4, 4, 4), (5, 5, 5, 5, 5), (6, 6, 6, 6, 6, 6), (7, 7, 7, 7, 7, 7, 7), (8, 8, 8, 8, 8, 8, 8, 8), (9, 9, 9, 9, 9, 9, 9, 9, 9)]
```

```py
list(sum(repeat(i, times=i)), for in range(10))
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

## 유한한 반복자 사용하기
### enumerate()로 수 할당하기
> 정렬한 데이터에 순위를 부여하여 튜플을 만든다.
```py
pairs = tuple(enumerate(sorted(raw_values)))
```

```py
Leg = namedtuple('Leg', ('order', 'start', 'end', 'distance'))

def ordered_leg_iter(pair_iter):
    for order, pair in enumerate(pair_iter):
        start, end = pair
        yield Leg(order, start, end, round(haversine(start, end)))
```

### accumulate()로 현재까지의 합계 구하기
> accumulate() 함수는 주어진 함수를 반복 가능 객체에 겹쳐, 일련의 축약 값을 누적시킨다. 이 함수의 함수 인자의 기본 값이 operator.add()이기 때문에 반복자의 처음부터 현재까지의 합계를 얻을 수 있다. 하지만 다른 함수를 전달하면 합ㄱ계가 아니라 처음부터 현재까지의 모든 수를 곱한 값을 구하도록 바꿀 수도 있다.

> 구간별 합게의 응용 중 하나로는 데이터의 4분위 수(quartile)를 구하는 것이 있다. 각 표본의 누적 합계를 구하고, int(4*value/total)를 계산해 이를 네 구간으로 나눌 수 있다.

```py
distances = (leg.distances for leg in trip)
distance_accum = tuple(accumulate(distances))
total = distance_accum[-1]+1.0
quartiles = tuple(int(4*d/total) for d in distance_accum)
```
> 거리값을 뽑아내서 각 구간의 누적 거리를 구했다. 최종 누적 거리는 총 거리다. 1.0을 total에 더하여 4*d/total이 3.9983이 되도록 보장한다 이 값의 소수점 이하를 버리면 3이다. +1.0이 없으면, 최종 원소의 값이 4가 될 수 있고, 이는 있을 수 없는 다섯 번째 4분위 값이다. 일부 데이터의 경우(값이 매우 큰 경우), 더 큰 값을 더해야 할 수도 있다.

...

### chain()으로 반복자 조합하기
> chain() 함수를 사용해 반복자의 컬렉션을 단일 반복자로 합칠 수 있다. 이러한 기능은 groupby() 함수로 분할한 데이터를 다시 하나로 합칠 때 유용하다. 이 함수를 사용해 여러 컬렉션이 마치 한 컬렉션인 것처럼 다룰 수 있다.

> 특히, chain() 함수를 contextlib.ExitStack() 메서드와 함께 사용하면 여러 파일의 컬렉션을 하나의 반복 가능한 시퀀스처럼 다를 수 있다.

```py
from contextlib import ExitStack
import csv
def row_iter_csv_tab(*filename):
    with ExitStack() as stack:
        files = [stack.enter_context(open(name, 'r', newline=''))
                 for name in filenames]
        readers = [csv.reader(f, delimiter='\t') for f in files]
        readers = map(lambda f: csv.reader(f, delimiter='\t'), files)
        yield from chain(*readers)
```
> 몇 개의 열린 컨텍스트를 포함하는 ExitStack 객체를 만들었다. with문이 끝나면 ExitStack 객체 안의 모든 원소는 적절히 닫힌다.

> with문의 컨텍스트를 벗어나면 모든 원본 파일이 닫힌다. 따라서 with문의 컨텍스트를 살려둔 채 각 행을 yield 해야만 한다.

### groupby()로 반복자를 분할하기
> groupby() 함수를 사용해 반복자를 더 작은 반복자들로 나눌 수 있다. 인자로 남기는 key() 함수를 반복자의 각 원소에 적용하여 그룹을 정한다. 현재 원소의 키가 직전 원소의 키와 일치한다면 두 원소는 같은 그룹에 들어간다. 만약, 현재 원소의 키가 직전 원소의 키오 다르다면, 직줜 원소가 들어간 그룹을 닫고, 새로운 그룹을 시작한다.

> groupby() 함수의 출력은 2-튜플의 시퀀스다. 각 튜플에는 그룹의 키 값과 그룹 내의 원소에 대한 반복 가능 객체가 들어간다. 각 그룹의 반복자를 튜플로 만들어 보관하거나 특정 요약 값을 만들어 내기 위해 처리할 수 있다. 그룹의 반복자가 만들어진 방식으로 인해 각 반복자를 보존할 수는 없다.

> 원데이터가 들어 있는 trip 변수와 할당된 4분위 값이 있다면, 다음과 같은 명령으로 데이터를 그룹화할 수 있다.
```py
group_iter = groupby(zip(quartile, trip), key=lambda q_raw: q_raw[0])

for group_key, group_iter in group_iter:
    print(group_key, tuple(group_iter))
```

> 먼저 4분위 수와 원 trip 정보를 zip한다. groupby() 함수는 주어진 lambda를 사용해 4분위 수를 기준으로 그룹을 만든다. groupby() 함수가 만들어 낸 결과를 for 루프를 사용해 관찰했다.

> groupby() 함수의 입력은 키 값에 의해 정렬된 상태여야 한다. 그렇게 해야 같은 그룹에 속하는 모든 원소가 원 반복자 내에서 서로 이웃할 수 있다.

> defaultdict(list) 메서드를 사용해 그룹을 만들 수도 있다.
```py
def groupby_2(iterable, key):
    groups = defaultdict(list)
    for item in iterable:
        groups[key(item)].append(item)
    for g in groups:
        yield iter(groups[g])
```

> list 객체를 각 키와 연관된 값으로 하는 defaultdict을 만들었다. 각 원소에 주어진 key() 함수를 적용하여 키 값을 만든다. 그리고 defaultdict 클래스에서 key에 해당하는 리스트의 끝에 원소를 추가한다.

> 모든 원소를 분할하고 나면, 공통 키를 공유하는 원소에 대한 반복자 형태로 각자의 분할을 반환할 수 있다. 이는 groupby() 함수와 비슷하지만, 이 함수에 대한 입력 반복자는 꼭 키 값을 기준으로 정렬될 필요가 없다는 것이 다르다. 또한 각 그룹에 속한 원소는 같더라도 원소들의 순서는 달라질 수 있다.

### zip_longist(), zip()을 사용해 반복 가능 객체 합치기