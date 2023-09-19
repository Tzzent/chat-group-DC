import AuthForm from '@/app/auth/components/AuthForm';
import Modal from '@/app/components/modals/Modal';

export default function AuthModal() {
  return (
    <Modal
      isPageModal
    >
      <AuthForm renderingInModal />
    </Modal>
  )
}
