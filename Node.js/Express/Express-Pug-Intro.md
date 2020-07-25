# Express에서 pug 사용하기

`npm i pug`로 `pug`를 설치하거나 `express project-name --view=pug`와 같이 express generator로 해당 프로젝트를 생성할 때 설정한다.

## express에서 pug 설정

express에서 `pug`를 사용하기 위해 다음과 같이 설정한다.

```js
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
...

```

`app.set()`을 이용하여 `views` 폴더와 `view engine`을 `pug`로 설정했다.

## pug 파일 생성

`views/test.pug` 파일을 만들어보자.

```pug
<!DOCTYPE html>
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible", content="ie=edge")
    -const title = "Express with pug"
    title=title
  body
```

`pug`는 들여쓰기로 부모 자식 tag를 구분한다.

tag의 attirbute는 괄호`()`안에 들어간다.

`-` 뒤에 Javascript code를 적을 수 있다. 그래서 변수 선언이 가능하다.

`=` 뒤에 선언한 변수를 사용할 수 있다.

## pug 파일을 이용하여 client rendering

생성한 `test.pug`파일을 client로 보내보자.

```js
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const userRouter = require("./route/user");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("test");
});

app.use((req, res, next) => {
  res.status(404).send("NOT FOUND");
});

app.use((err, req, res, next) => {
  res.status.(500).send("SERVER ERROR");
});

```

## pug 파일에 param 전달하기

`pug` 파일 내에서 변수를 직접 선언할 수도 있지만 express에서 param을 전달할 수도 있다.

```pug
<!DOCTYPE html>
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible", content="ie=edge")
    title=title
  body
```

```js
app.get("/", (req, res) => {
  res.render("test", {
    title: "Express with pug",
  });
});

```

`res.render()`에서 두 번째 param으로 변수를 전달할 수 있다.

## pug 기초 문법

```pug
<!DOCTYPE html>
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible", content="ie=edge")
    title=title
    style.
      p {
        color: red;
      }
  body
    #angelx(width=500)
    //- <div id=angelx width=500></div>
    span.express.nodejs
    //- <span class="express nodejs"></span>
    button(type="submit") 전송
    //- <button type="submit">전송</button>
    p
      | 안녕하세요
      | 여러 줄을 입력합니다.
      br
      | 중간에 태그도 넣을 수 있네요.
    //- <p>안녕하세요 여러 줄을 입력합니다.</br>중간에 태그도 넣을 수 있네요.
    script.
      const message="pug";
      alert(message);

```

`div`는 생략가능하다.

`id`는 #으로 대체 가능

`class`는 `.`으로 표시.

여러 줄을 입력하는 것은 `|`를 이용하자.

`script`뒤에 `.`을 찍고 Javascript를 여러 줄 적을 수 있다.

`style`뒤에도 `.`을 찍고 style 코드를 넣을 수 있다.

## pug 조건문

```pug
body
    -const isTrue = true;
    if isTrue
      div This is true.
    else
      div This is false.

```

if, else if, else 도 가능

문장을 쓸 때 `div`를 붙이자.

## pug 반복문

```pug
for i in [1, 2, 3, 4, 5]
  div=i
```

`div` 뒤에 `=`가 필요하다.

## pug: include, layout

pug 파일에 공통의 코드가 많을 경우 별도의 pug 파일로 분리하고 `include` 키워드를 사용한다.

부분적인 코드는 `include`로 처리하지만, 전체적인 코드 중복, 즉 레이아웃은 layout으로 처리한다.
