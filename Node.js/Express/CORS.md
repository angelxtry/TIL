# CORS

CORS, Corss Origin Resoure Sharing의 약자다.

## intro

cookie, session을 사용할 필요가 있어서 써보고 있는데 막히는 부분이 너무 많았다.

그래서 관련 내용을 찾아봣다.

참조
[Cross Origin Resource Sharing - CORS](https://homoefficio.github.io/2015/07/21/Cross-Origin-Resource-Sharing/) 강추
[CORS (Cross-Origin Resource Sharing)-http://www.gurubee.net/](http://wiki.gurubee.net/display/SWDEV/CORS+%28Cross-Origin+Resource+Sharing%29)

```text
HTTP 요청은 기본적으로 Cross-Site HTTP Requests가 가능하다.

다시 말하면, <img> 태그로 다른 도메인의 이미지 파일을 가져오거나, <link> 태그로 다른 도메인의 CSS를 가져오거나, <script> 태그로 다른 도메인의 JavaScript 라이브러리를 가져오는 것이 모두 가능하다.

하지만 <script></script>로 둘러싸여 있는 스크립트에서 생성된 Cross-Site HTTP Requests는 Same Origin Policy를 적용 받기 때문에 Cross-Site HTTP Requests가 불가능하다.

AJAX가 널리 사용되면서 <script></script>로 둘러싸여 있는 스크립트에서 생성되는 XMLHttpRequest에 대해서도 Cross-Site HTTP Requests가 가능해야 한다는 요구가 늘어나자 W3C에서 CORS라는 이름의 권고안이 나오게 되었다.
```

뒤태지존님의 블로그에서 퍼온 글이다. 기본적인 내용인 것 같은데 이 글을 보고 처음 알았다.

CORS라는 용어만 들어보고, express에서 `cors`를 쓰면 처리된다 정도만 알고 있었다.

Cross-Site Http Request가 html에서는 가능하고 `<scirpt></script>` 스크립트에서 생성된 요청은 안되는 거였구나.

Same Origin이란 동일 도메인, 동일 port, 동일 프로토콜을 모두 의미한다고 한다.

그래서 같은 PC에서 localhost로 테스트를 할 때도 server, client의 포트가 달랐을 때 안되는 거였구나.

허허허 이제라도 알게되니 기쁘다!

CORS가 구현되지 않은 브라우저는 서로 다른 도메인간의 통신이 불가능하다. JSONP 같은 우회방법이 있기는 하다.

## CORS 요청의 종류

1 Simple
2 Preflight
3 Credential
4 Non-Credential

### 1. Simple Request

다음 3가지 조건은 모두 만족하면 Simple Request

1 GET, HEAD, POST 중의 한가지 TYPE
2 POST 방식일 경우 다음 3가지 중 하나여야만 한다.
  application/x-www-form-urlencoded
  multipart/form-data
  text/plain
3 커스텀 헤더를 전송하면 안된다.

`text/plain`을 제외하고는 어떤 의미인지, 어떻게 사용하는지 잘 모르겠다;

당장 필요하지 않으니 일단 패스.

Simple Request는 서버에 1번 요청하고, 서버도 1번 응답한다.

### 2. Preflight Request

Simple Request에 해당하지 않으면 브라우저는 Preflight Request 방식으로 서버에 요청을 보낸다.

Preflight Request 방식은 Preflight Request를 서버에 먼저 보내고 그에 따른 응답을 받은 후에 Actual Request를 보내고 다시 응답을 받는다.

Preflight Request는 OPTIONS 메서드를 사용하고, `Access-Control-Request-` 형태의 header로 전송한다.

예전에 Node.js로 간단한 서버를 만들었을 때 Request Method가 `OPTION`일 경우 header를 설정하여 Response를 보냈던 것이 이런 이유였었구나.

### 3. Request without Credential

CORS 요청은 기본적으로 Non-Credential 요청이다.

### 4. Request with Credential

```text
HTTP Cookie와 HTTP Authentication 정보를 인식할 수 있게 해주는 요청(?)
```

client에서 `axios.defaults.withCredentials = true;`라고 명시 하면 Request with Credential 방식으로 동작하는 것 같다(...)

이렇게 설정했을 경우 server(express)에서 `app.use(cors())` 설정만으로는 정상 동작하지 않는다.

```js
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

```

위와 같이 설정하면 정상 동작한다.

## fin

CORS에 대해 조금은 더 알게됐다.(아직 모르는게 더 많은 것 같지만 ㅠㅠ)

Preflight Request라는 것을 알게됐고, cookie나 session을 사용하기 위한 설정방법을 확인했다.

client, server 코드가 점점 친숙해지는 것 같아 기쁘기도 하고, 모르는 게 너무 많아서 안타깝기도 하다.
