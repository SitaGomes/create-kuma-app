import { CustomLink, CustomText, Heading } from '@kuma/ui/components';
import Link from 'next/link';
import BROWSER_ROUTES from '../constants/BROWSER_ROUTES';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Heading size={'lg'}>create-kuma-app</Heading>
      <CustomText>
        Scafold a production ready project with Next.js, NestJs, TailwindCSS,
        Shadcn, Radix UI, and more.
      </CustomText>
      <div className="flex mt-4 gap-2">
        <CustomLink>
          <Link href={BROWSER_ROUTES.REGISTER}>Register</Link>
        </CustomLink>
      </div>
    </main>
  );
}
