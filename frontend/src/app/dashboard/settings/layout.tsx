import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Definições | Readable',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
