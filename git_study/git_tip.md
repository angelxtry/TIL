# tip

## windows git bash 한글문제

### 1. ls 명령어 실행시 한글 깨짐

`alias ls='ls --color=auto --show-control-chars'`

`--color=auto`는 한글과 상관없지만 이쁘니까 넣자

### 2. git status 실행시 한글 깨짐

`git config --global core.quotepath false`

success!

## windows git password 저장

`git config credential.helper store`

- 원리를 잘 모르겠다.

## git user name, email 저장

```txt
git config --global user.name "이름"
git config --global user.email "이메일"
```

- 프로젝트 하나에서만 변경하고 싶다면

```txt
git config --local user.name "이름"
git config --local user.email "이메일"
```

## git 설정파일

경로 /c/Users/%USERNAME%
파일명 .gitconfig

.gitconfig 파일은 git 설정을 하나 추가하면 생성된다.
