import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface PremiumButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'primary' | 'ghost';
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  variant = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = "inline-block cursor-pointer transition-all duration-300 ease-out";

  const variantStyles = {
    default: "bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-200 hover:border-neutral-900",
    primary: "bg-primary-500 hover:bg-primary-600 text-white border border-primary-500 hover:border-primary-600",
    ghost: "bg-transparent hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300"
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const Component = href ? motion.a : motion.div;
  const props = href ? { href } : { onClick };

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -1,
        scale: 1.02
      }}
      whileTap={{
        scale: 0.98,
        y: 0
      }}
      transition={{
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      {...props}
    >
      <motion.div
        className="relative overflow-hidden"
        animate={{
          boxShadow: isHovered
            ? '0 8px 25px rgba(0, 0, 0, 0.1)'
            : '0 2px 8px rgba(0, 0, 0, 0.05)',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}

        {/* 微妙的光效 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.div>
    </Component>
  );
};

export default PremiumButton;