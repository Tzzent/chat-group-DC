'use client';

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import clsx from 'clsx';

interface InputLabelProps {
  id: string,
  label: string,
  type?: string,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors,
  disabled?: boolean,
  required?: boolean,
}

export default function InputLabel({
  id,
  label,
  type,
  register,
  errors,
  disabled,
  required,
}: InputLabelProps) {
  return (
    <div
      className="
      relative
      transition-all
      ease-in-out
      duration-100
      "
    >
      <input
        id={id}
        type={type}
        autoCapitalize={id}
        disabled={disabled}
        autoComplete="off"
        placeholder=""
        {...register(id, { required: required })}
        className={clsx(`
        peer 
        w-full
        rounded-lg
        border-gray-400
        placeholder-shown:border-t-gray-400 
        text-gray-600
        px-3 
        py-2.5 
        text-sm
        placeholder-shown:border
        focus:border-blue-600  
        outline-none
        border-t-transparent
        focus:border-t-transparent
        focus:ring-0
        disabled:border-0 
        disabled:bg-gray-50
        `)}
      />
      <label
        htmlFor={id}
        className="
        before:content[' '] 
        after:content[' '] 
        pointer-events-none 
        absolute 
        left-0 
        -top-1.5
        flex 
        h-full 
        w-full 
        select-none 
        text-[11px] 
        leading-tight 
        text-gray-400 
        transition-all 
        before:pointer-events-none 
        before:mt-[6.5px] 
        before:mr-1 
        before:box-border 
        before:block
        before:h-1.5
        before:w-2.5 
        before:rounded-tl-lg 
        before:border-t 
        before:border-l 
        before:border-gray-400 
        before:transition-all 
        after:pointer-events-none 
        after:mt-[6.5px] 
        after:ml-1 
        after:box-border 
        after:block 
        after:h-1.5 
        after:w-2.5 
        after:flex-grow 
        after:rounded-tr-lg 
        after:border-t 
        after:border-r 
        after:border-gray-400 
        after:transition-all 
        peer-placeholder-shown:text-sm
        peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-600 peer-placeholder-shown:before:border-transparent 
        peer-placeholder-shown:before:outline-none
        peer-placeholder-shown:before:ring-0  peer-placeholder-shown:after:border-transparent 
        peer-focus:text-[11px] 
        peer-focus:leading-tight
        peer-focus:text-blue-600 
        peer-focus:before:border-t-1 
        peer-focus:before:border-l-1 
        peer-focus:before:border-blue-600  
        peer-focus:after:border-t-1
        peer-focus:after:border-r-1 
        peer-focus:after:border-blue-600 
        peer-disabled:text-transparent 
        peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-300
        "
      >
        {label}
      </label>
    </div>
  )
}
