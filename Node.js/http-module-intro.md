# http

server.js 파일을 만든다.

http module을 가져온다.

```js
const http = require("http");
```

http module이 http web server를 만들 수 있게 해준다.

```js
const http = require("http");

http.createServer((req, res) => {
  console.log("서버 실행!");
}).listen(8080, () => {
  console.log("8080 포트에서 실행 중입니다.");
});

```

http의 기본 포트는 80, https의 기본 포트는 443이다.

80이나 443은 생략이 가능하지만 다른 포트 번호를 사용하면 생략할 수 없다.

위 코드를 실행해보면 "8080 포트에서 실행 중입니다."라는 메시지가 출력된다.

req와 res는 request와 response다.

다음과 같이 코드를 작성해보자.

```js
const http = require("http")l

http.createServer((req, res) => {
  console.log("요청이 왔어요!");
  res.write("<h1>Hello node!</h1>");
  res.end("<p>Hello server!</p>");
}).listen(8080, () => {
  console.log("8080 포트에서 실행 중입니다.");
});
```

요청이 들어오면 res 객체를 이용하여 응답을 만들어 준다.
res.write를 이용하여 응답을 작성하고, res.end를 사용하여 write와 동일하게 응답을 작성하면서 응답의 마지막이라고 알려준다.
write는 여러 번 사용할 수 있다. 그래서 응답의 마지막에는 항상 end를 사용해야 한다.

브라우저를 이용하여 `http://localhost:8080`에 접속하면 res의 내용이 출력된다.
그리고 터미널을 확인하면 "요청이 왔어요!"가 두 번 실행된 것을 확인할 수 있다.
브라우저를 갱신하여 다시 요청할 때마다 두번 씩 실행된다.

서버 코드를 다시 수정해보자.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log("요청이 왔어요!");
  res.write("<h1>Hello node!</h1>");
  res.end("<p>Hello server!</p>");
}).listen(8080);

server.on("listening", () => {
  console.log("8080 포트에서 실행 중입니다.");
});

server.on("error", error => {
  console.error(error);
});

```

server라는 변수를 하나 만들었고 `listening`, `error` 같은 이벤트를 붙였다.
http server도 이벤트 기반으로 동작한다.

## 파일을 읽어 응답하기

res.write()로 모든 응답을 처리하기에는 한계가 있다.
일단 server1.html 파일을 하나 만들고 해당 파일을 읽어 응답으로 보내는 코드를 작성해보자.

```js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("요청이 왔어요!");
  fs.readFile("./server1.html", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.end(data);
  });
}).listen(8080);

server.on("listen", () => {
  console.log("8080 포트에서 실행 중입니다.");
});

server.on("error", error => {
  console.log(error);
});

```

다시 브라우저로 요청을 보내면 server1.html 파일을 읽어 해당 내용을 응답으로 전달한다.

readFile로 읽은 데이터는 data에 저장된다.
이 데이터는 buffer 형식이다. 그래서 사람이 읽을 수 있게 변환하려면 toString() 같은 함수로 변환을 해야 한다.
하지만 응답을 보낼 때 변환을 해서 보낼 필요는 없다.
브라우저가 알아서 변환을 한다.

## cookie와 session

브라우저와 server가 데이터를 주고 받는 방법 중 cookie가 있다.

먼저 server에서 브라우저로 cookie를 전달해보자.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Set-Cookie": "thisis=cookie" })
  res.end("This is Cookie!");
}).listen(8080);

server.on("listening", () => {
  console.log("8080 포트에서 실행 중입니다.");
})

server.on("error", error => {
  console.log(error);
});

```

브라우저에서 server에 접속하면 "This is Cookie!" 메시지가 출력된다.
브라우저의 Network 창에서 localhost를 클릭하면 headers 정보를 확인할 수 있다.

`Response Headers` 항목에 `Set-Cookie`와 `thisis=cookie`를 확인할 수 있다.
브라우저는 header를 통해 이런 정보를 받으면 브라우저에 cookie 정보를 기록한다.
Application tab -> Storage -> Cookies를 클릭해보면 저장된 cookie를 확인할 수 있다.

cookie를 수신한 후 브라우저에서 다시 요청을 보내고 Network tab을 확인해보면 cookie가 Request Header에 붙어서 다시 server로 전달되는 것을 확인할 수 있다.

server에서 cookie를 확인해보자.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.headers.cookie);
  res.writeHead(200, { "Set-Cookie": "thisis=cookie" });
  res.end("This is Cookie");
}).listen(8080);

server.on("listening", () => {
  console.log("8080 포트에서 실행 중입니다.");
})

server.on("error", error => {
  console.log(error);
});

```

request에서 전달된 cookie는 req.headers.cookie로 확인한다.
cookie를 브라우저에 전달한 후에 다시 요청이 왔을 때 cookie에 thisis=cookie가 포함된 것을 확인할 수 있다.

## cookie로 식별하기

간단한 form을 출력하는 html을 만들고 server에서 응답으로 제공한다.

server.html은 다음과 같다.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>쿠키&세션 이해하기</title>
</head>
<body>
<form action="/login">
    <input id="name" name="name" placeholder="이름을 입력하세요" />
    <button id="login">로그인</button>
</form>
</body>
</html>
```

```js
const http = require("http");
const fs = require("fs");

const server = createServer((req, res) => {
  if (req.url.startsWith("/login")) {
    res.end("login action");
  } else {
    fs.readFile("./server.html", (err, data) => {
      if (err) {
        console.log(err);
      }
      res.end(data);
    });
  }
});
...

```

url에 따라 분기 처리를 했다.

