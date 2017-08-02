# ABC(Abstract Base Class)

https://pymotw.com/3/abc/

## ABC를 왜 사용할까?

* 특정 메소드의 개별적인 hasattr() 확인 보다 더 엄격한 인터페이스 검사를 위해 사용한다.

* ABC를 사용하면 서브 클래스들에 공통 API를 강제할 수 있다.

* 소스코드에 익숙하지 않은 사용자가 pulg-in extension 작업을 수행할 때 많은 도움이 될 수 있다.

## ABC는 어떻게 동작하는가

* abc는 base class의 메소드를 추상화한 후 concrete class에서 해당 메소드를 구현하여 사용한다.

* 어떤 어플리케이션이나 라이브러리가 특정 API를 필요로 한다면 issubclass() 또는 isinstance()를 이용하여 abstract class의 object인지 확인할 수 있다.

* 데이터를 저장하고 로드하는 API를 abstract class로 정의한다.

```py
# abc_abse.py

import abc

class PluginBase(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def load(self, input):
        """Retrieve data from the input source and return an object"""

    @abc.abstractmethod
    def save(self, output, data):
        """Save the data object to the output"""
```

## Concrete Class 등록하기

* concrete class가 abstract API를 구현하기 위한 2가지 방법이 있다.

1. 명시적으로 class를 register 하는 것

2. abstract class로 부터 새로운 subclass를 만드는 것

* register() class 메소드를 concrete class의 데코레이터로 사용한다.

* register()를 사용하면 class는 필수 API를 제공하지만, abstract base class의 상속트리에는 속하지 않는다.

```py
# abc_register.py

import abc
from abc_abs import PluginBase

class LocalBaseClass:
    pass


@PluginBase.register
class RegisterdImplementation(LocalBaseClass):
    def load(self, input):
        return input.read()

    def save(self, output, data):
        return output.write(data)


if __name__ == '__main__':
    print('Subclass:', issubclass(RegisteredImplementation, PluginBase))
    print('Instance:', isinstance(RegisteredImplementation(), PluginBase))
```

* RegisterdImplementataion class는 LocalBaseClass의 파생 클래스다.

* 하지만 PluginBase API의 구현하는 것으로 등록되어 있으므로 issubclsss()와 isinstance() 검사에서 모두 PluginBase의 파생클래스로 처리된다.

* 결과는 모두 True다.

## Subclassing을 통한 구현

* abstract class를 상속받으면 명시적으로 등록하지 않아도 구현 가능하다.

```py
# abc_subclass.py

import abc
from abc_base import PluginBase

class SubclassImplementation(PluginBase):
    def load(self, input):
        return input.read()

    def save(self, output, data):
        return output.write(data)

if __name__ == '__main__':
    print('Subclass:', issubclass(SubclassImplementation, PluginBase))
    print('Instance:', isinstance(SubclassImplementation(), PluginBase))
```

이 경우 SubclassImplementation은 PluginBase의 subclass이고, SubclassImplementation의 인스턴스는 PluginBase의 인스턴스이다.

직접 상속을 하여 abc를 구현할 경우 부작용은 base class에서 파생클래스의 모든 구현을 확인할 수 있게되는 것이다.

이것은 abc의 특성이 아니라 모든 상속 구조에서 발생하는 일이다.

```py
# abc_find_subclasses.py

import abc
from abc_base import PluginBase
import abc_subclass
import abc_register

for sc in PluginBase.__subclass__():
    print(sc.__name__)
```

abc_register도 import 했지만 abc_register의 implementation은 확인되지 않는다.

알고있듯이 abc_register는 base_class의 파생클래스가 아니기 때문이다.

## Helper Base Class

```py
# abc_abc_base.py

import abc

class PluginBase(abc.ABC):
    @abc.abstractmethod
    def load(self, input):
        """Retrieve data from the input source and return an object"""
    
    @abc.abstractmethod
    def save(self, output, data):
        """Save the data object to the output."""


class SubclassImplementation(PluginBase):

    def load(self, input):
        return input.read()

    def save(self, output, data):
        return output.write(data)


if __name__ == '__main__':
    print('Subclass:', issubclass(SubclassImplementation, PluginBase))
    print('Instance:', isinstance(SubclassImplementation(), PluginBase))
```

abc.ABC를 사용하면 metaclass를 적절하게 사용하지 못해서 발생하는 오류를 막도록 도와줄 수 있다.

상속을 받아 class를 생성할 때는 abc.ABC를 사용하는 것이 편하다.

## Incomplete Implementations

abstract base class를 직접 삭속받는 것의 추가적인 장점은 abstract method를 모두 구현하지 않으면 인스턴스를 만들 수 없게 되는 것이다.

