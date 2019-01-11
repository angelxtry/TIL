# Python Type Checking

## 원본

[python-type-checking](https://realpython.com/python-type-checking/)

## Dynamic Typing

```py
1 + 'two'
```

```txt
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

당연히 TypeError가 발생한다.

```py
if False:
    1 + 'two'
else:
    1 + 2
```

여기서 `1 + 'two'`는 절대로 TypeError가 발생하지 않는다. 해당 구문이 평가되는 시점에 type checking이 발생하는데 해당 구문이 평가되지 않으므로 TypeError가 발생하지 않는다.

```py
thing = 'hello'
print(type(thing))

thing = 123.123
print(type(thing))
```

```cmd
<class 'str'>
<class 'float'>
```

변수의 type이 변했다. Python은 type이 변경되는 것을 허용한다.

[PEP484](https://www.python.org/dev/peps/pep-0484/)의 type hints를 사용하면 static type checking이 가능하다.

type hints는 type을 강제하는 것이 아니라 제안하는 정도다. mypy를 사용하면 type hints를 이용해 static type checking을 할 수 있다.

## Duck Typing

Duck Typing 은 dynamic typing과 연관이 깊은 개념이다. object의 type보다 method 또는 attribute를 확인한다.
