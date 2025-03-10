import { create } from "zustand";
import { Product } from "@/utils/data/products";

interface WishlistStore {
  wishlist: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [],
  wishlistCount: 0,
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
    }
  },
  removeFromWishlist: (productId) => {
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== productId),
      wishlistCount: state.wishlistCount - 1,
    }));
  },
  isWishlisted: (productId) => {
    const { wishlist } = get();
    return wishlist.some((item) => item.id === productId);
  },
}));
