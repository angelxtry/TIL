# dataloader

mkdir graphql-dataloader

mkdir graphql-dataloader

git clone https://github.com/angelxtry/graphql-apollo-boilerplate.git .

rm -rf .git

yarn

yarn add dataloader

dataLoaderTest.ts 파일 생성

```ts
import Dataloader from 'dataloader';

const batchFn: any = (ids: any) => {
  console.log(ids);
  return new Promise((resolve) => {
    resolve(ids);
  }).catch((error) => console.log(error));
};

const dataLoaderTest = () => {
  const userLoader = new Dataloader((ids) => batchFn(ids));

  userLoader.load(1);
  userLoader.load(2);
  userLoader.load(3);
  userLoader.load(4);
  userLoader.load(3);
  userLoader.load(2);
  userLoader.load(1);
  userLoader.load(4);
  userLoader.load(1);
};

export default dataLoaderTest;

```

```ts
import { ApolloServer, gql } from 'apollo-server';
import { users } from './fakeData';
import dataLoaderTest from './dataLoaderTest';

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
  }

  type Query {
    user(id: Int!): User!
    users: [User]!
  }
`;

const resolvers = {
  Query: {
    user: (_: any, args: any) => users.find((user) => user.id === args.id),
    users: () => {
      console.log(users);
      return users;
    },
  },
};

const options = {
  port: 9999,
  playground: '/playground',
};

dataLoaderTest();

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(options, () => {
  console.log('Server start.');
});

```

여기까지 와 보니 graphql은 사실 아무 의미 없었네. 그냥 dataloader가 별도의 라이브러리인듯?

실행하면 결과가 이렇다.

```cmd
[ 1, 2, 3, 4 ]
```

이게 나도 잘을 모르겠는데 `userLoader.load(1);`로 여러 번 실행을 하면 event loop 1 tick동안 모아져서 한번에 실행되고, 동일한 실행 결과는 cache로 해결한다는 듯?

```ts
userLoader.load(1);
userLoader.load(2);
userLoader.load(3);
userLoader.load(4);
userLoader.load(3);
userLoader.load(2);
userLoader.load(1);
userLoader.load(4);
userLoader.load(1);
userLoader.load(101);
userLoader.load(102);
userLoader.load(103);
userLoader.load(104);
userLoader.load(103);
userLoader.load(102);
userLoader.load(101);
userLoader.load(104);
userLoader.load(101);
```

```cmd
[ 1, 2, 3, 4, 101, 102, 103, 104 ]
```

동일한 값을 아무리 여러번 실행해도 한 번만 실행된다.

```ts
userLoader.load(1);
userLoader.load(2);
userLoader.load(3);
userLoader.load(4);
userLoader.load(3);
userLoader.load(2);
userLoader.load(1);
userLoader.load(4);
userLoader.load(1);

setTimeout(() => {
  userLoader.load(101);
  userLoader.load(102);
  userLoader.load(103);
  userLoader.load(104);
  userLoader.load(103);
  userLoader.load(102);
  userLoader.load(101);
  userLoader.load(104);
  userLoader.load(101);
}, 2000);
```

```cmd
[ 1, 2, 3, 4 ]
[ 101, 102, 103, 104 ]
```

이러면 2번에 나눠서 실행된다.

dataloader에는 cache, batch를 옵션으로 입력할 수 있다. default는 true다.

```ts
const dataLoaderTest = () => {
  const userLoader = new Dataloader((ids) => batchFn(ids), { cache: false });

  userLoader.load(1);
  userLoader.load(2);
  userLoader.load(3);
  userLoader.load(4);
  userLoader.load(3);
  userLoader.load(2);
  userLoader.load(1);
  userLoader.load(4);
  userLoader.load(1);

  setTimeout(() => {
    userLoader.load(101);
    userLoader.load(102);
    userLoader.load(103);
    userLoader.load(104);
    userLoader.load(103);
    userLoader.load(102);
    userLoader.load(101);
    userLoader.load(104);
    userLoader.load(101);
  }, 2000);
};
```

```cmd
[ 1, 2, 3, 4, 3, 2, 1, 4, 1 ]
[ 101, 102, 103, 104, 103, 102, 101, 104, 101 ]
```

한 묶음씩 모아서 처리하긴 했지만 중복값이 있더라도 모두 실행되었다.

```ts
const dataLoaderTest = () => {
  const userLoader = new Dataloader((ids) => batchFn(ids), { batch: false });

  userLoader.load(1);
  userLoader.load(2);
  userLoader.load(3);
  userLoader.load(4);
  userLoader.load(3);
  userLoader.load(2);
  userLoader.load(1);
  userLoader.load(4);
  userLoader.load(1);

  setTimeout(() => {
    userLoader.load(101);
    userLoader.load(102);
    userLoader.load(103);
    userLoader.load(104);
    userLoader.load(103);
    userLoader.load(102);
    userLoader.load(101);
    userLoader.load(104);
    userLoader.load(101);
  }, 2000);
};
```

```cmd
[ 1 ]
[ 2 ]
[ 3 ]
[ 4 ]
[ 101 ]
[ 102 ]
[ 103 ]
[ 104 ]
```

`batch: false`만 옵션을 입력하면 중복값은 사라지지만 한 건씩 처리된다.

yubylab promise

```ts
const batchFn: any = (ids: any) => {
  console.log(ids);
  return new Promise((resolve) => {
    resolve(ids);
  }).catch((error) => console.log(error));
};
```

실제로는 batchFn에서 ids를 이용하여 DB 조회 등을 하면 해당 결과가 promise로 나온다.

```ts
const batchFn: any = (ids: any) => {
  return Promise.resolve(() => {
    return ids.map(id => db.User.get(id));
  });
};
```

