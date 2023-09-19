'use client';

import { User } from '@prisma/client';

import Avatar from '../../../components/Avatar';

interface MemberBox {
  user: User,
}

export default function MemberBox({
  user,
}: MemberBox) {

  return (
    <div
      className="
      flex
      items-center
      gap-x-5
      "
    >
      <Avatar user={user} />
      <p
        className="
        truncate
        select-none
        "
      >
        {user.name}
      </p>
    </div>
  )
}
