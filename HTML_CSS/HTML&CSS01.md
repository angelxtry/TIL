# HTML&CSS 캠프 첫 번째 수업 20170816

HTML도  high level programming language라고 할 수 있다.

## 브라우저

### 5대 메이저 브라우저

* Microsoft: Edge, IE
* Mozilla: Firefox
* Google: Chrome
* Apple: Safari
* Opera Software: Opera

### 브라우저에는 렌더링 엔진과 자바스크립트 엔진이 포함되어 있다.

### 렌더링 엔진

* 렌더링이란 코드를 시각적으로 변환하여 화면에 보여주는 것

* 렌더링 엔진은 브라우저에서 렌더링을 수행하는 프로그램

* 렌더링 엔진은 브라우저마다 다르기 때문에 같은 코드라도 조금씩 다르게 보여진다.

* 각 브라우저 별 렌더링 엔진은 다음과 같다.

    * Safari: Webkit2
    * Chrome, Opera: Blink(Webkit과 유사하다.)
    * Firefox: Gecko(Mozilla는 제품에 동물 이름을 붙인다. Gecko는 도마뱀. 현재 rust로 Servo라는 렌더링 엔진을 새로 개발하고 있다. Servo는 동물이름이 아닌가?)
    * IE: Trident(MS는 주로 무기 이름을 붙인다.)
    * Whale: Blink (Whale은 네이버가 개발한 브라우저)

* 렌더링 엔진이 동일해도 브라우저마다 조금씩 다르게 보여진다.

### 웹뷰(WebView)

* 어플리케이션 내에서 동작하는 웹 브라우저

* 웹 브라우저와 다르다.

* 안드로이드 4.4 미만, Chrome이 기본 탑재되지 않은 브라우저는 웹뷰와 기본 브라우저가 서로 다르다.

## HTML

* Hyper Text Markup Language. version 5.2

* 문서를 만들기 위한 언어
    * 웹 어플리케이션도 포함하여 개발하는 언어

* Tim Berners Lee (영국인/Father of Web)

* CERN에서 APPLE2 DOCS와 IBM DOCS가 호환되지 않아 문서 공유를 위해 HTML을 만들었다.

* HTML은 Markup Language, 데이터의 구조를 표현하기 위한 언어

* HTML의 목적은 문서를 작성하는 것이고 현재도 동일하다.

* 1990 ~ 1995년까지는 눈에 띄는 발전은 없었다.

### 역사

* IETF(Internet Engineering Task Force): 표준화기구
    * HTML 1.0 - 1993년
    * HTML 2.0 - 1994년
* W3C(World Wide Web Consortium)
    * 회원사들이 모여 언어의 표준을 만들어가는 것으로 방향을 전환
    * 초대 체어맨은 Tim Berners Lee
    * HTML 3.0 - 1995년
    * HTML 3.2 - 1997년
    * HTML 4.01 - 1999년
    * XHTML 1.0 - 2000년(HTML 4.01 + XML, 엄격한 문법을 강조)
    * XHTML 1.1 - 2003년
    * XHTML 2.0 - 2003년 ~ (2007년에 폐기)
        * XHTML
        * HTML을 근간부터 고치기를 원함
        * Firefox, Chrome, Opera, Safari는 브라우저 엔진을 새로 만들어야 했다.
        * 새로 만들기를 거부(돈없다!)
        * 대표적으로 XForms: Input 요소의 Type을 추가하는 스펙(2003년)
        * HTML을 확장해서 만들 수 있는데 왜 새로 만드나
        * 2004년에 깽판
* WHATWG(Web Hypertext Application Technology Working Group)
    * Firefox, Opera, Google
    * 초대의장: Opera
    * HTML Living Standard(XHTML 반대, HTML 발전 지속)
    * W3C가 XHTML 폐기를 선언(2007년)
    * Web Application 1.0 스펙을 만들었다가 HTML 5.0 스펙으로(2007년)
    * HTML 5.0 - 2014년
        * 일정을 부족한데 권고를 해야해
        * 스펙은 많이 제거하고 권고안으로 제정
    * HTML 5.1 - 2016년
        * 5.0의 똥을 치운 버전
    * HTML 5.2 - 2017년

### 권고까지의 과정
* 권고: 브라우저 개발사에서 스펙이 정의되었으니 이제 구현해도 된다.
* Working Draft
* Last Call
* Candidate Recommendation
* Proposed Recommendation
* Recommendation

### HTML 문법

* HTML은 문법이 유연함(엄격하지 않음)

```html
<p>바보바보
<p>바보바보</p>
```

