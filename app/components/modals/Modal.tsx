'use client'

import {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
} from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface ModalProps {
  isOpen?: boolean,
  isPageModal?: boolean,
  onClose?: () => void,
  children: React.ReactNode,
  className?: string,
}

export default function Modal({
  isOpen,
  isPageModal,
  children,
  onClose,
  className,
}: ModalProps) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const handleCloseModal = useCallback(() => {
    if (isPageModal) {
      router.back();
    } else {
      onClose && onClose();
    }
  }, [
    isPageModal,
    onClose,
    router,
  ]);

  const onClickOverlay: MouseEventHandler = useCallback((ev) => {
    if (ev.target === overlay.current || ev.target === wrapper.current) {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  const onKeyDown = useCallback((ev: KeyboardEvent) => {
    if (ev.key === 'Escape') {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  useEffect(() => {
    document.addEventListener(
      'keydown',
      onKeyDown
    );

    return () => (
      document.removeEventListener(
        'keydown',
        onKeyDown
      ));
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      onClick={onClickOverlay}
      className={clsx(`
      flex
      justify-center
      items-center
      z-10
      inset-0
      mx-auto 
      bg-black/40
      `,
        isOpen || isPageModal ? 'flex' : 'hidden',
        isPageModal ? 'absolute' : 'fixed',
      )}
    >
      <div
        ref={wrapper}
        className={clsx(`
        shadow-md
        px-8
        py-7
        rounded-3xl
        w-full
        max-w-lg
        `,
          className,
        )}
      >
        {children}
      </div>
    </div >
  )
}
