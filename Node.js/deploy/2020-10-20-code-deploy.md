# Code deploy (Github action + code deploy + ec2)

Express로 간단한 api 서버를 만들어서 배포해야하는 작업이 있었다.

작업을 어느 정도 완성해 놓고 나니 수동 배포가 매우 거슬렸다.

그래서 배포 자동화를 시도했다.

검색해보니 docker에 ecs? fargate? 등을 이용한 배포 자동화에 대한 자료가 많이 보였다.

현재 수준에서 docker는 너무 거창한 것 같아 해당 방법은 시도조차 하지 않고 적절한 수준의 배포 방식을 검토했다.

원하는 수준은 다음과 같다.

- 최초 EC2 서버 설정은 수동으로 해도 ok
- Github main branch에 commit 될 때 마다 EC2에 배포
- 자동으로 package install 된 후 실행

AWS CodePipeline, AWS CodeDeploy 등을 이용한 방법을 찾아보다가 Github Action으로도 가능하다는 글을 보고 다음과 같은 방식으로 시도했다.

- Github main branch에 commit
- Github Action
- AWS S3로 코드 복사
- AWS CodeDeploy를 이용하여 S3의 코드를 EC2로 복사
- EC2에 설치된 AWS CodeDeploy의 agent가 script를 실행하여 package install 후 실행

S3가 중간에 포함되어 있는 것은 외부 서비스가 EC2에 직접 접근할 수 없기 때문이다.

auto scaling이나 여러가지 deploy 전략에 사용할 수 있는 방법은 아니지만, 개발 과정이나 단순 배포에는 적당한 수준이라고 생각했다.

## 1. EC2 생성

Express가 실행될 EC2를 설치한다. EC2는 Amazon Linux 2를 프리티어로 설치한다.

Security Group은 22, 8080 포트만 열어두었다.

다른 항목들은 모두 기본값으로 설정했다.

생성된 서버의 이름을 `GitHubActionDeployTestServer`로 변경했다.

## 2. EC2 설정

해당 서버에 ssh로 접속하여 Express를 실행하기 위한 기본적인 설정을 한다.

```ts
sudo vi /etc/environment

LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```

```ts
sudo yum update -y
sudo yum install git -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
. .nvm/nvm.sh
nvm install v14
npm install yarn -g
```

git, node, yarn을 설치했다.

```ts
sudo yum install ruby -y
sudo yum install wget -y
cd /home/ec2-user
```

```ts
wget https://bucket-name.s3.region-identifier.amazonaws.com/latest/install
```

bucket-name, region-identifier를 자신의 지역에 맞게 설정하자.

bucket-name과 region-identifier를 확인하려면 다음의 링크를 참조하자.

<https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/resource-kit.html#resource-kit-bucket-names>

서울로 설정하려면 다음과 같이 실행한다.

```ts
wget https://aws-codedeploy-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/latest/install
wget https://aws-codedeploy-ap-southeast-1.s3.ap-southeast-1.amazonaws.com/latest/install
```

```ts
chmod +x ./install
sudo ./install auto
```

여기까지 실행하면 CodeDeploy agent가 설치된다.

agent가 실행중인지 확인하려면 다음 명령을 실행한다.

```ts
sudo service codedeploy-agent status
```

## 3. EC2 IAM 설정

`GitHubActionDeployTestServer` EC2에서 CodeDeploy를 사용하기 위해 해당 IAM이 필요하다.

IAM -> Roles -> Create role

Choose a use case의 EC2 선택한다.

AWSCodeDeployFullAccess, AmazonS3FullAccess 2개를 선택한다.

Role name은 `GitHubActionDeployRole`로 설정했다.

생성한 Role을 `GitHubActionDeployTestServer` EC2에 등록한다.

EC2 -> Instances 로 이동하여 해당 EC2를 우클릭하면 팝업 메뉴가 출력된다.

그 중에서 Security -> Modify IAM role을 선택하고, 생성한 role을 추가한다.

## 4. CodeDeploy의 IAM 생성

이전과 동일하게 IAM -> Roles -> Create role

Choose a use case의 EC2 선택한다.

AWSCodeDeployRole을 선택한다.

Role name은 `CodeDeployRole` 이라고 정했다.

EC2의 Role과 CodeDeploy의 Role의 이름을 설정하는 룰을 미리 만들어두면 좋을 것 같다.

EC2CodeDeployRole, CodeDeployRole 정도면 어떨까?

## 5. CodeDeploy 생성 및 설정

CodeDeploy를 선택한다.

우측 메뉴에서 Deploy를 확장하고 Applications을 선택하고 Create application 버튼을 클릭한다.

Application name은 EC2 서버명을 그대로 사용하여 `GitHubActionDeployTestServer`로 설정한다.

Compute platform은 EC2/On-premises를 선택하고, Create application 버튼을 클릭한다.

