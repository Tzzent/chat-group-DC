'use client';

import { IoSend } from 'react-icons/io5';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import clsx from 'clsx';
import {
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import useChannel from '@/app/hooks/useChannel';

export default function InputForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const session = useSession();
  const router = useRouter();
  const { channelId, channel } = useChannel();

  const onSubmit = useCallback(() => {
    if (!inputRef.current?.value) {
      return null;
    }

    if (session.status === 'unauthenticated') {
      toast('Please login!', {
        icon: '👨🏼‍💻',
        duration: 3000,
      });
      return router.push('/auth');
    }

    setIsLoading(true);

    axios.post(`/api/messages`, {
      message: inputRef.current.value,
      channelId: channelId,
    }).then(() => toast.success('Your message has been sent! 😎'))
      .catch((err) => toast.error(err.response.data))
      .finally(() => {
        setIsLoading(false);
        inputRef.current!.value = '';
      })
  }, [
    channelId,
    router,
    session.status,
  ]);

  const onKeyDown = useCallback((ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      onSubmit();
    }
  }, [onSubmit]);

  return (
    <div
      className="
      relative
      "
    >
      <input
        ref={inputRef}
        onKeyDown={onKeyDown}
        type="text"
        placeholder="Type a message here"
        disabled={isLoading}
        className={clsx(`
        w-full
        p-3
        placeholder:text-[#828282]
        bg-[#3C393F]
        rounded-lg
        border-0
        outline-0
        focus:ring-1
        focus:ring-[#2F80ED]
        disabled:cursor-not-allowed
        `,

        )}
      />
      <div
        className="
        absolute
        right-1
        bottom-0
        inset-y-0
        flex
        items-center
        justify-center
        "
      >
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={clsx(`
          flex
          items-center
          justify-center
          bg-[#2F80ED]
          text-white
          rounded-lg
          py-2
          px-3
          transition-all
          hover:bg-[#0056c7]
          disabled:cursor-not-allowed
          `,
            isLoading && 'cursor-not-allowed',
          )}
        >
          {
            isLoading
              ? (
                <PuffLoader
                  color="#ffffff"
                  size={20}
                />
              ) : (
                <IoSend size={18} />
              )
          }
        </button>
      </div>
    </div>
  )
}
