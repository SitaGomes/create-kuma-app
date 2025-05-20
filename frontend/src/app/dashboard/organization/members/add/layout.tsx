import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adicionar membros | Readable',
  description: '',
};

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
