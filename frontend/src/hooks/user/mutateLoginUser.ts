import { signIn } from 'next-auth/react';

export const mutateLoginUser = async (email: string, password: string) => {
  const loginUser = async () => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };

  return loginUser();
};
