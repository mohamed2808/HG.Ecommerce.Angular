import { Product } from "./product";

export interface ProductState {
  items: Product[];
  loading: boolean;
  error?: string | null;
}