import { create } from "zustand";
import { Product } from "@/utils/data/products";

interface WishlistStore {
  wishlist: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

// Get initial state from localStorage
const getInitialState = () => {
  const savedIds: string[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
  return {
    wishlist: savedIds.map(id => ({ id })) as Product[],
    wishlistCount: savedIds.length
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
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== productId),
      wishlistCount: state.wishlistCount - 1,
    }));

    const savedIds: string[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
    const updatedIds = savedIds.filter(id => id !== productId);
    localStorage.setItem('wishlists', JSON.stringify(updatedIds));
  },
  isWishlisted: (productId) => {
    const savedIds: string[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
    return savedIds.includes(productId);
  },
}));
