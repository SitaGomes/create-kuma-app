import type { Metadata } from 'next';

import { ThemeProvider } from '@/components';
import { ROUTES } from '@/constants';
import { authOptions } from '@/lib';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import './style.css';

export const metadata: Metadata = {
  title: 'Dashboard | Readable',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
