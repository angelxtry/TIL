# ctypes 설명

```py
import ctypes
from double_array_type import DoubleArrayType

_mod = ctypes.CDLL('./Option_v2_0_1_nt/Release/Option.dll')

DoubleArray = DoubleArrayType()

_BSOption_Delta = _mod.BSOption_Delta
_BSOption_Delta.argtypes = (
                  ctypes.c_short,
                  ctypes.c_double,
                  DoubleArray,
                  DoubleArray,
                  ctypes.c_short,
                  DoubleArray,
                  DoubleArray,
                  ctypes.c_short,
                  DoubleArray,
                  DoubleArray,
                  ctypes.c_short,
                  ctypes.c_double,
                  ctypes.c_double,
                  ctypes.c_short,
                  ctypes.c_short,
                  ctypes.c_short
                  )
_BSOption_Delta.restype = ctypes.c_double

def BSOption_Delta(params):
    print(type(params))
    return _BSOption_Delta(
        params['TypeFlag'],
        params['S0'],
        params['t'],
        params['rf'],
        params['nt'],
        params['td'],
        params['rd'],
        params['ntd'],
        params['t_vol'],
        params['vol'],
        params['n_vol'],
        params['dvd'],
        params['X'],
        params['MaturityDate'],
        params['PaymentDate'],
        params['TextFlag']
    )
```

* Windows dll을 호출할 때는 LoadLibrary가 아니라 CDLL 사용
* short -> ctypes.c_short -> int
* `double*`는 DoubleArrayType class를 정의하여 처리
