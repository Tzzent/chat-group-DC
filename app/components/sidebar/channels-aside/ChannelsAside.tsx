'use client';

import useInfinitiScroll from 'react-infinite-scroll-hook';
import { HiSearch } from 'react-icons/hi';
import { BsPlus } from 'react-icons/bs';
import { Channel, User } from '@prisma/client';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SyncLoader } from 'react-spinners';
import { find } from 'lodash';

import TopBox from '@/app/components/TopBox';
import InputIcon from '@/app/components/inputs/InputIcon';
import useChannel from '@/app/hooks/useChannel';
import ChannelAddModal from '@/app/components/sidebar/channels-aside/ChannelAddModal';
import ChannelBox from '@/app/components/sidebar/channels-aside/ChannelBox';
import { useLoadChannels } from '@/app/hooks/useLoadChannels';
import { pusherClient } from '@/app/libs/pusher';
import useSidebar from '@/app/hooks/useSidebar';

interface ChannelsAsideProps {
  currentUser?: User,
  channels: Channel[],
}

export default function ChannelsAside({
  currentUser,
  channels,
}: ChannelsAsideProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputLoading, setInputLoading] = useState<boolean>(false);
  const [initialItems, setInitialItems] = useState<Channel[] | []>(channels);
  const session = useSession();
  const router = useRouter();

  const { channelId } = useChannel();
  const { toChannelsAside } = useSidebar();

  const {
    loading,
    items,
    hasNextPage,
    error,
    loadMore,
  } = useLoadChannels();

  const [infinitiRef] = useInfinitiScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
  });

  useEffect(() => {
    if (items.length !== 0) {
      setInitialItems(items);
    }
  }, [items]);

  useEffect(() => {
    //-> 'channels' is the key 
    pusherClient.subscribe('channels');

    const newHandler = (channel: Channel) => {
      setInitialItems((current) => {
        if (find(current, { id: channel.id })) {
          return current;
        }

        return [channel, ...current];
      });
    };

    const removeHandler = (channel: Channel) => {
      setInitialItems((current) => {
        return [
          ...current.filter((chann) => chann.id !== channel.id)
        ];
      });

      toChannelsAside();
      router.push('/channels');
    };

    pusherClient.bind(
      'channel:new',
      newHandler,
    );

    pusherClient.bind(
      'channel:remove',
      removeHandler,
    );

    return () => {
      pusherClient.unsubscribe('channels');

      pusherClient.unbind(
        'channel:new',
        newHandler,
      );
      pusherClient.unbind(
        'channel:remove',
        removeHandler,
      );
    }
  }, [
    toChannelsAside,
    channelId,
    router,
  ]);

  const debouncedRef = useRef<NodeJS.Timeout>();

  const handleChangeInput = useCallback((
    ev: ChangeEvent<HTMLInputElement>,
  ) => {
    setInputLoading(true);

    if (!ev.target.value) {
      setInputLoading(false);
      return setInitialItems(channels);
    }

    if (debouncedRef.current) {
      clearTimeout(debouncedRef.current);
    }

    debouncedRef.current = setTimeout(() => {
      axios.get(`/api/channels?query=${ev.target.value}`)
        .then((response) => setInitialItems(response.data))
        .catch((err => console.error(err)))
        .finally(() => setInputLoading(false))
    }, 1000);

  }, [channels]);

  const handleOpenModal = useCallback(() => {
    if (session.status === 'unauthenticated') {
      toast('Please login!', {
        icon: '👨🏼‍💻',
        duration: 3000,
      });
      return router.push('/auth');
    }

    setIsModalOpen(true);
  }, [
    session.status,
    router,
  ]);

  return (
    <>
      <ChannelAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <TopBox>
        <div
          className="
          w-full
          flex
          items-center
          justify-between
          px-7
          "
        >
          <h2>
            Channels
          </h2>
          <BsPlus
            onClick={handleOpenModal}
            size={28}
            className="
            bg-[#252329]
            rounded-lg
            cursor-pointer
            "
          />
        </div>
      </TopBox>
      <div
        className="
        mt-5
        px-7
        "
      >
        <InputIcon
          onChange={handleChangeInput}
          loading={inputLoading}
          icon={HiSearch}
          placeholder="Search"
        />
      </div>
      <div
        className="
        overflow-y-auto
        flex-1
        flex
        flex-col
        gap-y-5
        mt-5
        pt-5
        px-7
        scrollbar-thin
        scrollbar-thumb-rounded-full
        scrollbar-track-rounded-full
        scrollbar-thumb-gray-600 
        scrollbar-track-gray-950
        "
      >
        {initialItems?.map((channel) => (
          <ChannelBox
            key={channel.id}
            channel={channel}
            isActive={channelId === channel.id}
            isOwner={currentUser?.id === channel.ownerId}
          />
        ))}
        {
          hasNextPage || inputLoading && (
            <div
              ref={infinitiRef}
              className="
              mt-8
              flex
              justify-center
              "
            >
              <SyncLoader color="#36d7b7" />
            </div>
          )
        }
      </div>
    </>
  )
}
