# Express, Mysql, Sequelize

express, mysql, sequelize를 사용해보자.

## 1. Express Generator로 프로젝트 생성

```js
express learn-sequelize --view=pug
cd learn-sequelize
npm install
```

## 2. Sequelize 설치

sequelize와 mysql2도 함께 설치한다.

```js
npm i sequelize mysql2
npm i -g sequelize-cli
```

`sequelize-cli`를 global로 설치하면 터미널에서 `sequelize` command를 실행할 수 있다.

## 3. Sequelize 초기화

```js
sequelize init
```

위와 같이 입력하면 sequelize 관련 폴더 구조와 파일들이 생성된다.

```js
/config/config.json
/models
/migrations
/seeders
```

## 4. models 설정

`/models/index.js` 파일의 내용을 모두 지우고 다시 설정해본다.

### 4-1. 기본 설정

```js
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
```

`path`, `sequelize`를 불어온다.

`env`는 일단 `development`로 설정한다. 실제 운영환경이 되면 `process.env.NODE_ENV`의 값인 `production`으로 적용될 것이다.

### 4-2. config 정보 불러오기

```js
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
```

`/config/config.json` 파일에는 DB 접속정보가 저장되어 있다.

`config` 변수에 해당 파일의 정보 중 `development`의 정보를 불러온다.

### 4-3. sequelize 인스턴스 생성

```js
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
```

`const app = express();`와 같이 express 인스턴스를 만들듯이 `sequelize` 인스턴스를 생성한다.

### 4-4. db 객체 생성

```js
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
```

`db`라는 객체를 하나 생성하여 `Sequelize`와 `sequelize`를 넣어준다.

그리고 `db`를 export 한다.

## 5. mysql 설치

mysql은 5.7.27을 설치했다.

## 6. sequelize cli로 database 생성

`/config/config.json` 파일을 수정한다.

`development`의 `username`, `password`, `database`등을 설정한다.

터미널에서 다음과 같이 입력한다.

```js
sequelize db:create
```

`Database nodejs created.` 메시지가 출력된다.

## 7. model 추가

### 7-1. 테이블 별 파일 생성, index.js와 연결

`/models` 폴더에 `user.js`, `comment.js` 파일을 추가한다.

먼저 `user.js` 부터 만들어보자.

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {

  });
};
```

이렇게 작성하면 `user`라는 테이블이 생성된다.

`comment.js`도 동일하게 작성한다.

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("comment", {

  });
};
```

이 두 파일을 `/models/index.js`에서 불러온다.

```js
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

module.exports = db;
```

`require`문으로 파일을 불러오면서 동시에 `sequelize`, `Sequelize`를 전달했다.

이 param들은 `user.js`의 `sequelize`와 `DataTypes`와 연결된다.

### 7-2. 테이블 컬럼 구조 만들기

`user.js`를 계속 진행해보자.

`user`테이블에 추가될 컬럼은 이름, 나이, 결혼여부, 자기소개, 가입일 이다.

`user.js` 파일에 내용을 추가한다.

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    name: {

    },
    age: {

    },
    married: {

    },
    comment: {

    },
    created_at: {

    }
  }, {
    timestamps: false,
  });
};
```

일단 각 컬럼들을 정의할 준비를 해두었고 `sequelize.define()`의 세 번째 param을 추가했다.

세 번째 param의 `timestamps: false`는 `user` 테이블에 데이터가 insert 될 때마다 자동으로 time stamp를 입력하는 것을 false 처리 한 것이다.

세 번째 param에 `underscored: true`같은 항목을 추가할 수 있다.

이 구문의 컬럼명에 `_` 사용 여부를 의미한다.

`comment` 테이블은 작성자, 댓글내용, 작성일 컬럼을 정의한다.

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("comment", {
    commenter: {

    },
    comment: {

    },
    created_at: {

    }
  }, {
    timestamps: false,
    underscored: true
  });
};
```

### 7-3. 테이블 컬럼 상세 정의

`user` 테이블 부터 작성해보자.

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    age: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    married: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("now()")
    }
  }, {
    timestamps: false,
    underscored: true
  })
}
```

`comment` 테이블도 작성한다.

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("comment", {
    commenter: {

    },
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      aloowNull: false,
      defaultValue: sequelize.literal("now()")
    }
  }, {
    timestamps: false,
    underscored: true
  });
};
```

`commenter`는 추후에 다시 설정할 것이기에 일단 미완성으로 둔다.

### 7-4. 테이블 간 관계 설정

`comment` 테이블의 `commenter` 컬럼의 정의를 비워두었다.

`commenter`는 `user`테이블의 `name`과 연결된다.

`user`와 `comment`의 관계는 1:N이다.

`index.js` 파일에서 이 관계를 정의한다.

```js
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.User);

module.exports = db;
```

코드 그대로 살펴보면 `user`는 다수의 `comment`를 가지고 있고, `comment`는 하나의 `user`를 가진다는 것을 의미한다.

추가로 더 작성 해야만 하는 것들이 있다.

다음의 코드를 보자.

```js
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foreignKey: "commenter", soruceKey: "id" });
db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });

module.exports = db;

```

