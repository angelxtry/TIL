# react hooks, axios 활용

react hooks를 공부하고 있다.

[How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)의 내용을 정리해본다.

react-hooks-fetch-data 프로젝트를 만들고 axios를 설치한다.

`creat-react-app react-hooks-fetch-data`

`yarn add axios`

## 1. 기초 과정

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

const HackerNews = () => {
  const [data, setData] = useState({ hits: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=redux"
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default HackerNews;

```

Hacker News의 데이터를 가져오는 샘플 코드다.
`useEffect`를 사용하여 render된 후에 데이터를 가져온다.
`useEffect` 내부에 `fetchData` 함수를 선언하고 비동기로 data를 받는다. data는 setData에 넘겨 state를 변경한다.
`axios(url)`은 GET request를 전송한다. response는 promise이고 request의 결과에 따라 fullfilled 또는 rejected 상태다.
fullfilled 상태일 때는 다음과 같은 object를 반환한다.

```js
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```

result.data에 원하는 데이터가 포함되어 있는 것을 확인할 수 있다.

`useEffect`에서 바로 axios를 이용하여 GET request를 보낸 것이 아니라 함수를 만들고 해당 함수를 호출하는 것이 신기했다.

```js
useEffect(async () => {
...
});
```

위와 같이 async 함수를 바로 작성하면 vscode/eslint에서 친절하게 경고 메시지를 보내준다.

이 코드가 react hooks와 axios 사용한 data fetch의 가장 기초다.

## 2. 조금 더! (검색어를 변경해보자)

```js
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const HackerNews = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      console.log(result);
      setData(result.data);
    };
    fetchData();
  }, [query]);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default HackerNews;
```

`useState`를 하나 더 추가하여 query를 만들었다.
query는 input tag에서 값을 입력받는다. input tag의 onChange 이벤트에 setQuery가 포함되어 있다.
`useEffect`의 두 번째 param인 dependency를 고려해야 한다. query가 변경될 때마다 axios를 이용하여 GET request를 호출하는 것이 목적이다. 따라서 dependency에 query를 추가하여 query가 변경될 때마다 `useEffect`가 다시 실행되도록 한다.
dependency를 빈 배열로 두면 query를 변경해도 useEffect가 다시 실행되지 않는다.
dependency에 query를 추가하면 input에 값을 입력할 때마다 useEffect가 호출되고 query에 전달된 입력 값이 axios에서 GET request로 호출된다.

## 3. 검색어를 변경하고 버튼 클릭으로 데이터 요청

```js
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const HackerNews = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [search, setSearch] = useState("redux");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${search}`
      );
      console.log(result);
      setData(result.data);
    };
    fetchData();
  }, [search]);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default HackerNews;
```

useState를 이용하여 search를 추가했다.
button을 추가하고 button을 클릭했을 때 setSearch가 호출된다.
setSearch에는 input에서 입력받은 query가 전달되고, useEffect에서는 query가 아닌 search에 의해 다시 render되도록 수정했다.
그래서 dependency도 query에서 search로 변경했다.
이제 query를 수정할 때마다 GET request를 보내고 값을 받아오는 것이 아니라 search가 변경될 때마다 실행된다.

### 개선

```js
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const HackerNews = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query="redux"`
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      console.log(result);
      setData(result.data);
    };
    fetchData();
  }, [url]);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default HackerNews;
```

원문을 보면 query와 search가 초기값도 동일하고 비슷한 역할을 하고 있어 혼란스러우므로 search를 삭제하고 url로 변경했다고 나와있다.
https로 시작하는 url이 두 번이나 사용된 것은 마음에 들지 않지만 query와 search가 혼동을 줄 수 있다는 것은 공감한다. 그리고 query과 url을 사용하는 것이 더 명확한 의미를 전달한다고 생각한다.

## 4. 로딩 상태 표시하기

```js
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const HackerNews = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query="redux"`
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(url);
      console.log(result);
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default HackerNews;
```

useState를 이용하여 isLoading을 추가했다.
useEffect에서 GET request를 보내기 전에 isLoading을 true로, response를 받으면 false로 변경한다.
그리고 jsx 코드에서 isLoading을 이용하여 출력을 결정한다.
이제 검색어를 입력하고 버튼을 클릭하면 잠깐동안 `Loading...`이라고 출력되는 것을 볼 수 있다.

## 5. 에러 처리

