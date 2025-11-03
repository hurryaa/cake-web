import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `¥${price.toLocaleString()}`;
}

export function lazyLoadImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return {
    src,
    alt,
    className,
    loading: 'lazy' as const,
    decoding: 'async' as const,
  };
}

// 添加渐入动画类
export const fadeInAnimation = (delay = 0) => {
  return `opacity-0 animate-fadeIn animation-delay-${delay} animation-fill-forwards`;
}

// 添加自定义Tailwind工具类
export const customStyles = {
  'content-auto': 'content-visibility: auto',
  'text-shadow': 'text-shadow: 0 2px 4px rgba(0,0,0,0.1)',
  'transition-custom': 'transition-all duration-300 ease-in-out',
  'elegant-shadow': 'box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05)',
  'card-hover': 'transition-all duration-300 hover:shadow-md hover:-translate-y-1',
};
