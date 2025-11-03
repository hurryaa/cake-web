const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

// 输入验证中间件
const validateBookingData = (req, res, next) => {
  const { name, phone, serviceType, people, date, time, location } = req.body;

  // 必填字段验证
  const requiredFields = { name, phone, serviceType, people, date, time, location };
  const missingFields = Object.entries(requiredFields)
    .filter(([key, value]) => !value || value.trim() === '')
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: '缺少必填字段',
      missingFields,
      error: 'VALIDATION_ERROR'
    });
  }

  // 电话号码格式验证
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
    return res.status(400).json({
      success: false,
      message: '电话号码格式不正确',
      error: 'INVALID_PHONE'
    });
  }

  // 日期格式验证
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({
      success: false,
      message: '日期格式不正确',
      error: 'INVALID_DATE'
    });
  }

  // 时间格式验证
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(time)) {
    return res.status(400).json({
      success: false,
      message: '时间格式不正确',
      error: 'INVALID_TIME'
    });
  }

  next();
};

// 请求频率限制中间件（简单实现）
const rateLimitMap = new Map();
const rateLimit = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1分钟
  const maxRequests = 5; // 每分钟最多5次请求

  if (!rateLimitMap.has(clientIP)) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + windowMs });
    return next();
  }

  const clientData = rateLimitMap.get(clientIP);

  if (now > clientData.resetTime) {
    // 重置计数器
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + windowMs });
    return next();
  }

  if (clientData.count >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: '请求过于频繁，请稍后再试',
      error: 'RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
    });
  }

  clientData.count++;
  next();
};

// 服务类型映射
const serviceTypeMap = {
  '1': '甜品台',
  '2': '商务茶歇',
  '3': '宝宝生日宴甜品台',
  '4': '婚宴甜品台',
  '5': '开业甜品台',
  '6': '主题节日甜品台',
};

// 人数选项映射
const peopleOptionsMap = {
  '1': '10人以下',
  '2': '10-30人',
  '3': '30-50人',
  '4': '50-100人',
  '5': '100人以上',
};

// 发送预订邮件
router.post('/send-booking', rateLimit, validateBookingData, async (req, res) => {
  try {
    const {
      name,
      phone,
      serviceType,
      people,
      date,
      time,
      location,
      specialRequirements = '',
      priceEstimate = '待确认'
    } = req.body;

    // 转换服务类型和人数
    const serviceTypeName = serviceTypeMap[serviceType] || serviceType;
    const peopleName = peopleOptionsMap[people] || people;

    // 准备邮件数据
    const emailData = {
      name: name.trim(),
      phone: phone.trim(),
      serviceType: serviceTypeName,
      people: peopleName,
      date,
      time,
      location: location.trim(),
      specialRequirements: specialRequirements.trim(),
      priceEstimate
    };

    // 发送邮件
    const result = await emailService.sendBookingEmail(emailData);

    // 记录成功日志
    console.log('📧 Booking email sent:', {
      customer: name,
      service: serviceTypeName,
      date,
      messageId: result.messageId
    });

    res.json({
      success: true,
      message: '预订邮件发送成功',
      data: {
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Failed to send booking email:', error);

    // 根据错误类型返回不同的响应
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'SMTP认证失败，请检查邮件服务器配置',
        error: 'SMTP_AUTH_ERROR'
      });
    }

    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: '无法连接到邮件服务器',
        error: 'SMTP_CONNECTION_ERROR'
      });
    }

    res.status(500).json({
      success: false,
      message: '邮件发送失败，请稍后重试',
      error: 'EMAIL_SEND_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 测试邮件发送
router.post('/test', async (req, res) => {
  try {
    const result = await emailService.sendTestEmail();

    res.json({
      success: true,
      message: '测试邮件发送成功',
      data: {
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Failed to send test email:', error);

    res.status(500).json({
      success: false,
      message: '测试邮件发送失败',
      error: error.message
    });
  }
});

// 检查邮件服务状态
router.get('/status', async (req, res) => {
  try {
    const isConnected = await emailService.verifyConnection();

    res.json({
      success: true,
      data: {
        smtpConnected: isConnected,
        smtpHost: process.env.SMTP_HOST || 'Not configured',
        smtpPort: process.env.SMTP_PORT || 'Not configured',
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: '无法检查邮件服务状态',
      error: error.message
    });
  }
});

module.exports = router;