import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authenticate | Readable',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen items-center">
      <div className="flex flex-col gap-8 h-full justify-center">
        {children}
      </div>
    </div>
  );
}
