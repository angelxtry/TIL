# styled components intro

먼저 create-react-app으로 프로젝트를 하나 만들고 styled-components를 설치한다.

```cmd
create-react-app styled-components-intro
cd styled-components-intro
yarn add styled-components
```

src 디렉토리에서 App.js, index.js를 제외하고 다른 파일들은 삭제하자.

App.js에 button을 하나 추가했다.

```js
import React from "react";

function App() {
  return (
    <button>Hello</button>
  );
}

export default App;

```

`yarn start`로 실행해보면 웹 브라우져에 기본 스타일의 버튼 하나가 만들어진 것을 확인할 수 있다.

## intro

`styled components`를 import 하고 `Button`을 만들어보자.

```js
import React from "react";
import styled from "styled-components";

function App() {
  return (
    <Button>Hello</Button>
  );
}

const Button = styled.button``;


export default App;
```

`styled.button`에서 button은 html tag다.

`h1`, `h2`, `button`, `input` 등의 html tag를 모두 사용할 수 있다.

이렇게 수정하면  `<Button>`을 사용한 것이 `<button>`을 사용한 것과 동일한 효과가 난다.

이제 `<Button>`에 스타일을 적용해보자.

```js
import React, { Fragment } from "react";
import styled from "styled-components";

function App() {
  return (
    <Fragment>
      <Button>Hello</Button>
      <button>Hello</button>
    </Fragment>
  );
}

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
`;

export default App;

```

비교를 위해 button을 하나 더 만들고 `Fragment`로 감싸주었다.

`styled.button` 뒤에 백틱으로 감싸고 그 안에 적용할 스타일을 입력한다.

## styled components에 param 전달하기

```js
import React, { Fragment } from "react";
import styled from "styled-components";

function App() {
  return (
    <Fragment>
      <Button>Hello</Button>
      <Button danger>Hello</Button>
    </Fragment>
  );
}

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "#eb2f06" : "#78e08f")};
`;

export default App;
```

`<Button danger>Hello</Button>` 이렇게 하면 Button에 danger가 param으로 전달된다.

전달된 param을 background-color에 사용했다.

## 만들어진 styled components 재활용 1

anchor를 하나 만들어보자.

추가할 anchor는 기존에 만들어 둔 Button과 동일한 스타일을 적용하려고 한다.

`as`라는 키워드를 이용하여 간단하게 구현할 수 있다.

```js
import React, { Fragment } from "react";
import styled from "styled-components";

function App() {
  return (
    <Fragment>
      <Button>Hello</Button>
      <Button danger>Hello</Button>
      <Button as="a" href="https://angelxtry.github.io">
        My static git page
      </Button>
    </Fragment>
  );
}

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "#eb2f06" : "#78e08f")};
`;

export default App;
```

세 번째로 추가한 Button에 `as="a"`를 추가했다.
`as`는 v4에 추가된 기능으로 polymorphic prop이라고 부른다.
`as`뒤에 다른 html tag나 components를 입력하여 기존 component를 다르게 동작하게 할 수 있다.
지금은 Button에 `as="a" href="https://angelxtry.github.io"` 이렇게 입력하여 ancher로 동작하게 만들었다.

## 만들어진 styled components 재활용 2

anchor에 자동으로 생긴 under line이 마음에 들지 않는다면 `text-decoration`을 이용하여 under line을 제거할 수도 있다.

```js
import React, { Fragment } from "react";
import styled from "styled-components";

function App() {
  return (
    <Fragment>
      <Button>Hello</Button>
      <Button danger>Hello</Button>
      <Button as="a" href="https://angelxtry.github.io">
        My static git page
      </Button>
    </Fragment>
  );
}

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "#eb2f06" : "#78e08f")};
  text-decoration: ${props => (props.as === "a" ? "none" : "")};
`;

export default App;

```

이렇게 해도 동작은 한다.
하지만 Button component에 부가적인 스타일이 계속 추가되는 것이 마음에 들지 않는다면 별도로 분리하는 것도 좋은 방법이다.

```js
import React, { Fragment } from "react";
import styled from "styled-components";

function App() {
  return (
    <Fragment>
      <Button>Hello</Button>
      <Button danger>Hello</Button>
      <Button as="a" href="https://angelxtry.github.io">
        My static git page
      </Button>
      <Anchor as="a" href="https://angelxtry.github.io">
        Another styled components anchor
      </Anchor>
    </Fragment>
  );
}

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "#eb2f06" : "#78e08f")};
  text-decoration: ${props => (props.as === "a" ? "none" : "")};
`;

