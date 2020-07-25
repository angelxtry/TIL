# deploy intro

## 목표

1.deploymoent의 의미를 알고, 배포를 진행할 수 있다.

2.AWS의 서비스 중 3개 이상을 알고, 설명할 수 있다.

3.ssh 접속의 의미를 알고 있다.

4.보안을 위하여 github에 올리지 말아야 할 코드를 gitignore로 분류할 수 있다.

## deploy strategy

### SPA (client)

react로 app을 만들었을 때 모든 파일을 다 서버에 올려야 할까?

react는 build라는 스크립트를 제공한다.

S3에 build의 결과물을 올려놓고 app을 다운받게 처리한다.

### server (api)

작성한 express 서버를 EC2에서 구동한다.

DB는 AWS RDS를 사용한다.

## deploy architecture

bare minimum

S3 - EC2 - RDS

advenced

Certificate Manager
Cloud Front
Route 53
ELB

Nightmare

AWS CLI
github
Code Build
Code Deploy

## AWS 가입

## AWS를 이용한 client 배포

### react app 생성

```cmd
create-react-app react-deploy
cd react-deploy
yarn start
yarn build
```

### bucket 생성 후 정적 파일 업로드

S3를 선택하여 bucket name을 입력하고 create: suho-react-deploy

Propertise - Static Website hosting 선택

  Index document, Error document를 index.html로 설정

Permissions

  Block public access: 체크 해제

  Bucket Policy
    Policy Generator
      Principal: *
      Actions: Get Object
      Amazon Resource Name (ARN): arn:aws:s3:::suho-react-deploy/*
  이렇게 설정하고 Generate Policy 버튼을 클릭하면 정책이 생성된다.
  이 정책을 `Bucket policy editor`에 입력하고 save 버튼을 클릭한다.
  `This bucket has public access` 메시지가 출력된다.

Overview로 돌아가 `yarn build`로 생성한 `build` 폴더 내의 파일들을 drag&drop으로 bucket에 넣는다.

### Endpoint 접속

`Propertise` - `Static Website hosting` 으로 다시 돌아가면 `Endpoint`라는 url을 확인할 수 있다.

클릭해보면 bucket에 올린 내용이 브라우저에 출력된다.

## AWS에 서버 배포

### Express simple server 생성

```cmd
mkdir express-deploy
cd express-deploy
mpn init -y
yarn add express
```

`indes.js` 파일 생성

```js
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello aws & express");
});

app.listen(5000, () => {
  console.log("server on 5000");
});

```

`node index`로 서버를 실행해보면 잘 동작하는 것을 확인할 수 있다.

이 code를 github에 올린다.

### EC2 생성 및 설정

AWS service -> EC2 선택

Launch Instance 클릭

`Ubuntu Server 18.04 LTS (HVM), SSD Volume Type` 선택

프리 티어로 사용가능한 `t2.micro` 선택

`Review and Launch` 클릭

정보를 확이하고 `Launch`를 클릭하면 `Select an existing key pair or create new key pair` popup 창이 나타난다.

`Create a new key pair`를 선택, `Key pair name`을 `practice-server-deploy`로 입력하고 `Download Key Pair` 버튼을 클릭하여 `practice-server-deploy.pem` 파일을 다운받는다.

`Launch` 버튼을 클릭하면 인스턴스가 생성된다.

생성 중인 인스턴스의 이름을 변경한다.

이 인스턴스에 접속하기 위해서는 `IPv4 Public IP`와 다운받은 pem key가 필요하다.

`Connect` 버튼을 클릭하면 어떻게 서버에 접속할 수 있는지 방법이 설명되어 있다.

먼저 pem 파일을 `~/.ssh`로 옮긴다.

설명에 나온대로 pem 파일의 권한을 변경한다.

```cmd
chmod 400 pemfile.pem
```

ssh로 접속한다.

```cmd
ssh -i "pemfile.pem" ubuntu@Public DNS (IPv4) or IPv4 Public IP
```

## AWS EC2 ubuntu에 환경설정

```cmd
sudo apt update
sudo apt install nodejs
sudo apt install npm
nodejs -v
npm -v
```

이제 git에 올려놓은 source를 git clone으로 복사한다.

복사가 끝나면 해당 폴더로 이동하여 `npm install`로 package를 설치한다.

설치가 완료된 후 `node index.js`로 서버를 실행할 수 있다.

여기까지 진행한 후 `Public IP`의 해당 포트로 브라우저에서 접속하면 아직 동작하지 않는다.

해당 EC2도 public 요청에 응답이 가능하도록 보안설정을 해야 한다.

## AWS EC2 보안 설정

해당 인스턴스의 `Security Group`을 확인한다.

`Security Group`에 접속해보면 `Inbound` tab에 `ssh` `22`번 포트만 허용되어 있다.

`Edit` 버튼을 클릭하고 `Add Rule`로 항목을 추가한다.

`Http`, `80`을 `Anywhere`로 설정하고 `Custom TCP`, `5000`을 `Anywhere`로 추가한다.

이제 브라우저로 `Public IP:PORT`로 접속하면 express 서버에서 보내준 응답을 받을 수 있다.

## pm2

현재 상태는 ubuntu 터미널을 닫으면 서버가 중단된다.

이러한 문제점을 해결하기 위해 pm2를 사용한다.

일단 pm2를 먼저 설치한다.

pm2는 ubuntu 터미널을 닫아도 node process가 계속 동작할 수 있도록 해준다.

```cmd
sudo npm install -g pm2
```

설치가 완료되면 `pm2 start index.js`로 실행한다.

`pm2 list`로 실행중인 프로세스를 확인할 수 있다.

## AWS RDS 설치

mysql 설정

## AWS RDS 활용

RDS가 생성되면

`Connectivity & security` tab에서 `Endpoint`, `Port`

`Configuration` tab에서 `Master username`을 확인할 수 있다.


