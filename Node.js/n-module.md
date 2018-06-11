# n – Interactively Manage Your Node.js Versions

- n이 npm 모듈 이름이었다.
- pyenv처럼 Node.js의 버전 관리를 해주는 듯하다.

- 참조링크
  - [velopert](https://velopert.com/1351)
  - [npm](https://www.npmjs.com/package/n)

## n module 설치

```cmd
sudo npm install -g n
```

## n을 이용한 node 설치

```cmd
n lastest

n stable

n lts
```

## activating version

- command 입력시 sudo를 붙이도록한다.
- 아니면 permission error가 발생하는 듯 하다.

- `n`을 입력하면 버전을 선택할 수 있다.

```cmd
n
```

- 특정 버전을 지정하여 활성화할 수도 있다.

```cmd
n 8.11.2
```
