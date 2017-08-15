# Building Application Frameworks

기본 개념은 template method의 구현은 숨기고 base class에서 여러 method들을 호출하여 프로그램을 실행한다.

Template Method는 base class에 정의되어 있고 이것을 변경할 수 없다는 것이 중요한 특징이다.

```py
class ApplicationFramework:
    def __init__(self):
        self.__templateMethod()
    def __templateMethod(self):
        for i in range(5):
            self.customize1()
            self.customize2()

# Create an "application"
class MyApp(ApplicationFramework):
    def customize1(self):
        print("call me")
    def customize2(self):
        print("ring my bell")

MyApp()
```

base class의 생성자는 필요한 초기화를 수행하고 template method을 생성한다.

생성된 template method가 application을 실행한다.

programmer는 application을 실행하기 위해 customize1()과 customize2()만 정의하면 된다.
