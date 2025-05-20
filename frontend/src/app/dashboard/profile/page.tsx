import { Layout } from '@/components';
import { authOptions } from '@/lib';
import { getServerSession } from 'next-auth';
import { ROUTES } from '@/constants';
import { redirect } from 'next/navigation';
import { ProfilePage } from './components/profile-page';

export default async function ProfilePageServer() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    redirect(ROUTES.LOGIN);
  }

  const user = {
    username: session?.user.username || '',
    email: session?.user.email || '',
    id: session?.user.id || '',
    orgId: session?.user.orgId || '',
    level: session?.user.level || '',
  };

  return (
    <Layout>
      <ProfilePage user={user} />
    </Layout>
  );
}
