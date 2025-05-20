import { ROUTES } from '@/constants';
import { redirect } from 'next/navigation';

export default function LandingPage() {
  redirect(ROUTES.LOGIN);
}
