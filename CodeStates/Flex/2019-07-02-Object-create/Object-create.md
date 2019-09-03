# Object.create()

`Object.create(proto[, propertiesObject])`

```js
function Vehicle(name) {
  this.name = name;
}
Vehicle.prototype.move = function () {
  console.log(`${ this.name } moved.`);
};

function Car(name, color) {
  // 상위 클래스 생성자 호출
  Vehicle.call(this, name);

  // 하위 클래스의 속성 지정
  this.color = color;
}
```

Vehicle이 superclass, Car가 subclass다.

call을 이용하여 subclass에서 superclass의 생성자를 호출했다.

첫 번째 인자로 this를 전달한다.

call 대신 apply 같은 함수를 이용할 수도 있다.

이 코드로 상속을 테스트해보자.

```js
var tico = new Car('tico', 'red');
```

Car의 instance를 생성했다.

tico를 console에 출력해보면 다음과 같다.

![tico object](https://drive.google.com/uc?export=view&id=1y95yva5V5tJEyfMU6JQ0wkUA14kZLrHe)

move 함수가 보이지 않는다.

```js
Car.prototype = Object.create(Vehicle.prototype)
Car.prototype.constructor = Vehicle;
```

Object.create를 사용하여 Car.prototype에 Vehicle.prototype을 할당(?)한다.

다시 상속을 테스트해보자.

```js
var k3 = new Car('k3', 'grey');
```

다시 k3를 출력해보면 다음과 같다.

![k3 object](https://drive.google.com/uc?export=view&id=1CRoAa3ZzKO4B2craOI1muok-QY6Ae45_)

## new vs. Object.create()

```js
function Car(name, color) {
  this.name = name;
  this.color = color;
  console.log(`${name}'s color: ${color}`);
}
Car.prototype.move = function() {
  console.log('move move!');
}

var carnival = new Car('carnival', 'white');
var musso = Object.create(Car.prototype);
```

carnival을 new, musso는 Object.create로 생성

```js
console.log(carnival.move());
// move move!
console.log(musso.move());
// move move!
```

```js
console.log(carnival.color);
// white
console.log(musso.color);
// undefined
```

carnival과 musso를 출력해보았다.

![new vs Object-create](https://drive.google.com/uc?export=view&id=1XjIWOKYiRANupZ-zn-uPVVnB9hE-7fft)

https://drive.google.com/open?id=1XjIWOKYiRANupZ-zn-uPVVnB9hE-7fft

new로 생성한 함수의 객체는 프로퍼티와 메서드를 모두 가진다.

Object.create()를 이용하여 만든 것은 프로터피는 확인 불가능하고 메서드만 사용할 수 있다.
