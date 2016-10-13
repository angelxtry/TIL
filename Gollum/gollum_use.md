# 사용기

```$ gollum``` 이라고만 입력하면 웹서버가 실행된다.

```http://localhost:4567``` 로 접근하면 ```http://localhost:4567/create/Home``` 으로 강제로 이동된다.

root(?) 디렉토리에 home.md 라는 파일이 존재할 경우

```http://localhost:4567/``` 로 접근하면 ```http://localhost:4567/Home``` 으로 이동되어 제대로 된 홈 화면이 보인다.

그러므로 home.md 파일을 꼭 만들어주자. 그리고 commit 까지 하자.

디렉토리나 파일이 존재해도 commit 되지 않은 파일은 gollum에서 보이지 않는다.

git page에서 제대로 보이는 markdown이 gollum에서 제대로 보이지 않는다. 원인은 아직 확인 못했다.

gollum을 통해 문서를 생성해보지 못했다. 테스트 해보고 기록할 예정이다.
