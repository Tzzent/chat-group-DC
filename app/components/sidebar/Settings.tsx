'use client';

import { useMemo, forwardRef } from 'react';
import { signOut } from 'next-auth/react';
import { AiFillFacebook } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineLogout } from 'react-icons/md';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { toast } from 'react-hot-toast';

import SettingsItem, { SettingsItemProps } from './SettingsItem';

interface SettingsProps {
  isOpen: boolean,
  onClose: () => void,
  currentUser: User,
}

export default forwardRef<HTMLDivElement, SettingsProps>(function Settings({
  isOpen,
  onClose,
  currentUser,
}, ref) {
  const router = useRouter();
  const settingsList: SettingsItemProps[] = useMemo(() => ([
    {
      icon: FaUserCircle,
      label: 'My profile',
      onClick: () => router.push(`/users/${currentUser.id}`),
    },
    {
      icon: AiFillFacebook,
      label: 'Facebook',
      onCLick: () => { },
    },
    {
      isLast: true,
      icon: MdOutlineLogout,
      label: 'Logout',
      onClick: async () => {
        try {
          await signOut({
            redirect: false,
          });
          router.refresh();
          return toast.success('You have successfully logged out!');
        } catch (err) {
          return toast.error('Something went wrong!');
        }
      },
    },
  ]), [
    currentUser.id,
    router,
  ]);

  return (
    <Transition
      ref={ref}
      show={isOpen}
      className="
      w-full
      max-w-[192px]
      absolute
      z-20
      right-8
      bottom-12
      bg-[#252429]
      rounded-lg
      p-4
      border
      border-gray-700
      "
    >
      <Transition.Child
        as="div"
        className="
          flex
          flex-col
          gap-y-2
          "
      >
        {settingsList.map((item) => (
          <SettingsItem
            key={item.label}
            {...item}
          />
        ))}
      </Transition.Child>
    </Transition>
  )
});
