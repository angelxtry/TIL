# ESLint 경고 - 해결방법

## eslint(no-undef)

test를 위해 jest를 설치하고 다음과 같은 파일을 작성했다.

```ts
const sum = (a: number, b: number) => a + b;

test('add 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toEqual(3);
});

```

test, expect에 `'expect' is not defined.eslint(no-undef)`와 같은 경고가 발생한다.

`.eslintrc.js` 파일에 다음 내용을 추가하여 처리한다.

```js
overrides: [
  {
    "files": [
      "**/*.spec.js",
      "**/*.spec.jsx",
      "**/*.test.ts",
    ],
    "env": {
      "jest": true
    }
  }
]
```
