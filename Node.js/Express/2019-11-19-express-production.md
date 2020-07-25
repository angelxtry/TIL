# Express production 고려사항

## Express(index.js)

```js
if (process.env.NODE_ENV === 'production') {

  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}
```

combined

ip, user agent 등등

## Sequelize config

`config/config.js`

```js
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: process.env.DEV_DIALECT,
  },
  production: {
    username: process.env.PRD_USERNAME,
    password: process.env.PRD_PASSWORD,
    database: process.env.PRD_DATABASE,
    host: process.env.PRD_HOST,
    dialect: process.env.PRD_DIALECT,
    logging: false,
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_HOST,
    dialect: process.env.TEST_DIALECT,
  },
};
```

`production` 일 때 `logging: false` 해주는 것이 좋다.

## process manager 사용

pm2 설치

```js
> npm i pm2
> npm i -g pm2
```

```json
"script": {
  "start": "NODE_ENV=production PORT=80 pm2 start index.js"
}
```

### pm2 명령어

pm2 list

pm2 restart all(or pm2 restart <id>)

pm2 monit

pm2 kill

### 클러스터 모드

```json
"script": {
  "start": "NODE_ENV=production PORT=80 pm2 start index.js -i 0"
}
```

`-i` 뒤에 숫자 만큼 실행한다. 0일 경우 서버 CPU 코어 수 만큼 실행한다.

`-i -1` 코어 개수 -1개 만큼 실행한다.

## npm audit

```js
> npm audit
found 0 vulnerabilities
```

취약점이 있을 경우 `npm audit fix`

## 로그용 package

winstone

## 보안용 package

helmet, hpp

## connect-redis

