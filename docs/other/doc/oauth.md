---
outline: deep
---

# OAuth

## OAuth 2.0 的四种方式

- 授权码（authorization code）方式，指的是第三方应用先申请一个授权码，然后再用该码获取令牌。
- 隐藏式 （有些 Web 应用是纯前端应用，没有后端。）
- 密码式（高度信任，返回账号密码）
- 凭证式（适用于没有前端的命令行应用，即在命令行下请求令牌）

## GitHub 授权流程

1. 用户访问第三方应用，后者将前者导向 GitHub 的授权页面。
2. 用户登录 GitHub，授权第三方应用。
3. GitHub 将用户导向第三方应用指定的 URL，同时附上一个授权码。
4. 第三方应用使用授权码，向 GitHub 请求令牌。
5. GitHub 返回令牌。
6. 第三方应用使用令牌，向 GitHub 请求用户数据。

:::details 代码
:::code-group

```html [client.html]
<!DOCTYPE html>
<html>
<head>
    <link rel='stylesheet' href='/stylesheets/style.css'/>
</head>
<body>
<p>Welcome to oauth</p>
<h2>client_id redirect_uri 获取方式</h2>
<ul>
    <li>1、登录 https://github.com/settings/applications/</li>
    <li>2、创建 OAuth Apps</li>
</ul>
<script>
  window.location.href = 'https://github.com/login/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_uri;
</script>
</body>
</html>
```

```js [server.js]
var express = require( 'express' );
var router = express.Router();
var axios = require( 'axios' );
var OAUTH_GITHUB = {
  clientID: '',
  clientSecret: '',
};
/* GET users listing. */
router.get( '/', function ( req, res, next ) {
  const requestToken = req.query.code;
  console.log( requestToken );
  axios( {
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${ OAUTH_GITHUB.clientID }&` +
      `client_secret=${ OAUTH_GITHUB.clientSecret }&` +
      `code=${ requestToken }`,
    headers: {
      accept: 'application/json',
    },
  } ).then( function ( response ) {
    const accessToken = response.data.access_token;
    return axios( {
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${ accessToken }`,
      },
    } );
  } ).then( function ( result ) {
    res.render( 'success', { title: 'Express', result: result.data } );
  } );
} );
module.exports = router;

```

:::
