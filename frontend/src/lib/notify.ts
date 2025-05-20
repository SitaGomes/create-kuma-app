import { toast } from 'react-toastify';
import { ToastContainer as NotifyContainer } from 'react-toastify';

type NotifyType = 'success' | 'error' | 'warn' | 'info';
type NotifyProps = {
  message: string;
  type: NotifyType;
};

function notify({ message, type }: NotifyProps) {
  return toast[type](message);
}

export { notify, NotifyContainer };
