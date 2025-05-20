'use client';

import { APP_NOTIFICATION, ROUTES } from '@/constants';
import { AppNotification } from '@/types';
import { formatDate } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type NotificationsProps = {
  notifications: AppNotification[];
  readNotification: (id: string) => void;
};

export default function Notifications({
  notifications,
  readNotification,
}: NotificationsProps) {
  const router = useRouter();

  const handleReadNotification = (notification: AppNotification) => {
    readNotification(notification.id);

    switch (notification.type) {
      case APP_NOTIFICATION.CART_SOLD:
        router.push(ROUTES.HOME);
        break;
      default:
        break;
    }
  };

  return (
    <div className=" max-w-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Notificações
      </h2>
      {notifications.length ? (
        <ul className="space-y-3">
          {notifications
            .sort(
              (a, b) =>
                new Date(b.createdDate).getTime() -
                new Date(a.createdDate).getTime(),
            )
            .map((notif) => (
              <Link href={notif.action} key={notif.id} className="mb-2">
                <li
                  onClick={() => handleReadNotification(notif)}
                  key={notif.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:cursor-pointer hover:shadow-sm hover:shadow-slate-300 dark:hover:shadow-slate-600"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-bold text-gray-800 dark:text-gray-100">
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                        Novo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                    {formatDate(notif.createdDate)}
                  </p>
                </li>
              </Link>
            ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Nenhuma notificação</p>
      )}
    </div>
  );
}
