# String Interpolation

## reference

[programiz](https://www.programiz.com/python-programming/string-interpolation)
[realpython](https://realpython.com/python-f-strings/)

## 정의

문자열의 placeholder를 변수의 값으로 대체하는 것.

## 방식

- %-formatting
- format() method
- f-strings
- ...

- %-formatting
  - 가장 오래됨
  - 많이 쓰임
- format() method
  - 많이 쓰임
- f-strings
  - 3.6에 도입됨
  - 편함(easy to use and increase the code readability)

## format() method

참고

- 주로 single quatation을 사용함.
- quatation이 중첩될 경우 single, double을 혼용함.

### String format() Param

Positional param

- param으로 전달받은 인자를 중괄호`{index}`를 이용하여 사용할 수 있다.

Keyword param

- `key=value` 형식으로 전달받은 인자를 중괄호`{key}`를 이용해여 사용할 수 있다.

### String format()의 리턴값

formatted string을 리턴한다.

### 간단 예제

```py
'Hello {0}, your balance is {1:9.3f}'.format('lee', 230.2346)

'Hello lee, your balance is   230.235'
```

'Hello {0}, your balance is {1:9.3f}'을 `template string`이라고 부른다.
`{0}`은 0번째 인자 `lee`를 의미한다.
`{1:9.3f}`의 1은 1번째 인자 230.2346을 의미한다.

```py
'Hello {}, your balance is {:9.3f}'.format('lee', 230.2346)
'Hello lee, your balance is   230.235'
```

0과 1이라는 숫자가 없어도 인자가 순서대로 전달된다.
`9.3f`의 f는 float number를 의미한다.
`.`앞의 숫자 9는 width 또는 padding을 의미한다.
`230.2346`의 숫자와 소수점을 모두 포함하여 width를 계산한다.
alignment option이 없다면 숫자는 우측정렬, 문자는 좌측정렬 된다.
`9.3f`의 3은 소수점 자리수를 의미한다.
2346이 3자리로 표현되면서 235로 반올림되었다.

```py
'Hello {name}, your balance is {bal:9.3f}'.format(name='lee', bal=230.2346)
'Hello lee, your balance is   230.235'
```

keyword arguments를 이용한 format
`9.3f`를 표현하기 위해 `:`을 사용한다.

```py
# default arguments
print("Hello {}, your balance is {}.".format("Adam", 230.2346))
Hello Adam, your balance is 230.2346.

# positional arguments
print("Hello {0}, your balance is {1}.".format("Adam", 230.2346))
Hello Adam, your balance is 230.2346.

# keyword arguments
print("Hello {name}, your balance is {blc}.".format(name="Adam", blc=230.2346))
Hello Adam, your balance is 230.2346.

# mixed arguments
print("Hello {0}, your balance is {blc}.".format("Adam", blc=230.2346))
Hello Adam, your balance is 230.2346.
```

### Number formatting

d, f, n 정도는 잊지말고 기억하자.

- d: Decimal integer
- f: 부동소수, default: 6
- n: Decimal integer, locale currency separator

```py
print("The number is:{:d}".format(123))
The number is:123

print("The float number is:{:f}".format(123.4567898))
The float number is:123.456790
```

### Number formatting - padding

```py
# 공백이 3칸
print("start:{:5d}".format(12))
start:   12

# width 2를 초과, width가 무시된다.
print("start:{:2d}".format(1234))
start:1234

# width 8, 숫자와 소수점 모두 계산됨, 소수점 3자리 이하 반올림
print("start:{:8.3f}".format(12.3456))
start:  12.346

# width 5, 빈칸을 0으로 채움
print("start:{:05d}".format(12))
start:00012

# width 8, 빈칸을 0으로 채움
print("start:{:08.3f}".format(12.2346))
start:0012.235
```

### Number formatting - signed number

```py
print("{:+f} {:+f}".format(12.23, -12.23))
+12.230000 -12.230000

print("{:-f} {:-f}".format(12.23, -12.23))
12.230000 -12.230000

print("{: f} {: f}".format(12.23, -12.23))
 12.230000 -12.230000
```

+를 붙이면 양수는 +, 음수는 -가 붙어서 출력된다.
-를 붙이면 양수는 보통 출력과 변함이 없고 음수만 -가 붙어서 출력된다.
space를 붙이면 양수는 빈칸이 하나 추가되고, 음수는 -가 붙어서 출력된다.

### Number formatting - alignment

```py
# default는 오른쪽 정렬
print("start:{:5d}:end".format(12))
start:   12:end

# 가운데 정렬
print("start:{:^10.3f}:end".format(12.2346))
start:  12.235  :end

# 왼쪽 정렬을 하고 오른쪽 공간은 0으로 채움
print("start:{:<05d}:end".format(12))
start:12000:end

# +, - 부호만 왼쪽 정렬
print("start:{:=8.3f}:end".format(-12.2346))
start:- 12.235:end
```

`<`: 왼쪽 정렬
`^`: 가운데 정렬, 좌우 space가 일치하지 않을 경우 오른쪽에 space가 +1
`>`: 오른쪽 정렬
`=`: +, - 부호만 왼쪽 정렬, 숫자를 오른쪽 정렬, 나머지 공간은 space

### String formatting - padding, alignment

```py
# default 왼쪽 정렬
print("start:{:5}:end".format("cat"))
start:cat  :end

# 오른쪽 정렬
print("start:{:>5}:end".format("cat"))
start:  cat:end

# 가운데 정렬
print("start:{:^5}:end".format("cat"))
start: cat :end

# 가운데 정렬, 좌우 space가 개수가 일치하지 않으면 오른쪽에 +1
print("start:{:^6}:end".format("cat"))
start: cat  :end

# space 대신 *로 채움
print("start:{:*^6}:end".format("cat"))
start:*cat**:end
```

### Truncate

```py
# 3글자만 출력
print("start:{:.3}:end".format("caterpillar"))
start:cat:end

# width 5, 3글자만 출력, default 왼쪽 정렬
print("start:{:5.3}:end".format("caterpillar"))
start:cat  :end

# 가운데 정렬
print("start:{:^5.3}:end".format("caterpillar"))
start: cat :end

# space를 *로 채움
print("start:{:*^5.3}:end".format("caterpillar"))
start:*cat*:end

# 한글도 3글자
print("start:{:*^5.3}:end".format("한글은어떻게출력되나"))
start:*한글은*:end
```

### Formatting class member

```py
class Person:
    age = 25
    name = 'lee'

print("{p.name}'s age is: {p.age}".format(p=Person()))
lee's age is: 25
```

### Formatting dictionary

```py
person = {'age': 25, 'name': 'lee'}

print("{p[name]}'s age is: {p[age]}".format(p=person))
lee's age is: 25

# dictionary unpacking
print("{name}'s age is: {age}".format(**person))
lee's age is: 25
```

### Dynamic formatting

```py
string = "{:{fill}{align}{width}}"

print(string.format('cat', fill='*', align='^', width=5))
*cat*

num = "start:{:{align}{width}.{precision}f}:end"

In [53]: print(num.format(123.236, align='<', width=8, precision=2))
start:123.24  :end
```

### Type-sepcific formatting

```py
import datetime

date = datetime.datetime.now()
print("{:%Y/%m/%d %H:%M:%S}".format(date))

2018/02/24 14:26:01

complexNumber = 1+2j
print("Real part: {0.real}, Imaginary part: {0.imag}".format(complexNumber))

Real part: 1.0, Imaginary part: 2.0
```

### __format__() method override

```py
class Person:
    def __format__(self, arg):
        if arg == 'age':
            return '23'
        return 'None'


print("lee's age is: {}".format(Person()))
lee's age is: None

print("lee's age is: {:age}".format(Person()))
lee's age is: 23
```

### __str__(), __repr__()을 !s, !r로 대체

```py
print("Quotes: {0!r}, Without Quotes: {0!s}".format("cat"))
Quotes: 'cat', Without Quotes: cat

class Person:
    def __str__(self):
        return 'STR'
    def __repr__(self):
        return "REPR"


print("repr: {p!r}, str: {p!s}".format(p=Person()))
repr: REPR, str: STR
```

문자열을 !r로 표현하면 `'`가 붙어서 출력된다.
!s 로 출력하면 문자열만 출력된다.
class에서 정의한 `__str__()`, `__repr__()`을 바로 사용할 수 있다.

### __str__(), __repr__() 의 차이

`__str__()`

- 사용자가 보기 쉬운 형태로 출력(informal)

`__repr__()`

- 파이썬 인터프리터가 해당 객체를 인식할 수 있는 공식적인 문자열(official)

repr(): `__repr__` 메소드 호출
str(), print: `__str__` 메소드 호출
eval(repr(object))를 하면 해당 object를 얻어올 수 있다.
`__repr__`이 구현되어있고 `__str__`이 구현되어있지 않을 경우 `__str__`은 `__repr__`을 호출한다.
