import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface FABAction {
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'info';
}

interface FloatingActionButtonProps {
  actions?: FABAction[];
  showScrollTop?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions = [],
  showScrollTop = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // 监听滚动，显示/隐藏回到顶部按钮
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 回到顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 默认操作 - 突出在线预订
  const defaultActions: FABAction[] = [
    {
      icon: 'fa-calendar-check',
      label: '在线预订',
      href: '/booking',
      color: 'primary'
    },
    {
      icon: 'fa-phone',
      label: '联系我们',
      href: '/contact',
      color: 'success'
    },
    {
      icon: 'fa-comments',
      label: '在线客服',
      onClick: () => {
        // 这里可以集成在线客服系统
        alert('客服功能开发中...');
      },
      color: 'info'
    }
  ];

  const allActions = actions.length > 0 ? actions : defaultActions;

  const getColorClasses = (color: string = 'primary') => {
    const colorMap = {
      primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-glow',
      secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
      success: 'bg-success hover:bg-green-600 text-white',
      info: 'bg-info hover:bg-blue-600 text-white'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 操作按钮列表 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col space-y-3 mb-4"
          >
            {allActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center space-x-3"
              >
                {/* 标签 */}
                <span className="bg-neutral-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                  {action.label}
                </span>

                {/* 按钮 - 统一尺寸 */}
                {action.href ? (
                  <Link
                    to={action.href}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg ${getColorClasses(action.color)}`}
                  >
                    <i className={`fa-solid ${action.icon} text-sm`}></i>
                  </Link>
                ) : (
                  <button
                    onClick={action.onClick}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg ${getColorClasses(action.color)}`}
                  >
                    <i className={`fa-solid ${action.icon} text-sm`}></i>
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 回到顶部按钮 */}
      <AnimatePresence>
        {showScrollTop && showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-neutral-700 hover:bg-neutral-800 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg mb-3"
          >
            <i className="fa-solid fa-arrow-up text-sm"></i>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 主按钮 - 突出在线预订 */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-calendar-check'} text-lg transition-transform duration-300`}></i>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;