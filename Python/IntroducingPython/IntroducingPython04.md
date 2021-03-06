# Introducing Python

## 클래스

클래스로부터 객체를 생성하는 과정

`a = Aclass('a')`

1. 클래스의 정의를 찾는다.

2. 새 객체를 메모리에 초기화(생성) 한다.

3. 객체의 __init__ 메서드를 호출한다. 

4. 새롭게 생성된 객체를 self에 전달하고 인자를 전달한다.

5. 새로운 객체를 반환하고 이 객체를 변수에 연결한다.

## 메서드 오버라이드

__init__() 메서드를 포함한 모든 메서드를 오버라이드 할 수 있다.

## super()
```
class Person():
    def __init__(self, name):
        self.name = name

class EmailPerson(Person):
    def __init__(self, name, email):
        super().__init__(name)
        self.email = email
```

## get/set 속성값과 프로퍼티

```
class Duck():
    def __init__(self, duck_name):
        self.my_name = duck_name
    def get_name(self):
        print('call getter')
        return self.my_name
    def set_name(self, duck_name):
        print('call setter')
        self.my_name = duck_name
    name = property(get_name, set_name)

duckA = Duck('kkk')
print(duckA.name)
# call getter
# kkk

duckA.name = 'jjj'
print(duckA.name)
# call setter
# call getter
# jjj
```

* get_name과 set_name 함수를 정의하고 property()의 첫 번째 인자로 getter, 두 번재 인자로 setter를 지정했다.

* Duck 객체의 name을 참조할 때 get_name() 메서드를 호출한다.

* Duck 객체의 name에 값을 할당하면 set_name() 메서드를 호출한다.

* get_name(), set_name() 메서드를 직접 호출할 수 있다.

## decorator를 사용하여 프로퍼티 정의

```
class Duck():
    def __init__(self, duck_name):
        self.my_name = duck_name
    @property
    def name(self):
        print('call getter')
        return self.my_name
    @name.setter
    def name(self, duck_name):
        print('call setter')
        self.my_name = duck_name

duckA = Duck('kkk')
print(duckA.name)
# call getter
# kkk

duckA.name = 'jjj'
print(duckA.name)
# call setter
# call getter
# jjj
```

* 각 메서드는 name()으로 동일하지만 decorator가 다르다.

* getter 메서드 앞에 @property decorator를 쓴다.

* setter 메서드 앞에 @name.setter 데커레이터를 쓴다.

```
class Circle():
    def __init__(self, radius):
        self.radius = radius
    @property
    def diameter(self):
        return 2 * self.radius

c = Circle(5)
print(c.radius)
print(c.diameter)

c.radius = 7
print(c.diameter)
```

* decorator를 이용한 property

* setter property를 명시하지 않는다면 diameter는 real-only 속성이다.

* 직접 값을 설정하려고 하면 AttributeError 가 발생한다.

## private name mangling

attribute 이름 앞에 던더를 붙이면 private 속성처럼 사용할 수 있다.

직접 호출하려고 하면 AttributeError가 발생한다.

직접 접근할 수 있는 방법이 없는 것은 아니지만 private의 용도로 사용한다.

## class method

클래스 정의에서 함수에 @classmethod decorator가 있다면 class method

클래스 메서드의 매개변수는 cls로 쓴다.

```
class A():
    count = 0
    def __init__(self):
        A.count += 1
    @classmethod
    def count_kids(cls):
        print('A has', cls.count, "instances")

aa = A()
aaa = A()
aaaa = A()
A.count_kids()
```

* count는 class attribute다.

* count_kids()에서 A.count를 사용해도 된다.

## static method

```
class Mathematics:
    @staticmethod
    def addNumbers(x, y):
        return x + y

print('The sum is:', Mathematics.addNumbers(5, 10))
```

* @staticmethod decorator가 붙어있고 self나 cls등의 매개변수가 없다.

* 메서드에 접근하기 위해 클래스의 객체를 생성할 필요가 없다.

## 덕 타이핑

polymorphism을 느슨하게 구현한 것.

클래스에 상관없이 같은 동작을 다른 객체에 적용할 수 있다.

```
class Quote():
    def __init__(self, person, words):
        self.person = person
        self.words = words
    def who(self):
        return self.person
    def says(self):
        return self.words + '.'

class QuestionQuote(Quote):
    def says(self):
        return self.words + '?'

class ExclamationQuote(Quote):
    def says(self):
        return self.words + '!'

man_a = Quote('Aman', 'hello')
man_b = QuestionQuote('Bman', 'hello')
man_c = ExclamationQuote('Cman', 'hello')

print(man_a.who(), man_a.says())
print(man_b.who(), man_b.says())
print(man_c.who(), man_c.says())
```

* Q class와 E class에서는 __init__() 메서드를 오버라이드하지 않는다.

* 자동으로 부모 클래스의 __init__() 메서드를 상속받아 사용한다.

* 세 개의 says() 메서드는 서로 다른 동작을 제공한다.

* 이것은 객체 지향 언어에서 전통적인 다형성의 특징이다.

* 다 나아가 파이썬은 who()와 says() 메서드를 갖고 있는 모든 객체에서 이 메서드들을 실행할 수 있게 해준다.

