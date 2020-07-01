# Typescript

## 설치

npm i -g typescript ts-node

tsc --version
tsc --help

tsc -> typescript compiler

### vscode 설정

prettier extension 설치

vscode 저장 시 prettier 설정
  setting에서 format on save 검색

use single quotes on prettier

use two spaces for indentation

## 5. Excuting Typescript Code

mkdir fetchjson
cd fetchjson
npm init -y
npm i axios

index.ts 파일 생성

```ts
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

axios.get(url).then(res => {
  console.log(res.data);
});

```

tsc index.ts

index.js 파일이 생성됨

node index.js

ts-node index.ts 라고 실행하면 컴파일과 실행이 한 번에 처리됨

## 6. One Quick Change

다음의 코드를 보자.

```ts
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

axios.get(url).then(res => {
  console.log(res.data);

  const todo = res.data;

  const ID = todo.ID;
  const title = todo.Title;
  const finished = todo.finished;

  console.log(`
    ID: ${ID}
    title: ${title}
    finished: ${finished}
  `)
});

```

눈에 뻔히 보이는 실수가 포함되어 있다.

실행해보면 오류는 발생하지 않는다.

```ts
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then(res => {
  console.log(res.data);

  const todo = res.data as todo;

  const id = todo.id;
  const title = todo.title;
  const completed = todo.completed;

  console.log(`
    id: ${id}
    title: ${title}
    completed: ${completed}
  `);
});
```

코드를 수정했다.

중간에 todo의 interface를 정의했다.

그리고 todo를 선언할 때 todo interface를 이용한다.

이렇게 하자마자 선언된 interface와 달라지는 부분에서 빨간색 밑줄이 생긴다.

빨간색 밑줄을 처리하다보면 오류는 자연스럽게 수정된다.

## 8. Catching More Errors

```ts
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get(url).then(res => {
  console.log(res.data);

  const todo = res.data as todo;

  const id = todo.id;
  const title = todo.title;
  const completed = todo.completed;

  logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean) => {
  console.log(`
    id: ${id}
    title: ${title}
    completed: ${completed}
  `);
};

```

logTodo 라는 함수를 선언했다.

이때 인자로 받는 변수들의 타입을 지정하면 에러가 발생할 가능성이 줄어든다.

## 15. Annotations with Variables

```ts
const apples: number = 5;
```

여기서 number 같은 것을 annotation이라고 한다.

```ts
const nothingMuch: null = null;
const nothing: undefined = undefined;
```

null, undefined도 type이다.

```ts
const new: Date = new Date();
```

built in object인 Date도 type이 될 수 있다.

배열의 type은 다음과 같이 표현한다.

```ts
const colors: string[] = ['red', 'blue', 'green'];
const truths: boolean[] = [true, true, false];
```

class

```ts
class Car {

}

const car: Car = new Car();
```

Object literal

```ts
const point: { x: number; y: number; } = {
  x = 10,
  y = 10
}
```

object literal의 경우 x, y의 값이 숫자가 아닐 경우, 에러라고 인식한다.

또한 x, y가 아니라 다른 변수일 경우에도 에러라고 인식한다.

Function

```ts
const logNumber = (i) => {
  console.log(i);
};
```

위와 같은 함수가 있을 때 type annotation을 추가하면 다음과 같다.

```ts
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};
```

## 18. Understanding Interface

언제 annotation을 써야 할까?

1.Any type을 return하는 함수가 있을 떄

```ts
const json = '{ "x": 20, "y": 10 }';
const coordinates = JSON.parse(json);
console.log(coordinates);
```

coordinates는 any type이다.

coordinates.ajdfjasd 라고 입력해도 오류가 있다고 표시되지 않는다.

다음과 같이 수정해보자.

```ts
const coordinates: { x: number; y: number } = JSON.parse(json);
```

이제 coordinates는 any type이 아니다.

```ts
const numbers = [-12, -10, 12];
let numberOverZero: boolean | number = false;

for (const num of numbers) {
  if (num > 0) {
    numberOverZero = num;
  }
}
```

헐 type을 2개를 지정할 수가 있구나.

근데 왜 저렇게 쓰는 거지? 안티패턴 같은 느낌인데?

함수를 좀더 자세히 살펴보자.

다음과 같이 type을 지정할 수 있다.

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

음... void와 never는 이해못했다.

```ts
const forecast = {
  date: new Date(),
  weather: 'sunny'
};

const logForecast = (forecast: { date: Date; weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
};

logForecast(forecast);

```

object를 인자로 전달할 때 위와 같이 type을 지정할 수 있다.

다음과 같이 표현할 수도 있다.

```js
const forecast = {
  date: new Date(),
  weather: 'sunny'
};

const logForecast = ({
  date,
  weather
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};

logForecast(forecast);

```

object를 살펴보자.

```ts
const profile = {
  name: 'jake',
  age: 20,
  weight: 50,
  coord: {
    x: 0,
    y: 1
  },
  setAge(age: number): void {
    this.age = age;
  }
};

const { age }: { age: number } = profile;
const {
  coord: { x, y }
}: { coord: { x: number; y: number } } = profile;

```

튜플도 있다.

```ts
const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
};

type Drink = [string, boolean, number];

const pepsi: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', true, 0];
```

## 36. Interface

interface: 사용자가 필요해서 만든 새로운 type

```ts
interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  }
};

const logVehicle = (vehicle: Vehicle): void => {
  console.log(`
    ${vehicle.name}
    ${vehicle.year}
    ${vehicle.broken}
  `);
};

logVehicle(oldCivic);

```

Vehicle이라는 interface가 없었다면 logVehicle 함수에서 인자에 type을 모두 적어주어야 한다.

