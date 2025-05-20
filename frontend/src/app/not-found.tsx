import { ROUTES } from '@/constants';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Opps...!</h1>
      <h2 className="text-2xl mb-4">Pagina não foi encontrada</h2>
      <p className="mb-4">
        A pagina que você está procurando não existe ou foi removida.
      </p>
      <Link
        href={ROUTES.HOME}
        className="text-blue-500 hover:text-blue-700 underline"
      >
        volte para area segura.
      </Link>
    </div>
  );
}
