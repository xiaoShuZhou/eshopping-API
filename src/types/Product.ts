export type Product = {
  id: string;
  name: string;
  category: string;
  variant: string;
  price: number;
};

export interface Filters {
  name?: string;
  category?: string;
  variant?: string;
}
export interface Query extends Filters {
  offset?: number;
  limit?: number;
  pid?: string;
}
