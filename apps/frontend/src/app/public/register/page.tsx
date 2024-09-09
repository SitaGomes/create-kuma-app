'use client';

import { useForm } from 'react-hook-form';
import {
  Input,
  Button,
  CustomText,
  Heading,
  CustomLink,
} from '@kuma/ui/components';
import AuthApi from '~/src/api/auth.api';
import { notify } from '~/src/utils/notify';
import BROWSER_ROUTES from '~/src/constants/BROWSER_ROUTES';
import Link from 'next/link';

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await AuthApi.register(data.name, data.email, data.password);

      notify('Registration successful');
    } catch (err) {
      notify('Registration failed. Please try again.', 'error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md space-y-8 rounded-lg p-10 shadow-md">
        <div>
          <Heading as="h2" size="lg" className="text-center">
            Create your account
          </Heading>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Input
                {...register('name', { required: 'Name is required' })}
                id="name"
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <CustomText color="red" size="sm">
                  {errors.name.message}
                </CustomText>
              )}
            </div>
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
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
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
              Register
            </Button>
          </div>

          <div className="mt-4 text-center">
            <CustomText>
              Already have an account?
              <CustomLink>
                <Link href={BROWSER_ROUTES.LOGIN}>Login</Link>
              </CustomLink>
            </CustomText>
          </div>
        </form>
      </div>
    </div>
  );
}
