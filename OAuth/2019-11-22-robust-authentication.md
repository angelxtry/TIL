# Robust authentication

user가 login

login에 성공하면 서버가 access-token과 refresh-token을 user에게 제공함

  cookie에 넣어서 보내준다? 어떻게?

  서버에서 cookie에 넣어서 보내줄 필요가 있나?

  서버에서 cookie에 넣어서 보내주면 client에서는 그냥 사용만 하면 되나?

access-token은 주기가 짧고 refresh-token은 길다.

payment가 필요할 경우 user는 access-token만 서버로 보내서 인증을 받는다.

access-token이 만료가 되면 서버(/refresh)로 refresh-token을 보낸다.

refresh-token이 인증이 되면 서버는 다시 access-token과 refresh-token을 발급한다.

refresh-token은 만료가 가까워졌으면 다시 발급하고 아니면 그대로 돌려준다.

cookie에 path라는 옵션이 있다.

이 옵션에 경로를 넣어주면 다른 경로에는 전송되지 않고 정해진 경로에만 전송된다.

refresh-token이 송수신 횟수가 훨씬 적다. 그래서 상대적으로 안전하다.

cache된 refresh token? 이건 뭘까?
