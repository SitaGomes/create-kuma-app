import type { Metadata } from 'next';

import { ThemeProvider } from '@/components';

export const metadata: Metadata = {
  title: 'Vender | Readable',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
