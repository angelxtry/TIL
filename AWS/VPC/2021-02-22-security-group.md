# Security Group

보안장치

- NACL과 함께 방화벽 역할을 하는 서비스

Port 허용 

- 트래픽이 지나갈 수 있는 Port와 Source를 지정 가능
- Deny는 불가능

Stateful

- Inbound로 들어온 트래픽이 Outbound 설정 없이 나갈 수 있음

Stateful vs. Stateless(NACL)

C: xxx.xxx.xxx.xxx:56789, sss.sss.sss.sss:80 -> S

Inbound 상태, 즉 port를 기억하고 있기 때문에 Stateful 이라고 한다.

Well Known Port

Ephemeral Port

NACL은 Ephemeral Port를 열어야 한다.
