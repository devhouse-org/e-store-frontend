export interface Product {
  id: string;
  name: string;
  price: number;
  list_price?: number;
  image: string;
  image_1920?: string;
  categ_id?: number[];
  brand?: string;
  description?: string;
  description_sale?: string;
  ram?: string;
  cpu?: string;
  screen_size?: string;
  front_camera?: string;
  back_camera?: string;
  storage?: string;
  os?: string;
  product_variant_ids?: number[];
  attribute_line_ids?: number[];
  attributes?: {
    id: number;
    name: string;
    display_type: string;
    values: {
      id: number;
      name: string;
      price_extra: number;
    }[];
  }[];
}
