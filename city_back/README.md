# City Back

城市查询示例项目的独立 Node.js 后端，使用 Express 连接 MySQL `world` 数据库。

## 目录结构

```text
city_back/
├─ src/
│  ├─ config/db.js
│  ├─ middleware/error-handler.js
│  ├─ routes/cities.js
│  ├─ app.js
│  └─ server.js
├─ .env
├─ .env.example
└─ package.json
```

## 本地启动

1. 确认 MySQL 已启动，并且存在 `world` 数据库及 `city`、`country` 表。
2. 根据本机数据库修改 `.env`。
3. 安装依赖并启动：

```powershell
cd E:\difi_test\city_back
npm install
npm run dev
```

启动后可访问：

- 健康检查：`GET http://127.0.0.1:3000/health`
- 查询城市：`GET http://127.0.0.1:3000/api/cities`
- 新增城市：`POST http://127.0.0.1:3000/api/cities`

新增城市请求示例：

```json
{
  "Name": "Shenzhen",
  "CountryCode": "CHN",
  "District": "Guangdong",
  "Population": 13000000
}
```

## Vue 本地联调

Vue 中继续请求相对地址 `/api/cities`。在 `vite.config.js` 中将 `/api` 代理到：

```js
target: 'http://127.0.0.1:3000'
```

线上环境继续由 Nginx 代理：

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 服务器部署

将整个 `city_back` 目录上传到服务器，例如 `/www/wwwroot/city_back`，然后执行：

```bash
cd /www/wwwroot/city_back
npm install --omit=dev
npm start
```

使用宝塔 Node 项目时：

- 启动文件：`/www/wwwroot/city_back/src/server.js`
- 运行目录：`/www/wwwroot/city_back`
- 项目端口：`3000`
- 运行用户：`www`

服务器上的 `.env` 应填写服务器 MySQL 的账号和密码，不要直接上传本地密码。

