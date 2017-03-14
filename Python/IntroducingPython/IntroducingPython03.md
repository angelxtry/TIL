# Introducing Python

## generator

시퀀스를 생성하는 객체

전체 시퀀스를 한 번에 메모리에 생성하고 정렬하지 않고 아주 큰 시퀀스를 순회할 수 있다.

대표적인 generator가 range()

잠재적으로 큰 시퀀스를 생성할 여지가 있고, generator comprehesion 코드가 긴 경우에는 generator 함수를 사용한다.

generator 함수는 yield 문으로 값을 반환한다.

```
def my_range(first=0, last=10, step=1):
    number = first
    while number < last:
        yield number
        number += step

print(my_range) # <function my_range at 0x008E4270>

ranger = my_range(1, 5)

print(ranger) # <generator object my_range at 0x008E3F30>

for x in ranger:
    print(x)
```
* my_range는 함수로 인식된다. 그리고 generator 객체를 반환한다.

* 이 generator 객체는 iterable 하다.

## decorator

decorator는 하나의 함수를 받아서 또 다른 함수를 반환하는 함수다.

```
def document_it(func):
    def new_function(*args, **kwargs):
        print('Running function: ', func.__name__)
        print('Positional arguments: ', args)
        print('Keyword argument: ', kwargs)
        result = func(*args, **kwargs)
        print('Result: ', result)
        return result
    return new_function

def add_ints(a, b):
    return a + b

doc_add_ints = document_it(add_ints)
doc_add_ints(3, 5)
"""
Running function:  add_ints
Positional arguments:  (3, 5)
Keyword argument:  {}
Result:  8
"""
```
* 수동으로 decorator 처럼 만들었다.

```
@document_it
def add_number(a, b):
    return a + b

add_number(3, 5)
"""
Running function:  add_number
Positional arguments:  (3, 5)
Keyword argument:  {}
Result:  8
"""
```
* decorator를 사용하고 싶은 함수에 @DECO_NAME을 추가하면 decorator가 동작한다.

```
def square_number(func):
    def new_function(*args, **kwargs):
        result = func(*args, **kwargs)
        return result * result
    return new_function

@document_it
@square_number
def add_num(a, b):
    return a + b

add_num(3, 5)
"""
Running function:  new_function
Positional arguments:  (3, 5)
Keyword argument:  {}
Result:  64
"""
```
* decorator 함수(square_number)를 추가했다.

* 함수에 여러 개의 decorator를 추가할 수 있다.

* 함수에서 가장 가까운 decorator 부터 실행된다.

## namespace, scope

namespace는 특정 이름이 유일하고, 다른 namespace에서의 같은 이름과 관계가 없은 것을 말한다.

main은 global namespace를 정의한다.

global namespace에서 함수에 속하지 않은 변수는 global 변수다.

함수에서 global 변수를 사용할 수 있으나 값을 변경하려고 하면 UnboundLocalError 예외가 발생한다.

함수내에서 global 변수와 동일한 이름의 변수를 선언하면 이것은 global 변수와 별개인 지역변수가 된다.

함수내에서 global 변수의 값을 변경하기 위해서는 global 키워드를 사용해서 전역 변수의 접근을 명시해야한다.

파이썬은 namespace에 접근하기 위해 두 가지 함수를 제공한다.

1. locals() : loacl namespace의 내용이 담긴 dictionary를 반환

2. globals() : global namespace의 내용이 담긴 dictionary를 반환

## try, except : 에러 처리하기

파이썬은 에러가 발생할 때 exception을 사용한다.

인자가 없이 except 문을 지정하는 것은 모든 예외 타입을 catch 하는 것을 의미하다.

두 개 이상의 예외 타입이 발생하면 각각 별도의 예외 핸들러를 제공하는 것이 좋다.

