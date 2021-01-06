# Test React Components with Jest and React Testing Library

## 01. What's changed in Test React Components with Jest and React Testing Library

## 02. Intro to Test React Components with Jest and React Testing Library

## 03. Render a React Component for Testing

favorite-number.js

```js
import * as React from 'react'

function FavoriteNumber({min = 1, max = 9}) {
  const [number, setNumber] = React.useState(0)
  const [numberEntered, setNumberEntered] = React.useState(false)
  function handleChange(event) {
    setNumber(Number(event.target.value))
    setNumberEntered(true)
  }
  const isValid = !numberEntered || (number >= min && number <= max)
  return (
    <div>
      <label htmlFor="favorite-number">Favorite Number</label>
      <input
        id="favorite-number"
        type="number"
        value={number}
        onChange={handleChange}
      />
      {isValid ? null : <div role="alert">The number is invalid</div>}
    </div>
  )
}

export {FavoriteNumber}
```

__tests__/react-dom.js 파일을 생성한다.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {FavoriteNumber} from '../favorite-number';

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FavoriteNumber />, div);
  console.log(div.innerHTML);
});
```

테스트를 실행하면 다음과 같이 출력된다.

```js
<div><label for="favorite-number">Favorite Number</label><input id="favorite-number" type="number" value="0"></div>
```

테스트를 추가해보자.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {FavoriteNumber} from '../favorite-number';

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FavoriteNumber />, div);
  console.log(div.innerHTML);
  expect(div.querySelector('input').type).toBe('number');
  expect(div.querySelector('label').textContent).toBe('Favorite Number');
});
```

.textContent.toBe는 .toHaveTextContent로 대체할 수 있다.

```js
expect(div.querySelector('label')).toHaveTextContent('Favorite Number');
```

## 04. Use Jest DOM for Improved Assertions

```js
import React from 'react';
import ReactDOM from 'react-dom';
import {FavoriteNumber} from '../favorite-number';

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FavoriteNumber />, div);
  console.log(div.innerHTML);
  expect(div.querySelector('input')).toHaveAttribute('type', 'number');
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number');
});
```

.type.toBe는 .toHaveAttribute('type', 'number')로 개선할 수 있다.

## Use DOM Testing Library to Write More Maintainable React Tests

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import {FavoriteNumber} from '../favorite-number';

test('renders a number input with a label "Favorite Number"', () => {
  render(<FavoriteNumber />);
  const input = screen.getByLabelText('Favorite Number');
  expect(input).toHaveAttribute('type', 'number');
});
```

screen.getByLabelText로 input를 선택했다.

input의 type은 number다.

label에 Favorite Number 텍스트를 가지는 것은 다시 확인할 필요가 없어졌다.

ReactDOM으로 render를 했을 때는 계속 오류가 발생했다. ReactDOM 대신 testing-library/react의 render를 사용하니 에러가 처리됐다.

```js
const input = screen.getByLabelText(/favorite Number/i);
```

문자열 대신 정규식으로 검색할 수도 있다.

## 06. Use React Testing Library to Render and Test React Components

## 07. Debug the DOM State During Tests using React Testing Library’s debug Function

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import {FavoriteNumber} from '../favorite-number';

test('renders a number input with a label "Favorite Number"', () => {
  const {debug} = render(<FavoriteNumber />);
  debug();
  const input = screen.getByLabelText(/favorite Number/i);
  expect(input).toHaveAttribute('type', 'number');
});
```

debug 함수를 이용해 DOM을 출력해볼 수 있다.

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import {FavoriteNumber} from '../favorite-number';

test('renders a number input with a label "Favorite Number"', () => {
  const {debug} = render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite Number/i);
  debug(input);
  expect(input).toHaveAttribute('type', 'number');
});
```

component를 debug의 인자로 전달하여 해당 component만 출력할 수도 있다.

## 08. Test React Component Event Handlers with fireEvent from React Testing Library

사용자가 input에 값을 입력하는 이벤트가 발생했을 때(FavoriteNumber 컴포넌트의 handleChange 이벤트가 발생했을 때)를 테스트 할 수 있다.

```js
test('entering an invalid value shows an error message', () => {
  render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite Number/i);
  userEvent.type(input, '10');
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i);
});
```

## 09. Improve Test Confidence with the User Event Module

## 10. Test Prop Updates with React Testing Library

```js
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {FavoriteNumber} from '../favorite-number';

