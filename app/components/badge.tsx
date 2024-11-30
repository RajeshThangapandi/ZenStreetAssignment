import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        variant === 'outline'
          ? 'border border-blue-500 text-blue-500'
          : 'bg-blue-500 text-white'
      )}
    >
      {children}
    </span>
  );
}
