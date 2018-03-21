# ref 예약어

## 구조체

* 구조체는 값 형식의 사용자 정의 형식이다.
* 구조체는 class 예약어를 struct로 대체하는 것만 제외하면 class와 매우 유사하다.
* 차이점은 다음과 같다.
* 1 인스턴스 생성을 new로 해도 되고 안해도 된다.
* 2 기본 생성자는 명시적으로 정의할 수 없다.
* 3 매개변수를 갖는 생성자를 정의해도 기본 생성자가 C# 컴파일러에 의해 자동으로 포함된다.(클래스는 그렇지 않다.)
* 4 매개변수를 받는 생성자의 경우 반드시 해당 코드 내에서 구조체의 모든 필드에 값을 할당해야 한다.

```cs
struct Vector
{
    public int X;
    public int Y;

    public Vector(int x, int y)
    {
        this.X = x;
        this.Y = y;
    }

    public override string ToString() { return "X: " + X + ", Y: " + Y; }
}
class Program
{
    static void Main(string[] args)
    {
        Vector v1 = new Vector();  // new를 사용해 인스턴스 생성
        Vector v2;  // new가 없어도 인스턴스 생성 가능
        Vector v3 = new Vector(5, 10);  // 명시적으로 생성자 지정
        v2.X = 1;
        v2.Y = 2;
        WriteLine("v1: " + v1);
        WriteLine("v2: " + v2);
        WriteLine("v3: " + v3);
    }
}
```

```cs
v1: X: 0, Y: 0
v2: X: 1, Y: 2
v3: X: 5, Y: 10
```

* 구조체 인스턴스를 new로 생성하는 것은 값 형식의 변수를 new로 생성하면 해당 변수의 모든 값을 0으로 할당하는 것과 동일한 효과를 갖는다.
* C# 컴파일러는 개발자가 직접 코드 상에서 값을 할당하지 않는 변수를 사용하는 것을 오류라고 판단한다.
* 클래스와 가장 큰 차이점은 클래스는 참조형이고 구조체는 값 형식이라는 것이다.

## 깊은 복사와 얕은 복사

* 값 형식과 참조 형식의 결정적인 차이점은 인스턴스의 대입이 일어날 때 명확하다.
* 구조체는 인스턴스가 가진 메모리 자체가 스택에 복사되어 새로운 변수에 대입된다.(deep copy)
* 클래스는 스택에 해당 변수가 생성되고 대입되는 변수가 가리키고 있는 힙의 데이터 주소를 새로운 변수의 스택에 저장한다.
* 참조 형식의 변수가 대입되는 방식을 shallow copy라 한다.

```cs
static void Main(string[] args)
{
    Vector v1;
    v1.X = 5;
    v1.Y = 10;
    Vector v2 = v1;
    v2.X = 7;
    v2.Y = 14;
    WriteLine("v1: " + v1.X + " " + v1.Y);
    WriteLine("v2: " + v2.X + " " + v2.Y);

    Point p1 = new Point();
    p1.X = 5;
    p1.Y = 10;
    Point p2 = p1;
    p2.X = 7;
    p2.Y = 14;
    WriteLine("p1: " + p1.X + " " + p1.Y);
    WriteLine("p2: " + p2.X + " " + p2.Y);
}
```

```sh
v1: 5 10
v2: 7 14
p1: 7 14
p2: 7 14
```

* struct v1, v2는 값의 변화가 서로 관련이 없다.
* class p1, p2는 같은 메모리 상의 인스턴스를 가리키고 있으므로 둘 중 어느 하나라도 해당 필드의 값을 변경하면 변수의 결과값이 함께 변경된다.
* 이 규칙은 메서드에 인자로 넘길 때도 동일하게 적용된다.
* 값 형식의 인스턴스를 메서드로 전달했을 때 메서드에서 해당 값을 변경하여도 별도의 스텍 메모리를 가지고 있으므로 메서드를 호출한 쪽의 변수에는 영향을 미치지 않는다.
* 참조 형식을 메서드에 전달하여 값을 변경하면 호출한 측의 참조 변수에도 영향을 미친다.

## 구조체와 클래스를 선택하는 기준

* 일반적으로 모든 사용자 정의 타입은 클래스로 구현한다.
* 깊은/얕은 복사의 차이가 민감한 타입은 선택적으로 구조체로 구현한다.
* 참조 형식은 GC에 의해 관리받는다. GC의 부하를 피해야 하는 경우 구조체를 선택한다.

## ref

* 얕은 복사와 깊은 복사 모두 변수의 스택 값이 복사된다.
* 값 형식의 변수는 해당 변수가 실제 값을 가리키고 있고 그 값이 복사되어 전달된다.
* 참조 형식의 변수는 힙에 존재하는 실제 데이터의 주소값을 기리키고 있고 그 주소값이 복사되어 전달된다.
* 변수의 스택 값이 복사되는 것을 call by value라고 한다.
* call by reference 방식으로 메서드에 인자를 전달하면 변수의 스택 값이 복사되는 것이 아니라 해당 변수의 스택 값을 담고 있는 주소 자체가 전달된다.
* C#에서 call by reference를 지원하기 위해 ref, out 예약어가 있다.

