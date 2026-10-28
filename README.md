# Blog

SevenNine 个人技术博客与工程作品集，采用前后端分离结构。

## 项目结构

```text
Blog/
├─ city/       # Vue 3 + Vite 前端
└─ city_back/  # Node.js + Express + MySQL 后端
```

## 前端

```powershell
cd city
npm install
npm run dev
```

## 后端

复制 `city_back/.env.example` 为 `city_back/.env`，填写本地数据库配置，然后运行：

```powershell
cd city_back
npm install
npm run dev
```

后端接口：

- `GET /health`
- `GET /api/cities`
- `POST /api/cities`

详细说明见 [`city_back/README.md`](city_back/README.md)。