Application이 생성되었다면 Deployment group을 생성한다.

Create deployment group 버튼을 클릭한다.

Deployment group name은 현재 개발 단계이므로 development로 설정한다.

Service role은 박스를 클릭하면 이전 단계에서 생성한 CodeDeployRole을 선택할 수 있다.

Deployment type은 In-place

Environment configuration는 Amazon EC2 instances를 선택하면 Key, Value를 선택할 수 있는 박스가 출력된다.

각각을 클릭하면 Key는 Name, Value는 EC2를 선택할 수 있다.

Agent configuration with AWS Systems Manager는 기본값이 Now and schedule updates 14 Days로 설정되어 있다.

경험이 없어서 이 부분은 기본값 그대로 두었다.

Deployment settings은 CodeDeployDefault.AllAtOnce

Load balancer는 Enable load balancing 체크박스를 해제했다.

이 상태로 Create deployment group 버튼을 클릭한다.

## 6. S3 생성

앞에서 설명했듯이 Github repo의 코드를 EC2로 복사하기 위해 S3를 이용한다.

github-action-deploy-s3라는 이름으로 생성한다.

## 7. Github Action에서 사용할 IAM 생성

IAM -> Users -> Add user 를 클릭한다.

User name은 github-action-deploy-user로 설정한다.

Access type은 Programmatic access를 선택한다.

Set permissions는 Attach existing policies directly를 선택하고 AmazonS3FullAccess, AWSCodeDeployFullAccess를 추가한다.

User가 정상적으로 생성되면 access-key와 secret-access-key가 생성된다. 꼭 챙겨두자.

## 8. Github Action

현재 진행중인 프로젝트의 Github repo에 Action 탭을 선택한다.

`set up a workflow yourself`를 클릭한다.

다음과 같은 코드가 미리 작성되더 있다.

```yml
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the main branch
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # Runs a single command using the runners shell
      - name: Run a one-line script
        run: echo Hello, world!

      # Runs a set of commands using the runners shell
      - name: Run a multi-line script
        run: |
          echo Add other actions to build,
          echo test, and deploy your project.
```

다음과 같이 변경하자.

```yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  PROJECT_NAME: github-action-deploy
  S3_NAME: github-action-deploy-s3
  DEPLOY_APP_NAME: GitHubActionDeployTestServer
  DEPLOY_GROUP_NAME: development

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Make zip file
        run: zip -qq -r ./$GITHUB_SHA.zip .
        shell: bash

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ secrets.AWS_REGION }}

      - name: Upload to S3
        run: aws s3 cp --region ${{ secrets.AWS_REGION }} ./$GITHUB_SHA.zip s3://$S3_NAME/$PROJECT_NAME/$GITHUB_SHA.zip

      - name: Code Deploy
        run: aws deploy create-deployment --application-name $DEPLOY_APP_NAME --deployment-config-name CodeDeployDefault.OneAtATime --deployment-group-name $DEPLOY_GROUP_NAME --ignore-application-stop-failures --s3-location bucket=$S3_NAME,bundleType=zip,key=$PROJECT_NAME/$GITHUB_SHA.zip
```

하나씩 살펴보면

```yml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

main branch에 push나 pull request가 발생했을 때 해당 workflow가 실행된다.

```yml
env:
  PROJECT_NAME: action_codedeploy
```

해당 workflow에서 사용할 수 있는 변수 정의

```yml
jobs:
  build:
    runs-on: ubuntu-latest
```

workflow는 1개 이상의 jobs를 가질 수 있다고 한다.

jobs는 1개의 build만을 가질 수 있다.

runs-on은 해당 workflow가 실행될 환경을 의미한다.

```yml
steps:
  - uses: actions/checkout@v2
```

steps는 jobs에서 실행될 실제 항목들을 나열한다.

actions/checkout@v2는 해당 repo의 코드들을 checkout 받는다는 것을 의미한다.

```yml
- name: Make zip file
  run: zip -qq -r ./$GITHUB_SHA.zip .
  shell: bash
```

checkout 받은 코드를 압축한다. $GITHUB_SHA는 Github Action에서 생성하는 고유한 문자열이다.

중복을 피하기 위해 사용한다.

```yml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: ${{ secrets.AWS_REGION }}
```

aws access key 등의 정보를 해당 repo의 Settings -> Secrets에 등록한다.

등록한 값은 Name을 이용하여 `${{ secrets.AWS_ACCESS_KEY_ID }}` 처럼 사용할 수 있다.

```yml
- name: Upload to S3
  run: aws s3 cp --region ${{ secrets.AWS_REGION }} ./$GITHUB_SHA.zip s3://github-action-deploy-s3/$PROJECT_NAME/$GITHUB_SHA.zip
