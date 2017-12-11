# 6. 재귀와 축약
> 순수한 함수적 관점에서 보면 축약은 재귀적으로 정의된다. 이러한 이유로 축약 알고리즘을 살펴볼 때는 먼저 재귀적인 알고리즘을 살펴본다.

> 파이썬에서 사용할 수 있는 꼬리재귀 최적화 기법은 명시적으로 for 루프를 사용하는 것이다.

## 수를 계산하는 간단한 재귀
> 모든 연산의 기초가 되는 산술 연산도 재귀적으로 정의할 수 있다.

> 모든 재귀 정의에는 두 가지 경우가 들어 있다. 첫째는 함수의 결과 값을 직접적으로 정의하는 재귀적이지 않은 경우이고, 둘째는 함수의 값을 같은 함수에 다른 값을 적용해 얻은 결과를 사용해 계산해내는 재귀적인 경우다.

> 재귀가 끝난다는 것을 보장하려면, 재귀적인 경우에 사용하는 재귀호출이 어떻게 재귀적이지 않은 경우에 도달하도록 값을 계산하는지 살펴보는 것이 중요하다.

## 꼬리재귀호출 구현하기
> 일부 함수의 경우 재귀적 정의가 더 간결하고 함수를 잘 설명해주기도 한다. 가장 일반적인 예로는 factorial() 함수를 들 수 있다.

```py
def fact(n):
    if n == 0:
        return 1
    else:
        return n * fact(n-1)
```

> 이 정의의 장점은 단순하다는 것이다. 하지만 파이썬의 재귀 깊이 제한으로 인해 fact(997)보다 큰 수를 계산할 수 없다.

```py
def facti(n):
    if n == 0:
        return 1
    f = 1
    for i in range(2, n+1):
        f = f * i
    return f
```

이거 실제로 돌리면 어떻게 되는건지 잘 이해가 안된다. n == 1의 결과는? n == 2의 결과는?

range(2, n)이 아니라 range(2, n+1)이다.

> 이는 순수한 함수형 함수가 아니다. 우리는 꼬리재귀를 i 변수의 갑에 의존하면서 계산 상태를 유지하는 루프로 최적화했다.

## 재귀를 그대로 남겨두기
> 경우에 따라 재귀적 정의가 실제로도 최적일 수 있다. 일부 재귀는 작업의 복잡도를 O(n)에서 O(log2n)으로 바꿔주는 분할 정복 전략을 따른다. 이러한 경우의 한 예는 임의의 제곱수 계산을 2의 거듭제곱을 사용해 계산하는 알고리즘이다.

```py
def fastexp(a, n):
    if n == 0:
        return 1
    elif n % 2 == 1:
        return a * fastexp(a, n-1)
    else:
        t = fastexp(a, n//2)
        return t*t
```

> 이 함수에는 세 가지 경우가 들어 있다. 기본적인 경우 fastexp(a, 0) 메서드는 1로 정의된다. 다른 두 경우는 서로 다른 접근 방법을 선택한다. 홀수의 경우에는 fastexp() 메서드는 재귀적으로 지수 n을 1감소시켜 자신을 호출한다. 이 경우에는 간단한 꼬리재귀로 처리할 수 있다.

> 짝수의 경우 fastexp()는 n/2를 사용해 문제를 원래 크기의 절반으로 줄여 버린다. 문제 크기가 2배 줄었기 때문에 이 경우 처리 속도가 엄청나게 빨라진다.

> 이러한 함수는 쉽게 꼬리재귀 루프로 바꿀 수 없다. 이미 이 알고리즘이 최적이기 때문에 실제 이를 더 최적화할 필요도 없다. 파이썬의 재귀 깊이 제한인 n<=2^1000도 상당히 큰 범위의 계산을 허용한다고 볼 수 있다.

## 처리하기 어려운 꼬리재귀 다루기
> 어떤 피보나치 수 Fn은 그보다 앞의 두 피보나치 수의 합 Fn-1 + Fn-2으로 정의된다. 이는 다중 재귀의 일종이다. 이를 단순한 꼬리재귀로 최적화할 수는 없다. 하지만 이 함수를 꼬리재귀로 최적화하지 않으면, 너무 느려서 쓸모가 없다는 사실을 알게 된다.

```py
def fib(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fib(n-1) + fib(n-2)
```

```py
def fibi(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    f_n2, f_n1 = 1, 1
    for i in range(3, n+1):
        f_n2, f_n1 = f_n1 + f_n2+f_n1
    return f_n1
```

