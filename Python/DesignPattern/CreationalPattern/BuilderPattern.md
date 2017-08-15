# Builder Design Pattern

## 의도

동일한 구성 프로세스가 다른 표현을 만들기 위해 복잡한 object의 구성(construction)과 표현(representation)을 분리한다.

복잡한 representation을 분석하여(parse), 다양항 목표 중에 하나를 만든다.


bulder pattern은 복잡한 object의 구성을 표현과 분리하여 동일한 구성 프로세스가 다른 표현을 만들 수 있게한다. 

이 패턴은 패스트 푸드 식당에서 아이들의 식사를 만드는 데 사용됩니다. 어린이의 식사는 일반적으로 주요 항목, 측면 항목, 음료 및 장난감 (예를 들면, 햄버거, 감자 튀김, 콜라, 장난감 공룡)로 구성되어 있습니다. 어린이 식사의 내용에 차이가있을 수 있지만 construction process는 동일하다. 고객이 햄버거, 치즈 버거 또는 닭고기를 주문하든간에 과정은 같다. 

```py
"""
Separate the construction of a complex object from its representation so
that the same construction process can create different representations.
"""

import abc

class Director:
    """
    Construct an object using the Builder interface.
    """
    def __init__(self):
        self._builder = None

    def construct(self, builder):
        self._builder = builder
        self._builder._build_part_a()
        self._builder._buuld_part_b()
        self._builder._build_part_c()

    class Builder(metaclass=abc.ABCMeta):
        """
        Specify an abstract interface for creating parts of a Product object.
        """

        def __init__(self):
            self.product = Product()

        @abc.abstractmethod
        def _build_part_a(self):
            pass

        @abc.abstractmethod
        def _build_part_b(self):
            pass

        @abc.abstractmethod
        def _build_part_b(self):
            pass

    class ConcreteBuilder(Builder):
        """
        Construct and assemble parts of the product by implementing the
        Builder interface.
        Define and keep track of the representation it creates.
        Provide an interface for retrieving the product.
        """

        def _build_part_a(self):
            pass

        def _build_part_b(self):
            pass

        def _build_part_c(self):
            pass

class Product:
    """
    Represent the complex object under construction.
    """
    pass

def main():
    concrete_builder = ConcreteBuilder()
    director = Director()
    director.construct(concrete_builder)
    product = concrete_builder.product


if __name__ == "__main__":
    main()
```