# nodebird project

express, mysql, sequelize로 nodebird 프로젝트를 진행해본다.

## 기본 설정

```js
mkdir nodebird
cd nodebird
npm init
npm i -g sequelize-cli
npm i mysql2 sequelize
```

`sequelize init`을 입력하여 `sequelize` 관련 폴더를 자동 생성한다.

`./config/config.json` 파일에서 `mysql` database의 기본 정보를 입력한다.

`sequelize db:create` 명령으로 database를 생성한다.

`npm i -D nodemon`으로 `nodemon`을 설치한다.

`express`를 비롯한 package를 설치한다.

```js
npm i express cookie-parser express-session morgan connect-flash pug
```

## express - app.js 작성

```js
const express = require("express");

const app = express();

app.listen(8001, () => {
  console.log(`8001번 포트에서 실행 중입니다.`);
});
```

express의 가장 단순한 구조다. 일단 이렇게 작성해 놓고 시작하자.

설치한 package를 불러온다.

```js
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const flash = require("connect-flash");

const app = express();

app.listen(8001, () => {
  console.log(`8001 포트에서 실행 중입니다.");
});
```

package에 따른 기본적인 middleware도 작성한다.

```js
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = reqire("express-session");
const flash = require("connect-flash");

const app = express();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("nodebirdsecret"));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "nodebirdsecret",
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(flash());

app.listen(8001, () => {
  console.log(`8001번 포트에서 실행 중입니다.`);
});
```

이 상태에서 `app.set()`을 이용하여 설정을 추가한다.

```js
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = reqire("express-session");
const flash = require("connect-flash");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 8001);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("nodebirdsecret"));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "nodebirdsecret",
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(flash());

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 실행 중입니다.`);
});
```

`app.set()`으로 설정한 값을 `app.get()`으로 사용할 수 있다.

## error 처리 미들웨어 추가

```js
app.use((req, res, next) => {
  const err = new Error("Not Found.");
  error.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
```

## dotenv 사용

보안을 위해 `dotenv` package를 사용한다.

```js
npm i dotenv
```

`./nodebird/` 경로에 `.env` 파일을 하나 생성한다.

```js
COOKIE_SECRET=nodebirdscret
```

이렇게 설정하고 `app.js` 파일에 다음의 코드를 추가한다.

```js
require("dotenv").config();
```

이제 `app.js` 파일에서 `.env`에 설정한 값을 `process.env.COOKIE_SECRET` 같은 형식으로 사용할 수 있다.

`.env` 파일은 github 같은 곳에 올리지 않고 서버에서만 사용한다.

## routes 설정

`./nodebird/routes` 폴더를 만들고 `index.js`, `user.js` 파일을 생성한다.

`app.js` 파일에서 해당 파일들을 불러온다.

```js
require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = morgan("dev");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__diranme, "views"));
app.set("port", process.env.PORT || 8001);

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public)));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "nodebirdsecret",
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(flash());

app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found.");
  error.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 실행 중입니다.`);
})
```

`./nodebird/routes/index.js` 파일을 작성한다.

```js
const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.render("profile", { title: "내 정보 - nodebird", user: null });
});

router.get("/join", (req, res) => {
  res.render("join", {
    title: "회원 가입 - nodebird",
    user: null,
    joinError: req.flash("joinError");
  });
});

router.get("/", (req, res, next) => {
  res.render("main", {
    title: "NodeBird",
    twits: [],
    user: null,
    loginError: req.flash("loginError")
  });
});

