'use client';

import { User } from '@prisma/client';
import Image from 'next/image';
import axios from 'axios';
import { format } from 'date-fns';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  useForm,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';
import { AiFillCamera } from 'react-icons/ai';
import { forEach, } from 'lodash';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';

import Button from '@/app/components/buttons/Button';
import Item from './Item';

interface ProfileFormProps {
  user: User,
}

export default function ProfileForm({
  user,
}: ProfileFormProps) {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(user.image);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (user.email === session.data?.user?.email) {
      return setCanEdit(true);
    }

    return setCanEdit(false);
  }, [
    session.data?.user?.email,
    user.email,
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      image: null,
      name: user.name,
      bio: user.bio,
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    forEach(data, (value, key) => {
      formData.append(key, value);
    })

    axios.put(`/api/users/${user.id}`, formData)
      .then(() => {
        toast.success('Your profile has been updated!');
        router.back();
      })
      .catch((err) => console.log(err));
  };

  const onChangeImage: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const file = ev.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setValue('image', file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
      space-y-3
      "
    >
      <div
        className="
        flex 
        items-center
        justify-between
        mb-5
        "
      >
        <div
          className="
          font-sans
          text-sm
          text-gray-500
          "
        >
          Joined on {format(new Date(user.createdAt), 'PPP')}
        </div>
        <div
          className={clsx(`
          relative
          rounded-full
          overflow-hidden
          `,
            canEdit && 'group'
          )}
        >
          <label
            htmlFor="image"
            className="
            absolute
            inset-0
            justify-center
            items-center
            bg-black/50
            cursor-pointer
            text-white
            transition
            ease-in-out
            duration-200
            hidden
            group-hover:flex
            "
          >
            <AiFillCamera size={20} />
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={onChangeImage}
              hidden
            />
          </label>
          <Image
            width={48}
            height={48}
            className="rounded-full"
            src={previewImage || user?.image || '/images/placeholder.jpg'}
            alt="Avatar"
          />
        </div>
      </div>
      <Item
        id="name"
        label="Name"
        body={user.name!}
        canEdit={canEdit}
        register={register}
        errors={errors}
      />
      <Item
        id="email"
        label="Email"
        body={user.email!}
      />
      <Item
        id="bio"
        rows={3}
        label="Bio"
        body={user.bio!}
        canEdit={canEdit}
        register={register}
        errors={errors}
      />
      <div
        className="
        flex
        justify-end
        pt-5
        "
      >
        {
          (canEdit) &&
          <Button type="submit">Save</Button>
        }
      </div>
    </form>
  )
}
