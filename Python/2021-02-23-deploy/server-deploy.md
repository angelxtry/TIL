# server deploy

파이썬이 설치되어 있는지 확인합니다.

```py
yum list installed | grep -i python3
```

파이썬이 설치되지 않았다면 설치합니다.

```py
sudo yum install python3 -y
```

프로젝트 폴더를 생성합니다. git clone으로 코드를 다운받으면서 자동으로 생성해도 무관합니다.

```py
mkdir GoogleSheetToRDS
```

해당 폴더로 이동하여 가상 환경을 생성합니다.

```py
python3 -m venv env
```

가상 환경을 활성화합니다.

```py
source env/bin/activate
```

pip를 최신화합니다.

```py
pip install pip --upgrade
```

git에서 코드를 다운받은 후 requirements.txt를 이용하여 package를 설치합니다.

```py
pip install -r requirements.txt
```

.env 파일을 생성합니다.

```py
export DB_USER=...
export DB_PASSWORD=...
export DB_HOST=...
export DB_DATABASE=...
export DB_PORT=...
```

cron으로 파이썬 스크립트를 실행하기 위해 shell script를 작성합니다.

```shell
#!/bin/bash

export ROOT_PATH=/home/ec2-user/GoogleSheetToRDS
cd $ROOT_PATH
source .env
$ROOT_PATH/env/bin/python $ROOT_PATH/main.py
```

cron에 shell script를 등록합니다.

```py
$ crontab -e
```

```py
# */5 * * * *  /home/ec2-user/GoogleSheetToRDS/batch.sh
0 * * * *  /home/ec2-user/GoogleSheetToRDS/batch.sh
```

`#`으로 시작하는 라인은 주석 처리된 항목입니다.

`*/5 * * * *` 매 5분 마다 설정된 작업을 수행합니다.

`0 * * * *` 매 정시에 설정된 작업을 수행합니다.
