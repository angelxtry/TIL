# AWS Code Deploy

## IAM Role 생성

IAM -> Roles -> Create role

AWS services -> EC2 -> Next

Create role: 4개 선택

AmazonS3FullAccess

AWSCodeDeployFullAccess

AWSCodeDeployRole

CloudWatchLogsFullAccess

Review에서 이름 설정: doit-ec2-deploy

IAM 생성완료

## ec2 생성

생성 과정에서 IAM role 등록

## IAM Group 생성

IAM -> Groups -> Create New Group -> group name만 설정

생성한 group 선택 -> Inline Policies -> Custom Policy -> json 입력

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "autoscaling:*",
        "codedeploy:*",
        "ec2:*",
        "lambda:*",
        "elasticloadbalancing:*",
        "s3:*",
        "cloudwatch:*",
        "logs:*",
        "sns:*"
      ],
      "Resource": "*"
    }
  ]
}
```

## ec2에 aws-cli 설치

sudo apt install awscli

sudo apt-get install python3-pip

pip3 install awscli --upgrade --user

sudo apt-get install ruby

wget https://aws-codedeploy-ap-northeast-2.s3.amazonaws.com/latest/install

chmod +x ./install

sudo ./install auto

sudo service codedeploy-agent status

sudo service codedeploy-agent start

sudo vim /etc/init.d/codedeploy-startup.sh

#!/bin/bash 
echo 'Starting codedeploy-agent' 
sudo service codedeploy-agent restart

sudo chmod +x /etc/init.d/codedeploy-startup.sh

