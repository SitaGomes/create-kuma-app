export type ReportProductSales = {
  product: {
    id: string;
    name: string;
    quantity: number;
  };
  count: number;
};

export type Report = {
  totalAmount: number;
  productOfMonth: string;
  productSales: ReportProductSales[];
  totalInStock: number;
  totalScanned: number;
  id: string;
  createdDate: string;
  updatedDate: string;
};
