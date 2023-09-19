'use client';

import { useEffect } from 'react';
import { RiChatSmileLine } from 'react-icons/ri';

import Button from '../components/buttons/Button';
import useSidebar from '../hooks/useSidebar';
import useChannel from '../hooks/useChannel';

export default function ChannelsPage() {
  const { openSidebar } = useSidebar();
  const { isOpen } = useChannel();

  useEffect(() => {
    if (!isOpen) {
      openSidebar();
    }
  }, [
    isOpen,
    openSidebar,
  ]);

  return (
    <div
      className="
      bg-[#252329]
      text-white
      h-full
      flex
      flex-col
      justify-center
      items-center
      "
    >
      <div
        className="
        flex
        items-center
        gap-x-3
        mb-5
        "
      >
        <RiChatSmileLine size={30} />
        <h4
          className="
          font-semibold
          text-xl
          "
        >
          Create a channel or join one
        </h4>
      </div>
      <Button
        onClick={openSidebar}
      >
        Search
      </Button>
    </div>
  )
}
