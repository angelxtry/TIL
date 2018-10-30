# C# Test - Calculator

- 이제와 뒤늣게 C#으로 테스트 연습을 하고 있다.
- C#도 어색하고 test도 어색하다.
- youtube 보고 따라 하고 있다.
- vs2010 환경으로 실행했다.

## Project 생성

- Visual C# > Class Library 선택
  - 이름: CalculatorEngine
  - 솔루션 이름: Calculator
  - 확인 버튼 클릭

- 솔루션 탐색기에서 Class1.cs 파일을 지워준다.
  - 안지워도 상관은 없지만 깔끔하게 지워주자.

## Test Project 추가

- 솔루션 탐색기 > 마우스 우클릭 > 추가 > 새 프로젝트
  - Visual C# > 테스트 > 테스트 프로젝트
  - 이름: CalculatorEngineTests
  - 확인 버튼 클릭

- 솔루션 탐색기 > CalculatorEngineTests 프로젝트 > 마우스 우클릭 > 추가 > 새 테스트
  - 기본 단위 테스트
  - 테스트 이름: CalculatorEngineTest.cs
  - 확인 버튼 클릭
  - CalculatorEngineTests 프로젝트에 CalculatorEngineTest.cs 파일이 생성됨

## Test 추가

- CalculatorEngineTest.cs 파일에 자동으로 [TestMethod]가 생성되어 있음
  - 메소드명 변경 및 수정

```cs
[TestMethod]
public void AddMethodTest()
{
    Calculator calInstance = new Calculator();
    int param1 = 2;
    int param2 = 3;
    int expected = 5;
    Assert.AreEqual(expected, calInstance.Add(param1, param2));
}
```