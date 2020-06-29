# React Testing Library

- "how to test React components to get full confidence in our React components"

리엑트 컴포넌트에 대해 완전한 자신감을 가지려면 어떻게 테스트를 해야할까?

## JEST VS REACT TESTING LIBRARY

RTL은 Jest의 대안이 아니다. Jest는 test framework이고, test runner다.

```js
describe('function or component', () => {
  test('does the following' () => {
    ...
  })
})
```

describe는 test suite, test는 test case다.

...

## REACT TESTING LIBRARY: RENDERING A COMPONENT

```jsx
import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
});
```

RTL의 render 함수는 JSX를 인자로 받고, 그것을 렌더링한다.

렌더링 결과를 확인하기위해 screen.debug 함수를 사용할 수 있다.

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    screen.debug();
  })
})
```

screen.debug 함수가 실행되면 html이 출력된다.

더 복잡한 형태의 react component도 실행할 수 있다.

```jsx
import React from 'react';

function App() {
  const [search, setSearch] = useState('');

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
    </div>
  );
}

function Search ({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
```

## REACT TESTING LIBRARY: SELECTING ELEMENTS

RTL은 element를 선택하기 위한 검색 함수를 제공한다.

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App components', () => {
    render(<App />);

    screen.getByText('Search:');
  });
});
```

생성되는 HTML을 전혀 모른다면 screen.debug()로 확인할 수 있다.

HTML을 알고 있다면 screen의 함수를 이용하여 특정 element를 선택할 수 있다.

그리고 assertion을 사용하여 DOM에 해당 element가 존재하는지 확인할 수 있다.

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App components', () => {
    render(<App />);

    expect(screen.getByText('Search:')).toBeInTheDocument();
  });
});
```

getByText는 해당 element가 존재하지 않으면 에러를 발생시킨다.

getByText 함수는 문자열을 인자로 사용하면 문자열이 정확하게 일치해야 한다. 정규식을 사용할 수도 있다.

getByText 함수만 호출하기 보다 명시적으로 assertion을 사용하는 것이 더 낫다.

## REACT TESTING LIBRARY: SEARCH TYPES

getByRole 함수는 getByText 함수만큼 많이 쓰인다.

getByRole 함수는 aria-label attribute로 element를 검색할 때 사용한다.

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App components', () => {
    render(<App />);

    screen.getByRole('');
    screen.debug();
  });
});
```

이 테스트 코드는 getByRole에서 에러가 발생한다.

screen.debug 함수로 결과를 확인하면 다음과 같다.

```txt
    Unable to find an accessible element with the role ""

    Here are the accessible roles:

      document:

      Name "":
      <body />

      --------------------------------------------------
      generic:

      Name "":
      <div />

      Name "":
      <div />

      Name "":
      <div />

      --------------------------------------------------
      textbox:

      Name "Search:":
      <input
        id="search"
        type="text"
        value=""
      />

      --------------------------------------------------
```

getByRole을 이용하여 textbox를 선택하면 테스트가 통과된다.

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App components', () => {
    render(<App />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
```

다음의 함수들이 test에 자주 사용된다.

- getByText
- getByRole
- getByLabelText

```html
<label for="search" />
```

- getByPlaceholderText

```html
<input placeholder="Search" />
```

- getByAltText

```html
<img alt="profile" />
```

- getByDisplayValue

```html
<input value="JavaScript" />
```

## REACT TESTING LIBRARY: SEARCH VARIANTS

getBy로 시작하는 함수 대신 queryBy로 시작하는 함수를 사용할 수 있다.

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App components', () => {
    render(<App />);

    screen.debug();

    expect(screen.getByText(/Searches for JavaScript/)).toBeNull();
  });
});
```

해당 문구가 없는 것을 확인하려고 했지만 getByText가 먼저 에러를 발생시킨다.

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App components', () => {
    render(<App />);

    screen.debug();

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
  });
});
```

queryByText를 사용하면 해당 값이 없더라도 에러가 발생하지 않고, 원하는 테스트의 결과를 얻을 수 있다.

### When to use findBy

findBy는 비동기 element를 확인하기 위해 사용한다.

```jsx
import React from 'react';

function getUser() {
  return Promise.resolve({ id: '1', name: 'Robin' });
}

function App() {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    loadUser();
  }, []);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>
    </div>
  );
}

