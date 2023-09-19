import './globals.css';

import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';

import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';

const noto = Noto_Sans({
  weight: '400',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Chat Group',
  description: 'Chat Group made by @Tzzent',
};

interface RootLayoutProps {
  children: React.ReactNode,
  modal: React.ReactNode,
}

export default function RootLayout({
  children,
  modal,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <AuthContext>
          <ToasterContext />
          {children}
          {modal}
        </AuthContext>
      </body>
    </html>
  )
}
