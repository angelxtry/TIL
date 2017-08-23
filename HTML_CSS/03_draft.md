# 03

```
HTML은 대소문자 구분을 안한다. but 소문자를 권장하는 정도?

CSS는 대소문자를 구분할까?

답: 케바케

정확한 답; 매칭 알고리즘을 사용하는 경우에는 대소문자 구분을 하고

매칭 알고리즘을 사용하지 않는 경우(HTML 태그에 바로 접속)에는 대소문자 구분하지 않음

BASIC3 : @rule
: CSS에서 특수한 문법을 표현하고자 할 때 사용하는 rule

웹폰트: @font-face
미디어쿼리: @media
애니메이션: @keyframe
다른 CSS 가져오기: @import 비추 느리다.

BASIC 4: BLOCKS

여는 중괄호와 단는 중괄호 내부를 BLOCKS라고 부른다.

P {} : P BLOCKS라고 부른다.

BASIC 5: Rule set

as-is
h1 { color: red }

h2 { color: red }

to-be
h1, h2 { color: red }

두 개는 동일하게 동작한다.

BASIC 6: Declaration (선언)

h1 { color: red }
h1 { font-size: 16px }
h1 { line-height: 24px }

h1 {
    color: red;
    font-size: 16px;
    line-height: 24px;
}

요런 것을 선언이라고 한다.
세미콜론은 마지막에는 안붙여도 된다.

h1 { color: red; font-size: 16px; line-height: 24px; }

동일한 코드다. 가독성 차이만 빼고.

white space는 나중에 gulp 등의 빌드 혹은 후처리 도구를 사용하여 전부 한번에 제거 가능하다.

BASIC 7: Comment

문법 (언어에 따라 다름): /* 내용 */


```

### 기본 데이터 타입

#### 정수/실수(HTML과 동일)
* 십진수
* +, - 기호 사용 가능(보통 +는 생략)
* 소수점도 사용 가능

#### Length
* em 해당 요소의 폰트 사이즈에 비례하는 값
* 장점: 폰트사이즈에 비례해서 모든 요소들의 늘거나 줄어야할 때 굉장히 유용
* 폰트사이즈는 매우 유용하다. 유저가 확대와 축소 할 수 있다.
* 단점: 계산이 졸라 힘들다.

```
p {
    font-sie: 14px;
    margin: 1em; (=14px)
}

body {
    font-size: 16px;
}

body p {
    font-size: 1.2em(=19.8px)
}
```

* em이 부모요소와 연관있는 거 아니었나요? 아니다.
```CSS
body {
    font-size: 12px;
    text-indent: 3em; (=36px)
}

p {
    font-size: 15px;
    /* 여기서 들여쓰기 값은? 36px */
}
```

indent는 cascading 된다.

그러므로 body안에 있는 p에도 영향을 준다.



* ex: 폰트의 x-height
    * 조은님이 태어내서 한번도 안써봤대?

* px: 1px = 1px

* in: 물리단위 2.54cm

* cm: 센티미터(프린트 용도)

* mm: 밀리미터(프린트 용도)

* pt: 포인트 CSS에서 사용하는 포인트: 1인치의 1/72

* px: 0.75pt

* pc: 피카사 1pc는 12pt

27인치 = 1944pt = 2592px
100px = 75pt

* px, em 자주 쓰인다.

### 퍼센테이지
* 상대적 단위
* HTML과 동일
* 해당 속성에 따라서 상대적이라는 표현이 달라짐

```
p {
    font-size: 14px;
    line-height: 120%; /* 폰트 사잊 기준으로 증가 */
    width: 보모 요소의 가로사이즈를 기준
}
```

### URL
* 리소스의 경로

```
p { background: url("https://img.naver.com/")}
```

