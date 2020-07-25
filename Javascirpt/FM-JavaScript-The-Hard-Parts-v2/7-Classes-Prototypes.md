# 7 Prototype and Class

JavaScript의 prototype에 대한 개념을 다시 한번 정리해보자.

데이터와 함수를 각각 나열하는 것은 관리하기 힘들다.

어떻게 관리하는 것이 좋을까?

## object

1차 개선 - object

object에 데이터와 함수를 담는다.

```js
const user1 = {
  name: 'Tim',
  score: 3,
  increase: function () {
    user1.score += 1;
  }
};
```

user2를 만들려면? 모든 데이터와 함수를 다시 할당해야 한다.

```js
const user2 = {};
user2.name = "Jane";
user2.score = 6;
user2.increase = function() {
  user2.score += 1;
}
```

## factory function

DRY!

factory function을 만든다.

```js
function userCreator(name, score) {
  const newUser = {};
  newUser.name = name;
  newUser.score = score;
  newUser.increase = function () {
    newUser.score += 1;
  };
  return newUser;
}

const user1 = userCreator('Tim', 3);
const user2 = userCreator('Jane', 6);
```

userCreator() 함수가 실행되면 excution context가 생성되고, 해당 context에서 object가 생성되어 user1에 할당된다.

user2도 동일한 과정을 거친다.

user1, user2의 데이터는 각각 유지되어야 한다. 하지만 increase 함수는 user가 추가될 때마다 동일한 기능을 하는 함수가 생성되어 메모리에 저장되기 때문에 메모리가 낭비된다.

## prototype chain

```js
const userFunctionStore = {
  increment: function () {
    this.score += 1;
  },
  login: function() {
    console.log("Logged in.");
  }
};

function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const user1 = userCreator('Tim', 3);
const user2 = userCreator('Alice', 6);
```

userFunctionStore라는 object를 선언했다.

userCreator 함수에서 Object.create를 이용하여 newUser를 생성할 때 Object.create의 인자로 userFunctionStore를 전달한다.

browser에서 user1을 출력해보면 name, score외에 `__proto__`에서 increment, login 함수를 확인할 수 있다.

user2도 동일하다.

userFunctionStore는 global memory에 한 번만 저장된다. 그리고 user1과 user2가 해당 object를 같이 사용한다.

`__proto__` 숨겨진 property다. 특정 object를 가리키는 link처럼 동작한다.

user1.increment()를 실행했을 때 user의 property에 increment()가 없다면 `__proto__`에 연결된 object를 찾아 increment()가 존재하는지 확인한다.

userFunctionStore object도 `__proto__`를 가지고 있다. userFunctionStore의 `__proto__`는 Object prototype이다.

```js
console.log(user1.hasOwnProperty('score'));
console.log(user1.hasOwnProperty('increment'));
console.log(user1.hasOwnProperty('login'));
```

위와 같은 코드를 실행했을 때 결과는 true, false, false다.

`hasOwnProperty`는 prototype chain은 확인하지 않는다. 순수하게 해당 object에 포함된 property만을 확인한다.

`hasOwnProperty` 함수는 user1에도 userFunctionStore에도 정의되어 있지 않지만, Object prototype에 정의되어 있기 때문에 실행된다.

## this keyword

this에 대해 다시 한번 살펴보자.

```js
const userFunctionStore = {
  increment: function () {
    this.score += 1;
    console.log(this);
  },
  login: function () {
    console.log('Logged in.');
  },
};

function userCreator(name, score) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const user1 = userCreator('Tim', 3);
user1.increment();
console.log(user1);
```

이 코드를 실행하면 user1의 score는 4가 된다.

그리고 userFunctionStore에서 출력한 this는 user1을 가리킨다.

```js
const userFunctionStore2 = {
  increment: function () {
    function add() {
      this.score += 1;
      console.log(this);
    }
    add();
  },
};

function userCreator2(name, score) {
  const newUser = Object.create(userFunctionStore2);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const user2 = userCreator2('Alice', 6);
user2.increment();
console.log(user2);
```

이 코드를 실행하면 user2의 score는 그대로 6이다.

userFunctionStore2에서 출력한 this는 window가 된다.

이런 경우 userFunctionStore2에서 this가 user1을 가리키게 하기 위해 다음과 같은 방법을 사용하기도 한다.

```js
const userFunctionStore2 = {
  increment: function () {
    const that = this;
    function add() {
      that.score += 1;
      console.log('this: ', this);
      console.log('that: ', that);
    }
    add();
  },
};

function userCreator2(name, score) {
  const newUser = Object.create(userFunctionStore2);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const user2 = userCreator2('Alice', 6);
user2.increment();
console.log(user2);
```

이때 this는 window, that은 user2가 된다.

또는 다음과 같이 call 함수를 사용해도 가능하다.

```js
const userFunctionStore2 = {
  increment: function () {
    function add() {
      this.score += 1;
    }
    add.call(this);
  },
};

console.log('userFunctionStore2: ', userFunctionStore2.increment());

function userCreator2(name, score) {
  const newUser = Object.create(userFunctionStore2);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const user2 = userCreator2('Alice', 6);
user2.increment();
console.log(user2);
```

add를 arrow function으로 변경하면 어떨까?

```js
const userFunctionStore2 = {
  increment: function () {
    const add = () => {
      this.score += 1;
    };
    add();
  },
};

function userCreator2(name, score) {
  const newUser = Object.create(userFunctionStore2);
  newUser.name = name;
  newUser.score = score;
  return newUser;
}

const user2 = userCreator2('Alice', 6);
user2.increment();
console.log(user2);
```

arrow function에서 this는 user2가 된다.

arrow function이 object 밖에서 단독으로 선언되었다면 this는 window가 된다.

## new

new를 사용하면 다음과 같이 작성할 수 있다.

```js
function userCreator(name, score) {
  this.name = name;
  this.score = score;
}

userCreator.prototype.increment = function () {
  this.score += 1;
};

const user = new userCreator('Alice', 6);
user.increment();
console.log(user);
```

userCreator 함수를 선언하면 함수가 생성되는 것과 동시에 object가 생성된다.

해당 object는 userCreator.prototype을 확인해보면 알 수 있다.

그래서 increment라는 함수를 userCreator.protype의 property로 추가할 수 있다.

`new userCreator`를 실행하면 먼저 execution context가 생성되고 this라는 이름을 가진 empty object가 생성된다.

이 object의 `__proto__`는 userCreator.prototype을 가리킨다.

그리고 argument로 전달받은 값들이 object의 property로 전달된다.

마지막으로 object가 리턴되어 user에 대입된다.

## class

class를 사용하면 다음과 같이 작성할 수 있다.

```js
class userCreator {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  increment() {
    this.score += 1;
  }
}

const user = new userCreator('Alice', 6);
user.increment();
```

class가 function의 단순 문법 설탕은 아니라고 알고 있지만 거기까지 설명하기는 어려워 여기서 마무리한다.
