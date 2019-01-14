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
