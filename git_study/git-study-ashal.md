# git study with ashal

git clone https://github.com/angelxtry/git-sample.git

clone 한 상태에서 아무것도 안하고 `git branch -a` 입력

```cmd
git branch -a
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

내가 fork를 했을 때는 upstream이 존재한다.
upstream을 추가하는 방법

```cmd
git remote add upstream https://github.com/dal-lab/git-sample.git
```

upstream의 변화를 가져온다.

```cmd
git fetch upstream
```

first-program이라는 branch를 만든다.

```cmd
git checkout -b first-program
```

file을 하나 만들고 add, commit

```cmd
vi app.py

git add .

git commit
```

이게 무슨 의미일까? 잘 모르겠다.

```cmd
git rebase upstream/master

First, rewinding head to replay your work on top of it...
Applying: Add first program
```

first-program branch를 push한다.

```cmd
git push origin first-program
Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (7/7), 1.14 KiB | 0 bytes/s, done.
Total 7 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), done.
remote:
Remove blank line
remote: Create a pull request for 'first-program' on GitHub by visiting:
remote:      https://github.com/angelxtry/git-sample/pull/new/first-program
remote:
To https://github.com/angelxtry/git-sample.git
 * [new branch]      first-program -> first-program
 ```

pull request 하라고 메시지도 출력해준다.

pull request를 하고 ashal님이 reject하는 시나리오

다시 파일 수정 후 add, commit

그리고 push

```cmd
git push origin first-program
```

pull request가 승인되면 rebase

```cmd
git rebase -i HEAD~2
[detached HEAD 531381c] Add first program
 Date: Fri Jan 25 21:58:07 2019 +0900
 1 file changed, 1 insertion(+)
 create mode 100644 app.py
Successfully rebased and updated refs/heads/first-program.
```

그리고 push를 -f 옵션을 사용하여 진행한다.

```cmd
git push origin first-program -f
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 358 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/angelxtry/git-sample.git
 + c9eebfc...531381c first-program -> first-program (forced update)
 ```

merge된 후 branch를 지우면 `git branch -a`라고 입력해도 보이지 않는다.
