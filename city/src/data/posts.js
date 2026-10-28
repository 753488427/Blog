export const posts = [
  {
    slug: 'deploy-vue-node-to-tencent-cloud',
    title: '从 0 到 1：Vue + Node.js 部署到腾讯云宝塔',
    excerpt: '记录从购买轻量服务器，到 Nginx 反向代理、MySQL 迁移、域名和 HTTPS 的完整链路。',
    category: '部署运维',
    tags: ['Vue', 'Node.js', 'Nginx'],
    date: '2026-10-20',
    readTime: '12 分钟',
    featured: true,
    accent: 'blue',
    content: [
      { type: 'lead', text: '部署不是把文件复制到服务器这么简单，而是让前端、API、数据库、域名和 HTTPS 形成一条稳定的访问链路。' },
      { type: 'heading', id: 'architecture', text: '先理解部署架构' },
      { type: 'paragraph', text: '浏览器请求先到达 Nginx。静态页面由 Nginx 直接返回，/api 请求则转发到服务器内部的 Node.js 服务，Node 再访问 MySQL。' },
      { type: 'code', language: 'nginx', code: 'location ^~ /api/ {\n    proxy_pass http://127.0.0.1:3000;\n}\n\nlocation / {\n    try_files $uri $uri/ /index.html;\n}' },
      { type: 'heading', id: 'lessons', text: '这次部署最重要的经验' },
      { type: 'paragraph', text: '3000 和 3306 不需要暴露到公网；前端使用 /api 相对地址；数据库密码通过环境变量注入；修改后端后记得重启进程。' },
      { type: 'quote', text: '能在本地运行，只代表代码成立；能在线上稳定运行，才代表系统成立。' },
    ],
  },
  {
    slug: 'why-vite-proxy-shows-localhost',
    title: 'Vite 代理明明请求线上，为什么 Network 显示 127.0.0.1？',
    excerpt: '从浏览器、Vite 开发服务器到线上 Nginx，拆解一次请求经过的每一跳。',
    category: '前端工程',
    tags: ['Vite', 'Proxy', 'HTTP'],
    date: '2026-10-21',
    readTime: '6 分钟',
    featured: true,
    accent: 'violet',
    content: [
      { type: 'lead', text: '浏览器开发者工具只展示浏览器直接连接的地址，Vite 在服务端进行的二次转发不会替换 Network 面板中的原始 URL。' },
      { type: 'heading', id: 'flow', text: '真实请求流程' },
      { type: 'code', language: 'text', code: 'Browser\n  → 127.0.0.1:5173/api/cities\n  → Vite proxy\n  → https://sevennine.top/api/cities\n  → Nginx → Node.js → MySQL' },
      { type: 'paragraph', text: '因此看到 127.0.0.1 是正常现象。关闭本地 Node 后接口仍然可用，是验证代理目标来自线上的简单方式。' },
    ],
  },
  {
    slug: 'mysql-permission-debugging',
    title: '一次 MySQL 权限报错的完整排查过程',
    excerpt: '从 Access denied、mysql.user 到业务库授权，建立可复用的数据库排障顺序。',
    category: '数据库',
    tags: ['MySQL', 'Security'],
    date: '2026-10-22',
    readTime: '8 分钟',
    featured: false,
    accent: 'green',
    content: [
      { type: 'lead', text: '数据库错误要先区分连接失败、权限不足、库不存在和表不存在，它们对应完全不同的处理方向。' },
      { type: 'heading', id: 'checklist', text: '排查清单' },
      { type: 'code', language: 'sql', code: 'SELECT USER(), CURRENT_USER();\nSHOW GRANTS;\nUSE world;\nSELECT COUNT(*) FROM city;' },
      { type: 'paragraph', text: '项目账号只应该拥有业务所需权限，不应为了让 phpMyAdmin 正常显示而开放 mysql.user 等系统表。' },
    ],
  },
  {
    slug: 'android-location-testing-notes',
    title: 'Android 定位测试：从模拟位置到验证链路',
    excerpt: '记录开发者选项、Mock Location、Location Provider 与测试验证之间的关系。',
    category: 'Android',
    tags: ['Android', 'Location'],
    date: '2026-10-23',
    readTime: '10 分钟',
    featured: false,
    accent: 'orange',
    content: [
      { type: 'lead', text: '定位测试的关键不是某一个坐标值，而是理解系统位置提供者、应用权限和业务端校验的完整链路。' },
      { type: 'heading', id: 'principles', text: '测试原则' },
      { type: 'paragraph', text: '在自有测试环境中明确标识模拟数据，保留可追踪日志，并确保测试行为不会影响真实考勤、支付或风控业务。' },
    ],
  },
]

export const categories = ['全部', ...new Set(posts.map((post) => post.category))]

export function findPost(slug) {
  return posts.find((post) => post.slug === slug)
}
