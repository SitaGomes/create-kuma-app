import { QuaggaJSResultObject } from '@ericblade/quagga2';
import { Camera } from './camera';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui';

type CameraDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleGetProduct: (result: QuaggaJSResultObject) => void;
  title: string;
  children: React.ReactNode;
};

export const CameraDialog = ({
  open,
  onOpenChange,
  handleGetProduct,
  children,
  title,
}: CameraDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full lg:max-w-3xl">
        <DialogTitle>{title}</DialogTitle>
        <Camera
          onDetected={handleGetProduct}
          isDialogOpen={open}
          checkProduct
        />
      </DialogContent>
    </Dialog>
  );
};
