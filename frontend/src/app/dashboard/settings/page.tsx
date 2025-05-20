import { Layout } from '@/components';
import { authOptions } from '@/lib';
import { getServerSession } from 'next-auth';
import { SettingsPage } from './components/settings-page';
import { ROUTES } from '@/constants';
import { redirect } from 'next/navigation';

export default async function SettingsPageServer() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    redirect(ROUTES.LOGIN);
  }

  // const user = {
  //   username: session?.user.username || '',
  //   email: session?.user.email || '',
  //   id: session?.user.id || '',
  //   orgId: session?.user.orgId || '',
  //   level: session?.user.level || '',
  // };

  return (
    <Layout>
      <SettingsPage />
    </Layout>
  );
}
