# 프로젝트 구조

이번 프로젝트의 구조는 다음과 같다.

```cmd
├── src
│   ├── entity        (TypeORM - entity)
│   ├── repository    (Logic)
│   ├── graphql       (GraphQL Schema + Resolvers)
│   ├── types
│   ├── utils
│   ├── test          (jest global setting)
│   ├── index.ts
│   └── startServer.ts
├── jest.config.js
├── ormconfig.json
├── package.json
├── tsconfig.json
├── yarn.lock
└── README.md
```

이 중 entity, repository, graphql 폴더를 자세히 살펴보자.

## entity

TypeORM의 entity 파일들이 위치한다.

이번 프로젝트에서 작성한 entity는 8개다.

entity 파일들은 DB table과 1:1로 대응됨.

![table 전체 구조](https://drive.google.com/uc?export=view&id=1Moaj0RpswE4pdbshOS3o6v0svnDFm5hn)

## repository

로직을 담당하는 파일들이 모여있는 폴더다.

GraphQL <-> Repository <-> DB

덕분에 GraphQL Resolvers에서 로직을 분리할 수 있었다.

repository의 파일들은 TypeORM의 Data Mapper 방식으로 구현했다.

이해를 돕기위해 간단하게 설명을 추가해보자.

TypeORM의 공식 페이지의 내용을 인용해보자면

> The decision is up to you. Both strategies have their own cons and pros.
>
>One thing we should always keep in mind in with software development is how we are going to maintain our applications.
The Data Mapper approach helps with maintainability, which is more effective in bigger apps. The Active record approach helps keep things simple which works well in smaller apps. And simplicity is always a key to better maintainability.

[Active Record vs Data Mapper - https://typeorm.io/#/active-record-data-mapper](https://typeorm.io/#/active-record-data-mapper)

Active Record

- entity 생성시 BaseEntity를 상속.
- 코드가 심플함.

Data Mapper

- entity 별로 Repository를 별도 생성하여 사용.
- 보다 복잡한 로직을 관리하기 용이함.

샘플 코드로 한번 더 설명해보자면

```ts
코드추가
```

## graphql

GraphQL schema 별로 폴더를 분리했다.

처음에는 schema.ts 라는 파일에서 프로젝트에서 사용하는 모든 GraphQL Schema를 관리했다.

이렇게 작성했을 때 여러가지 문제점이 발생했다. schema가 길어지면서 특정 schema를 찾는데도 시간이 오래걸렸고, 수정이 반복되면서 코드가 점점 더 어지러워졌다.

entity와 repository가 DB table과 1:1로 매핑되는 것과 상관없이 schema는 좀 더 소프트하게 분리했다. 즉, 같은 DB table의 정보를 사용하더라도 역할이 다르거나, 유지보수 주기가 다르다면 분리했다.

Schema가 한 파일에 있을 때 Query 및 type

```ts
코드
```

Schema 분리 후 각각의 Query 및 type

```ts
코드
```

이렇게 나누고 나니 각 schema에 맞는 resolver를 생성하는 것이 훨씬 수월해졌다.

```ts
폴더별 resolver skelcton
```

그리고 각 폴더에 테스트 파일도 각각 생성하여 관리했다.

```cmd
폴더, 파일 구조 tree
```
