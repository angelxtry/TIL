# VS6.0 Converting

```cs
오류 36 error C2440: 'static_cast' : 'void (__thiscall CKIS_DATA_AUTODlg::* )(WPARAM,LPARAM)'에서 'LRESULT (__thiscall CWnd::* )(WPARAM,LPARAM)'(으)로 변환할 수 없습니다. d:\private\develop\kisdatakisnet\kis_data_autodlg.cpp 106 1 KIS_DATA_AUTO

ON_MESSAGE(UM_MAKE_FILE_COMPLETE,OnCompleteMake)

ON_MESSAGE(UM_MAKE_FILE_COMPLETE, (LRESULT (CWnd::* )(WPARAM,LPARAM))OnCompleteMake)
```

## zip lib 관련

* 변경 전

```cs
프로젝트 속성 -> 구성 속성 -> 링커 -> 입력 : ZipFunc.lib;%(AdditionalDependencies)
```

* 변경 후

```cs
프로젝트 속성 -> 구성 속성 -> 링커 -> 입력 :
```
