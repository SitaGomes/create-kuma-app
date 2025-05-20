import { ROUTES } from '@/constants';
import { redirect } from 'next/navigation';

export default function LandingPage() {
  fetch('https://readbarcode.onrender.com');
  redirect(ROUTES.LOGIN);
}
