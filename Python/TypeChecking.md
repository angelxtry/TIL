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

duck typing은 dynamic typing과 연관이 깊다. type이나 객체의 class보다 메서드가 더 중요하다. duck typing은 type을 신경쓰지 않는다. 단지 메서드가 존재하느냐와 메서드의 attribute 등만 확인한다.

```py
class TheHobbit:
    """ class TheHobbit """
    def __len__(self):
        return 12345


if __name__ == '__main__':
    the_hobbit = TheHobbit()
    print(len(the_hobbit))
```

len() 메서드를 호출하려면 TheHobbit에 `__len__()`을 정의하면 된다.
len() 메서드는 다음과 같이 구현되어 있다.

```py
def len(obj):
    return obj.__len__()
```

즉, 어떤 객체에 `__len__()`만 정의되어 있다면 len() 메서드를 사용할 수 있다. str, list, dict 등도 마찬가지다.

duck typing은 Python의 static type checking에 사용된다.

## Hello Types

```py
# def headline(str, align=True):
def headline(text: str, align: bool = True) -> str:
    """ make headline """
    if align:
        return f"{text.title()}\n{'-'*len(text)}"

    return f"{text.title()}".center(50, 'o')
```

headline 메서드에 type hint를 정의했다.
`:` 다음의 공백, `=` 양쪽의 공백, `->` 양쪽의 공백은 PEP8에서 권장하는 방식이다.

type hint가 추가 된 것은 runtime에 전혀 영향을 주지 않는다. type을 준수하지 않아도 예외를 발생시키지 않는다면 코드는 정상적으로 동작한다.

type hint는 실제로 코드를 실행해보지 않고 static type checking을 할 수 있는 tool이다.

type hint를 활용하기 위해 mypy를 설치한다.

`pip install mypy`

mypy를 이용해여 type checking을 한다.

`mypy filename.py`

## Pros and Cons

### Pros

- 문서화
- improve IDE, linter
- 좀 더 나은 깨끗한 architecture

### Cons

- ​작성 시간
- 최근근 Python에서만 동작. (3.6 over)
- 약간 시간이 더 걸린다.

Python은 gradual typing이라는 개념을 지원한다. static type checker는 hint가 없는 코드는 무시한다. 그래서 점진적으로 hint를 추가할 수 있다.

## Annotation

### Function Annotations

```py
import math


def circumference(radius: float) -> float:
    return 2 * math.pi * radius


print(circumference.__annotation__)
```

```cmd
{'radius': <class 'float'>, 'return': <class 'float'>}
```

Mypy는 이 annotation을 이용하여 동작한다.

### Variable Annotations

```py
pi: float = 3.142

def circumference(radius: float) -> float:
    return 2 * pi * radius

print(__annotations__)
```

```cmd
{'pi': <class 'float'>}
```

Python 3.6에 도입된 PEP 526​에 Variable Annotations가 정의되었다.
variables의 annotation은 module level `__annotations__` dictionary에 저장된다.

### Type Comments

Python 3.6 이하 버전에서는 Type Hints가 없다. 그래서 Type Comments라는 backport를 만들었다.

### import time 측정

## Playing With Python Types, Part 1

```py
# game.py
"""
game.py for Python Type Checking
"""


import random


SUITS = "♠ ♡ ♢ ♣".split()
RANKS = "2 3 4 5 6 7 8 9 10 J Q K A".split()


def create_deck(shuffle=False):
    """ Create a new deck of 52 cards """
    deck = [(s, r) for r in RANKS for s in SUITS]
    if shuffle:
        random.shuffle(deck)
    return deck


def deal_hands(deck):
    """ Deal the cards in the deck into four hands """
    return (deck[0::4], deck[1::4], deck[2::4], deck[3::4])


def play():
    """ Play a 4-player card game """
    deck = create_deck(shuffle=True)
    names = 'P1 P2 P3 P4'.split()
    hands = {n: h for n, h in zip(names, deal_hands(deck))}
    for name, cards in hands.items():
        card_str = ''.join(f'{s}{r}' for (s, r) in cards)
        print(f'{name}: {card_str}')


if __name__ == '__main__':
    play()
```

위 코드에 Type Hints를 추가해보자.

기본적인 Type Hints는 다음과 같다.