```

zip 파일을 AWS S3에 복사한다.

```yml
- name: Code Deploy
  run: aws deploy create-deployment --application-name github-action-deploy --deployment-config-name CodeDeployDefault.OneAtATime --deployment-group-name deploy --ignore-application-stop-failures --s3-location bucket=github-action-deploy-s3,bundleType=zip,key=$PROJECT_NAME/$GITHUB_SHA.zip
```

AWS CodeDeploy를 이용하여 deploy를 수행한다.

## 9. appspec.yml 추가

해당 프로젝트의 root 경로에 appspec.yml 파일을 추가한다.

```yml
# appspec.yml
version: 0.0
os: linux
files:
  - source: /
    destination: /home/ec2-user/deploy-test
hooks:
  BeforeInstall:
    - location: /scripts/before_install.sh
      timeout: 180
      runas: ec2-user
  ApplicationStart:
    - location: /scripts/application_start.sh
      timeout: 180
      runas: ec2-user
```

destination이 EC2 서버에 코드가 복사될 경로다.

hooks는 각 단계가 실행되는 시점을 아직 명확하게 이해하지 못했다. AWS 공식 링크를 참조하자.

[AppSpec 'hooks' section for an EC2/On-Premises deployment](https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html#appspec-hooks-server)

실행 결과로 미루어보면 BeforeInstall은 destination에 파일이 복사되기 전에 실행된다.

location은 해당 프로젝트의 root 폴더에서 시작한다.

/scripts/before_install.sh는 /home/ec2-user/deploy-test/scripts/before_install.sh와 같다.

runas는 해당 script를 실행할 권한을 의미하는 것 같다.

before_install.sh

```sh
if [ -d "$HOME/deploy-test" ]
then
  cd "$HOME/deploy-test"
  yarn stop
  sudo rm -rf "$HOME/deploy-test"
fi
```

프로젝트 폴더가 존재한다면 프로세스를 멈추고 해당 폴더를 지우도록 설정했다.

프로세스를 확인하는 로직을 추가하는 것이 더 나을 것 같다.


```sh
if [ -d "$HOME/deplpy-test" ]
then
  sudo chown -R ${USER:=$(/usr/bin/id -run)}:$USER "$HOME/deplpy-test";
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

cd "$HOME/deplpy-test"

yarn && yarn prod
```

복사된 코드는 root의 권한으로 설정되어 있다. 해당 폴더의 권한을 ec2-user로 변경한 후 package를 설치하고 마지막으로 실행한다.

## 10. 실행 및 결과 확인

main에 commit을 push 하면 바로 Github Action이 동작한다.

해당 repo의 action 탭에서 진행상황을 확인할 수 있다.

그리고 AWS CodeDeploy -> Deployments를 선택하면 appspec.yml이 실행되는 과정을 확인할 수 있다.

## 참고

### Github Action 비용

공개 repo는 무료

비공개 repo

| Product                       | Storage | Minutes (per month) |
| ----------------------------- | ------- | ------------------- |
| GitHub Free                   | 500 MB  | 2,000               |
| GitHub Pro                    | 1 GB    | 3,000               |
| GitHub Free for organizations | 500 MB  | 2,000               |
| GitHub Team                   | 2 GB    | 3,000               |
| GitHub Enterprise Cloud       | 50 GB   | 50,000              |

### AWS CodeDeploy 비용

<https://aws.amazon.com/ko/getting-started/hands-on/set-up-ci-cd-pipeline/services-costs/>

요금 적용 방식: AWS CodeDeploy를 통해 Amazon EC2 인스턴스에 코드를 배포하는 데는 추가 비용이 부과되지 않습니다. 온프레미스 서버에 코드를 배포할 때만 비용이 부과되며 요금은 온프레미스 서버 업데이트당 0.02 USD입니다. 예를 들어 3개의 온프레미스 서버에 배포는 3번의 업데이트에 해당합니다.

### CodeDeploy 에러

```sh
InstanceAgent::Plugins::CodeDeployPlugin::CommandPoller: Missing credentials - please check if this instance was started with an IAM instance profile
```

CodeDeploy log에 위와 같은 오류가 발생했을 때 CodeDeploy agent를 재실행하면 된다.

```ts
sudo service codedeploy-agent stop
sudo service codedeploy-agent start
```

<https://sarc.io/index.php/aws/1327-tip-codedeploy-missing-credentials>

## 참조

[github action과 aws code deploy를 이용하여 spring boot 배포하기(1)](https://isntyet.github.io/deploy/github-action%EA%B3%BC-aws-code-deploy%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-spring-boot-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0(1)/)


<https://docs.aws.amazon.com/ko_kr/codedeploy/latest/userguide/codedeploy-agent-operations-install-linux.html>

<https://ma.ttias.be/warning-setlocale-lc_ctype-cannot-change-locale-utf-8-no-such-file-or-directory/>