`User`와 `Comment` 사이의 관계를 상세하게 정의한다.

`Comment`에 속하는 `commenter`라는 컬럼은 `foreginKey`로 설정하고, 연결되는 `User`의 컬럼은 `id`다.

`User`에서 `id`는 명시하지 않았지만 자동으로 생성되는 key다.

`db.Comment.belongsTo`에서는 `soruceKey`가 아니라 `targetKey`를 명시한다.

컬럼명은 동일하고 `foreginKey`에는 `belongsTo` 항목의 컬럼을 적는다.

`sourceKey`, `targetKey`도 동일한 컬럼명을 명시하고 `hasMany` 항목의 컬럼을 적는다.

이렇게 설정했다면 `Comment.js` 파일에서 `commenter` 컬럼을 삭제한다. 삭제해도 관계에 설정이 되어 있어 자동으로 생성된다.

```js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("comment", {
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      aloowNull: false,
      defaultValue: sequelize.literal("now()")
    }
  }, {
    timestamps: false,
    underscored: true
  });
};
```

## 8. app.js에 sequelize 연결

`app.js` 파일에 sequelize를 연결한다.

```js
const { sequelize } = require("./models");

const app = express();
sequelize.sync();
```

이제 `npm start`로 서버를 실행하면 자동으로 테이블이 생성된다.

## 9. router 파일 추가

`/routes` 경로에 `comments.js`를 추가한다.

```js
const express = require("express");
const router = express.Router();

module.exports = router;
```

routes에 추가되는 router 파일들은 위의 코드가 기본이다.

여기에 기본적인 `/` 경로를 처리할 수 있는 뼈대만 만들어두자.

```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) =>{

});

module.exports = router;
```

`app.js` 파일에도 추가한다.

```js
const indexRouter = require("./routes");
const userRouter = require("./routes/users");
const commentRouter = require("./routes/comments");
const { sequelize } = require("./models");

const app = express();
sequelize.sync();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/comment", commentRouter);
```

`commentRouter`를 `require`로 로드하고 `app.use()`를 이용하여 router를 middleware로 설정했다.

## 10. users, comments router 기본 코드 작성

`users` router에 get, post routing을 처리할 수 있는 뼈대를 만든다.

```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {

});

router.post("/", (req, res, next) => {

});

module.exports = router;
```

`comments`도 동일하게 처리한다.

```js
const express = require("express");
const router = express.Router();

// GET /comment/xxx
router.get("/:id", (req, res, next) => {

});

module.exports = router;
```

`comments`에는 `url param`을 처리할 수 있도록 `:id`가 추가되어 있다.

`comments`의 뼈대를 더 추가한다.

```js
const express = require("express");
const router = express.Router();

router.get("/:id", (req, res, next) => {

});

router.patch("/:id", (req, res, next) => {

});

router.delete("/:id", (req, res, next) => {

});

router.post("/", (req, res, next) => {

});

module.exports = router;
```

url이 `/comments/all`과 `/comments/:id`가 있다면  all이 `:id`보다 앞에 위치해야 한다.

## 11. users, comments router 코드 추가 작성

```js
const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", (req, res, next) => {
  User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.post("/", (req, res, next) => {
  User.create({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married
  })
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
})

module.exports = router;
```

```js
const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");

router.get("/:id", (req, res, next) => {
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id }
    }
  })
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

module.exports = router;
```

`comments` router를 하나씩 살펴보자.

`commenter`의 모든 comment를 select하는 router다.

`commenter`는 `User`의 `id`와 연결되어 있다.

`findAll`에서 `include`를 사용하여 조회하면 `Comment`와 `User`의 정보가 포함되어 조회된다.

`include`를 지우고 `commenter`로 조회하면 `Comment`의 정보만 조회된다.

```js
const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");

router.get("/:id", (req, res, next) => {
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id }
    }
  })
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.post("/", (req, res, next) => {
  Comment.create({
    commenter: req.body.id,
    comment: req.body.comment
  })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});
```

`POST` routing을 추가했다.

`PATCH`도 추가해보자.

```js
const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");

router.get("/:id", (req, res, next) => {
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id }
    }
  })
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.post("/", (req, res, next) => {
  Comment.create({
    commenter: req.body.id,
    comment: req.body.comment
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.patch("/:id", (req, res, next) => {
  Comment.update({
    comment: req.body.comment
  }, {
    where: { id: req.params.id }
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});
```

`update`는 인자를 2개 받는다. 하나는 `update`하고자 하는 데이터이고, 두 번째는 `where`조건이다.

마지막으로 `DELETE`를 추가한다.

```js
const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");

router.get("/:id", (req, res, next) => {
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id }
    }
  })
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.post("/", (req, res, next) => {
  Comment.create({
    commenter: req.body.id,
    comment: req.body.comment
  })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.patch("/:id", (req, res, next) => {
  Comment.update({
    comment: req.body.comment
  }, {
    id: req.body.id
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.delete("/:id", (req, res, next) => {
  Comment.destroy({
    where: { id: req.param.id }
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});
```

`select, insert, update, delete`에 해당하는 `sequelize` 메서드를 다 사용해봤다.

`select - findAll`

`insert - create`

`update - update`

`delete - destory`