const Anchor = styled(Button)`
  text-decoration: none;
`;

export default App;

```

Anchor라는 component를 만들었다.
이 component는 Button componet의 style을 그대로 사용한다.
그리고 `text-decoration` 스타일만을 하나 더 추가했다.
어떤 방식으로 코드를 작성할지는 상황에 따라 선택하면 되겠다.

## animation 추가

Button에 animation을 추가해보자.

```js
import React, { Fragment } from "react";
import styled, { keyframes, css } from "styled-components";

function App() {
  return (
    <Fragment>
      <Button>Hello</Button>
      <Button danger>Hello</Button>
      <Button as="a" href="https://angelxtry.github.io" fadeIn>
        My static git page
      </Button>
      <Anchor as="a" href="https://angelxtry.github.io" fadeIn>
        Another styled components anchor
      </Anchor>
    </Fragment>
  );
}

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "#eb2f06" : "#78e08f")};
  text-decoration: ${props => (props.as === "a" ? "none" : "")};
  animation: ${props =>
    props.fadeIn
      ? css`
          ${fadeIn} 2s
        `
      : ""};
`;

const Anchor = styled(Button)`
  text-decoration: none;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default App;

```

코드를 하나씩 분석해보자.

```js
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
```

keyframes라는 키워드를 이용하여 animation의 효과를 적었다.
이렇게 만든 fadeIn이라는 component를 Button에 추가한다.

```js
animation: ${props =>
  props.fadeIn
    ? css`
        ${fadeIn} 2s
      `
    : ""};
```

여기서 `css`라는 키워드를 사용했다.
`css`는 템플릿 리터럴 안에서 사용한 함수가 다시 템플릿 리터럴을 리턴할 때 사용한다.

props로 전달되는 param에 fadeIn이 있다면 animation이 적용된다.

```js
<Button as="a" href="https://angelxtry.github.io" fadeIn>...</Button>
<Anchor as="a" href="https://angelxtry.github.io" fadeIn>...</Anchor>
```

Button과 Anchor에 모두 fadeIn을 적용했다.
브라우저에서 확인해보면 fade in 효과가 적용된 것을 확인할 수 있다.

## body 전체의 margin, padding 없애기

body전체에 배경색을 넣으려고 한다.

`Fragment` 대산 `Container`라는 것을 하나 만들어 교체하고 `Container`에 스타일을 적용한다.

```js
import React from "react";
import styled, { keyframes, css } from "styled-components";

function App() {
  return (
    <Container>
      <Button>Hello</Button>
      <Button danger>Hello</Button>
      <Button as="a" href="https://angelxtry.github.io" fadeIn>
        My static git page
      </Button>
      <Anchor as="a" href="https://angelxtry.github.io" fadeIn>
        Another styled components anchor
      </Anchor>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #ecf0f1;
`;

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "#eb2f06" : "#78e08f")};
  text-decoration: ${props => (props.as === "a" ? "none" : "")};
  animation: ${props =>
    props.fadeIn
      ? css`
          ${fadeIn} 2s
        `
      : ""};
`;

const Anchor = styled(Button)`
  text-decoration: none;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default App;

```

브라우저 화면을 가득 채우는 배경색이 적용되었으나 테두리에 못생긴 공백이 있다.
이것을 없애기 위해 다음과 같이 코드를 추가한다.

```js
import React, { Fragment } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Container>
        <Button>Hello</Button>
        <Button danger>Hello</Button>
        <Button as="a" href="https://angelxtry.github.io" fadeIn>
          My static git page
        </Button>
        <Anchor as="a" href="https://angelxtry.github.io" fadeIn>
          Another styled components anchor
        </Anchor>
      </Container>
    </Fragment>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #ecf0f1;
`;

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "#eb2f06" : "#78e08f")};
  text-decoration: ${props => (props.as === "a" ? "none" : "")};
  animation: ${props =>
    props.fadeIn
      ? css`
          ${fadeIn} 2s
        `
      : ""};
`;

const Anchor = styled(Button)`
  text-decoration: none;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default App;
