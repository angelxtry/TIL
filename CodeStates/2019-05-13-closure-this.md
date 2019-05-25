# 2019-05-13 closure

```js
const outerFn = _ => {
  const outerVar = 'outer';
  console.log(outerVar);
  const innerFn = _ => {
    const innerVar = 'inner';
    console.log(innerVar);
  }
  return innerFn;
}

outerFn()();  // 출력값은?
const innerFn = outerFn();  // 출력값은?
innerFn();  // 출력값은?
```

## this

### Excution context

어떤 함수가 호출되면 실행 컨텍스트, excution context가 생성된다.
  call stack에 push
  함수를 벗어나면 call stack에서 pop
scope 별로 생성
여기에 담긴 것
  scope 내의 변수 및 함수
  전달인자(arguments)
  호출된 근원(caller)
  this

### this keyword

모든 함수 context에서 자동으로 생성되는 특수한 식별자
excution context의 구성 요소 중 하나로, 함수가 실행되는 동안 이용할 수 있다.

### 5 patterns of binding this

1 Global reference
2 Free function invocation
3 .call or .apply invocation
4 Construction mode
5 Method invocation

```js
var name = 'Global Variable';
console.log(this.name);

function foo() {
  console.log(this.name);
}
```

여기서 this는 window

1 Global & Function invocation에서 this는 window다.

```js
const adder = x => y => {
  console.log(this);
  return x + y;
};
```

this는 window다.

3 Method 호출 시 this는 부모 object

```js
const obj = {
  func: _ => this
}

obj.func() === window;
```

화살표 함수일 경우는 다르다.

```js
const obj2 = {
  func: function() {
    return this;
  }
}

obj2.func() === obj2;
```

```js
const obj = {
  func: function() {
    return this;
  }
}

const obj2 = {
  func: obj.func
}

console.log(obj.func() === obj);
console.log(obj2.func() === obj2)
```

method invocation 일 때는 실행 시점에서 object를 찾는다.

```js
const obj = {
  key1: {
    key2: function() {
      return this;
    }
  }
}

console.log(obj.key1.key2() === obj.key1);
```

1, 2번의 결과가 window인 것도 같은 이유다.

4 Construction mode
  new 연산자로 생성된 function 영역의 this
  -> 새로 생성된 객체

```js
class Car {
  constructor (brand, name) {
    this.brand = brand;
    this.name = name;
  }
};
const avante = new Car('Hyundai', 'avante');
```

5 .call, .apply​ 호출
  call, apply의 첫 번째 인자로 명시된 객체

```js
function identify() {
  return this.name.toUpperCase();
}
function speak() {
  const greeting = "Hello, " + identify.call(this);
  console.log(greeting);
}
const me = {
  name: 'lee'
}
identify.call(me);
speak.call(me);
```

```js
function printThis() {
  console.log(this);
}
printThis();
printThis('abcd');
printThis.call('abcd');
```

```js
const add = function ( x, y ) {
  this.val = x + y;
}
const obj = {
  val: 0
};

add.apply(obj, [3, 5]);
add.call(obj, 3, 5);
```

apply는 배열을 전달한다.

```js
function timeToGoHome(speed, distance) {
  this.time = distance / speed;
}
const obj = {};
timeToGoHome.call(obj, speed, distance);
timeToGoHome.apply(obj, [speed, distance]);
```

```js
function timeToGoHome(speed, distance) {
  return distance / speed;
}
timeToGoHome.call(null, 2, 10);
```

.call을 호출할 때 첫 번째 인자에 아무것도 쓰지 않으면 NaN이 된다.
null이 아니라 아무거나 넣어도 상관없다.

이것은 다음과 같이 활용할 수 있다.

```js
Math.max(1, 2, 3, 4, 5);
const data = [1, 2, 3, 4, 5];
Math.max.apply(null, data);
```