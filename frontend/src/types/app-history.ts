import { Product } from './product';

export type AppHistory = {
  userId: string;
  userName: string;
  products: Product[];
  total: number;
  type: string;
  id: string;
  createdDate: Date;
  updatedDate: Date;
};
