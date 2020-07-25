# Subscription

Subscription은 내가 등록한 어떤 이벤트에 대한 신호를 받는 것이다. (신호를 받으려면 수신기와 발신기가 필요하다.)

특정 post에 comment가 추가되면 comment를 보내는 subscription을 만들어보자.

먼저 PubSub이라는 class의 instance를 하나 만들어야 한다.

```ts
import { ApolloServer, PubSub } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import schemas from './schemas';

const pubsub: PubSub = new PubSub();

const options = {
  port: 9999,
  playground: '/playground',
};

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: { pubsub },
});

server.listen(options, () => {
  console.log('Server start.');
});
```

context로 pubsub을 전달했다.

GraphQL Schema를 작성한다.

```ts
// src/modules/subscriptionSchema.ts

import { gql } from 'apollo-server';

const subscriptionSchema = gql`
  type Subscription {
    comment(postId: ID!): Comment!
  }
`;

export default subscriptionSchema;
```

Subscription type에 comment를 생성했다. comment는 postId를 인자로 받고 Comment를 반환한다.

```ts
// src/modules/comment/commentResolver.ts

import uuidv4 from 'uuid/v4';
import { ApolloError, PubSub } from 'apollo-server';
import { comments, users, posts } from '../../fakeData';

interface PubSubContext {
  pubsub: PubSub;
}

const commentResolvers = {
  Mutation: {
    createComment: (_: any, args: any, context: PubSubContext) => {
      const isExistUser = users.some((user) => user.id === args.data.author);
      if (!isExistUser) {
        throw new ApolloError('User not exist', 'USER_NOT_EXIST');
      }
      const comment = {
        id: uuidv4(),
        ...args.data,
      };
      comments.push(comment);

      const { pubsub } = context;
      pubsub.publish(`comment ${args.data.post}`, { comment });

      return comment;
    },
  },
  Subscription: {
    comment: {
      subscribe(_: any, args: any, context: PubSubContext) {
        const post = posts.find((p) => p.id === args.postId);
        if (!post) {
          throw new ApolloError('Post not exist', 'POST_NOT_EXIST');
        }
        const { pubsub } = context;
        return pubsub.asyncIterator(`comment ${args.postId}`);
      },
    },
  },
};

export { commentResolvers };
```

commet resolver에서 Subscription type의 comment를 정의한다. context로 전달받은 pubsub을 이용하여 asyncIterator라는 메서드를 실행한다. (이것이 수신기다.) 특정 이벤트를 구독하는 것이다. 인자로 문자열을 전달하는데, 이 문자열로 이벤트가 발생하면 데이터가 전달(?)된다.

Mutation의 createComment에 pusub.publish라는 메서드를 사용한다. (이것이 발신기다.)이렇게 코드를 작성하면 모든 post에 comment가 작성될 때마다 신호를 발생시킬 것이다. 신호에는 publish가 인자로 받은 문자열이 이름표처럼 붙어서 생성된다. 해당 문자열과 동일한 문자열이 asyncIterator에 붙어있다면 그쪽으로 두 번째 인자인 comment가 전달된다.
