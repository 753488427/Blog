function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `接口不存在：${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(error, req, res, next) {
  console.error(`[${new Date().toISOString()}]`, error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    success: false,
    message: '服务器内部错误',
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};