```

`createGlobalStyle`이라는 키워드로 `GlobalStyle`을 생성했다.

`createGlobalStyle`도 v4에 추가되었다. 기존에 사용하던 `injectGlobal`은 deprecated되었다.

다시 `Fragment`를 이용하여 `Container`위에 `GlobalStyle`을 추가하고 브라우저를 다시 확인해보자.

## form, input 등의 표현

```js
import React, { Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Container>
        <form>
          <Input type="text" name="user-name" required/>
          <Button type="submit">Submit</Button>
        </form>
      </Container>
    </Fragment>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #ecf0f1;
`;

const Input = styled.input`
  border-radius: 5px;
`;

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "#eb2f06" : "#78e08f")};
`;

export default App;

```

`form`의 `Input`은 styled component다. 
`Input`에서 사용한 type, name, required 같은 attribute들도 styled component에서 표현할 수 있다.

```js
const Input = styled.input.attrs({
  type: "text",
  name: "user-name",
  required: true
})`
  border-radius: 5px;
`;
```

`attrs` 메서드 안에 객체로 attribute를 표현한다.
어떤 것이 더 명시적이냐는 논란이 있을 수 있겠지만 잘 포장해서 사용하면 좋을 것 같기도 하다.

## mixin

mixin은 css 묶음이다. 한 번 설정해두고 계속 재사용할 수 있다.
이전에 사용했던 `css` 키워드를 이용하여 설정한다.

```js
import React, { Fragment } from "react";
import styled, { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Container>
        <form>
          <Input />
          <Button type="submit">Submit</Button>
        </form>
      </Container>
    </Fragment>
  );
}

const awesomeCard = css`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #f8c291;
`;

const Input = styled.input.attrs({
  type: "text",
  name: "user-name",
  required: true
})`
  ${awesomeCard}
`;

const Button = styled.button`
  border-radius: 50px;
  padding: 5px;
  min-width: 120px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
  background-color: ${props => (props.danger ? "#eb2f06" : "#78e08f")};
`;

export default App;

```

`awesomeCard`라는 mixin을 생성하고 `Input` 적용했다.
mixin 이라는 이름보다 그냥 변수에 css를 담아놓고 적용한다는 느낌이다.
해당 값을 공용 파일에 분리해 놓으면 다른 사람들도 활용할 수 있다는 점이 좋아보인다.

## theme

마지막으로 `theme`을 알아보자.
theme은 redux같은 느낌이다. 별도의 파일에 공통으로 쓰일 스타일을 적용해 놓고 사용할 수 있다.

코드를 보자.

먼저 theme를 하나 생성한다. theme.js 파일을 만들고 객체를 하나 선언한다.

```js
const theme = {
  basicColor: "#3c6382",
  successColor: "#38ada9",
  dangerColor: "#eb2f06"
};

export default theme;

```

App.js 파일에서 theme를 import해서 사용한다.

```js
import React, { Fragment } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        <Container>
          <Cards />
        </Container>
      </Fragment>
    </ThemeProvider>
  );
}

const Cards = () => {
  return (
    <Fragment>
      <Card backgroundColor={props => props.theme.basicColor}>basic</Card>
      <Card backgroundColor={props => props.theme.successColor}>success</Card>
      <Card backgroundColor={props => props.theme.dangerColor}>danger</Card>
    </Fragment>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #f8c291;
`;

const Button = styled.button`
  border-radius: 10px;
  padding: 50px 50px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
`;

const Card = styled(Button)`
  margin: 10px;
  color: white;
  background-color: ${props => props.backgroundColor};
`;

export default App;

```

`ThemeProvider`를 import 하고 redux의 Provider 처럼 다른 component들을 감싸준다.

`Card` component를 하나 만들었다. `Button` component의 스타일을 그대로 사용하면서 일부만 자신의 스타일을 가진다.

`Cards`에서 `Card` component를 사용하면서 param으로 theme에서 정의한 값을 전달한다.

브라우저에서 확인해보면 해당 색이 적용된 것을 알 수 있다.

## fin

간단하게 styled components의 사용법을 확인해봤다.
막상 사용하려고 하니 hooks로 만든 components의 이름과 styled component의 이름이 비슷해서 혼란스러운 점도 있다.
그래도 css 지식이 부족한 나에게는 component 별로 분리되어 스타일을 적용하는 방식이 상당히 편하게 느껴진다.
어떻게 활용해야 할지는 좀 더 공부를 해봐야겠다.
