import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', animate = false, children, ...props }, ref) => {
    const baseClasses = clsx(
      'inline-flex items-center font-medium rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
    );

    const variantClasses = {
      default: 'border-transparent bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200',
      success: 'border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      warning: 'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      error: 'border-transparent bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      info: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      outline: 'border-current text-gray-600 dark:text-gray-400'
    };

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-2.5 py-1.5 text-sm',
      lg: 'px-3 py-2 text-base'
    };

    const BadgeComponent = animate ? motion.span : 'span';
    const motionProps = animate ? {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.2 }
    } : {};

    return (
      <BadgeComponent
        ref={ref}
        className={clsx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...motionProps}
        {...props}
      >
        {children}
      </BadgeComponent>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;