'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      router.push('/channels');
    }
  }, [
    pathname,
    router,
  ]);

  return null;
}
