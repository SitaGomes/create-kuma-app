'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  CustomText,
  Heading,
  CustomLink,
} from '@kuma/ui/components';
import AuthApi from '~/src/api/auth.api';
import BROWSER_ROUTES from '~/src/constants/BROWSER_ROUTES';
import { notify } from '~/src/utils/notify';
import Link from 'next/link';

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await AuthApi.login(data.email, data.password);
      notify('Login successful');
      router.push(BROWSER_ROUTES.HOME);
    } catch (err) {
      notify('Login failed', 'error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md space-y-8 rounded-lg p-10 shadow-md">
        <div>
          <Heading as="h2" size="lg" className="text-center">
            Log in to your account
          </Heading>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
                id="email"
                type="email"
                placeholder="Email address"
              />
              {errors.email && (
                <CustomText color="red" size="sm">
                  {errors.email.message}
                </CustomText>
              )}
            </div>
            <div>
              <Input
                {...register('password', { required: 'Password is required' })}
                id="password"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <CustomText color="red" size="sm">
                  {errors.password.message}
                </CustomText>
              )}
            </div>
          </div>

          <div>
            <Button type="submit" variant="outline" className="w-full p-2">
              Log in
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <CustomText>
            Don't have an account?{' '}
            <CustomLink>
              <Link href={BROWSER_ROUTES.REGISTER}>Sign up</Link>
            </CustomLink>
          </CustomText>
        </div>
      </div>
    </div>
  );
}
