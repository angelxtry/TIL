# Configure Jest for Testing JavaScript Applications 02

## 12 Use Jest Watch Mode to Speed Up Development

npm scripts에 `jest --watch`를 추가한다.

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "dev": "webpack-dev-server --mode=development",
  "build": "webpack --mode=production",
  "postbuild": "cp ./public/index.html ./dist/index.html",
  "start": "serve --no-clipboard --single --listen 8080 dist",
  "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|css|html|md)\"",
  "lint": "eslint --ignore-path .gitignore .",
  "validate": "npm run lint && npm test && npm run build",
  "setup": "npm install && npm run validate"
},
```

w 키를 입력하여 다양한 모드로 test를 효율적으로 진행할 수 있다.

## 13 Step through Code in Jest using the Node.js Debugger and Chrome DevTools

jest의 --runInBand flag를 node의 --inspect-brk와 함께 사용하여 Chrome의 debugger에서 테스트 할 수 있도록 시도해보자.

auto-scaling-test.js 파일에 다음과 같이 console.log를 추가하여 디버깅을 한다고 가정해보자.

```js
function getScale(node) {
  console.log(node);
  if (!node) {
    console.log('in here');
    return 1;
  }
  console.log('not in there');
  const parentNode = node.parentNode;

  const availableWidth = parentNode.offsetWidth;
  const actualWidth = node.offsetWidth;
  const actualScale = availableWidth / actualWidth;

  if (actualScale < 1) {
    return actualScale * 0.9;
  }
  return 1;
}
```

yarn test:watch를 실행하고 w -> p를 이용하여 filename으로 테스트를 제한하고, scaling을 입력하여 해당 테스트만 다시 실행할 수 있다.

이런 작업을 거치는 것은 번거롭다.

debugger를 이용해보자.

debugger를 추가한다.

```js
function getScale(node) {
  debugger;
  if (!node) {
    return 1;
  }
  const parentNode = node.parentNode;

  const availableWidth = parentNode.offsetWidth;
  const actualWidth = node.offsetWidth;
  const actualScale = availableWidth / actualWidth;

  if (actualScale < 1) {
    return actualScale * 0.9;
  }
  return 1;
}
```

그리고 npm scripts를 추가한다.

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch",
  "dev": "webpack-dev-server --mode=development",
  "build": "webpack --mode=production",
  "postbuild": "cp ./public/index.html ./dist/index.html",
  "start": "serve --no-clipboard --single --listen 8080 dist",
  "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|css|html|md)\"",
  "lint": "eslint --ignore-path .gitignore .",
  "validate": "npm run lint && npm test && npm run build",
  "setup": "npm install && npm run validate"
},
```

node에는 --inspect-brk라는 특수 플래그가 내장되어 있다.

노드가 프로세스를 시작하고 코드를 실행하기 전에 break point를 추가한다는 의미다.

그 다음 Chrome 디버거를 연결해여 해당 노드 프로세스를 디버깅 할 수 있다.

그 다음 jest의 바이너리에 대한 경로를 전달한다.

jest는 모든 파일을 병렬로 실행한다. 병렬로 실행하는 것은 새로운 node 프로세스를 생성하기 때문에 디버깅에서는 활용할 수 없다.

그래서 --runInBand 옵션을 추가한다.

--runInBand로 실행하면 모든 테스트가 동일한 node 프로세스에서 실행되므로 Chrome에서 해당 프로세스를 디버깅 할 수 있다.

마지막으로 --watch 옵션을 추가한다.

`yarn test:debug`를 실행한 후 Chrome을 열고 주소창에 chrome://inspect을 입력한다.

Remote Target 항목의 inspect를 클릭하면 새로운 창이 열리면서 debug를 진행할 수 있다.

debugger를 입력한 곳에서 Call Stack을 단계별로 확인할 수 있다.

또 다른 방법으로 Chrome의 inspect 창을 열고 Node icon을 클릭하면 같은 창이 열린다.

## 14 Configure Jest to Report Code Coverage on Project Files

npm scripts에 --coverage를 추가한다.

```json
"scripts": {
  "test": "jest --coverage",
  "test:watch": "jest --watch",
  "test:debug": "node --inspect-brk  ./node_modules/jest/bin/jest.js --runInBand --watch",
  "dev": "webpack-dev-server --mode=development",
  "build": "webpack --mode=production",
  "postbuild": "cp ./public/index.html ./dist/index.html",
  "start": "serve --no-clipboard --single --listen 8080 dist",
  "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|css|html|md)\"",
  "lint": "eslint --ignore-path .gitignore .",
  "validate": "npm run lint && npm test && npm run build",
  "setup": "npm install && npm run validate"
},
```

yarn test를 실행하면 테스트가 실행된 후에 coverage report가 출력된다.

그리고 coverage 폴더가 자동으로 생성된다.

cli에서 open coverage/lcov-report/index.html라고 입력하면 해당 내용을 browser로 확인할 수 있다.

coverage report를 확인해보면 test utils 같이 불필요한 폴더가 포함되어 있다.

그리고 index.js, app.js 등은 포함되어 있지 않다.

좀 더 정확한 coverage를 확인하기 위해 jest.config.js에 대상을 한정하는 설정을 추가한다.

```js
const path = require('path');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  collectCoverageFrom: ['**/src/**/*.js'],
};
```

yarn test를 다시 실행하면 원하는 대상으로 coverage report가 다시 생성된다.

coverage 폴더는 git ignore 에 포함시킨다.

## 15 Analyze Jest Code Coverage Reports

## 16 Set a Code Coverage Threshold in Jest to Maintain Code Coverage Levels

## 17 Report Jest Test Coverage to Codecov through TravisCI

## 18 Run Jest Watch Mode by Default Locally with is-ci-cli

## 19 Run Tests with a Different Configuration using Jest’s --config Flag and testMatch Option

## 20 Support Running Multiple Configurations with Jest’s Projects Feature
