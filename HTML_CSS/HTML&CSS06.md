
## Colors and Backgrounds

### color

body {
    color: red;
}

body {
    color: black;
}
a {
    /* 기본 style { color: blue; text-decoration: underline; } */
    color: #2ac1bc;
    text-decoration: none;
}

em {
    font-style: normal;
}
strong, em {
    /* strong 기본 style { font-weight: bold; } */
    /* em 기본 style { font-style: italic; } */
    color: #2ac1bc;
}

### Hex value (16진수)

* 16진수 6개로 이루어진 색상 표현법

* 0에 가까울 수록 어둡고, f에 가까울 수록 밝은 색

* 편해서 많이 사용하나, Alpha 값을 표현할 수 없음.

body {
    color: #000000;
    color: #ffffff;
}

### rgba(0,0,0,1)

* Red, Green, Blue, Alpha

* RGB: 0부터 255까지의 값 (16진수 최대값, 255)

* Alpha: 0부터 1까지의 값(소수점)
    * 10% = 0.1

* Alpha값 사용은 배경이 비춰야 할 때만 사용하는 것이 좋다.

### opacity

* 해당 요소 전체를 투명하게 만든다.

body {
    opacity: 0 /* 투명 */
    opacity: 1 /* 안투명 */
}

### background

```html
<div class="box"></div>
<div class="box box--red"></div>
<div class="box box--blue"></div>
<div class="box box--images"></div>
<div class="box box--gradient-linear"></div>
<div class="box box--gradient-radial"></div>
```

```css
.box {
  float:left;
  width:150px;
  height:150px;
  border:1px solid #666666;
  margin:15px 7.5px;
}
/*
 * 기본적으로 box(대부분 요소)의 배경색은 trasnparent(투명)
 */
.box {
  /* color */
  background: royalblue;
  background-color: royalblue;
}

.box--red {
  background: crimson;
}

.box--images {
  background: url("https://s-media-cache-ak0.pinimg.com/736x/ae/83/f8/ae83f8d8bdd72a52d744bbb2d34ee228--pattern-floral-pattern-fabric.jpg");
  /*
   * 배경을 이미지로 가져오면 배경 이미지는 그대로인데...
   * 박스 사이즈는 부족해서 이미지가 다 보이지 않을 수 있음
   */
  background-size: cover;
  /*
   * background-size를 cover로 넣어주면,
   * 배경 이미지가 해당 박스에 맞게 줄어들어서 들어감
   */
  background-position:0 0;
  /*
   * background-position: <pos-x> <pos-y>
   * left top
   * right top
   * left bottom
   * right bottom
   * center top
   * center center
   */
  background-repeat: no-repeat;
  /*
   * repeat : 반복
   * repeat-x : x축으로만 반복
   * repeat-y : y축으로만 반복
   * repeat : 반복
   * no-repeat : 반복안함
   */
  background: url("https://s-media-cache-ak0.pinimg.com/736x/ae/83/f8/ae83f8d8bdd72a52d744bbb2d34ee228--pattern-floral-pattern-fabric.jpg") 0 0 no-repeat #000;
  /*
   * background:
   * background-image
   * background-position
   * background-repeat
   * background-color
   */
}
.box--gradient-linear {
  background:
    linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
    linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
}
/*
 * 웹에서 gradient는 이미지로써 취급
 * 배경 이미지는 여러개 작성이 가능 (multiple background)
 */
.box--gradient-radial {
  background: radial-gradient(circle at center, hotpink, red)
}
/*
 * 방사형 gradient
 */
```

### shadow

```html
<div class="box"></div>
<div class="box box--shadow"></div>
<div class="box box--inner-shadow"></div>
<div class="box box--multi-shadow"></div>

<strong>This is good</strong>
```

```css
.box {
  float:left;
  width:150px;
  height:150px;
  border:1px solid #666666;
  margin:15px 7.5px;
}
/*
 * shadow = 그림자
 * x 이동
 * y 이동
 * spread
 */
.box--shadow {
  box-shadow: 5px 5px 20px rgba(0,0,0,0.2);
}
/*
 * inset shadow
 */
.box--inner-shadow {
  box-shadow: inset 5px 5px 20px rgba(0,0,0,0.2);
}
/*
 * multi
 */
.box--multi-shadow {
  box-shadow: 5px 5px 20px rgba(0,0,0,0.2),
    -5px -5px 20px olive;
}

/*
 * text-shadow
 */
strong {
  clear:both;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
}
/*
 * Mobile 기기 중 하위단말에서는
 * shadow를 넣을경우 극심한 성능저하
 */
```