# Configure Jest for Testing JavaScript Applications

## Install and Run Jest

jest를 설치한다.

```js
yarn add -D jest
```

scripts에 test를 추가한다.

```json
"scripts": {
  "test": "jest",
  "dev": "webpack-dev-server --mode=development",
  "build": "webpack --mode=production",
  "postbuild": "cp ./public/index.html ./dist/index.html",
  "start": "serve --no-clipboard --single --listen 8080 dist",
  "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|css|html|md)\"",
  "lint": "eslint --ignore-path .gitignore .",
  "validate": "npm run lint && npm run build",
  "setup": "npm install && npm run validate"
},
```

yarn test를 실행하면 test가 없다고 출력된다.

`__tests__/example.js`를 생성한다.

```js
test('it works', () => {});
```

위와 같이 입력하면 자동으로 다음과 같이 수정된다.

```js
test.todo('it works');
```

다른 경로에 파일을 생성하고 파일명을 `example.test.js` 와 같이 생성하면 jest에 인식되어 테스트로 실행된다.

`__tests__` 폴더에 파일이 있을 경우 `example.js`와 같이 파일명에 test가 없어도 jest에서 인식한다.

npm scripts 중 validate에 jest를 추가하자.

```json
"validate": "yarn lint && yarn test && yarn build"
```

## Compile Modules with Babel in Jest Tests

shared 폴더 하위에 `__tests__` 폴더를 생성하고 utils.js 파일을 추가한다.

```js
import {getFormattedValue} from '../utils';

test('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0');
});
```

위와 같이 입력한 후 yarn test를 실행하면 다음과 같은 에러가 발생한다.

```js
Jest encountered an unexpected token

This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.

By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".

Here's what you can do:
  • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/en/ecmascript-modules for how to enable it.
  • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
  • If you need a custom transformation specify a "transform" option in your config.
  • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

You'll find more details and examples of these config options in the docs:
https://jestjs.io/docs/en/configuration.html
```

jest가 module system을 처리할 수 없어서 발생하는 오류다.

이 프로젝트는 Webpack을 사용한다. Webpack을 이용하여 import 구문을 이해하도록 만들 수 있다.

```js
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: 'babel-loader',
},
```

Webpack에서 babel-loader를 사용하므로 브라우저에서 지원하지 않는 구문도 컴파일 할 수 있다.

.babelrc.js 파일의 설정은 다음과 같다.

```js
const isProd = String(process.env.NODE_ENV) === 'production'

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: false}],
    '@babel/preset-react',
    [
      '@emotion/babel-preset-css-prop',
      {
        hoist: isProd,
        sourceMap: !isProd,
        autoLabel: !isProd,
        labelFormat: '[filename]--[local]',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
```

여기서 `{modules: false}`를 삭제한 후 다시 테스트를 실행해보면 테스트가 성공하는 것을 확인할 수 있다.

```js
const isProd = String(process.env.NODE_ENV) === 'production'

module.exports = {
  presets: [
    ['@babel/preset-env'],
    '@babel/preset-react',
    [
      '@emotion/babel-preset-css-prop',
      {
        hoist: isProd,
        sourceMap: !isProd,
        autoLabel: !isProd,
        labelFormat: '[filename]--[local]',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
```

이렇게 구성하면 jest를 동작하게 할 수 있지만 Webpack으로 tree shaking의 이점을 얻을 수 없다.

```js
const isProd = String(process.env.NODE_ENV) === 'production';
const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    ['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],
    '@babel/preset-react',
    [
      '@emotion/babel-preset-css-prop',
      {
        hoist: isProd,
        sourceMap: !isProd,
        autoLabel: !isProd,
        labelFormat: '[filename]--[local]',
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
```

여기서 꼭 짚고 넘어가야 할 것은 jest가 .babelrc를 자동으로 확인한다는 것이다.

참고:

require는 export된 모든 모듈을 접근하기 때문에 Tree Shaking이 안된다.

.babelrc preset에 “modules”: false로 하면 import, export은 require, module.exports로 바뀌지 않는다. 그래서 반드시 modules: false로 설정해야 Tree Shaking이 가능하다.

## Configure Jest’s Test Environment for Testing Node or Browser Code

jest는 Node 환경이거나 Browser 환경으로 설정할 수 있다.

둘 중에 하나를 테스트 환경으로 설정하려면 jestconfig.js 파일에 설정을 추가해야 한다.

