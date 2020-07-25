# query, mutation을 효율적으로 작성하고 있는지 궁금합니다.

## 1. 유사한 Query를 통합 vs 분리, 어느 방법이 더 효율적일까요?

현재 Query schema는 다음과 같이 구성되어 있습니다.

```graphql
type Query {
  user(userId: String): User
  users: [User]!
  me: User
  motivations: [Motivation]
}
```

user, users를 분리하여 Query를 만들었습니다.

users(userId: String) 같은 Query를 만든다면 user, users를 하나로 통합할 수 있을 것 같습니다.

분리하는 것과 하나로 통합하는 것 중 어느 방법이 더 효율적일까요?

## 2. DB 테이블 별로 Query를 생성하는 것이 맞을까요?

저희 프로젝트의 DB schema는 다음과 같습니다.

https://dbdiagram.io/d/5dfa596bedf08a25543f39cb

[이미지]

```graphql
enum OpenImageChoice {
  OPEN
  FRIEND
  CLOSE
}

enum LevelOf3Dae {
  "L1 = '1: 0 ~ 99'"
  L1
  "L2 = '2: 100 ~ 199'"
  L2
  "L3 = '3: 200 ~ 299'"
  L3
  "L4 = '4: 300 ~ 399'"
  L4
  "L5 = '5: 400 ~ 499'"
  L5
}

enum MotivationEnum {
  WEIGHT_INCREASE
  WEIGHT_LOSS
  FIND_FRIEND
  LONELINESS
}

type Motivation {
  id: ID!
  motivation: String!
  owner: User
}

input MotivationInput {
  motivation: MotivationEnum
}

type User {
  id: ID!
  email: String!
  nickname: String!
  openImageChoice: String!
  levelOf3Dae: String!
  messageToFriend: String
  motivations: [Motivation]
}

type Query {
  user(userId: String): User
  users: [User]!
  me: User
  motivations(input: [MotivationEnum]): [Motivation]
}

type Mutation {
  setMotivation(input: [MotivationEnum]): [Motivation]
  me(
    nickname: String!
    openImageChoice: OpenImageChoice!
    levelOf3Dae: LevelOf3Dae!
    messageToFriend: String
  ): User!
}
`
```

아직 DB schema를 모두 GraphQL로 적용하지는 못 했습니다.

User를 통해 Motivation을 조회할 수 있고, Motivation을 통해 User를 조회할 수 있도록 구현되어 있습니다.

이 상황에서 user와 motivations Query를 별도로 생성해야 할 필요가 있는지 궁금합니다.

motivations를 통해 user를 조회하는 case가 있어 각각 Query를 만들었는데 REST api 같은 구조가 되는 것 같아 걱정스럽습니다.

지금 방식으로 진행된다면 User 테이블과 관계가 생기는 테이블 마다 Query를 생성하게 될 것 같습니다.
