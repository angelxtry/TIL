# 2019-05-17 Function method

## bind

call, apply와 다르게, 함수를 바로 실행하지 않고, this 값이 바인딩된 함수를 리턴한다.

```js
function add(x, y) {
  this.val = x + y;
  console.log(this.val);
}
const obj = { val: 0 };
const boundFn = add.bind(obj, 3, 5);
boundFn();
```

add.bind는 obj, 3, 5가 전달된 add 함수를 리턴한다.
bondFn()에서 함수가 실행된다.

```js
function Car(brand, name, color) {
  this.brand = brand;
  this.name = name;
  this.color = color;
}
Car.prototype.drive = function() {
  console.log(this.name + ' drive!');
}

let avante = new Car('hyundai', 'avante', 'red');
avante.drive();
```

```js
class Car {
  constructor(brand, name, color) {
    this.brand = brand;
    this.name = name;
    this.color = color;
  }
  drive() {
  console.log(this.name + ' drive!');
  }
}

const avante = new Car('hyundai', 'avante', 'red');
avante.drive();
```

```js
const arr = [1, 2, 3, 4, 5];
```

Math.min()을 이용하여 최소값 구하기

```js
const minimum = Math.min.apply(null, arr);
```

## bind case: 특정 함수가 this를 바꾸는 경우

```js
class Box {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
  printArea() {
    console.log(this.getArea());
  }
}
const smallBox = new Box(10, 20);
smallBox.printArea();
setTimeout(smallBox.printArea, 1000);  // TypeError: this.getArea is not a function
setTimeout(smallBox.printArea.bind(smallBox), 1000);
```

setTimeout은 인자로 넘기는 함수의 this는 기본적으로 window 객체가 바인딩된다.

## bind case: currying

```js
function template(name, money) {
  return '<h1>' + name + '</h1><span>' + money + '</span>';
}
const templateA = template.bind(null, 'A');
templateA(1000);
```
