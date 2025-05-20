'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaStar, FaDollarSign, FaBox, FaBarcode } from 'react-icons/fa';

import { formatCurrency, getReportDate } from '@/utils';
import { ROUTES } from '@/constants';

import { ProductSalesChart } from './charts/product-sales';

type Report = {
  id: string;
  productOfMonth: string;
  totalAmount: number;
  totalInStock: number;
  totalScanned: number;
};

type HomePageProps = {
  report: Report[];
};

export const HomePage = ({ report }: HomePageProps) => {
  const [selectedReportId, setSelectedReportId] = useState(report[0]?.id || '');

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedReportId(e.target.value);
  };

  const selectedReport = report.find((r) => r.id === selectedReportId);

  return (
    <div className="flex-grow flex flex-col gap-3">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>

      <div>
        <label
          htmlFor="report-date"
          className="block text-sm font-medium text-gray-700"
        >
          Selecione a data:
        </label>
        <select
          id="report-date"
          value={selectedReportId}
          onChange={handleDateChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {report.map((r, index) => (
            <option key={index} value={r.id}>
              {getReportDate(r.id)}
            </option>
          ))}
        </select>
      </div>

      {/* Metric Cards */}
      {selectedReport ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Link
              href={ROUTES.LIST_PRODUCTS}
              className="flex items-center p-4 border rounded cursor-pointer"
            >
              <FaStar size={40} className="mr-4" />
              <div>
                <div className="text-sm text-gray-500">Produto do mês</div>
                <div className="text-xl font-bold">
                  {selectedReport.productOfMonth}
                </div>
              </div>
            </Link>

            <Link
              href={ROUTES.HISTORY}
              className="flex items-center p-4 border rounded cursor-pointer"
            >
              <FaDollarSign size={40} className="mr-4" />
              <div>
                <div className="text-sm text-gray-500">Total vendido</div>
                <div className="text-xl font-bold">
                  {formatCurrency(selectedReport.totalAmount)}
                </div>
              </div>
            </Link>

            <Link
              href={ROUTES.LIST_PRODUCTS}
              className="flex items-center p-4 border rounded cursor-pointer"
            >
              <FaBox size={40} className="mr-4" />
              <div>
                <div className="text-sm text-gray-500">Produtos em stock</div>
                <div className="text-xl font-bold">
                  {selectedReport.totalInStock}
                </div>
              </div>
            </Link>

            <Link
              href={ROUTES.LIST_PRODUCTS}
              className="flex items-center p-4 border rounded cursor-pointer"
            >
              <FaBarcode size={40} className="mr-4" />
              <div>
                <div className="text-sm text-gray-500">Produtos scaneado</div>
                <div className="text-xl font-bold">
                  {selectedReport.totalScanned}
                </div>
              </div>
            </Link>
          </div>

          <ProductSalesChart data={[]} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Sem dados para mostrar</p>
        </div>
      )}
    </div>
  );
};
