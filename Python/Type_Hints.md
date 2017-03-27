# Python Type Hint

PEP 484 - Type Hints

PEP 310 -  Function Annotations

Python 3.5 부터 도입됐다.

```py
def add(a: int, b: int) -> int:
    return a + b

print(add(4, 5))
```

* 파라미터인 a와 b의 type을 명시할 수 있다.

* return type을 명시할 수 있다.

```py
from typing import List

def get_list(a: int, b: int) -> List[int]:
    return [a, b]

print(get_list(4, 5))
```

* typing을 import 하여 list를 표현할 수 있다.
