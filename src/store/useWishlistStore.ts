import { create } from "zustand";
import { Product } from "@/utils/data/products";

interface WishlistStore {
  wishlist: Product[];
  wishlistCount: number;
  selectedItems: Set<string>;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleSelectItem: (productId: string) => void;
  clearSelection: () => void;
  deleteSelectedItems: () => void;
  isWishlisted: (productId: string) => boolean;
  isSelected: (productId: string) => boolean;
}

// Get initial state from localStorage
const getInitialState = () => {
  const savedIds: string[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
  return {
    wishlist: savedIds.map(id => ({ id })) as Product[],
    wishlistCount: savedIds.length,
    selectedItems: new Set<string>()
  };
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  ...getInitialState(),
  addToWishlist: (product) => {
    const { wishlist } = get();
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);

    if (!isAlreadyInWishlist) {
      set((state) => ({
        wishlist: [
          ...state.wishlist,
          { ...product, image: `data:image/png;base64,${product.image}` },
        ],
        wishlistCount: state.wishlistCount + 1,
      }));

      const savedIds: string[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
      savedIds.push(product.id.toString());
      localStorage.setItem('wishlists', JSON.stringify(savedIds));
    }
  },
  removeFromWishlist: (productId) => {
    const savedIds: string[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
    const index = savedIds.indexOf(productId.toString());
    
    if (index > -1) {
      savedIds.splice(index, 1);
      localStorage.setItem('wishlists', JSON.stringify(savedIds));
    }

    set((state) => {
      const newWishlist = state.wishlist.filter(item => item.id !== productId);
      const newSelectedItems = new Set(state.selectedItems);
      newSelectedItems.delete(productId);
      
      return {
        wishlist: newWishlist,
        wishlistCount: newWishlist.length,
        selectedItems: newSelectedItems
      };
    });
  },
  toggleSelectItem: (productId) => {
    set((state) => {
      const newSelectedItems = new Set(state.selectedItems);
      if (newSelectedItems.has(productId)) {
        newSelectedItems.delete(productId);
      } else {
        newSelectedItems.add(productId);
      }
      return { selectedItems: newSelectedItems };
    });
  },
  clearSelection: () => {
    set({ selectedItems: new Set() });
  },
  deleteSelectedItems: () => {
    const { selectedItems } = get();
    selectedItems.forEach(productId => {
      get().removeFromWishlist(productId);
    });
    set({ selectedItems: new Set() });
  },
  isWishlisted: (productId) => {
    const savedIds: string[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
    return savedIds.includes(productId.toString());
  },
  isSelected: (productId) => {
    return get().selectedItems.has(productId);
  }
}));