꽤나 긴 코드가 예상된다.

interface에 method도 정의할 수 있다.

```ts
interface Reportable {
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string {
    return `Name: ${this.name}`;
  }
};

const printSummary = (item: Reportable): void => {
  console.log(item.summary());
};

printSummary(oldCivic);

```

객체의 일부만을 포함하고 있지만 interface를 모두 구현하면 해당 type이라고 부를 수 있다.

다음의 객체가 추가되었다.

```ts
const drink = {
  color: 'brown',
  sugar: 40,
  summary(): string {
    return `My drint has ${this.sugar} percents.`;
  }
};

```

이 객체도 summary를 포함하고 있기 때문에 Repotable type이라고 할 수 있다.

따라서 `printSummary(drink)`도 잘 동작한다.

## 49. App Overview

npm i -g parcel-bundler

mkdir maps
cd maps
npm init -y

index.html 파일 생성

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <script src="./src/index.ts"></script>
</body>
</html>
```

`src/index.ts` 생성

```ts
console.log('hi there!');
```

터미널에서 `parcel index.html`이라고 입력하면 컴파일 후 `localhost:1234`로 접속할 수 있게된다.

해당 페이지에서 확인해보면 index.ts가 파일명이 변경되고 확장자는 js로 변경된 것이 보인다.

## 52. Generate Random Data

faker를 설치한다.

npm i faker

javascript 파일을 사용하려면 type definition file이 필요하다.

npm i @types/faker

type definition file은 xxx.d.ts 라는 파일명으로 되어있다.

`src/User.ts`

```ts
import faker from 'faker';

export class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.findName();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }
}
```

class에서 instance 변수들을 선언하고 constructor에서 값을 입력한다.

`index.ts`

```ts
import { User } from './User';

const user = new User();

console.log(user);

```

터미널 창에서 `parcel index.html`을 입력하면 컴파일 후 build된다.

브라우저에 접속하여 console 창을 확인해보면 user 정보를 확인할 수 있다.

company도 동일한 방식으로 추가한다.

google map api 추가

## 59. Google Maps Integration

index.ts 파일에서는 global 객체를 사용할 수가 없다.

그래서 `@types/googlemaps` 설치가 필요하다.

npm i @types/googlemaps

`command + shift + p` -> `fold level 2`

## 66. Restricting Access with Interface

```ts
import { User } from './User';
import { Company } from './Company';

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  addUserMaker(user: User): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: user.location.lat,
        lng: user.location.lng
      }
    });
  }

  addCompanyMaker(company: Company): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: company.location.lat,
        lng: company.location.lng
      }
    });
  }
}
```

addUserMaker와 addCompanyMaker는 심하게 중복이다.

이 중복을 어떻게 제거할 수 있을까?

우선 다음과 같이 생각할 수 있다.

```ts
addMaker(mappable: User | Company): void {
  new google.maps.Marker({
    map: this.googleMap,
    position: {
      lat: mappable.location.lat,
      lng: mappable.location.lng
    }
  });
}
```

Maker를 만들기위해 필요한 것은 location이다.

User와 Company는 모두 location을 가지고 있고 mappable이라는 추상화된 인자를 이용하여 구분 없이 addMaker 메서드를 사용할 수 있다.

하지만 User, Company외에 다른 class들이 더 추가된다면 파이프를 이용하여 계속 추가해야 한다.

그래서 Interface를 이용한다.

```ts
interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  addMaker(mappable: Mappable): void {
    new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });
  }
}

```

Mappable이라는 interface를 선언한다.

그리고 addMaker 메서드에서는 interface를 사용한다.

이러면 location이 존재하는 class는 모두 Mapper라는 interface에 속한다고 할 수 있다.

Maker를 클릭하면 내용을 출력하는 기능을 추가해보자.

`CustomMap.ts`

```ts
interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  makerContent(): string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  addMaker(mappable: Mappable): void {
    const maker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });

    maker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.makerContent()
      });
      infoWindow.open(this.googleMap, maker);
    });
  }
}

```

addMaker에 클릭하면 infoWindow가 생성되도록 코드를 작성한다.

그리고 Mappable interface에 makerContent() 메서드를 추가한다.

Mappable interface에 속하는 User, Company에 makerContent를 추가한다.

`Company.ts`

```ts
import faker from 'faker';

export class Company {
  companyName: string;
  catchPhrase: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.companyName = faker.company.companyName();
    this.catchPhrase = faker.company.catchPhrase();
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude())
    };
  }

  makerContent(): string {
    return `
      <div>
        <h1>${this.companyName}</h1>
        <h3>${this.catchPhrase}</h3>
      </div>
    `;
  }
}
```

이런 식으로 User.ts에도 추가한다.

이렇게 하면 index.ts 파일은 수정할 필요가 없다.

다시 interface에 변수를 하나 추가하자.

```ts
interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  makerContent(): string;
  color: string;
}
```

color이라는 변수가 추가되었다.

추가하자마자 index.ts에 오류가 발생했다고 나온다.

이 상황을 해결하려면 User, Company class에 color를 추가해야 한다.

직접적인 원인이 표시되도록 처리하려면 implements 키워드를 사용한다.

먼저 interface를 export 한다.

```ts
export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  makerContent(): string;
  color: string;
}
```

그 다음 Company.ts에서 class 선언에 implements를 추가한다.

``` ts
export class Company implements Mappable {
...
```

Company class의 변수와 constructor에 부족한 변수를 채우면 된다.

Company는 Mappable interface를 구현한다고 선언했기 때문에 앞으로 Mappable에 변경이 발생하면 Company에 문제가 있다고 바로 표시가 될 것이다.
