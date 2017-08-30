## Visual formatting model

유저 에이전트가 비주얼 미디어를 위해 문서 트리를 어떻게 해석하는가?

visual formatting model에서 모든 요소는 0개 혹은 그 이상의 박스를 박스 모델에 따라 생서합니다.

박스의 레이아웃은 다음고 같이 구성되어 있습니다.

* box dimentsion과 type

* 포지셔닝 스킴(normal flow, float, absolute positioning)

* 문서 트리 내 요소간의 관계

* 외부정보(viewport, 이미지의 고유한 dimension 등)

플레인 텍스트에 태그를 붙여서 의미를 부여한다.

p tag는 자동으로 줄바꿈이 된다.


block vs inline

사전지식: box dimension(box model)
