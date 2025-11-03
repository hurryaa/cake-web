const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initTransporter();
  }

  // 初始化SMTP传输器
  initTransporter() {
    try {
      // 验证必要的环境变量
      const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
      const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

      if (missingVars.length > 0) {
        console.error('❌ Missing SMTP environment variables:', missingVars);
        return;
      }

      this.transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        // 额外配置
        pool: true, // 使用连接池
        maxConnections: 5,
        maxMessages: 100,
        rateDelta: 1000, // 1秒
        rateLimit: 5, // 每秒最多5封邮件
      });

      // 验证SMTP连接
      this.verifyConnection();

      console.log('✅ SMTP transporter initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize SMTP transporter:', error);
    }
  }

  // 验证SMTP连接
  async verifyConnection() {
    if (!this.transporter) {
      throw new Error('SMTP transporter not initialized');
    }

    try {
      await this.transporter.verify();
      console.log('✅ SMTP connection verified');
      return true;
    } catch (error) {
      console.error('❌ SMTP connection verification failed:', error);
      return false;
    }
  }

  // 生成邮件HTML模板
  generateEmailHTML(bookingData) {
    const {
      name,
      phone,
      serviceType,
      people,
      date,
      time,
      location,
      specialRequirements,
      priceEstimate,
      submissionTime
    } = bookingData;

    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>甜品预订通知</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Microsoft YaHei', Arial, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { font-size: 28px; margin-bottom: 8px; font-weight: 300; }
        .header h2 { font-size: 18px; font-weight: 400; opacity: 0.9; }
        .content { padding: 30px; }
        .alert { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin-bottom: 25px; }
        .alert strong { color: #856404; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid #f59e0b; }
        .info-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 12px; }
        .info-row { display: contents; }
        .label { font-weight: 600; color: #666; padding: 8px 0; }
        .value { color: #333; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
        .highlight { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; }
        .price { color: #f59e0b; font-weight: bold; font-size: 18px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .footer p { margin: 5px 0; }
        @media (max-width: 600px) {
            .container { margin: 10px; border-radius: 8px; }
            .content { padding: 20px; }
            .info-grid { grid-template-columns: 1fr; gap: 8px; }
            .label { font-weight: 600; margin-top: 10px; }
            .value { border-bottom: 1px solid #f0f0f0; padding-bottom: 8px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍰 Sweet Delights</h1>
            <h2>新的甜品预订通知</h2>
        </div>

        <div class="content">
            <div class="alert">
                <strong>⏰ 提交时间：</strong> ${submissionTime}
            </div>

            <div class="section">
                <div class="section-title">👤 客户信息</div>
                <div class="info-grid">
                    <div class="info-row">
                        <div class="label">姓名：</div>
                        <div class="value">${name}</div>
                    </div>
                    <div class="info-row">
                        <div class="label">电话：</div>
                        <div class="value">${phone}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">📋 预订详情</div>
                <div class="info-grid">
                    <div class="info-row">
                        <div class="label">服务类型：</div>
                        <div class="value">${serviceType}</div>
                    </div>
                    <div class="info-row">
                        <div class="label">预计人数：</div>
                        <div class="value">${people}</div>
                    </div>
                    <div class="info-row">
                        <div class="label">活动日期：</div>
                        <div class="value">${date}</div>
                    </div>
                    <div class="info-row">
                        <div class="label">活动时间：</div>
                        <div class="value">${time}</div>
                    </div>
                    <div class="info-row">
                        <div class="label">活动地点：</div>
                        <div class="value">${location}</div>
                    </div>
                    <div class="info-row">
                        <div class="label">预估价格：</div>
                        <div class="value price">${priceEstimate}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">📝 特殊要求</div>
                <div class="highlight">
                    ${specialRequirements || '无特殊要求'}
                </div>
            </div>

            <div class="alert">
                <strong>📞 请及时联系客户确认预订详情！</strong><br>
                建议在收到此邮件后24小时内联系客户确认服务详情和最终报价。
            </div>
        </div>

        <div class="footer">
            <p><strong>Sweet Delights 甜品预订系统</strong></p>
            <p>此邮件由系统自动发送，请勿直接回复</p>
            <p>如有技术问题，请联系系统管理员</p>
        </div>
    </div>
</body>
</html>
    `;
  }

  // 发送预订邮件
  async sendBookingEmail(bookingData) {
    if (!this.transporter) {
      throw new Error('SMTP transporter not initialized');
    }

    try {
      // 准备邮件数据
      const submissionTime = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const emailData = {
        ...bookingData,
        submissionTime
      };

      // 邮件配置
      const mailOptions = {
        from: {
          name: 'Sweet Delights 预订系统',
          address: process.env.SMTP_FROM || process.env.SMTP_USER
        },
        to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
        replyTo: process.env.SMTP_REPLY_TO || process.env.SMTP_USER,
        subject: `🍰 新的甜品预订 - ${bookingData.name} - ${bookingData.serviceType}`,
        html: this.generateEmailHTML(emailData),
        // 纯文本版本（备用）
        text: this.generatePlainText(emailData),
        // 邮件头
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'Importance': 'high'
        }
      };

      // 发送邮件
      const result = await this.transporter.sendMail(mailOptions);

      console.log('✅ Email sent successfully:', {
        messageId: result.messageId,
        to: mailOptions.to,
        subject: mailOptions.subject
      });

      return {
        success: true,
        messageId: result.messageId,
        message: '邮件发送成功'
      };

    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw error;
    }
  }

  // 生成纯文本版本
  generatePlainText(bookingData) {
    const {
      name, phone, serviceType, people, date, time, location,
      specialRequirements, priceEstimate, submissionTime
    } = bookingData;

    return `
=== Sweet Delights 甜品预订通知 ===

提交时间：${submissionTime}

客户信息：
- 姓名：${name}
- 电话：${phone}

预订详情：
- 服务类型：${serviceType}
- 预计人数：${people}
- 活动日期：${date}
- 活动时间：${time}
- 活动地点：${location}
- 预估价格：${priceEstimate}

特殊要求：
${specialRequirements || '无特殊要求'}

请及时联系客户确认预订详情！
建议在收到此邮件后24小时内联系客户。

---
此邮件由 Sweet Delights 预订系统自动发送
    `.trim();
  }

  // 测试邮件发送
  async sendTestEmail() {
    const testData = {
      name: '测试客户',
      phone: '138****8888',
      serviceType: '甜品台',
      people: '20-30人',
      date: '2024-12-25',
      time: '14:00',
      location: '测试地址',
      specialRequirements: '这是一封测试邮件',
      priceEstimate: '¥1,500'
    };

    return await this.sendBookingEmail(testData);
  }
}

module.exports = new EmailService();