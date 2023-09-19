'use client';

import { BiMessageAltX } from 'react-icons/bi';

export default function EmptyBody() {
  return (
    <div
      className="
      p-5
      lg:px-20
      flex
      justify-center
      items-center
      flex-1
      select-none
      "
    >
      <div
        className="
        flex
        flex-col
        items-center
        space-y-2
        "
      >
        <div
          className="
          flex
          items-center
          gap-x-3
          "
        >
          <BiMessageAltX size={30} />
          <h2
            className="
            font-bold
            text-lg
            tracking-widest
            "
          >
            This channel is still empty
          </h2>
        </div>
        <p
          className="
          text-gray-400/80
          text-sm
          "
        >
          Be the first to send a message
        </p>
      </div>
    </div>
  )
}