jest는 JSDOM이라는 모듈을 사용하여 browser 환경을 시뮬레이트 한다.

```js
import {getFormattedValue} from '../utils';

test('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0');
});

console.log(window);
```

window라는 object를 console.log로 출력했다.

테스트는 정상적으로 동작한다. 우리는 실제로 node 환경에서 테스트를 실행했지만, window object는 JSDOM에 의해 추가되어 정상적으로 동작한다.

cli에서 강제로 node 환경으로 설정하여 테스트를 실행하면 다음과 같이 에러가 발생한다.

```js
> yarn test --env=node
yarn run v1.22.10
$ jest --env=node
 PASS  src/__tests__/example.js
 FAIL  src/shared/__tests__/utils.js
  ● Test suite failed to run

    The error below may be caused by using the wrong test environment, see https://jestjs.io/docs/en/configuration#testenvironment-string.
    Consider using the "jsdom" test environment.

    ReferenceError: window is not defined

      5 | });
      6 |
    > 7 | console.log(window);
        |             ^
      8 |

      at Object.<anonymous> (src/shared/__tests__/utils.js:7:13)
```

jest.config.js 파일을 생성하여 다음과 같이 작성한다.

```js
module.exports = {
  testEnvironment: 'jest-environment-node',
}
```

이렇게 작성한 후 yarn test를 실행하면 `--env=node`를 포함하여 실행하는 것도 동일하게 동작한다.

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
};
```

jest.config.js를 위와 같이 변경하면 jsdom 환경에서 test가 실행된다.

## Support Importing CSS files with Jest’s moduleNameMapper

shared/__tests__/auto-scaling-text.js 파일을 추가하고 다음과 같이 작성한다.

```js
import React from 'react';
import {render} from '@testing-library/react';
import AutoScalingText from '../auto-scaling-text';

