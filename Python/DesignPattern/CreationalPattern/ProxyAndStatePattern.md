# Fronting for an Implementation

proxy가 뭔지 잘 모르겠다.

----

proxy와 state는 surrogate(대리) class를 제공한다.

작업을 수행하는 실제 class는 surrogate class 뒤에 숨어있다.

surrogate class의 method를 호출하면 implementing class의 method를 호출한다.

이 두가지 패턴은 아주 유사하다. 

proxy는 state의 특별한 케이스라고 뭉뚱그려 생각할 수도 있다.

하지만 proxy란 용어는 특별한 의미를 가지고 있으며, 왜 state와 구분하는지를 설명할 것이다.



```py
# state pattern

import abc

class EmotionalState(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def say_hello(self):
        pass

    @abc.abstractmethod
    def say_goodbye(self):
        pass

class HappyState(EmotionalState):
    def say_hello(self):
        return "Bye friend!"
    
    def say_goodbye(self):
        return "Hello friend!"

class SadState(EmotionalState):
    def say_hello(self):
        return "T_T"
    
    def say_goodbye(self):
        return "TT_TT"

class Person(EmotionalState):
    def __init__(self, state):
        self.state = state

    def set_state(self, state):
        self.state = state
    
    def say_hello(self):
        return self.state.say_hello()

    def say_goodbye(self):
        return self.state.say_goodbye()

def main():
    person = Person(HappyState())
    print("Hello in happy state: " + person.say_hello())
    print("Goodbye in happy state: " + person.say_goodbye())

    person = set_state(SadState())
    print("Hello in sad state: " + person.say_hello())
    print("Goodbye in sad state: " + person.say_goodbye())
```

첫 번째 Implementation이 사용된 뒤에 두 번째 Implementation으로 교체되었다.

proxy와 state의 차이점

proxy는 보통 다음의 용도로 사용한다.

1. Remote proxy

2. Virtual proxy

3. Protection proxy

4. Smart reference

----

http://en.proft.me/2017/02/25/state-pattern-java-and-python/

state pattern은 상태가 변경되었을 때 class의 행동을 변경할 수 있다.

object의 상태는 특정 시점에 정확한 상태를 가지고 있다.

이것은 attribute와 property의 값에 의해 결정된다.

attribute와 property의 값이 변경되면 object가 변경되었다고 말한다.


context object는 처음 생성될 때 초기 state object에 의해 초기화된다.

state object가 새로운 state object로 교체되면 context가 변경된다.

다형성을 구현하는 state pattern의 장점은 명확하다.


에러를 줄이고 매우 쉽게 상태를 변경할 수 있다.

이 pattern을 사용하면 시나리오 내에서 논리적인 조건이 변경되었을 떄 if-else, switch-case를 피할 수 있다.



