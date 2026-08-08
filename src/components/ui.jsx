"use client";

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  children,
  ...props
}, ref) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    outline: 'btn-outline',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
});
Button.displayName = 'Button';

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('card-base', className)}
    {...props}
  />
));
Card.displayName = 'Card';

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 border-b border-border', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn('input-base', className)}
    {...props}
  />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn('input-base min-h-[100px] resize-y', className)}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export const Select = React.forwardRef(({ className, options = [], placeholder, ...props }, ref) => (
  <select
    ref={ref}
    className={cn('select-base', className)}
    {...props}
  >
    {placeholder && <option value="" disabled selected>{placeholder}</option>}
    {options.map((opt) => (
      <option key={opt.value || opt} value={opt.value || opt} className="bg-surface">
        {opt.label || opt}
      </option>
    ))}
  </select>
));
Select.displayName = 'Select';

export const Badge = ({ className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    outline: 'badge-outline',
  };
  return (
    <span
      className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', variants[variant], className)}
      {...props}
    />
  );
};

export const Progress = ({ value = 0, className, size = 'md', showLabel = false }) => {
  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };
  const clampedValue = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('w-full bg-surface-elevated rounded-full overflow-hidden', sizes[size], className)}>
      <div
        className="progress-bar-fill"
        style={{ width: `${clampedValue}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      {showLabel && (
        <span className="block text-right text-xs text-gray-400 mt-1">{clampedValue}%</span>
      )}
    </div>
  );
};

export const Separator = ({ className }) => (
  <div className={cn('h-[1px] w-full bg-border', className)} />
);

export const Avatar = ({ src, fallback, className, size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl',
    '3xl': 'h-24 w-24 text-3xl',
  };
  return (
    <div className={cn('avatar-base flex-shrink-0 overflow-hidden', sizes[size], className)}>
      {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <span>{fallback}</span>}
    </div>
  );
};

export const Tabs = ({ tabs = [], activeTab, onChange, className }) => (
  <div className={cn('flex gap-1 p-1 bg-surface-elevated rounded-xl border border-border', className)}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={cn(
          'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200',
          activeTab === tab.id
            ? 'bg-primary text-background shadow-md'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export const Label = ({ className, required, children, ...props }) => (
  <label className={cn('block text-xs sm:text-sm font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5', className)} {...props}>
    {children}
    {required && <span className="text-primary" aria-hidden="true">*</span>}
  </label>
);

export const CardHover = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('card-hover-lift', className)}
    {...props}
  >
    {children}
  </div>
));
CardHover.displayName = 'CardHover';