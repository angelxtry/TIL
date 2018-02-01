# pep8

* 아래 경로의 글을 요약한 것입니다.
https://b.luavis.kr/python/python-convention

## 들여쓰기

* 구분자를 사용하여 정렬하기
```py
foo = long_function_name(var_one, var_two,
                         var_three, var_four)
```

* 나머지 코드와의 구별을 위해 추가적인 들여쓰기를 사용했다.
```py
def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)
```

* 다음의 경우는 모두 통용된다.

```py
my_list = [
    1, 2, 3,
    4, 5, 6,
    ]

result = some_function_that_takes_arguments(
    'a', 'b', 'c',
    'd', 'e', 'f',
    )

my_list = [
    1, 2, 3,
    4, 5, 6,
]

result = some_function_that_takes_arguments(
    'a', 'b', 'c',
    'd', 'e', 'f',
)
```

* 한 행에는 최대 79글자까지만

* 글자가 많은 행에 줄바꿈을 적용할 경우 좋은 방법은 괄호, 중괄호, 대괄호 등의 내부에 여러 행의 코드를 적는 것이다. 파이썬에서 이들 코드는 암시적으로 계속 이어지는 것으로 처리된다.

* 연산자(and, or 등 포함) 다음에 줄바꿈을 한다.

```py
class Rectangle(Blob):

    def __init__(self, width, height,
                 color='black', emphasis=None, highlight=0):
        if (width == 0 and height == 0 and
            color == 'red' and emphasis == 'strong' or
            highlight > 100):
            raise ValueError("sorry, you lose")
        if width == 0 and height == 0 and (color == 'red' or
                                           emphasis is None):
            raise ValueError("I don't think so -- values are %s, %s" %
                             (width, height))
        Blob.__init__(self, width, height,
                      color, emphasis, highlight)
```

## 빈 줄
* 최상위 수준 함수와 클래스 정의는 두 줄을 띄워서 구분한다.
* 클래스 메서드 정의는 한 줄을 띄워서 구분한다.
* 서로 연관이 있는 함수들의 묶음을 구분하기 위해 빈 줄을 추가로 사용할 수 있다.
* 함수 내에서 논리적인 단위를 드러내기 위해 빈 줄을 사용하라.(하지만 아껴서 사용하자.)

## 인코딩
* UTF-8을 권장한다.

## import
* import는 행으로 구분되어야 한다.
```py
# good
import os
import sys
# bad
import os, sys
```

* 다음과 같이 import 하는 것은 괜찮다.
```py
from subprocess import Popen, PIPE
```

* import 구문은 항상 파일의 최상단에 위치해야 하며, 모듈의 주석문과 docstring의 바로 다음, 그리고 모듈의 전역 변수와 상수 바로 이전에 위치한다.
* import 구문은 다음 순서에 따라 그룹별로 기술한다.
1. 표준 라이브러리
2. 서드파티 라이브러리
3. 로컬 어플리케이션/자체 라이브러리
* 각 그룹 사이에는 빈 줄을 하나 넣어야 한다.
* import 구문 다음에는 `__all__` 명세를 넣는다. - 이거 무슨 의미지?

* 상대 경로를 사용하여 내부 패키지를 import 하지 않는다. 절대 경로를 사용하여 import 한다.
```py
from myclass import MyClass
from foo.bar.yourclass import YourClass
```

* 만약 이름이 이미 선언된 로컬 이름과 충돌할 경우, 다음과 같이 기술한다.
```py
import myclass
import foo.bar.yourclass
```

## 표현식, 구문에서 공백문자
* 괄호, 중괄호, 대괄호
```py
spam(ham[1], {eggs: 2})  # good
spam( ham[ 1 ], { eggs: 2 } )  # bad
```

* 콤마, 세미콜론, 콜론의 위치
```py
if x == 4: print x, y; x, y = y, x  # good
if x == 4 : print x , y ; x , y = y , x  # bad
```

* 항상 이진 연산자의 주위에는 한 개의 공백을 넣는다.
```
할당 (=), 증감 할당 (+=, -= 등.), 비교 (==, <, >, !=, <>, <=, >=, in, not in, is, is not), 부울 연산 (and, or, not)
```
* 우선 순위가 서로 다른 연산자를 함께 사용할 경우, 우선 순위가 높은(먼저 계산되는) 연산자 주위에는 공백을 넣지 않는다.
```py
# good
i = i + 1
submitted += 1
x = x*2 - 1
hypot2 = x*x + y*y
c = (a+b) * (a-b)

# bad
i=i+1
submitted +=1
x = x * 2 - 1
hypot2 = x * x + y * y
c = (a + b) * (a - b)
```
* 키워드 인수 혹은 기본 매개변수 값을 나타내는 경우에는 `=` 기호 주위에 공백을 넣지 않는다.
```py
# good
def complex(real, imag=0.0):
    return magic(r=real, i=imag)

# bad
def complex(real, imag = 0.0):
    return magic(r = real, i = imag)
```

