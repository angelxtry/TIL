# useEffect 완벽 가이드 요약, 감상

## 순서

1 TLDR (Too Long; Didn’t Read - 요약)
2 모든 랜더링은 고유의 Prop과 State가 있다
3 모든 랜더링은 고유의 이벤트 핸들러를 가진다
4 모든 랜더링은 고유의 이펙트를 가진다
5 모든 랜더링은 고유의… 모든 것을 가지고 있다
6 흐름을 거슬러 올라가기
7 그러면 클린업(cleanup)은 뭐지?
8 라이프사이클이 아니라 동기화
9 리액트에게 이펙트를 비교하는 법을 가르치기
10 리액트에게 의존성으로 거짓말하지 마라
11 의존성으로 거짓말을 하면 생기는 일
12 의존성을 솔직하게 적는 두 가지 방법
13 이펙트가 자급자족 하도록 만들기
14 함수형 업데이트와 구글 닥스(Google Docs)
15 액션을 업데이트로부터 분리하기
16 왜 useReducer가 Hooks의 치트 모드인가
17 함수를 이펙트 안으로 옮기기
18 하지만 저는 이 함수를 이펙트 안에 넣을 수 없어요
19 함수도 데이터 흐름의 일부인가?
20 경쟁 상태에 대해
21 진입 장벽을 더 높이기
22 마치며

## 읽고 요약 진행 방법

25분동안 6개를 읽고 요약

25 * 4 = 100분 예상

다 읽고 나면 링크에 걸린 글들을 읽어보자.

## 목적

useEffect를 잘 알게되는 것. - 모호하다.

이번 프로젝트에 사용한 useEffect를 좀 더 나은 코드로 만드는 것. - 그래도 모호하다.

더 구체적인 목적은 잘 모르겠다.

## 시작

### 1 TLDR (Too Long; Didn’t Read - 요약)

```js
useEffect 로 componentDidMount 동작을 흉내내려면 어떻게 하지?
useEffect 안에서 데이터 페칭(Data fetching)은 어떻게 해야할까? 두번째 인자로 오는 배열([]) 은 뭐지?
이펙트를 일으키는 의존성 배열에 함수를 명시해도 되는걸까?
왜 가끔씩 데이터 페칭이 무한루프에 빠지는걸까?
왜 가끔씩 이펙트 안에서 이전 state나 prop 값을 참조할까?
```

useEffect를 사용해봤던 사람은 누구나 고민하는 것들 ㅋㅋㅋ

나도 요즘 고민이다!

```js
이 완벽 가이드를 통해 위의 질문에 명백하게 답해 드리겠습니다.
```

오우예~

```js
제가 useEffect 훅을 클래스 컴포넌트의 라이프사이클이라는 익숙한 프리즘을 통해 바라보는 것을 그만두자 모든 것이 명백하게 다가왔습니다.
```

그동안 나 잘못알고있었음? 설명도 잘못했던거임?

```js
 [] 는 이펙트에 리액트 데이터 흐름에 관여하는 어떠한 값도 사용하지 않겠다는 뜻입니다. 그래서 한 번 적용되어도 안전하다는 뜻이기도 합니다. 이 빈 배열은 실제로 값이 사용되어야 할 때 버그를 일으키는 주된 원인 중 하나입니다. 잘못된 방식으로 의존성 체크를 생략하는 것 보다 의존성을 필요로 하는 상황을 제거하는 몇 가지 전략을(주로 useReducer, useCallback) 익혀야 할 필요가 있습니다.
```

`리엑트 데이터 흐름에 관여하는 어떤한 값도 사용하지 않겠다는 뜻입니다.`

아. 그렇구나.

```js
추천하는 방법은 prop이나 state를 반드시 요구하지 않는 함수는 컴포넌트 바깥에 선언해서 호이스팅하고, 이펙트 안에서만 사용되는 함수는 이펙트 함수 내부에 선언하는 겁니다. 그러고 나서 만약에 랜더 범위 안에 있는 함수를 이펙트가 사용하고 있다면 (prop으로 내려오는 함수 포함해서), 구현부를 useCallback 으로 감싸세요.
```

이펙트 안에서만 사용되는 함수는 이펙트 함수 내부에 선언!

랜더 범위 안에 있는 함수를 이펙트가 사용하고 있다면 useCallback으로 감쌀 것!

### 2 모든 랜더링은 고유의 Prop과 State가 있다

