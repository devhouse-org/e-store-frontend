import { create } from "zustand";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  storage?: string;
  selected_attributes?: {
    attribute_id: number;
    value_id: number;
    attribute_name?: string;
    value_name?: string;
  }[];
}

interface CartStore {
  cartCount: number;
  products: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  lastAction: 'add' | 'remove' | 'update' | null;
}

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  products: [],
  lastAction: null,
  addToCart: (product) =>
    set((state) => ({
      cartCount: state.cartCount + product.quantity,
      products: [...state.products, product],
      lastAction: 'add'
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
      cartCount:
        state.cartCount -
        (state.products.find((p) => p.id === productId)?.quantity || 0),
      lastAction: 'remove'
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? { ...p, quantity } : p
      ),
      cartCount:
        state.cartCount +
        (quantity -
          (state.products.find((p) => p.id === productId)?.quantity || 0)),
      lastAction: 'update'
    })),
}));
