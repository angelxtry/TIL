# quick-sight-api-staging-setting

## prompt 변경

.bashrc 파일에 추가

```bash
PS1='[\u@quick-sight-api-staging \W]\$ '
```

## warning 처리

-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory

```ts
sudo vi /etc/environment

LANG=en_US.utf-8
LC_ALL=en_US.utf-8
```

## git, node, yarn 설치

```ts
sudo yum update -y
sudo yum install git -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
. .nvm/nvm.sh
nvm install v14
npm install yarn -g
```

git, node, yarn을 설치했다.