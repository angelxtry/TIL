# @property

`__`가 앞에 있으면 private

`_`가 앞에 있으면 protected

get, set 함수를 만들어서 처리할 수도 있지만 `@property`를 이용하는 것도 가능하다.

```py
class Test:
    def __init__(self):
        self.__color = 'red'
    
    @property
    def color(self):
        return self.__color

    @color.settter
    def color(self, value):
        self.__color = value

if __name__ == '__main__':
    t = Test()
    t.color = 'blue'
    print(t.color)
```

```py
class Celsius:
    def __init__(self, temperature=0):
        self.set_temperature(temperature)

    def to_fahrenheit(self):
        return (self.get_temperature() * 1.8) + 32
    
    def get_temperature(self):
        return self._temperature
    
    def set_temperature(self, value):
        if value < -273:
            raise ValueError("Temperature below -273 is not possible")
        self._temperature = value
```

-273도 이하로 내려가는 값을 입력받으면 예외를 발생시킨다.

그래서 temperature 변수를 public으로 만들지 않고 _temperature 로 만들고 get, set을 추가했다.

하지만 python에서 private은 강제가 아니기 때문에 다음과 같이 오류 가능성이 존재한다.

```py
c = Celsius()
c._temperature = -300
print(c.get_temperature()) # -300
```

이제 Celsius class를 다음과 같이 변경해보자.

```py
def get_temperature(self):
    print("Getting value")
    return self._temperature

def set_temperature(self, value):
    if value < -273:
        raise ValueError("Temperature below -273 is not possible")
    print("Setting value")
    self._temperature = value

temperature = property(get_temperature, set_temperature)
```

마지막 코드는 temperature의 property object를 만든 것이다.

```py
c = Celsius()
# Getting value
# 0

c.temperature
# Getting value
# 0

c.temperature = 37
# Setting value

c.to_fahrenheit()
# Getting Value
# 98.6
```

c.temperature를 실행하면 자동으로 set_temperature()가 실행된다.

c.temperature = 37을 실행하면 자동으로 get_temperature()가 실행된다.

실제로 값이 저장되는 변수는 _temperature다.


python에서 property() 빌트인 함수는 property object를 생성하여 return 한다.

property() 함수의 signature는 다음과 같다.

```py
property(fget=None, fset=None, fdel=None, doc=None)
```


```py
class Celsius:
    def __init__(self, temperature=0):
        self._temperature = temperature
    
    def to_fahrenheit(self):
        return (self.temperature * 1.8) + 32
    
    @property
    def temperature(self):
        print("Getting value")
        return self._temperature
    
    @temperautre.setter
    def temperature(self, value):
        if value < -273:
            raise ValueError("Temperature below -273 is not possible")
        print("Setting value")
        self._temperature = value
```