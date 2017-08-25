# ABC(Abstract Base Class)

http://bluese05.tistory.com/61

~ABC라고 불러야 맞는건가 ABC Class라고 불러야 맞는건가~

* ABC 클래스는 Base 클래스를 상속받는 파생 클래스가 반드시 Base 클래스의 메소드를 명시적으로 선언해수 구현하도록 강제하는 추상화 클래스 기능이다.

* 다형성이란 하나의 인터페이스를 통해 서로 다른 여러 타입을 제공하는 것을 의미한다.

* 보통 OOP에서 말하는 다형성은 클래스에 선언된 메서드가 상속받은 클래스에서 같은 이름으로 오버라딩되어 여러 형태로 동작하는 것을 의미한다.

```py
class BaseClass:
    def func1(self):
        pass

    def func2(self):
        pass

class Derived1stClass(BaseClass):
    def func1(self):
        print("func1 in Derived1stClass")

    def func2(self):
        print("func2 in Derived1stClass")

class Derived2ndClass(BaseClass):
    def func1(self):
        print("**func1 in Derived2ndClass**")
    
    def func2(self):
        print("**func2 in Derived2ndClass**")
```

만약 Derived2ndClass의 func2를 구현하지 않았다면, func2를 호출했을 때 BaseClass의 func2가 호출된다.

의도한 것이라면 상관없지만 추후에 side effect가 발생할 여지가 있다.

이런 상황을 막기 위해 BaseClass에서 예외를 추가할 수 있다.

```py
class BaseClass:
    def func1(self):
        raise NotImplementedError()
    
    def func2(self):
        raise NotImplementedError()
```

이렇게 하면 BaseClass를 상속받은 파생 클래스에서 func2를 구현하지 않는다면 BaseClass의 func2가 호출되고 NotImplementedError 예외를 발생시킨다.

이러한 방식보다 더 strict한 방식을 제공하는 것이 ABC 클래스다.

```py
import abc

class BaseClass(metaclass = abc.ABCMeta):
    @abc.abstractmethod
    def func1(self):
        pass

    @abc.abstractmethod
    def func2(self):
        pass
```

BaseClass에서 상속받는 모든 파생 클래스에서 해당 메소드를 구현하지 않으면 자동으로 예외를 발생시킨다.

## ABC를 사용하는 것과 NotImplementedError 메소드를 선언하는 것과의 차이점

1. abc 클래스를 사용하면 해당 BaseClass는 인스턴스를 생성할 수 없다.

* 파생 클래스 구현을 위한 추상화 기능 제공 역할만 한다.

2. 예외 발생 시점이 다르다.

* NotImplementedError를 선언한 경우 런타임에 해당 메소드가 호출되는 시점에 에러를 발생시킨다.

* abc 클래스를 이용하는 경우 해당 모듈이 import 되는 순간부터 예외를 발생시킨다.

