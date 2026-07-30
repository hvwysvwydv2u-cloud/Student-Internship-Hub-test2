"use client";

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = ({ className, variant = 'primary', size = 'md', ...props }) => {
  const variants = {
    primary: 'bg-green-500 text-black hover:bg-green-400 font-bold shadow-[0_0_15px_rgba(0,255,136,0.3)]',
    secondary: 'bg-transparent border border-green-500/50 text-green-500 hover:bg-green-500/10',
    ghost: 'bg-transparent text-green-500 hover:bg-green-500/10',
    outline: 'border border-white/20 text-white hover:border-green-500/50 hover:text-green-500',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3.5 text-lg',
  };
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

export const Card = ({ className, ...props }) => (
  <div className={cn('bg-[#111111] border border-green-500/20 rounded-xl overflow-hidden shadow-xl', className)} {...props} />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={cn('p-6 border-b border-white/5', className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn('p-6', className)} {...props} />
);

export const Input = ({ className, ...props }) => (
  <input
    className={cn(
      'flex h-12 w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white ring-offset-background placeholder:text-white/30 focus:outline-none focus:border-green-500/50 transition-colors',
      className
    )}
    {...props}
  />
);

export const Select = ({ className, options = [], placeholder, ...props }) => (
  <select
    className={cn(
      'flex h-12 w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-white focus:outline-none focus:border-green-500/50 transition-colors appearance-none cursor-pointer',
      className
    )}
    {...props}
  >
    {placeholder && <option value="" disabled selected>{placeholder}</option>}
    {options.map((opt) => (
      <option key={opt.value || opt} value={opt.value || opt} className="bg-[#111111]">
        {opt.label || opt}
      </option>
    ))}
  </select>
);

export const Badge = ({ className, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-green-500/10 text-green-500 border-green-500/20',
    secondary: 'bg-white/10 text-white border-white/20',
    outline: 'border border-green-500 text-green-500',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export const Progress = ({ value = 0, className }) => (
  <div className={cn('h-2 w-full bg-white/5 rounded-full overflow-hidden', className)}>
    <div
      className="h-full bg-green-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,255,136,0.5)]"
      style={{ width: `${value}%` }}
    />
  </div>
);

export const Separator = ({ className }) => (
  <div className={cn('h-[1px] w-full bg-white/5', className)} />
);

export const Avatar = ({ src, fallback, className }) => (
  <div className={cn('h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 overflow-hidden', className)}>
    {src ? <img src={src} className="h-full w-full object-cover" /> : <span className="text-green-500 font-bold">{fallback}</span>}
  </div>
);

export const Tabs = ({ tabs = [], activeTab, onChange }) => (
  <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={cn(
          'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all',
          activeTab === tab.id 
            ? 'bg-green-500 text-black shadow-lg' 
            : 'text-white/60 hover:text-white hover:bg-white/5'
        )}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
