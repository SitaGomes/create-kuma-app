import {
  QuaggaJSResultObject,
  QuaggaJSResultObject_CodeResult,
} from '@ericblade/quagga2';

function getMedian(arr: number[]) {
  const newArr = [...arr];
  newArr.sort((a, b) => a - b);
  const half = Math.floor(newArr.length / 2);
  if (newArr.length % 2 === 1) {
    return newArr[half];
  }
  return (newArr[half - 1] + newArr[half]) / 2;
}

function getMedianOfCodeErrorsEAN_13(
  decodedCodes: QuaggaJSResultObject_CodeResult['decodedCodes'],
) {
  const errors = decodedCodes.flatMap((x) => x.error || 0);
  const medianOfErrors = getMedian(errors as number[]);
  return medianOfErrors;
}

function getMedianOfCodeErrorsCODE_128(
  decodedCodes: QuaggaJSResultObject_CodeResult['decodedCodes'],
) {
  const errors = decodedCodes.flatMap((x) => x.error || 0);
  const medianOfErrors = getMedian(errors as number[]);
  return medianOfErrors;
}

function getMedianOfCodeErrorsCODE_39() {
  return 0;
}

function getMedianOfCodeErrors(result: QuaggaJSResultObject) {
  if (!result) {
    return 1;
  }

  if (result.codeResult.format === 'ean_13') {
    return getMedianOfCodeErrorsEAN_13(result.codeResult.decodedCodes);
  }

  if (result.codeResult.format === 'code_128') {
    return getMedianOfCodeErrorsCODE_128(result.codeResult.decodedCodes);
  }

  if (result.codeResult.format === 'code_39') {
    return getMedianOfCodeErrorsCODE_39();
  }

  return 0;
}

export { getMedianOfCodeErrors };
