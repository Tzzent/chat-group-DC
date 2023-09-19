'use client';

import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarProps {
  user: User,
}

export default function Avatar({
  user,
}: AvatarProps) {
  return (
    <div
      className="
      relative
      inline-block
      rounded-xl
      overflow-hidden
      h-9
      w-9
      md:h-11
      md:w-11
      flex-shrink-0
      "
    >
      <Image
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 640px, 1000px"
        alt="Avatar"
        src={user?.image || '/images/placeholder.jpg'}
      />
    </div>
  )
}
