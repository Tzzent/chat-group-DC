'use client';

import { FiMenu } from 'react-icons/fi';

import TopBox from '@/app/components/TopBox';
import useSidebar from '@/app/hooks/useSidebar';
import useChannel from '@/app/hooks/useChannel';

export default function Header() {
  const { openSidebar } = useSidebar();
  const { channel } = useChannel();

  return (
    <TopBox>
      <div
        className="
        px-5
        lg:px-20
        flex
        items-center
        gap-x-3
        w-full
        "
      >
        <FiMenu
          size={25}
          onClick={openSidebar}
          className="
          xl:hidden
          flex-shrink-0
          "
        />
        <h2
          className="
          uppercase
          truncate
          font-semibold
          tracking-wider
          "
        >
          {channel?.name}
        </h2>
      </div>
    </TopBox>
  )
}
