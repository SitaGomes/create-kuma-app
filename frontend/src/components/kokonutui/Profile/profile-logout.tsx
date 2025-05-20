'use client';

import { LuLogOut } from 'react-icons/lu';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';
import { useState } from 'react';
import { Button, TypographyP } from '@/components';
import { notify } from '@/lib';

export const ProfileLogout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logoutButton = async () => {
    setLoading(true);
    try {
      await signOut();
      notify({ message: 'Desconectado com sucesso!', type: 'success' });
      router.push(ROUTES.LOGIN);
    } catch (err) {
      console.error(err);
      notify({ message: 'Erro ao sair, tente novamente!', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={logoutButton}
      loading={loading}
      loadingText="Saindo..."
      className="w-full"
    >
      <div className="flex items-center gap-2">
        <LuLogOut className="w-4 h-4" />
        <TypographyP>Sair</TypographyP>
      </div>
    </Button>
  );
};
