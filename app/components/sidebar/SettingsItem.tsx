'use client';

import clsx from 'clsx';
import { IconType } from 'react-icons';

export interface SettingsItemProps {
  isLast?: boolean,
  icon: IconType,
  label: string,
  onClick?: () => void,
}

export default function SettingsItem({
  isLast,
  icon: Icon,
  label,
  onClick,
}: SettingsItemProps) {
  return (
    <>
      {isLast && (
        <div className="border-t border-[#3C393F] w-full my-1.5" />
      )}
      <div
        onClick={onClick}
        className={clsx(`
        w-full
        px-4
        py-1.5
        rounded-lg
        hover:bg-[#3C393F]
        flex
        items-center
        gap-x-3
        text-xs
        cursor-pointer
        `,
          isLast ? 'text-[#EB5757]' : 'text-[#E0E0E0]'
        )}
      >
        <Icon
          size={20}
          className="
          flex-shrink-0
          "
        />
        <p className="truncate select-none">
          {label}
        </p>
      </div>
    </>
  )
}