test('entering an invalid value shows an error message', () => {
  const {rerender, debug} = render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite Number/i);
  fireEvent.change(input, {target: {value: '10'}});
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i);
  debug();

  rerender(<FavoriteNumber max={10} />);
  debug();
});

```

fireEvent를 사용했다.

처음 FavoriteNumber를 렌더링 했을 때 fireEvent로 10을 전달하면 에러가 발생한다.

하지만 prop으로 max={10}을 전달하면 에러가 발생하지 않는다.

dubug의 출력을 확인해보면 다음과 같다.

```js
console.log
  <body>
    <div>
      <div>
        <label
          for="favorite-number"
        >
          Favorite Number
        </label>
        <input
          id="favorite-number"
          type="number"
          value="10"
        />
        <div
          role="alert"
        >
          The number is invalid
        </div>
      </div>
    </div>
  </body>

    at debug (node_modules/@testing-library/react/dist/pure.js:107:13)

console.log
  <body>
    <div>
      <div>
        <label
          for="favorite-number"
        >
          Favorite Number
        </label>
        <input
          id="favorite-number"
          type="number"
          value="10"
        />
      </div>
    </div>
  </body>

    at debug (node_modules/@testing-library/react/dist/pure.js:107:13)
```

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FavoriteNumber} from '../favorite-number';

test('entering an invalid value shows an error message', () => {
  const {rerender, debug} = render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite Number/i);
  userEvent.type(input, '10');
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i);
  debug();

  rerender(<FavoriteNumber max={10} />);
  debug();
});
```

fireEvent가 아니라 userEvent를 사용했다.

userEvent를 사용했을 때도 결과는 같다. 단 debug의 출력이 조금 다르다.

```js
console.log
  <body>
    <div>
      <div>
        <label
          for="favorite-number"
        >
          Favorite Number
        </label>
        <input
          id="favorite-number"
          type="number"
          value="0"
        />
        <div
          role="alert"
        >
          The number is invalid
        </div>
      </div>
    </div>
  </body>

    at debug (node_modules/@testing-library/react/dist/pure.js:107:13)

console.log
  <body>
    <div>
      <div>
        <label
          for="favorite-number"
        >
          Favorite Number
        </label>
        <input
          id="favorite-number"
          type="number"
          value="0"
        />
      </div>
    </div>
  </body>

    at debug (node_modules/@testing-library/react/dist/pure.js:107:13)
```

fireEvent를 사용했을 때는 value가 10으로 변경되었지만, userEvent는 계속 0이다.

**참고**

userEvent는 fireEvent와 달리 사람의 행동에 가까운 좀 더 추상화된 함수명을 제공한다.

userEvent.type() 함수에는 target.value 구조의 이벤트 객체를 전달하는 것이 아니라 실제 입력 텍스트만 전달하면 된다.

userEvent는 change 이벤트 뿐만 아니라 focus, keydown, keyup과 같은 실제로 동반되는 모든 이벤트가 함께 발생한다.


## Assert That Something is NOT Rendered with React Testing Library

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FavoriteNumber} from '../favorite-number';

test('entering an invalid value shows an error message', () => {
  const {rerender} = render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite Number/i);
  userEvent.type(input, '10');
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i);
  rerender(<FavoriteNumber max={10} />);
  // expect(screen.getByRole('alert')).toBeNull();
  expect(screen.getByRole('alert')).not.toBeInTheDocument();
});
```

.toBeNull은 .not.toBeInTheDocument로 수정하자.

마지막 expect에서 alert이 생성되지 않기 때문에 이 코드는 에러가 발생한다.

이 코드는 다음과 같이 수정한다.

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FavoriteNumber} from '../favorite-number';

test('entering an invalid value shows an error message', () => {
  const {rerender} = render(<FavoriteNumber />);
  const input = screen.getByLabelText(/favorite Number/i);
  userEvent.type(input, '10');
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i);
  rerender(<FavoriteNumber max={10} />);
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
```

