'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components';
import { MEMBER_LEVEL, ROUTES } from '@/constants';
import { notify } from '@/lib';
import { getMemberLevelName } from '@/utils';
import Link from 'next/link';
import { useState } from 'react';
import { LuPlus, LuTrash } from 'react-icons/lu';
import { User } from '@/types';

type MemberPageProps = {
  members: User[];
  token: string;
  authUser: { id: string; level: string };
};

export const MemberPage = ({ members, token, authUser }: MemberPageProps) => {
  const [openDeleteMemberDialog, setOpenDeleteMemberDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseDeleteMemberDialog = () => setOpenDeleteMemberDialog(false);

  const handleDeleteMember = async (id: string) => {
    setIsLoading(true);
    try {
      console.log(token, id);
      notify({ message: 'Membro deletado com sucesso', type: 'success' });
    } catch (error) {
      console.error('Error deleting member:', error);
      notify({ message: 'Erro ao deletar membro', type: 'error' });
    } finally {
      setIsLoading(false);
      handleCloseDeleteMemberDialog();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Membros</h1>

        <Link href={ROUTES.ADD_MEMBERS}>
          <Button>
            <LuPlus />
            Adicionar novo membro
          </Button>
        </Link>
      </div>

      {members.length > 0 ? (
        <ul className="flex flex-col gap-3 mt-4">
          {members
            .sort((a, b) => (b.id === authUser.id ? 1 : 0))
            .map((member) => (
              <li
                key={member.id}
                className="flex items-center justify-between p-4 rounded bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                    {member.username}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Email: {member.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Nível: {getMemberLevelName(member.level)}
                  </p>
                </div>
                <Dialog
                  open={openDeleteMemberDialog}
                  onOpenChange={setOpenDeleteMemberDialog}
                >
                  <DialogTrigger asChild>
                    {member.id === authUser.id ||
                    authUser.level !== MEMBER_LEVEL.ADMIN ? (
                      <div></div>
                    ) : (
                      <Button variant={'destructive'}>
                        <LuTrash color="red" />
                      </Button>
                    )}
                  </DialogTrigger>

                  <DialogContent>
                    <DialogTitle>Apagar usuário.</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja apagar este usuario?
                    </DialogDescription>
                    <DialogFooter>
                      <Button
                        className="btn btn-secondary"
                        onClick={handleCloseDeleteMemberDialog}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant={'destructive'}
                        onClick={() => handleDeleteMember(member.id)}
                        className="btn btn-danger"
                        loading={isLoading}
                        loadingText="Apagando..."
                      >
                        Apagar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </li>
            ))}
        </ul>
      ) : (
        <p>Nenhum membro encontrado</p>
      )}
    </div>
  );
};
