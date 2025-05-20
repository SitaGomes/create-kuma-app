'use client';
import { Camera } from '@/components';
import { QuaggaJSResultObject } from '@ericblade/quagga2';

type BarCodeScanProps = {
  onDetected: (result: QuaggaJSResultObject) => void;
  title: string;
};

export const BarCodeScan = ({ onDetected, title }: BarCodeScanProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Camera onDetected={onDetected} />
    </div>
  );
};
