# calendar table

https://www.brianshowalter.com/blog/calendar_tables

```sql
CREATE TABLE calendar_table (
	dt DATE NOT NULL PRIMARY KEY,
	y SMALLINT NULL,
	q tinyint NULL,
	m tinyint NULL,
	d tinyint NULL,
	dw tinyint NULL,
	monthName VARCHAR(9) NULL,
	dayName VARCHAR(9) NULL,
	w tinyint NULL,
  isWeekday BINARY(1) NULL
);
```


```sql
UPDATE calendar_table
SET isWeekday = CASE WHEN dayofweek(dt) IN (1,7) THEN 0 ELSE 1 END,
	y = YEAR(dt),
	q = quarter(dt),
	m = MONTH(dt),
	d = dayofmonth(dt),
	dw = dayofweek(dt),
	monthname = monthname(dt),
	dayname = dayname(dt),
	w = week(dt);
```