* 여러 구문이 한 줄에 있는 것은 일반적으로 권장되지 않는다.
```py
# good
if foo == 'blah':
    do_blah_thing()
do_one()
do_two()
do_three()

# bad
if foo == 'blah': do_blah_thing()
do_one(); do_two(); do_three()
```

* 짧은 if/for/while 구문을 한 줄에 넣는 것은 괜찮지만, 여러 절을 가진 구문은 절대 한 줄에 기술하지 않는다.
```py
# soso
if foo == 'blah': do_blah_thing()
for x in lst: total += x
while t < 10: t = delay()

# bad
if foo == 'blah': do_blah_thing()
else: do_non_blah_thing()

try: something()
finally: cleanup()

do_one(); do_two(); do_three(long, argument,
                             list, like, this)

if foo == 'blah': one(); two(); three()
```

## 인라인 주석문
* 아껴서 사용한다.

* 인라인 주석문은 코드에서 최소한 두 개 이상의 공백으로 분리한다.
```py
x = x + 1  # 경계값에 대한 보상
```

## docstring
* public으로 정의된 모든 모듈, 함수, 클래스, 메서드에 docstring을 작성한다.
* public으로 정의되지 않은 메서드에는 docstring을 작성할 필요가 없다.
* 하지만 해당 메서드가 무슨 일을 하는지 설명하는 주석은 달아야 한다.
* 이러한 주석은 `def`가 있는 행 바로 다음 행에 작성한다.

* `"""`영역이 끝나는 부분에서 한 줄 전체에 `"""` 문자를 넣고, 바로 위 한 줄을 빈 줄로 두어야 한다.
```py
"""Return a foobang

Optional plotz says to frobnicate the bizbaz first.

"""
```
* 한 줄 짜리 docstring의 경우에는 같은 줄에서 `"""`를 닫아도 된다.

## 명명 규칙
* 이미 다른 스타일로 작성되어 있는 기존 라이브러리는 그 자체의 일관성을 유지하도록 한다.

* 서로 연관이 있는 명칭들을 통합하기 위해 짧은 고유 접두사를 사용하는 스타일이 존재하나 사용하지 않도록 한다.

* 파이썬은 어트리부텅와 메서드에 접근할 때 객체를 접두사로 사용하며, 함수에 접근할 때는 모듈 이름을 접두사로 사용한다.

* `_single_leading_underscore`
    * 내부에서 사용한다는 것을 의미
    * `from M import *`은 언더스코어로 시작하는 객체를 import 하지 않는다.
* `single_trailing_underscore_`
    * 파이썬 키워드와 동일한 이름을 사용하여 충돌할 경우 사용한다.
* `__double_leading_underscore`
    * 클래스 어트리뷰트의 이름을 이렇게 지으면 name mangling이 발생한다.
* `__double_leading_and_trailing_underscore__`
    * 사용자가 관리하는 네임스페이스 내에 있는 magic 객체

### 패키지와 모듈 이름
* 모듈은 소문자로 이루어진 짧은 이름을 사용한다.
* 모듈 이름의 가독성을 높이기 위해 언더스코어를 사용할 수 있다.
* 패키지 또한 소문자로 이루어진 짧은 이름을 사용한다.
* 패키지의 경우 언더스코어를 가급적 사용하지 않는다.

### 클래스 이름
* 클래스 이름은 예외 없이 CapWords 규칙을 따른다.
* 내부에서 사용하는 클래스는 앞에 언더스코어 문자 하나를 붙인다.

### 예외 이름
* 예외는 클래스이므로 클래스 명명 규칙을 그대로 사용한다.
* 예외의 이름 끝에 `Error`라는 접미사를 사용한다.

### 함수 이름
* 소문자를 사용하며, 가독성을 높이기 위해 각 단어는 언더스코어로 구분한다.

### 함수/메서드 인수
* 인수의 이름이 예약어와 충돌할 경우, 인수 이름의 끝에 언더스코어 문자 하나를 추가한다.
* 약어를 사용하거나 맞춤법을 어기는 이름을 사용하는 것보다 낫다.

### 메서드 이름과 인스턴스 변수 
* 소문자를 사용하며, 가독성을 높이기 위해 각 단어는 언더스코어로 구분한다.
* 비 public 메서드/인스턴스 변수의 경우 앞에 언더스코어 문자를 하나 붙인다.

