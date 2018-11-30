# Bool 변수 이름 제대로 짓기 위한 최소한의 영어 문법

[원문](https://soojin.ro/blog/naming-boolean-variables)

## Cases

- is 용법
- 조동사 용법
- has 용법
- 동사원형 용법

## is 용법

- is + 명사
- is + 현재진행형(~ing)
- is + 형용사

### is + 명사

(무엇)인가? 라는 뜻으로 쓰인다.

isString()

### is + 현재진행형(~ing)

~하는 중인가?

isPending
isExecuting

### is + 형용사

형용사는 두 종류로 나뉜다.

- 단어 자체가 형용사인 것 - readable, visible ...
- 과거분사 형태 - hidden, selected, completed ...

과거분사는 간단히 말해 동사로 만든 형용사.
쓰려는 동사의 과거분사를 모르겠으면 사전을 찾아보자.

is로 시작하는 변수명을 사용할 때 is + 동사원형은 사용하지 않는다.

```cs
bool isEdit = true; // X

bool isEditable = true; // 편집할 수 있는가?
bool isEditing = true; // 편집 중인가?
bool canEdit = true; // 편집할 수 있는가?
```

## 조동사 용법

조동사 + 동사원형

- can: ~ 할 수 있는가?
- should, will: ~ 해야하는가?

적당한 예가 생각나지 않는다.

## has 용법

- has + 명사
- has + 과거분사

### has + 명사

~를 가지고 있는가?

```cs
bool hasAccount = false;
```

## 동사원형 용법