* 닫는 tag를 쓰지 않아도 오류가 발생하지 않는다.(유연함)

* 하지만 닫아주는 것이 좋다.

* HTML에는 Element가 굉장히 많다. 하지만 모두 사용하지는 않는다.
    * ins(insert)
    * del(delete)
    * ruby(위첨자? 문자위에 발음하는 법을 적어놓은 것)

```
Markup Language

1. tag: less than(<) 기호와 tag name과 greater than(>) 기호로 이루어진 것
1.1 open tag: <div>
1.2 close tag: </div>

2. Element: 여는 태그와 닫는 태그로 이루어진 것
<div>바보바보</tag>

3. Void Element: 다른 콘텐츠를 포함하지 않는 특수한 경우 닫는 태그를 생략할 수 있다.
<img>
<img />
둘 다 맞는 문법이지만 엄격한 문법을 사용하자.

4. Attribute: tag안에 추가되는 class 같은 것들
<div class="babo">바보바보</div>
<div class='genious'>천재천재</div>
<div class=chicken>닭닭</div> <!--가능하나 잘 사용하지 않는다.-->

<!--속성명과 속성값이 같은 경우-->
1. <input readonly="readonly">
2. <input readonly>
두개 모두 정상동작함 
의미가 명백할 경우 속성명만 적는 것이 효율적이다.

<!--여러 개의 속성-->
<input class="input" readonly>
공백으로 속성을 구분한다.

5. 공백문자
띄어쓰기, 캐리지 리턴 같은 문자들

1. <div></div>
2. <div>
   </div>
이 두 경우는 동일하게 동작한다.
공백문자가 여러개 포함되어도 1개만 인식한다.
```

## CSS

* HTML이 문서 자체를 나타낸다면, CSS는 이쁘게 만드는 것이 목표

* 그래픽과 관련된 모든 것을 CSS로 제어한다.

### 역사

* 1994년에 시작
    * HTML의 가독성 개선을 위해

* 1996년: CSS 2.0
    * 레이아웃 관련 내용이 포함안됨

* 2011년: CSS 2.1
    * Visual Formatting Model(CSS의 뷰들이 어떻게 배치되는가)
    * 레이아웃을 어떻게 그릴것인가?
        * Position
        * Float(레이아웃을 위한 속성이 아니었다.)

* 2017년: CSS3, CSS2.2
    * CSS3: CSS2.1을 모듈로 쪼갠 스펙
    * CSS2.1 모듈화가 안되어 있었음
    * CSS Text Module Level 3, CSS Fonts Module Level 3 등으로 모듈화 됨

### 문법

```
1. 기본문법
Selector {
  Property: PeopertyValue;
}

2. Selector
CSS는 HTML을 이쁘게 만들기 위한 언어
CSS가 HTML을 알아야 함
CSS에서 HTML을 아는 수단이 Selector다.

2.1 HTML
<div>색깔을 레드로 바꾸고 싶어요.</div>

2.2 CSS
div { /* Type Selector */
  color: red;
}

Element Name, Tag Name을 바로 선택하여 사용하기도 함
CSS도 유연하다. 너무 유연하게 사용하면 hell
CSS에는 다양한 방법론이 있다.(ex. BEM, SMACSS, OOCSS)

3. Cascading and Inheritance

3.1 Cascading
HTML:
<!-- div는 p의 부모 요소 -->
<div>
  <!-- p는 div의 자식 요소 -->
  <p>바보바보</p>
</div>

CSS:
div {
  color: red;
  font-family: "apple sandol gothic neo", sans-serif;
}

div 속성만 정의해도 자식요소인 p 속성도 적용된다.

3.2 inheritance
Element의 고유한 속성으로 인해 Cascading에 영향을 받지 않을 때
부모 element의 attribute를 상속받기 위해 사용

HTML:
<!-- div는 a의 부모 요소 -->
<div>
  <!-- a는 div의 자식 요소 -->
  <a herf="#">바보바보</a>
</div>

모든 브라우저에서 a element는 기본적으로 a { color: blue }

CSS:
div {
  color: red;
}

a, input {
  color: inherit;
}

// black.css
div {
  color: black;
}
```

## 개발에는 답이 없다?

* 개발에는 답이 있다. 단지 내가 못찾았을 뿐. (요즘 이 얘기 많이 듣는다.)

## 이 강의의 목표는 HTML, CSS를 잘하는 개발자를 만드는 것.

## 과제

* TIL

* 조별과제
    * Apple site
    * Google Play Store
    * Youtube