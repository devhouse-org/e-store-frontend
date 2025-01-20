import { create } from "zustand";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  storage?: string;
}

interface CartStore {
  cartCount: number;
  products: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  products: [],
  addToCart: (product) =>
    set((state) => ({
      cartCount: state.cartCount + product.quantity,
      products: [...state.products, product],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
      cartCount:
        state.cartCount -
        (state.products.find((p) => p.id === productId)?.quantity || 0),
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
    })),
}));
