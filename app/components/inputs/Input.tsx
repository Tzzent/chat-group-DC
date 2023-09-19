'use client';

import clsx from 'clsx';
import { useMemo } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface InputProps {
  id: string,
  type?: string,
  rows?: number,
  placeholder: string,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  disabled?: boolean,
  required?: boolean,
}

export default function Input({
  id,
  type,
  rows,
  placeholder,
  register,
  errors,
  disabled,
  required,
}: InputProps) {
  const defaultClass = useMemo(() => (
    `
    outline-0
    bg-[#3C393F]
    w-full
    p-3
    rounded-lg
    focus:ring-1
    focus:ring-slate-300
    `
  ), []);

  return (
    <div
      className="
      relative
      "
    >
      {rows
        ? (
          <textarea
            id={id}
            placeholder={placeholder}
            {...register(id, { required: required })}
            rows={rows}
            className={clsx(
              defaultClass,
              `
              resize-none
              `
            )}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            {...register(id, { required: required })}
            className={defaultClass}
          />
        )}
    </div>
  )
}
