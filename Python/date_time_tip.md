# Date, Time tips

## 문자열을 시간으로 변환

```py
from datetime import datetime

def convert_str_to_time(timestring: str):
    return datetime.strptime(timestring, '%H:%M').time()

time = convert_str_to_time('19:30')
print(time) # 19:30:00
```
