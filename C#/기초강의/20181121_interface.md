# interface

[강의동영상](https://www.youtube.com/watch?v=_rXztqLMYAw)

interface는 약속이다.

```cs
public interface ICar
{
}

public class Car : ICar
{
}

class Program
{
  static void Main(string[] args)
  {
    Car car = new Car();
  }
}
```

이 코드는 아무런 문제없이 컴파일된다.
여기서 interface인 ICar에 메소드를 추가하면 에러가 발생한다.
interface에 메소드의 시그니처가 선언되면 interface를 상속받은 Car 클래스에서 해당 메소드를 구현해야 한다.
