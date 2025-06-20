import React from 'react';
import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  inputSize?: 'sm' | 'md' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type,
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    variant = 'default',
    inputSize = 'md',
    disabled,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    const baseClasses = clsx(
      'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        'pl-10': leftIcon,
        'pr-10': rightIcon || type === 'password',
      }
    );

    const variantClasses = {
      default: clsx(
        'border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600',
        'focus:ring-primary-500 focus:border-primary-500',
        'dark:focus:ring-primary-400 dark:focus:border-primary-400',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500'
      ),
      filled: clsx(
        'border-0 rounded-lg bg-gray-100 dark:bg-gray-700',
        'focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-800',
        error && 'bg-red-50 focus:bg-red-50 focus:ring-red-500 dark:bg-red-900/20'
      ),
      outlined: clsx(
        'border-2 border-gray-300 rounded-lg bg-transparent dark:border-gray-600',
        'focus:ring-0 focus:border-primary-500 dark:focus:border-primary-400',
        error && 'border-red-500 focus:border-red-500'
      )
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base'
    };

    const labelClasses = clsx(
      'block text-sm font-medium mb-2 transition-colors duration-200',
      error ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300',
      isFocused && !error && 'text-primary-600 dark:text-primary-400'
    );

    return (
      <div className="w-full">
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            type={inputType}
            className={clsx(
              baseClasses,
              variantClasses[variant],
              sizeClasses[inputSize],
              className
            )}
            ref={ref}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
          {rightIcon && type !== 'password' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={clsx(
            'mt-2 text-sm',
            error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;