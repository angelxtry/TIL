# QNA

## VPC는 무엇의 약자일까요?

Virtual Private Cloud

## VPC의 사용 목적은 무엇일까요?

AWS 내에서 private ip를 사용하여 private network을 만들 수 있는 서비스.

네트워크를 격리하여 리소스를 안전하게 사용할 수 있는 환경을 만드는 것.

## VPC는 RFCOOOO 규격에 따라 Private IPv4 주소 범위에 속하는 CIDR 블록을 지정하는 것이 좋습니다.

RFC1918

## AWS VPC에서 Private IPv4 주소 범위는?

10.0.0.0/8

172.16.0.0/12

192.168.0.0/16

## VPC는 완전히 독립적입니다. VPC간 통신을 하려면 어떤 서비스를 사용해야 할까요?

VPC 피어링

## 서브넷은 무엇일까요?

VPC 내부에서 격리된 실제 리소스 그룹을 배치할 수 있는 네트워크(or 네트워크 대역) 입니다. 서브넷은 Available Zone과 연결됩니다.

## 서브넷을 나누는 목적은 무엇일까요?

서브넷 마다 Available Zone을 다르게 하여 물리적으로 리소스 그룹을 격리할 수 있는 등 관리에 용이합니다. 다른 이유는 또 없을까?

## 라우터와 라우트 테이블을 설명해주세요.

- VPC가 생성되면 라우트 테이블이 자동으로 생성됩니다.
- 라우트 테이블은 서브넷과 연결되어 있는 리소스 입니다.
- 서브넷에서 네트워크를 이용할 때 라우트 테이블을 이용하여 목적지를 찾게 됩니다.
- 

---

## 네트워크 ACL과 보안 그룹의 차이점은?

네트워크 ACL

- 서브넷에 적용
- allow, deny 설정 가능
- 연결된 서브넷의 모든 인스턴스에 자동 적용

보안그룹

- 인스턴스에 적용
- allow만 가능
- 보안 그룹을 인스턴스와 연결해야 적용됨

---

AWS아키 따는법 2020

https://brunch.co.kr/@topasvga/233

(공식)AWS 공인 클라우드 종사자

https://aws.amazon.com/ko/certification/certified-cloud-practitioner/

vpc - 개발, 운영환경 세팅 Bastion, NAT(3) - VPC 설정 후 외부에서 접속 가능하도록 bastion

https://nerd-mix.tistory.com/45?category=855097

AWS VPC를 디자인해보자(1) - Multi AZ와 Subnet을 활용한 고가용성

https://bluese05.tistory.com/45

Terraform으로 AWS VPC 생성하기

https://blog.outsider.ne.kr/1301

Dissecting AWS’s Virtual Private Cloud (VPC)

https://www.simplilearn.com/tutorials/aws-tutorial/aws-vpc
