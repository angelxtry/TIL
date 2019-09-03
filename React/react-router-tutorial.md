# react-route-tutorial

## project 생성

create-react-app react-router-tutorial

cd react-router-tutorial

yarn add react-router bootstrap reactstrap

```js
// index.js
import 'bootstrap/dist/css/bootstrap.min.css';
```

## routing 초기 설정

app.js 파일

BrowserRouter를 import하여 적용한다.

```js
// src/app.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        app
      </div>
    </Router>
  );
};
```

## Home 파일을 추가하여 routing 설정