test('renders', () => {
  render(<AutoScalingText />);
});
```

`@testing-library/react`를 설치했다.

이 상태로 jest를 실행하면 다음과 같은 오류가 발생한다.

```js
> yarn test
yarn run v1.22.10
$ jest
 PASS  src/shared/__tests__/utils.js
 FAIL  src/shared/__tests__/auto-scaling-text.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    This usually means that you are trying to import a file which Jest cannot parse, e.g. it's not plain JavaScript.

    By default, if Jest sees a Babel config, it will use that to transform your files, ignoring "node_modules".

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/en/ecmascript-modules for how to enable it.
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/en/configuration.html

    Details:

    /Users/gomidev/Project/JavaScript/testing-javascript/jest-cypress-react-babel-webpack-v1/src/shared/auto-scaling-text.module.css:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){.auto-scaling-text {
                                                                                             ^

    SyntaxError: Unexpected token '.'

      1 | import React from 'react'
      2 | import PropTypes from 'prop-types'
    > 3 | import styles from './auto-scaling-text.module.css'
        | ^
      4 |
      5 | function getScale(node) {
      6 |   if (!node) {

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1350:14)
      at Object.<anonymous> (src/shared/auto-scaling-text.js:3:1)
```

하단의 내용을 읽어보면 css를 import하는 과정에서 에러가 발생한 것을 알 수 있다.

import 하는 파일은 commonjs 파일이 아니라 css 파일이다.

이러한 상황은 `moduleNameMapper`를 이용하여 .css로 끝나는 모듈을 다른 모듈로 매핑하여 해결할 수 있다.

jest.config.js 파일을 다음과 같이 수정한다.

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
};
```

.css를 `./test/style-mock.js`에 연결한다고 moduleNameMapper를 이용하여 설정했다.

그리고 실제로 test/style-mock.js 파일을 생성한 후 test를 실행하면 테스트가 성공한다.

auto-scaling-text.js 파일에 console.log를 이용하여 styles을 출력한 후 테스트를 실행해보자.

```js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './auto-scaling-text.module.css';

console.log(styles);
```

style-mock.js 파일에서 아무것도 export 하지 않았기에 `{}`로 출력된다.

style-mock.js 파일에서 무엇이든 export하면 styles를 통해 출력할 수 있다.

## Support using Webpack CSS Modules with Jest

webpack과 함께 CSS 모듈을 사용하는 경우 `identity-obj-proxy`를 사용하면, 테스트에 css module property name을 추가할 수 있다.

__tests__/auto-scaling-text.js 파일을 다음과 같이 수정한 후 테스트를 실행해보자.

```js
import React from 'react';
import {render} from '@testing-library/react';
import AutoScalingText from '../auto-scaling-text';

test('renders', () => {
  const {debug} = render(<AutoScalingText />);
  debug();
});
```

결과는 다음과 같다.

```js
yarn run v1.22.10
$ jest
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
  ● Console

    console.log
      <body>
        <div>
          <div
            data-testid="total"
            style="transform: scale(1,1);"
          />
        </div>
      </body>

      at debug (node_modules/@testing-library/react/dist/pure.js:107:13)
```

AutoScalingText 컴포넌트 코드는 다음과 같다.

```js
function AutoScalingText({children}) {
  const nodeRef = React.useRef();
  const scale = getScale(nodeRef.current);
  return (
    <div
      className={styles.autoScalingText}
      style={{transform: `scale(${scale},${scale})`}}
      ref={nodeRef}
      data-testid="total"
    >
      {children}
    </div>
  );
}
```

참조는 원래 DOM에 추가되지 않는다.

하지만 div의 className에서 styles를 사용하고 있으나, test에서 styles-mock.js로 대체했기 때문에 class가 출력되지 않았다.

Webpack을 통해 build time에 className에 autoScalingText라도 출력할 수 있으면 좋을 것이다.

그래서 identity-obj-proxy를 설치한다.

```js
yarn add -D identity-obj-proxy
```

jest.config.js 파일에 다음과 같이 설정을 추가한다.

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  }
}
```

.module.css로 끝나는 module은 identity-obj-proxy를 적용한다.

이렇게 설정하면 실제로 auto-scaling-text.module.css를 가져 오는 대신 identity-obj-proxy로 대체한다.

테스트를 실행하면 다음과 같이 출력된다.

```js
yarn run v1.22.10
$ jest
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
  ● Console

    console.log
      <body>
        <div>
          <div
            class="autoScalingText"
            data-testid="total"
            style="transform: scale(1,1);"
          />
        </div>
      </body>

      at debug (node_modules/@testing-library/react/dist/pure.js:107:13)
```

div에서 다음과 같이 className를 사용하였었다.

```js
className={styles.autoScalingText}
```

그래서 테스트 결과로 `class="autoScalingText"`가 출력되었다.

이렇게 이름이라도 출력하면 테스트가 훨씬 수월해진다.

## Generate a Serializable Value with Jest Snapshots

snapshot test는 assertion 관리, 작성을 단순화하는 방법이다.

jest 문서에 따르면, snapshot artifact는 코드 변경과 함께 commit 되어야 하고, 코드 리뷰의 일부로 검토되어야 한다.

jest는 코드 리뷰 동안 사람이 읽기 좋은 snapshot을 만들기 위해 pretty-format을 사용한다.

후속 테스트에서 렌더링 된 출력을 이전 snapshot과 간단하게 비교한다.

결과가 일치하지 않으면 test runner는 버그가 발견되었다고 판단하거나, 구현이 변경되었으니 shapshot을 업데이트해야 한다고 판단한다.

other/super-heros.js 파일을 다음과 같이 작성한다.

```js
const superHeros = [
  {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
  {name: 'Apogee', powers: ['gravity control', 'fly']},
  {name: 'Blazestone', powers: ['control of fire', 'pyrotechnic discharges']},
  {name: 'Frozone', powers: ['freeze water']},
  {name: 'Mr. Incredible', powers: ['physical strength']},
  {name: 'Elastigirl', powers: ['physical strength']},
  {name: 'Violet', powers: ['invisibility', 'force fields']},
  {name: 'Dash', powers: ['speed']},
  // {name: 'Jack-Jack', powers: ['shapeshifting', 'fly']},
];

function getFlyingSuperHeros() {
  return superHeros.filter(hero => {
    return hero.powers.includes('fly');
  });
}

export {getFlyingSuperHeros};
```

other/__tests__/super-heros.js 파일에 테스트를 추가한다.

```js
import {getFlyingSuperHeros} from '../super-heros';

test('returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros();
  console.log(flyingHeros);
  expect(flyingHeros).toEqual([
    {name: 'Dynaguy', powers: ['disintegration ray', 'fly']},
    {name: 'Apogee', powers: ['gravity control', 'fly']},
  ]);
});
```

console.log를 통해 object를 미리 확인할 수 있고 이를 통해 테스트를 작성할 수 있다.

superHeros에 hero가 추가되면 test도 변경되어야 한다.

console.log를 사용하여 결과를 확인하고, test에 해당 결과를 붙여 넣는 과정은 번거롭다.

이 과정을 snapshot을 통해 쉽게 처리할 수 있다.

```js
import {getFlyingSuperHeros} from '../super-heros';

test('returns super heros that can fly', () => {
  const flyingHeros = getFlyingSuperHeros();
  console.log(flyingHeros);
  expect(flyingHeros).toMatchSnapshot();
});
```

toEqual로 테스트하는 것이 아니라 toMatchSnapshot을 사용했다.

다시 테스트를 수행하면 다음과 같이 출력된다.

```js
yarn run v1.22.10
$ jest
 PASS  src/shared/__tests__/utils.js
 PASS  src/__tests__/example.js
 PASS  src/other/__tests__/super-heros.js
  ● Console

    console.log
      [
        { name: 'Dynaguy', powers: [ 'disintegration ray', 'fly' ] },
        { name: 'Apogee', powers: [ 'gravity control', 'fly' ] }
      ]

      at Object.<anonymous> (src/other/__tests__/super-heros.js:5:11)

 › 1 snapshot written.
 PASS  src/shared/__tests__/auto-scaling-text.js

Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 4 passed, 4 total
Tests:       1 todo, 3 passed, 4 total
Snapshots:   1 written, 1 total
Time:        1.998 s, estimated 2 s
```

other/__tests__ 폴더에 __snapshots__ 폴더와 super-heros.js.snap 파일이 자동으로 생성된다.

super-heros.js.snap 파일은 다음과 같다.

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`returns super heros that can fly 1`] = `
Array [
  Object {
    "name": "Dynaguy",
    "powers": Array [
      "disintegration ray",
      "fly",
    ],
  },
  Object {
    "name": "Apogee",
    "powers": Array [
      "gravity control",
      "fly",
    ],
  },
]
`;
```

jest는 assertion에 전달하는 object를 문자열로 직렬화하고 그 문자열을 snap 파일에 저장한다.

console.log로 출력한 데이터를 c&p 하는 과정을 수동으로 진행하지 않아도 된다.

이 상태에서 Jack-Jack이 추가되었다고 가정합시다.

다시 테스트를 실행하면 이전에 생성된 snapshot과 새로 전달받은 데이터가 일치하지 않는다고 결과가 출력된다.

그리고 다음의 도움말이 같이 출력됩니다.

```js
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or run `yarn test -u` to update them.
```

`yarn test -u`로 테스트를 다시 실행합니다.

```js
yarn run v1.22.10
$ jest -u
 PASS  src/__tests__/example.js
 PASS  src/other/__tests__/super-heros.js
  ● Console

    console.log
      [
        { name: 'Dynaguy', powers: [ 'disintegration ray', 'fly' ] },
        { name: 'Apogee', powers: [ 'gravity control', 'fly' ] },
        { name: 'Jack-Jack', powers: [ 'shapeshifting', 'fly' ] }
      ]

      at Object.<anonymous> (src/other/__tests__/super-heros.js:5:11)

 › 1 snapshot updated.
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js

Snapshot Summary
 › 1 snapshot updated from 1 test suite.

Test Suites: 4 passed, 4 total
Tests:       1 todo, 3 passed, 4 total
Snapshots:   1 updated, 1 total
Time:        1.944 s, estimated 2 s
Ran all test suites.
✨  Done in 2.97s.
```

snap 파일을 보면 데이터가 추가된 것을 확인할 수 있습니다.

snapshot은 생성이 오래 걸릴 수 있고 별도의 파일이 생성되기에 검토하기 어렵다는 문제점을 가지고 있습니다.

그래서 toMatchInlineSnapshot을 사용합니다.

yarn test를 실행하면 toMatchInlineSnapshot에 assertion이 전달받은 데이터가 자동으로 추가된다.

하지만 테스트가 실패한다. 실패한 이유는 __snapshots__ 폴더에 이전 snapshot이 존재하기 때문이다.

`yarn test -u`로 실행하면 변경 사항에 따라 업데이트가 바로 반영된다. 그리고 이전 snap 파일은 자동으로 삭제된다.

---

DOM node에 snapshot을 적용해보자.

shared/__tests__/calculator-display.js 파일을 추가하자.

```js
import React from 'react';
import {render} from '@testing-library/react';
import CalculatorDisplay from '../calculator-display';

test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />);
  console.log(container.innerHTML);
});
```

테스트를 실행하면 다음과 같이 출력된다.

```js
console.log
<div class="css-lq9ahq-calculator-display--CalculatorDisplay"><div class="autoScalingText" style="transform: scale(1,1);" data-testid="total">0</div></div>
```

prettier 등을 이용하여 위 내용을 정렬할 수도 있지만 toMatchInlineSnapshot을 활용하면 더 쉽게 해결할 수 있다.

```js
import React from 'react';
import {render} from '@testing-library/react';
import CalculatorDisplay from '../calculator-display';

test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />);
  console.log(container.innerHTML);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="css-lq9ahq-calculator-display--CalculatorDisplay"
      >
        <div
          class="autoScalingText"
          data-testid="total"
          style="transform: scale(1,1);"
        >
          0
        </div>
      </div>
    </div>
  `);
});
```

calculator-display.js에 id를 추가해보자.

```js
import React from 'react'
import PropTypes from 'prop-types'
import AutoScalingText from './auto-scaling-text'
import {getFormattedValue} from './utils'

