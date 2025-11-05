import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gradient"
  | "glass";

type ButtonSize = "sm" | "md" | "lg" | "pill";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white shadow-lg shadow-primary-500/20 hover:bg-primary-600 focus-visible:ring-primary-500",
  secondary:
    "bg-neutral-900 text-white shadow-lg shadow-neutral-900/20 hover:bg-neutral-800 focus-visible:ring-neutral-800",
  outline:
    "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:ring-neutral-300",
  ghost:
    "text-neutral-700 hover:bg-neutral-100 focus-visible:ring-neutral-200",
  gradient:
    "bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-500 text-white shadow-lg hover:shadow-xl hover:brightness-105 focus-visible:ring-primary-300",
  glass:
    "bg-white/30 backdrop-blur-lg border border-white/40 text-neutral-900 shadow-glass hover:bg-white/50 focus-visible:ring-white/80",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-2xl",
  pill: "px-6 py-2 text-sm rounded-full",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", loading = false, className, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          loading && "pointer-events-none",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
