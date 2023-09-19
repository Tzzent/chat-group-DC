'use client';

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';

import DashInput from '@/app/components/inputs/DashInput';

interface ItemProps {
  id: string,
  canEdit?: boolean,
  label?: string,
  body: string,
  type?: string,
  rows?: number,
  register?: UseFormRegister<FieldValues>,
  errors?: FieldErrors,
  disabled?: boolean,
}

export default function Item({
  id,
  canEdit,
  label,
  body,
  register,
  rows,
  type,
  disabled,
  errors,
}: ItemProps) {
  return (
    <div
      className="
      flex
      gap-x-3
      justify-between
      text-[#252429]
      text-sm
      "
    >
      <label
        htmlFor={id}
        className="
        font-semibold
        w-full
        "
      >
        {label}
      </label>
      {(canEdit && register && errors) ?
        (
          <DashInput
            id={id}
            placeholder={`Enter your ${id}`}
            register={register}
            disabled={disabled}
            rows={rows}
            type={type}
            errors={errors}
          />
        ) : (
          <div
            id={id}
            className="
            text-[#464649]
            w-full
            text-right
            "
          >
            {body}
          </div>
        )}
    </div>
  )
}