function CalculatorDisplay({value, ...props}) {
  const formattedValue = getFormattedValue(
    value,
    typeof window === 'undefined' ? 'en-US' : window.navigator.language,
  )

  return (
    <div
      {...props}
      id="calculator-display"
      css={{
        position: 'relative',
        color: 'white',
        background: '#1c191c',
        lineHeight: '130px',
        fontSize: '6em',
        flex: '1',
      }}
    >
      <AutoScalingText>{formattedValue}</AutoScalingText>
    </div>
  )
}

CalculatorDisplay.propTypes = {
  value: PropTypes.string.isRequired,
}

export default CalculatorDisplay
```

yarn test를 실행하면 추가된 id 때문에 테스트는 실패한다.

`yarn test -u`로 실행하면 다음과 같이 정상 동작한다.

```js
import React from 'react';
import {render} from '@testing-library/react';
import CalculatorDisplay from '../calculator-display';

test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="css-lq9ahq-calculator-display--CalculatorDisplay"
        id="calculator-display"
      >
        <div
          class="autoScalingText"
          data-testid="total"
          style="transform: scale(1,1);"
        >
          0
        </div>
      </div>
    </div>
  `);
});
```

## Test an Emotion Styled UI with Custom Jest Snapshot Serializers

```js
import React from 'react';
import {render} from '@testing-library/react';
import CalculatorDisplay from '../calculator-display';

test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="css-lq9ahq-calculator-display--CalculatorDisplay"
      id="calculator-display"
    >
      <div
        class="autoScalingText"
        data-testid="total"
        style="transform: scale(1,1);"
      >
        0
      </div>
    </div>
  `);
});
```

container.firstChild를 assertion에 전달하고 `yarn test -u`로 실행하면 위와 같이 코드가 자동으로 생성된다.

이때 calculator-display.js에서 스타일을 수정하면 테스트에 에러가 발생한다.

CSS 변경이 컴포넌트에 주는 영향을 인식할 수 있도록 컴포넌트 snapshot에 CSS 스타일을 포함시킬 수 있다.

먼저 jest-emotion을 설치한다.

```js
yarn add -D @emotion/jest
```

그리고 jest.config.js 파일에 `snapshotSerializors`를 추가한다.

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
};
```

