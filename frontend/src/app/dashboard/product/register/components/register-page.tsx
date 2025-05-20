'use client';
import { BarCodeScan } from '@/app/dashboard/components/barcode-scan';
import { ROUTES } from '@/constants';
import { QuaggaJSResultObject } from '@ericblade/quagga2';
import { useRouter } from 'next/navigation';

export const RegisterPage = () => {
  const router = useRouter();

  const onDetect = (result: QuaggaJSResultObject) =>
    router.push(`${ROUTES.REGISTER}/${result.codeResult.code}`);

  return <BarCodeScan onDetected={onDetect} title="Cadastrar Produto" />;
};