```js
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const HackerNews = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/sea?query="redux"`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        console.log(result);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
      {isError && <div>Something wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default HackerNews;
```

useState를 이용하여 isError를 추가하고, useEffect에서 setIsError를 사용했다.
GET request를 보내기 전까지는 isError가 false인 상태다.
try catch로 axios 코드를 감싸고 error가 발생할 경우 isError를 true로 변경한다.
그리고 jsx코드에 에러 처리 항목을 추가한다.
에러를 발생시키기 위해 url의 초기값을 에러가 발생하도록 수정했다.
이제 다시 브라우저를 실행해보면 Loading... 에서 Something wrong...으로 변경되는 것을 볼 수 있다.
input에 검색어를 입력하고 버튼을 클릭하면 Something wrong... 이 사라지고 정상적으로 데이터가 출력된다.
useEffect에 에러 처리를 넣은 것은 이렇게 다시 정상적인 결과를 받았을 경우 에러 상태를 벗어날 수 있게 하기 위해서다.

## 6. form 활용

```js
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const HackerNews = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query="redux"`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        console.log(result);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return (
    <Fragment>
      <form
        onSubmit={event => {
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default HackerNews;
```

input과 button만을 이용했던 것을 form으로 변경했다.
imput과 button을 form tag로 감싸고 button에 있던 setUrl을 form의 onSubmit 이벤트로 옮겼다.
button을 클릭했을 때 화면 전체가 re-render되지 않도록 onSubmit 이벤트에 event.preventDefault()를 설정했다.

## 7. Data fetch 코드를 custom hook으로 변경

기존의 코드에서 data fetch 부분을 분리한다.

```js
import { useState, useEffect } from "react";
import axios from "axios";

const useHackerNewsApi = () => {
  const [data, setData] = useState({ hits: [] });
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query="redux"`
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useHackerNewsApi;
```

```js
import React, { Fragment, useState } from "react";

import useHackerNewsApi from './useHackerNewsApi';

const HackerNews = () => {
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi();

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default HackerNews;
```

화면을 그리는 부분과 data fetch 로직을 분리했다.
이 부분도 매우 인상적이었다. custom hook이 이렇게 만들어지는구나 하는 느낌이 생겼다.
앞으로 코드를 작성할 때 최대한 로직과 뷰를 분리할 수 있도록 생각하면서 작성해야겠다는 생각이 들었다.

`useHackerNewsApi`를 좀 더 범용적으로 변경해보자.

```js
import { useState, useEffect } from "react";
import axios from "axios";

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useDataApi;
```

data와 url에서 사용하던 초기값을 hook의 param으로 변경했다.
이것만을 수정한 것으로도 이전과 다르게 다른 프로젝트에서 활용할 만한 코드가 됐다.
`useDataApi`를 사용하는 코드는 다음과 같다.

```js
import React, { Fragment, useState } from "react";

import useHackerNewsApi from "./useDataApi";

const HackerNews = () => {
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, doFetch] = useHackerNewsApi(
    `https://hn.algolia.com/api/v1/search?query="redux"`,
    { hits: [] }
  );

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isError && <div>Something wrong...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default HackerNews;
```

## 8. useDataApi custom hook에 Reducer hook 끼얹기

data를 fetch하는 동안 data, loading 그리고 error 같은 많은 state를 관리하게 된다.
이 state는 같은 관심사를 가진다. 따라서 모아서 같이 관리하는 것이 더 효과적이다.
Reducer hook를 이용하여 이 세가지를 묶어서 관리하도록 해보자.

Reducer hook은 state 객체와 state를 변경하는 함수를 반환한다.
이 함수를 dispatch라고 부른다. 이 함수는 type과 payload(optional)를 가진 action 객체를 이용하여 state를 변경한다.

Reducer hook을 사용해보자.

```js
import { useState, useEffect, useReducer } from "react";

const dataFetchReducer = (state, action) => {
  ...
}

...

const [state, dispatch] = useReducer(dataFetchReducer, {
  isLoading: false,
  isError: false,
  data: initialData
});
```

`useReducer`는 첫 번째 param으로 dataFetchReducer라는 함수를 가진다. 이 함수를 reducer function이라고 한다.
두 번째 param은 initial state다.

```js
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return new Error();
  }
}
```

reducer function인 dataFetchReducer는 위와 같이 생겼다.
switch case로 각 state를 정의하고 그에 맞는 객체를 반환한다.
data는 action.payload에 담아서 state에 전달한다.

이렇게 정의된 Reducer는 useEffect에서 사용한다.

```js
useEffect(() => {
  const fetchData = async () => {
    dispatch({ type: "FETCH_INIT" });

    try {
      const result = await axios(url);
      dispatch({ type: "FETCH_SUCCESS", payload: result.data });
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  };
  fetchData();
}, [url]);
```

useEffect에서 loading, error, data를 처리하는 코드를 모두 reducer로 처리했다.
useState를 이용하여 loading, error, data를 관리할 필요가 없어졌다.
마지막으로 return도 수정한다.

```js
return [state, setUrl];
```

return하는 state는 reducer의 state다. 이 state가 이전에 사용했던 객체를 대체한다.
참고로 변경전 코드는 다음과 같다.

```js
return [{ isLoading, isError, data }, setUrl];
```

전체 코드는 다음과 같다.

```js
import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
  }, [url]);

  return [state, setUrl];
};

export default useDataApi;

```

관심사를 하나로 모아서 관리하게 되어 코드가 간단해졌고, 실수할 가능성이 적어졌다.

## 9. Effect hook을 이용하여 data fetching 취소하기

Effect hook은 component가 unmount 될 때 동작하는 clean up function을 가질 수 있다.
clean up function은 return으로 구현한다.

```js
const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export default useDataApi;
```

didCancel이라는 변수를 만들어 true일 경우 fetch 로직이 실행되지 않도록 수정했다.
사실 실행 중인 fetch로직이 취소되는 것은 아니다. 단지 didCancel을 이용하여 앞으로 fetch로직이 실행되지 않도록 처리하는 것이다.

useState, useEfftct, useReducer를 이용하여 data fetching 하는 과정을 진행해봤다.
view와 fetch 로직을 분리하는 것, 분리한 fetch 로직을 좀 더 범용적으로 만드는 것, reducer를 이용하여 연관된 state를 하나로 모으는 것이 아주 재미있었다.

POST request를 처리하는 과정이 없어서 조금 아쉽다. 조금만 수정하면 만들어 볼 수 있을 것 같다.
다음 포스팅은 POST request를 만들어보는 과정이 되었으면 좋겠다.
