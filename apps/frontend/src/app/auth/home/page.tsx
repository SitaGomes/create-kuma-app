'use client';

import { useState, useEffect } from 'react';
import { Heading, CustomText } from '@kuma/ui/components';
import AuthApi from '~/src/api/auth.api';
import { notify } from '~/src/utils';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const getUserData = async () => {
      const data = await AuthApi.getUser();
      setUserData(data);
      setIsLoading(false);
    };

    try {
      getUserData();
    } catch (error) {
      notify('Failed to fetch user data', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen p-8">
      <Heading as="h1" className="mb-6">
        Home Page
      </Heading>
      <div className=" rounded-lg shadow-md p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <CustomText>Carregando...</CustomText>
          </div>
        ) : (
          <>
            <Heading as="h2" size="lg" className="mb-4">
              Welcome, {userData.name}!
            </Heading>
            <CustomText>Your email: {userData.email}</CustomText>
          </>
        )}
      </div>
    </div>
  );
}
