# flexbox (aka 안녕 float)
* 레이아웃을 위한 CSS
* float는 애초에 레이아웃을 위한 CSS는 아님.
* flexbox는 CSS3 (IE10부터 지원, IE11 이하에서 버그가 수두룩) / 안드로이드 4.4 미만에서 버그가 수두룩 함
* 그럼에도 불구하고 좋음

## display:flex
* display:flex는 flexible box라는 영역을 생성
* flexible box 내의 자식 요소들은 마음껏 늘이거나 줄이거나 순서를 바꾸거나 할 수 있음.
* flexible box는 기본적으로 줄바꿈이 일어나지 않음.
* 만약 flexible box 영역이 자식요소의 box영역을 다 합한것보다 작다면 자식요소를 알아서 줄여요.
* flexible box 내부는 제어권이 무한

## main-axis, cross-axis
* flexible box 내의 요소가 쌓이는 방향
* main-axis 방향으로 쌓임
* main-axis의 교차축으로 쌓이는 게 cross-axis

* main-axis 변경 : flex-direction
* main-axis를 변경하면 cross는 같이 변경됨