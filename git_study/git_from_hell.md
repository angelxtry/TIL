# branch

`git init`

`vi 1.txt`

a 입력

`git add 1.txt`

`git commit -m "1"`

vi 1.txt

b 입력

`git commit -a -m 1.txt`

git log

git branch

master를 확인할 수 있다.

git branch exp

exp branch 생성

git branch

master, exp 확인

`git checkout exp`

git branch 로 branch 상태 확인

ls -la 로 파일 상태 확인

git log 확인

master branch와 동일한 상태를 확인

`vim 1.txt`

c 입력

`git commit -am "3"`

이 상태에서 master로 이동

`git checoout master`

`git log` 로 확인해보면 3번째 commit은 없다.

1.txt의 내용도 a b 만 존재한다.

exp로 checkout한 상태에서 생성한 파일도 checkout 하면 사라진다.

----

`git log --branches --decorate --graph`

`git checkout master`

`vim f3.txt`

a 입력

`git add f3.txt`

`git commit -m "5"`

`git log --branches --decorate --graph`

화면상에 분기가 표시된다.

`git log --branch --decorate --graph --oneline`

로그를 한줄로 표시하여 log tree를 보여준다.

해당 디렉토리에서 `stree`라고 입력하면 해당 디렉토리를 source tree로 확인할 수 있다.

`git log master..exp`

master에는 없고 exp에 있는 것을 보여준다.

`git log exp..master`

exp에는 없고 master에 있는 것을 보여준다.

`git log -p exp..master`

source code와 같이 차이를 보여준다.

`git diff master..exp`

master와 exp의 차이를 보여준다.

----

exp의 내용을 master로 가져오는 것

master로 checkout한 후 master에서 merge 명령을 한다.

`git checkout master`

`git merge exp`

vim화면과 비슷한 창이 열린다.

git log를 자세히 남기자.

wq로 저장하고 나오면 merge 완료

----

`git checkout exp`

`git merge master`

`git log --branches --decorate --graph --oneline`

exp와 master가 모두 HEAD위치에 있는 것을 알 수 있다.

----

exp branch가 더이상 필요 없다면

`git checkout master`

`git branch -d exp`

exp branch가 삭제된다.

`git log --branches --decorate --graph --oneline`

exp는 없어졌고 master만 남아있다.

----

git 수련

git-scm.com

documentation 클릭 -> book 클릭 -> git branching -> basic branching and merging

2가지 형태의 branching 

`git checkout -b iss53`

이 명령어는 branch를 만들고 checkout까지 한번에 진행한다.

iss53을 수정하는 도중 master를 수정할 일이 발생

`git checkout -b hotfix`

hotfix branch를 생성하여 코드 수정 -> 완료

`git checkout master`

`git merge hotfix`

fast-forward 메시지가 발생. 빨리 감기라는 뜻이다.

master는 hotfix와 같은 것을 가리키게 된다.

즉, 별도의 commit을 생성하지 않고 master가 가리키는 것을 바꾸기만 한다는 의미다.

hotfix의 수정이 끝났으므로 hotfix branch를 지운다.

`git branch -d hotfix`

다시 iss53으로 돌아가서 코드 수정을 마무리 짓는다.

iss53을 master에 merge하기 위해 master로 돌아간다.

`git checkout master`

`git merge iss53`

다음과 같은 메시지가 출력된다.

Merge made by the 'recursive' strategy

iss53 branch가 분기한 이후에 master branch에 commit이 발생했다.

그래서 merge를 시행하면 공통의 조상으로 돌아가 변경내용을 확인한 후 

추가적으로 commit을 진행하여 master와 iss53을 병합한다.

이것을 merge commit이라고 부른다.

----

## stash

감추다. 숨겨두다.

특정 branch에서 작업을 하던 도중 다른 branch로 checkout하여 작업을 해야 할 경우

commit 하기는 애매하고 commit을 하지 않으면 checkout을 할 수도 없다.

`git init`

`vim f1.txt`

a 입력 후 저장

add -> commit

`git checkout -b exp`

`vim f2.txt`

b 입력 후 저장

add 한 후 commit을 하지 않고 master로 checkout을 하면 수정하던 내용이 master에도 영향을 준다.

exp branch에서 commit 하기 전이라면 stash를 이용한다.

`git stash`

Saved working directory ... 같은 메시지가 출력된다.

`git status`

commit할 내용이 없다고 출력된다.

f1.txt를 확인해보면 작업했던 내용들이 사라져있다.

`git checkout master`

master branch로 정상적으로 checkout 된다.

master에서 작업을 마치고 다시 exp로 checkout 한다.

`git checkout exp`

stash에 저장했던 내용들을 불러온다.

`git stash apply`

f1.txt 파일에서 작업하던 내용이 다시 나타난다.

`git stash list`

위와 같이 입력하면 stash에 저장했던 이력이 출력된다.

`git reset --head HEAD`

위와 같이 입력하면 작업하던 내용이 삭제되고 HEAD의 내용으로 복구된다.

`git stash apply` 를 다시 입력하면 저장했던 내용이 다시 복구되면서

exp branch에서 작업하던 내용이 나타난다.

즉 stash list에 존재하는 내용은 명시적으로 삭제하지 않으면 계속 불러올 수 있다.

`vim f2.txt` -> 내용입력

`git stash` (save 가 생략되어 있다.)

f2.txt의 내용이 stash에 저장된다.

`git stash list`로 확인해보면 0번, 1번이 존재한다.

마지막에 저장한 f2.txt에 대한 stash가 0번이다.

`git stash apply`라고 입력하면 가장 최근에 저장한 stash가 복구된다.

stash에 저장된 것을 지우려먼 `git stash drop`이라고 입력한다.

drop을 하면 최근에 저장된 것부터 삭제된다.

`git stash apply; git stash drop;`

stash의 가장 최근 작업 1개를 복구하고 삭제한다.

`git stash pop`을 이용하면 `git stash apply; git stash drop;`과 동일하다.

stash를 적용할 수 있는 파일은 최소한 add 상태이어야 한다.

즉, Untracked file은 stash되지 않는다.


