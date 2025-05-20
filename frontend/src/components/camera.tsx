'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Scanner from './scanner';
import Quagga, { QuaggaJSResultObject } from '@ericblade/quagga2';

type CameraProps = {
  onDetected: (result: QuaggaJSResultObject) => void;
  isDialogOpen?: boolean;
  checkProduct?: boolean;
};

export const Camera = ({
  onDetected,
  isDialogOpen,
  checkProduct = false,
}: CameraProps) => {
  const scannerRef = useRef<HTMLDivElement>(null);

  const [cameraError, setCameraError] = useState('');
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [cameraId, setCameraId] = useState('');
  const [scanning, setScanning] = useState(false);
  const [torchOn, setTorch] = useState(false);

  const onTorchClick = useCallback(() => {
    const enable = !torchOn;
    setTorch(enable);
    if (enable) Quagga.CameraAccess.enableTorch();
    else Quagga.CameraAccess.disableTorch();
  }, [torchOn]);

  const handleDetected = useCallback(
    (result: QuaggaJSResultObject) => {
      onDetected(result);
    },
    [onDetected],
  );

  useEffect(() => {
    const initCameras = async () => {
      try {
        await Quagga.CameraAccess.request(null, {});
        await Quagga.CameraAccess.release();
        const devices = await Quagga.CameraAccess.enumerateVideoDevices();
        setCameras(devices);
        Quagga.CameraAccess.disableTorch();
      } catch (err) {
        const e = err as Error;
        setCameraError(e?.message || 'Failed to initialize camera');
      }
    };
    initCameras();
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      {/* Camera Error */}
      {cameraError && (
        <p className="text-red-600 font-semibold mb-4 text-center">
          ERROR INITIALIZING CAMERA: {cameraError}
        </p>
      )}

      {/* Camera Selection */}
      {cameras.length === 0 ? (
        <p className="text-gray-700 mb-4">
          Enumerating Cameras... The browser might be prompting for permissions.
        </p>
      ) : (
        <form className="flex flex-col items-start mb-4">
          <label
            htmlFor="cameraSelect"
            className="mb-1 font-medium text-gray-700"
          >
            Select Camera:
          </label>
          <select
            id="cameraSelect"
            value={cameraId}
            onChange={(e) => setCameraId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="">-- Choose a camera --</option>
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || camera.deviceId}
              </option>
            ))}
          </select>
        </form>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={onTorchClick}
          className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
        >
          {torchOn ? 'Disable Torch' : 'Enable Torch'}
        </button>
        <button
          onClick={() => setScanning((prev) => !prev)}
          className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
        >
          {scanning ? 'Stop' : 'Start'}
        </button>
      </div>

      {/* Scanner Container (Quagga will create its own <video> and <canvas> here) */}
      <div
        ref={scannerRef}
        className="relative border-4 border-green-500 w-full max-w-xl h-96"
      >
        {scanning && (
          <Scanner
            scannerRef={scannerRef}
            cameraId={cameraId}
            onDetected={handleDetected}
            decoders={['ean_reader', 'code_39_reader', 'code_128_reader']}
            isOpen={isDialogOpen === undefined ? scanning : isDialogOpen}
            checkProduct={checkProduct}
          />
        )}
      </div>
    </div>
  );
};
