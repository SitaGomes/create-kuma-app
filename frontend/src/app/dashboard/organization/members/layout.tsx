import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Membros | Readable',
  description: '',
};

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
