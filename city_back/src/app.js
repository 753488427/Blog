const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const citiesRouter = require('./routes/cities');
const { notFoundHandler, errorHandler } = require('./middleware/error-handler');

const app = express();

const configuredOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');

app.use(cors({
  origin(origin, callback) {
    if (!origin || configuredOrigins.includes('*') || configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`不允许的跨域来源：${origin}`));
  },
}));

app.use(express.json({ limit: '1mb' }));

app.get('/health', async (req, res, next) => {
  try {
    await pool.query('SELECT 1');
    return res.json({
      success: true,
      message: '服务和数据库运行正常',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return next(error);
  }
});

app.use('/api', citiesRouter);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

