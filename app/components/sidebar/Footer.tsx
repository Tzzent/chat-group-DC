'use client';

import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useState, useRef, useCallback, useEffect } from 'react';
import { User } from '@prisma/client';

import MemberBox from '@/app/channels/[channelId]/components/MemberBox';
import Settings from './Settings';

interface FooterProps {
  currentUser: User,
}

export default function Footer({
  currentUser,
}: FooterProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback((ev: MouseEvent) => {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(ev?.target as Node)
    ) {
      setIsSettingsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div
      onClick={() => setIsSettingsOpen(true)}
      className="
      px-7
      py-3
      bg-[#0B090C]
      flex
      items-center
      justify-between
      gap-x-3
      relative
      cursor-pointer
      "
    >
      <MemberBox user={currentUser} />
      <RiArrowDownSLine
        className={clsx(`
        transition-transform
        duration-300
        hover:text-sky-300
      `,
          isSettingsOpen && 'rotate-180',
          isSettingsOpen && 'text-sky-300'
        )}
      />
      <Settings
        ref={settingsRef}
        currentUser={currentUser}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  )
}
