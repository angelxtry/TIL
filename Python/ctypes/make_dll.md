# Visual Studio 2010으로 DLL 만들기

* 아쉽게도 vs2010

## 프로젝트 생성

* Win32 Console Program 선택

## 코드

* cpp 파일 추가

```cpp
#include <math.h>

#define EXPORT extern "C" __declspec(dllexport)

EXPORT int gcd(int x, int y);
EXPORT double* BSOption1(short TypeFlag, double S0, double *t);

int gcd(int x, int y) {
    int g = y;
    while ( x > 0 ) {
        g = x;
        x = y % x;
        y = g;
    }
    return g;
}

double* BSOption1(
    short TypeFlag,
    double S0,
    double *t
)
{
    return t;
}
```

* header 파일은 필요 없는 듯 하다.

## 컴파일

* 빌드하면 바로 DLL이 생성됨
