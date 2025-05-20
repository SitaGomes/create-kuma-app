'use client';

import { useLayoutEffect } from 'react';
import Quagga, {
  QuaggaJSCodeReader,
  QuaggaJSReaderConfig,
  QuaggaJSResultObject,
} from '@ericblade/quagga2';
import { getMedianOfCodeErrors } from '@/utils/error';
import { fetchAllProductsAsync } from '@/lib';
import { useSession } from 'next-auth/react';

/** Default constraints for camera feed */
const defaultConstraints: MediaTrackConstraints = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  aspectRatio: { ideal: 16 / 9 },
};

/** Default locator settings for Quagga */
const defaultLocatorSettings = {
  patchSize: 'large',
  halfSample: true,
  willReadFrequently: true,
};

/** Decoder config type */
type Decoder = (QuaggaJSReaderConfig | QuaggaJSCodeReader)[];

/** Props for the Scanner component */
type ScannerProps = {
  onDetected: (result: QuaggaJSResultObject) => void;
  scannerRef: React.RefObject<HTMLDivElement | null>;
  onScannerReady?: () => void;
  cameraId?: string;
  facingMode?: 'environment' | 'user';
  constraints?: MediaTrackConstraints;
  locator?: typeof defaultLocatorSettings;
  decoders?: Decoder;
  locate?: boolean;
  isOpen?: boolean;
  checkProduct?: boolean;
};

export default function Scanner({
  onDetected,
  scannerRef,
  onScannerReady,
  cameraId,
  facingMode,
  decoders,
  constraints = defaultConstraints,
  locator = defaultLocatorSettings,
  locate = true,
  isOpen = false,
  checkProduct = false,
}: ScannerProps) {
  const { data } = useSession();

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    let hasUnmounted = !isOpen;
    let hasDetected = false;

    /**
     * Callback: checks if the decoded result is accurate enough,
     * then calls `onDetected` **only once** if the error threshold is met.
     */
    const errorCheck = async (result: QuaggaJSResultObject) => {
      if (hasUnmounted) return; // Guard against unmounted state
      if (hasDetected) return;
      if (!onDetected) return;

      const err = getMedianOfCodeErrors(result);

      const products = await fetchAllProductsAsync(
        data?.user?.accessToken || '',
      );

      const product = products.find(
        (p) => p.barcode === result.codeResult?.code,
      );

      if (checkProduct ? product : err < 0.1) {
        hasDetected = true;
        onDetected(result);
        // Stop Quagga after detecting the first valid code
        Quagga.stop();
        Quagga.offProcessed(handleProcessed);
        Quagga.offDetected(errorCheck);
      }
    };

    /**
     * Callback: runs on every processed frame, drawing bounding boxes & codes
     * onto the overlay canvas for visual debugging.
     */
    const handleProcessed = (result: QuaggaJSResultObject) => {
      if (hasUnmounted) return; // Guard to avoid errors after unmount

      const drawingCtx = Quagga?.canvas?.ctx?.overlay as
        | CanvasRenderingContext2D
        | undefined;

      const drawingCanvas = Quagga?.canvas?.dom?.overlay as
        | HTMLCanvasElement
        | undefined;

      if (!drawingCtx || !drawingCanvas || !result) return;

      drawingCtx.font = '24px Arial';
      drawingCtx.fillStyle = 'green';

      // Clear previous drawings
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute('width') ?? '0', 10),
          parseInt(drawingCanvas.getAttribute('height') ?? '0', 10),
        );
        result.boxes
          .filter((box) => box !== result.box)
          .forEach((box) => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: 'purple',
              lineWidth: 2,
            });
          });
      }

      // Draw bounding box of the detected/recognized code
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: 'blue',
          lineWidth: 2,
        });
      }

      // Print the decoded code on the canvas
      if (result.codeResult?.code) {
        drawingCtx.fillText(result.codeResult.code, 10, 20);
      }
    };

    /**
     * Initializes Quagga and begins camera scanning.
     */
    const initializeScanner = async () => {
      // Let React commit once to avoid race conditions
      await new Promise((resolve) => requestAnimationFrame(resolve));
      if (hasUnmounted) return;

      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: scannerRef?.current ?? undefined,
            constraints: {
              ...constraints,
              ...(cameraId && { deviceId: cameraId }),
              ...(!cameraId && { facingMode }),
            },
            willReadFrequently: true,
          },
          locator,
          decoder: { readers: decoders ?? ['code_128_reader'] },
          locate,
        },
        async (err) => {
          if (err) {
            console.error('Error starting Quagga:', err);
            return;
          }
          // Attach the event callbacks
          Quagga.onProcessed(handleProcessed);
          Quagga.onDetected(errorCheck);

          // Start streaming
          if (scannerRef?.current && !hasUnmounted) {
            Quagga.start();
            if (onScannerReady && !hasUnmounted) {
              onScannerReady();
            }
          }
        },
      );
    };

    // Kick off the scanner initialization
    initializeScanner();

    // Cleanup on unmount (e.g. when dialog is closed)
    return () => {
      try {
        Quagga.offProcessed(handleProcessed);
        Quagga.offDetected(errorCheck);
        Quagga.stop();
        hasUnmounted = true;
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };
  }, [
    onDetected,
    onScannerReady,
    scannerRef,
    cameraId,
    facingMode,
    constraints,
    locator,
    decoders,
    locate,
    isOpen,
  ]);

  return null;
}