```
class UppercaseException(Exception):
    pass

words = ['a', 'bb', 'CCC']
for word in words:
    if word.isupper():
        raise UppercaseException(word)
"""
Traceback (most recent call last):
  File "test.py", line 7, in <module>
    raise UppercaseException(word)
__main__.UppercaseException: CCC
"""
```
* 파이썬 표준 라이브러리에 정의되어 있지 않은 예외를 만들어서 사용할 수 있다.

* 새로운 예외 타입은 class로 정의해야 한다.

## command line argument

```
import sys
print('argument: ', sys.argv)

"""
$ python test.py
arguments:  ['test.py']
"""

"""
$ python test.py 1 2 33
arguments:  ['test.py', '1', '2', '33']
"""
```

## package
```
# daily.py
def forecast():
    return 'like yesterday'
# weekly.py
def forecast():
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g']

# test.py
from my_package import daily, weekly

print('Daily: ', daily.forecast())
print('Weekly: ')
for num, outlook in enumerate(weekly.forecast(), 3):
    print(num, outlook)
"""
Daily:  like yesterday
Weekly:
3 a
4 b
5 c
6 d
7 e
8 f
9 g
"""
```
* my_package 라는 서브 디렉토리를 만들고 daily.py, weekly.py 파일을 만들었다.

* 그리고 my_package 디렉토리에 `__init__.py` 라는 빈 파일을 만든다.

* test.py 에서 `from 서브 디렉토리 import MODULE_NAME` 형식으로 import 한다.

* `enumerate(LIST, NUM)` 리스트와 리스트의 element의 index를 반환한다.

* 두 번째 매개변수인 NUM은 리스트의 element의 index에 더해진다(?).

### 참고 : enumerate
```
for i, name in enumerate(['a', 'b', 'c']):
    print(i, name)
```
* enumerate() 함수에 두번째 파라미터를 전달하지 않아도 index와 함께 리스트의 element들을 확인할 수 있다.

----

## setdefault()

존재하지 않는 키로 딕셔너리에 접근하면 예외가 발생한다.

기본값을 반환하는 딕셔너리의 get() 함수를 사용하면 예외 발생을 피할 수 있다.

setdefault() 함수는 get() 함수와 같지만 키가 누락된 경우 딕셔너리에 항목을 할당한다.

존재하는 키에 다른 기본값을 할당하려 하면 키에 대한 원래 값이 반환되고 아무것도 변경되지 않는다.

## defaultdic()
```
from collections import defaultdict

def default_value():
    return 'Default_Value'

dic_sample = defaultdict(default_value)
dic_sample['A'] = 'a'
dic_sample['B'] = 'b'

for item in dic_sample.items():
    print(item)
"""
('A', 'a')
('B', 'b')
"""

print(dic_sample['x'])
#Default_Value
```
* defaultdic() 함수는 딕셔너리를 생성할 때 모든 새 키에 대한 기본값을 먼저 지정한다.

* defaultdic() 함수는 파라미터로 함수를 받는다.

* 위의 예제에서 default_value() 함수는 존재하지 않는 키의 값을 호출했을 때 호출된다.

* 기본값을 반환하기 위해 다음과 같은 함수를 사용한다.

1. int() : return 0 (정수 0)
2. list() : return [] (빈 리스트)
3. dict{} : return {} (빈 딕셔너리)
4. 파라미터를 입력하지 않으면 새로운 키의 값은 None으로 설정된다.

* lambda를 사용하여 파라이터에 기본값을 만드는 함수를 정의할 수도 있다.

`dic_sample = defaultdict(lambda: 'Default_Value')`

```
from collections import defaultdict

item_counter = defaultdict(int)
for item in ['a', 'b', 'c', 'b', 'c']:
    item_counter[item] += 1

for item, count in item_counter.items():
    print(item, count)
```
* item의 갯수를 세는 딕셔너리를 만들 수도 있다.

* defaultdic을 사용하지 않으면 다음과 같이 표현할 수 있다.

