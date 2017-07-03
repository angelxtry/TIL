# 소소한 팁

## vscode vim 환경에서 여러 줄 주석

`visual mode`로 여러 줄 선택 후 `ctrl + /`

## vscode pylint 활성화

settings.json 파일에 추가

```json
"python.pythonPath": "각 가상환경에 맞는 PATH",
"python.linting.enabled": true
```

## vscode python lint 활성화 시 외부 라이브러리 `unable to import ...`

settings.json 파일의 python.pythonPath 확인

가상환경에서 `pip install pylint`

## 빈 리스트 empty list 확인

```py
if not empty_list:
    pass
```

* empty dictionary도 동일하다.

## windows에서 출력데이터에 unicode 또는 cp949에 없는 문자열이 포함되어 있을 경우

`print(html.encode('cp949', 'ignore'))`

encode함수에 ignore 옵션을 활용한다.

## pip freeze > requirements.txt

현재 사용중인 환경에 설치된 패키지와 버전을 확인하여 requirements.txt 파일을 생성

동일하게 환경을 설정하려면

```py
pip freeze > requirements.txt

pip install -r requirements.txt
```
