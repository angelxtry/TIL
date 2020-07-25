# Cloud Front Setting

Amazon CloudFront Getting Started

Web 선택

Origin Settings

- Origin Domain Name
  - 클릭하면 만들어 둔 S3가 보인다.
  - 만들어 둔 것 선택하지말고 S3 Web Hosting Endpoint 긁어서 복사, 붙여넣자.
  - Origin ID도 자동으로 입력된다.

Default Cache Behavior Settings

- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Allowed HTTP Methods: GET, HEAD

Distribution Settings

- Alternate Domain Names(CNAMEs): 도메인 입력(ex: hf.doitreviews.com)
- SSL Certificate: Custom SSL Certificate (example.com):
  - 인증서를 미리 만들어두지 않았다면 Custom SSL Certificate (example.com)가 활성화되지 않아서 선택할 수 없다.
  - 인증서 만들고 다시 오자.
- Default Root Object
  - index.html

## Certificate Manager

Add domain names

- abc.con, *.abc.com 2개 입력

Select validation method

- DNS validation 선택

Add Tags

- asdf

Validation

- Continue 버튼을 클릭하지 말자. 처리해야 할 것이 있다.
- 


GoDaddy에 AWS 네임서버 추가

ns-1155.awsdns-16.org.
ns-1755.awsdns-27.co.uk.
ns-796.awsdns-35.net.
ns-359.awsdns-44.com.

## S3

고유한 이름으로 생성

생성 후 Properties -> Static website hosting -> Use this bucket to host a website 체크 -> index.html, error.html 입력 -> Bucket hosting 체크 -> Save

Permission -> Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::fitnessfriend.club.s3.bucket/*"
    }
  ]
}
```
