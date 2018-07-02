# str vs. repr

- str
  - 비공식적인 문자열을 출력
  - 사용자가 보가 쉽게 하기 위해

- repr
  - 공식적인 문자열을 출력
  - 문자열로 객체를 다시 생성하기 위해

```py
a = 123
print("str: " + str(a))
print("repr: " + repr(a))
```

- 숫자는 아무런 차이가 없다.

```py
a = 'Life is too short'
print("str: " + str(a))
print("repr: " + repr(a))
```

- 문자열은 차이가 있다.
- repr로 출력하면 `'`가 출력된다.

```py
import datetime
a = datetime.datetime.now()
print("str: " + str(a))
print("repr: " + repr(a))

# str: 2018-07-02 08:37:50.040533
# repr: datetime.datetime(2018, 7, 2, 8, 37, 50, 40533)
```

- str은 문자열, repr은 datetime 객체를 출력한다.

```py
a = datetime.datetime(2018, 7, 2)
print(id(a))
b = repr(a)
print(eval(b))
print(id(b))

# 32045016
# 2018-07-02 00:00:00
# 32191216
```

- 문자열로 객체를 생성하기 위해 eval 함수를 사용한다.
- datetime 객체의 repr로 생성된 문자열에 다시 eval을 수행하면 datetime 객체가 만들어진다.

```py
a = 'Life is too short'
b = repr(a)
print(eval(b))
```

- 문자열도 동일하다.

```py
# b = str(a)
# eval(b)
```

- 하지만 str로 리턴된 문자열을 eval로 실행하면 오류가 발생한다.

```py
class StrVsRepr:
    pass

obj = StrVsRepr()
print(repr(obj))
print(str(obj))

<__main__.StrVsRepr object at 0x000000000293EA90>
<__main__.StrVsRepr object at 0x000000000293EA90>
```

- 아무 내용도 없는 클래스를 str, repr로 출력하면 같은 결과가 출력된다.

```py
class StrVsRepr:
    def __repr__(self):
        return "Hello"

obj = StrVsRepr()
print(repr(obj))
print(str(obj))
```

- repr만 구현해도 동일한 결과가 출력된다.
- str메서드가 구현되어 있지 않으면 repr 메서드를 호출한다.

```py
class StrVsRepr:
    def __str__(self):
        return "Hello"

obj = StrVsRepr()
print(repr(obj))
print(str(obj))
# <__main__.StrVsRepr object at 0x00000000024CEDD8>
# Hello
```

- str 메서드만 있을 경우에는 출력 결과가 다르다.
- str 메서드가 없을 경우에는 repr 메서드를 호출하지만 repr 메서드가 없을 경우 str를 호출하지는 않는다.

```py
class StrVsRepr:
    def __repr__(self):
        return "StrVsRepr()"

    def __str__(self):
        return "Hello"

obj = StrVsRepr()
print(id(obj))

obj_repr = repr(obj)
new_obj = eval(obj_repr)
print(type(new_obj))
print(id(new_obj))
```

- repr을 호출하여 문자열을 리턴받았고 이 문자열로 다시 객체를 생성했다.
- repr의 출력 문자열을 eval을 이용하여 다시 객체로 만들 수 있어야 한다는 것은 필수 조권이 아니다.
