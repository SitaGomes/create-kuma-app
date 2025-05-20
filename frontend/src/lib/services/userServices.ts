import { BASE_URL } from '@/lib';
import { User } from '@/types';

type UserAuthReturn = {
  status: number;
  token: string;
  user: User;
};

export const loginAsync = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = {
      status: response.status,
      ...(await response.json()),
    } as UserAuthReturn;

    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const registerAsync = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = {
      status: response.status,
      ...(await response.json()),
    } as UserAuthReturn;

    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
