# Amazon linux, Node 설정

## EC2 생성

ec2 생성

보안그룹 연결

ssh 접속

## 서버 기본 설정

sudo yum update

sudo yum install git

sudo yum groupinstall "Development Tools"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

. .nvm/nvm.sh

nvm install v14 or nvm install node

npm install yarn -g

## git 설정

git clone https://github.com/gomicorp/QuickSightAPI.git

yarn

## git clone 이후

.env

.aws/credentials

```txt
[default]
aws_access_key_id =
aws_secret_access_key =
```

yarn prod

----

로드 밸런서 생성

- Application Load Balancer

대상 그룹 선택

- Targets 설정
