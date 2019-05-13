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
