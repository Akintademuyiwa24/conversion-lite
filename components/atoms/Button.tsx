import React from 'react'
import { cn } from '@/libs/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export default function Button({
  className,
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      'bg-purple-500 text-white hover:bg-purple-700 active:bg-purple-800',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
    outline:
      'border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-dark-border-medium dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
    ghost:
      'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:text-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-10 px-4 py-2 text-sm rounded-md',
    lg: 'h-12 px-6 py-3 text-base rounded-lg',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isLoading && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {
        children
      }
    </button>
  )
}
