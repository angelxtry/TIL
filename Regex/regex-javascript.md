# 정규 표현식 Regular expression

> 정규 표현식은 문자열에 나타는 특정 문자 조합과 대응시키기 위해 사용되는 패턴입니다. 자바스크립트에서, 정규 표현식 또한 객체입니다. 이 패턴들은 RegExp의 exec 메소드와 test 메소드, 그리고 String의 match메소드, replace메소드, search메소드, split 메소드와 함께 쓰입니다

RegExp: exec, test

String: match, replace, search, split

## 정규식 생성 방법

```js
const re = /ab+c/;
```

```js
const re = new RegExp("ab+c");
```

이렇게 두 가지 방식이 있다.

이렇게 작성하면 다음의 단어들을 

```js
```
