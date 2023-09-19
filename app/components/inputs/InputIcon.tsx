'use client';

import { ChangeEvent } from 'react';
import { IconType } from 'react-icons';
import { ClipLoader } from 'react-spinners';

interface InputIconProps {
  placeholder?: string,
  icon: IconType,
  iconPosition?: 'left' | 'right' | undefined,
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void,
  loading?: boolean,
}

export default function InputIcon({
  placeholder,
  icon: Icon,
  iconPosition,
  onChange,
  loading,
}: InputIconProps) {
  return (
    <div
      className="
      relative
      "
    >
      {loading
        ? (
          <ClipLoader
            color="#fff"
            size={25}
            className="
            pointer-events-none
            absolute
            m-auto
            mb-3
            left-2
            h-full
            inset-y-0
            "
          />
        ) : (
          <Icon
            size={25}
            className="
            pointer-events-none
            absolute
            left-2
            h-full
            inset-y-0
            "
          />
        )}
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="
        outline-0
        bg-[#3C393F]
        w-full
        p-2.5
        pl-12
        rounded-lg
        focus:ring-1
        focus:ring-slate-300
        "
      />
    </div>
  )
}
