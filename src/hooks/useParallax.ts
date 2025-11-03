import { useState, useEffect, useRef } from 'react';

export function useParallax(intensity = 10) {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translateY = scrollY * intensity / 100;
  
  return {
    ref,
    style: {
      transform: `translateY(${translateY}px)`,
      transition: 'transform 0.1s ease-out'
    }
  };
}