module.exports = router;
```

## sequelize 설정 (models/index.js)

`sequelize init` 명령으로 `models/index.js` 파일이 이미 생성되어 있다.

해당 파일의 내용을 지우고 단순하게 작성한다.

```js
const Sequelize = reqiure("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
```

`models` 폴더에 `user.js`, `post.js`, `hashtag.js` 파일을 추가한다.

`user.js` 파일 부터 작성해보자.

```js
module.exports = ((sequelize, DataTypes) => (
  sequelize.define("user", {

  });
));
```

`user` 테이블을 생성하기 위해 기본 뼈대를 작성했다.

```js
module.exports = ((sequelize, DataTypes) => (
  sequelize.define("user", {
    email: {

    },
    nick: {

    },
    password: {

    },
    provider: {

    },
    snsId: {

    }
  }, {
    timestamps: true,
    paranoid: true
  })
))
```

생성해야 할 컬럼들을 정의했다.

`timestamps: true`로 설정하면 입력일과 수정일이 자동으로 입력된다.

`paranoid: true`로 설정하면 삭제 시 삭제 일시가 저장된다. 다시 말해 해당 row를 삭제하는 대신에 삭제일이 기록된다. 복구할 상황이 발생할 때 유용하게 사용된다.

각 컬럼까지 정의해보자.

```js
module.exports = ((sequelize, DataTypes) => (
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    nick: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "local"
    },
    snsId: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true
  });
));
```

`post.js`를 작성하자.

```js
module.exports = ((sequelize, DataTypes) => (
  sequelize.define("post", {
    content: {
      type: DataTypes.STRING(140),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true
  });
));
```

`hashtag.js`도 작성한다.

```js
module.exports = ((sequelize, DataTypes) => (
  sequelize.define("hashtag", {
    title: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    }
  }, {
    timestamp: true,
    paranoid: true
  });
));
```

테이블을 생성하고 컬럼을 정의했으니 각 테이블 간의 관계를 설정한다.

테이블 간의 관계는 `models/index.js`에서 정의한다.

```js
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });

module.exports = db;
```

`User`, `Post`, `Hashtag`를 각각 불러왔다.

한 유저는 여러 개의 포스트를 작성할 수 있다. 그래서 1:N의 관계가 된다.

하나의 포스트에 여러 개의 해시태그를 붙일 수 있다. 그리고 동일한 해시태그가 여러 개의 포스트에 추가될 수 있다. 그래서 포스트와 해시태그는 N:N 관계를 가진다.

N:N관계는 `belongsToMany`로 표현한다.

N:N관계에서는 관계를 표현하는 테이블이 자동으로 추가된다. 이 관계 테이블의 이름을 `through`라는 키워드로 설정한다.

유저와 유저 사이에는 follower, following 관계가 형성된다.

코드로 표현하면 다음과 같다.

```js
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });

db.User.belongsToMany(db.User, {
  through: "Follow",
  as: "Followers",
  foreignKey: "followingId"
});
db.User.belongsToMany(db.User, {
  through: "Follow",
  as: "Following",
  foreignKey: "followerId"
});

module.export = db;
```

같은 유저끼리의 관계다.

관계 테이블의 이름은 `Follow`로 설정한다.

`as` 키워드로 이름을 붙인다. `Followers`는 일반인, `Following`은 유명인이다.

`foreignKey`로 상대의 id를 설정한다.

마지막으로 사용자와 포스트 사이에 좋아요를 추가한다.

```js
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag });
db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag });

db.User.belongsToMany(db.User, {
  through: "Follow",
  as: "Followers",
  foreignKey: "followingId"
});
db.User.belongsToMany(db.User, {
  through: "Follow",
  as: "Following",
  foreignKey: "followerId"
});

db.User.belongsToMany(db.Post, { through: "Like" });
db.Post.belongsToMany(db.User, { through: "Like" });

module.exports = db;
```

이제 생성한 테이블들을 `app.js`에 등록한다.

```js
const { sequelize } = require("./models");

const app = express();
sequelize.sync();
```

## 로그인 구현

### 관련 package 설치

```js
npm i passport passport-local passport-kakao bcrypt
```

### passport 설정

일단 `app.js`에 `passport`를 등록한다.

```js
const passport = require("passport");

const indexRouter = require("./routes");
```

`passport`라는 폴더를 생성하고 다음의 파일을 생성한다.

`index.js`

`localStrategy.js`

`kakaoStrategy.js`

`index.js` 부터 작성하자.

```js
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");

module.exports = (passport) => {
  local(passport);
  kakao(passport);
};
```

작성한 `index.js`도 `app.js`에 등록하자.

```js
const passport = require("passport");

const indexRouter = require("./routes");
const { sequelize } = require("./models");
const passportConfig = require("./passport");

