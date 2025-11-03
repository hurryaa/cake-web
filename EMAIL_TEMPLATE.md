# EmailJS 邮件模板配置指南

## 1. 注册 EmailJS 账号

1. 访问 [EmailJS官网](https://www.emailjs.com/)
2. 注册账号并登录
3. 创建新的邮件服务

## 2. 配置邮件服务

### 添加邮件服务
1. 在 EmailJS 控制台中点击 "Add New Service"
2. 选择邮件服务提供商（推荐 Gmail 或 Outlook）
3. 按照指引完成邮件服务配置
4. 记录 **Service ID**

### 创建邮件模板
1. 在 EmailJS 控制台中点击 "Create New Template"
2. 使用以下模板内容：

#### 邮件主题
```
新的甜品预订 - {{customer_name}} - {{service_type}}
```

#### 邮件内容（HTML格式）
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>甜品预订通知</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #ec4899); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-section { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #f59e0b; }
        .info-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
        .highlight { background: #fff3cd; padding: 15px; border-radius: 8px; border: 1px solid #ffeaa7; margin: 15px 0; }
        .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍰 Sweet Delights</h1>
            <h2>新的甜品预订通知</h2>
        </div>

        <div class="content">
            <div class="highlight">
                <strong>⏰ 提交时间：</strong> {{submission_time}}
            </div>

            <div class="info-section">
                <h3>👤 客户信息</h3>
                <div class="info-row">
                    <span class="label">姓名：</span>
                    <span class="value">{{customer_name}}</span>
                </div>
                <div class="info-row">
                    <span class="label">电话：</span>
                    <span class="value">{{customer_phone}}</span>
                </div>
            </div>

            <div class="info-section">
                <h3>📋 预订详情</h3>
                <div class="info-row">
                    <span class="label">服务类型：</span>
                    <span class="value">{{service_type}}</span>
                </div>
                <div class="info-row">
                    <span class="label">预计人数：</span>
                    <span class="value">{{people_count}}</span>
                </div>
                <div class="info-row">
                    <span class="label">活动日期：</span>
                    <span class="value">{{event_date}}</span>
                </div>
                <div class="info-row">
                    <span class="label">活动时间：</span>
                    <span class="value">{{event_time}}</span>
                </div>
                <div class="info-row">
                    <span class="label">活动地点：</span>
                    <span class="value">{{event_location}}</span>
                </div>
                <div class="info-row">
                    <span class="label">预估价格：</span>
                    <span class="value" style="color: #f59e0b; font-weight: bold;">{{price_estimate}}</span>
                </div>
            </div>

            <div class="info-section">
                <h3>📝 特殊要求</h3>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin: 10px 0;">
                    {{special_requirements}}
                </p>
            </div>

            <div class="highlight">
                <strong>📞 请及时联系客户确认预订详情！</strong><br>
                建议在收到此邮件后24小时内联系客户。
            </div>
        </div>

        <div class="footer">
            <p>此邮件由 Sweet Delights 在线预订系统自动发送</p>
            <p>如有问题，请联系技术支持</p>
        </div>
    </div>
</body>
</html>
```

3. 保存模板并记录 **Template ID**

## 3. 获取配置信息

完成上述步骤后，您需要获取以下信息：

1. **Public Key** - 在 EmailJS 控制台的 "Account" 页面中找到
2. **Service ID** - 您创建的邮件服务的 ID
3. **Template ID** - 您创建的邮件模板的 ID

## 4. 配置环境变量

将获取的信息填入 `.env.local` 文件：

```env
# EmailJS 配置
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id

# 接收邮件的邮箱地址
VITE_RECIPIENT_EMAIL=your_business_email@example.com
```

## 5. 测试邮件发送

1. 重启开发服务器
2. 访问预订页面
3. 填写测试数据并提交
4. 检查指定邮箱是否收到预订邮件

## 6. 安全注意事项

1. **Public Key** 是公开的，可以在前端代码中使用
2. 在 EmailJS 控制台中设置域名白名单，防止滥用
3. 设置每日发送限制，避免恶意使用
4. 定期检查邮件发送统计和日志

## 7. 故障排除

### 常见问题：
1. **邮件未收到** - 检查垃圾邮件文件夹
2. **配置错误** - 验证 Service ID 和 Template ID 是否正确
3. **发送失败** - 检查浏览器控制台的错误信息
4. **模板变量未替换** - 确保模板中的变量名与代码中一致

### 调试方法：
1. 打开浏览器开发者工具
2. 查看 Console 标签页的日志信息
3. 检查 Network 标签页的请求状态
4. 在 EmailJS 控制台查看发送历史

## 8. 高级配置

### 自定义回复邮件
可以配置自动回复邮件给客户，确认收到预订信息。

### 多语言支持
创建不同语言的邮件模板，根据客户选择发送对应语言的邮件。

### 邮件统计
在 EmailJS 控制台中查看邮件发送统计，监控系统使用情况。