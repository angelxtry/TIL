# git training 20181214

git branch develop/new-structure

git checkout develop

## git에서 branch 합치기

bugFix branch를 만들고 bugFix branch로 이동, 그리고 commit

git checkout을 이용해 master branch로 이동, 그리고 commit

git merge로 bugFix branch를 master와 합치기

```git
git branch bugFix

git checkout bugFix

git commit -m "Fix bug"

git checkout master

git commit -m "Update master"

git merge bugFix
```

## rebase의 기본

bugFix라는 새 branch를 만들어 checkout, commit

master branch로 돌아가서 commit

bugFix를 다시 선택하여 master에 rebase

mater와 bugFix branch가 분리되어 있고 bugFix에 checkout되어있는 상태에서 git rebase master 하면 master branch 아래로 bugFix branch가 옮겨진다.
다르게 표현하자면 bugFix branch를 master branch로 base를 옮긴다? 정도의 의미가 되겠다.

master
|
|
bugFix*

이 상태에서 master를 최신 상태로 만들기 위해 git rebase master라고 입력하면 다음과 같이 된다.

|
|
master*
bugFix
