# react-helmet

`react-helmet`이 없어도 정적인 meta tag 입력은 문제가 없다는 것을 알았다.

하지만 이왕 시작한 거 사용은 해봐야지?

## 1. 계속 검색

계속 사용하다보니 다음과 같은 경고가 계속 발생하고 있었다.

```js
Warning: <title> should not be used in _document.js's <Head>. https://err.sh/next.js/no-document-title
```

찾아보니 title은 _app.js에 넣으라고 하네.

## 