```js
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

버튼을 클릭하면 state가 변경되고, state가 변경되면 react는 컴포넌트(Counter(?))를 호출한다.

컴포넌트가 호출되면 count의 값이 변경되는 것이 아니라 각각의 렌더링마다 격리된 고유의 count 값을 보는 것이다.

### 3 모든 랜더링은 고유의 이벤트 핸들러를 가진다

```js
function Counter() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}
```

`Click me`를 클릭하여 숫자를 증가시킨 후 `Show alert` 버튼을 눌른다. 그리고 alert이 실행되기 전에 다시 `Click me`를 클릭하여 숫자를 증가시킨다.

alert에는 무엇이 출력될까?

alert 버튼을 클릭하는 시점의 count 값(state)을 잡아둔다.

`Click me`를 클릭할 때마다 다시 렌더링되고, 각각의 렌더링에서 count 값은 상수이자 독립된 값으로 존재한다.

```js
특정 랜더링 시 그 내부에서 props와 state는 영원히 같은 상태로 유지됩니다.
```

기억하자.

### 4 모든 랜더링은 고유의 이펙트를 가진다

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

```js
어떻게 이펙트가 최신의 count 상태를 읽어 들일까요?

이펙트 함수 자체가 매 랜더링마다 별도로 존재합니다.

각각의 이펙트 버전은 매번 랜더링에 “속한” count 값을 “봅니다”.
```

```js
리액트는 여러분이 제공한 이펙트 함수를 기억해 놨다가 DOM의 변화를 처리하고 브라우저가 스크린에 그리고 난 뒤 실행합니다.
```

우와. 리엑트는 이펙트 함수를 기억해 두었다가, DOM의 변화를 처리하고, 브라우저가 스크린에 그리고 난 뒤 실행한다.

아. 명확하다.

```js
리액트: state가 0 일 때의 UI를 보여줘.

컴포넌트:
  여기 랜더링 결과물로 <p>You clicked 0 times</p> 가 있어.
  그리고 모든 처리가 끝나고 이 이펙트를 실행하는 것을 잊지 마: () => { document.title = 'You clicked 0 times' }.

리액트: 좋아. UI를 업데이트 하겠어. 이봐 브라우저, 나 DOM에 뭘 좀 추가하려고 해.

브라우저: 좋아, 화면에 그려줄게.

리액트: 좋아 이제 컴포넌트 네가 준 이펙트를 실행할거야.
  () => { document.title = 'You clicked 0 times' } 를 실행하는 중.
