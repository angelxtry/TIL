# Webpack

- 2020-04-28

## 7. webpack output

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, Index</h1>
  <div id="root"></div>
  <a href="./about.html">about</a>
  <script src="./public/index_bundle.js"></script>
</body>
</html>
```

about.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, About</h1>
  <div id="root"></div>
  <a href="./index.html">index</a>
  <script src="./public/about_bundle.js"></script>
</body>
</html>
```

두 html 파일은 로드하는 script 파일명이 다르다.

이런 경우 webpack을 이용하여 처리하는 방법을 확인해보자.

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './source/index.js',
    about: './source/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]_bundle.js',
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

entry를 object로 변경하여 각 entry file을 명시한다.

그리고 output에서 filename을 지정한다.

`[name]`은 예약어다. entry의 key가 입력된다.

webpack을 실행하면 public 폴더에 다음의 두 파일이 생성된다.

```js
index_bundle.js
about_bundle.js
```

## 8. webpack plugin

loader가 webpack의 입력을 관리한다면 plugin은 webpack의 출력을 관리한다고 할 수 있다.

먼저 plugin package를 하나 설치하자.

```js
yarn add -D html-webpack-plugin
```

webpack.config.js 파일을 다음과 같이 수정한다.

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './source/index.js',
    about: './source/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

webpack을 실행하면 public 폴더에 자동으로 index.html 파일이 생성된다.

index.html을 확인해보면 bundle.js 파일 2개가 포함된 것을 확인할 수 있다.

html 파일들을 source로 이동하고 bundler.js를 로드하는 코드를 삭제한다.

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, Index</h1>
  <div id="root"></div>
  <a href="./about.html">about</a>
</body>
</html>
```

about.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello, About</h1>
  <div id="root"></div>
  <a href="./index.html">index</a>
</body>
</html>
```

이 파일들을 기반으로 html 파일을 자동으로 생성해보자.

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './source/index.js',
    about: './source/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './source/index.html',
      filename: 'index.html',
    }),
  ],
};
```

html-webpack-plugin에 생성자를 전달한다.

template은 로드할 파일, 즉 기반이 되는 파일이다. filename은 결과물이다.

이 상태에서 webpack을 실행하면 public/index.html이 다시 생성되고, html 파일을 확인해보면 source/index.html에 bundle.js 파일 2개가 모두 포함된 것을 확인할 수 있다.

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './source/index.js',
    about: './source/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './source/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
  ],
};
```

chunks라는 프로퍼티를 이용하여 entry의 index를 추가한 후 다시 webpack을 실행하면 public/index.html에 index_bundle.js 파일 하나만 포함된다.

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './source/index.js',
    about: './source/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './source/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './source/about.html',
      filename: 'about.html',
      chunks: ['about']
    }),
  ],
};
```

동일하게 about도 처리할 수 있다.

## 느낀 점, 배운 것

Webpack을 어떻게 사용해야하는지 간단한 사용법을 확인할 수 있었다.

아직 미숙하지만 webpack.config.js 파일을 이해할 수 있게 됐다.

module, plugin의 의미는 알게 되었다.

이제 인프런 강의로 넘어가보자.
