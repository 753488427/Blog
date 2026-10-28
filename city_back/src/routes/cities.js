const express = require('express');
const pool = require('../config/db');

const router = express.Router();

router.get('/cities', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT ID, Name, CountryCode, District, Population FROM city ORDER BY ID ASC',
    );

    return res.json({
      success: true,
      total: rows.length,
      data: rows,
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/cities', async (req, res, next) => {
  const name = String(req.body?.Name ?? '').trim();
  const countryCode = String(req.body?.CountryCode ?? '').trim().toUpperCase();
  const district = String(req.body?.District ?? '').trim();
  const population = Number(req.body?.Population);

  if (!name || name.length > 35) {
    return res.status(400).json({
      success: false,
      message: '城市名称不能为空，并且不能超过 35 个字符',
    });
  }

  if (!/^[A-Z]{3}$/.test(countryCode)) {
    return res.status(400).json({
      success: false,
      message: '国家代码必须是 3 位英文字母，例如 CHN',
    });
  }

  if (!district || district.length > 20) {
    return res.status(400).json({
      success: false,
      message: '地区不能为空，并且不能超过 20 个字符',
    });
  }

  if (!Number.isInteger(population) || population < 0 || population > 2147483647) {
    return res.status(400).json({
      success: false,
      message: '人口必须是 0 到 2147483647 之间的整数',
    });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO city (Name, CountryCode, District, Population)
       VALUES (?, ?, ?, ?)`,
      [name, countryCode, district, population],
    );

    const [rows] = await pool.execute(
      `SELECT ID, Name, CountryCode, District, Population
       FROM city
       WHERE ID = ?`,
      [result.insertId],
    );

    return res.status(201).json({
      success: true,
      message: '城市新增成功',
      data: rows[0],
    });
  } catch (error) {
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        success: false,
        message: '国家代码不存在，请填写 country 表中已有的代码',
      });
    }

    if (error.code === 'ER_DATA_TOO_LONG') {
      return res.status(400).json({
        success: false,
        message: '提交内容超过数据库字段长度限制',
      });
    }

    return next(error);
  }
});

module.exports = router;