```py
name: str = "Guido"
pi: float = 3.142
centered: bool = False

names: list = ['Guido', 'Jukka', 'Ivan']
versions: tuple = (3, 7, 1)
options: dict = {'centered': False, 'capitalize': True}
```

name[2], version[0], dict['centered']등의 type은 어떻게 표현해야할까? 이것을 위해 typing module을 사용한다.
typing을 사용하면 composite type들의 elements의 type을 설명할 수 있다.

```py
from typing import Dict, List, Tuple


names: List[str] = ['Guido', 'Jukka', 'Ivan']
version: Tuple[int, int, int] = (3, 7, 1)
options: Dict[str, bool] = {'centered': False, 'capitalize': True}
```

위의 예에서 볼 수 있듯이 square bracket을 사용하여 type을 정의한다.

다음은 card game의 코드에 type hints를 추가한 것이다.

```py
def create_deck(shuffle: bool = False) -> List[Tuple[str, str]]:
    """ Create a new deck of 52 cards """
    deck = [(s, r) for r in RANKS for s in SUITS]
    if shuffle:
        random.shuffle(deck)
    return deck
```

List는 elements의 type이 모두 동일하다면 square bracket 내에 type을 한 번만 적어도 된다.
하지만 Tuple은 elements의 모든 type을 순서대로 기술해야 한다.

많은 경우 개발자들이 만든 함수들은 sequence를 사용한다고 볼 수 있다. sequence는 list인지 tuple인지 상관없이 사용할 수 있다.

```py
from typing import List, Sequence


def square(elems: Sequence[float]) -> List[float]:
    return [x**2 for x in elems]
```

sequence는 duck typing을 사용한 대표적인 사례이다. sequence는 len() 메서드가 정의되어 있고 `__getitem__()`가 정의되어 있다면 type에 상관없이 정의될 수 있다.

### Type Aliases

```py
def deal_hands(deck):
    """ Deal the cards in the deck into four hands """
    return (deck[0::4], deck[1::4], deck[2::4], deck[3::4])
```

위의 함수에 Type Hints를 붙이면 다음과 같은 코드가 된다.

```py
def deal_hands(deck: List[Tuple[str, str]]) -> Tuple[
    List[Tuple[str, str]],
    List[Tuple[str, str]],
    List[Tuple[str, str]],
    List[Tuple[str, str]],
]:
    """ Deal the cards in the deck into four hands """
    return (deck[0::4], deck[1::4], deck[2::4], deck[3::4])
```

코드가 매우 지저분해 진다. 이럴 때 type alias를 사용할 수 있다.

```py
from typing import List, Tuple


Card = Tuple[str, str]
Deck = List[Card]


def deal_hands(deck: Deck) -> Tuple[Deck, Deck, Deck, Deck]:
    """ Deal the cards in the deck into four hands"""
    return (deck[0::4], deck[1::4], deck[2::4], deck[3::4],)
```

type alias를 설정하면 type alias가 궁금할 때 바로 확인할 수 있다.

```py
from typing import List, Tuple


Card = Tuple[str, str]
Deck = List[Card]

print(Deck)
```

```cmd
typing.List[typing.Tuple[str, str]]
```

### Functions Without Return Values

return value가 정의되지 않은 함수는 None을 리턴한다.

```py
def play(player_name):
    print(f'{player_name} plays')


if __name__ == '__main__':
    ret_val = play('Jacob')
    print(ret_val)  # None
```

다음과 같이 Type Hints를 작성하면 에러가 발생한다.

```py
# play.py

def play(player_name: str) -> None:
    print(f'{player_name} plays')

ret_val = play('Filip')
```

play메서드를 호출했을 때 ret_val이라는 변수에 return value를 담는다. play 함수가 명시적으로 return value가 없더라고 해당 함수의 return value를 받아서 사용한다면 type hints를 위와 같이 설정하면 안된다. 이 경우는 다음과 같이 작성해야 한다.

```py
# play.py

def play(player_name: str):
    print(f'{player_name} plays')

ret_val = play('Filip')
```

특이한 경우 NoReturn을 사용하기도 한다.

```py
from typing import NoReturn


def black_hole() -> NoReturn:
    raise Exception("There is no going back")
```
