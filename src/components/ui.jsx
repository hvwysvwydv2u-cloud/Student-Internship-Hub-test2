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
  disabled,
  loading,
  children,
  ...props
}, ref) => {
  const variants = {
    primary: 'inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-xl bg-[var(--primary)] text-white transition-all duration-200 hover:bg-[var(--primary-hover)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
    secondary: 'inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-xl bg-[var(--surface-elevated)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface)] hover:border-[var(--border-hover)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
    ghost: 'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--primary-subtle)] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
    outline: 'inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-xl border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)]/50 hover:bg-[var(--primary-subtle)] hover:text-[var(--primary)] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
  };
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.98]',
        variants[variant],
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
    className={cn('bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-[var(--card-shadow-hover)]', className)}
    style={{ boxShadow: 'var(--card-shadow)' }}
    {...props}
  />
));
Card.displayName = 'Card';

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 border-b border-[var(--border)]', className)}
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
    className={cn('w-full px-4 py-3 text-sm sm:text-base bg-[var(--input-bg)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--text-muted)] transition-all duration-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-[var(--surface-elevated)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]', className)}
    {...props}
  />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn('w-full px-4 py-3 text-sm sm:text-base bg-[var(--input-bg)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--text-muted)] transition-all duration-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-[var(--surface-elevated)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] min-h-[100px] resize-y', className)}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export const Select = React.forwardRef(({ className, options = [], placeholder, ...props }, ref) => (
  <select
    ref={ref}
    className={cn('w-full px-4 py-3 text-sm sm:text-base bg-[var(--input-bg)] border border-[var(--border)] rounded-xl text-[var(--foreground)] appearance-none cursor-pointer transition-all duration-200 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 focus:bg-[var(--surface-elevated)] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]', className)}
    {...props}
  >
    {placeholder && <option value="" disabled selected>{placeholder}</option>}
    {options.map((opt) => (
      <option key={opt.value || opt} value={opt.value || opt} className="bg-[var(--surface)]">
        {opt.label || opt}
      </option>
    ))}
  </select>
));
Select.displayName = 'Select';

export const Badge = ({ className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--primary-subtle)] text-[var(--primary)] border border-[var(--primary)]/20',
    secondary: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border)]',
    outline: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border border-[var(--primary)] text-[var(--primary)]',
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
    <div className={cn('w-full bg-[var(--surface-elevated)] rounded-full overflow-hidden', sizes[size], className)}>
      <div
        className="h-full bg-[var(--primary)] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clampedValue}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      {showLabel && (
        <span className="block text-right text-xs text-[var(--text-muted)] mt-1">{clampedValue}%</span>
      )}
    </div>
  );
};

export const Separator = ({ className }) => (
  <div className={cn('h-[1px] w-full bg-[var(--border)]', className)} />
);

export const Avatar = ({ src, alt, fallback, className, size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl',
    '3xl': 'h-24 w-24 text-3xl',
  };
  return (
    <div className={cn('inline-flex items-center justify-center rounded-xl bg-[var(--primary-subtle)] border border-[var(--primary)]/20 text-[var(--primary)] font-semibold overflow-hidden', sizes[size], className)}>
      {src ? <img src={src} alt={alt || ''} className="h-full w-full object-cover" loading="lazy" /> : <span>{fallback}</span>}
    </div>
  );
};

export const Tabs = ({ tabs = [], activeTab, onChange, className }) => (
  <div className={cn('flex gap-1 p-1 bg-[var(--surface-elevated)] rounded-xl border border-[var(--border)]', className)}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={cn(
          'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200',
          activeTab === tab.id
            ? 'bg-[var(--primary)] text-white shadow-md'
            : 'text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--primary-subtle)]'
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export const Label = ({ className, required, children, ...props }) => (
  <label className={cn('block text-xs sm:text-sm font-semibold text-[var(--text-secondary)] mb-1.5 flex items-center gap-1.5', className)} {...props}>
    {children}
    {required && <span className="text-[var(--primary)]" aria-hidden="true">*</span>}
  </label>
);

export const CardHover = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-200 hover:border-[var(--border-hover)] hover:-translate-y-1', className)}
    style={{ boxShadow: 'var(--card-shadow)' }}
    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--card-shadow)'; }}
    {...props}
  >
    {children}
  </div>
));
CardHover.displayName = 'CardHover';
