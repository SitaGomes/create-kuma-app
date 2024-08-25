import { Nav } from './(view)/nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <Nav />

      {children}
    </section>
  );
}
