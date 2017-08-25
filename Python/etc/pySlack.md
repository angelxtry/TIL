# Python을 이용하여 Slack에 메시지 보내기

일단 brew update

brew upgrade pyenv

pyenv install --list

pyenv install 3.6.1

pyenv virtualenv 3.6.1 venv361

pyenv virtualenvs

mkdir pySlack

vi .env
echo "***********************************"
echo "Python Virtual Env > Python 3.6.1"
echo "***********************************"
pyenv activate venv361


Team 생성

Create a new app

Webhook 활성화

Channel과 Webhook URL 연결



curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' https://hooks.slack.com/services/


pyenv로 새 환경 설정

