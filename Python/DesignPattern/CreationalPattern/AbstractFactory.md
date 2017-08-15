# Abstract Factory Design Pattern

어디에 사용해야 할지 잘 모르겠다.

이해가 부족하다.

----

concrete class의 스펙을 정의하지 않고 연관이 있거나 의존적인 object를 생성할 수 있는 interface를 제공한다.

application을 porting 하기 위해서는 platform 의존성을 캡슐화해야 한다.

캡슐화는 미리 기획하지 못하는 경우가 많고, `#ifdef`을 코드전체에 도배하여 해결하기도 한다.

```py
"""
concrete class를 별도로 구현하지 않고, 연관이 있거나 의존적인 object를 생성하기 위한
interface를 제공한다.
"""
import abc

class AbstractFactory(metaclass=abc.ABCMeta):
    """
    abstract product object를 생성하기 위한 interface를 선언
    """
    @abc.abstractmethod
    def create_product_a(self):
        pass

    @abc.abstractmethod
    def create_product_b(self):
        pass

class ConcreteFactory1(AbstractFactory):
    """
    concrete product object를 생성하기 위한 opertion을 구현
    """
    def create_product_a(self):
        return ConcreteProductA1()

    def create_product_b(self):
        return ConcreteProductB1()

class ConcreteFactory2(AbstractFactory):
    """
    concrete product object를 생성하기 위한 opertion을 구현
    """
    def create_product_a(self):
        return ConcreteProductA2()

    def create_product_b(self):
        return ConcreteProductB2()

class AbstractProductA(metaclass=abc.ABCMeta):
    """
    product object의 interface를 선언
    """
    @abc.abstractmethod
    def interface_a(self):
        pass

class ConcreteProductA1(AbstractProductA):
    """
    해당 concrete factory를 생성하기 위한 product object를 구현한다.
    Abstract Product의 interface를 구현한다.
    """
    def interface_a(self):
        pass

class ConcreteProductA2(AbstractProductA):
    def interface_a(self):
        pass

class AbstractProductB(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def interface_b(self):
        pass

class ConcreteProductB1(AbstractProductB):
    def interface_b(self):
        pass

class ConcreteProductB2(AbstractProductB):
    def interface_b(self):
        pass

def main():
    for factory in (ConcreteFactory1(), ConcreteFactory2()):
        product_a = factory.create_product_a()
        product_b = factory.create_product_b()

        product_a.interface_a()
        product_b.interface_b()

if __name__ == '__main__':
    main()
```
-----

# Factory Pattern

시스템에 새로운 유형을 추가해야 할때, 가장 합리적인 방법은 다형성을 이용하여 새로운 유형에 대한 공통 인터페이스를 만드는 것이다. 이렇게 하면 기존 로직을 방해하지 않으면서 기존 코드와 새로 추가된 유형의 코드 및 로직이 분리될 수 있다. 

이러한 디자인에서 변경이 필요한 부분은 오직 새로운 유형을 상속받는 부분뿐이지만 실제로는 그렇지 않은 경우가 많다. 새로 추가된 유형의 object를 생성해야 하고, 생성시점에 사용할 생성자를 지정해야만 한다. 새로운 object를 생성하는 코드가 프로그램 전반에 흩어져 있다면 해당 코드가 포함될 부분을 모두 추적해야 한다.

이 문제를 해결하기 위해 factory를 통해 object 생성을 처리하게 한다. 새 유형을 추가할 경우 factory만 수정하면 된다.

```py
import abc
class Shape(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def draw(self):
        pass

class Rectangle(Shape):
    def draw(self):
        print("Inside Rectangle::draw() method.")

class Square(Shape):
    def draw(self):
        print("Inside Square::draw() method.")

class Circle(Shape):
    def draw(self):
        print("Inside Circle::draw() method.")

class ShapeFactory:
    @staticmethod
    def get_shape(shape_type):
        if shape_type == 'CIRCLE':
            return Circle()
        elif shape_type == 'RECTANGLE':
            return Rectangle()
        elif shape_type == 'SQUARE':
            return Square()
        return null

if __main__ == '__main__':
    rectangle = ShapeFactory.get_shape('RECTANGLE')
    rectangle.draw()

    circle = ShapeFactory.get_shape('CIRCLE')
    circle.draw()

    square = ShapeFactory.get_shape('SQUARE')
    square.draw()

```
