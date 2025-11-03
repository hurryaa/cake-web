import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // 磁性效果的变换
  const rotateX = useTransform(ySpring, [-100, 100], [5, -5]);
  const rotateY = useTransform(xSpring, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const Component = href ? motion.a : motion.div;
  const props = href ? { href } : { onClick };

  return (
    <Component
      ref={ref}
      className={`inline-block cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        x: xSpring,
        y: ySpring,
        rotateX,
        rotateY,
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <motion.div
        className="relative"
        animate={{
          boxShadow: isHovered
            ? '0 20px 40px rgba(0, 0, 0, 0.15)'
            : '0 5px 15px rgba(0, 0, 0, 0.08)',
        }}
        transition={{ duration: 0.3 }}
      >
        {children}

        {/* 光晕效果 */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-md"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Component>
  );
};

export default MagneticButton;