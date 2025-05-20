'use client';
import { ROUTES } from '@/constants';
import { mutateLoginUser } from '@/hooks';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as zod from 'zod';
import { useState } from 'react';
import { Button } from '@/components';
import { notify } from '@/lib';

const schema = zod.object({
  email: zod.string().email('Por favor, insira um email válido.'),
  password: zod.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

type LoginForm = zod.infer<typeof schema>;

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleLogin = handleSubmit(async (data: LoginForm) => {
    setLoading(true);
    try {
      const result = await mutateLoginUser(data.email, data.password);

      if (result?.error) {
        notify({
          message: 'Email ou senha inválidos.',
          type: 'error',
        });
      } else {
        notify({
          message: 'Login efetuado com sucesso.',
          type: 'success',
        });
        router.push(ROUTES.HOME);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <h1 className="font-bold text-xl lg:text-2xl text-center">Login</h1>

      <form onSubmit={handleLogin} className="space-y-6 w-full">
        <div className="flex flex-col items-start w-full">
          <label htmlFor="email" className="text-secondaryColor">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="p-2 bg-transparent border-2 border-gray-300 rounded-md w-full"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col items-start w-full">
          <label htmlFor="password" className="text-secondaryColor">
            Senha
          </label>
          <input
            id="password"
            type="password"
            className="p-2 bg-transparent border-2 border-gray-300 rounded-md w-full"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          loadingText="Acessando..."
        >
          Acessar
        </Button>
      </form>
    </>
  );
}
