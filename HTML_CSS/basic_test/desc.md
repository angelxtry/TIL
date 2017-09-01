```css
body {
  font-size:18px;
  line-height: 1.5em;
  font-family: "APPLE SD Gothic NEO", "Malgeun Gothuc", "맑은고딕", "sans-serif";
  /*
  정석대로라면 이쯤 color
  */
}
.header {
  border: 1px solid #000000;
  background-color: green;
}
```

이렇게 설정하면 테두리에 약간의 공백이 남는다. 

이게 브라우저에 기본으로 설정되어있다는 margin인가?

```css
.header {
  position: fixed;
  border: 1px solid #000000;
  background-color: green;
}
```

fixed를 넣으면 inline처럼 보인다.

absolute와 fixed는 width: 100%가 아니다.

block처럼 그리기 위해서는 width 100%가 필요하다.

```css
.header {
  position: fixed;
  width: 100%;
  border: 1px solid #000000;
  background-color: green;
}
```

width: 100%를 넣으면 오른쪽은 끝까지 채워졌지만 위와 왼쪽은 공백이 있다.

그래서 left와 top을 설정한다.

```css
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  border: 1px solid #000000;
  background-color: green;
}
```

이렇게하면 위에 꽉 차게 고정되어있는 header 영역이 설정된다.

menu와 h1과 etc를 header-warp으로 감쌌다.

```css
.header-warp {
  border-bottom: 1px solid #000000
}
```

다른 header 항목과 분리하기 위해 border-bottom 설정한다.

```css
.header .btn-menu {
  position: absolute;
  left: 5px;
  top: 5px;
}
```
.btn-menu를 왼쪽 상단에 고정했다.

```css
.header .etc {
  position: absolute;
  right: 5px;
  top: 5px;
}
```

etc항목은 오른쪽에 고정

```css
.header h1 {
  text-align: center;
}
```

h1을 center로 이동

btn-menu와 etc는 상단에 붙어있고 wired는 btn-menu보다 조금 아래 위치한다.

margin: 0;을 이용하여 줄을 맞춘다.

```css
.header h1 {
  text-align: center;
  margin: 0;
}
```