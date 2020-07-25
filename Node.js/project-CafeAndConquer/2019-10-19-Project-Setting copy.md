# Project Setting

## 1. git setting

### 1-1 github 페이지 생성

### 1-2 develop branch 생성

github 페이지의 좌측 중앙에 있는 "Branch: master" 버튼을 클릭하여 "develop"을 입력하고 엔터를 치면 `develop` branch가 생성된다.

Setting -> Branches로 들어가서 Default branch를 develop로 변경하고 Update 버튼을 클릭한다.

`Default branch changed to develop` 라는 메시지가 출력된다.

이 상태에서 github 페이지를 clone하면 develop branch 상태로 clone이된다.

```js
> git status
On branch develop
Your branch is up-to-date with 'origin/develop'.
nothing to commit, working tree clean
```

### 1-3 feature branch 생성

develop branch에서 feature branch를 생성한다.

feature branch의 이름은 `feature/[branch-name]`과 같은 형식으로 생성한다.

```js
> git checkout -b feature/npm-setting
```

`git branch`라는 명령으로 상태를 확인해볼 수 있다.

```js
> git branch
  develop
* feature/npm-setting
```

코드를 작성/수정한다.

### 1-4 feature branch push

코드 수정이 완료되었다면 add/commit을 수행한다.

commit 후 feature branch를 push 한다.

```js
> git push origin feature/[branch-name]
```

이렇게 하면 develop branch에서 새로운 `feature/[branch-name]` branch가 생성된다.

### 1-5 pull request

push한 `feature/[branch-name]`를 develop branch에 merge하기 위해 pull request를 진행한다.

보통 github repo 페이지에 접속하여 `Pull request` 버튼을 클릭하여 처리한다.

### 1-6 merge 완료 후

merge까지 잘 되었다면 local에서 develop branch로 이동한다.

```js
> git checkout develop
```

merge된 데이터를 가져온다.

```js
> git pull
```

local의 feature branch를 삭제한다.

```js
> git branch -D feature/[branch-name]
```

github repo의 해당 feature branch도 삭제한다.

```js
> git push origin :feature/[branch-name]
```

- 참고

[[GitHub] GitHub로 협업하는 방법[3] - Gitflow Workflow](https://gmlwjd9405.github.io/2018/05/12/how-to-collaborate-on-GitHub-3.html)

[Git 리모트(remote) 브랜치 생성 및 삭제하기](https://trustyoo86.github.io/git/2017/11/28/git-remote-branch-create.html)

## 2. project env setting

```js
> npm i dotenv express morgan cookie-parser express-session sequelize mysql2 cors
> npm i -D nodemon
```

## 3. sequelize, mysql setting

sequelize 기본 폴더, 파일을 생성한다.

```js
> sequelize init
```

`config/config.json` 파일에서 `development` 항목을 local mysql 환경에 맞게 수정한다.

mysql에 DB를 생성한다.

```js
> sequelize db:create
```

## 4. Table 생성

기본적인 `index.js` 파일의 내용을 작성한다.

```js
require('dotenv').config();
const express = require('express');

const port = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => {
  res.send('hello, Cafe and Conquer!');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

```

`models/indes.js`를 수정한다.

```js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

```

`models/user.js` 파일을 작성한다.

```js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  User.associate = (db) => {
    db.User.hasMany(db.Cafe, {
      foreignKey: { name: 'pioneer', allowNull: false },
      sourceKey: 'id',
    });
  };

  return User;
};

```

`models/cafe.js` 파일을 작성한다.

```js
module.exports = (sequelize, DataTypes) => {
  const Cafe = sequelize.define(
    'cafe',
    {
      cafeName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      point: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      open24hour: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      priceIceAmericano: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      enoughOutlets: {
        type: DataTypes.ENUM('LACK', 'NORMAL', 'MANY'),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  Cafe.associate = (db) => {
    db.Cafe.belongsTo(db.User, {
      foreignKey: { name: 'pioneer', allowNull: false },
      targetKey: 'id',
    });
  };

  return Cafe;
};

```

`models/index.js`파일에 `user`, `cafe`를 추가한다.

```js
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User = require('./user')(sequelize, Sequelize);
db.Cafe = require('./cafe')(sequelize, Sequelize);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

```

`index.js` 파일에 `sequelize`를 등록한다.

```js
require('dotenv').config();
const express = require('express');
const db = require('./models');

const port = process.env.PORT || 8080;

const app = express();
db.sequelize.sync();

app.get('/', (req, res) => {
  res.send('hello, Cafe and Conquer!');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

```

mysql에 해당 테이블이 잘 생성되었는지 확인한다.
