'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { FaRegChessKing } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { FullChannelType } from '@/app/types';
import TopBox from '@/app/components/TopBox'
import MemberBox from '@/app/channels/[channelId]/components/MemberBox';
import useSidebar from '@/app/hooks/useSidebar';
import Button from '../../buttons/Button';
import ConfirmModal from './ConfirmModal';
import { pusherClient } from '@/app/libs/pusher';
import useChannel from '@/app/hooks/useChannel';

export default function ChannelAside() {
  const [channel, setChannel] = useState<FullChannelType | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const { toChannelsAside } = useSidebar();
  const { selectedChannelId } = useSidebar();
  const { channelId } = useChannel();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    axios.get(`/api/channels/${selectedChannelId}`)
      .then((response) => setChannel(response.data))
      .catch((err) => setChannel(null));
  }, [selectedChannelId]);

  useEffect(() => {
    pusherClient.subscribe(channelId);

    const updateChannelHandler = (channel: FullChannelType) => {
      setChannel(channel);
    };

    pusherClient.bind(
      'members:update',
      updateChannelHandler,
    );

    return () => {
      pusherClient.unsubscribe(channelId);

      pusherClient.unbind(
        'members:update',
        updateChannelHandler
      );
    }
  }, [channelId]);

  const handleJoinChannel = useCallback(() => {
    axios.put(`/api/channels/${selectedChannelId}/join`)
      .then((response) => {
        toast.success('You are now a member!');
        setChannel(response.data);
        router.push(`/channels/${selectedChannelId}`);
      })
      .catch((err) => setChannel(null));
  }, [
    selectedChannelId,
    router,
  ]);

  const handleLeaveChannel = useCallback(() => {
    axios.put(`/api/channels/${selectedChannelId}/leave`)
      .then((response) => {
        toast.success('You have left the channel!');
        setChannel(response.data);
        router.push(`/channels/${selectedChannelId}`);
      })
      .catch((err) => setChannel(null));
  }, [
    selectedChannelId,
    router,
  ]);

  const isMember = useMemo(() => {
    const userIsMember = channel?.members.find((member) => member.email === session.data?.user?.email);

    return !!userIsMember;
  }, [
    channel?.members,
    session.data?.user?.email,
  ]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />
      <TopBox>
        <div
          onClick={toChannelsAside}
          className="
          w-full
          flex
          items-center
          gap-x-3
          px-7
          cursor-pointer
          "
        >
          <AiOutlineLeft
            size={15}
            className="
            "
          />
          <h2>
            All channels
          </h2>
        </div>
      </TopBox>
      <div
        className="
        mt-5
        px-7
        text-[#E0E0E0]
        space-y-5
        "
      >
        <div
          className="
          flex
          justify-between
          items-start
          "
        >
          <div>
            <h2 className="font-bold">
              {channel?.name}
            </h2>
            <p className="text-xs text-gray-500">
              By {channel?.owner.name}
            </p>
          </div>
          {
            session?.data?.user?.email === channel?.owner.email ?
              (
                <Button
                  danger
                  onClick={() => setConfirmOpen(true)}
                >
                  Delete
                </Button>
              ) : isMember ?
                (
                  <Button
                    danger
                    onClick={handleLeaveChannel}
                  >
                    Leave
                  </Button>
                ) : (
                  <Button
                    onClick={handleJoinChannel}>
                    Join
                  </Button>
                )
          }
        </div>
        <p>
          {channel?.description}
        </p>
      </div>
      <div
        className="
        overflow-y-auto
        flex-1
        flex
        flex-col
        gap-y-5
        mt-10
        px-7
        scrollbar-thin
        scrollbar-thumb-rounded-full
        scrollbar-track-rounded-full
        scrollbar-thumb-gray-600 
        scrollbar-track-gray-950
        "
      >
        <h2>MEMBERS</h2>
        {
          channel?.members.map((member) => (
            <Link
              key={member.id}
              href={`/users/${member.id}`}
              className="
            flex
            items-center
            justify-between
            gap-x-3
            "
            >
              <MemberBox user={member} />
              {
                member.id === channel.ownerId && (
                  <FaRegChessKing
                    size={16}
                    className="text-amber-300"
                  />
                )
              }
            </Link>
          ))
        }
      </div>
    </>
  )
}
