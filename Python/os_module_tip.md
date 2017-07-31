# os module

## 경로 확인 후 없으면 디렉토리 생성

```py
def get_filepath(filename, date):
    filename = f'{filename}_{date}.xlsx'
    path = os.path.join(os.getcwd(), RESULT_DIR)

    if not os.path.exists(path):
        os.makedirs(path)
    
    filepath = os.path.join(path, filename)
    return filepath
```