# Cafe and Conquer Project History

프로젝트 폴더를 만들고 npm 기본 설정을 한다.

```js
mkdir CafeAndConquer-server
cd CafeAndConquer-server
npm init -y
```

## express app.js 파일 작성

`dotenv` 설치

```js
npm i dotenv
```

express를 비롯한 기본 package 설치

```js
npm i express morgan cookie-parser express-session
```

`app.js` 파일을 만들고 기본 설정을 한다.

```js
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.set("port", process.env.PORT || 8001);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

// 404 Error handling
app.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    message: "Not Found."
  });
});

// 500 Error handling
app.use((err, req, res) => {
  res.status(500).josn({
    code: 500,
    message: "Server Error.",
    error: err
  });
});

app.listen(app.get("port"), () => {
  console.log(`listen ${app.get("port")} port.`);
});

```

## sequelize 설정

mysql과 sequelize를 사용한다.

`sequelize-cli`를 global로 설치한다.

`sequelize`와 `mysql2`도 설치한다.

```js
npm i -g sequelize-cli
npm i sequelize mysql2
```

`sequelize-cli`를 이용하여 기본 설정을 한다.

```js
sequelize init
```

생성된 `config/config.json` 파일의 `development` 항목을 알맞게 수정한다.

다음 명령으로 database를 생성한다.

```js
sequelize db:create
```

database가 잘 만들어졌는지 확인한다.

`models/index.js` 파일을 수정한다.

```js
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;

```

`modules/cafe.js` 파일을 생성한다.

```js
```

`modules/user.js` 파일을 작성한다.

```js
```
