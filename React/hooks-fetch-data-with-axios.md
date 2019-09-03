# react hooks, axios 활용

react hooks를 공부하고 있다.

[How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)의 내용을 정리해본다.

react-hooks-fetch-data 프로젝트를 만들고 axios를 설치한다.

`creat-react-app react-hooks-fetch-data`
`yarn add axios`

## 기초 과정

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

## 조금 더! (검색어를 변경해보자)

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

## 검색어를 변경하고 버튼 클릭으로 데이터 요청

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

## 로딩 상태 표시하기

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

## 에러 처리

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

## form 활용

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
