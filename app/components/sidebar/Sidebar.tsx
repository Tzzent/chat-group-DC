'use client';

import {
  Channel,
  User,
} from '@prisma/client';
import clsx from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

import ChannelAside from './channel-aside/ChannelAside';
import ChannelsAside from './channels-aside/ChannelsAside';
import Footer from './Footer';
import useSidebar, { VIEWS } from '@/app/hooks/useSidebar';

interface SidebarProps {
  currentUser?: User,
  children: React.ReactNode,
  channels: Channel[]
}

export function Sidebar({
  currentUser,
  children,
  channels,
}: SidebarProps) {
  const {
    view,
    isActive,
    closeSidebar,
  } = useSidebar();

  return (
    <div
      className="
      h-full
      flex
      "
    >
      <div
        onClick={closeSidebar}
        className={clsx(`
        fixed 
        inset-0 
        bg-gradient-to-r 
        from-slate-950
        md:hidden
        z-10
        `,
          !isActive && 'hidden'
        )}
      />
      <div
        className={clsx(`
        w-[85%]
        max-w-sm
        h-full
        flex
        flex-col
        bg-[#120F13]
        text-white
        fixed
        z-10
        inset-0
        left-0
        transition-transform
        duration-300
        `,
          !isActive && '-translate-x-full xl:-translate-x-0',
          !isActive && 'hidden xl:flex',
          `
          xl:relative
        `
        )}
      >
        <RiCloseLine
          onClick={closeSidebar}
          size={35}
          className="
          absolute
          text-white
          top-2
          -right-10
          bg-[#120F13]
          rounded-lg
          p-1
          shadow-black/30
          cursor-pointer
          md:hidden
          "
        />
        {(view === VIEWS.CHANNELS) &&
          (
            <ChannelsAside
              currentUser={currentUser}
              channels={channels}
            />
          )
        }
        {(view === VIEWS.SINGLE_CHANNEL && isActive) &&
          (
            <ChannelAside />
          )
        }
        {currentUser && <Footer currentUser={currentUser} />}
      </div>
      <main
        className="
        h-full 
        w-full
        "
      >
        {children}
      </main>
    </div>
  )
}
