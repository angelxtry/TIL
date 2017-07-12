# tip

## 한영전환 키 변경

한영전환 키를 `Shift + Space`로 변경

```
regedit -> HKEY_LOCAL_MACHINE -> SYSTEM -> CurrentControlSet
-> services -> i8042prt -> Parameters
```

```
LayerDriverKOR: kbd101c.dll
OverrideKeyboardSubtype: 5
```

설정완료 후 reboot