```py
# abc_incomplete.py

import abc
from abc_base import PluginBase

@PluginBase.register
class IncompleteImplementation(PluginBase):
    def save(self, output, data):
        return output.write(data)


if __name__ == '__main__':
    print('Subclass:', issubclass(IncompleteImplementation, PluginBase))
    print('Instance:', isinstance(IncompleteImplementation(), PluginBase))
```

input()이 구현되지 않았기 때문에 인스턴스 생성시 runtime에 예외가 발생한다.

## Concrete Methods in ABCs

concrete class는 모든 abstract method를 구현해야 한다.

하지만 subclass에서 super()를 호출하여 abstract method에 이미 구현된 로직을 사용할 수도 있다.

이것은 공통 로직은 base class에 구현하고 재사용할 수 있게 만든다.

subclass는 abstract method에 구현된 로직외에 일부분을 다시 정의할 수 있다.

```py
# abc_concrete_method.py

import abc
import io

class ABCWithConcreteImplementation(abc.ABC):
    @abc.abstractmethod
    def retrieve_values(self, input):
        print('base class reading data')
        return input.read()

class ConcreteOverride(ABCwithConcreteImplementation):
    def retireve_values(self, input):
        base_data = super(ConcreteOverride, self).retrieve_values(input)
        print('subclass sorting data')
        response = sorted(base_data.splitlines())
        return response

input = io.StringIO("""
line one
line two
line three
""")

reader = ConcreteOverride()
print(reader.retrieve_values(input))
print()
```

ABCWithConcreteImplementation()은 abstract base class 이기 때문에 인스턴스를 만들 수 없다.

그러므로 subclass에서 해당 method를 override하면서 super를 이용하여 abstract base class의 abstract method를 호출할 수 있다.

## Abstract Properties

API 사양에 메소드 외에 attribute가 포함되어 있다면 abstractmethod()와 property()를 결합하여 concrete class에서 attrubute를 요구할 수 있다.

```py
# abc_abstractproperty.py
import abc


class Base(abc.ABC):

    @property
    @abc.abstractmethod
    def value(self):
        return 'Should never reach here'

    @property
    @abc.abstractmethod
    def constant(self):
        return 'Should never reach here'


class Implementation(Base):

    @property
    def value(self):
        return 'concrete property'

    constant = 'set by a class attribute'


try
    b = Base()
    print('Base.value:', b.value)
except Exception as err:
    print('ERROR:', str(err))

i = Implementation()
print('Implementation.value   :', i.value)
print('Implementation.constant:', i.constant)
```

Base class는 인스턴스를 만들 수 없다.

Base class는 단지 property getter method의 abstract 버전이다.

value property는 Implementation에서 구체적인 getter가 되었다.

constant는 class attribute로 사용된다.

```py
# abc_abstractproperty_rw.py

import abc


class Base(abc.ABC):
    @property
    @abc.abstractmethod
    def value(self):
        return 'Should never reach here'

    @value.setter
    @abc.abstractmethod
    def value(self, new_value):
        return


class PartialImplementation(Base):
    @property
    def value(self):
        return 'Read-only'


class Implementation(Base):
    _value = 'Default value'

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, new_value):
        self._value = new_value


try:
    b = Base()
    print('Base.value:', b.value)
except Exception as err:
    print('ERROR', str(err))

p = PartialImplementation()
print('PartialImplementation.value:', p.value)

try:
    p.value = 'Alteration'
    print('PartialImplementation.value:', p.value)
except Exception as err:
    print('ERROR:', str(err))

i = Implementation()
print('Implementation.value:', i.value)

i.value = 'New value'
print('Change value:', i.value)
```

## Abstract Class and Static Methods

classmethod 와 staticmethod도 abstract와 함께 활용할 수 있다.

```py
# abc_class_static.py

import abc

class Base(abc.ABC):
    @classmethod
    @abc.abstractmethod
    def factory(cls, *args):
        return 'Should never reach here'
    
    @staticmethod
    @abc.abstractmethod
    def const_behavior():
        return 'Should never reach here'

class Implementation(Base):
    def do_something(self):
        pass

    @classmethod
    def factory(cls, *args):
        obj = cls(*args)
        obj.do_something()
        return obj
    
    @staticmethod
    def const_behavior():
        return 'Static behavior differs'

try:
    o = Base.factory()
    print('Base value:', o.const_behavior())
except Exception as err:
    print('ERROR:', str(err))

i = Implementation.factory()
print('Implementation.const_behavior:', i.const_behavior())
```

classmethod는 인스턴스가 아닌 class에서 호출되지만, abstract method인 경우 상속되어 구현되지 않으면 여전히 다른 abstrct method와 동일하게 호출할 수 없다.