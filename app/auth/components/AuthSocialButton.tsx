'use client';

import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType,
  onClick: () => void,
}

export default function AuthSocialButton({
  icon: Icon,
  onClick,
}: AuthSocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
      w-full
      border
      border-gray-400
      flex
      justify-center
      items-center
      p-1.5
      rounded-lg
      text-gray-500
      hover:scale-105
      transition-all
      "
    >
      <Icon
        size={20}
      />
    </button>
  )
}
