# 자바스크립트 프로토타입

[[Javascript] 프로토타입 이해하기](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)

위 블로그의 내용을 그대로 요약만 했다.

~~자바스크립트에는 클래스가 없다.~~(생겼다.)
함수와 new를 통해 클래스를 흉내낼 수 있다.

```js
function Car() {
  this.wheels = 4;
  this.seats = 2;
}

var porsche = new Car();
var ferrari = new Car();

console.log(porsche.wheels);
console.log(porsche.seats);

console.log(ferrari.wheels);
console.log(ferrari.seats);
```

new를 할 때마다 wheels, seats의 메모리가 할당된다.

이런 문제를 프로토타입으로 해결할 수 있다.

```js
function Car() {}

Car.prototype.wheels = 4;
Car.prototype.seats = 1;
```

Car.prototype이라는 빈 Object가 어딘가에 존재하고
Car 함수로부터 생성된 객체들은 Object에 들어있는 값을 모두 사용할 수 있다.
즉, wheels와 seats를 어딘가에 넣어두고 porsche, ferrari가 공유해서 사용한다.

왜? 이렇게 사용할까?

## Prototype Link와 Prototype Object

### Prototype Object

~~객체는 언제나 함수로 생성된다.~~(class도 가능?)

```js
function Car() {};

var carObject = new Car();  // 함수로 객체 생성
```

일반적인 객체 생성도 똑같다.

```js
var obj = {};
```

이 코드는 다음의 코드와 동일하다.

```js
var obj = new Object();
```

Object도 자바스크립트에서 기본적으로 제공하는 함수다.
Chrome console에서 Object를 입력하면 다음과 같이 출력된다.

```console
Object
ƒ Object() { [native code] }
```

함수가 정의될 때는 2가지 일이 동시에 이루어진다.

**1.해당 함수에 Constructor 자격 부여**

Constructor 자격이 부여되면 new를 통해 객체를 만들어 낼 수 있다.

**2.해당 함수의 Prototype Object 생성 및 연결**

![Prototype Object 생성 및 연결](https://drive.google.com/uc?export=view&id=1s5nEv7afUtNgr48IfKYUQtYFp1fVfvH6)

함수를 정의하면 함수만 생성되는 것이 아니라 Prototype Object도 같이 생성된다.
생성된 함수는 protytype이라는 속성을 통해 Prototype Object에 접근 할 수 있다.
Prototype Object는 일반적인 객체와 동일하면서 기본적인 속성으로 constructor와 __proto___를 가지고 있다.
constructor는 Prototype Object와 같이 생성된 함수를 가리킨다.
__proto__는 Prototype Link다.

Prototype Object는 일반적인 객체다.
property를 추가, 삭제 할 수 있다.

### Prototype Link

ferrari는 다음과 같이 출력된다.

![Object.proto](https://drive.google.com/uc?export=view&id=1q9MFq4EVH3hutUgEEbQ7ZURn5rRa3XAI)

ferrari에는 wheels이라는 속성이 없다.
ferrari.__proto__에 wheels이라는 속성이 있다.
prototype이라는 속성은 함수만 가지고 있지만 __proto__는 모든 객체가 가지고 있다.
__proto__는 객체가 생성될 때 조상이었던 함수의 Prototype Object를 가리킨다.
ferrari 객체는 Car 함수로부터 생성되었기 때문에 Car 함수의 Prototype Object를 가리킨다.

![object new](https://drive.google.com/uc?export=view&id=1qQDvZuecaQ-wY1GBmx75nDC69UCvsUeK)

ferrari 객체가 wheels를 직접 가지고 있지 않기 때문에 wheels를 찾을 때까지 상위 프로토타입을 탐색한다.
최상위인 Object의 Prototype Object까지 도달했는데도 못찾았을 경우 undefined를 리턴한다.
__proto__속성을 통해 상위 프로토타입과 연결되어 있는 것을 프로토타입 체인이라고 한다.
