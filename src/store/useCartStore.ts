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
  products: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isInCart: (productId: string) => boolean;
  getProductQuantity: (productId: string) => number;
  lastAction: 'add' | 'remove' | 'update' | null;
}

// Get initial state from localStorage
const getInitialState = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    const { products } = JSON.parse(savedCart);
    return { products };
  }
  return { products: [] };
};

export const useCartStore = create<CartStore>((set, get) => ({
  ...getInitialState(),
  lastAction: null,

  isInCart: (productId) => {
    return get().products.some(p => p.id === productId);
  },

  getProductQuantity: (productId) => {
    return get().products.find(p => p.id === productId)?.quantity || 0;
  },

  addToCart: (product) => {
    set((state) => {
      // Check if product already exists
      const existingProduct = state.products.find(p => p.id === product.id);
      
      let newProducts;
      if (existingProduct) {
        // If exists, update quantity
        newProducts = state.products.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      } else {
        // If new, add to cart
        newProducts = [...state.products, { ...product, quantity: 1 }];
      }

      const newState = {
        products: newProducts,
        lastAction: 'add' as const
      };
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        products: newState.products
      }));
      
      return newState;
    });
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newState = {
        products: state.products.filter((p) => p.id !== productId),
        lastAction: 'remove' as const
      };
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        products: newState.products
      }));
      
      return newState;
    });
  },
  updateQuantity: (productId, quantity) => {
    set((state) => {
      // If quantity is 0, remove the product
      if (quantity <= 0) {
        get().removeFromCart(productId);
        return {
          ...state,
          lastAction: 'remove' as const
        };
      }

      const newState = {
        products: state.products.map((p) =>
          p.id === productId ? { ...p, quantity } : p
        ),
        lastAction: 'update' as const
      };
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        products: newState.products
      }));
      
      return newState;
    });
  },
}));
