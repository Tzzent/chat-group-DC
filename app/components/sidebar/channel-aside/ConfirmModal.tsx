'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

import useSidebar from '@/app/hooks/useSidebar';
import useChannel from '@/app/hooks/useChannel';
import Modal from '../../modals/Modal';
import Button from '../../buttons/Button';

interface ConfirmModalProps {
  isOpen?: boolean,
  onClose: () => void,
}

export default function ConfirmModal({
  isOpen,
  onClose,
}: ConfirmModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    toChannelsAside,
    selectedChannelId,
  } = useSidebar();
  const { channelId } = useChannel();

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios.delete(`/api/channels/${selectedChannelId}`)
      .then((response) => {
        toast.success('Channel was removed!')

        if (channelId === response.data.id) {
          toChannelsAside();
          router.push('/channels');
        }
      })
      .catch((err) => toast.error(err.response.data))
  }, [
    toChannelsAside,
    selectedChannelId,
    channelId,
    router,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className="
        mx-auto
        bg-white
        rounded-lg
        p-5
        w-full
        max-w-md
        "
      >

        <div
          className="flex"
        >
          <div
            className="
            mx-auto
            flex
            h-12
            w-12
            flex-shrink-0
            items-center
            justify-center
            rounded-full
            bg-red-100
            sm:mx-0
            sm:h-10
            sm:w-10
            "
          >
            <FiAlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div
            className="
            mt-3
            text-center
            sm:ml-4
            sm:mt-0
            sm:text-left
            "
          >
            <h3
              className="
              text-base
              font-semibold
              leading-6
              text-gray-900
              "
            >
              Delete channel
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this channel? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div
          className="
          mt-5
          sm:mt-4
          sm:flex
          sm:flex-row-reverse
          "
        >
          <Button
            disabled={isLoading}
            danger
            onClick={onDelete}
          >
            Delete
          </Button>
          <Button
            disabled={isLoading}
            secondary
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
