# 프론트엔드에서-TDD가-가능하다는-것을-보여드립니다

최초에 App.js 파일 하나만 존재하고 코드는 다음과 같다.

```jsx
import React from 'react';

export default function App() {
  return (
    <div>
      <h1>To-do</h1>
    </div>
  );
}
```

`yarn watch`를 실행한 후 `App.test.jsx` 파일을 추가하면 테스트가 하나도 없기 때문에 에러가 발생한다.

먼저 테스트를 하나 작성하자.

```jsx
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('tasks를 render 한다.', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('아무 일도 하기 싫다');
  });
});
```

react와 `@testing-library/react`를 import 하고 test suit를 작성한다.

App 컴포넌트에는 `아무 일도 하기 싫다`라는 task가 있다라고 테스트를 작성하다.

이 테스트는 실패할 것이다. 테스트가 성공하도록 코드를 수정해보자.

```jsx
import React from 'react';

export default function App() {
  return (
    <div>
      <h1>To-do</h1>
      <ul>
        <li>아무 일도 하기 싫다</li>
      </ul>
    </div>
  );
}
```

task들을 별도의 컴포넌트로 분리해보자.

먼저 `List.test.jsx` 파일을 생성한다.

그리고 `List.jsx` 파일도 생성한다.

test부터 작성한다.

```jsx
import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('task를 render 한다', () => {
    const { container } = render(<List />);

    expect(container).toHaveTextContent('아무 일도 하기 싫다');
  });
});
```

당연히 test는 실패한다.

다음과 같이 List.jsx 파일을 작성하면 테스트가 성공한다.

```jsx
import React from 'react';

export default function List() {
  return (
    <ul>
      <li>아무 일도 하기 싫다</li>
    </ul>
  );
}
```

task는 당연히 배열 형태일 것이므로 test의 task를 배열로 변경해보자.

test부터 변경한다.

```jsx
import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  it('task를 render 한다', () => {
    const tasks = [
      { id: 1, title: '아무 일도 하기 싫다' },
      { id: 2, title: '건물 매입' },
    ];
    const { container } = render(<List tasks={tasks} />);

    expect(container).toHaveTextContent('아무 일도 하기 싫다');
    expect(container).toHaveTextContent('건물 매입');
  });
});
```

tasks를 만들고, List에 props로 전달했다.

테스트는 통과하지만 제대로 통과된 것이 아니라는 것을 알고 있다. (TypeScript였으면 에러다.)

List.jsx를 수정하자.

```jsx
import React from 'react';

export default function List({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
```

App.jsx 때문에 에러가 발생한다. 함께 수정하자.

```jsx
import React from 'react';
import List from './List';

export default function App() {
  const tasks = [
    { id: 1, title: '아무 일도 하기 싫다' },
    { id: 2, title: '건물 매입' },
  ];
  return (
    <div>
      <h1>To-do</h1>
      <List tasks={tasks} />
    </div>
  );
}
```

다시 모든 테스트를 통과한다.

redux를 왜 사용할까. 상태관리.

좀 더 구체적으로 말하자면 State Reflection이다. 상태의 반영.

리엑트는 상태를 반영하는 것만 관심이 있다.

그래서 좀 더 쉽게 상태를 관리하려면 각 컴포넌트가 하나의 관심만을 갖도록 하는 것이 중요하다.

List.jsx를 ListContainer.jsx로 분리해보자.

ListContainer.jsx, ListContainer.test.jsx 파일을 생성한다.

ListContainer.test.jsx 파일을 먼저 작성한다.

```jsx
import React from 'react';
import { render } from '@testing-library/react';

import ListContainer from './ListContainer';

describe('ListContainer', () => {
  const tasks = [
    { id: 1, title: '아무 일도 하기 싫다' },
    { id: 2, title: '건물 매입' },
  ];

  it('tasks를 render 한다.', () => {
    const { container } = render(<ListContainer />);

    expect(container).toHaveTextContent('아무 일도 하기 싫다');
  });
});
```

ListContainer.jsx도 작성한다.

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
import List from './List';

