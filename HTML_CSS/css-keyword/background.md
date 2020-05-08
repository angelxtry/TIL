# background

background는 단축 속성으로 다음의 내용을 하나의 선언으로 지정할 수 있다.

1. background-clip
2. background-color
3. background-image
4. background-origin
5. background-position
6. background-repeat
7. background-size
8. background-attachment

```css
background-image: url(${imgMain});
background-repeat: no-repeat;
background-position: center;
background-size: cover;
```

```css
background: no-repeat center/cover url(${imgMain});
```

background-size

- contain
  - 이미지가 잘리거나 찌그러지지 않는 한도 내에서 제일 크게 설정.

- cover
  - 이미지가 찌그러지지 않는 한도 내에서 제일 크게 설정.
  - 이미지의 가로세로비가 요소와 다르다면 이미지를 세로 또는 가로방향으로 잘라내어 빈 공간이 생기지 않도록 설정.
