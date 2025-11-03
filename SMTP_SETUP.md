# SMTP 邮件服务配置指南

## 📧 概述

本项目使用 SMTP 协议直接发送邮件，支持主流邮件服务提供商。相比 EmailJS，SMTP 方案具有更高的可靠性、更好的控制性和更专业的邮件发送能力。

## 🚀 快速开始

### 1. 配置环境变量

编辑项目根目录的 `.env.local` 文件：

```env
# SMTP 服务器配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# 邮件发送配置
SMTP_FROM=your_email@gmail.com
SMTP_REPLY_TO=your_email@gmail.com
RECIPIENT_EMAIL=your_business_email@gmail.com

# API 服务配置
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 2. 启动服务

```bash
# 同时启动前端和后端
pnpm dev

# 或分别启动
pnpm dev:server  # 启动后端API服务器
pnpm dev:client  # 启动前端开发服务器
```

## 📮 邮件服务商配置

### Gmail 配置

1. **启用两步验证**
   - 访问 [Google 账户安全设置](https://myaccount.google.com/security)
   - 启用两步验证

2. **生成应用专用密码**
   - 在安全设置中找到"应用专用密码"
   - 选择"邮件"和"其他设备"
   - 生成16位应用专用密码

3. **配置参数**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_16_digit_app_password
   ```

### Outlook/Hotmail 配置

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@outlook.com
SMTP_PASS=your_password
```

### QQ 邮箱配置

1. **开启SMTP服务**
   - 登录QQ邮箱 → 设置 → 账户
   - 开启"POP3/SMTP服务"
   - 获取授权码

2. **配置参数**
   ```env
   SMTP_HOST=smtp.qq.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@qq.com
   SMTP_PASS=your_authorization_code
   ```

### 163 邮箱配置

```env
SMTP_HOST=smtp.163.com
SMTP_PORT=25
SMTP_SECURE=false
SMTP_USER=your_email@163.com
SMTP_PASS=your_authorization_code
```

### 企业邮箱配置

#### 阿里云邮箱
```env
SMTP_HOST=smtp.mxhichina.com
SMTP_PORT=25
SMTP_SECURE=false
SMTP_USER=your_email@yourdomain.com
SMTP_PASS=your_password
```

#### 腾讯企业邮箱
```env
SMTP_HOST=smtp.exmail.qq.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@yourdomain.com
SMTP_PASS=your_password
```

## 🔧 API 接口

### 发送预订邮件
```http
POST /api/email/send-booking
Content-Type: application/json

{
  "name": "客户姓名",
  "phone": "13800138000",
  "serviceType": "1",
  "people": "2",
  "date": "2024-12-25",
  "time": "14:00",
  "location": "活动地点",
  "specialRequirements": "特殊要求",
  "priceEstimate": "¥1,500"
}
```

### 发送测试邮件
```http
POST /api/email/test
```

### 检查服务状态
```http
GET /api/email/status
```

## 🛠️ 故障排除

### 常见错误

#### 1. SMTP 认证失败 (EAUTH)
**原因：** 用户名或密码错误
**解决：**
- 检查 `SMTP_USER` 和 `SMTP_PASS` 是否正确
- Gmail 用户确保使用应用专用密码
- QQ/163 用户确保使用授权码而非登录密码

#### 2. 连接超时 (ECONNECTION)
**原因：** 无法连接到SMTP服务器
**解决：**
- 检查 `SMTP_HOST` 和 `SMTP_PORT` 是否正确
- 确认网络连接正常
- 检查防火墙设置

#### 3. 邮件被拒绝 (EMESSAGE)
**原因：** 邮件内容或格式问题
**解决：**
- 检查发件人邮箱是否有效
- 确认收件人邮箱地址正确
- 检查邮件内容是否包含敏感词

### 调试方法

1. **查看服务器日志**
   ```bash
   # 启动后端服务器，查看控制台输出
   pnpm dev:server
   ```

2. **测试SMTP连接**
   ```bash
   # 访问状态检查接口
   curl http://localhost:3001/api/email/status
   ```

3. **发送测试邮件**
   ```bash
   # 发送测试邮件
   curl -X POST http://localhost:3001/api/email/test
   ```

## 🔒 安全配置

### 1. 环境变量保护
- 永远不要将 `.env.local` 文件提交到版本控制
- 在生产环境中使用环境变量而非文件配置

### 2. 请求频率限制
- 默认限制：每分钟5次请求
- 可在 `api/routes/email.js` 中调整限制

### 3. 输入验证
- 所有表单字段都经过严格验证
- 防止SQL注入和XSS攻击

### 4. SMTP 安全
- 使用TLS加密连接
- 定期更换邮箱密码
- 监控异常登录活动

## 📊 监控和日志

### 日志记录
- 所有邮件发送都会记录到控制台
- 包含时间戳、收件人、主题等信息
- 错误信息详细记录便于调试

### 性能监控
- 连接池管理：最多5个并发连接
- 发送频率限制：每秒最多5封邮件
- 自动重连机制

## 🚀 生产环境部署

### 1. 环境变量配置
```env
NODE_ENV=production
SMTP_HOST=your_production_smtp_host
SMTP_USER=your_production_email
SMTP_PASS=your_production_password
RECIPIENT_EMAIL=your_business_email
```

### 2. 启动服务
```bash
# 构建前端
pnpm build:client

# 启动生产服务器
pnpm start
```

### 3. 反向代理配置 (Nginx)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 前端静态文件
    location / {
        root /path/to/dist/static;
        try_files $uri $uri/ /index.html;
    }

    # API 接口
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 📈 扩展功能

### 1. 邮件模板定制
- 修改 `api/services/emailService.js` 中的 `generateEmailHTML` 方法
- 支持动态内容和样式定制

### 2. 多语言支持
- 根据用户语言选择不同邮件模板
- 支持中英文双语邮件

### 3. 邮件统计
- 记录发送成功率
- 统计邮件打开率（需要额外配置）
- 生成邮件发送报告

### 4. 队列处理
- 集成 Redis 实现邮件队列
- 支持批量发送和延时发送
- 提高系统并发处理能力

## 💡 最佳实践

1. **定期备份配置** - 保存SMTP配置的备份
2. **监控发送状态** - 定期检查邮件发送成功率
3. **更新依赖包** - 保持 nodemailer 等依赖的最新版本
4. **测试邮件模板** - 在不同邮件客户端中测试显示效果
5. **设置邮件签名** - 添加专业的邮件签名和联系信息