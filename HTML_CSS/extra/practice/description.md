# brunch page 만들어보기

html을 작성한다.

.body 공통 부분 설정

```css
body {
  font-size: 22px;
  line-height: 1.5;
  font-family: "APPLE SD Gothic NEO", "Nanum Gothic", "sans-serif";
  margin: 0;
}
```

.menu-area를 왼쪽 위에 고정하기 위해 일단 float: left; 로 지정한다.

.tools-area를 오른쪽 상단에 고정하기 위해 float: right;를 추가한다.

이제 .header 전체를 상단에 고정하기 위해 position: absolute;를 적용한다.

absolute는 element가 포함된 영역만을 차지한다. 이 영역을 확장하기 위해 right: 0; 또는 width: 100%;를 설정한다.

그리고 상단과 왼쪽의 공백을 없에기 위해 top: 0; left: 0;을 설정한다.

header가 완성되었다.

main을 살펴보자.

일단 전반적은 font 설정을 처리한다.

```html
<main class="main">
  <article>
    <header class="cover">
      <div class="cover-text">
      <h2>서울의 카페 여행</h2>
      <p>서울 근교 카페</p>
      </div>
    </header>

    <div class="content">
      <p>오늘은 카페 쟁이의 하루를 채워준 서울 근교의 카페 중 좋아하는 이들을 한 번씩은 데리고 다시 방문했던 곳들만 한 자리에 모았다.</p>

      <p>'핫플레이스'보다는 '꼭, 들렀으면 하는 장소'들로 이루어져 있는데, 물론 개중에 이미 핫플레이스인 곳도 있고 앞으로 핫플레이스가 될 곳도 있으리라 생각한다. 사전에 조사하지 않고 무작정 갔지만 두, 세 번 발걸음을 이어지게 했던 공간, 혹은 전부터 가고 싶어 찾아갔으나 품었던 기대를 저버리지 않았던 공간들이다. 어느 날 서울이 여행지가 될 그들에게 추천해주고 싶다.</p>
    </div>
  </article>
</main>
```

main은 위와 같은 구조다.

article tag가 전체를 감싸고 있고 그 안에 header와 content가 위치한다. 

header는 cover > cover-text 구조다.

cover에는 배경사진이 들어가고 cover-text는 cover 영역의 하단에 위치한다.

```css
.cover {
  width: 100vw;
  height: 100vh;
  background: url(http://images.unsplash.com/photo-1504123221345-938396029ff2);
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

마지막으로 footer를 설정한다.

footer에는 동그란 썸네일이 있다.

이것을 다음과  같이 구현한다.

```css
footer .thumb {
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50%;
  background: url(http://images.unsplash.com/photo-1504123221345-938396029ff2);
  background-position: center center;
  background-size: cover;
}
```

썸네일 하단의 프로필의 위치를 설정한다. 

```css
figcaption {
  margin-top: -50px;
  padding-top: 60px;
  padding-bottom: 100px;
  text-align: center;
}
```

그리 길지 않은 코드로 브런치와 비슷한 효과를 냈다.

물론 강사님 코드를 전적으로 참고했다.

백지부터 시작해서 비슷하게 만들어보기를 3번 정도 반복하니 약간 감이 오는 것 같다.

position: absolute, position: relative, float 그리고 clearfix가 아직 모호하다.

수학공식처럼 딱 떨어지는 답이 있는데 아직 원리를 이해 못해서 헤메고 있는 느낌이다.

계속 사용해봐야 감이 올 것 같다.

brunch 뚝딱 만들기! 같은 코스는 매우 유익했다.

배운 것을 토대로 만들어보면서 연습해 볼 수있다는 것이 매우 좋다.

마지막으로 수업시간에 강사님이 작성해주신 코드는 다 주셨으면 좋겠습니다!