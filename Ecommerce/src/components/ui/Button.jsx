import React from 'react';

const VARIANTS = {
  primary:   'btn btn-primary',
  secondary: 'btn btn-secondary',
  accent:    'btn btn-accent',
  danger:    'btn btn-danger',
  ghost:     'btn btn-ghost',
};

const SIZES = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export default function Button({
  children,
  variant   = 'primary',
  size      = 'md',
  full      = false,
  disabled  = false,
  onClick,
  leftIcon,
  rightIcon,
  className = '',
  type      = 'button',
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        full ? 'w-full' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {leftIcon  && <span className="shrink-0 flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
    </button>
  );
}