`yarn test -u`를 실행하면 다음과 같이 코드가 자동생성된다.

```js
import React from 'react';
import {render} from '@testing-library/react';
import CalculatorDisplay from '../calculator-display';

test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      color: white;
      background: #1c191c;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

    <div
      class="emotion-0"
      id="calculator-display"
    >
      <div
        class="autoScalingText"
        data-testid="total"
        style="transform: scale(1,1);"
      >
        0
      </div>
    </div>
  `);
});
```

toMatchInlineSnapshot 안에 css 코드도 함께 포함된 것을 확인할 수 있다.

그리고 자동으로 생성되는 class 명이 emotion-0으로 변경된 것도 확인할 수 있다.

이후 CSS가 변경되어도 CSS 내용이 직렬화되어 자동으로 추가되므로 변경사항을 더 쉽게 확인할 수 있다.

## Support Custom Module Resolution with Jest moduleDirectories

Webpack의 resolve.modules를 설정하면 프로젝트의 공통 utils에 쉽게 접근할 수 있다.

jest에서도 moduleDirectories를 설정하면 동일한 구성을 할 수 있다.

__tests__/calculator.js 파일을 생성하고 다음과 같이 작성한다.

```js
import React from 'react';
import {render} from '@testing-library/react';
import Calculator from '../calculator';

