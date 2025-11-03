import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  offset?: string;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * 滚动渐显组件 - 当元素进入视口时触发渐显动画
 */
export default function FadeInSection({
  children,
  delay = 0,
  offset = "-20%",
  className = "",
  direction = "up"
}: FadeInSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: offset });
  
  // 根据方向设置初始位置
  const initialPosition = {
    up: { y: 30, opacity: 0 },
    down: { y: -30, opacity: 0 },
    left: { x: -30, opacity: 0 },
    right: { x: 30, opacity: 0 }
  };
  
  return (
    <motion.div
      ref={ref}
      initial={initialPosition[direction]}
      animate={isInView ? { y: 0, x: 0, opacity: 1 } : initialPosition[direction]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}