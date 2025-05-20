import { MEMBER_LEVEL, ROUTES } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { LuMoveUpRight, LuSettings } from 'react-icons/lu';
import { ProfileLogout } from './profile-logout';
import { useSession } from 'next-auth/react';

interface MenuItem {
  label: string;
  value?: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export default function Profile() {
  const { data: session } = useSession();

  if (!session || !session?.user) {
    return <></>;
  }

  const {
    email: userEmail,
    username: userName,
    level: userLevel,
  } = session.user;

  const menuItems: MenuItem[] = [
    {
      label: 'Perfil',
      href: ROUTES.PROFILE,
      icon: <LuSettings className="w-4 h-4" />,
      external: false,
    },
  ];

  const getUserLevel = (level: string) => {
    switch (level as keyof typeof MEMBER_LEVEL) {
      case 'ADMIN':
        return 'Administrador';
      case 'REGISTER':
        return 'Registrador';
      case 'SELLER':
        return 'Vendedor';
      default:
        return '-';
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <div className="relative px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative shrink-0">
              <Image
                src={
                  'https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png'
                }
                alt={userEmail || "User's avatar"}
                width={72}
                height={72}
                className="rounded-full ring-4 ring-white dark:ring-zinc-900 object-cover"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                {userName}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 truncate">
                {userEmail}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 truncate">
                {getUserLevel(userLevel || '')}
              </p>
            </div>
          </div>
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-6" />
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center">
                  {item.value && (
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mr-2">
                      {item.value}
                    </span>
                  )}
                  {item.external && <LuMoveUpRight className="w-4 h-4" />}
                </div>
              </Link>
            ))}

            <ProfileLogout />
          </div>
        </div>
      </div>
    </div>
  );
}
