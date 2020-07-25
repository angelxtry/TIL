# TypeORM

이번 프로젝트의 한 축을 담당하고 있는 TypeORM에 대해 조금 더 적어보려고 한다.

TypeORM을 사용해보니 DB table이 하나의 class이고, 해당 table의 row가 class의 instance, column이 class의 property 처럼 느껴졌다.

그리고 table들 사이에 관계가 맺어질 때 A class(A table)의 property가 B class(B table)의 instance를 참조하는 것 같은 느낌이다.

아무든 프로젝트 후반 부 까지 TypeORM을 명확하게 이해하지 못해 꽤나 삽질을 했다. 지금도 다 이해했다고 자신할 수는 없지만, 프로젝트 초반 부 보다 이해도가 많이 올라갔고, 원하는 구조는 만들 수 있을 것 같은 자신감이 생겼다.

이번 프로젝트에서 고민은 많이 했던 User, Follow Entitiy를 설명해보려고 한다.

## User, Follow Entity

요건

- 기본 User 정보 + following/followers 관계 표현

최초 구현

- Entity Code

following, followers도 결국 User - 자기 자신(User)을 참조

A user가 B user를 folloing하면 자동으로 A user는 B user의 follower로 설정됨

요건이 변경됨

- followers에 신규 user가 생겼는지 표시하자.
- following이 신규 follower의 상세정보를 확인하면 신규 user 표시를 제거.
=> 확인 여부 컬럼이 필요 => follow 관계를 별도 테이블로 분리

[Friend, Follow Code]

코드를 다시 작성

Test와 Typescript의 결정적인 역할!

## sequelize 보다 좋은 점

쉬운 테이블간 관계 설정

여러 table을 join하여 select하기 편리함
