# Date, Time tips

## 문자열을 시간으로 변환

```py
from datetime import datetime

def convert_str_to_time(timestring: str):
    return datetime.strptime(timestring, '%H:%M').time()

time = convert_str_to_time('19:30')
print(time) # 19:30:00
```

## 특정월의 마지막 날짜 구하기

별별 방법이 다 있겠지만 윤년 등등 고려하기 귀찮으니 calender 모듈을 이용한다.

```py
import calender
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

start_date = datetime.strptime('20150101', '%Y%m%d').date()

for i in range(31):
    next_month = start_date + relativedelta(months=i)
    days = calendar.monthrange(next_month.year, next_month.month)[1]
    target_date = next_month + timedelta(days=days - 1)
    
    month_start_date = datetime.strftime(next_month, '%Y%m%d')
    month_end_date = datetime.strftime(target_date, '%Y%m%d')

    print(month_start_date, month_end_date)
```

핵심은 calendar.monthrage() 함수.

연도와 월을 param으로 전달하면 1일의 요일과 마지막 날짜가 tuple로 return된다.

요일은 0이 월요일, 6이 일요일.

## 문자열을 날짜로, 날짜를 문자열로 변환

```py
from datetime import datetime

date_str = '20150101'
date = datetime.strptime(date_str, '%Y%m%d').date()
date_str2 = datetime.strftime(date, '%Y%m%d')
```

strptime으로 문자열을 날짜로 변환.

strftime으로 날짜를 문자열로 변환.
