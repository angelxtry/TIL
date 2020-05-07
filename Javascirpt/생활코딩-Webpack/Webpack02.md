# Webpack

- 2020-04-28

## 3. webpack 적용

webpack, webpack-cli를 설치한다.

```js
yarn add -D webpack webpack-cli
```

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

```js
// source/index.js
import hello from './hello.js';
import world from './world.js';
document.querySelector('#root').innerHTML = hello + ' ' + world;
```

index.js 파일이 js 파일들의 시작점, 즉 entry file이 된다.

다음의 command를 입력해보자.

```js
npx webpack --entry ./source/index.js --output ./public/index_bundle.js
```

에러가 없다면 public 폴더에 index_bundle.js 파일이 생성되었을 것이다.

html 파일에 생성된 index_bundle.js 파일을 추가한다.

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
  <script src="./public/index_bundle.js"></script>
</body>
</html>
```

웹 서버를 통해 html 파일을 다시 확인해보면 정상 동작하는 것을 확인할 수 있다.

index_bundle.js 파일을 만들면서 구형 브라우저도 지원가능하고 js 파일도 하나로 합칠 수 있었다.

## 4. webpack config

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './source/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index_bundle.js',
  },
};
```

`webpack.config.js` 파일을 생성했다. 다음과 같이 입력하면 실행된다.

```js
npx webpack --config webpack.config.js
```

설정 파일명을 webpack.config.js 라고 명명했다면 `npx webpack` 만 실행해도 동작한다.

## 5. webpack mode

webpack은 development, production, none mode가 있다.

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './source/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index_bundle.js',
  },
};
```

development mode로 실행하면 output 파일에 format이 추가된다.

webpack.config.prod.js 파일명으로 production용 설정 파일을 하나 더 만들어두기도 한다.

## 6. webpack loader

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./source/style.css">
</head>
<body>
  <h1>Hello, Webpack</h1>
  <div id="root"></div>
  <script src="./public/index_bundle.js"></script>
</body>
</html>
```

css 파일을 추가했다.

```css
body {
  background-color: lightblue;
  color: tomato;
}
```

css 파일을 기존 js 파일처럼 하나로 합쳐보자.

먼저 package를 설치한다.

```js
yarn add -D style-loader css-loader
```

webpack.config.js 파일을 수정한다.

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './source/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
};
```

index.js 파일에 css를 import 한다.

```js
// source/index.js
import hello from './hello.js';
import world from './world.js';
import css from './style.css'

document.querySelector('#root').innerHTML = hello + ' ' + world;
```

webpack을 실행하면 css 파일이 index_bundler.js 파일에 합쳐진다.

이 상태로 브라우저에서 index.html을 확인하면 아직 css가 적용되지 않았다.

html에 css를 적용하기 위해서는 `style-loader`가 필요하다.

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './source/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

다시 webpack을 실행하고 브라우저에서 확인해보면 css가 적용된 것을 확인할 수 있다.

network 탭을 보면 css 파일 까지 하나로 통합되었기 때문에 html, index_bundler.js 파일만 다운받는다.

elements 탭을 보면 css의 내용이 style tag로 추가되어 있는 것도 확인 가능하다.

use에 나열된 loader들은 우측에서 좌측 순서로 실행된다.

그래서 style-loader와 css-loader의 순서가 바뀌면 에러가 발생한다.
