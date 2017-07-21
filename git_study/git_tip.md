# tip

## windows git bash 한글문제

### 1. ls 명령어 실행시 한글 깨짐

`alias ls='ls --color=auto --show-control-chars'`

`--color=auto`는 한글과 상관없지만 이쁘니까 넣자

### 2. git status 실행시 한글 깨짐

`git config --global core.quotepath false`

success!
