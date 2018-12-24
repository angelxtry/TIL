# LINQ Select

```cs
string[] fruits = { "apple", "banana", "mango", "orange",
                      "passionfruit", "grape" };

var query =
    fruits.Select((fruit, index) =>
                      new { index, str = fruit.Substring(0, index) });

foreach (var obj in query)
{
    Console.WriteLine("{0}", obj);
}
```

[MS공식페이지](https://docs.microsoft.com/ko-kr/dotnet/api/system.linq.enumerable.select?view=netframework-4.7.2)에서 퍼온 코드다.
Select 메서드는 IEnumerable<T>를 반환한다.
위의 코드에서 Select는 argument가 2개인 함수를 받는다.
첫 번째 argument는 fruits의 element다.
두 번째 argument는 fruits 배열의 index를 의미한다.
이 함수는 index, str로 구성된 새로운 객체를 반환한다.

```cs
IEnumerable<int> squares =
    Enumerable.Range(1, 10).Select(x => x * x);

foreach (int num in squares)
{
    Console.WriteLine(num);
}
```

1부터 10개의 순차적인 숫자를 제곱한 결과를 반환한다.

----

sequence의 모든 elements에 Select 메서드를 이용하여 type conversion을 하는 예제를 보고 Select 메서드는 한 sequence의 모든 elements에 동일한 함수를 적용하는 데 사용하는 메서드로 잘 못 이해했다. Select가 모든 elements에 같은 함수를 적용할 수 있는 것은 맞지만 함수의 결과로 동일한 type을 반환할 때만 사용할 수 있다는 것을 나중에야 알게됐다.

```cs
static void Main(string[] args)
{
    IEnumerable<int> numList = new List<int>()
    {
        1, 2, 3, 4, 5
    };
    numList.Select(n => print(n));
    Console.ReadLine();
}

private static void print(int number)
{
    Console.WriteLine(number);
}
```

위처럼 Select에 return값이 없는 함수를 사용할 경우 compile error가 발생한다. 에러 메세지는 다음과 같다.

```txt
오류 1 'System.Linq.Enumerable.Select<TSource,TResult>(System.Collections.Generic.IEnumerable<TSource>, System.Func<TSource,TResult>)' 메서드의 형식 인수를 유추할 수 없습니다. 형식 인수를 명시적으로 지정하십시오.
```

이 메세지를 이해할 수 없었다. 사실 지금도 이 메시지를 제대로 이해하지 못하겠다.
형식 인수는 type argument를 번역한 것 같은데 이 에러 메시지에서는 무엇을 말하는 건지 모르겠다.
