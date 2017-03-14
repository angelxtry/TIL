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

## first-class citizen : 함수

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

### 내부 함수

함수 안에 또 다른 함수를 정의할 수 있다.

```
def outer(a, b):
    def inner(c, d):
        return c + d
    return inner(a, b)

print(outer(1, 2))
```

루프나 코드 중복을 피하기 위해 또 다른 함수 내에 어떤 복잡한 작업을 한번 이상 수행할 때 유용하다.

### 클로져

내부함수는 closure 처럼 행동할 수 있다.

클로져는 다른 함수에 의해 동적으로 생성된다.

그리고 내부 함수를 포함하고 있는 외부 함수로부터 생성된 변수 값을 변경하고, 저장할 수 있는 함수다.

```
def add_val(a, b):
    def inner(c, d):
        return c + d
    return inner(a, b)

print("add_val's type: ", type(add_val(2, 3)))
# add_val's type:  <class 'int'>

print("add_val's value: ", add_val(2, 3))
# add_val's value:  5

def add_val2(a, b):
    def inner_c():
        return a + b
    return inner_c

sum23 = add_val2(2, 3)
sum34 = add_val2(3, 4)

print(sum23)
# <function add_val2.<locals>.inner_c at 0x00694228>
print(sum34)
# <function add_val2.<locals>.inner_c at 0x00694270>

print("sum23's type: ", type(sum23), " value: ", sum23())
# sum23's type:  <class 'function'>  value:  5
print("sum34's type: ", type(sum34), " value: ", sum34())
# sum34's type:  <class 'function'>  value:  7
```
* add_val() 함수는 내부 함수를 가지고 있는 함수다.

* add_val2() 함수는 내부에 inner_c()라는 closure를 가지고 있다.

* inner_c()는 매개변수가 없이 외부 함수의 매개변수를 직접 사용한다.

* 외부함수 add_val2()는 inner_c를 호출하는 것이 아니라, 함수 자체를 반환한다.

* 이것이 외부함수에 의해 동적으로 생성되고, 그 함수의 변수값을 알고 있는 함수인 클로져다.

* print 문에서도 확인할 수 있듯이 sum23은 그 자체로 함수다.

* 일반 변수처렴 sum23을 print하면 값이 출력되는 것이 아니라 함수 그 자체의 설명이 출력된다.

* sum23, sum34를 호출하면 처음 생성되었을 때 add_val2() 함수에 의해 전달받은 매개변수를 기억하고 있다는 것을 알 수 있다.

클로저의 장점

* 클로저를 사용하면 전역변수를 사용하는 것을 피할 수 있다.

* 그리고 내부 데이터를 숨기기 위해서도 사용한다.

* 객체지향적인 관점에서도 적은 메소드를 갖는 클래스는 클로저로 표현하는 것이 더 좋다.

* 하지만 속성과 메소드가 많아진다면 클래스가 더 좋은 선택일 수도 있다.

```
def outer_func(tag):  #1
    tag = tag  #5

    def inner_func(txt):  #6
        text = txt  #8
        print '<{0}>{1}<{0}>'.format(tag, text)  #9

    return inner_func  #7

h1_func = outer_func('h1')  #2
p_func = outer_func('p')  #3

h1_func('h1태그의 안입니다.')  #4
p_func('p태그의 안입니다.')  #10
```
출처 <http://schoolofweb.net/blog/posts/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%ED%81%B4%EB%A1%9C%EC%A0%80-closure/>

* 클로저를 이용하여 하나의 함수로 여러가지 함수를 간단히 만들 수 있다.

* 기존에 만들어진 함수나 모듈 등을 수정하지 않고도 wrapper 함수를 이용해 쉽게 커스터마이징할 수 있다.

### 익명 함수 : lambda()

파이썬의 람다 함수는 단일문으로 표현되는 익명 함수다.

```
def edit_story(words, func):
    for word in words:
        print(func(word))

stairs = ['thud', 'meow', 'thud', 'hiss']

def enliven(word):
    return word.capitalize() + '!'

edit_story(stairs, enliven)

edit_story(stairs, lambda word: word.capitalize() + '!')
```

* 두 번재 edit_story 함수에서 lambda를 사용했다.

대부분의 경우 실제 함수를 사용하는 것이 람다를 사용하는 것보다 훨씬 더 명확하다.

람다는 많은 작은 함수를 정의하고, 이들을 호출해서 얻은 모든 결과값을 저장해야 하는 경우에 유용하다.

```
formatted_string = lambda data, size: \
    '{string:{length}}'.format(string=data, length=size)
print(formatted_string("string", 40))
print(len(formatted_string("string", 40)))
```
* 테스트로 만들어 본 람다

* 문자열과 길이를 매개변수로 전달하면 문자열을 포함한 길이의 문자열을 만든다.

`print(list(map(lambda x: x ** 2, range(5))))`

* map을 이용한 람다 활용

* `map(함수, 리스트)` : map은 함수와 리스트를 인지로 받는다.

```
from functools import reduce
print(reduce(lambda x, y: x + y, range(5)))
```

* reduce를 이용한 람다 활용

* `reduce(함수, iterable)` : reduce는 iterable의 element를 누적적으로 함수에 적용한다.

`print(list(filter(lambda x: x < 5, range(10))))`

* filter를 이용한 람다 활용

* `filter(함수, 리스트)` : 리스트의 element를 함수에 적용시켜 True를 만족하는 element만으로 구성된 리스트를 만든다.