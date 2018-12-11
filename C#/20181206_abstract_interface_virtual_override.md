# abstract_interface_virtual_override

```cs
namespace Greeting
{
    abstract class GreetingBase
    {
        public virtual string GetMessage()
        {
            return string.Empty;
        }
    }

    class GreetingMorning : GreetingBase
    {
        //public override string GetMessage()
        //{
        //    return "Good Morning";
        //}
    }

    class GreetingAfternoon : GreetingBase
    {
        public override string GetMessage()
        {
            return "Good Afternoon";
        }
    }

    class GreetingEvening : GreetingBase
    {
        public override string GetMessage()
        {
            return "Good Night";
        }
    }
}

namespace Greeting
{
    class Program
    {
        static void Main(string[] args)
        {
            var greetings = new List<GreetingBase>()
            {
                new GreetingMorning(),
                new GreetingAfternoon(),
                new GreetingEvening(),
            };
            foreach (var obj in greetings)
            {
                Console.WriteLine(obj.GetMessage());
            }
            Console.ReadLine();
        }
    }
}
```

abstract class라고 선언한 순간 상속을 받는다는 것을 알 수 있다.
abstract class 안에는 virtual, abstract를 모두 사용할 수 있다.
virtual로 선언한 메서드는 sub class에서 구체화하지 않아도 된다.
abstract로 선언한 메서드는 sub class에서 반드시 구체화해야 한다.

virtual 메서드는 abstract가 아닌 일반 class에서도 사용할 수 있다.

```cs
abstract class GreetingBase
{
    public virtual string GetMessage()
    {
        return string.Empty;
    }
}
```

```cs
abstract class GreetingBase
{
    public abstract string GetMessage();
}
```

virtual 메서드는 body를 가지고 있다.
abstract 메서드는 body를 가지면 안된다.

```cs
interface IGreeting
{
    string GetMessage();
}
```

interface는 public/private, abstract 등이 붙지 않는다.
interface의 메서드에도 public/private, abstract 등이 붙지 않는다.

```cs
namespace Greeting
{
    interface IGreeting
    {
        string GetMessage();
    }

    class GreetingMorning : IGreeting
    {
        public string GetMessage()
        {
            return "Good Morning";
        }
    }

    class GreetingAfternoon : IGreeting
    {
        public string GetMessage()
        {
            return "Good Afternoon";
        }
    }

    class GreetingEvening : IGreeting
    {
        public string GetMessage()
        {
            return "Good Night";
        }
    }
}
```

interface를 구현한 메서드는 반드시 public 으로 선언되어야 한다.
interface는 override가 붙지 않는다.

```cs
namespace Greeting
{
    class Program
    {
        static void Main(string[] args)
        {
            var greetings = new List<IGreeting>()
            {
                new GreetingMorning(),
                new GreetingAfternoon(),
                new GreetingEvening(),
            };
            foreach (var obj in greetings)
            {
                Console.WriteLine(obj.GetMessage());
            }
            Console.ReadLine();
        }
    }
}
```

interface를 사용하는 것은 abstract class를 사용하는 것과 동일하다.
