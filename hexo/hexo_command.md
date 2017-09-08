## hexo -> git 배포

```
hexo clean
hexo generate --deploy
```

## hexo 글쓰기

### draft 작성

```
hexo new draft "md파일명"
```

* md파일명에서 `.md`확장자는 제외한다.

* permalink 로 사용되므로 영문명으로 작성한다.

* 소문자만 가능하다.

* 공백이 있을경우 `-`로 자동치환된다.

* `"`를 양쪽에 붙이는 것이 좋다.


### draft를 post로 변경

```
hexo publish "md파일명"
```
