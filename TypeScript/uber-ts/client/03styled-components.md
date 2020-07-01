# 03

## styled component 추가

styled-components를 설치한다.

yarn add styled-components
yarn add -D @types/styled-components

src/types/styled.d.ts 파일 생성

```ts
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
```

위 코드는 styled components에서 긁어온 샘플 코드다.

내용은 전부 수정될 것이니 styled.d.ts 파일을 생성하여 관리한다는 것만 기억하자.

src/style/theme.ts 파일을 추가한다.

```ts
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  borderRadius: '5px',

  colors: {
    main: 'cyan',
    secondary: 'magenta',
  },
};

export { theme };
```

이 코드도 styled components에서 긁어온 샘플 코드다.

styled.d.ts 에서 선언한 DefaultTheme을 사용한다.

물론 내용은 전부 수정될 것이다.

해당 theme을 AppContainer.ts에 import 한다.

```tsx
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { IS_LOGGED_IN } from './AppQueries';
import { Auth } from '../../types/types';
import AppPresenter from './AppPresenter';
import { theme } from '../../style/theme';

interface Props {}

const AppContainer: React.FC<Props> = () => {
  const { loading, data } = useQuery<Auth>(IS_LOGGED_IN);
  return (
    <ThemeProvider theme={theme}>
      {!loading && data && <AppPresenter isLoggendIn={data.auth.isLoggedIn} />}
    </ThemeProvider>
  );
};

export default AppContainer;

```

실제로 사용할 데이터를 넣어 theme.ts, styled.d.ts 파일을 다음과 같이 수정한다.

theme.ts

```ts
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  blueColor: '#3498db',
  greyColor: '#7f8c8d',
};

export { theme };
```

styled.d.ts

```ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    blueColor: string;
    greyColor: string;
  }
}
```

## reset css

styled-reset을 설치한다.

yarn add styled-reset

src/style/globalStyle.ts 파일을 추가한다.

```ts
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input,
  button {
    &:focus,
    &:active{outline: none}
  }
`;

export default GlobalStyle;
```

구글 폰트에서 maven을 선택해서 globalStyle.ts에 추가하려고 했는데 react-helmet을 사용하라는 경고 메시지가 나온다. 그래서 pass

font-family에 apple 폰트를 추가한다.

해당 파일을 AppContainer.tsx에 import 한다.

```tsx
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { ThemeProvider } from 'styled-components';
import { IS_LOGGED_IN } from './AppQueries';
import { Auth } from '../../types/types';
import AppPresenter from './AppPresenter';
import { theme } from '../../style/theme';
import GlobalStyle from '../../style/globalStyle';

interface Props {}

const AppContainer: React.FC<Props> = () => {
  const { loading, data } = useQuery<Auth>(IS_LOGGED_IN);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {!loading && data && <AppPresenter isLoggendIn={data.auth.isLoggedIn} />}
    </ThemeProvider>
  );
};

export default AppContainer;
```

브라우저를 보면 reset css가 적용된 것을 확인할 수 있다.
