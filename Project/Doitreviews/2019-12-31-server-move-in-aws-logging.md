# 서버이전

## front

### 기본정보

#### Security Group

inbound: 22, 80, 443, 3000

#### Load Balancer

Port Configuration

- 80 (HTTP) forwarding to 3000 (HTTP)
- 443 (HTTPS, ACM Certificate) forwarding to 3000 (HTTP)

Health check

- HTTP:3000/index
- 5, 10, 2, 5

### 작업 과정

새로운 EC2 생성

Elastic IP 적용

Security Group 생성 & 적용

서버 접속 후 서버 설정

```js
sudo apt-get update

sudo apt-get install -y build-essential

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash --

sudo apt-get install -y nodejs

git clone

npm i --production

npm i -g sequelize-cli (only server)

npm i -g pm2

secret file copy

npm start
```

인증서 생성

- abc.com, *.abc.com 생성
- CNAME을 기존 계정의 Route53에 등록
- 기다리면 Pending -> Issued로 변경됨

Load Balancer 생성

- Classic Load Balancer 선택
  - 기존에 만들었던 인증서 추가
  - health check 설정
  - 신규 서버 health check 확인

기존 계정 Route53에 신규 서버 등록

- front 서버이므로 abc.com, www.abc.com을 모두 변경
- Alias Target에 신규 계정 Load Balancer의 DNS name 등록
- 일정 시간 대기 후 접속 확인 -> 성공!

기존 계정의 자원 정리

EC2 stop

Elastic IP 삭제

Load Balancer 삭제

끗!
