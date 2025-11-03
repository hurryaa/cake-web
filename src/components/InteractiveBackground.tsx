import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 鼠标位置跟踪
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 平滑的鼠标跟随
  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // 背景元素的移动范围
  const backgroundX = useTransform(mouseXSpring, [0, 1], [-20, 20]);
  const backgroundY = useTransform(mouseYSpring, [0, 1], [-20, 20]);

  // 装饰元素的移动
  const decorX1 = useTransform(mouseXSpring, [0, 1], [-30, 30]);
  const decorY1 = useTransform(mouseYSpring, [0, 1], [-30, 30]);
  const decorX2 = useTransform(mouseXSpring, [0, 1], [20, -20]);
  const decorY2 = useTransform(mouseYSpring, [0, 1], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouseX.set(x);
      mouseY.set(y);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 动态背景渐变 */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          x: backgroundX,
          y: backgroundY,
          background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 100%)'
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* 浮动装饰元素 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-primary-200/30 to-secondary-200/30 blur-xl"
        style={{
          x: decorX1,
          y: decorY1,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-secondary-200/30 to-primary-200/30 blur-xl"
        style={{
          x: decorX2,
          y: decorY2,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* 粒子效果 */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* 内容 */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default InteractiveBackground;