<!--
 * @Description: 
 * @Author: kang
 * @Date: 2022-03-14 10:04:58
-->
# my-blog
this a blog project

## 运行命令

 "dev": "  set NEXT_PUBLIC_DOMAIN_ENV=production&& node server.js  ",

> 用express代理请求,前端解决了跨域的启动

  "next":"next  . ",

> next的开发模式

  "start": "next start",

> next打包后的混合模式



  "build": " set NEXT_PUBLIC_DOMAIN_ENV=production &&next build ",

> 将项目打包成水合模式 可以用yarn start启动

  "build2": " set NEXT_PUBLIC_DOMAIN_ENV=production &&next build  &&next export",

> 将项目打包后并执行静态导出

  "server": "cd ./service  &&yarn dev"

```
切到service目录进行启动egg的开发环境启动
```

