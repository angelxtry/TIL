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
