---
outline: deep
---

## cros跨域cookie和session失效解决方案

::: details
:::code-group

```js [适用于 express koa egg]
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  maxAge: '1728000'
  //这一项是为了跨域专门设置的
}
app.use(cors(corsOptions))
```

```js [前端]
this.$http.get('getlogin',{ credentials: true }).then(res => {
    console.log(res)
})

this.$http.post('postlogin',{userInfo: $('.form-signin').serialize()},{
   credentials: true 
}).then(res => {
    console.log(res)
    if(res.body.status != 200) {
        console.log('登录失败')
    }else {
        console.log('登录成功')
    }
})
```

```js [原生]
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.xxx.com/api');
xhr.withCredentials = true;
xhr.onload = onLoadHandler;
xhr.send()
```

```js [Jquery]
$.ajax({
    url: "http://localhost:8080/orders",
    type: "GET",
    xhrFields: {
        withCredentials: true
    },
    crossDomain: true,
    success: function (data) {
        render(data);
    }
 });
```

```js [axios]
const service = axios.create({
  //设置默认请求头，使post请求发送的是formData格式数据
  // axios的header默认的Content-Type好像是'application/json;charset=UTF-8'可以用这种方式修改
  headers: {  
    "Content-Type": "application/x-www-form-urlencoded"
  },
  withCredentials: true // 允许携带cookie
})
```

:::
