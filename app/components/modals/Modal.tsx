'use client'

import {
  useCallback,
  useRef,
  useEffect,
  MouseEventHandler,
} from 'react';
import clsx from 'clsx';

interface ModalProps {
  isOpen?: boolean,
  onClose: () => void,
  children: React.ReactNode,
  className?: string,
}

export default function Modal({
  isOpen,
  children,
  onClose,
  className,
}: ModalProps) {
  const overlay = useRef(null);
  const wrapper = useRef(null);

  const onClickOverlay: MouseEventHandler = useCallback((ev) => {
    if (ev.target === overlay.current || ev.target === wrapper.current) {
      onClose();
    }
  }, [onClose]);

  const onKeyDown = useCallback((ev: KeyboardEvent) => {
    if (ev.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

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
      w-screen
      h-screen
      fixed 
      flex
      justify-center
      items-center
      z-10 
      inset-0
      mx-auto 
      bg-black/50
      `,
        !isOpen && 'hidden'
      )}
    >
      <div
        ref={wrapper}
        className={clsx(`
        m-5
        shadow-md
        px-8
        py-7
        rounded-3xl
        w-full
        `,
          className,
        )}
      >
        {children}
      </div>
    </div >
  )
}
