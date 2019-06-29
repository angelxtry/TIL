# new operator

여러 곳에서 수집한 내용을 짜집기 한 것임을 미리 밝힌다.

[링크1](https://poiemaweb.com/fastcampus/constructor)

함수를 new 연산자와 함께 호출하면 생성자 함수로 동작한다.
생성자 함수는 instance를 생성하는 함수다. 일반 함수와 동일하게 생겼다.

```js
function foo() {
  console.log(this);
}

foo();

const obj = { foo };
obj.foo();

const instance = new foo();
const f = foo;
const v = foo();
```

foo라는 함수를 선언했다.
이 함수를 실행하면 this는 Window가 된다.

```js
const obj = { foo };
```

ES6의 프로퍼티 축약 표현으로 foo는 obj의 메서드로 동작한다.
obj.foo()를 실행하면 this는 obj가 된다.

```js
const instance = new foo();
const f = foo;
const v = foo();
```

첫 번째 라인은 foo라는 instance가 생성된다.
두 번째 라인은 f가 foo 함수가 된다.
세 번째 라인은 foo 함수의 리턴 값이 없으므로 undefined가 된다.

다시 말해 new라는 키워드가 없이 함수를 호출하면 생성자 함수가 아니라 일반 함수로 동작한다.

## 내부 메서드 `[[Call]]`, `[[Constructor]]`

함수는 함수로 호출할 수도 있고 생성자 함수로 호출할 수도 있다.

```js
function foo() {}

foo.prop = 10;

foo.method = function() {
  console.log(this.prop);
};

foo.method();
```

위 코드 처럼 함수에 property와 method를 추가할 수 있다.

내부 메서드 `[[Call]]`이 구현되어 있는 객체를 callable
`[[Constructor]]`가 구현되어 있는 객체를 constructor
`[[Constructor]]`가 구현되어 있지 않는 객체를 non-constructor라고 부른다.

constructor는 생성자 함수로 호출할 수 있는 객체를 의미한다.
생성자 함수로 호출할 수 있다는 것은 new (또는 super) 연산자와 함께 호출할 수 있다는 것을 의미한다.

함수가 일반적임 함수로서 호출되면 함수 객체의 내부 메서드 `[[Call]]`이 호출되고
new(or super)와 함께 생성자 함수로 호출되면 내부 메서드 `[[Constructor]]`가 호출된다.

모든 함수는 callable하다. 즉 `[[Call]]`이 구현되어 있다.
하지만 모든 함수 객체가 `[[Constructor]]`를 구현하지는 않는다.

non-constructor인 함수 객체를 생성자 함수로서 호출하면 에러가 발생한다.

생성자 함수로 호출될 것을 기대하고 정의하지 않은 함수에 new 연산자를 붙여 호출하면 생성자 함수처럼 동작할 수 있으니 주의할 것.

생성자 함수는 첫문자를 대문자로 기술하여 일반 함수와 구별할 수 있도록 한다.