`/login` url로 접속하면 "login action"이라는 문자열이 출력되고, 그 외의 url로 접속하면 `server.html` 파일을 읽어 응답으로 보낸다.

여기에 url, querystring 모듈을 추가한다.

```js
const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/login")) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    console.log(query, name);
  } else {
    fs.readFile("./server.html", (err, data) => {
      res.end(data);
    });
  }
}).listen(8080);
...
```

req.url이 `/login?name=cookie` 처럼 입력되면 url.parse는 `?`뒤의 항목만 잘라서 query에 입력한다.

querystring.parse는 key=value를 parsing하여 name에 저장한다.

url과 querystring을 좀 더 테스트 해보자.

```js
const { query } = url.parse(req.url);
const { name, age } = qs.parse(query);
console.log("query: ", query);
console.log("name: ", name);
console.log("age: ", age);

```

이렇게 작성하고 브라우저에서 다음과 같은 url을 전달한다.

`/login?name=cookie&age=23`

query는 `name=cookie&age=23`, name: cookie, age: 23이 된다.

다시 기존 코드로 돌아가서 `/login`의 응답으로 cookie를 전송해보자.

```js
res.writeHead(200, {"Set-Cookie":
  `name=${encodeURIComponent(name)};
  Expires=${expires.toGMTString()};
  HttpOnly;
  Path=/`
});
res.end();
```

(보기 좋게 줄바꿈을 했다. 에러가 발생하면 줄바꿈을 없애자.)

위와 같이 cookie를 생성하여 전달했다.
`encodeURIComponent`는 name이 한글이라도 encode하여 제대로 전달할 수 있다.
Expires는 cookie의 만료기간, HttpOnly는 브라우저의 javascript에서 이 cookie를 사용할 수 없다는 것을 의미한다.
`Path=/`는 `/` 이하의 경로에서 이 cookie를 사용할 수 있다는 것을 의미한다.

브라우저에서 form에 이름을 입력하고 버튼을 클릭하면 server에서 cookie를 만들어 전송하게 된다.
브라우저에서 확인해보면 cookie를 확인할 수 있다.

### 리다이렉션

header를 작성할 때 응답코드를 302로 입력하고 Location을 지정하면 해당 url로 리다이렉트 된다.

```js
res.writeHead(302, {
  Location: '/',
  { "Set-Cookie":
  `name=${encodeURIComponent(name)};
  Expires=${expires.toGMTString()};
  HttpOnly;
  Pht/`
  }
});
```

### 최종 결과물

```js
const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map(v => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const server = http
  .createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
      });
      res.end();
    } else if (cookies.name) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`${cookies.name}님. 안녕하세요.`);
    } else {
      fs.readFile("./server.html", (err, data) => {
        if (err) {
          console.log(err);
        }
        res.end(data);
      });
    }
  })
  .listen(8080);

server.on("listen", () => {
  console.log("8080 포트에서 실행 중입니다.");
});

server.on("error", error => {
  console.log(error);
});

```

parseCookies라는 함수를 만들어서 cookie를 object로 변환할 수 있게 했다.
최초로 서버에 접속하면 server.html 파일의 내용을 읽어 응답으로 제공한다.
브라우저의 form에서 요청이 오면 해당 내용을 parsing하여 cookie로 만들어 브라우저에 전달한다.
브라우저에서 다시 요청이 오면 cookie의 name을 읽어 else if 의 분기가 실행된다.

## 메모리 세션 구현해보기

```js
const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map(v => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

const server = http
  .createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query);
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
      const randomInt = +new Date();
      session[randomInt] = {
        name,
        expires
      };
      res.writeHead(302, {
        Location: "/",
        "Set-Cookie": `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
      });
      res.end();
    } else if (
      cookies.session &&
      session[cookies.session] &&
      session[cookies.session].expires > new Date()
    ) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`${session[cookies.session].name}님. 안녕하세요.`);
    } else {
      fs.readFile("./server.html", (err, data) => {
        if (err) {
          console.log(err);
        }
        res.end(data);
      });
    }
  })
  .listen(8080);

server.on("listen", () => {
  console.log("8080 포트에서 실행 중입니다.");
});

server.on("error", error => {
  console.log(error);
});

```

이전에 구현했던 cookies는 브라우저에서 확인해보면 name=이름 을 평문으로 확인할 수 있다.
그래서 session이란 것을 임시로 만들어서 사용해보자.

```js
const session = {};
```

session 이라는 빈 객체를 하나 만들었다.

```js
const randomInt = +new Date();
```

randomInt에는 현재 시간을 숫자로 변환한 값이 저장된다. `+new Date()`에서 `+`가 Date를 숫자로 변환하는 역할을 한다.

```js
session[randomInt] = {
  name,
  expires
};
```

randomInt라는 값을 key로 사용하여 name, expires 같은 값들을 넣어 저장한다. 다른 값들을 더 저장해도 된다.

```js
res.writeHead(302, {
  Location: "/",
  "Set-Cookie": `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`
});
```

생성한 session을 cookie로 전달하는 것이 아니라 session의 key인 randomInt 만을 브라우저에 전달한다.

```js
else if (
  cookies.session &&
  session[cookies.session] &&
  session[cookies.session].expires > new Date()
) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`${session[cookies.session].name}님. 안녕하세요.`);
}
```

해당 값을 cookies를 통해 수신하면 cookie에 해당 값이 있는지 확인하고 해당 값이 있다면 활용할 수 있다.

## REST API

다음 다섯 가지 type이 있다.

GET
POST

PUT
PATCH
DELETE