실제로 존재하는 element를 확인할 때는 getByRole을 사용하고, 존재하지 않는 element를 확인할 때는 queryByRole을 사용한다.

## 12. Test Accessibility of Rendered React Components with jest-axe

deprecated 된 듯 하다.

eslint-plugin-jsx-a11y를 사용하자.

참고: <https://web.dev/accessibility-auditing-react/>

## 13. Test componentDidCatch Handler Error Boundaries with React Testing Library

error-boundary.js 파일은 componentDidCatch lifecycle method를 구현한 컴포넌트다.

```js
import * as React from 'react'
import {reportError} from './api'

class ErrorBoundary extends React.Component {
  state = {hasError: false}
  componentDidCatch(error, info) {
    this.setState({hasError: true})
    reportError(error, info)
  }
  tryAgain = () => this.setState({hasError: false})
  render() {
    return this.state.hasError ? (
      <div>
        <div role="alert">There was a problem.</div>{' '}
        <button onClick={this.tryAgain}>Try again?</button>
      </div>
    ) : (
      this.props.children
    )
  }
}

export {ErrorBoundary}
```

componentDidCatch에서는 에러를 서버에 보고하는 것으로 추측되는 reportError api를 호출한다. 

에러가 발생했을 때 reportError를 올바르게 호출하는지, 정해진 렌더링을 올바르게 하는지 테스트한다.

```js
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {ErrorBoundary} from '../error-boundary';
import {reportError as mockReportError} from '../api';

jest.mock('../api');

afterEach(() => {
  jest.clearAllMocks();
});

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('Bomb');
  } else {
    return null;
  }
}

test('call reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true});
  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  );

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  );

  const error = expect.any(Error);
  const info = {componentStack: expect.stringContaining('Bomb')};
  expect(mockReportError).toHaveBeenCalledWith(error, info);
});
```

Bomb는 shouldThrow가 true이면 Error를 발생시킨다.

처음 렌더링 할 때는 Error가 없는 상태에서 시작한다. 그 후에 rerender 할 때 Error를 발생시킨다.

ErrorBoundary 컴포넌트에 Error가 전달되면 reportError가 호출된다.

이 reportError를 mocking 한다.

```js
jest.mock('../api');
```

jest.mock을 이용하여 api module에서 export한 모든 함수를 jest.fn으로 대체한다.

reportError를 import 하고, 혼동을 피하기 위해 mockReportError로 이름을 변경했다.

mockReportError는 promise를 return 할 것이다. 그래서 mockResolvedValueOnce를 사용한다.

여기까지 준비가 되었다면 rerender에서 Bomb의 Error를 발생시킨다.

reportError는 error, info를 인자로 받는다. reportError가 올바르게 호출되었는지 판단하려면 error, info를 생성해야 한다.

우선 error, info를 null로 설정하고, .toHaveBeenCalledWith를 통해 reportError가 error, info를 인자로 받아 호출되었는지 확인한다.

테스트를 실행하면 다음과 같은 결과가 출력된다.

```js
● call reportError and renders that there was a problem

expect(jest.fn()).toHaveBeenCalledWith(...expected)

Expected: null, null
Received: [Error: Bomb], {"componentStack": "
    at Bomb (/Users/gomidev/Project/JavaScript/testing-javascript/react-testing-library-course-v1/src/__tests__/error-boundary-01.js:12:16)
    at ErrorBoundary (/Users/gomidev/Project/JavaScript/testing-javascript/react-testing-library-course-v1/src/error-boundary.js:4:45)"}

Number of calls: 1

  36 |   const error = null;
  37 |   const info = null;
> 38 |   expect(mockReportError).toHaveBeenCalledWith(error, info);
      |                           ^
  39 | });
```

error는 `[Error: Bomb]`, info는 `{"componentStack": "at Bomb ...`인 것을 확인할 수 있다.

따라서 error와 info는 각각 다음과 같이 생성한다.

```js
const error = expect.any(Error);
const info = {"componentStack": expect.stringContaining('Bomb')};
```

reportError가 올바르게 호출되었는지 판단하려면 다음과 같이 작성한다.

```js
expect(mockReportError).toHaveBeenCalledWith(error, info);
```

reportError가 한 번만 호출되었다는 것을 확인하기 위해 다음을 추가하여 테스트를 실행해본다.

