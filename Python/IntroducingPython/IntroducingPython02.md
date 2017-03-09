# Introducing Python

다음의 모두 False로 간주한다.

1. `None` : null
2. `0` : 정수 0
3. `0.0` : 부동소수점수 0
4. `''` : 빈 문자열
5. `[]` : 빈 리스트
6. `()` : 빈 튜플
7. `{}` : 빈 딕셔너리
8. `set()` : 빈 셋

----

문자열, 리스트, 튜플, 딕셔너리, 셋 등은 iteralbe(순회 가능)한 객체다.

* 특히 문자열도 그 자체로 iterable 한 객체다.

----

`zip()` : 여러 시퀀스 순회하기

* `for ELE_A, ELE_B, ELE_C in zip(LIST_A, LIST_B, LIST_C:`

* 여러 시퀀스 중 가장 짧은 시퀀스가 완료되면 `zip()`은 멈춘다.

`range()` : 숫자 시퀀스 생성하기

* slice의 사용법과 비슷하다.

* `range(start, stop, step)`

* start를 생락하면 0에서 시작, stop은 꼭 입력해야 하는 값, step의 기본 값은 1

* `range(2, -1, -1)` : 2에서 0까지

## ● comprehension(함축)

하나 이상의 iterator로 자료구조를 만드는 compact 한 방법

### 리스트 comprehension

`number_list = [number for number in range(1, 5)]`

* 첫 번째 number : 리스트의 element

* 두 번째 number : for문의 일부

`odd_list = [number for number in range(1, 6) if number % 2 == 1]`

* 루프 중첩도 가능하다.

`LIST_NAME = [(ele_a, ele_b) for ele_a in LIST_A for ele_b in LIST b]`

### 딕셔너리 comprehension

`{key : value for item in iterator}`

`{letter: word.count(letter) for letter in set(word)}`

### 셋 comprehension

`{key for key in iterator}`

### generator comprehension

`(ELEMENT for ELEMENT in iterator)`

* `()`를 사용했지만 튜플이 아니라 generator comprehension

* generator 객체를 반환한다.

```
number_thing = (number for number in range(1, 6))
for number in number_thing:
    print(number)

number_list = list(number_thing)
print(number_list)
```

* 첫 print는 정상적으로 출력된다.

* 두번째 print는 `[]`을 출력한다.

generator는 한 번만 실행될 수 있다.

generator는 즉석에서 값을 생성하고, iterator를 통해 한 번에 값을 하나씩 처리한다.

generator는 이 값을 기억하지 않으므로 다시 시작하거나 백업할 수 없다.

## 함수

### 기본 매개변수값 지정

기본 매개변수값은 함수가 실행될 때 계산되는 것이 아니라 함수를 정의할 때 계산된다.

리스트 또는 딕셔너리와 같은 immutable한 데이터 타입을 기본인자로 사용하지 말자.

## 위치 인자 모으기 : `*`

함수의 매개변수에 `*`를 사용하면 위치 인자 변수들을 튜플로 묶는다.

가변 인자의 이름으로 관용적으로 `*args`를 사용한다.

## 키워드 인자 모으기 : `**`

`**`를 사용하면 인자의 이름은 key고 값은 value인 딕셔너리가 된다.

관용적으로 `**kwargs`를 사용한다.

## docstring

`help()` : 함수의 docstring을 출력

서식 없는 docstring을 그대로 보고 싶다면 

* `print(FUNC_NAME.__doc__)`

----

파이썬에서 함수는 first-class citizen이다.

* (함수도 객체이고)

* 함수를 변수에 할당할 수 있고

* 다른 함수에서 함수를 인자로 쓸 수 있으며

* 함수에서 함수를 반환할 수 있다.

```
def answer():
    print('Answer!')

def run_something(func):
    func()

run_something(answer)
```
* answer() 함수를 정의했다.

* run_something(func) 내부에서 func 파라미터로 함수를 호출한다.

* run_something 함수에 answer()를 전달하는 것이 아니라 answer를 전달했다.

* answer()는 함수를 호출한다는 의미다.

* `()`가 없으면 함수를 다른 모든 객체와 마찬가지로 간주한다.

```
def add_args(arg1, arg2):
    print(arg1 + arg2)

def run_something_with_args(func, arg1, arg2):
    func(arg1, arg2)

run_something_with_args(add_args, 4, 5)
```

```
def sum_args(*args):
    return sum(args)

def run_something_with_positional_args(func, *args):
    return func(*args)

sum_value = run_something_with_positional_args(sum_args, 1, 2, 3, 4, 5)

print(sum_value)
```
* 여러개의 위치 인자를 파라미터로 받는 sum_args(*args) 함수를 정의했다.

* sum() 함수는 iterable한 숫자 인자의 값을 모두 더하는 내장 함수다.

* run_something_with_positional_args 함수는 함수(sum_args)와 여러 위치 인자를 파라미터로 받는다.

함수를 리스트, 튜플, 셋, 딕셔너리의 요소로 사용할 수 있다.

함수는 불변하기 때문에 딕셔너리의 키로도 사용할 수 있다.