function Search ({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
```

loadUser 함수는 비동기로 동작한다.

```jsx
import React from 'reaact';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    expect(screen.queryByText(/Signed in as/)).toBeNull();
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  })
})
```

queryByText 함수는 비동기 함수가 실행되기 전의 상태를 확인할 수 있고, findByText는 비동기 함수가 실행된 이후의 상태를 확인할 수 있다.

### What about multiple elements

- getAllBy
- queryAllBy
- findAllBy

### Assertive Functions

- toBeDisabled
- toBeEnabled
- toBeEmpty
- toBeEmptyDOMElement
- toBeInTheDocument
- toBeInvalid
- toBeRequired
- toBeValid
- toBeVisible
- toContainElement
- toContainHTML
- toHaveAttribute
- toHaveClass
- toHaveFocus
- toHaveFormValues
- toHaveStyle
- toHaveTextContent
- toHaveValue
- toHaveDisplayValue
- toBeChecked
- toBePartiallyChecked
- toHaveDescription

## REACT TESTING LIBRARY: FIRE EVENT

React Component에서 element의 존재 여부는 getBy나 queryBy로 확인했다.

리렌더링 된 이후에 element의 존재 여부는 findBy로 확인했다.

그러면 실제 유저의 interaction은 어떻게 확인할까?

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App components', () => {
    render(<App />);

    screen.debug();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    screen.debug();
  });
});
```

비동기 로직이 섞여 있다면 비동기 로직 실행 전, 후를 나누어서 확인할 수 있다.

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);

    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    screen.debug();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
    screen.debug();
  });
});
```

### React Testing Library: User Event

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

describe('App', () => {
  test('renders App components', async () => {
    render(<App />);

    await screen.findByText(/Signed in as/);

    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
  });
});
```

keyDown, keyPress, keyUp 등도 모두 테스트 할 수 있다.

## REACT TESTING LIBRARY: CALLBACK HANDLERS

```jsx
...

describe('Search', () => {
  test('calls the onChange callback handler', () => {
    const onChange = jest.fn();
    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'JavaScript' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
```

jest.fn()을 이용하여 onChange 함수를 mocking 한다. 이 onChange를 Search를 렌더링 할 때 사용할 수 있다.

fireEvent를 이용하여 input에 JavaScript 문자열이 전달된 것을 실행한 후 onChnage가 1번 호출된 것을 테스트 했다.

fireEvent는 callback 함수를 한 번만 실행한다. userEvent는 모든 키 입력 이벤트에 반응한다.

```jsx
describe('Search', () => {
  test('calls the onChange callback handler', async () => {
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    await userEvent.type(screen.getByRole('textbox'), 'JavaScript');

    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
```

## REACT TESTING LIBRARY: ASYNCHRONOUS / ASYNC

```jsx
import React from 'react';
import axios from 'axios';

const URL = 'http://hn.algolia.com/api/v1/search';

function App() {
  const [stories, setStories] = React.useState([]);
  const [error, setError] = React.useState(null);

  async function handleFetch(event) {
    let result;

    try {
      result = await axios.get(`${URL}?query=React`);

      setStories(result.data.hits);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleFetch}>
        Fetch Stories
      </button>

      {error && <span>Something went wrong ...</span>}

      <ul>
        {stories.map((story) => (
          <li key={story.objectID}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

```jsx
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

jest.mock('axios');

describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const items = await screen.findAllByRole('listitem');

    expect(items).toHaveLength(2);
  });
});
```

App을 렌더링하기 전에 axios를 mocking 하고 axios.get의 데이터로 사용할 데이터를 준비해준다.

App을 렌더링 한 후 userEvent를 이용하여  button을 클릭한다.

비동기 작업의 결과를 findBy를 이용하여 처리한다. 그리고 list 데이터를 처리하기 위해 findAll을 사용했다.

```jsx
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

jest.mock('axios');

describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const items = await screen.findAllByRole('listitem');

    expect(items).toHaveLength(2);
  });

  test('fetches stories from an API and fails', async () => {
    axios.get.mockImplememtaionOnce(() => {
      Promise.reject(new Error());
    });

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
});
```

에러가 발생하는 상황을 테스트하기 위해 axios.get의 결과가 에러가 발생하도록 설정한다.

```jsx
import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

jest.mock('axios');

describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' },
    ];

    const promise = Promise.resolve({ data: { hits: stories } });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    await act(() => promise);

    expect(screen.findAllByRole('listitem')).toHaveLength(2);
  });

  test('fetches stories from an API and fails', async () => {
    axios.get.mockImplememtaionOnce(() => {
      Promise.reject(new Error());
    });

    render(<App />);

    await userEvent.click(screen.getByRole('button'));

    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
});
```