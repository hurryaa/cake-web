// API 配置
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// 预订表单数据接口
export interface BookingFormData {
  name: string;
  phone: string;
  serviceType: string;
  people: string;
  date: string;
  time: string;
  location: string;
  specialRequirements: string;
  priceEstimate?: string;
}

// API 响应接口
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  details?: string;
}

// HTTP 请求工具函数
const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// 初始化邮件服务（检查后端API状态）
export const initEmailService = async (): Promise<boolean> => {
  try {
    const response = await apiRequest('/email/status');
    console.log('✅ Email service initialized:', response.data);
    return response.success && response.data?.smtpConnected;
  } catch (error) {
    console.error('❌ Failed to initialize email service:', error);
    return false;
  }
};

// 发送预订邮件
export const sendBookingEmail = async (formData: BookingFormData): Promise<boolean> => {
  try {
    console.log('📧 Sending booking email:', formData);

    const response = await apiRequest('/email/send-booking', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    console.log('✅ Email sent successfully:', response);
    return response.success;
  } catch (error) {
    console.error('❌ Failed to send booking email:', error);

    // 处理特定错误类型
    if (error instanceof Error) {
      if (error.message.includes('RATE_LIMIT_EXCEEDED')) {
        throw new Error('请求过于频繁，请稍后再试');
      }
      if (error.message.includes('VALIDATION_ERROR')) {
        throw new Error('表单数据验证失败，请检查输入信息');
      }
      if (error.message.includes('SMTP_AUTH_ERROR')) {
        throw new Error('邮件服务器认证失败，请联系管理员');
      }
      if (error.message.includes('SMTP_CONNECTION_ERROR')) {
        throw new Error('无法连接到邮件服务器，请稍后重试');
      }
    }

    throw new Error('邮件发送失败，请稍后重试或联系客服');
  }
};

// 发送测试邮件
export const sendTestEmail = async (): Promise<boolean> => {
  try {
    const response = await apiRequest('/email/test', {
      method: 'POST',
    });

    console.log('✅ Test email sent successfully:', response);
    return response.success;
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
    throw error;
  }
};

// 检查邮件服务状态
export const checkEmailServiceStatus = async (): Promise<{
  connected: boolean;
  host: string;
  port: string;
}> => {
  try {
    const response = await apiRequest('/email/status');

    return {
      connected: response.data?.smtpConnected || false,
      host: response.data?.smtpHost || 'Unknown',
      port: response.data?.smtpPort || 'Unknown',
    };
  } catch (error) {
    console.error('❌ Failed to check email service status:', error);
    return {
      connected: false,
      host: 'Error',
      port: 'Error',
    };
  }
};

// 验证邮件服务配置
export const validateEmailConfig = async (): Promise<boolean> => {
  try {
    const status = await checkEmailServiceStatus();
    return status.connected;
  } catch (error) {
    console.error('❌ Email service validation failed:', error);
    return false;
  }
};

// 格式化错误信息
export const formatErrorMessage = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return '未知错误，请稍后重试';
};