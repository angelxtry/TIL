### color

body {
    color: red;
}

example 2: 색상이 다른 경우
```css
body {
    corlor: black;
}
a {
    /*
    기본 style: { color: blue; text-decoration: underline }
    */
    color: #2ac1bc;
    text-decoration: none;
}
em {
    font-style: normal;
}
string, em {
    /*
    strong 요소의 기본 style: { font-weight: bold }
    em 요소의 기본 style: { font-style: italic }
    */
    color: #2ac1bc;
}
```

사이트 전체에 공통적으로 쓰이는 것들은 미리 선언해두면 작업하기 수월해진다.

#### Hex value(16진수)

16진수 6개로 이루어진 색상 표현법

0에 가까울 수록 어둡고, f에 가까울 수록 밝은 색

기존의 디자인 도구: photoshop(hex값 복붙이 제일 쉬움)

편해서 많이 사용한다.

컬러 자체에 Alpha 값을 포함할 수 없다.

```css
body {
    color: #000000;
    color: #FFFFFF;
    color: #ffffff;
    /*
    소문자를 권장한다.
    */
}
```

#### rgba(0, 0, 0, 1)

red, green, blue, alpha

rgb: 0부터 255까지의 값(16진수의 최대값 255)

alpha: 0부터 1까지의 값(소수점)

협업할 때 디자이너에게 alpha 값 사용은 되도록이면 배경이 비춰야할 때만 사용해달라고 요청

```css
body {
    color: rgba(0,0,0,0.2);
    color: #181818 or #c8c8c8;
}
```

#### HSLA(잘 안쓰임, 쓰지마세요)

표준에서는 이 값이 편하다고 하지만...

H Hue 색상의 범위

S Saturation 채도

L Lightness 밝기

A Alpha

```css
color: hsla(330, 100%, 50% 1)
```

### opacity

해당 요소 전체를 투명하게 만든다.

```css
body {
    opacity: 0; /* 투명 */
    opacity: 1; /* 안투명 */
}
```

만약 UI 디자인 시스템이 궁금하시다면 bootstrap의 content guideline을 참고하면 좋고

Google Material Design System도 참고하면 좋다.

