import { useEffect, useState } from 'react';
import Quagga from '@ericblade/quagga2';

export function useCameraSetup() {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [cameraError, setCameraError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    async function enableCamera() {
      try {
        // 1) Request camera (this triggers permission prompt on Android)
        await Quagga.CameraAccess.request(null, {});
        // 2) Immediately release it (so that it’s free for our scanner later)
        await Quagga.CameraAccess.release();
        // 3) Enumerate cameras
        const devices = await Quagga.CameraAccess.enumerateVideoDevices();
        if (isMounted) {
          setCameras(devices);
        }
        // 4) Disable torch if previously on
        Quagga.CameraAccess.disableTorch();
      } catch (err) {
        const e = err as Error;
        if (isMounted) {
          setCameraError(
            e?.message || 'Failed to initialize or list camera devices.',
          );
        }
      }
    }

    enableCamera();

    return () => {
      isMounted = false;
      Quagga.CameraAccess.release().catch((err) => {
        console.error('Failed to release camera:', err);
      });
    };
  }, []);

  return { cameras, cameraError };
}
