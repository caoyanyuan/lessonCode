#### 服务端渲染SSR

单页应用的两个问题

1. **首屏渲染等待时长**：必须得等js加载完毕，并且执行完毕，才能渲染出首屏

2. **seo不友好**：爬虫只能拿到一个div，认为页面是空的，不利于seo

   

> 为了解决这两个问题，出现了SSR解决方案，后端渲染出完整的首屏的dom结构返回，前端拿到的内容带上首屏，后续的页面操作，再用单页的路由跳转和渲染，称之为服务端渲染 (server side render)



#### SSR体验： nuxt.js

Nuxt.js 是一个基于 Vue.js 的**通用应用框架**



##### 1. 中间件

中间件会在一个页面或一组页面渲染之前运行我们定义的函数，常用于权限控制、校验等任务。

范例代码：管理员页面保护，创建middleware/auth.js

```
export default function({ route, redirect, store }) { 
// 上下文中通过store访问vuex中的全局状态 
// 通过vuex中令牌存在与否判断是否登录 
	if (!store.state.user.token) { 
		redirect("/login?redirect="+route.path); 
	} 
}
```

##### 2. 插件

Nuxt.js会在运行应用之前执行插件函数，需要引入或设置Vue插件、自定义模块和第三方模块时特别有用。

范例代码：接口注入，利用插件机制将服务接口注入组件实例、store实例中，创建plugins/api-inject.js

```js
export default ({ $axios }, inject) => { 
	inject("login", user => { 
    return $axios.$post("/api/login", user);
  });
};
```

注册插件 nuxt.config.js

```
plugins： [
	"@/plugins/api-inject"
]
```

使用：user/login 就是注入的api

```js
this.$store.dispatch("user/login", this.user).then(ok=>{ 
	if (ok) { 
    const redirect = this.$route.query.redirect || '/' 
    this.$router.push(redirect); } 
});
```

范例：添加请求拦截器附加token，创建plugins/interceptor.js

```js
export default function({$axios, store}) {
  $axios.onReques(config => {
    if (store.state.user.token) { 
      config.headers.Authorization = "Bearer " + store.state.user.token; 
    }
    return config;
  })
}
```

注册插件，nuxt.confifig.js

```
plugins: ["@/plugins/interceptor"]
```

##### 3. 手写实现ssr

主要思路：实现一个node服务器， 服务端通过vue-server-renderer 去渲染vue页面拿到Dom,然后将DOM返回客户端

> 在简单的项目中，自我改造实现SSR 不太现实 
>
> [just a demo, cant be used in project, its too hard](https://github.com/caoyanyuan/biCheng/commit/582de1110317ba34b84f8d675744e58dbddd45d8)

```
const express = require('express') 
const Vue = require('vue') 
const app = express() 
const renderer = require('vue-server-renderer').createRenderer() // 页面 
const page = new Vue({ 
    data:{
        name:'开课吧', 
        count:1 
    },
    template:` <div ><h1>{{name}}</h1> <h1>{{count}}</h1> </div> ` })

app.get('/',async function(req,res){ // renderToString可以将vue实例转换为html字符串 
    const html = await renderer.renderToString(page) 
    res.send(html) 
})
app.listen(3000, ()=>{ console.log('启动成功') })
```

