'use client';

import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import Button from '@/app/components/buttons/Button';
import Input from '@/app/components/inputs/Input';
import Modal from '@/app/components/modals/Modal';

interface ChannelAddModalProps {
  isOpen: boolean,
  onClose: () => void,
}

export default function ChannelAddModal({
  isOpen,
  onClose,
}: ChannelAddModalProps) {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
    }
  });

  const onSumbit: SubmitHandler<FieldValues> = (data) => {
    axios.post(`/api/channels`, data)
      .then((cb) => toast.success('Your channel was created!'))
      .catch((err) => console.log(err))
      .finally(() => {
        onClose();
      })
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="
      bg-[#120F13]
      "
    >
      <h1
        className="
        uppercase
        font-bold
        "
      >
        New Channel
      </h1>
      <form
        onSubmit={handleSubmit(onSumbit)}
        className="
        mt-5
        space-y-5
        "
      >
        <Input
          id="name"
          placeholder="Channel name"
          register={register}
          errors={errors}
        />
        <Input
          id="description"
          placeholder="Channel description"
          rows={3}
          register={register}
          errors={errors}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
          >
            <div className="px-4 py-1">
              Save
            </div>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
