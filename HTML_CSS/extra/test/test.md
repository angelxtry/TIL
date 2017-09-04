# brunch page 만들어보기

html을 작성한다.



.logo-area를 왼쪽 위에 고정하기 위해 일단 float: left; 로 지정한다.

.logo-area에 포함된  button과 h1 element를 나란히 왼쪽 위로 고정하기 위해 두 element에 모두 float: left; 를 설정

두 element에 float: left; 만 지정하면 계단처럼 표시된다.

button과 h1의 높이가 다르므로 button에 margin 10px; 정도를 추가한다.

한줄로 나란히 표현하려면 h1 element의 margin을 없에주어야 한다. 따라서 margin: 0; 추가.
.tools-area를 오른쪽 위에 고정하기 위해 float:right; 를 설정

.tools-area를 오른쪽 상단에 고정하기 위해 float: right;를 추가한다.

이제 .header 전체를 상단에 고정하기 위해 position: absolute;를 적용한다.

absolute는 element가 포함된 영역만을 차지한다. 이 영역을 확장하기 위해 right: 0; 또는 width: 100%;를 설정한다.

그리고 상단과 왼쪽의 공백을 없에기 위해 top: 0; left: 0;을 설정한다.

position: absolute; 로 설정한 header의 영역에서 .tools-area는 너무 위쪽으로 치우쳐있다.

.tools-area를 조금 아래로 내리기 위해 top: 9px; 정도로 설정한다.

하지만  설정해봐도 반응은 없다. 9px만큼 이동하려면 .tools-area에 position: relative; 가 필요하다.

header가 완성되었다.

main을 살펴보자.

일단 전반적은 font 설정을 처리한다.

```css
body {
    font-size: 22px;
    line-height: 1.5;
    font-family: "APPLE SD Gothic NEO", "Nanum Gothic", "sans-serif";
    margin: 0;
}
```

```html
<main class="main">
    <article>
    <header class="cover">
        <div class="cover-text">
        <h2>서울의 카페 여행</h2>
        <p>서울 근교 카페</p>
        </div>
    </header>
    <div class="wrapper">
        <p>청춘은 되려니와, 가치를 위하여서, 것이다. 주는 아니더면, 것은 주며, 황금시대다. 노년에게서 찬미를 공자는 것이다. 품었기 오직 피부가 품으며, 그러므로 꽃이 말이다. 설산에서 뜨고, 청춘의 얼마나
        피다.</p>
    </div>
    </article>
</main>
```

main은 위와 같은 구조다.

article tag가 전체를 감싸고 있고 그 안에 header와 wrapper가 위치한다. wrapper는 contents라고 부르는 것이 좋겠다.

header는 cover > cover-text 구조다.

cover에는 배경사진이 들어가고 cover-text는 cover 영역의 하단에 위치한다.

```css
.cover {
    width: 100vw;
    height: 100vh;
    background: url(https://unsplash.com/?photo=bivUtyUT6mk);
    background-position: center center;
    background-size: cover;
}
```

배경사진을 넣었다.

```css
.cover-text {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 1em 3em;
    color: white;
}
```

cover-text 즉 글의 제목의 위치를 고정한다.


.content를 설정한다.

```css
.content {
    max-width: 1000px;
    margin: auto;
}
```