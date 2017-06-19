# 내가 써보는 git 메뉴얼

- git을 잘 사용하고 싶은데 잘 안된다.
- 여러번 삽질도 해봤고 생활코딩에 강의도 들었다.
- Source Tree를 사용하면 기본적인 기능은 사용할 수 있는데 뭔가 좀 부족하게 느껴졌다.
- command line으로 사용법을 배워두는 것이 좋다고 생각한다.
- 그래서 다른 사람에게 설명한다고 가정하고 git 메뉴얼을 써보기로 했다.
- Outsider님의 글을 발췌, 요약하면서 진행한다.
- <https://blog.outsider.ne.kr/865>

## Fork
- Github의 기존 저장소를 보면 `Clone and download` 버튼이 있다.
- 이 버튼을 클릭하면 `https://github.com/...` 으로 시작하는 주소가 보인다.
- 혼자 소스를 살펴보기만 할다면 이 주소를 사용해서 `git clone 주소`하면 소스를 다운받을 수 있다.
- 오픈소스 저장소들은 대부분 읽기만 가능하다.
- 이 소스를 수정하고 싶다면 `Fork`한 뒤에 `Pull Request`하는 방식으로 진행된다.
- Github의 우측 상단에 보면 `Fork` 버튼이 있다.
- 이 `Fork` 버튼을 클릭하면 해당 저장소의 현재 상태 그대로를 복사해서 자신의 Github 계정에 저장소를 생성한다.
- `Fork`는 git의 기본 기능이 아니다. Github가 git의 기능을 이용하여 제공하는 Github 만의 기능이다.
- 이제 자신의 계정에 동일한 저장소가 생겼고 Read, Write 권한이 모두 주어진다.

## Clone
- Github에서 직접 소스를 수정하는 것은 매우 번거로운 작업이므로 `Fork` 한 저장소를 로컬에 내려받아야 한다.
- 이 과정이 `Clone`이다.
- `git clone GIT_ADDRESS` 라고 입력하면 로컬에 폴더가 생성되고 소스를 내려받는다.
- (SSH key를 사용하는 것이 HTTPS 보다 훨씬 빠르고 `push` 할 때 암호를 다시 입력하지 않아도 되므로 편리하다.)
- `Fork`가 Github 내에서 저장소를 복사한 것이라면 `clone`은 원격 저장소를 로컬로 복사한 것이다.

## branch / checkout
- 저장소의 소스를 수정하기 위해서 master branch를 수정해야 한다.
- Subversion과는 다르게 Git에서는 branch를 생성하는 것을 권장한다.
- master branch에서 다른 branch를 생성해서 작업하는 것이 일반적이다.
- `git branch BRANCH_NAME` 명령어를 사용해서 현재 branch에서 새로운 branch를 생성한다.
- `git checkout BRANCH_NAME` 명령어를 사용해서 새로운 branch를 현재 사용하는 branch로 변경한다.
- branch 이름은 `git flow`의 관례를 따르는 것이 좋다.
- `git checkout -b BRANCH_NAME` 은 branch를 생성하고 생성된 branch로 바로 이동한다.

## add
- 특정 파일을 수정하거나 추가했을 경우 `add`명령어를 이용하여 `commit`할 준비를 한다.
- `git add MODIFIED_FILE_NAME` 명령어를 이용하면 해당 파일이 `unstaged` 상태에서 `staged` 상태로 변경된다.

## commit
- 현재의 git 저장소에 수정한 파일(들)을 적용하고 history를 남기는 것.
- `add` 명령어를 이용해 `staged` 상태가 된 파일들을 `commit` 명령어로 저장한다.
- `git commit -m "COMMIT_MESSAGE"` 명령어로 수행한다.
- git의 `commit`은 원격 저장소의 상태를 직접 변화시키는 것이 아니라 로컬의 저장소에만 적용된다.
- SVN의 commit과 다른 점이다.

## fetch / merge / pull
- 로컬에서 작업을 하다보면 원격 저장소에 변경사항이 생긴다.
- `clone` 이후에 원격 저장소의 변경사항을 다시 로컬로 가져오는 것을 `fetch`
- `fetch`로 원격 저장소의 변경사항을 가져온 후 로컬 저장소의 branch와 합치는 것을 `merge`
- `git pull`이라는 명령어를 통해서 `fetch/merge` 과정을 한번에 진행할 수도 있다.
- 하지만 `git fetch`, `git merge`로 나누어 작업하는 것을 더 권장한다.


- push, pull request 등의 내용을 더 적어야 하는데 fetch도 잘 이해가 안되는 부분이 많다.
- 계속 공부하면서 천천히 적어보자.

## reset

실수로 add 한 것을 취소

전체를 취소하려면 `git reset`

하나씩 취소하려면 `git reset 파일명`
