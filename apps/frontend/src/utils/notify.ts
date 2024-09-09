import { toast } from 'react-toastify';

type NotifyType = 'success' | 'error' | 'warn' | 'info';

export function notify(message: string, type: NotifyType = 'success') {
  return toast[type](message);
}
