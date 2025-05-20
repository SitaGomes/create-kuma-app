import { registerAsync } from '@/lib';
import { signIn } from 'next-auth/react';

export const mutateRegisterUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const registerUser = async () => {
    try {
      const result = await registerAsync(username, email, password);

      if (result.status !== 200) {
        return { error: 'Error creating user' };
      }

      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  return registerUser();
};
