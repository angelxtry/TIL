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