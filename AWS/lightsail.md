# amazon lightsail

우연히 amazon lightsail 이라는 상품이 출시되었다는 정보를 접했다.

2016년 re:invent 행사에서 소개되었나보다.

귀를 닫고 눈을 감고 사니까 세상 물정에 많이 어두워졌다.

쓸데없는 소리는 그만하고 이 서비스는 VPC(Virtual Private Cloud) 서비스이다.

설치형 블로그를 만들고 싶었으나 도메인 구입과 호스팅 때문에 머뭇거렸었는데 lightsail을 사용하면 호스팅은 자연스럽게 해결될 것 같다.

일단 시도해보자.

목표는 lightsail을 이용하여 wordpress 설치.

AWS에서 bitnami를 이용한 wordpress instance가 존재한다.

하지만 공부하는 차원에서 하나하나 설치하면서 구축해보자.

그래봤자 yum으로 해결하겠지만;;

----

## 20170331

아침에 출근하자마자 OS Only AMI 512M로 instance를 만들었다.

## 20170407

지난 주 금요일에 instance를 생성해 두고 한번도 못 봤다. 후우.

다시 시작해보자.

AWS에 접속해서 Account 계정으로 들어가 Download default key를 이용해 *.pem 파일을 다운받았다.

puttygen으로 ppk 파일을 생성하고 putty로 접속 성공

## 20170410

접속하자마자 sudo yum update로 업데이트

sudo yum install zsh

sudo su

chsh -s /bin/zsh

여기까지 진행하고 exit로 완전히 창을 닫은 후 다시 접속

echo $SHELL 로 shell을 확인했더니 /bin/bash가 나왔다.

음? 왜 변경이 안됐지?

그래서 sudo vi /etc/passwd 로 ec2-user의 shell을 직접 zsh로 변경

다시 접속하니 zsh로 설정은 됐는데 complete:13: command not found: compdef 이런 메시지가 보인다.

이건 뭘까?

검색해보니 /etc/profile.d/aws-cli.sh 권한 문제라고 하는데...

sudo chmod a-r /etc/profile.d/aws-cli.sh

이 명령어로 aws-cli.sh 파일의 권한을 축소했다. 그랬더니 complete:13: command not found: compdef 메시지가 안보인다.

/etc/profile.d% ls -la
total 60
...
-rw-r--r--  1 root root   95 Dec 16 22:01 aws-cli.sh
...

/etc/profile.d% sudo chmod a-r /etc/profile.d/aws-cli.sh
/etc/profile.d% ls -la
total 60
...
--w-------  1 root root   95 Dec 16 22:01 aws-cli.sh
...

일단 여기까지.
