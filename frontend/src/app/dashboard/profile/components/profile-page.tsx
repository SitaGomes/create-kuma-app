'use client';

import { User } from '@/types';

type ProfilePageProps = {
  user: User;
};

export const ProfilePage = ({ user }: ProfilePageProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Perfil</h1>
      <p>
        {user.username} - {user.email}
      </p>
    </div>
  );
};
