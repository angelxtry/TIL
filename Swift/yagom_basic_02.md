## 조건문

### if-else
* 조건의 소괄호는 생략가능
* 중괄호는 생략 불가
* 조건에는 항상 Bool 타입만

### switch
* 범위 연산자 사용 가능
* 정수 타입외에도 대부분의 기본 타입을 사용할 수 있다.
* 명시적으로 break를 사용하지 않아도 무조건 break가 적용
* 하나의 case의 끝에 fallthrough라고 적으면 다음 조건까지
```
switch someInteger {
case 0:
    print("zero")
case 1..<100:
    print("1~99")
case 100:
    print("100")
case 101...Int.max: // ...은 조건 포함
    print("over 100")
default:
    print("unknown")
}
```

## 반복문

```
var integers = [1, 2, 3]
let people = ["yagom": 10, "eric": 15, "mike": 12]

for integer in integers {
    print(integer)
}

// Dictionary의 item은 key, value로 구성된 튜플 타입
for (name, age) in people {
    print("\(name): \(age)")
}

// while의 조건도 반드시 Bool 타입
while integers.count > 1 {
    integers.removeLast()
}

// do while과 유사
repeat {
    integers.removeLast()
} while integers.count > 0
```

## 옵셔널
* 값이 있을 수도 있고 없을 수도 있다.
* 왜 필요한가?
    * nil의 가능성을 문서화 하지 않아도 코드만으로 명시적으로 표현가능
    * 전달받은 값이 옵셔널이 아니라면 nil체크를 하지 않고 안심하고 사용할 수 있다.

```
func someFunc(someOptionalParam: Int?){

}

someFunc(someOptionalParam: nil) // error 발생하지 않음
```

* Optional = enum + general

* Optional의 선언
```
let optionalValue: Optional<Int> = nil // 정식표현
let optionalValue: Int? = nil // 축약표현
```

* ! -> 암시적 추출 옵셔널(Implicitly Unwrapped Optional)
```
var optionalValue: Int! = 100
optionalValue = optionalValue + 1 // accept
optionalValue = nil // accept
optionalValue = optionalValue + 1 // error

var optionalValue: Int? = 100
optionalValue = optionalValue + 1 // error
```

* 일반적인 Optional 타입은 어떻게 사용할 수 있는가?

## 옵셔널 값 추출(Optional Unwrapping)
* 1. Optional Binding(옵셔널 바인딩)
* 2. Force Unwrapping - 강제 추출

* Optional Binding
    * 옵셔널의 값을 꺼내오는 방법 중 하나
    * nil 체크 + 안전한 값 추출
```
var myName: String? = "yagom" // String 타입과 String Optional 타입은 전혀 다른 타입이다.
var yourName: String? = nil

// if-let 구문에서 사용한 변수는 이 구문에서만 유효하다.
// 한 개 이상을 동시에 바인딩 할 수 있다.
// 모두 nil이 아니어야만 실행된다.
if let name = myName, let firend = yourName {
    print("\(name) and \(firend)")
}

yourName = "hana"
if let name = myName, let firend = yourName {
    print("\(name) and \(firend)")
}
```

* 강제 추출
```
func printName(_ name: String) {
    print(name)
}

var myName: String? = "yagom"
printName(myName!) // 옵셔널 강제 추출
// printName의 인자가 String임에도 불구하고 값을 전달할 수 있다.

myName = nil

print(myName!) // 강제추출시 값이 없으므로 런타임 오류 발생

// 암시적 추출 옵셔널은 선언할때 부터 강제추출을 가정
var yourName: String! = nil
printName(yourName) // 컴파일 타임에는 오류가 발생하지 않음
// nil 값이 전달되기 때문에 런타임 오류 발생
```

## 구조체
```
struct Sample {
    var mutableProperty: Int = 100 // 가변 프로퍼티
    let immutableProperty: Int = 100 // 불변 프로퍼티

    static var typeProperty: Int = 100 // 타입 프로퍼티

    func instanceMethod() {
        print("instance method")
    }

    static func typeMethod() {
        print("type method")
    }
}

var mutable: Sample = Sample()
mutable.mutableProperty = 200 \\ ok
mutable.ImmutableProperty = 200 \\ error

let immutable: Sample = Sample()
// 이 경우 값 변경이 불가능
```