```
item_counter = {}
for item in ['a', 'b', 'c', 'b', 'c']:
    if not item in item_counter.keys():
        item_counter[item] = 0
    item_counter[item] += 1

for item, count in item_counter.items():
    print(item, count)
```

## Counter() : 항목 세기

```
from collections import Counter
list_character = ['a', 'b', 'c', 'b', 'c']
character_counter = Counter(list_character)
print(character_counter) # Counter({'b': 2, 'c': 2, 'a': 1})

print(character_counter.most_common()) # [('b', 2), ('c', 2), ('a', 1)]

print(character_counter.most_common(1)) # [('b', 2)]
print(character_counter.most_common(2)) # [('b', 2), ('c', 2)]

list_character_b = ['a', 'a', 'a', 'b', 'c', 'd']
characterB_counter = Counter(list_character_b)
print(characterB_counter)
# Counter({'a': 3, 'd': 1, 'b': 1, 'c': 1})

print(character_counter + characterB_counter)
# Counter({'a': 4, 'b': 3, 'c': 3, 'd': 1})

print(character_counter - characterB_counter)
# Counter({'b': 1, 'c': 1})

print(character_counter & characterB_counter)
# Counter({'b': 1, 'c': 1, 'a': 1})
```
* most_common() 함수는 모든 element가 내림차순으로 구성된 리스트를 반환한다.

* most_common() 함수에 숫자를 파라미터로 넘기면 숫자만큼 반환한다.

* Counter 끼리 결합도 가능하다.

* set과 동일한 연산을 한다.

## deque : 데크 or 덱

double ended queue 의 줄임말

시작과 끝에서 다이나믹하게 공간이 늘어날 수도 있고 줄어들 수도 있다.

deque(maxlen=N)으로 길이가 고정된 queue를 생성할 수 있다.

queue가 가득 찬 상태에서 element를 추가할 경우 기존 element가 순차적으로 삭제된다.

```
from collections import deque
d = deque('abc')
print(d)

for item in d:
    print(item.upper())
```
* deque() 의 매개변수는 list-like 한 객체다.

* append() : 오른쪽 끝에 item 추가

* appendleft() : 왼쪽 끝에 item 추가

* pop() : 오른쪽 끝에서 item을 pop

* popleft() : 왼쪽 끝에서 pop

* list(DEQUE) : 리스트 형식으로 반환

* DEQUE(INDEX) : index 위치의 item 반환

* list(reversed(DEQUE))

* extend() : 매개변수로 전달되는 list-like 한 객체의 element들이 하나씩 순차적으로 append() 된다.
```
from collections import deque
d = deque(['abc'])
print(d) # deque(['abc'])

d.extend(['d', 'e'])
print(d) # deque(['abc', 'd', 'e'])
```

* extendleft() : 왼쪽방향으로 extend()
```
from collections import deque
d = deque(['abc'])
print(d)

d.extend(['d', 'e'])
print(d) # deque(['abc', 'd', 'e'])

d.extendleft(['0', '-1', '-2'])
print(d) # deque(['-2', '-1', '0', 'abc', 'd', 'e'])
```

* remove(VALUE) : 값을 삭제한다.
    * 없는 값을 삭제하려고 할 경우 ValueError가 발생한다.

* rotate() : 매개변수로 양의 정수를 입력하면 오른쪽으로 입력한 수 만큼 이동한다.
    * 음의 정수일 경우 반대로 이동한다.
```
from collections import deque
d = deque(['abc'])
print(d)

d.extend(['d', 'e'])
print(d)

d.extendleft(['0', '-1', '-2'])
print(d) # deque(['-2', '-1', '0', 'abc', 'd', 'e'])

d.rotate(1)
print(d) # deque(['e', '-2', '-1', '0', 'abc', 'd'])

d.rotate(2)
print(d) # deque(['abc', 'd', 'e', '-2', '-1', '0'])

d.rotate(-1)
print(d) #deque(['d', 'e', '-2', '-1', '0', 'abc'])
```

## itertools : 코드 구조 순회
