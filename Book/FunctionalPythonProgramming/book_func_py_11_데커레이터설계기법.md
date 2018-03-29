# 11. 데커레이터 설계 기법
* 데커레이터
    * 이미 존재하는 함수를 기반으로 새로운 함수는 만드는 방법
* 데커레이터 함수의 이점 중 하나는 합성 함수를 만들 수 있다는 것이다.
* 함성함수인 f g(x)는 f(g(x))보다 복잡한 알고리즘을 표현할 때 좀 더 이해하기 쉽다.

## 고차 함수로서의 데커레이터
* 데커레이터 함수를 사용하는 방법은 다음의 두 가지다.
```py
@decorator
def original_func():
    pass
```
* 기반함수와 같은 이름의 새로운 함수를 정의할 수 있다.

```py
def original_func():
    pass
original_func = decorator(original_func)
```
* 새로운 함수를 반환하는 연산으로 명시적으로 사용할 수 있다.
* 만들어지는 함수에 새로운 이름을 부여할 수도 있다.
* 새로운 함수가 원래의 함수를 대치하는 것을 원하지 않을 때 사용한다.

* 어떻게 어떤 함수의 내부 코드 구조를 생신하거나 조정할 수 있는가?
    * 이에 대한 답은 `그렇게 하지 않는다.`이다.
* 코드의 내부를 더럽히는 대신, 원래의 함수를 둘러싸는 새 함수를 정의하는 것이 훨씬 깔끔하다.

```py
from functools import wraps
import math


def nullable(function):
    @wraps(function)
    def null_wrapper(arg):
        return None if arg is None else function(arg)
    return null_wrapper

nlog = nullable(math.log)

@nullable
def nround4(x):
    return round(x, 4)

# nround4 = nullable(lambda x: round(x, 4))

if __name__ == '__main__':
    data = [10, 100, None, 50, 60]
    scaled = map(nlog, data)
    print([nround4(x) for x in scaled])
```
* 데커레이터 함수는 래퍼 함수를 기반 함수에 적용하여 새로운 래퍼 함수를 반환한다. 이 함수를 데커레이션된 함수를 만들어 내는 과정에서 단 한번 실행되는 계산을 수행할 수 있다.
* 래퍼 함수는 기반 함수를 평가할 수 있다. 이 함수는 데커레이션된 함수가 평가될 때마다 평가될 것이다.

* 결과로 만들어지는 합성 함수는 (null_wrapper()) 원래의 함수인 function()을 None 값을 테스트하여 보존해주는 식 안에 넣는다.
* 그 함수는 자유 변수이며, 그 값은 이 래퍼 함수가 정의된 문맥에서 가져오게 된다.
* 데커레이터 함수의 반환 값은 새로 만들어진 함수가 될 것이다.(return null_wrapper)
* 여기서는 데커레이터가 오직 함수만을 반환하며, 데이터를 처리하지는 않는다는 사실이 중요하다.
* 데커레이터는 메타 프로그래밍, 즉 코드를 만들어 내는 코드다.
* 하지만 실제 데이터를 처리할 때는 데커레이터가 반환한 래퍼 함수를 사용할 것이다.

* (한글이 너무 어렵다!)

## 횡단 관심사 cross-cutting concern
* 데커레이터 형태로 설계하여 구현한 후 애플리케이션이나 프레임워크 전반에 걸쳐 관심의 대상이 되는 모든 클래스에 적용할 수 있는 요소들
* 로그, 감사, 보안, 불완전한 데이터 처리
* 이러한 것들을 처리하기 위해 if 조건문을 여러개 붙이는 것을 데커레이터로 방지할 수 있다.

## 합성 설계
* `map(f, map(g x))`를 `map(f_g, x)` 표현할 수 있다.

## 잘못된 데이터 처리하기
```py
import decimal


def bad_data(function):
    def wrap_bad_data(text, *args, **kwargs):
        try:
            return function(text, *args, **kwargs)
        except (ValueError, decimal.InvalidOperation):
            cleaned = text.replace(',', '')
            return function(cleaned, *args, **kwargs)
    return wrap_bad_data

bd_int = bad_data(int)
bd_float = bad_data(float)
bd_decimal = bad_data(decimal)


if __name__ == '__main__':
    print(bd_int('13'))
    print(bd_int('1,234'))
    print(bd_float('1.23'))
    print(bd_int('1,234', base=16))
```
* 적용 불가능이나 값 없음을 표시하는 특별한 값이 있지만 그러한 값이 계산을 수행하는 주 스레드에 영향을 주는 것을 원치 않을 때가 있다.
* 위 예는 문자열을 int, float 등으로 변환할 때 ValueError가 발생하더라도 제대로 처리할 수 있도록 처리했다.

## 매개변수를 데코레이터에 추가하기
* f g(x)라는 합성 함수를 만드는 대신 c라는 매개변수를 래퍼를 생성할 때 지정하여 (f(c)g)(x)라는 합성 함수를 만든다.
* 파이썬으로 표현하면 다음과 같다.
```py
@deco(arg)
def func():
    something
```

* 위 코드는 다음과 같다.
```py
def func():
    something
func = deco(arg)(func)
```
* 위 작업을 다시 설명하면
1. 함수 func를 정의한다.
2. 추상화한 데커레이터 deco()에 인자 arg를 전달하여 구체적인 데커레이터 deco(arg)를 만든다.
3. 구체적인 데커레이터 deco(arg)를 기반 함수 func() 정의에 적용하여, 기반 함수의 데커레이션된 버전인 deco(arg)(func)를 만든다.

```py
def multiply(multiplier):
    def multiply_generator(function):
        def wrapper(*args, **kwargs):
            return multiplier * function(*args, **kwargs)
        return wrapper
    return multiply_generator

@multiply(3)
def calculator(a, b):
    return a * b
print(calculator(2, 3))

# def calculator(a, b):
#     return a * b
# new_func = multiply(3)(calculator)
# print(new_func(2, 3))
```
* multiply는 추상적인 데커레이터를 정의하여 반환한다.
* multiply_generator는 추상적인 데커레이터다. 여기에서 자유변수인 multiplier를 사용한다.
* 데커레이션을 수행하는 래퍼 함수 wrapper.
* 주석처리한 부분은 데커레이터를 사용하지 않고 함수 합성과 유사하게 사용했다.

## 좀 더 복잡한 데커레이터 구현하기
```py
@f_wrap
@g_wrap
def h(x):
    something
```
* 위 코드는 f g h(x)와 어느 정도 비슷한 의미다.
* 하지만 이름은 h(x)다.
* 이로 인한 혼동의 여지가 있기 때문에 데커레이터를 여러 단계로 내포시키는 경우에는 주의해야 한다.
* 단순히 횡단 관심사를 처리하는 경우라면, 크게 혼란스럽지는 않을 것이다.
* 데커레이터를 사용해 합성 함수를 만드는 경우 다음과 같이 사용하는 편이 더 낫다.
`f_g_h = f_wrap(g_wrap(h))`
* 이렇게 하면 어떤 일이 벌어지고 있는지를 좀 더 정확하게 보여준다.