## 재귀를 사용해 컬렉션 처리하기
> 컬렉션을 다루는 경우에도 처리를 재귀적으로 정의할 수 있다.

> 빈 컬렉션에 대한 매핑은 빈 시퀀스로 정의한다. 또한 어떤 컬렉션에 함수 f를 매핑하는 것은 3단계를 거치는 재귀를 사용한 식으로 정의할 수 있다. 첫째, 함수 f를 시퀀스의 마지막 원소를 제외한 나머지 컬렉션에 매핑하여 새로운 컬렉션을 만든다. 둘째, 함수를 마지막 원소에 적용해 결과 값을 얻는다. 마지막으로, 첫 단계에 만들어 낸 컬렉션이 뒤에 둘째 단계에서 얻은 값을 덧붙인다.

> 다음의 map() 함수를 순수하게 함수적인 재귀 버전으로 작성한 것이다.
```py
def mapr(f, collection):
    if len(collection) == 0:
        return []
    return mapr(f, collection[:-1]) + [f(collection[-1])]
```

> mapr() 함수도 파이썬의 옛 map() 함수처럼 list 객체를 만들어 낸다. 파이썬 3의 map() 함수는 반복 가능 객체를 반환하며, 이는 꼬리재귀 최적화의 좋은 예가 아니다.

> 비록 이러한 정의가 우아하기는 하지만, 꼬리재귀를 최적화하지 않았다는 단점이 있다. 꼬리재귀를 최적화하면 1,000개 이상의 원소를 처리할 수 있고, 단순한 재귀 버전보다 실행 성능도 훨씬 좋아진다.

## 컬렉션에 대한 꼬리 호출 최적화
> 컬렉션을 처리하는 일반적인 방법에는 두 가지가 있다. 첫째는 제네레이터 식을 반환하는 고차 함수를 사용하는 것이고, 둘째는 각 원소를 처리하는 for 루프를 사용하는 함수를 만드는 것이다.

> 다음은 내장 map() 함수처럼 작동하는 고차 함수다.

```py
def mapf(f, C):
    return (f(x) for x in C)
```

> 원하는 매핑을 만들어 내는 제네레이터 식을 반환한다. 명시적으로 for 루프를 사용해 꼬리재귀를 최적화했다.

> 다음은 같은 결과를 내놓는 제네레이터 함수다.

```py
def mapg(f, C):
    for x in C:
        yield f(x)
```
> 이 코드는 최적화를 위해 완전한 for문을 사용했다.

> 두 경우 모두 결과는 반복 가능 객체다.

```py
list(mapg(lambda x: 2**x, [0, 1, 2, 3, 4]))
```

> 성능이나 규모 확장성을 생각해보자. 이러한 종류의 꼬리재귀 최적화는 파이썬 프로그래밍에서 필수적이다. 하지만 코드를 덜 순수한 함수형 프로그래밍으로 만든다. 또한 최적화로 얻는 이점이 순수성을 잃는 대가보다 더욱 크다. 간결하면서 알아보기 쉬운 함수형 설계의 이점을 살리기 위해서는 이러한 방식으로 덜 순수한 함수들이 마치 완전한 재귀함수인 것처럼 다루는 것이 도움이 될 수 있다.

## 축약과 겹치기 - 많은 값을 한 가지 값으로 줄이기
> 결과적으로 시퀀스의 각 원소 사이에 *나 +연산자를 겹친 것과 같다. 더 나아가 이를 처리하는 과정이 오른쪽에서 왼쪽으로 진행되도록 원소를 묶었다. 이 경우, 컬렉션을 한 가지 값으로 축약하기 위해 오른쪽으로 접기(fold-right) 방식을 사용했다고 말할 수 있다.

> 파이썬에서는 prod 함수를 다음과 같이 재귀적으로 정의할 수 있다.
```py
def prodrc(collection):
    if len(collection) == 0:
        return 1
    return collection[0] * prodrc(collection[1:])
```

> 기술적으로는 이 정의가 맞다. 수학적 표기를 파이썬으로 다시 쓰는 것은 쉽다. 하지만 중간에 너무 많은 list 객체를 만들어 내기 때문에 이 함수는 최적과는 거리가 멀다. 또 명시적인 컬렉션만 처리할 수 있다는 단점도 있다. 이 함수를 반복 가능 객체에 직접 사용할 수는 없다.

> 이를 약간 바꿔 반복 가능 객체에 적용할 수 있게 만들면, 중간중간 생기는 컬렉션 객체를 없앨 수 있다. 다음은 반복 가능 객체를 사용하면서 재귀적으로 곱셈을 계산하는 함수다.

