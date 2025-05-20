import { APP_HISTORY } from '@/constants';
import { AppHistory } from '@/types';
import { formatCurrency, formatDate } from '@/utils';

type HistoryPageProps = {
  histories: AppHistory[];
};

export const HistoryPage = ({ histories }: HistoryPageProps) => {
  return (
    <div className="flex-grow flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-2">Historico</h1>

      {histories.map((history) => (
        <div
          key={history.id}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                {history.type === APP_HISTORY.SELL
                  ? 'Vendido por'
                  : 'Adicionado por'}{' '}
                {history.userName}
              </h2>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {formatDate(history.createdDate)}
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Numero de produtos: {history.products.length}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Total: <b>{formatCurrency(history.total)}</b>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
