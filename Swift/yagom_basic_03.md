## 값 타입과 참조 타입
### Class
* 전통적인 OOP 관점에서 클래스
* 단일 상속
* (인스턴스/타입) 프로퍼티
* (인스턴스/타입) 메소드
* 참조타입
* Apple 프레임워크의 대부분의 큰 뼈대는 클래스로 구성되어 있다.

### Struct
* C언어의 구조체 보다 다양한 기능
* 상속불가
* (인스턴스/타입) 프로퍼티
* (인스턴스/타입) 메소드
* 값 타입
* Swift의 대부분의 큰 뼈대는 모두 구조체로 구성

### Enum
* 상속불가
* (인스턴스/타입) 메서드
* (인스턴스/타입) 연산 프로퍼티
* 값 타입
* 열거형 자체가 하나의 데이터 타입
* 열거형의 case 하나하나 전부 하나의 유의미한 값으로 취급

### Struct는 언제 사용할까?
* 연관된 값들을 모아서 하나의 데이터 타입으로 표현하고 싶을 때
* 다른 객체 또는 함수 등으로 전달될 때 참조가 아닌 복사를 원할 때
* 자신을 상속할 필요가 없거나, 자신이 다른 타입을 상속받을 필요가 없을 때
* Apple 프레임워크에서 프로그래밍 할 때에는 주로 클래스를 많이 사용

## closure
* 코드의 블럭

```
{ (인자 목록) -> 반환타입 in
    실행 코드
}

// 인자가 없고 return도 없을 경우
{ () -> Void in
    실행코드
}
```

```
// 함수
func sumFunc(a: Int, b: Int) -> Int {
    return a+b
}

var sumResult: Int = sumFunc(a: 1, b: 2)

// closure
var sum: (Int, Int) -> Int = { (a: Int, b: Int) -> Int in
    return a + b
}
sumResult = sum(1, 2)

// 함수는 closure의 일종이므로 sum 변수에 당연히 함수도 할당할 수 있다.
sum - sumFunc(a:b:)
sumResult = sum(1, 2)
```

```
let add: (Int, Int) -> Int
add = { (a: Int, b: Int) -> Int in
    return a + b
}

let sub: (Int, Int) -> Int
add = { (a: Int, b: Int) -> Int in
    return a - b
}

func calculate(a: Int, b: Int, method: (Int, Int) -> Int) -> Int {
    return method(a, b)
}

var calculated: Int
calculated = calculate(a: 50, b: 10, method: add)
calculated = calculate(a: 50, b: 10, method: sub)
```

## advanced closure
* 후행 클로저
* 반환타입 생략
* 단축 인자 이름
* 암시적 반환 표현

```
func calculate(a: Int, b: Int, method: (Int, Int) -> Int) -> Int {
    return method(a, b)
}

var result: Int

// !! 후행 클로저
// 클로저가 함수의 마지막 전달인자라면 마자막 매개변수의 이름을 생략 가능
// 함수 소괄호 외부에 클로저를 구현 할 수 있다.
result = calculate(a: 10, b: 10) { (left: Int, right: Int) -> Int in
    result left + right
}

// !! 반환 타입 생략
// 컴파일러가 반환 타입을 명확히 알 수 있을 경우 생략
// in 키워드는 생략할 수 없다.
result = calculate(a: 10, b: 10, method: { (left: Int, right: Int) in
    return left + right
})

// 후행 클로저와 함께 사용
result = calculate(a: 10, b: 10) { (left: Int, right: Int) in
    return left + right
}

// !! 단축 인자 이름
// 클로저의 인자 이름이 불필요하다면 단축 인자 이름을 이용할 수 있다.
// in도 생략
// 순서대로  $0, $1 ... 처럼 표현한다.
result = calculate(a: 10, b: 10, method: {
    return $0 + $1
})

// 후행 클로저와 함께 사용
result = calculate(a: 10, b:10) {
    result $0 + $1
}

// !! 암시적 반환 표현
// 클로저가 반환하는 값이 있다면 마지막 줄의 결과값은 암시적으로 반환값으로 취급
result = calculate(a: 10, b: 10) {
    $0 + $1
}

// 한 줄로 표현
result = calculate(a: 10, b: 10) { $0 + $1 }
```

## Property
* 저장 프로퍼티
* 연산 프로퍼티
* 인스턴스 프로퍼티
* 타입 프로퍼티

* 프로퍼티는 구조체, 클래스, 열거형 내부에 구현 가능
* 열거형 내부에는 연산 프로퍼티만 구현 가능
* 연산 프로펕티는 var로만 선언

## 프로퍼티 감시자 Property observer
* 프로퍼티 값이 변경될 때 원하는 동작을 수행

## 상속
* 클래스, 프로토콜 등에서 상속 가능
* 열거형 구조체는 상속 불가
* 다중상속 x

## 인스턴스 생성과 소멸
* init
* deinit

* swift의 모든 인스턴스는 초기화와 동시에 모든 프로퍼티에 유효한 값이 할당되어 있어야 한다.
* 미리 기본값을 할당해두면 인스턴스가 생성되는 것과 동시에 초기값을 갖게 된다.

