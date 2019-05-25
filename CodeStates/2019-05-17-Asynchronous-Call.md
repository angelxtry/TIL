# 2019-05-17 Asynchronous Call

## 목표

비동기 호출의 code 패턴을 작성할 수 있다
setTimeout 등의 비동기 호출 함수를 이용할 수 있다
(Advanced) JavaScript 엔진이 어떠한 형태로 비동기 호출을 하는지 그 원리를 이해할 수 있다

## callback

다른 코드의 인자로 넘겨주는 실행 가능한 코드
콜백을 넘겨받은 코드는 이 콜백을 필요에 따라 즉시 실행(synchronous)할 수도 있고, 나중에 실행(asynchronous)할 수도 있다.

```js
const excutableCode = _ => {

}
const otherCode = callback => {
  callback();
}
otherCode(excutableCode);
```

## callback in action

event handler

```js
document.querySelector('#btn').addEventListener('click', _ =>
  console.log('button clicked'); );
```

```js
const eitherOne = (f, g, x) =>
  (x % 2 === 0) ? f(x) : g(x);
const result = eitherOne(
  x => x + 5,
  x => x - 5,
  15
);
console.log(result);
```

## Event

event가 발생하고 handler가 실행될 때에, 두 가지 이상의 일이 동시에 진행된다.
JavaScript는 single thread, 하나의 call stack을 사용한다.
어떻게 동시성을 지원하는가?

콜백 함수를 보관하는 공간 task queue를 만들어두고
동기 작업이 모두 끝나 call stack이 비워지면
event loop에 의해 콜백이 실행된다.

## 타이머 관련 API

setTimeout(callback, millisecond)
일정 시간 후에 함수를 실행
arguments: 실행할 callback 함수
callback 함수 실행 전 기다려야 할 시간 (밀리초)
return value: 임의의 타이머 ID

```js
setTimeout( _ => console.log('1초 후 실행'), 1000);
```

setInterval(callback, millisecond)
일정 시간의 간격을 가지고 함수를 반복적으로 실행
arguments: 실행할 callback 함수
반복적으로 함수를 실행시키기 위한 시간 간격 (밀리초)
return value: 임의의 타이머 ID

```js
setInterval( _ => console.log('1초마다 실행'), 1000);
```

clearInterval(timerId)
반복 실행중인 타이머를 종료
arguments: 타이머 ID
return value: 없음

```js
const timer = setInterval( _ => console.log('1초마다 실행'), 1000);
clearInterval(timer);
// 더 이상 반복 실행되지 않음
```

setTimeout에 대응하는 clearTimeout도 있음

## ORDER OF EXECUTION

```js
console.log(1);
setTimeout(function() { console.log(2); }, 1000);
setTimeout(function() { console.log(3); }, 0);
console.log(4);
```
