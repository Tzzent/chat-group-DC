'use client'

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import Modal from './Modal';

interface PageModalProps {
  children: React.ReactNode,
  className?: string,
}

export default function PageModal({
  children,
  className,
}: PageModalProps) {
  const router = useRouter()

  const handleOnClose = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Modal
      isOpen
      onClose={handleOnClose}
      className={className}
    >
      {children}
    </Modal>
  )
}