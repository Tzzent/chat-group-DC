import getUserById from '@/app/actions/getUserById';
import PageModal from '@/app/components/modals/PageModal';
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
    <PageModal
      className="
      max-w-lg
      bg-white
      "
    >
      <ProfileForm user={user} />
    </PageModal>
  )
}
