# JWT

jsonwebtoken을 설치한다.

```cmd
npm i jsonwebtoken
```

dotenv를 설치하고 `.env` 파일에 JWT에서 사용할 secret key를 입력한다.

```txt
JWT_SECRET=jwtSecret
```

`.env`에 입력한 내용을 불러올 수 있게 app.js 파일에서 불러온다.

```js
require("dotenv").config();
```

routes/middleware.js 파일에 다음과 같이 입력한다.

```js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {

  } catch (err) {
    if (err) {

    }
  }
}
```

try에서 jwt인증을 진행하고 인증에 실패할 경우 catch가 실행된다.

상세한 부분을 구현해보자.

```js
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다."
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다."
    });
  }
};

```

`jwt.verify` 메서드로 token을 인증한다.
request의 headers에 authorization에 token이 저장되어 있다.
token과 JWT_SECRET을 jwt.verity 메서드에 전달하여 인증을 진행한다.
인증이 완료되면 next()가 호출된다.

인증이 실패는 크게 두 가지로 나뉜다.

하나는 token의 유효기간이 만료된 것이고, 다른 하나는 유효하지 않은 token일 경우다.

로그인 로직을 작성한다.

```js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { verifyToken } = require("./middleware");
const { urls, users } = require("../models");

const router = express.Router();

router.post("/token", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({
      where: { email: email }
    });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
      }
    } else {
      return res.status(401).json({
        code: 401,
        message: "Not Exist User."
      });
    }
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: "Server error"
    });
  }
});

module.exports = router;

```

users 테이블에서 request로 받은 email로 조회하여 user 정보를 불러온다.
user 정보가 로드되면 password를 비교한다.
password는 암호화 되어 있으므로 bcrypt.compare로 비교한다.