```py
def prodri(iterable):
    try:
        head = next(iterable)
    except StopIteration:
        return 1
    return head * prodri(iterable)
```

> 반복 가능 객체의 원소 개수를 알아내기 위해 len()을 호출할 수는 없다. 우리가 할 수 있는 것은 반복 가능 객체의 다음 원소를 가져오는 것뿐이다. 그 객체에 원소가 없다면 다음 원소를 가져오려는 시도는 StopIteration 예외를 발생시킨다. 원소가 있다면 그 원소와 반복 가능 객체의 나머지 원소의 곱을 서로 곱한다. 이 함수를 시험해보기 위해서는 반드시 iter() 함수를 사용해 실체화된 시퀀스 객체로부터 반복 가능 객체를 만들어야 한다. 사용 가능한 반복 가능 객체가 있는 경우라면 그냥 그 객체를 쓰면 된다.

```py
prodri(iter([1, 2, 3, 4, 5, 6, 7]))
```

> 여기에 있는 재귀적 정의는 눈에 보이는 상태나 파이썬의 다른 명령형 기능에 의존하지 않는다 이 함수가 좀 더 순수 함수이기는 하지만, 이 역시 원소가 1,000개 이하인 경우에만 처리할 수 있다. 실용성을 위해 다음과 같이 명령형의 축약 함수를 사용할 수 있다. 

```py
def prodi(iterable):
    p = 1
    for n in iterable:
        p *= n
    return p
```

> 이렇게 하면 재귀 깊이의 제한에 영향을 받지 않는다. 이 함수에는 필요한 꼬리재귀 최적화가 잘 들어 있다. 더 나아가 대상 객체가 시퀀스냐, 반복 가능 객체이냐와 관계 없이 잘 작동할 것이다.

> 다른 함수형 언어에서는 이러한 함수를 `foldl 연산`이라 부른다. 연산자가 반복 가능 컬렉션의 값을 왼쪽에서 오른쪽으로 겹쳐 나간다. 이는 계산을 오른쪽에서 왼쪽으로 진행해 나가는 `foldr`이라 불리는 재귀 정의와는 차이가 있다.

> 최적화 컴파일러와 지연 계산이 있는 언어에서 오른쪽 접기와 왼쪽 접기는 중간 결과가 만들어지는 순서를 결정한다. 경우에 따라 둘 사이에 심각한 성능상의 차이가 나타날 수도 있지만, 그러한 차이가 항상 분명한 것은 아니다. 예를 들어, 왼쪽 접기는 시퀀스의 첫 번째 원소를 즉시 가져오기는 하지만, 모든 원소를 다 가져와 처리한 후에야 첫 번째 원소를 처리한다.

## 그룹 만들기 축약 - 많은 값을 좀 더 적은 값으로 줄이기
> SQL에서는 이를 종종 SELECT GROUP BY 연산이라 부른다. 원데이터를 컬럼들의 값에 따라 그룹으로 나눈 후, 특정 컬럼 값이나 축약 값(때로는 aggregate function 이라 부른다)을 계산한다.

## Counter로 매핑 만들기
> collection.Counter와 같은 매핑을 사용하면 컬렉션에 있는 원소들을 특정 값에 의해 그룹화하여 개수(또는 합계)를 계산하는 축약을 수행할 때 상당한 최적화를 달성할 수 있다. 데이터를 그룹화할 때 더 함수적인 접근 방법은 원래의 컬렉션을 정렬하고, 재귀적 루프를 사용하여 각 그룹의 시작 부분을 식별하는 것이다. 이렇게 하려면 원데이터를 실체화해야 하고, 정렬에 O(nlogn)이 들고, 그 후 각 키에 따른 합계나 개수를 계산하기 위한 축약에도 비용이 든다.

> 다음 제네레이터를 사용해 그룹을 나눌 기준 거리의 시퀀스를 만들 수 있다.
```py
quantized = (5*(dist//5) for start, stop, dist in trip)
```
> 각 거리를 5로 나누고, 정수 나눗셈으로 소수점 이하를 버림한 후 다시 5를 곱하여 가장 가까운 5해리 단위로 거리를 내림했다.

> 다음 식은 거리와 빈도를 연결하는 매핑을 만든다.
```py
from collections import Counter
Counter(quantized)
print(Counter(quantized).most_common())
```
> Counter(quantized).most_common()를 출력한다면, 거리와 횟수의 쌍을 볼 수 있다.

## 정렬을 사용해 매핑 만들기
> Counter 클래스가 없이 같은 문제의 해법을 구현하고 싶다면, 정렬한 후 그룹을 만드는 더 함수적인 방식을 사용할 수 있다.