```

마지막에 리엑트가 컴포넌트가 준 이펙트를 실행하면 DOM이 다시 그려지는걸까? 그렇겠지?

### 5 모든 랜더링은 고유의… 모든 것을 가지고 있다

### 6 흐름을 거슬러 올라가기

```js
props나 state를 컴포넌트 안에서 일찍 읽어 들였는지 아닌지는 상관 없습니다. 그 값들은 바뀌지 않을테니까요! 하나의 랜더링 스코프 안에서 props와 state는 변하지 않은 값으로 남아있습니다. (값들을 분해 할당하면 더 확실해집니다.)
```

```js
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);
  useEffect(() => {
    latestCount.current = count;
    setTimeout(() => {
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

이 코드가 어떻게 동작하는지 꼭 이해하자. 주석은 일부러 지웠다.

이렇게 작성하는 것이 좋은 코드는 아니라고 한다.

### 7 그러면 클린업(cleanup)은 뭐지?

```js
리액트는 브라우저가 페인트 하고 난 뒤에야 이펙트를 실행합니다. 이렇게 하여 대부분의 이펙트가 스크린 업데이트를 가로막지 않기 때문에 앱을 빠르게 만들어줍니다. 마찬가지로 이펙트의 클린업도 미뤄집니다. 이전 이펙트는 새 prop과 함께 리랜더링 되고 난 뒤에 클린업됩니다.
```

```js
컴포넌트가 랜더링 안에 있는 모든 함수는 (이벤트 핸들러, 이펙트, 타임아웃이나 그 안에서 호출되는 API 등) 랜더가 호출될 때 정의된 props와 state 값을 잡아둔다.

그러므로 이펙트의 클린업은 “최신” prop을 읽지 않습니다. 클린업이 정의된 시점의 랜더링에 있던 값을 읽는 것입니다.
```

### 8 라이프사이클이 아니라 동기화

### 9 리액트에게 이펙트를 비교하는 법을 가르치기

```js
그래서 특정한 이펙트가 불필요하게 다시 실행되는 것을 방지하고 싶다면 의존성 배열을(“deps” 라고 알려진 녀석이죠) useEffect 의 인자로 전달할 수 있는 것입니다.
```

```js
useEffect(() => {
  document.title = 'Hello, ' + name;
}, [name]); // 우리의 의존성
```

```js
이건 마치 우리가 리액트에게 “이봐, 네가 이 함수의 안을 볼 수 없는 것을 알고 있지만, 랜더링 스코프에서 name 외의 값은 쓰지 않는다고 약속할게.” 라고 말하는 것과 같습니다.

현재와 이전 이펙트 발동 시 이 값들이 같다면 동기화할 것은 없으니 리액트는 이펙트를 스킵할 수 있습니다.
```

오우. 설명 너무 좋다. 쏙쏙 들어온다.

### 10 리액트에게 의존성으로 거짓말하지 마라

```js
function SearchResults() {
  async function fetchData() {
    // ...
  }

  useEffect(() => {
    fetchData();
  }, []); // 이게 맞을까요? 항상 그렇진 않지요. 그리고 더 나은 방식으로 코드를 작성하는 방법이 있습니다.

  // ...
}
```

```js
“하지만 저는 마운트 될 때만 이펙트를 실행하고 싶다고요!” 라고 하실 수 있습니다. 일단 지금은 deps를 지정한다면, 컴포넌트에 있는 모든 값 중 그 이펙트에 사용될 값은 반드시 거기 있어야 한다는 것을 기억해 두세요. props, state, 함수들 등 컴포넌트 안에 있는 모든 것 말입니다.
```

네네. 잘못했습니다 ㅠ_ㅠ

### 11 의존성으로 거짓말을 하면 생기는 일

```js
이런 종류의 이슈는 해결책을 떠올리기 어렵습니다. 따라서 저는 여러분들께 언제나 이펙트에 의존성을 솔직하게 전부 명시하는 것을 중요한 규칙으로 받아들여야 한다고 권합니다. (저희는 여러분들의 팀이 이 규칙을 강제하길 원할 때 쓸 수 있는 린트 규칙을 제공합니다.)
```

### 12 의존성을 솔직하게 적는 두 가지 방법

```js
첫 번째 방법은 컴포넌트 안에 있으면서 이펙트에서 사용되는 모든 값이 의존성 배열 안에 포함되도록 고치는 것입니다.

두 번째 전략은 이펙트의 코드를 바꿔서 우리가 원하던 것 보다 자주 바뀌는 값을 요구하지 않도록 만드는 것입니다. 의존성에 대해 거짓말을 할 필요가 없습니다. 그냥 의존성을 더 적게 넘겨주도록 바꾸면 됩니다.
```

### 13 이펙트가 자급자족 하도록 만들기

```js
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(id);
}, [count]);
```

```js
저는 이런 경우를 “잘못된 의존관계” 라고 생각하는 것을 좋아합니다. 네, count 는 우리가 setCount(count + 1) 이라고 썼기 때문에 이펙트 안에서 필요한 의존성이었습니다. 하지만 진짜로 우리는 count 를 count + 1 로 변환하여 리액트에게 “돌려주기 위해” 원했을 뿐입니다. 하지만 리액트는 현재의 count 를 이미 알고 있습니다. 우리가 리액트에게 알려줘야 하는 것은 지금 값이 뭐든 간에 상태 값을 하나 더하라는 것입니다.

그게 정확히 setCount(c => c +1) 이 의도하는 것입니다. 리액트에게 상태가 어떻게 바뀌어야 하는지 “지침을 보내는 것” 이라고 생각할 수 있습니다. 이 “업데이터 형태” 또한 다른 케이스에서 사용할 수 있습니다. 예를 들어 여러 개의 업데이트를 묶어서 처리할 때처럼요.
```

```js
useEffect(() => {
  const id = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);
```

### 14 함수형 업데이트와 구글 닥스(Google Docs)

```js
오로지 필요한 최소한의 정보를 이펙트 안에서 컴포넌트로 전달하는게 최적화에 도움이 됩니다. setCount(c => c + 1) 같은 업데이터 형태는 setCount(count + 1) 보다 명백히 적은 정보를 전달합니다. 현재의 카운트 값에 “오염되지” 않기 때문입니다. 그저 행위(“증가”)를 표현할 뿐입니다. 리액트로 생각하기 문서에 최소한의 상태를 찾으라는 내용이 포함되어 있습니다. 그 문서에 쓰인 것과 같은 원칙이지만 업데이트에 해당된다고 생각하세요.
```

흠... `setCount(c => c + 1)` 같은 코드를 떠올리는 것이 쉬운일일까?

적용이 되지 않는 코드도 많을텐데?

```js
하지만 setCount(c => c + 1) 조차도 그리 좋은 방법은 아닙니다. 좀 이상해 보이기도 하고 할 수 있는 일이 굉장히 제한적입니다. 예를 들어 서로에게 의존하는 두 상태 값이 있거나 prop 기반으로 다음 상태를 계산할 필요가 있을 때는 도움이 되지 않습니다. 다행히도 setCount(c => c + 1) 은 더 강력한 자매 패턴이 있습니다. 바로 useReducer 입니다.
```

헉. 바로 설명을 해주시다니 ㅋㅋㅋㅋㅋㅋㅋ

### 15 액션을 업데이트로부터 분리하기

```js
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + step);
    }, 1000);
    return () => clearInterval(id);
  }, [step]);
  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => setStep(Number(e.target.value))} />
    </>
  );
}
```

```js
어떤 상태 변수가 다른 상태 변수의 현재 값에 연관되도록 설정하려고 한다면, 두 상태 변수 모두 useReducer 로 교체해야 할 수 있습니다.

setSomething(something => ...) 같은 코드를 작성하고 있다면, 대신 리듀서를 써보는 것을 고려하기 좋은 타이밍입니다. 리듀서는 컴포넌트에서 일어나는 “액션”의 표현과 그 반응으로 상태가 어떻게 업데이트되어야 할지를 분리합니다.

이펙트 안에서 step 의존성을 dispatch 로 바꾸어 보겠습니다.
```

```js
const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: 'tick' }); // setCount(c => c + step) 대신에
  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);
```

```js
리액트는 컴포넌트가 유지되는 한 dispatch 함수가 항상 같다는 것을 보장합니다. 따라서 위의 예제에서 인터벌을 다시 구독할 필요조차 없습니다.

이펙트 안에서 상태를 읽는 대신 무슨 일이 일어났는지 알려주는 정보를 인코딩하는 액션을 디스패치합니다. 이렇게 하여 이펙트는 step 상태로부터 분리되어 있게 됩니다. 이펙트는 어떻게 상태를 업데이트 할지 신경쓰지 않고, 단지 무슨 일이 일어났는지 알려줍니다. 그리고 리듀서가 업데이트 로직을 모아둡니다.
```

```js
const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  const { count, step } = state;
  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
}
```

허허. 타이머를 구현하려고 여기저기서 긁어모았던 코드가 여기에 다 있었네.

### 16 왜 useReducer가 Hooks의 치트 모드인가

### 17 함수를 이펙트 안으로 옮기기

```js
eslint-plugin-react-hooks 플러그인의 exhaustive-deps 린트 룰 덕분에, 에디터에서 코드를 작성하면서 이펙트를 분석하고 어떤 의존성이 빠져 있는지 제안을 받을 수 있게 되었습니다. 다르게 이야기하자면 컴포넌트 안에서 어떤 데이터 흐름의 변화가 제대로 처리되지 않고 있는지 컴퓨터가 알려줄 수 있다는거죠.
```

능숙해질 때 까지 꼭 사용하자.

### 18 하지만 저는 이 함수를 이펙트 안에 넣을 수 없어요

```js
간단한 해결책이 두 개 있습니다.

함수가 컴포넌트 스코프 안의 어떠한 것도 사용하지 않는다면, 컴포넌트 외부로 끌어올려두고 이펙트 안에서 자유롭게 사용하면 됩니다.
```

```js
// ✅ 데이터 흐름에 영향을 받지 않는다
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query;
}
function SearchResults() {
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, []); // ✅ Deps는 OK

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, []); // ✅ Deps는 OK

  // ...
}
```

```js
혹은 useCallback 훅으로 감쌀 수 있습니다.
```

```js
function SearchResults() {
  // ✅ 여기 정의된 deps가 같다면 항등성을 유지한다
  const getFetchUrl = useCallback((query) => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, []);  // ✅ 콜백의 deps는 OK
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, [getFetchUrl]); // ✅ 이펙트의 deps는 OK

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, [getFetchUrl]); // ✅ 이펙트의 deps는 OK

  // ...
}
```

```js
function SearchResults() {
  const [query, setQuery] = useState('react');

  // ✅ query가 바뀔 때까지 항등성을 유지한다
  const getFetchUrl = useCallback(() => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, [query]);  // ✅ 콜백 deps는 OK
  useEffect(() => {
    const url = getFetchUrl();
    // ... 데이터를 불러와서 무언가를 한다 ...
  }, [getFetchUrl]); // ✅ 이펙트의 deps는 OK

  // ...
}
```

19 함수도 데이터 흐름의 일부인가?
20 경쟁 상태에 대해
21 진입 장벽을 더 높이기
22 마치며
