import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'spinner' | 'dots' | 'pulse' | 'bounce' | 'cake';
  color?: 'primary' | 'secondary' | 'neutral' | 'white';
  text?: string;
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  type = 'spinner',
  color = 'primary',
  text,
  overlay = false
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    neutral: 'text-neutral-500',
    white: 'text-white'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  // 旋转加载器
  const SpinnerLoader = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} ${colorClasses[color]}`}
    >
      <i className="fa-solid fa-spinner text-current"></i>
    </motion.div>
  );

  // 点状加载器
  const DotsLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.2
          }}
          className={`w-2 h-2 rounded-full ${
            color === 'primary' ? 'bg-primary-500' :
            color === 'secondary' ? 'bg-secondary-500' :
            color === 'neutral' ? 'bg-neutral-500' : 'bg-white'
          }`}
        />
      ))}
    </div>
  );

  // 脉冲加载器
  const PulseLoader = () => (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={`${sizeClasses[size]} rounded-full ${
        color === 'primary' ? 'bg-primary-500' :
        color === 'secondary' ? 'bg-secondary-500' :
        color === 'neutral' ? 'bg-neutral-500' : 'bg-white'
      }`}
    />
  );

  // 弹跳加载器
  const BounceLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1
          }}
          className={`w-3 h-3 rounded-full ${
            color === 'primary' ? 'bg-primary-500' :
            color === 'secondary' ? 'bg-secondary-500' :
            color === 'neutral' ? 'bg-neutral-500' : 'bg-white'
          }`}
        />
      ))}
    </div>
  );

  // 蛋糕主题加载器
  const CakeLoader = () => (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`${sizeClasses[size]} ${colorClasses[color]}`}
      >
        <i className="fa-solid fa-birthday-cake text-current"></i>
      </motion.div>
      {/* 装饰粒子 */}
      <div className="relative">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.3
            }}
            className={`absolute w-1 h-1 rounded-full ${
              color === 'primary' ? 'bg-primary-400' :
              color === 'secondary' ? 'bg-secondary-400' :
              color === 'neutral' ? 'bg-neutral-400' : 'bg-white/70'
            }`}
            style={{
              left: `${index * 8 - 12}px`,
              top: '0px'
            }}
          />
        ))}
      </div>
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      case 'bounce':
        return <BounceLoader />;
      case 'cake':
        return <CakeLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  const content = (
    <div className="flex flex-col items-center space-y-3">
      {renderLoader()}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${textSizeClasses[size]} ${colorClasses[color]} font-medium`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div className="bg-white rounded-xl p-8 shadow-glass">
          {content}
        </div>
      </motion.div>
    );
  }

  return content;
};

export default LoadingSpinner;