const app = express();
sequelize.sync();
passportConfig(passport);
```

`app.js`에서 `passport` 패키지를 불러왔고, `passport` 폴더의 `index.js`를 `passportConfig`라고 설정했다.

`passportConfig`에 `passport`를 param으로 전달한다.

`passport`를 사용하려면 middleware를 등록해야 한다.

```js
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
```

두 가지 middleware는 이름대로 `passport`의 설정을 초기화하는 것과 local 로그인 관련 정보를 session에 저장하는 역할을 한다.

express의 session이 session을 만들고 `passport.session()`을 만들어진 session을 사용하기 때문에 `passport.session()`은 express의 session 설정보다 아래에 위치해야 한다.

이제 `localStrategy.js`를 작성하자.

```js
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(new LocalStrategy({

  }));
};
```

`localStrategy`의 기본 구조다.

```js
const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, async (email, password, done) => {

  }));
};
```

`LocalStrategy` 생성자의 첫 번째 param에 `urlencoded` middleware가 해석한 `req.body`의 값이 전달된다.

`email`은 `req.body.email` , `password`는 `req.body.password`이다.

두 번째 param은 callback이다.

첫 번째 param에서 전달받은 값과 성공시 처리 방식을 `done`에 정의한다.

`done`은 순서대로 에러, 성공, 실패를 인자로 받는다.

```js
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ email });
      if (exUser) {
        // 비밀번호 확인
      } else {
        done(null, false, { message: "가입되지 않은 이메일입니다." })
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
```

`LocalStrategy`이 두 번째 callback을 작성 중이다.

`async`로 함수를 선언했으므로 `try, catch`로 작성한다.

에러가 발생하면 `catch`에서 `done(err);`로 처리한다.

`done`의 param은 순서대로 err, 성공, 실패다.

`try`에서 일단 존재하는 email인지 확인한다.

email이 존재하지 않으면 다음과 같이 작성한다.

```js
done(null, false, { message: "가입되지 않은 이메일입니다." });
```

err에는 null, 성공에는 false, 실패에는 실패 message를 입력한다.

```js
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ email });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: "비밀번호가 일치하지 않습니다." });
        }
      } else {
        done(null, false, { message: "가입되지 않은 이메일입니다." });
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }));
};
```

`bcrypt.compare`는 비밀번호를 비교하여 `true/fasle`를 반환한다.

코드가 길어보이지만 한 단계씩 따라가보면 복잡하지 않다.

### auth routing - 회원가입

`/routes/auth.js` 파일을 생성한다.

```js
const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

module.exports = router;
```

router 파일의 기본 코드를 작성했다.

회원가입의 상세 기능을 구현한다.

```js
const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models");

const router = express.Router();

router.post("/join", async (req, res, next) => {
  const { email, nick, passworkd } = req.body;
  try {
    const exUser = await User.fineOne({ email });
    if (email) {
      req.flash("joinError", "이미 가입된 메일입니다.");
      return res.redirect("/join");
    }
    const hash = await bcrypt(password, 10);
    await User.create({
      email,
      nick,
      password: hash
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
```

`bcrypt`의 두 번째 param인 숫자가 높을 수록 암호화 강도가 높아진다.

```js
console.time("bcrypt time");
const hash = await bcrypt(password, 10);
console.timeEnd("becrypt time");
```

이런 식으로 암호화에 걸리는 시간을 측정할 수 있다.

### auth routing - 로그인

`/route/auth.js`를 계속 작성해보자.

```js
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { User } = require("../models");

const router = express.Router();

router.post("/join", async (req, res, next) => {
  try {
    const { email, nick, password } = req.body;
    const exUser = await User.findOne({ email });
    if (exUser) {
      req.flash("joinError", "이미 가입된 메일입니다.");
      return res.redirect("/join");
    }
    const hash = await bcrypt(password, 10);
    await User.create({
      email,
      nick,
      password: hash
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
  })(req, res, next);
});

module.exports = router;
```

`passport`의 `authenticate` 메서드를 활용한다.

첫 번째 인자를 `local`이다.

두 번째 인자는 `/passport/localStrategy.js`의 `done`을 받는다.

`done`은 에러, 성공, 실패의 순서로 param을 전달한다.

만약 에러(`authError`)가 존재한다면 에러 처리를 한다.

```js
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return res.redirect("/");
    }
  })(req, res, next);
});
```

만약 `user`가 false일 경우 로그인이 실패했다는 의미이므로 에러 메시지를 출력하면 `/`로 돌아간다.

```js
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return res.redirect("/");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});
```

`req.login`은 `passport`에서 제공하는 메서드다.

`user`를 첫 번째 param으로 전달하여 로그인한다.

로그인이 성공하면 `/`으로 redirect 한다.

로그인이 성공하면 session에 저장되고, `req.user`에서 사용자 정보를 확인할 수 있다.

### middleware.js

`/routes/middleware.js` 파일을 생성하자.

```js
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
```

`res, res, next`가 있으면 middleware다.

`passport`가 `req.login`, `req.logout` 같은 것을 추가해주듯이 `req.isAuthenticated()`도 추가해준다.

`req.isAuthenticated()`는 로그인이 되어 있으면 true, 아니면 false를 리턴한다.

이 미들웨어는 `/routes/auth.js`에서 활용할 수 있다.

```js
const express = requier("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const { User } = require("../models");

const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) =>{
  try {
    const { email, nick, password } = req.body;
    const exUser = await User.findOne({ email });
    if (exUser) {
      req.flash("/joinError", "이미 가입된 이메일 입니다.");
      return res.redirect("/join");
    }
    const hash = await bcrypt(password, 10);
    await User.create({
      email,
      nick,
      password: hash
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("/loginError", info.message);
      return res.redirect("/login");
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

module.exports = router;
```

마지막으로 로그아웃을 구현한다.

```js
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/");
});
```

## routes/index.js 보완

```js
const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middleware");
const router = express.Router();


router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile", { title: "내 정보 - nodebird", user: null });
});

