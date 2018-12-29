# EMOCON 2017 S/s

정말 재미있게 잘 들었다. (약의 향연 & 노예 모집)

칼같은 시간 체크가 묘미

발표자 분들이 프로발표러 + PPT 장인

다시 듣기를 진행하면서 간단하게 내용을 기록해본다.

https://www.crowdcast.io/e/emocon-2017-ss

## Stanby

https://www.crowdcast.io/e/emocon-2017-ss/1

정식 시간시간인 22시 전에 녹화된 내용 같은데 소리도 안나오고 화면도 정지화면

내 시스템에 뭔가 문제가 있나 하고 한참 만지작거렸다;

1시간 17분 정도에 이모님 목소리가 들리기 시작한다.

Standby는 과감히 pass해도 큰 문제 없다.

## Keynte

https://www.crowdcast.io/e/emocon-2017-ss/2

이모콘 설명

EMOCON = 이상한모임 + Conference

생방송으로 1000명쯤 봤으면 좋겠다는 이모님의 바램

발표 지원자가 많아져서 선별까지...

발표일정은 조금 변경이 있었다.

Q&A

`갤노트2는 후원도 안되요...`

## Google analytocs chatbot 만들기, Rookie bot!

https://www.crowdcast.io/e/emocon-2017-ss/3

발표자 : dusskapark

라인 봇 공모전을 위해 만듬

- 공모전은 광탈했지만 약은 팔아야겠다!

(동영상 재생은 프레임이 밀린다.)

라인 봇 공모전을 위해 동영상도 만드신 듯 -_-b

신입들이 매일매일 하는 일들

- 퍼포먼스 체크

- 레포팅

이런 일들을 봇을 통해 자동화

Google Analytics bot

라인 챗방에 URL을 던지고 구글 로그인만 하면 결과 출력

자연어를 json으로 파싱해주는 google 서비스 사용

라인 스티커를 이용해 명령어를 날릴 수 있는 기능

Node.js :  Message API 처리

R : Data 처리

Cloud9 : 협업 프로그래밍

기획자들끼라 Node.js를 배워가면서 Callback을 콜백하는 콜백한 사이

공모전 driven develop

개발기간이 2달 정도라고 함. 개발자 분들도 아니고 기획자 분들이시라는데... 좀 짱인듯.

006.png

마지막 줄이 핵심

## 마케터/기획자에게 좋은 Microsoft Flow + Azure Functions

https://www.crowdcast.io/e/emocon-2017-ss/4

발표자 : justinchronicle

시작하시면서 부터 `제가 오늘 팔 약은...`

비개발자를 위한 IFTTT 같은 MS Flow

전문적인 개발, 유지보수 등이 Flow를 쓰면 편해진다.

MS에서 제공하는 수많은 커넥터

Work less, do more (== WD!)

MS제품 뿐만 아니라 Google Calender, Slack, Dropbox 등도 연동할 수 있다.

Flow, Login Apps, Functions - MS의 비슷한 서비스

Flow가 가장 비개발자를 위한 서비스

- 커넥터 기반

- 브라우저에서 작성

- Logic Apps가 커넥터가 더 많다.

- 커넥터가 없으면 Functions으로 만들면 된다.

Flow를 사용한 실전 데모

커넥터가 없다면? Functions을 이용해 커스텀 커넥터를 만들자!

워크플로우가 길 경우 타임아웃 가능성 증가(90초) -> Function으로 비동기 처리

20분 10초 까지가 내용이고 이후에는 검은 화면만 나온다.

원래 20분짜리 세션이다. 검은 화면은 Crowdcast 오류인 듯 하다.

## try! Swift Tokyo 2017 후기

https://www.crowdcast.io/e/emocon-2017-ss/5

발표자 : wanbok

try! Swift Tokyo

 - 매년 3월 2일 ~4일

 - 4일 해커톤

 - 사전/사후 행사 가득

발표자분의 비행기를 놓친 슬픈 이야기가...

(다시듣기하니 음질이 너무 않좋았다 ㅠㅠ)

해커톤

- 외국에 나가서 밥벌이를 할 수 있을까

- 외국 개발자 분들과 함께 개발

발표자 분의 회고

- 해커톤 참여 만으로도 돈 값한 경험

- 의식적으로 라도 말을 걸고 참여한 경험

- 발표의 다양성, Swift 안에서 다양한 시도

- 실리콘밸리 개발자들과 활발한 소통

- 영어나 일어나 됐다면 훨씬 좋았겠다.

## 텐서플로우 & 딥러닝 수박 겉핥기

발표자 : golbin

https://www.crowdcast.io/e/emocon-2017-ss/6

고블린님의 텐서플로우

인공지능 > 머신러닝 > 딥러닝

뉴런의 설명

수식 같은 거 별로 고민안해도 된다.

텐서플로우느님만 믿고 가자.

쉽게 쉽게 설명하면서 값 출력해가면서 라이브 코딩 진행. 어려웠지만 조금 이해되는 것 같은...

그러나 시간부족으로 결과만 확인

## 도메인 주도 개발(DDD)의 처음과 끝, Value Object

발표자 : chaa youngho

https://www.crowdcast.io/e/emocon-2017-ss/8

영국 런던에 계신 발표자님

발표시간 내내 다들 멋진 발음에 열광했다.

Primitives

정말 string 만으로 우편번호를 잘 표현 할 수 있는가?

시스템이 성숙해지면 Data Value를 Object로 교체하자.

Value Object가 없다면 util 같은 것들이 번잡해진다.

business logic이 value object에 포함된다.

## CSS 다시 파서 어디에 쓰나

발표자 : cwdoh

https://www.crowdcast.io/e/emocon-2017-ss/9

CSS 파서, 왜 만들었을까?

개발이 하고 싶었음

3년(?)을 묵혔던 개발... 왜 만들었을까에 대한 답이 되었을까?