### 색상
* 해시코드 (#888888)
* 해시코드가 아 3자리와 뒤 3자리가 반복되는 경우에는 생략이 가능
    #2ac2ac -> #2ac 생략가능

* 컬러 키워드: 약 400가지?
* RGB: rgb(255,255,255) -> white
    * Red, Green, Blue
    * ALPHA 값도 표현 가능 (CSS만)
    * GREEN = rgb(0, 128, 0)
    * LIME = rgb(0, 255, 0)

### 문자열
```
"문자"
셀렉터(속성값 셀렉터) 사용 시 사용
가상 요소 셀럭터에도 사용
URL에서 사용
```

### CSS 유니코드 지정법
```
@charset "UTF-8"
한국어를 주석으로 달아도 꺠져보이지 ㅇ낳는다.
웹사이트에서 소스코드 보기를 열어서 주석을 열었을 때 깨져보이자 않음
```

## Selector

* CSS의 표현력을 높여주는 아이
* 오늘은 CSS 2.2 기준으로
* CSS가 HTML 개별 요소를 알아내서 스타일을 입힐 수 있게 하는 것

### 패턴매칭

* 패턴
* 매칭할 대상

```
TYPE 1: * /* Universal Selector */ : HTML에 존재하는 모든 요소
* {

}

TYPE 2: E(Element)
Type Selector: E 요소와 매치함
E -> 아무 요소명으로 변경하여 사용함
단점: 요소가 여러개 일때 하나만 스타일을 주는 것이 불가능

TYPE 3: E F
Descendant selectors
특정한 요소 F의 자식요소 F

HTML:
<div>
    <p>
</div>

CSS:
}

TYPE 4: E:first-child
첫번째 자식 요소인 E요소

p:first-child {
    color: red;
}

<div>
    <p>HELL</p>
</div>
<p>WORLD</p>
<div>
    <p>HELL</p>
</div>

p:last-child {
    color:red;
}

TYPE 5: E.classname
Class Selecotor
CLASS SELECTOR: 매우 자주 쓰임/HTML 요소의 클래스명을 기준으로 CSS 적용

E는 클래스 셀렉터/아이디 셀렉터/ 속성 셀렉터 등에서 생략이 가능하다.
생략하면 * 로 치환된다.

클래스명을 가지고 있으나 DIV요소이여만 하는 경우
div.dec-red {

}

TYPE 6: E#myid
ID Selector
현재 기준으로는 ID 셀럭터를 사용하여 CSS를 넣는 것은 추천하지는 않는다.
ID는 바뀔 가능성이 많다.

TYPE 7: Pseudo Class
의사 클래스: 존재하지만 요소로서는 존재하지 않는 것

ex) div에 마우스를 올렸을 때, 클릭가능한 무언가라고 표시할 때

<a href="#">안녕</a>

a.hover {
    color: black;
}

hover의 단점
: 모바일 사파리에서 버그가 있음
: 모바일엔 애초에 마우스가 없음
: 마우스를 올렸다라는 상태 자체가 존재하지 않음

클릭했을 때
: active
> 클릭했을 때 손가락/마우스를 떼면 원상복구

유저의 인터렉션: 도구를 이용해서 인터렉션 하게 됨
Desktop: 마우스, 키보드
Mobile: 터치

인지 -> hover -> active -> leave(blur) -> 안녕

leave는 css에 없다.

input: 입력창: focus
인지 -> focus -> blur -> 안녕

포커스가 주어졌을 때
: focus
시각장애인들은 보통 웹사이트를 탭으로 이동하여 사용한다.
시각장애인에는 전맹도 있지만 약시도 있다.
약시도 마우스를 잘 활ㄹ용하지 못한다. (커서를 인지하지 못함)
outline을 부득이한 사유로 없엤다면 다른 인지방법을 제공해야 함
이때도 focus를 활용할 수 있다.

TYPE 8:속성셀렉터
특정한 속성이 존재하거나, 속성값이 존재하거나, 속성값이 일치할 때 사용

E[Attribute]

disabled 속성이 존재하는 input에 CSS

TYPE 9: Pseudo Elements
없는 요소를 CSS로 생성하는 것: 나중에
```

## Cascading and Inheritance

### Inheritance

지난번에 배운 것과 동일함
특정 요소가 부모 요소의 무언가를 상속받고 싶을 때
INPUT요소가 부모 요소의 FONT를 상속받고 싶다면
장점: 스타일을 한꺼번에 싸잡아서 수정할 때 굉장히 유용

```
input {
    font:inherit;
}
```
부모 요소가 기본적으로 상속해주는 경우


### Cascade

스타일시트(CSS)는 크게 3개의 출처
1. 작성자
2. 유저(폰트사이즈/폰트패밀리 등을 바꿀 수 있음)
3. 유저 에이전트(UA/유저가 웹사이트에 접근할 때 사용하는 프로그램)
    1. 웹 브라우저
    2. 웹 뷰

이 순서는 우선순위

즉, 작성자가 작성한 CSS가 다른 것보다 최우선 적으로 적용된다. (Cascade)

```
body {
    margin: 8px;
}

style.css
body {
    margin: 0;
}
```

### 셀렉터 우선순위

어떤 셀렉터를 조합해서 사용했을때 어떤 CSS가 적용될 것인가

1. HTML에서 style 속성을 이용해서 CSS를 넣은 갯수
2. ID 셀렉터의 갯수
3. pseudo class와 다른 속성 셀렉터 전부
4. 요소명과 pseudo elements 의 갯수

## Media types
* 유저 에이전트가 어떤 형태의 기기를 사용하여 접근하였는가?

### 미디어 목록

* screen 화면
* print 인쇄
* tv 
* projection
* tty Text to ??

```
@media print {
    /* 프린트 할 경우에만 적용한 CSS */
}
```

## Box model : 매우 중요함

웹상에 존재하는 모든 요소들은 사각형 박스로 생
visual formatting model을 이용하여 화면에 배치한다.

### Box dimension
1. 박스는 콘텐츠 영역을 가지고 있다. 콘텐츠 = 이미지, 텍스트 등등
2. 콘텐츠 영역부터 순서대로 padding, border, margin

#### Padding edge
콘텐츠 영역을 감싸고 있는 영역, padding은 가로길이(width) 세로높이(height)와 직접적으로 연관성을 가지고 있다.
네 방향의 padding edge가 하나의 padding box를 정의한다.
콘텐츠 박스와 border 사이의 영역을 지정하고자 할 때 사용
배경이 투명하지 않다.
box에 배경색을 넣어주면 padding 영역까지 영향을 받는다.
```
p {
    padding: 14px;
    /* 위와 같은 형태의 padding 작성법을 축약형이라고 부른다. */

    padding: top right bottom left

}
```

#### border edge
border는 외곽선
border는 3가지를 지정해야 한다.
width(선의 굵기)
style(선의 형태)
color(선의 색상)
```
p {
    border: 1px solid #000000;
}

p {
    border-bottom
}
```

#### margin edge
배경색의 ㅇㅇ향을 받지 않음 (투명)
박스와 박스 사이의 간격을 나타낼 때 사용

##### Collapsing margins
서로 인접해 있는 A, B 요소가 존재할 때
부모 자식 간에도 

A요소가 margin-bottom 값을 가지고 있고 
B요소가 margin-top 값을 가지고 있다면 
둘을 서로 병햡됩니다.(큰값으로)
