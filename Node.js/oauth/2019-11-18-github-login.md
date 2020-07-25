# github login

[How to do 3-legged OAuth with GitHub, a general guide by example with Node.js](https://shiya.io/how-to-do-3-legged-oauth-with-github-a-general-guide-by-example-with-node-js/)

## Process

`github으로 login` 같은 버튼을 클릭하면 `/login/oauth/authorize`으로 GET request가 전송된다.

이 때 client_id, redirect_uri, scope가 query parameter로 포함되어 전송된다.

이 3가지 항목은 3-legged OAuth(3자간 인증? 3자 인증)에서 거의 공통항목이다.

GitHub은 2개의 param을 더 요구한다.

CSRF attack을 처리하기 위한 state string.

sign-up link가 redirection에 포함되어 있는지를 확인하는 allow_signup.

버튼을 클릭해서 page가 redirect 되면 GitHub id, pw를 요청한다.

인증이 되어 로그인을 하면 GitHub은 