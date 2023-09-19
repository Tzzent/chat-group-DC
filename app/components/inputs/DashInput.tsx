'use client';

import clsx from 'clsx';
import { useMemo } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

interface DashInputProps {
  id: string,
  type?: string,
  rows?: number,
  placeholder: string,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  disabled?: boolean,
  required?: boolean,
}

export default function DashInput({
  id,
  type,
  rows,
  placeholder,
  register,
  errors,
  disabled,
  required,
}: DashInputProps) {
  const defaultClass = useMemo(() => (
    `
    outline-0
    text-right
    w-full
    p-3
    focus:border
    focus:border-blue-500
    focus:border-t-0
    focus:border-l-0
    focus:border-r-0
    `
  ), []);

  return (
    <div className="w-full">
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
              scrollbar-thin
              scrollbar-thumb-rounded-full
              scrollbar-track-rounded-full
              scrollbar-thumb-gray-600 
              scrollbar-track-gray-950
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
