const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
  quiet: true,
});

const app = require('./app');
const pool = require('./config/db');

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, host, () => {
  console.log(`City API 已启动：http://${host}:${port}`);
});

async function shutdown(signal) {
  console.log(`\n收到 ${signal}，正在安全关闭服务...`);

  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

