# Node.js 개발 환경 설정

코드 스테이즈 flex immersive 강의를 수강하고 있다.
Node.js, JavsScript를 중심으로 진행되므로 기본적인 개발 환경을 설정해보자.

## 환경

macOS Mojave 10.14 환경에서 설정했다.

## NVM 설치

일단 [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md)을 설치한다.

NVM은 Node Version Manager로 설치해두면 프로젝트마다 다른 Node.js의 버전을 쉽게 사용할 수 있다.

[NVM 공식 사이트](https://github.com/nvm-sh/nvm/blob/master/README.md)의 내용대로 진행한다.

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

~/.bash_profile, ~/.zshrc 파일 중에 하나들 골라 다음의 내용을 입력한다.

```sh
export NVM_DIR="${XDG_CONFIG_HOME/:-$HOME/.}nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

설치가 완료되었다면 설지 가능한 목록을 확인해보자.

```sh
nvm ls-remote
```

v0 부터 v12 까지 약 8백개에 가까운 버전이 출력된다.
그 중 LTS 버전 중에 최신 버전을 설치해보자.

```sh
nvm install --lts
```

내 장비에 설치된 버전들을 확인하려면 다음의 명령어를 이용한다.

```sh
nvm ls
```

현재 활성화된 Node.js 버전을 확인하려면 다음의 명령어를 이용한다.

- 10.15대 버전으로 변경

```sh
nvm use v10.15
```

- 10.16대 버전으로 변경

```sh
nvm use v10.16
```

일단 설치가 완료되었고 nvm의 기본적인 명령어를 확인했으므로 프로젝트 설정으로 넘어가자.

## 특정 디렉토리에 프로젝트 환경 설정하기

프로젝트 환경 설정이라고 말해도 별거 없다. 해당 디렉토리에서 사용할 Node.js의 버전을 결정하는거다.
추가로 package가 설치되기도? 할 것 같다.

다음의 명령어를 입력해보자.

```sh
echo $(nvm current)
```

현재 활성화된 Node.js의 버전이 출력된다.
이 명령어를 활용하여 `.nvmrc` 파일을 생성한다.

```sh
echo $(nvm current) > .nvmrc
```

특정 디렉토리에 `.nvmrc`를 생성해두면 해당 디렉토리에서 다음의 명령어로 설정된 Node.js 버전을 활성화할 수 있다.

```sh
nvm use
```

## ESlint 설치

프로젝트를 위한 디렉토리를 생성했고, Node.js 버전도 결정되었다면 ESlint를 설치한다.
ESlint를 설정하기 전에 다음의 명령어를 먼저 입력한다.

```sh
npm init
```

몇 가지 질문에 답하고 나면 `package.json` 파일이 생성된다.
모두 엔터만 입력하고 넘어가도 상관없다.

이제 정말로 [ESlist 공식 페이지](https://eslint.org/docs/user-guide/getting-started)를 참조하여 ESlint를 설치한다.

```sh
npm install eslint --save-dev
```

`--save-dev`의 의미는 [링크](http://ohyecloudy.com/ddiary/2016/09/04/til-npm-install-save-or-save-dev/)를 참조하자.

`package.json` 파일을 확인해보면 `devDependencies` 항목에 `eslint`가 추가된 것을 확인할 수 있다.

이제 ESlint의 설정파일을 생성한다.

```sh
./node_modules/.bin/eslint --init
```

```sh
npx eslint --init
```

2가지 모두 동일한 명령어라고 하니 짧은 걸 사용하자.
명령어를 입력하면 키보드로 선택할 수 있는 몇 가지 질문들이 나온다.
나중에 변경할 수 있다고 하나 고민하지 말고 적당히 고르자.
Airbnb 스타일 가이드를 선택하면 추가로 설치가 진행된다.
질문에 모두 답하면 `.eslintrc.js` 파일이 생성된다.
`.eslintrc.js` 파일에는 선택했던 내용들이 잘 정리되어 들어가있다.

## jest 설치

[Jest 공식 페이지](https://jestjs.io/docs/en/getting-started.html)를 참조한다.

```sh
npm install --save-dev jest
```

설치가 완료되면 `package.json`파일에 다음을 추가한다.

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

위의 내용을 추가한 후 `npm run test` 명령어로 작성한 test를 실행할 수 있다.
run 없이 `npm test`만으로도 실행할 수 있다고 한다. 짧은게 좋은거다. 짧게가자.

## 마무리

어쩌다보니 `npm init` 명령어가 eslint, jest를 설치하기 위한 준비과정인 것 처럼 설명했는데 그게 전부는 아닌 것 같다.
역시 글을 쓰면서 몇 번 반복해보니 잘 기억된다. 물론 또 잊어버리겠지만.
그래도 언젠가는 귀찮더라도 글을 써 둔 나에게 고마워할꺼다.

## 참고한 글

[JavaScript 프로젝트 시작하기](https://github.com/ahastudio/til/blob/master/javascript/20181212-setup-javascript-project.md)
[#TIL #npm install --save는 뭐고 --save-dev는 뭔가?](http://ohyecloudy.com/ddiary/2016/09/04/til-npm-install-save-or-save-dev/)
