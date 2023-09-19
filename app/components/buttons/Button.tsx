'use client';

import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined,
  fullWidth?: boolean,
  children?: React.ReactNode,
  onClick?: () => void,
  disabled?: boolean,
  danger?: boolean,
  secondary?: boolean,
  className?: string,
}

export default function Button({
  type,
  fullWidth,
  onClick,
  disabled,
  danger,
  secondary,
  children,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
      rounded-lg
      py-1.5
      px-5
      transition-all
      `,
        disabled && 'opacity-50 cursor-not-allowed',
        fullWidth && 'w-full',
        secondary ? 'text-gray-900' : 'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600',
        className,
      )}
    >
      {children}
    </button>
  )
}
