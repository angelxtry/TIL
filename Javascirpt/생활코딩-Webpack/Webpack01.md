# Webpack

- 2020-04-28

## intro

Webpack. 당장은 급하지 않을 것 같아 미뤄두었는데 깔끔하게 한번 정리할 필요가 있다고 생각했다.

생활코딩 자료를 빨리 한번 정리하고 인프런의 강의를 보려고 한다.

아래 내용은 [생활코딩의 Webpack](https://www.opentutorials.org/module/4566) 내용을 정리한 것이다.

## 1. 모듈의 필요성

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="./source/hello.js"></script>
  <script src="./source/world.js"></script>
</head>
<body>
  <h1>Hello, Webpack</h1>
  <div id="root"></div>
  <script>
    document.querySelector('#root').innerHTML = word;
  </script>
</body>
</html>
```

```js
// source/hello.js
const word = 'Hello';
```

```js
// source/world.js
const word = 'World';
```

간단하게 웹 서버를 실행하기 위해 local-web-server package를 설치하고 실행한다.

```js
npm install -g local-web-server
```

local-web-server를 실행하고 <http://127.0.0.1:8000/>에 접속하면 Hello만 출력된다.

console을 확인해보면 에러가 발생한 것을 확인할 수 있다.

word가 두 js 파일에 모두 정의되어 있어서 문제가 발생했다.

이러한 문제점을 해결하기 위한 방안 중 하나가 모듈 시스템이다.

## 2. 모듈 적용

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, Webpack</h1>
  <div id="root"></div>
  <script type="module">
    import hello from './source/hello.js'
    import world from './source/world.js'
    document.querySelector('#root').innerHTML = hello + ' ' + world;
  </script>
</body>
</html>
```

```js
// source/hello.js
const word = 'Hello';

export default word;
```

```js
// source/world.js
const word = 'World';

export default word;
```

html 파일에서 script에 `type="module"`을 추가했다.

각 js 파일을 import 하고, js에서 파일에서는 export default를 추가했다.

import한 변수명으로 각 js 파일의 word를 사용할 수 있다.

chrome의 network 탭을 확인해보면 index.html 파일과 두 js 파일을 모두 다운받은 것을 확인할 수 있다.

이 방식의 단점은 import라는 문법이 최신 브라우저에서만 동작한다.

그리고 개별 파일이 많아질 경우 여러가지 부하가 높아질 수 있다.