router.get("/join", isNotLoggedIn, (req, res) => {
  res.render("join", {
    title: "회원 가입 - nodebird",
    user: null,
    joinError: req.flash("joinError");
  });
});

router.get("/", (req, res, next) => {
  res.render("main", {
    title: "NodeBird",
    twits: [],
    user: null,
    loginError: req.flash("loginError")
  });
});

module.exports = router;
```

## passport - serialize, deserialize

`/passport/index.js` 파일을 확인한다.

```js
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const { User } = require("../models");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ where: id })
      .then(user => done(null, user))
      .catch(error => done(error));
  });

  local(passport);
  kakao(passport);
};
```

사용자가 웹페이지에서 회원가입을 하고 로그인을 시도한다.

로그인은 `auth.js`의 login router를 통과한다.

`passport.authenticate("local", ...)`을 만나면 `passport`의 `localStrategy.js` middleware를 통과하게 된다.

`localStrategy.js`에서 성공하던 실패하던 callback 함수가 실행되고 다시 `auth.js`의 login router로 돌아오게 된다.

`req.login(user)`에 도달하면 `passport.serializeUser()`가 실행된다.

`req.login(user)` 가 실행되면 `req.user`가 session에 저장된다.

`serialize`는 `user` 정보를 그대로 session에 저장하는 것이 아니라 `user.id` 만 session에 저장한다.

`user.id`는 mysql에 저장되는 id를 의미한다.

로그인 된 사용자가 어떤 시도를 했을 때 `app.js`의 middleware를 모두 통과하게 된다.

```js
app.use(passport.initialize());
app.use(passport.session());
```

이 middleware들을 통과하면서 `passport.deserialize()`가 실행된다.

`deserialize`는 DB에서 id로 user를 찾아서 정보를 가져온다.

`serialize`는 로그인 할 때 한번 호출되지만, `deserialize`는 요청이 있을 때마다 매번 호출된다.

따라서 user의 내용을 따로 저장해두고 DB요청을 줄이는 것이 좋다.

```js
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");

const { User } = require("../models");

const user = {};

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    if (user[id]) {
      done(null, user[id])
    } else {
      User.fineOne({ where: id })
        .then(user => user[id] = user, done(null, user))
        .catch(error => done(error));
    }
  });

  local(passport);
  kakao(passport);
}
```

바로 위의 코드가 강좌에서 나온 코드인데 잘 이해되지 않아 내 스타일로 조금 수정했다.

```js
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");

const { User } = require("../models");

const userCache = {};

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passprt.deserializeUser((id, done) => {
    if (userCache[id]) {
      done(null, userCache[id]);
    } else {
      User.fineOne({ where: id })
        .then(user => {
          userCache[id] = user;
          done(null, user);
        })
        .catch(error => done(error));
    }
  });

  local(passport);
  kakao(passport);
}
```

## kakao 로그인 구현

`passport/kakaoStrategy.js` 파일에 코드를 작성한다.

`localStrategy.js`와 유사한 구조를 가진다.

```js
const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