```cs
struct Vector
{
    public int X;
    public int Y;

    public Vector(int x, int y)
    {
        this.X = x;
        this.Y = y;
    }

    public override string ToString() { return "X: " + X + ", Y: " + Y; }
}
class Program
{
    static void Main(string[] args)
    {
        Vector v1;
        v1.X = 5;
        v1.Y = 10;

        Change(v1);
        WriteLine("v1: " + v1.X + " " + v1.Y);

        Change(ref v1);
        WriteLine("v1: " + v1.X + " " + v1.Y);
    }

    static void Change(Vector vt)
    {
        vt.X = 0;
        vt.Y = 0;
    }

    static void Change(ref Vector vt)
    {
        vt.X = 7;
        vt.Y = 14;
    }


}
```

```sh
v1: 5 10
v1: 7 14
```

* ref 예약어는 두 군데서 사용해야 한다.
* 메서드의 매개변수를 선언할 때 함께 표기해야 하고
* 해당 메서드를 호출하는 측에서도 명시해야 한다.
* ref로 인자를 전달하지 않은 경우 v1의 값은 변경되지 않았다.
* ref를 사용하게 되면 메서드의 vt 변수가 호출 측의 v1 변수와 동일한 주소를 가리키게 된다.
* 얕은 복사와 깊은 복사는 변수의 스택 값이 복사되어 전달되지만 ref를 사용한 경우 스택 값의 복사조차 일어나지 않는다.
* ref는 참조형 변수에도 사용할 수 있다.
* 최초에 null을 할당한 변수를 ref로 전달하는 것과 그렇지 않은 것의 차이를 확인할 수 있다.

```cs
class Point
{
    public int X;
    public int Y;
}

class Program
{
    static void Main(string[] args)
    {
        Point p1 = null;
        Change(p1);
        WriteLine("p1: " + p1);

        Change(ref p1);
        WriteLine("p1: " + p1.X + " " + p1.Y);
    }

    private static void Change(Point pt)
    {
        pt = new Point
        {
            X = 6,
            Y = 12
        };
    }

    private static void Change(ref Point pt)
    {
        pt = new Point
        {
            X = 7,
            Y = 14
        };
    }
}
```

```sh
p1:
p1: 7 14
```

* 구조체와 클래스가 아닌 기본 자료형에도 ref를 사용할 수 있다.
* 메서드에 ref 인자로 전달되는 변수는 호출하는 측에서 반드시 값을 할당해야 한다.
* 할당될 값이 null이든 new든 상관없이 지정하기만 하면 된다.

## out 예약어

* out도 참조에 의한 호출을 가능하게 한다.
* ref와의 차이점은 다음과 같다.
* 1 out으로 지정된 인자에 넘길 변수는 초기화하지 않아도 된다. 초기화되어 있더라도 out 인자를 받는 메서드에서는 그 값을 사용할 수 없다.
* 2 out으로 지정된 인자를 받는 메서드는 반드시 변수 값에 넣어서 반환해야 한다.
* out 예약어가 사용되는 곳에 ref 예약어를 사용해 구현하는 것도 가능하다.
* out 예약어는 ref 예약어의 기능 가운데 몇 가지를 강제로 제한했다.
* 메서드가 단 1개의 반환값만 가질 수 있지만 out으로 지정된 매개변수를 사용하여 여러 개의 값을 반환할 수 있다.

```cs
class Program
{
    static void Main(string[] args)
    {
        if (Divide(15, 0, out int quotient) == true)
        {
            WriteLine(quotient);
        }
    }

    static bool Divide(int n1, int n2, out int result)
    {
        if (n2 == 0)
        {
            result = 0;
            return false;
        }

        result = n1 / n2;
        return true;
    }
}
```

* out 예약어가 참조에 의한 호출로 값을 넘기지 않는다면 위와 같은 구현은 불가능하다.
* out으로 지정된 result 변수는 메서드가 return하기 전에 반드시 초기화 되어야 한다.
* result = 0을 제거하면 C# 컴파일러는 return 시점에 초기화되지 않았다는 이유로 컴파일 오류가 발생한다.
* 이와 유사한 용도로 닷넷 프레임워크에서는 각 기본 타입에 TryParse라는 메서드를 제공한다.
* 이 메서드는 변환이 성공했는 지 여부를 true/false로 반환하고 변환이 성공했다면 out으로 지정된 변수에 값을 반환한다.

```cs
static void Main(string[] args)
{
    if (int.TryParse("1234", out int n)) WriteLine(n);
    if (double.TryParse("12E3", out double d)) WriteLine(d);
    if (bool.TryParse("true", out bool b)) WriteLine(b);
}
```

* TryParse와 System.Object로부터 재정의된 ToString은 문자열과 타입 간의 변화에 있어 쌍을 이룬다.

```cs
int n = 500;
string txt = n.ToString();
WriteLine(txt);
if (int.TryParse(txt, out int result)) WriteLine(result);
```

* ref는 메서드를 호출하는 측에서 변수의 값을 초기화하여 메서드 측에 의미 있는 ㄱ밧을 전달한다.
* out은 메서드 측에서 반드시 값을 할당해서 반환함으로써 메서드를 호출한 측에 의미 있는 값을 반환한다.
* ref와 out의 특성을 IN, OUT이라는 표현으로 간단하게 표현하기도 한다.
