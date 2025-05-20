'use client';

import { Button } from '@/components';
import { MEMBER_LEVEL, ROUTES } from '@/constants';
import { notify } from '@/lib';
import { getMemberLevelName } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import * as zod from 'zod';

const schema = zod.object({
  username: zod
    .string()
    .min(3, { message: 'Nome de usuário deve ter no mínimo 3 caracteres' }),
  email: zod.string().email({ message: 'Email inválido' }),
  password: zod
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  level: zod.enum(Object.keys(MEMBER_LEVEL) as [string, ...string[]]),
});

export type MemberForm = zod.infer<typeof schema>;

type MemberFormProps = {
  token: string;
  orgId: string;
};

export const AddMembersPage = ({ token, orgId }: MemberFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MemberForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data: MemberForm) => {
    setLoading(true);
    try {
      console.log(token, { ...data, orgId });
      notify({ message: 'Membro adicionado com sucesso!', type: 'success' });
      router.push(ROUTES.MEMBERS);
    } catch (error) {
      const e = error as Error;
      console.error(e);
      notify({ message: 'Erro ao atualizar produto', type: 'error' });
      return;
    } finally {
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className="w-full p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Adicinar novo membro</h1>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium mb-1">
          Nome
        </label>
        <input
          {...register('username')}
          type="text"
          className="border border-gray-300 rounded p-2"
          placeholder="Nome do membro"
        />
        {errors?.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium mb-1">
          Email
        </label>
        <input
          {...register('email')}
          type="text"
          className="border border-gray-300 rounded p-2"
          placeholder="Email do membro"
        />
        {errors?.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium mb-1">
          Palavra passe
        </label>
        <div className="flex items-center gap-2">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Palavra passe"
          />
          <Button onClick={toggleShowPassword} variant="ghost" type="button">
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </Button>
        </div>
        {errors?.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Nivel */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium mb-1">
          Nível
        </label>
        <select
          {...register('level')}
          className="border border-gray-300 rounded p-2"
        >
          {Object.keys(MEMBER_LEVEL).map((level) => (
            <option key={level} value={level}>
              {getMemberLevelName(level)}
            </option>
          ))}
        </select>
        {errors?.level && (
          <span className="text-red-500 text-sm">{errors.level.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <Button loading={loading} type="submit" loadingText="Carregando...">
        Adicionar membro
      </Button>
    </form>
  );
};
