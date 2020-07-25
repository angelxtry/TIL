# full structure

```cmd
.
├── README.md
├── jest.config.js
├── ormconfig.json
├── ormconfigSample.json
├── package.json
├── src
│   ├── entity
│   │   ├── Follow.ts
│   │   └── User.ts
│   ├── graphql
│   │   ├── follow
│   │   │   ├── followResolver.ts
│   │   │   ├── followSchema.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   └── user
│   │       ├── index.ts
│   │       ├── user.api.ts
│   │       ├── user.test.ts
│   │       ├── userResolver.ts
│   │       └── userSchema.ts
│   ├── index.ts
│   ├── repository
│   │   ├── Follower
│   │   │   ├── FollowerRepository.test.ts
│   │   │   ├── FollowerRepository.ts
│   │   │   └── index.ts
│   │   ├── User
│   │   │   ├── UserRepository.test.ts
│   │   │   ├── UserRepository.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── startServer.ts
│   ├── test
│   │   ├── callSetup.js
│   │   └── setup.ts
│   ├── types
│   │   └── type.ts
│   └── utils
│       └── token.ts
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```
