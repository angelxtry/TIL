# summary

- l1: 1, 2

- 현실의 프로그램만큼 충분히 복잡한 다음과 같은 코드가 있다.

```js
const add10 = a => Promise.resolve(a + 10);
const add5 = a => a + 5;
const sub5 = a => a - 5;
const sub10 = a => Promise.resolve(a - 10);
```

- 이 코드를 순차적으로 한 번에 실행하는 것이 원하는 코드다.

- 일단 함수를 하나 만들어서 실행해보자.

```js
const f1 = a => {
  let b = a;
  b = add10(b);
  b = add5(b);
  b = sub5(b);
  b = sub10(b);
  return b;
}

log(f1(10));
```

- 비동기 함수가 섞여있기 때문에 실행조차 제대로 되지 않는다.

- async, await 키워드를 이용한다.

```js
async function f1(a) {
  let b = a;
  b = await add10(b);
  b = add5(b);
  b = sub5(b);
  b = await sub10(b);
  return b;
}

log(f1(10));
```

- 결과는 Promise
- Promise의 결과를 출력하려면 다음과 같이 작성한다.

```js
f1(10).then(log);
```

- Promise와 값을 동시에 처리할 수 있는 log를 만들면 다음과 같다.

```js
const log = a => a instanceof Promise ? a.then(console.log) : console.log(a);
```

- f1 함수를 좀 더 함수형 프로그램에 맞게 고쳐보자.
- 이럴 때 사용하는 것이 go다.
- go는 값에서 시작해서 함수를 연속하여 실행할 수 있는 함수다.

```js
const go = (a, ...fs) => {
  let b = a;
  const iter = fs[Symbol.iterator]();
  return function recur(b) {
    for (const f of iter) {
      b = f(a);
      if (b instanceof Promise) return b.then(recur);
      return b;
    }
  } (b);
  return b;
}
```

- go 함수를 이용하여 f1을 표현하면 다음과 같다.

```js
go(10, add10, add5, sub5, sub10, log);
```

- go를 함수 합성을 이용하여 좀 더 간단하게 만들어보자.
- 기본 map, reduce를 이용한다.

- 비동기와 동기를 한 번에 처리할 수 있는 다형성이 높은 함수가 필요하다.

```js
const then = f => a => a instanceof Promise ? a.then(f) : f(a);
const callR = (b, f) => f(b);
const go = (a, ...fs) => fs.map(then).reduce((callR, a);
```

- 간단하게 만들어진 go는 이전 go와 동일하게 동작한다.
