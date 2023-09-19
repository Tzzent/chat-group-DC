'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Channel } from '@prisma/client';

import useSidebar from '@/app/hooks/useSidebar';
import clsx from 'clsx';

interface ChannelBoxProps {
  channel: Channel,
  isActive?: boolean,
  isOwner?: boolean,
}

export default function ChannelBox({
  channel,
  isActive,
  isOwner,
}: ChannelBoxProps) {
  const router = useRouter();
  const { openSidebar, toChannelAside } = useSidebar();

  const getCharts = useCallback((name: string) => {
    return name
      .split(' ')
      .map((word, idx) => {
        if (idx > 1) {
          return;
        }

        return word.charAt(0).toUpperCase();
      })
      .join('');
  }, []);

  const handleNavigation = () => {
    openSidebar();
    toChannelAside(channel.id);
    router.push(`/channels/${channel.id}`);
  };

  return (
    <div
      onClick={handleNavigation}
      className={clsx(`
      flex
      items-center
      cursor-pointer
      text-[#BDBDBD]
      hover:text-white
      group
      `,
        isActive && 'text-white'
      )}
    >
      <div
        className="
        relative
        bg-[#252329]
        text-white
        w-10
        h-10
        flex
        justify-center
        items-center
        rounded-lg
        mr-5
        transition
        duration-150
        group-hover:scale-110
        "
      >
        {getCharts(channel.name!)}
        {isOwner
          && (
            <span
              className="
              absolute
              -top-1
              -right-2
              text-[8px]
              bg-emerald-400
              text-black
              font-bold
              rounded-sm
              shadow-lg
              p-[1.5px]
              "
            >
              ME
            </span>
          )}
      </div>
      <p
        className={clsx(`
        uppercase
        `,
          isActive && 'font-bold'
        )}
      >
        {channel.name}
      </p>
    </div>
  )
}
