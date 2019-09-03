# Prototypal-Inheritance

프로토타입 패턴 상속

프로토타입 패턴 상속은 `Object.create()`를 이용한다.

## 1. 생성자 함수일 경우

```js
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayHi = function () {
  console.log('Hi! ' + this.name);
};

var child = Object.create(Parent.prototype);
child.name = 'child!!';
child.sayHi();  // Hi! child

console.log(child instanceof Parent);  // true
```

생성자 함수일 경우 Object.create 인자는 프로토타입이어야 한다.

## 2. 객체 리터럴의 경우

```js
var parent = {
  name: 'parent',
  sayHi: function() {
    console.log('Hi! ' + this.name);
  }
};

var child = Object.create(parent);
child.name = 'child';

parent.sayHi(); // Hi! parent
child.sayHi();  // Hi! child

console.log(parent.isPrototypeOf(child)); // true
```

객체 리터럴의 경우 Object.create의 인자는 object다.