```py
def group_sort(trip):
    def group(data):
        previous, count = None, 0
        for d in sorted(data):
            if d == previous:
                count += 1
            elif previous is not None: # and d != previous
                yield previous, count
                previous, count = d, 1
            elif previous is None:
                previous, count = d, 1
            else:
                raise Exception("Bad Bad design problem")
        yield previous, count
    quantized = (5*(dist//5) for start, end, dist in trip)
    return dict(group(quantized))
```


## 키 값에 따라 데이터를 그룹화하거나 분할하기
> 비어 있지 않은 컬렉션의 경우, 머리 원소인 C[0]을 처리하고, 재귀적으로 꼬리인 C[1:]을 처리해야 한다. 컬렉션을 이렇게 나누기 위해 head, *tail = C를 사용할 수 있다.

```py
C = [1, 2, 3, 4, 5]
head, *tail = C
print(head, *tail)
# 1 [2, 3, 4, 5]
```

```py
def group_by(key, data):
    def group_into(key, collection, dictionary):
        if len(collection) == 0:
            return dictionary
        head, *tail = collection
        dictionary[key(head)].append(head)
        return group_into(key, tail, dictionary)
    return group_into(key, data, defaultdict(list))
```

> 내부 함수는 앞에서 설명한 재귀를 정의한다. 빈 컬렉션의 경우 제공 받은 딕셔너리를 반환한다. 비어 있지 않은 컬렉션의 경우 머리와 꼬리를 나눈다. 머리를 사용해 딕셔너리를 갱신하고, 꼬리를 재귀적으로 새용해 나머지 모든 원소에 대해 딕셔너리를 갱신한다.

> 파이썬의 기본 값 기능을 사용해도 쉽게 전체를 한 함수 정의에 넣을 수는 없다.

```py
def group_by(key, data, dictionary=defaultdict(list)):
```
> 이렇게 한다면 group_by() 함수를 사용하는 모든 호출에서 동일한 defaultdict(list) 객체를 공유할 것이다. 파이썬은 기본 값을 한 번만 만든다. 변경 가능한 객체를 기본 값으로 쓰는 경우는 드물다. 변경 불가능한 기본 값(예: None)을 처리하기 위해 복잡한 의사 결정을 코드에 넣는 것보다 함수 정의를 내포시키는 것이 낫다.

```py
binned_distance = lambda leg: 5*(leg[2]//5)
by_distance = group_by(binned_distance, trip)

import pprint
for distance in sorted(by_distance):
    print(distance)
    pprint.pprint(by_distance[distance])
```

> 루프를 사용하여 만들 수도 있다.
```py
def partition(key, data):
    dictionary = defaultdict(list)
    for head in data:
        dictionary[key(head)].append(head)
    return dictionary
```

## 더 일반적인 그룹화 축약 작성하기
> 원데이터를 분할하고 나면, 각 분할에 속한 컬렉션에 대해 여러 가지 축약을 수행 할 수 있다.

> 튜플을 분해하기 위한 도우미 함수는 다음과 같이 정의할 수 있다.

```py
start = lambda s, e, d: s
end = lambda s, e, d: e
dist = lambda s, e, d: d
latitude = lambda lat, lon: lat
longitude = lambda lat, lon: lon
```

> 이러한 도우미 함수의 인자로는 튜플에 * 연산자를 사용하여 튜플의 각 원소를 람다의 인자로 전달해야 한다.

```py
point = ((3, -3), (5, -5), 12)
start(*point)
# (3, -3)
start(*end)
# (5, -5)
dist(*end)
# 12
latitude(*start(*point))
# 3
```

> 이러한 함수가 있다면, 각 그룹별로 가장 북쪽에 있는 시작점을 찾을 수 있다.
```py
for distance in sorted(by_distance):
    print(distance, max(by_distance[distance],
                        key=lambda pt: latitude(*start(*point))))
```
> 거리별로 그룹화한 데이터에는 주어진 거리에 따른 구간들이 들어 있다. 각 그룹의 모든 구간을 max() 함수에 전달한다.

## 고차 축약 함수 작성하기
```py
def sum_filter_f(filter, function, data):
    return sum(function(x) for x in data if filter(x))

count_ = lambda x: 1
sum_ = lambda x: x
valid = lambda x: x is not None
N = sum_filter_f(valid, count_, data)
```

> sum_filter_f()에 두 가지 다른 람다를 제공할 수 있다는 것을 보여준다. 이 함수는 실제로 값이 아니라 함수를 반환한다.

## 파일 구문 분석기 작성하기
