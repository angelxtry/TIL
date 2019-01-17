# Python Type Checking

## 원본

[python-type-checking](https://realpython.com/python-type-checking/)

## Playing With Python Types, Part 1

### Example: Play Some Cards

```py
"""
game.py for Python Type Checking
"""


from pprint import pprint
import random
from typing import List, Tuple


Card = Tuple[str, str]
Deck = List[Card]

SUITS = "♠ ♡ ♢ ♣".split()
RANKS = "2 3 4 5 6 7 8 9 10 J Q K A".split()


def create_deck(shuffle: bool = False) -> Deck:
    """ Create a new deck of 52 cards """
    deck = [(s, r) for r in RANKS for s in SUITS]
    if shuffle:
        random.shuffle(deck)
    return deck


def deal_hands(deck: Deck) -> Tuple[Deck, Deck, Deck, Deck]:
    """ Deal the cards in the deck into four hands """
    return (deck[0::4], deck[1::4], deck[2::4], deck[3::4])


def choose(items):
    """ Choose and return a random item"""
    return random.choice(items)


def player_order(names, start=None):
    """ Ratate player order so that start goes first"""
    if start is None:
        start = choose(names)
    start_idx = names.index(start)
    return names[start_idx:] + names[:start_idx]


def play() -> None:
    """ Play a 4-player card game """
    deck = create_deck(shuffle=True)
    names = 'P1 P2 P3 P4'.split()
    hands = {n: h for n, h in zip(names, deal_hands(deck))}
    start_player = choose(names)
    turn_over = player_order(names, start=start_player)
    print(turn_over)
    pprint(hands)
    pprint(hands[start_player])

    while hands[start_player]:
        for name in turn_over:
            card = choose(hands[name])
            hands[name].remove(card)
            print(f'{name}: {card[0] + card[1]:<3} ', end="")
        print()


if __name__ == '__main__':
    play()
```

type hint와 무관하게 코드를 뜯어보자.

```py
Card = Tuple[str, str]
Deck = List[Card]
```

type alias다.

```py
SUITS = "♠ ♡ ♢ ♣".split()
RANKS = "2 3 4 5 6 7 8 9 10 J Q K A".split()
```

문자열에 split 메소드를 붙여 바로 배열로 변환했다. 간단하게 만들때는 좋은 팁이라고 생각된다.

```py
def create_deck(shuffle: bool = False) -> Deck:
    """ Create a new deck of 52 cards """
    deck = [(s, r) for r in RANKS for s in SUITS]
    if shuffle:
        random.shuffle(deck)
    return deck
```

배열 r과 s를 하나의 list comprehension을 사용하니 카테시안 곱으로 배열이 만들어졌다. 좋은 팁.
random.shuffle(list)는 list의 elements의 순서를 섞는다. 이것도 side effect 일텐데 어떻게 바꿀 수 있을까?

```py
def deal_hands(deck: Deck) -> Tuple[Deck, Deck, Deck, Deck]:
    """ Deal the cards in the deck into four hands """
    return (deck[0::4], deck[1::4], deck[2::4], deck[3::4])
```

Deck은 List다. elements의 갯수가 몇 개인지는 알 수 없지만, 4명에게 카드를 한장씩 돌리는 로직을 만들었다.
deck[0::4] 라는 slice 표현은 바로 list가 된다. 결국 deal_hands는 리스트 4개를 tuple로 만들어서 return한다.

```py
def choose(items):
    """ Choose and return a random item"""
    return random.choice(items)
```

무작위로 하나를 선택해 return

```py
def player_order(names, start=None):
    """ Ratate player order so that start goes first"""
    if start is None:
        start = choose(names)
    start_idx = names.index(start)
    return names[start_idx:] + names[:start_idx]
```

배열에서 하나의 값을 선택한다. 그 값을 기준으로 circular list 처럼 순차적으로 만들어진 리스트를 반환한다.
즉, [1, 2, 3, 4, 5] 중에 4가 선택되면 [4, 5, 1, 2, 3]을 리턴한다.

```py
while hands[start_player]:
    for name in turn_over:
        card = choose(hands[name])
        hands[name].remove(card)
        print(f'{name}: {card[0] + card[1]:<3} ', end="")
    print()
```

hands[start_player]는 list다. while은 list에 모든 elements가 없어질 때까지 true가 된다.
`<3`은 해당 내용을 3칸 내에서 좌측정렬, `end=""`는 print의 개행을 무시할 수 있게 해준다.

### The Any Type

choose 메서드는 두 가지 type을 인자로 받고 return한다.
이런 경우 Any와 Sequence를 활용할 수 있다.

```py
def choose(items: Sequence[Any]) -> Any:
    """ Choose and return a random item"""
    return random.choice(items)
```

Any는 그리 유용하지 않다.

```py
import random
from typing import Any, Sequence


def choose(items: Sequence[Any]) -> Any:
    return random.choice(items)

names = ["Guido", "Jukka", "Ivan"]
reveal_type(names)
# choose.py:9: error: Revealed type is 'builtins.list[builtins.str*]'

name = choose(names)
reveal_type(name)
# choose.py:12: error: Revealed type is 'Any'
```

choose를 호출하기 전에는 string list였다가 choose를 호출한 후에는 Any type이 된다.
reveal_type이라는 함수는 mypy에서 지원하는 함수다. 해당 파일을 직접 실행하려고 하면 reveal_type 때문에 에러가 발생한다. 이 파일을 mypy로 실행하면 reveal_type 함수가 실행된다.

Any 보다 좀 더 나은 방법이 있다.

## Type Theory

[PEP 483 -- The Theory of Type Hints](https://www.python.org/dev/peps/pep-0483/)을 보는 것이 도움이 된다.

Python type hints의 밑받침이 되는 이론을 조금만 살펴보자.

### Subtypes

Subtypes은 중요한 개념이다. 

다음 2조건을 만족하면 U의 subtype이 T라고 말한다.

- Every value from T is also in the set of values of U type.
- Every function from U type is also in the set of functions of T type.

값과 함수의 U, T 관계가 왜 서로 다를까?

이 두 조건을 충족한다면 T와 U가 서로 다른 type이라도 T type의 변수들은 항상 U type인 척 할 수 있다.

구체적인 예로, `T = bool`이고 `U = int`를 생각해보자.