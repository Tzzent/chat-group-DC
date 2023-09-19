'use client';

import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  BsGoogle,
  BsFacebook,
} from 'react-icons/bs';
import { useCallback, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import InputLabel from '@/app/components/inputs/InputLabel';
import AuthSocialButton from './AuthSocialButton';
import Button from '@/app/components/buttons/Button';

type Variant = 'LOGIN' | 'REGISTER';

interface AuthFormProps {
  renderingInModal?: boolean,
}

export default function AuthForm({
  renderingInModal,
}: AuthFormProps) {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/channels')
    }
  }, [
    session?.status,
    router,
  ]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      return setVariant('REGISTER');
    }

    return setVariant('LOGIN');
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((cb) => {
          if (cb?.error) {
            toast.error(cb.error);
          }

          if (cb?.ok && !cb?.error) {
            toast.success('Logged in successfully!');

            if (renderingInModal) {
              router.back();
            } else {
              router.push('/channels');
            }

            router.refresh();
          }
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
        .then((c) => {
          toast.success('You have successfully registered!');
          signIn('credentials', data);
        })
        .catch((e) => toast.error(e?.response?.data))
        .finally(() => setIsLoading(false));
    }
  };


  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action);
  };

  return (
    <div
      className="
      sm:mx-auto
      sm:w-full
      sm:max-w-md
      "
    >
      <div
        className="
        px-4
        py-8
        shadow
        sm:rounded-lg
        bg-white
        sm:px-10   
        "
      >
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <InputLabel
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <InputLabel
            id="email"
            label="Email"
            type="text"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <InputLabel
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Button
            fullWidth
            onClick={() => { }}
            type="submit"
            disabled={isLoading}
          >
            {variant === 'LOGIN' ? 'Login' : 'Register'}
          </Button>
        </form>

        <div
          className="
          my-8
          border-t
          relative
          "
        >
          <p
            className="
            select-none
            w-fit
            mx-auto
            px-2
            text-xs
            text-gray-400
            bg-white
            absolute
            inset-0
            -top-2
            "
          >
            Or continue with
          </p>
        </div>
        <div
          className="
          flex
          justify-center
          gap-x-5
          "
        >
          <AuthSocialButton
            icon={BsGoogle}
            onClick={() => socialAction('google')}
          />
          <AuthSocialButton
            icon={BsFacebook}
            onClick={() => socialAction('facebook')}
          />
        </div>

        <div
          className="
          flex
          justify-center
          gap-x-2
          mt-8
          text-sm
          text-gray-500
          "
        >
          <p>
            {variant === 'LOGIN' ? 'New to Chat Group?' : 'Already have an account?'}
          </p>
          <button
            onClick={toggleVariant}
            className="
            underline
            bg-transparent
            border-none
            outline-none
            hover:text-[#2F80ED]
            select-none
            "
          >
            {variant === 'LOGIN' ? 'Register' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}
