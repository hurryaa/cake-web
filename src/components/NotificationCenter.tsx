import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationCenterProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onRemove
}) => {
  const getNotificationStyles = (type: Notification['type']) => {
    const styles = {
      success: {
        bg: 'bg-green-50 border-green-200',
        icon: 'fa-check-circle text-green-500',
        title: 'text-green-800',
        message: 'text-green-700'
      },
      error: {
        bg: 'bg-red-50 border-red-200',
        icon: 'fa-exclamation-circle text-red-500',
        title: 'text-red-800',
        message: 'text-red-700'
      },
      warning: {
        bg: 'bg-yellow-50 border-yellow-200',
        icon: 'fa-exclamation-triangle text-yellow-500',
        title: 'text-yellow-800',
        message: 'text-yellow-700'
      },
      info: {
        bg: 'bg-blue-50 border-blue-200',
        icon: 'fa-info-circle text-blue-500',
        title: 'text-blue-800',
        message: 'text-blue-700'
      }
    };
    return styles[type];
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const styles = getNotificationStyles(notification.type);

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
              className={`${styles.bg} border rounded-xl p-4 shadow-glass backdrop-blur-sm`}
            >
              <div className="flex items-start space-x-3">
                {/* 图标 */}
                <div className="flex-shrink-0 mt-0.5">
                  <i className={`fa-solid ${styles.icon} text-lg`}></i>
                </div>

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-semibold ${styles.title} mb-1`}>
                    {notification.title}
                  </h4>
                  <p className={`text-sm ${styles.message} leading-relaxed`}>
                    {notification.message}
                  </p>

                  {/* 操作按钮 */}
                  {notification.action && (
                    <button
                      onClick={notification.action.onClick}
                      className={`mt-3 text-sm font-medium ${styles.title} hover:underline`}
                    >
                      {notification.action.label}
                    </button>
                  )}
                </div>

                {/* 关闭按钮 */}
                <button
                  onClick={() => onRemove(notification.id)}
                  className={`flex-shrink-0 ${styles.message} hover:${styles.title} transition-colors duration-200`}
                >
                  <i className="fa-solid fa-times text-sm"></i>
                </button>
              </div>

              {/* 进度条 */}
              {notification.duration && (
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: notification.duration / 1000, ease: 'linear' }}
                  className={`mt-3 h-1 ${styles.icon.includes('green') ? 'bg-green-300' :
                    styles.icon.includes('red') ? 'bg-red-300' :
                    styles.icon.includes('yellow') ? 'bg-yellow-300' : 'bg-blue-300'
                  } rounded-full`}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };

    setNotifications(prev => [...prev, newNotification]);

    // 自动移除通知
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  };
};

export default NotificationCenter;