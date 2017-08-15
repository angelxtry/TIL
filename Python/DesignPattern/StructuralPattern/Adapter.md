# Adapter Design Pattern

클래스의 인터페이스를 클라이언트가 기대하는 다른 인터페이스로 변환한다.

어댑터를 사용하면 호환되지 않는 인터페이스 때문에 함께 동작할 수 없었던 클래스를 함께 동작할 수 있다.

새로운 인터페이스로 기존 클래스를 래핑한다.

```py
"""
Convert the interface of a class into another interface clients expect.
Adapter lets classes work together that couldn't otherwise because of
incompatible interfaces.
"""

import abc

class Target(metaclass=abc.ABCMeta):
    """
    Define the domain-specific interface that Client uses.
    """
    def __init__(self):
        self._adaptee = Adaptee()

    @abc.abstractmethod
    def request(self):
        pass

class Adapter(Target):
    """
    Adapt the interface of Adaptee to the Target interface.
    """
    def reqeust(self):
        self._adaptee.specific_request()

class Adaptee:
    """
    Define an existing interface that needs adapting.
    """
    def specific_request(self):
        pass

def main():
    adapter = Adapter()
    adapter.request()

if __name__ == '__main__':
    main()

```