```js
expect(mockReportError).toHaveBoonCalledTimes(1);
```

테스트가 마무리 된 후 mock을 clear하기 위해 jest.clearAllMocks를 실행한다.

jest.clearAllMocks는 afterEach 내에서 호출한다.

```js
afterEach(() => {
  jest.clearAllMocks();
});
```

## 14. Hide console.error Logs when Testing Error Boundaries with jest.spyOn

ErrorBoundary 테스트를 수행할 때, console.error의 메시지가 console에 출력되어 테스트의 결과를 깔끔하게 확인할 수 없다.

이럴 때 jest.spyOn을 사용하여 처리할 수 있다.

spyOn은 어떤 객체에 속한 함수의 구현을 mock으로 대체하지 않고, 해당 함수의 호출 여부와 어떻게 호출되었는지를 확인할 수 있다.

new Error가 발생할 때 React는 해당 Error를 catch 해서 componentDidCatch 메서드를 호출한다.

이것은 application carsh를 방지하지만 console에 context를 출력하는 것을 막지는 않는다.

console.error는 두 번 호출되어 결과를 출력한다.

한 번은 jsdom에서 발생한 error log이고, 다른 하나는 React에서 발생한 error log이다.

테스트는 성공하였으므로 console.error의 출력을 console에 표시되지 않도록 처리해보자.

jest.spyOn을 이용하여 console.error를 아무 동작도 하지 않도록 변경한다.

```js
jest.spyOn(console, 'error').mockImplimentation(() => {});
```

이 구문을 테스트가 실행되기 전에 동작하도록 `beforeAll`에 추가한다.

```js
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplimentation(() => {});
});
```

테스트를 실행해보면 console.error 메시지가 console에 출력되지 않는 것을 확인할 수 있다.

console.error를 출력되지 않도록 변경했지만, 실제로 console.error가 호출되는지 확인해볼 수 있다.

```js
expect(console.error).toHaveBeenCalledTimes(2);
```

jest.spyOn으로 처리한 함수는 테스트가 끝나면 spyOn을 제거해주어야 한다.

```js
console.error.mockRestore();
```

이 코드를 모든 테스트가 완료 된 후에 실행되도록 `afterAll`에 추가한다.

```js
afterAll(() => {
  console.error.mockRestore();
});
```

.mockRestore 이후에 console.error를 출력해보면 console에서 확인할 수 있다.

## 15. Ensure Error Boundaries Can Successfully Recover from Errors

error가 발생하면 ErrorBoundary에서 `There was a problem.` 문구가 출력되고 `Try again?` 버튼을 클릭할 수 있다.

이 문구가 올바르게 출력되는지와 해당 버튼이 정상동작하는지 테스트해보자.

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ErrorBoundary} from '../error-boundary';
import {reportError as mockReportError} from '../api';

jest.mock('../api');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('Bomb');
  } else {
    return null;
  }
}

test('call reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true});
  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  );

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>,
  );

  const error = expect.any(Error);
  const info = {componentStack: expect.stringContaining('Bomb')};
  expect(mockReportError).toHaveBeenCalledWith(error, info);
  expect(mockReportError).toHaveBeenCalledTimes(1);

  expect(console.error).toHaveBeenCalledTimes(2);

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  );

  console.error.mockClear();
  mockReportError.mockClear();

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  );

  userEvent.click(screen.getByText(/try again/i));

  expect(mockReportError).not.toHaveBeenCalled();
  expect(mockReportError).not.toHaveBeenCalled();

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(screen.queryByText(/try again/i)).not.toBeInTheDocument();
});
```

문구가 출력되는 것은 .toMatchInlineSnapshot을 이용하여 확인할 수 있다.

```js
expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot();
```

`Try again?` 버튼을 클릭한 경우를 테스트해보자.

이 테스트를 위해서는 rerender를 한번 더 실행해야 한다.

```js
rerender(
  <ErrorBoundary>
    <Bomb />
  </ErrorBoundary>,
);

