# TypeORM Select Query Builder

TypeORM에서는 Query가 복잡해지면 Query Builder를 사용한다.

사용하는 것이 어렵지 않은 것 같으면서도 헷갈리는 부분이 많다.

사용했던 내용을 정리해보자.

## Entity

`User`

```ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Motivations } from './Motivations';
import { ExerciseAbleDays } from './ExerciseAbleDays';

export enum OpenImageChoice {
  OPEN = 'OPEN',
  FRIEND = 'FRIEND',
  CLOSE = 'CLOSE',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({
    type: 'enum',
    enum: OpenImageChoice,
    default: OpenImageChoice.OPEN,
  })
  openImageChoice: OpenImageChoice;

  @OneToMany(
    () => Motivations,
    (motivations) => motivations.user,
  )
  motivations: Motivations[];

  @OneToMany(
    () => ExerciseAbleDays,
    (exerciseAbleDays) => exerciseAbleDays.user,
  )
  ableDays: ExerciseAbleDays[];
}
```

User entity에 Motivations, AbleDistricts entity가 1:N으로 연결된다.

나머지 두 entity도 확인해보자.

`Motivations`

```ts
import {
  Entity, PrimaryGeneratedColumn, ManyToOne, Column,
} from 'typeorm';
import { User } from './User';

export enum Motivation {
  WEIGHT_INCREASE = 'WEIGHT_INCREASE',
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  FIND_FRIEND = 'FIND_FRIEND',
  LONELINESS = 'LONELINESS',
}

@Entity()
export class Motivations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => User,
    (user) => user.motivations,
  )
  user: User;

  @Column({ type: 'enum', enum: Motivation })
  motivation: string;
}
```

실제로 테이블을 생성해보면 User 테이블에 motivations 컬럼은 생성되지 않는다. motivations 테이블에 user는 userId라는 컬럼으로 생성된다. TypeORM을 처음 접할 때 이 부분이 이해가 잘 되지 않아 고생을 했었다.

User 테이블과 Motivations 테이블은 1:N 구조다. 그래서 User 테이블의 motivations에 `@OneToMany`라는 데코레이터가 붙어있다.

Motivations 테이블에는 `@ManyToOne` 테코레이터가 붙는다.

`ExerciseAbleDays`

```ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';
import { User } from './User';

export enum Weekday {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY'
}

@Entity()
export class ExerciseAbleDays {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Weekday })
  weekday: string;

  @ManyToOne(() => User, (user) => user.ableDays)
  user: User;
}
```

ExerciseAbleDays 테이블과 연결된 User 테이블의 ableDays라는 컬럼도 실제로는 존재하지 않는 컬럼이다.


## 조회

데이터를 조회해보자.

단순히 User 테이블의 전체 데이터를 조회하려면 다음과 같이 코드를 작성한다.

```ts
const users = this.find()