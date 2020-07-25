# GraphQL Authentication

GraphQL에서 인증은 context를 사용합니다.

- [Apollo Server Authentication](https://www.apollographql.com/docs/apollo-server/security/authentication/)

모든 schema에 인증을 적용! Cool! 심플하네!

요건 변경 - 일부 schema는 인증 없이 갈까요?

???

context 인증 방식 변경

resolver에 인증 절차 추가

인증이 필요한 resolver에는 `graphql-resolvers`의 `combineResolvers` 사용

express의 middleware 같은 느낌
