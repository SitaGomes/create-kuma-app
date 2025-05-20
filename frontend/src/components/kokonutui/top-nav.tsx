'use client';
import Image from 'next/image';

import { ThemeToggle } from '../theme-toggle';
import { LuBell } from 'react-icons/lu';
import Profile from './Profile/profile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Notifications from './notifications';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { onValue, ref, update } from 'firebase/database';
import { realtimeDB } from '@/lib';
import { AppNotification } from '@/types';

export default function TopNav() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const handleReadNotification = (id: string) => {
    const notificationRef = ref(
      realtimeDB,
      `orgs/${session?.user?.orgId}/users/${session?.user?.id}/notifications/${id}`,
    );
    update(notificationRef, { read: true });
  };

  useEffect(
    function getNotifications() {
      const notificationsRef = ref(
        realtimeDB,
        `orgs/${session?.user?.orgId}/users/${session?.user?.id}/notifications`,
      );

      const unsubscribe = onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val() as Record<string, AppNotification> | null;
        if (data) {
          const notifList = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...(value as Omit<AppNotification, 'id'>),
          }));
          setNotifications(notifList);
        } else {
          setNotifications([]);
        }
      });

      return () => unsubscribe();
    },
    [session],
  );

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]"></div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <Popover>
          <PopoverTrigger className="relative p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors">
            <LuBell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
            {notifications.filter((notifi) => !notifi.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.filter((notifi) => !notifi.read).length}
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent>
            <Notifications
              notifications={notifications}
              readNotification={handleReadNotification}
            />
          </PopoverContent>
        </Popover>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <Profile />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
