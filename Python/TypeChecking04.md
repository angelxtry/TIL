# Python Type Checking

## 원본

[python-type-checking](https://realpython.com/python-type-checking/)

## Playing With Python Types, Part 2

### Duck Types and Protocols

```py
def len(obj):
    return obj.__len__()
```

len 메서드는 obj에 구현된 `__len__()`을 호출한다. len 메서드에 어떻게 type hint를 추가할 수 있을까?

해답은 structual subtyping이라는 단어로 설명할 수 있다.

type system의 카테고리를 나누는 방법 중 하나는 그것이 nominal인지 structual인지에 따라 다르다.

nominal system에서는 이름과 선언에 기반해 type을 비교한다. Python type system은 대부분 nominal이다. int는 float으로 사용할 수 있다. 왜냐하면 int는 float의 subtype이기 때문이다.

strutual system에서는 strutcure에 기반하여 type을 비교한다. `__len__()`을 정의한 모든 instance를 포함하는 Sized 같은 structural type을 정의할 수 있다.

protocol이라는 개념을 추가하는 것이 목적인 PEP544를 통해 Python은 잘 구현된 structual type system을 만들어가고 있다. PEP544의 대부분은 Mypy를 통해 구현되었다.

protocol은 구현되어야 하는 하나 또는 그 이상의 메서드를 명세회한다. 예를들어 `.__len__()`을 정의하는 모든 class는 typing.Sized를 충족시킨다.

그러므로 `__len__()`은 다음과 같이 type hint를 붙일 수 있다.

```py
from typing import Sized
def len(obj: Sized) -> int
    return obj.__len__()
```

typing 모듈은 Container, Iterable, Awaitable, ContextManager 등을 정의해 두었다.

자신만의 protocol을 정의할 수도 있다. Protocol을 상속하고 body가 비어있는 function signature를 정의하면 된다.

Sized는 다음과 같이 정의되어 있다.

```py
from typing_extensions import Protocol

class Sized(Protocol):
    def __len__(slef) -> int ...

def len(obj: Sized) -> int
    return obj.__len__()
```

self-defined protocol을 지원하는 것은 아직 실험적이다.
