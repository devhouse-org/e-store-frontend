export interface Product {
  id: string;
  name: string;
  image_1920: string;
  list_price: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  offset: number;
  limit: number;
}
