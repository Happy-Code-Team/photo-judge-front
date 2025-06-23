# photo-judge

## 环境要求

* 18.3 或更高版本的 Node.js

## 启动

```bash
npm install --registry=https://registry.npmmirror.com
npm run dev
```

## 本地启动前端

修改 `src/utils/axios.js` 里面的路径。使用绝对路径，相对路径是自动部署中 nginx 使用的。
```js
baseURL: 'http://localhost:8089/photo'
```
