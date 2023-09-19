import getUserById from '@/app/actions/getUserById';
import Modal from '@/app/components/modals/Modal';
import ProfileForm from './components/ProfileForm';

interface IParams {
  id: string,
}

export default async function ProfileModal({
  params
}: {
  params: IParams,
}) {
  const user = await getUserById(params.id);

  if (!user) {
    return null;
  }

  return (
    <Modal
      className="bg-white"
      isPageModal
    >
      <ProfileForm user={user} />
    </Modal>
  )
}