test('renders', () => {
  render(<Calculator />);
});
```

yarn test로 실행하면 다음과 같은 에러가 발생한다.

```js
yarn run v1.22.10
$ jest
 PASS  src/__tests__/example.js
 PASS  src/other/__tests__/super-heros.js
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 FAIL  src/__tests__/calculator.js
  ● Test suite failed to run

    Cannot find module 'calculator-display' from 'src/calculator.js'

    Require stack:
      src/calculator.js
      src/__tests__/calculator.js

      1 | import React from 'react'
      2 | import PropTypes from 'prop-types'
    > 3 | import CalculatorDisplay from 'calculator-display'
        | ^
      4 | import styles from './calculator.module.css'
      5 |
      6 | function CalculatorKey({className = '', ...props}) {

      at Resolver.resolveModule (node_modules/jest-resolve/build/index.js:306:11)
      at Object.<anonymous> (src/calculator.js:3:1)

 PASS  src/shared/__tests__/calculator-display.js

Test Suites: 1 failed, 5 passed, 6 total
Tests:       1 todo, 4 passed, 5 total
Snapshots:   2 passed, 2 total
Time:        3.028 s
Ran all test suites.
error Command failed with exit code 1.
```

calculator-display.js 파일을 찾을 수 없어 에러가 발생했다.

calculator.js 파일을 확인해보자.

```js
import React from 'react'
import PropTypes from 'prop-types'
import CalculatorDisplay from 'calculator-display'
import styles from './calculator.module.css'
```

Webpack의 설정에 의해 shared 폴더 내에 있는 calculator-display를 위와 같이 import 할 수 있다.

```js
resolve: {
  modules: ['node_modules', path.join(__dirname, 'src'), 'shared'],
},
```

jest는 상대경로가 아닌 위와 같은 방식으로 import 한 module을 찾지 못한다.

그래서 jest.config.js 파일에 추가 설정이 필요하다.

```js
const path = require('path');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared'],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
};
```

Webpack의 resolve.modules의 내용과 동일하게 추가한다.

이렇게 설정한 후 테스트를 다시 실행하면 정상 동작한다.

## Configure Jest to Run Setup for All Tests with Jest setupFilesAfterEnv

jest를 사용하다보면 테스트를 시작하기 전에 설정을 추가해야 할 경우가 있다.

jest는 setupFilesAfterEnv 설정을 통해 이를 해결한다.

```js
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Calculator from '../calculator';

test('renders', () => {
  render(<Calculator />);
});

test('the clear button switches from AC to C when there is an entry', () => {
  render(<Calculator />);
  const clearButton = screen.getByText('AC');

  fireEvent.click(screen.getByText(/3/));
  expect(clearButton.textContent).toBe('C');

  fireEvent.click(clearButton);
  expect(clearButton.textContent).toBe('AC');
});
```

AC 버튼이 있다. 3이라는 버튼을 클릭하면 clearButton은 C로 변경된다. clearButton을 클릭하면 C -> AC로 변경된다.

마지막 AC를 BC로 변경하여 테스트를 실행하면 다음과 같은 에러 메시지가 출력된다.

```js
 FAIL  src/__tests__/calculator.js
  ● the clear button switches from AC to C when there is an entry

    expect(received).toBe(expected) // Object.is equality

    Expected: "BC"
    Received: "AC"

      15 |
      16 |   fireEvent.click(clearButton);
    > 17 |   expect(clearButton.textContent).toBe('BC');
         |                                   ^
      18 | });
      19 |

      at Object.<anonymous> (src/__tests__/calculator.js:17:35)

