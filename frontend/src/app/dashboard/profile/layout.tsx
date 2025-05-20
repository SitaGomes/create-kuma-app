import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perfil | Readable',
  description: '',
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
