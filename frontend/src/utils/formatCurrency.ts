export function formatCurrency(
  amount: number,
  currencyCode: string = 'AOZ',
  locale: string = 'pt-BR',
): string {
  if (typeof amount !== 'number') {
    return 'Invalid input';
  }

  try {
    return amount.toLocaleString(locale, {
      style: 'currency',
      currency: currencyCode,
    });
  } catch (error) {
    console.error('Error formatting currency:', error); // Log the error for debugging
    return 'Invalid input'; // Or handle the error more gracefully, perhaps with a default format
  }
}