userEvent.click(screen.getByText(/try again/i));
```

`Try again?` 버튼을 클릭하면 reportError api는 호출되지 않아야 한다.

console.error도 호출되지 않아야 한다.

```js
expect(mockReportError).not.toBeInTheDocument();
expect(console.error).not.toBeInTheDocument();
```

하지만 이대로 테스트를 진행하면 에러가 발생한다.

이전 시점에서 mockReportError를 호출한 이력이 남아있어서 발생하는 문제다.

그래서 초기화를 실행한다. 초기화를 rerender 전에 실행한다.

mockClear를 실행하면 호출을 0으로 재설정되지만 mock은 그대로 유지된다.

```js
mockReportError.mockClear();
console.error.mockClear();
```

초기화를 실행하면 위 테스트를 통과한다.

state.hasError가 false로 변경되었기 때문에 alert 관련 element도 렌더링되지 않는다.

```js
expect(screen.queryByRole('alert')).not.toBeInTheDocument();
expect(screen.queryByText(/try again/i)).not.toBeInTheDocument();
```

## 16. Mock react-transition-group in React Component Tests with jest.mock

특정 컴포넌트의 children이 아니라 특정 컴포넌트 자체의 테스트에 집중해야 할 경우가 있습니다.

컴포넌트가 렌더링하는 행동을 mocking하는 것이 필요합니다.

react-transition-group의 경우, transition이 완료를 기다릴 필요없이 테스트를 수행할 수 있습니다.

```js
import * as React from 'react'
import {CSSTransition} from 'react-transition-group'

function Fade(props) {
  return (
    <CSSTransition unmountOnExit timeout={1000} classNames="fade" {...props} />
  )
}

function HiddenMessage({children}) {
  const [show, setShow] = React.useState(false)
  const toggle = () => setShow((s) => !s)
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>{children}</div>
      </Fade>
    </div>
  )
}

export {HiddenMessage}
```

HiddenMessage 컴포넌트는 Toggle 버튼을 클릭하면 해당 버튼이 나타났다가 사라지는 컴포넌트다.

이 버튼의 테스트를 작성해보겠습니다.

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HiddenMessage} from '../hidden-message';

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world';
  render(<HiddenMessage>{myMessage}</HiddenMessage>);

  const toggleButton = screen.getByText(/toggle/i);
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(screen.getByText(myMessage)).toBeInTheDocument();
});
```

toggle 버튼을 클릭하기 전까지 HiddenMessage 컴포넌트는 렌더링 되지 않습니다.

toggle 버튼을 클릭하면 hello world 메시지가 렌더링 됩니다.

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HiddenMessage} from '../hidden-message';

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world';
  render(<HiddenMessage>{myMessage}</HiddenMessage>);

  const toggleButton = screen.getByText(/toggle/i);
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(screen.getByText(myMessage)).toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
});
```

toggle 버튼을 한 번 더 클릭하면 HiddenMessage 컴포넌트가 사라진다.

하지만 테스트는 실패한다. fade out 효과가 설정되어 있어, 컴포넌트가 사라지는 과정에 설정한 시간이 소요됩니다.

```js
import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HiddenMessage} from '../hidden-message';

test('shows hidden message when toggle is clicked', async () => {
  const myMessage = 'hello world';
  render(<HiddenMessage>{myMessage}</HiddenMessage>);

  const toggleButton = screen.getByText(/toggle/i);
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(screen.getByText(myMessage)).toBeInTheDocument();
  userEvent.click(toggleButton);
  await waitFor(() => expect(screen.queryByText(myMessage)).not.toBeInTheDocument());
});
```

이 경우 async, await와 waitFor를 이용하여 해결할 수 있습니다.

이렇게 처리하면 fade out 효과가 완료될 때까지 테스트는 대기합니다.

```js
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HiddenMessage} from '../hidden-message';

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  };
});

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world';
  render(<HiddenMessage>{myMessage}</HiddenMessage>);

  const toggleButton = screen.getByText(/toggle/i);
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(screen.getByText(myMessage)).toBeInTheDocument();
  userEvent.click(toggleButton);
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument();
});
```

jest.mock을 이용하여 react-transition-group 모듈을 jest.fn으로 설정합니다.

CSSTransition에 props.in이 없다면 null로 설정합니다.

이렇게 처리하면 async, await, waitFor를 삭제해도 테스트가 정상 동작합니다.