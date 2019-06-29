# Instantiation Patterns

## 1. Functional

```js
const Car = function() {
  var someInstance = {};
  someInstance.position = 0;
  someInstance.move = function() {
    this.position += 1;
  }
  return someInstance;
};

var car1 = Car();
var car2 = Car();
car1.move();
console.log(car1);
```

Car라는 함수 안에 객체를 생성.
객체에 move라는 메서드를 추가.

## 2. Functional Shared

```js
var extend = function(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
};

const someMethods = {};
someMethods.move = function() {
  this.position += 1;
};

const Car = function(position) {
  var someInstance = {
    position: position,
  };
  
  return someInstance;
};

var car1 = Car(5);
var car2 = Car(10);
console.log(car1);
```

Car라는 함수를 만들었다.
내ㅡ