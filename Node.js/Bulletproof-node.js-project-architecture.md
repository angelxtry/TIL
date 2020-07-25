# 견고한 node.js 프로젝트 설계하기

[견고한 node.js 프로젝트 설계하기](https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0)를 읽었다.

참고할 만한 내용들을 적어둔다.

## 3계층 설계

Controller - Serveice Layer - Data Access Layer

레이어를 확실하게 분리하자.

Express Route Controller - Service Class - Data Access Layer(ORM 관련 코드)

## 비지니스 로직을 Controller에 넣지 마십시오

express의 controller와 비지니스 로직을 분리하자.

## Service 계층에 비지니스 로직을 넣자

Service layer에서는 SQL query 형태의 코드가 있으면 안된다. SQL query는 data access layer로 다 보내자.

express router에 service 코드를 넣지 말자.

req, res도 server layer에 넣으면 안된다.

상태코드와 header 같은 것들도 마찬가지다.

---

이외에도 의존성 주입이나 Loader 구조 활용등 배울만한 내용이 많았다.

다음 프로젝트에는 꼭 적용해보자.
