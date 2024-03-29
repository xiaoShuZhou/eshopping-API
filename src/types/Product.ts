export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
}

export interface Category {
  createdAt: string;
  id: string;
}

export interface Filters {
  title?: string;
  category?: string;
}
export interface Query extends Filters {
  offset?: number;
  limit?: number;
  pid?: string;
}
