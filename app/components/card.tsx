import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties; 
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx('rounded-lg border bg-white shadow-md', className)}>
      {children}
    </div>
  );
}
