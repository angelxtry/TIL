# node.js project 시작하기

[Ashal님 자료 링크](https://github.com/ahastudio/til/blob/master/javascript/20181212-setup-javascript-project.md)

## 목표

- Node.js 설치
- 코드 퀄리티를 일정 수준 이상 높일 수 있도록 lint와 test를 실행할 수 있는 상태를 만든다.

## NVM(Node Version Manager) 설치

- 여러 버전의 Node.js를 설치하여 사용할 수 있다.
- 아샬님 링크 참조

## Node.js 설치

설치 가능한 Node.js 버전 확인

`nvm ls-remote`

LTS 버전을 설치하고 기본으로 사용하도록 설정한다.

```cmd
nvm ls
nvm install --lts
nvm use --lts
nvm alias default $(nvm current)
```

실행 결과

```cmd
$ nvm ls
->       system
node -> stable (-> N/A) (default)
iojs -> N/A (default)
lts/* -> lts/dubnium (-> N/A)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.16.0 (-> N/A)
lts/carbon -> v8.15.0 (-> N/A)
lts/dubnium -> v10.15.1 (-> N/A)

$ nvm install --lts
Installing latest LTS version.
Downloading and installing node v10.15.1...
...
Computing checksum with shasum -a 256
Checksums matched!
Now using node v10.15.1 (npm v6.4.1)
Creating default alias: default -> lts/* (-> v10.15.1)

$ nvm ls
->     v10.15.1
         system
default -> lts/* (-> v10.15.1)
node -> stable (-> v10.15.1) (default)
stable -> 10.15 (-> v10.15.1) (default)
iojs -> N/A (default)
lts/* -> lts/dubnium (-> v10.15.1)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.16.0 (-> N/A)
lts/carbon -> v8.15.0 (-> N/A)
lts/dubnium -> v10.15.1

$ nvm use --lts
Now using node v10.15.1 (npm v6.4.1)

$ echo $(nvm current)
v10.15.1

$ nvm alias default $(nvm current)
default -> v10.15.1
```

## NPM upgrade

`npm install -g npm`

## project dir 생성

```cmd
mkdir project-name
cd project-name
nvm use default
echo $(nvm current) > .nvmrc
```

`cat .nvmrc` 또는 `nvm use` 명령어를 이용해 해당 dir. 에서 사용하는 Node.js 버전을 확인할 수 있다.

## project 초기화

`npm init`

package.json 파일을 자동으로 생성해준다.

## ESLint 설치


