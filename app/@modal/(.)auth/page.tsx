import AuthForm from '@/app/auth/components/AuthForm';
import PageModal from '@/app/components/modals/PageModal';

export default function AuthModal() {
  return (
    <PageModal>
      <AuthForm renderingInModal />
    </PageModal>
  )
}