export default function ListContainer() {
  const { tasks } = useSelector((state) => ({
    tasks: state.tasks,
  }));
  return <List tasks={tasks} />;
}
```

store가 존재한다면 store에서 tasks를 가져오는 로직을 추가하고 List 컴포넌트에 tasks를 전달하도록 작성한다.

ListContainer.test.jsx

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import ListContainer from './ListContainer';

describe('ListContainer', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      tasks: [
        { id: 1, title: '아무 일도 하기 싫다' },
        { id: 2, title: '건물 매입' },
      ],
    }),
  );

  it('tasks를 render 한다.', () => {
    const { container } = render(<ListContainer />);

    expect(container).toHaveTextContent('아무 일도 하기 싫다');
  });
});
```

위와 같이 테스트 코드를 작성하면 ListContainer에서 tasks를 불러오는 것과 동일한 동작을 한다.

하지만 테스트에서 useSelector를 조작하려면 mock을 만들어야한다.

최상위 경로에 `__mocks__` 폴더를 생성하고 react-redux.js 파일을 추가하자.

react-redux.js

```js
export const useSelector = jest.fn();
```

다시 ListContainer.test.jsx 파일을 수정하자.

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      tasks: [
        { id: 1, title: '아무 일도 하기 싫다' },
        { id: 2, title: '건물 매입' },
      ],
    }),
  );

  it('tasks를 render 한다.', () => {
    const { container } = render(<ListContainer />);

    expect(container).toHaveTextContent('아무 일도 하기 싫다');
  });
});
```

tasks를 여러번 작성하는 것은 중복이다.

그래서 최상위 폴더에 fixtures라는 폴더를 생성하고, tasks.js 파일을 추가하자.

tasks.js

```js
const tasks = [
  { id: 1, title: '아무 일도 하기 싫다' },
  { id: 2, title: '건물 매입' },
];

export default tasks;
```

모든 파일의 tasks를 fixtures의 tasks로 변경한다.

현재 App.jsx를 확인해보면 List 컴포넌트를 바로 호출하고 있다.

그래서 App.jsx에서 ListContainer를 호출하도록 변경한다.

```jsx
import React from 'react';
import ListContainer from './ListContainer';

export default function App() {
  return (
    <div>
      <h1>To-do</h1>
      <ListContainer />
    </div>
  );
}
```

이렇게 변경하면 테스트에서 에러가 발생한다.

확인해보면 App.test.jsx에서 오류가 발생한다.

모든 테스트는 다른 테스트와 독립적으로 동작하기 때문에 발생하는 에러다.

App.test.jsx도 ListContainer.test.jsx 처럼 mock과 useSelctor를 추가한다.

App.test.jsx

```jsx
import { useSelector } from 'react-redux';
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import tasks from '../fixtures/tasks';

jest.mock('react-redux');

describe('App', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      tasks,
    }),
  );

  it('tasks를 render 한다.', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('아무 일도 하기 싫다');
  });
});
```

모든 테스트를 통과한다.

이제 실제로 스토어에서 데이터를 가져오는 테스트를 추가해보자.

App.jsx

```jsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ListContainer from './ListContainer';
import { setTasks } from './actions';
import tasks from '../fixtures/tasks';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTasks(tasks));
  }, []);

  return (
    <div>
      <h1>To-do</h1>
      <ListContainer />
    </div>
  );
}
```

상태를 변경하기 위하여 useDispatch를 이용한다.

setTasks라는 action을 이용하여 tasks를 store에 저장한다.

actions를 아직 정의하지 않았으므로 에러가 발생한다.

actions.js

```js
export function setTasks(tasks) {
  return {
    type: 'setTasks',
    payload: {
      tasks,
    },
  };
}

export default {};
```

여기까지 진행해도 에러가 발생한다.

App.test.jsx 파일에서 useDispatch를 사용할 수 없기 때문에 발생하는 에러다.

먼저 reducer 부터 만들어보자.

reducer.js, reducer.test.js 파일을 생성하고 테스트부터 작성한다.

```jsx
import tasks from '../fixtures/tasks';
import reducer from './reducer';
import { setTasks } from './actions';