module.exports = passport => {
  passport.use(new KakaoStrategy({

  }, async (accessToken, refreshToken, profile, done) => {

  }));
};
```

기본 구조다. kakao를 통해서 로그인하기 때문에 password가 필요없다.

```js
const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

module.exports = passport => {
  passport.use(new KakaoStrategy({
    clientId: "",
    callbackUrl: "/auth/kakao/callback"
  }, async (accessToken, refreshToken, profile, done) => {

  }));
}
```

`clientId`는 kakao id를 의미한다.

kakao에 로그인을 하면 `callbackUrl`로 인증정보가 전달된다.

일단 브라우저로 kakao 개발자 페이지에 접속하자.

간단하게 정보를 입력하고 나면 네 가지 key를 확인할 수 있다.

그 중 REST API 키를 `.env` 파일에 `KAKAO_ID` 항목으로 저장한다.

`.env`의 `KAKAO_ID`항목을 `kakaoStrategy.js`파일에서 불러온다.

```js
const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

module.exports = passport => {
  passport.use(new KakaoStrategy({
    clientId: process.env.KAKAO_ID,
    callbackUrl: "/auth/kakao/callback"
  }, async (accessToken, refreshToken, profile, done) => {

  }));
};
```

여기까지 작성되었다면 `routes/auth.js`에 kakao 관련 router를 추가한다.

```js
...

router.get("/kakao");
router.get("/kakao/callback");

```

`GET /auth/kakao`로 요청이 들어오면 `kakaoStrategy`가 로그인을 처리해야 한다.

```js
router.get("/kakao", passport.authenticate("kakao"));
```

kakao 로그인을 시도하면 그 응답을 `GET /kakao/callback` 으로 처리한다.

```js
router.get("/kakao/callback", passort.authenticate("kakao", {
  failureRedirect: "/",
}), (req, res) => {
  res.redirect("/");
})
```

kakao 로그인이 실패하면 `failureRedirect`가 실행되어 `/`로 이동한다.

로그인에 성공해도 `/`로 이동하도록 설정했다.

kakao 로그인을 시도했을 때 진행 순서는 다음과 같다.

일단 요청이 들어오면 `auth.js`의 다음 코드가 실행된다.

```js
router.get("/kakao", passport.authenticate("kakao"));
```

그 다음 `kakaoStrategy`가 실행된다.

그리고 다시 `auth.js`로 돌아와 다음의 코드가 실행된다.

```js
router.get("/kakao/callback", ... );
```

마지막으로 `kakaoStrategy`의 callback 함수가 실행된다.

callback 함수에서 하는 일은 kakao에서 보내준 사용자 정보를 DB에 저장하는 것이다.

```js
const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

module.exports = passport => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackUrl: "/kakao/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    const exUser = await User.find({
      where: { snsId: profile.id, provider: "kakao" }
    });
    if (exUser) {
      done(null, exUser);
    }
  }))
}
```

`exUser`가 존재한다면 `done(null, exUser);`를 실행한다.

이때 `done`을 실행하면 `req.user`에 `exUser`가 저장된다.

```js
const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

module.exports = passport => {
  passport.use(new KakaoStrategy({
    clientId: process.env.KAKAO_ID,
    callbackUrl: "/kakao/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    const exUser = await User.fineOne({
      where: { snsId: profile.id, provider: "kakao" }
    });
    if (exUser) {
      done(null, exUser);
    } else {
      const newUser = User.create({
        email: profile._json && profile._json.kaccount_email,
        nick: profile.displayName,
        snsId: profile.id,
        provider: "kakao"
      });
      done(null, newUser);
    }
  }));
};
```

callback이 async이므로 try, catch로 에러처리를 하자.

```js
const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

module.exports = passport => {
  passport.use(new KakaoStrategy({
    clientId: process.env.KAKAO_ID,
    callbackUrl: "/auth/kakao/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.fineOne({
        where: { snsId: profile.id, provider: "kakao" }
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = User.create({
          email: profile._json && profile._json.kaccount_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: "kakao"
        });
        done(null, newUser);
      }
    } catch {
      console.error(error);
      done(error);
    }
  }));
};
```
