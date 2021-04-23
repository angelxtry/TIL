# auto scaling

AWS Auto Scaling은 다음과 같은 항목들이 있다.

1. EC2 Auto Scaling
2. DDB Auto Scaling
3. Spot Fleet Auto Scaling
4. Aurora Auto Scaling
5. ECS Auto Scaling
6. RDS Auto Scaling: 스토리지 용량 자동 확장

EC2 Auto Scaling의 목표

1. 최소한의 인스턴스 사용
2. 원하는 만큼의 인스턴스 개수를 유지
3. 최대 인스턴스 개수 이하로 인스턴스를 유지
4. AZ에 골고루 분산되도록 인스턴스를 분배
5. 항상 서비스가 유지될 수 있는 인스턴스를 확보

EC2 Auto Scaling의 구성

- Launch Configuration: 무엇을 어떻게 실행시킬 것인가
  - EC2의 타입, 사이즈
  - AMI
  - Security Group, Key, IAM
  - User Data: EC2가 초기에 실행할 때 필요한 데이터와 액션
- Monitoring: 언제 실행시킬 것인가 + 상태 확인
  - CPU 점유율, 특정 개수 이상 EC2 유지
  - Cloud Watch, ELB 연계
- Desired Capacity: 규모
  - 최소 1개, 최대 3개
- Lifecycle Hook: 인스턴스 시작, 종료시 callback
  - 다른 서비스와 연계하여 전,후처리 가능 -> Cloud Watch Event, SNS, SQS
  - Terminating: wait, Termination: Proceed 상태로 전환
  - 기본 3600초 동안 기다림
  - 이 시간 동안 로그를 백업하는 등의 작업을 할 수 있음

실습

- AutoScaling Group 생성
  - Lunch Configuration(Web 서버) 및 Capacity 설정
- 인스턴스 변화에 따른 AutoScaling 적용 확인
  - 인스턴스가 종료되었을 때 어떻게 변화하는지 확인

## 1. IAM 생성

S3에서 source를 가져오는 권한

IAN -> Roles -> Create ->  AmazoneS3FullAccess -> Tag, Role name

## 2. S3 생성

bucket 생성 -> html file upload

## 3. EC2 생성

생성 시 IAM role에 방금 생성한 S3 Full Access 추가

참고: Enable CloudWatch detailed monitoring
- 기본 5분마다 모니터링
- Enable 하면 1분마다 모니터링
- 추가 비용 있음