Test Suites: 1 failed, 5 passed, 6 total
Tests:       1 failed, 1 todo, 5 passed, 7 total
Snapshots:   2 passed, 2 total
Time:        2.492 s
Ran all test suites.
error Command failed with exit code 1.
```

좀 더 좋은 에러메시지를 출력하기 위해 @testing-library/jest-dom을 설치한다.

test 파일에 jest-dom을 추가한다.

```js
import * as jestDOM from '@testing-library/jest-dom';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Calculator from '../calculator';

expect.extend(jestDOM);

test('renders', () => {
  render(<Calculator />);
});

test('the clear button switches from AC to C when there is an entry', () => {
  render(<Calculator />);
  const clearButton = screen.getByText('AC');

  fireEvent.click(screen.getByText(/3/));
  expect(clearButton).toHaveTextContent('C');

  fireEvent.click(clearButton);
  expect(clearButton).toHaveTextContent('BC');
});
```

jest-dom은 expect extension이다. `expect.extend(jestDOM);`을 추가하면 새로운 assertion이 추가된다.

```js
expect(clearButton.textContent).toBe('C');

expect(clearButton).toHaveTextContent('C');
```

clearButton dom의 textContent를 직접 값과 비교하는 대신 toHaveTextContent를 사용할 수 있다.

다시 테스트를 실행해보면 다음과 같은 에러 메시지가 출력된다.

에러 메시지가 이전 보다 좀 더 유용해졌다.

```js
 FAIL  src/__tests__/calculator.js
  ● the clear button switches from AC to C when there is an entry

    expect(element).toHaveTextContent()

    Expected element to have text content:
      BC
    Received:
      AC

      18 |
      19 |   fireEvent.click(clearButton);
    > 20 |   expect(clearButton).toHaveTextContent('BC');
         |                       ^
      21 | });
      22 |

      at Object.<anonymous> (src/__tests__/calculator.js:20:23)

Test Suites: 1 failed, 5 passed, 6 total
Tests:       1 failed, 1 todo, 5 passed, 7 total
Snapshots:   2 passed, 2 total
Time:        2.529 s
Ran all test suites.
error Command failed with exit code 1.
```

모든 테스트 파일에 jest-dom을 추가하는 과정을 거치는 것은 번거롭다.

```js
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Calculator from '../calculator';

// expect.extend(jestDOM);

test('renders', () => {
  render(<Calculator />);
});

test('the clear button switches from AC to C when there is an entry', () => {
  render(<Calculator />);
  const clearButton = screen.getByText('AC');

  fireEvent.click(screen.getByText(/3/));
  expect(clearButton).toHaveTextContent('C');

  fireEvent.click(clearButton);
  expect(clearButton).toHaveTextContent('BC');
});
```

import를 위와 같이 작성하면 코드를 조금 간소화 할 수 있다.

jest.config.js에 setupFilesAfterEnv를 통해 jest-dom을 추가하면 import까지 한번에 처리할 수 있다.

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
};
```

```js
import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Calculator from '../calculator';

test('renders', () => {
  render(<Calculator />);
});

test('the clear button switches from AC to C when there is an entry', () => {
  render(<Calculator />);
  const clearButton = screen.getByText('AC');

  fireEvent.click(screen.getByText(/3/));
  expect(clearButton).toHaveTextContent('C');

  fireEvent.click(clearButton);
  expect(clearButton).toHaveTextContent('BC');
});
```

## Support a Test Utilities File with Jest moduleDirectories

```js
import React from 'react';
import {ThemeProvider} from 'emotion-theming';
import Calculator from './calculator';
import * as themes from './themes';

function App() {
  const [theme, setTheme] = React.useState('dark');
  const handleThemeChange = ({target: {value}}) => setTheme(value);
  return (
    <ThemeProvider theme={themes[theme]}>
      <Calculator />
      <div style={{marginTop: 30}}>
        <fieldset>
          <legend>Theme</legend>
          <label>
            <input
              onChange={handleThemeChange}
              checked={theme === 'light'}
              type="radio"
              name="theme"
              value="light"
            />{' '}
            light
          </label>
          <label>
            <input
              onChange={handleThemeChange}
              checked={theme === 'dark'}
              type="radio"
              name="theme"
              value="dark"
            />{' '}
            dark
          </label>
        </fieldset>
      </div>
      <div
        css={{
          display: 'flex',
          marginTop: 10,
          marginBottom: 10,
          justifyContent: 'space-around',
        }}
      />
      <div style={{marginTop: 30, textAlign: 'center'}}>
        Calculator component{' '}
        <a href="https://codepen.io/mjijackson/pen/xOzyGX">created</a>
        {' by '}
        <br />
        <a href="https://twitter.com/mjackson">Michael Jackson</a> of{' '}
        <a href="https://reacttraining.com/">React Training</a>
      </div>
    </ThemeProvider>
  );
}

export default App;

/* eslint import/namespace:0 */
```