```
class Quote():
    def __init__(self, person, words):
        self.person = person
        self.words = words
    def who(self):
        return self.person
    def says(self):
        return self.words + '.'

class QuestionQuote(Quote):
    def says(self):
        return self.words + '?'

class ExclamationQuote(Quote):
    def says(self):
        return self.words + '!'

man_a = Quote('Aman', 'hello')
man_b = QuestionQuote('Bman', 'hello')
man_c = ExclamationQuote('Cman', 'hello')

print(man_a.who(), man_a.says())
print(man_b.who(), man_b.says())
print(man_c.who(), man_c.says())

class Animal():
    def who(self):
        return 'Animal'
    def says(self):
        return 'mumumu'

animal_a = Animal()

def who_says(obj):
    print('who_says call', obj.who(), obj.says())

who_says(man_a)
who_says(man_b)
who_says(man_c)
who_says(animal_a)
```

* Animal class는 앞에 정의된 class와 관계가 없다.

* 단지 who() 메서드와 says() 메서드를 가지고 있다는 점만 동일하다.

* who_says() 함수는 객체의 who() 메서드와 says() 메서드를 실행한다.

* who_says() 함수에는 who(), says() 메서드만 있다면 어떤 객체를 전달해도 제대로 실행된다.

## 특수 메서드
```
class Word():
    def __init__(self, text):
        self.text = text

    def equals(self, word2):
        return self.text.lower() == word2.text.lower()

first = Word('qqq')
second = Word('QQQ')
third = Word('www')

print(first.equals(second))
print(first.equals(third))

class WordSpecial():
    def __init__(self, text):
        self.text = text

    def __eq__(self, word2):
        return self.text.lower() == word2.text.lower()

sp_first = WordSpecial('qqq')
sp_second = WordSpecial('QQQ')
sp_third = WordSpecial('www')

print(sp_first == sp_second)
print(sp_first == sp_third)
```
* Word와 WordSpecial class는 동일한 역할을 한다.

* __eq__() 메서드를 사용하여 == 연산을 할 수 있다.

비교 연산을 위한 특수 메서드

* __eq__ -> ==

* __ne__ -> !=

* __lt__ -> <

* __gt__ -> >

* __le__ -> <=

* __ge__ -> >=

산술 연산을 위한 특수 메서드

__add__

__sub__

__mul__

__floordiv__

__turediv__

__mod__

__pow__

기타 특수 메서드

__str__(self)

__repr__(self)

__len__(self)

## 컴포지션 composition

has-a 구조

```
class Bill():
    def __init__(self, description):
        self.description = description

class Tail():
    def __init__(self, length):
        self.length = length

class Duck():
    def __init__(self, bill, tail):
        self.bill = bill
        self.tail = tail
    def about(self):
        print('This duck has a', self.bill.description,\
        'bill and a', self.tail.length, 'tail')

tail = Tail('long')
bill = Bill('wide orange')
duck = Duck(bill, tail)
duck.about()
```
----

비슷한 행동(메서드)을 하지만 내부 상태(속성)가 다른 개별 인스턴스가 필요할 때 객체는 매우 유용하다.

클래스는 상속을 지원하지만, 모듈은 상속을 지원하지 않는다.

파이썬은 모듈이 참조된 횟수에 상관없이 단 하나의 복사본만 불러온다.(파ㄴㄴ이썬 모듈은 싱글턴 처럼 쓸 수 있다.)

여러 함수에 인자로 전달될 수 있는 여러 값을 포함한 여러 변수가 있다면, 클래스로 정의하는 것이 좋다.

가장 간단한 문제 해결 방법을 사용한다.

딕셔너리, 리스트, 튜플은 모듈보다 더 작고, 간단하며, 빠르다.

그리고 일반적으로 모듈은 클래스보다 더 간단하다.

## named tuple

네임드 튜플은 튜플의 서브클래스다.

이름(.name)과 위치(offset)로 값에 접근할 수 있다.

```
from collections import namedtuple
Duck = namedtuple('Duck', 'bill tail')
duck = Duck('wide orange', 'long')
print(duck) # Duck(bill='wide orange', tail='long')
print(duck.bill) # wide orange
print(duck.tail) # long

parts = {'bill': 'wide red', 'tail': 'short'}
duck2 = Duck(**parts)
print(duck2) # Duck(bill='wide red', tail='short')
```
* namedtuple은 이름과 스페이스로 구분된 필드 이름의 문자열을 매개변수로 받는다.

* 위 예제에서 `'Duck'`는 namedtuple의 이름이고

* `'bill tail'`은 namedtuple의 속성처럼 사용할 수 있다.

* duck2 처럼 딕셔너리를 네임드 튜플로 변환할 수 있다.

* **parts는 키워드 인자다. parts 딕셔너리에서 키와 값을 추출하여 Duck()의 인지로 제공한다.

* 네임드 튜플은 immutable이다. 

* 하지만 필드를 바꿔서 다른 네임드 튜플을 반환할 수 있다.

네임드 튜플의 특징

* 불변하는 객체처럼 행동한다.

* 객체보다 공간 시간 효율성이 더 좋다.
