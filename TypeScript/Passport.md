# passport 설명

```ts
import * as passport from 'passport';
import FacebookStrategy from './authFacebook';
import KakaoStrategy from './authKakao';
import User from '../../entities/User';

export default () => {
  passport.serializeUser<User, any>((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser<User, any>(async (id, done) => {
    try {
      const user = await User.findOne({ id });
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  FacebookStrategy();
  KakaoStrategy();
};
```

serialize

서버쪽에 `{ id: 1, cookie: 'abc' }`등의 정보를 저장

client에서 cookie를 보내오면 서버의 메모리에서 cookie로 검색하여 id: 1을 찾는다.

이 id: 1을 이용하여 user 정보를 찾는 것을 deserialize라고 한다.

deserialize의`return done(null, user);`를 실행하면 req.user에 user가 저장된다.
