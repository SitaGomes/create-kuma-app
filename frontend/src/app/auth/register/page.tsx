'use client';
import { Button } from '@/components';
import { ROUTES } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import * as zod from 'zod';

const schema = zod
  .object({
    name: zod.string().min(3, 'Name must be at least 3 characters'),
    email: zod.string().email('Invalid email address'),
    password: zod.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: zod
      .string()
      .min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type LoginForm = zod.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

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

  const handleSingUp = async (data: LoginForm) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="font-bold text-xl lg:text-2xl text-center">
        Create an account
      </h1>

      <form onSubmit={handleSubmit(handleSingUp)} className="space-y-6">
        <div className="flex flex-col items-start w-full">
          <label htmlFor="email" className="text-secondaryColor">
            Username
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="p-2 bg-transparent border-2 border-gray-300 rounded-md w-full"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="email" className="text-secondaryColor">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="p-2 bg-transparent border-2 border-gray-300 rounded-md w-full"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="password" className="text-secondaryColor">
            Password
          </label>
          <div className="flex gap-4 w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              className="p-2 bg-transparent border-2 border-gray-300 rounded-md w-full"
            />

            <Button onClick={togglePassword} type="button">
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </Button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="confirmPassword" className="text-secondaryColor">
            Confirm password
          </label>
          <div className="flex gap-4 w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              {...register('confirmPassword')}
              className="p-2 bg-transparent border-2 border-gray-300 rounded-md w-full"
            />

            <Button onClick={togglePassword} type="button">
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button type="submit">Create account</Button>
        <p>
          Do you have an account?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="hover:underline hover:text-secondaryColor text-secondaryColor"
          >
            Login here
          </Link>
        </p>
      </form>
    </>
  );
}
