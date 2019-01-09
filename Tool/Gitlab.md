# Gitlab

## wiki

- 현재는 없지만 앞으로 생성하게 될 문서를 만들고 연결할 수 있다.
- git access
  - local로 가져와서 gitlab으로 push 할 수도 있다.
- page history도 있다.

## group

- 인원을 추가하고 인원의 권한을 할당할 수 있다.
- group과 team의 차이점
  - team에는 max access가 적용된다.

## permission

- guest
  - issue 생성
  - 댓글

## project

```cmd
git remote add origin https://gitlab.com/autoinfrak/archive.wiki.git
```

remote add

- local에 remote를 연결하겠다는 의미

origin https://xxxx

- 해당 git을 origin으로 지정하겠다는 의미
- 주소는 외우기 쉽지 않고 매번 입력하기 어렵기 때문에.

입력 후 엔터. 아무 반응이 없으면 잘 등록된 것.

```cmd
show remote -v

origin https://gitlab.com/autoinfrak/archive.wiki.git (fetch)
origin https://gitlab.com/autoinfrak/archive.wiki.git (push)
```

정상적으로 등록되었다면 위와 같은 명령을 입력하면 등록된 주소가 나온다.

```cmd
git push -u origin master
```

origin은 방금 입력한 git의 위치
master는 git의 기본 branch인 master branch를 의미

```cmd
git pull origin master
```

origin의 mater branch에 있는 것을 가져와 합친다는 의미

## issue

앞으로 처리해야 할 일들
누군가 봐야 할 것들
업무상 처리할 것들

open, close 상태가 있다.
처리가 다 됐다면 close.
처리가 다 된 줄 알았는데 부족한 부분이 있다면 reopen.

## labels

- SYSTEM
- KISNET
- KISDATA

- issue는 open, close 밖에 상태가 없다.
- labels를 이용하여 meeting 등을 별도로 분류할 수도 있다.
- 처리 된 것은 아니지만 다른 issue들로 분할되거나 통합될 경우 별도의 labels을 붙인다.
- 진행중, 검증대기 등도 labels로 분류할 수 있다.

...

## milestone

project의 중간 목표
프로그램의 다음 버전
여러 개의 issue로 구성된다.

크게 Due Date와 포함된 Issue로 관리한다.

## issue, labels, milestone을 사용하는 이유

업무를 효율적으로 관리하고 지난 업무를 추적하기 위해
업무를 잘 하기 위해 방법을 개선하기 위해

내부 회의를 통해 해야 할 일, 개선해야 할 업무 방식 등을 논의

매일 오전 회의

- 당일 해야 할 일들을 간단하게 발표
  - 일 하나당 한 문장정도
  - 최대한 일을 잘게 쪼개서 issue로 만든다.

- issue status
  - open
  - 진행중
    - 진행이 완료 된 것은 review 상태로 변경
  - 논의필요
    - 논의가 필요한 것 중 짧은 것(1분 이내)은 아침 회의
    - 논의가 길어질 만한 것은 아침 회의때 회의 일정을 잡는다.
  - review
    - 모든 업무는 처리가 완료되면 review 상태로.
    - 다 같이 한번 훓어보고, 모두 동의하면 close.
  - close
  - divide
  - 연기
  - reopen