```js
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import AutoScalingText from './auto-scaling-text';
import {getFormattedValue} from './utils';

const DisplayContainer = styled.div(
  {
    position: 'relative',
    lineHeight: '130px',
    fontSize: '6em',
    flex: '1',
  },
  ({theme}) => ({
    color: theme.displayTextColor,
    background: theme.displayBackgroundColor,
  }),
);

function CalculatorDisplay({value}) {
  const formattedValue = getFormattedValue(
    value,
    typeof window === 'undefined' ? 'en-US' : window.navigator.language,
  );

  return (
    <DisplayContainer>
      <AutoScalingText>{formattedValue}</AutoScalingText>
    </DisplayContainer>
  );
}

CalculatorDisplay.propTypes = {
  value: PropTypes.string.isRequired,
};

export default CalculatorDisplay;
```

App에서 themeProvider를 이용하여 theme을 component로 전달했다.

calculator-display.js에서 theme을 전달받아 DisplayContainer에서 color, background를 설정한다.

이 상태로 test를 실행하면 이전에 설정했던 test에서 에러가 발생한다.

test 파일에 theme에 대한 설정이 없기 때문에 발생한 에러다.

test에 themeProvider를 추가하자.

```js
import React from 'react';
import {render} from '@testing-library/react';
import {ThemeProvider} from '@emotion/react';
import {dark} from '../../themes';
import CalculatorDisplay from '../calculator-display';

test('renders', () => {
  const {container} = render(
    <ThemeProvider theme={dark}>
      <CalculatorDisplay value="0" />
    </ThemeProvider>,
  );
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

    <div
      class="emotion-0 emotion-1"
    >
      <div
        class="autoScalingText"
        data-testid="total"
        style="transform: scale(1,1);"
      >
        0
      </div>
    </div>
  `);
});
```

위 코드를 다음과 같이 리펙토링 할 수 있다.

```js
import React from 'react';
import PropTypes from 'prop-types';
import {render} from '@testing-library/react';
import {ThemeProvider} from '@emotion/react';
import {dark} from '../../themes';
import CalculatorDisplay from '../calculator-display';

function Wrapper({children}) {
  return <ThemeProvider theme={dark}>{children}</ThemeProvider>;
}

Wrapper.propTypes = {
  children: PropTypes.node,
};

test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />, {
    wrapper: Wrapper,
  });
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

    <div
      class="emotion-0 emotion-1"
    >
      <div
        class="autoScalingText"
        data-testid="total"
        style="transform: scale(1,1);"
      >
        0
      </div>
    </div>
  `);
});
```

Wrapper component를 생성했다. testing-library/react의 render에서 Wrapper component는 다음과 같이 활용할 수 있다.

```js
const {container} = render(<CalculatorDisplay value="0" />, {
  wrapper: Wrapper,
});
```

좀 더 추상화를 진행해보자.

```js
import React from 'react';
import PropTypes from 'prop-types';
import {render as rtlRender} from '@testing-library/react';
import {ThemeProvider} from '@emotion/react';
import {dark} from '../../themes';
import CalculatorDisplay from '../calculator-display';

function render(ui, options) {
  return rtlRender(ui, {wrapper: Wrapper, ...options});
}

function Wrapper({children}) {
  return <ThemeProvider theme={dark}>{children}</ThemeProvider>;
}

Wrapper.propTypes = {
  children: PropTypes.node,
};

test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    .emotion-0 {
      position: relative;
      line-height: 130px;
      font-size: 6em;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

    <div
      class="emotion-0 emotion-1"
    >
      <div
        class="autoScalingText"
        data-testid="total"
        style="transform: scale(1,1);"
      >
        0
      </div>
    </div>
  `);
});
```

testing-library/react의 render를 rtlRender로 이름을 변경하고, Wrapper를 포함한 render를 만들어 실제 테스트에서는 새롭게 생성한 render를 사용한다.

**Support a Test Utilities File with Jest moduleDirectories**

어려운 부분이 있어 나중에 다시 한번 도전!
