import { useLoaderData } from '@remix-run/react';

interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

interface LoaderData {
  user: User | null;
}

export function useUser() {
  const { user } = useLoaderData<LoaderData>();
  return user;
}
