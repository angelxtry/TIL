# Python Type Checking

## 원본

[python-type-checking](https://realpython.com/python-type-checking/)

## Playing With Python Types, Part 2

```py
import random
from typring import Any, Sequence


def choose(items: Sequence[Any]) -> Any:
    return random.choice(items)
```

Any를 사용하면 type 정보를 잃어버리게 된다.

### Type Variable

Type variable은 상황에 맞게 어떤 type을 가질 수 있는 특별한 변수다.
choose() 함수의 행위를 캡슐화하기 효과적인 type variable을 만들어보자.

```py
# choose.py

import random
from typing import Sequence, TypeVar


Chooseable = TypeVar("Chooseable")

def choose(items: Sequence[Chooseable]) -> Chooseable:
    return random.choice(items)

names = ['Guido', 'Jukka', 'Ivan']
reveal_type(names)

name = choose(names)
reveal_type(name)
```

```cmd
$ mypy choose.py
choose.py:15: error: Revealed type is 'builtins.list[builtins.str*]'
choose.py:18: error: Revealed type is 'builtins.str*'
```

```py
# choose_example.py

from choose import choose

reveal_type(choose([1, 2, 3]))
reveal_type(choose([True, 42, 3.14]))
reveal_type(choose(['Python', 3, 7]))
```

```cmd
choose_examples.py:6: error: Revealed type is 'builtins.int*'
choose_examples.py:7: error: Revealed type is 'builtins.float*'
choose_examples.py:8: error: Revealed type is 'builtins.object*'
```

bool은 int의 subtype이고, int는 float의 subtype이므로 2번째 예제는 float으로 간주된다.
3번째 예제는 서로 subtype 관계가 없으므로 object로 처리된다.

choose()가 string과 float를 받아들이지만 동시에 두 개를 받아들일 수 없다는 것을 표현하려면 다음과 같이 처리한다.

```py
"""
choose.py
"""

import random
from typing import Sequence, TypeVar


Chooseable = TypeVar("Chooseable", str, float)

def choose(items: Sequence[Chooseable]) -> Chooseable:
    return random.choice(items)

reveal_type(choose(['Guido', 'Jukka', 'Ivan']))
reveal_type(choose([1, 2, 3]))
reveal_type(choose([True, 42, 3.14]))
reveal_type(choose(['Python', 3, 7]))
```

```cmd
$ mypy choose.py
choose.py:14: error: Revealed type is 'builtins.str*'
choose.py:15: error: Revealed type is 'builtins.float*'
choose.py:16: error: Revealed type is 'builtins.float*'
choose.py:17: error: Revealed type is 'builtins.object*'
choose.py:17: error: Value of type variable "Chooseable" of "choose" cannot be "object"
```

결과를 보면 int의 list를 전달한 것도 float로 처리되었다. 하지만 이것도 에러는 아니다.

카드 게임 예제에서 choose() 함수는 string과 Card만을 사용한다.

```py
Chooseable = TypeVar("Chooseable", str, Card)
```