'use client';

import { FullMessageType } from '@/app/types';
import Avatar from '@/app/components/Avatar';
import formatMessageDate from '@/app/helpers/formatMessageDate';

interface MessageBoxProps {
  message: FullMessageType
}

export default function MessageBox({
  message
}: MessageBoxProps) {

  return (
    <div
      className="
      flex
      items-start
      w-full
      "
    >
      <Avatar user={message.sender} />
      <div
        className="
        ml-5
        w-full
        flex
        flex-col
        "
      >
        <div
          className="
          flex
          items-center
          gap-x-3
          w-full
          text-[#828282]
          "
        >
          <h4
            className="
            font-bold
            line-clamp-1
            overflow-ellipsis
            "
          >
            {message.sender.name}
          </h4>
          <p
            className="
            text-xs
            line-clamp-1
            overflow-ellipsis
            "
          >
            {formatMessageDate(message.createdAt)}
          </p>
        </div>
        <div className='w-full'>
          <p
            className="
            text-sm
            text-[#E0E0E0]
            leading-6
            "
          >
            {message.body}
          </p>
        </div>
      </div>
    </div>
  )
}