describe('reducer', () => {
  describe('setTasks', () => {
    it('스토어의 tasks를 변경한다.', () => {
      const state = reducer(
        {
          tasks: [],
        },
        setTasks(tasks),
      );
      expect(state.tasks).not.toHaveLength(0);
    });
  });
});
```

reducer가 없으므로 동작하지 않는다. reducer를 생성하자.

reducer.js

```js
const initialState = {};

export default function reducer(state = initialState, action) {
  if (action.type === 'setTasks') {
    const { tasks } = action.payload;
    return {
      ...state,
      tasks,
    };
  }
  return state;
}
```

간단하게 reducer를 만들었다. 테스트를 확인해보면 reducer 관련 테스트들을 모두 통과한다.

이제 남은 App.test.jsx를 처리하자.

useDispatch를 처리하기 위해 reducer까지 처리하고 돌아왔다.

App.test.jsx

```jsx
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import tasks from '../fixtures/tasks';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) =>
    selector({
      tasks,
    }),
  );

  it('tasks를 render 한다.', () => {
    const { container } = render(<App />);

    expect(container).toHaveTextContent('아무 일도 하기 싫다');
  });
});
```

`__mocks__/react-redux.js` 파일에 useDispatch를 추가한다.

react-redux.js

```js
export const useSelector = jest.fn();
export const useDispatch = jest.fn();
```

App.test.jsx에서 useDispatch가 동작하도록 mockImplementation을 실행한다.

이제 여기까지 모든 테스트가 완료되었다.

BDD

TDD와 유사하다. 상황에 따라 다르게 행동한다고 전제한다.

그래서 describe, context, it이라는 프레임을 가지고 테스트를 작성한다.

jest에서 context를 사용하려면 jest-plugin-context를 설치해야 한다.

주어진 context는 다음과 같다.

tasks가 있으면 tasks를 출력한다. tasks가 없다면 tasks가 없다는 메시지를 출력한다.

List.test.jsx

```jsx
import React from 'react';
import { render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('tasks가 있으면', () => {
    it('task를 render 한다', () => {
      const tasks = [
        { id: 1, title: '아무 일도 하기 싫다' },
        { id: 2, title: '건물 매입' },
      ];
      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('아무 일도 하기 싫다');
      expect(container).toHaveTextContent('건물 매입');
    });
  });

  context('tasks가 없다면', () => {
    const tasks = [];
    const { container } = render(<List tasks={tasks} />);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
```

tasks가 빈 배열일 경우 `할 일이 없어요!`를 출력한다.

List.jsx

```jsx
import React from 'react';

export default function List({ tasks }) {
  if (!tasks.length) {
    return <p>할 일이 없어요!</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
```

이렇게 하면 모든 테스트를 통과한다.

이제 각 task에 완료 버튼을 추가해보자.

먼저 List.test.jsx 를 수정한다.

```jsx
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  context('tasks가 있으면', () => {
    it('task를 render 한다', () => {
      const tasks = [
        { id: 1, title: '아무 일도 하기 싫다' },
        { id: 2, title: '건물 매입' },
      ];
      const { container } = render(<List tasks={tasks} />);

      expect(container).toHaveTextContent('아무 일도 하기 싫다');
      expect(container).toHaveTextContent('건물 매입');
    });

    it('task에 완료 버튼을 추가한다.', () => {
      const tasks = [
        { id: 1, title: '아무 일도 하기 싫다' },
        { id: 2, title: '건물 매입' },
      ];
      const { getAllByText } = render(<List tasks={tasks} />);

      const buttons = getAllByText('완료');
      fireEvent.click(buttons[0]);
    });
  });

  context('tasks가 없다면', () => {
    const tasks = [];
    const { container } = render(<List tasks={tasks} />);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
```

testing library에서 이벤트를 발생시키기 위해 `fireEvent`를 사용한다.

getAllByText를 이용하여 한 개 이상의 완료 버튼을 찾는다.

그리고 fireEvent를 사용하여 click 이벤트를 설정한다.

button 중에서 첫 번째 button을 클릭하는 이벨트를 발생시킨다.

여기까지 작성하면 getAllByText 셀렉터가 버튼을 찾지 못하기 때문에 테스트가 실패한다.

그래서 버튼을 추가한다.

List.jsx

```jsx
import React from 'react';

export default function List({ tasks }) {
  if (!tasks.length) {
    return <p>할 일이 없어요!</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
          <button type="button">완료</button>
        </li>
      ))}
    </ul>
  );
}
```

테스트를 통과하기 위해 List.jsx 파일에 완료 버튼을 추가했다.

일단 테스트는 모두 통과한다.

완료 버튼만 있는 것은 의미가 없다.

완료 버튼을 클릭했을 때 해당 task가 삭제되는 이벤트가 발생해야 한다.

우선 test에 버튼 클릭 이벤트를 추가하자.

```jsx
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import List from './List';

describe('List', () => {
  const handleClick = jest.fn();

  function renderList(tasks) {
    return render(<List tasks={tasks} onClick={handleClick} />);
  }

  context('tasks가 있으면', () => {
    it('task를 render 한다', () => {
      const tasks = [
        { id: 1, title: '아무 일도 하기 싫다' },
        { id: 2, title: '건물 매입' },
      ];
      const { container } = renderList(tasks);

      expect(container).toHaveTextContent('아무 일도 하기 싫다');
      expect(container).toHaveTextContent('건물 매입');
    });

    it('task에 완료 버튼을 추가한다.', () => {
      const tasks = [
        { id: 1, title: '아무 일도 하기 싫다' },
        { id: 2, title: '건물 매입' },
      ];
      const { getAllByText } = renderList(tasks);

      const buttons = getAllByText('완료');
      fireEvent.click(buttons[0]);

      expect(handleClick).toBeCalled();
    });
  });

  context('tasks가 없다면', () => {
    const tasks = [];
    const { container } = renderList(tasks);

    expect(container).toHaveTextContent('할 일이 없어요!');
  });
});
```

다시 한번 정리해보면 `완료`라는 텍스트가 있는 element를 찾아서 buttons에 저장한다.

fireEvent를 통해 해당 버튼을 클릭한다.

해당 버튼이 클릭됐을 때 호출되는 함수는 handleClick이다.

handleClick이 List.test.jsx 파일 내에 존재하지 않으므로 jest.fn()을 이용하여 일단 선언해준다.

그리고 handleClick을 List 컴포넌트에 전달한다.

실제로 List.jsx에도 동일하게 처리하자.

```jsx
import React from 'react';

export default function List({ tasks, onClick }) {
  if (!tasks.length) {
    return <p>할 일이 없어요!</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
          <button type="button" onClick={onClick}>
            완료
          </button>
        </li>
      ))}
    </ul>
  );
}
```

List 컴포넌트의 상태관리는 ListContainer에서 진행한다.

그래서 ListContainer에 테스트를 추가한다.

ListContainer.test.jsx

```jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) =>
    selector({
      tasks: [
        { id: 1, title: '아무 일도 하기 싫다' },
        { id: 2, title: '건물 매입' },
      ],
    }),
  );

  it('tasks를 render 한다.', () => {
    const { container, getAllByText } = render(<ListContainer />);

    expect(container).toHaveTextContent('아무 일도 하기 싫다');

    const buttons = getAllByText('완료');
    fireEvent.click(buttons[0]);
    expect(dispatch).toBeCalled();
  });
});
```

일단 미완성이지만 여기까지 작성하고 내용을 살펴보자.

container에서 완료 버튼을 클릭한다는 것은 dispatch 이벤트를 발생시킨다는 의미다.

그래서 handleClick이 아니라 dispatch를 호출한다.

dispatch도 jest.fn()으로 선언하고 useDispatch를 이용하여 dispatch를 이용하여 action을 호출한다.

이제 ListContainer.jsx에 dispatch를 구현하자.


