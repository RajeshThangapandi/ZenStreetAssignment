import React, { ButtonHTMLAttributes, AnchorHTMLAttributes,ReactElement } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'icon';
  selected?: boolean; // Add a selected prop
  asChild?: boolean; // Flag to render as a <a> instead of a <button>
  children: React.ReactNode;
}

export default function Button({
  variant = 'default',
  size = 'md',
  selected = false, // default to false
  asChild = false,  // Whether to render as a <a> element
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none';
  
  const variants = {
    default: 'border-2 border-black text-black hover:bg-transparent', // Default style with black border and text
    ghost: 'text-blue-500 hover:bg-blue-50',
    link: 'text-blue-500 underline',
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    icon: 'p-2',
  };

  // If `asChild` is true, render as an <a> element
  if (asChild) {
    // Prevent nesting of anchor tags
    if (React.isValidElement(children) && (children as ReactElement).type === 'a') {
      console.warn("Button's children should not be an anchor element when using 'asChild'");
      return null; // or handle it differently
    }

    return (
      <a
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={clsx(
          baseStyles,
          variants[variant], // Apply default variant styles
          selected && 'bg-blue-500 text-white border-blue-500', // Apply selected style
          sizes[size],
          className
        )}
      >
        {children}
      </a>
    );
  }

  // Default button rendering
  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant], // Apply default variant styles
        selected && 'bg-blue-500 text-white border-blue-500', // Apply selected style
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