### 상수
* 대문자를 사용하며 단어를 구분하기 위해 언더스코어를 사용한다.

### 상속을 위한 설계
* 항상 클래스의 메서드와 인스턴스 변수(둘을 합쳐 어트리뷰트)가 public인지 아닌지 결정해야 한다.
* 결정이 어려울 경우 비 public 으로 정의한다.
* public 어트리뷰트는 언더스코어 문자로 시작해서는 안된다.
* public 어트리부터의 이름이 예약어와 충돌한 경우 이름의 끝에 언더스코어 문자 하나를 추가한다.
* 간단한 public 데이터 어트리뷰터의 경우, 복잡한 접근자/변경자 메서드 대신 어트리뷰트 이름을 직접 노출하는 방법이 가장 좋다.

## 프로그래밍 권장사항
* 성능에 민감한 부분에서 문자열 결합 기능을 사용해야 할 경우 `''.join()` 메서드를 사용한다. 다양한 파이썬 구현체에서 문자열 결합이 선형적 실행 시간을 갖도록 보장해 준다.

* None 과 같은 싱글턴 객체에 대해 비교 연산을 할 때에는 항상 `is` 혹은 `is not` 키워드를 사용한다. `=` 연산자를 사용해선 안된다.

* 기본값이 None인 변수나 인수에 무언가 값이 지정되었는 지를 검사할 때 `if x is not None`을 권장한다. `if x`를 사용하지 않도록 한다. 이 값이 다른 객체를 포함하는 타입일 경우 boolean으로 해석되어 false를 반환할 수도 있다.

* 클래스 기반의 예외를 사용한다. 문자열 예외는 사용하지 않는다.
    * 모듈, 패키지는 자신만의 특정 도메인을 기반으로 하는 예외 클래스를 정의해야 한다.
    * 이들 예외 클래스는 파이썬에 내장된 Exception 클래스를 상속한다.
    * 클래스 docstring을 항상 포함시켜야 한다.
```py
class MessageError(Exception):
    """Base class for errors in the email package."""
```
* 예외에는 클래스 이름 규칙이 적용되지만, 이 예외 클래스가 에러를 낱타낼 경우 `Error`를 접마사로 붙여야 한다.
    * 에러가 아닌 예외의 경우에는 특별한 접미사를 붙일 필요가 없다.

* 예외를 발생시키려면 `raise ValueError('message')` 구문을 사용한다.
    * `raise ValueError, 'message'` 구문은 더이상 사용하지 않는다.

* 예외를 처리할 때에는 범용적인 `except:` 대신, 처리할 특정한 예외를 명시하도록 한다.
```py
try:
    import platform_specific_module
except ImportError:
    platform_specific_module = None
```

* 모든 예외를 처리하고 싶다면 `except Exception:` 을 사용한다. 처리할 예외가 지정되지 않은 except 절은 `except BaseException:`절과 동일하다.

* try/except 절을 사용할 때는 try절이 적용되는 코드의 범위를 최소화한다.
```py
# good
try:
    value = collection[key]
except KeyError:
    return key_not_found(key)
else:
    return handle_value(value)

# bad
try:
    # 코드 적용 범위가 넓다!
    return handle_value(collection[key])
except KeyError:
    # 여기서는 handle_value()이 발생시킨 KeyError 예외를 처리
    return key_not_found(key)
```

* 리소스의 점유/해제 외의 작업을 제외하고, 어떤 작업을 할 때 별도의 함수/메서드를 통해 문맥(context) 관리자를 호출해야 한다.
    * 잘 모르겠다 ㅠ_ㅠ
```py
# good
with conn.begin_transaction():
    do_stuff_in_transaction(conn)

# bad
with conn:
    do_stuff_in_transaction(conn)
```

* string 모듈 대신 문자열 관련 메서드를 사용한다.
    * 문자열 메서드는 항상 좀 더 빠르고 유니코드 문자열과 동일한 API를 공유하고 있다.

* 문자열의 접두사/접미사를 확인하기 위해 문자열을 직접 자르는 대신, `''.startswith()` 와  `''.endswith()` 를 사용한다.
```py
if foo.startswith('bar'):  # good
if foo[:3] == 'bar':  #bad
```

* 객체 타입 비교시 타입을 직접 비교하는 대신 항상 isinstance()를 사용한다.

* 배열 형태의 타입(문자열, 리스트, 튜플)은 그 내용이 비어있을 때 false를 반환한다는 사실을 활용한다.
```py
# good
if not seq:
      if seq:

# bad
if len(seq)
     if not len(seq)
```
