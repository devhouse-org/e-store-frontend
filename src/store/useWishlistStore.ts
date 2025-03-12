import { create } from "zustand";
import { Product } from "@/utils/data/products";

interface WishlistStore {
  wishlist: Product[];
  wishlistCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

interface WishlistId {
  id: string;
}

// Get initial state from localStorage
const getInitialState = () => {
  const savedWishlists: WishlistId[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
  return {
    wishlist: savedWishlists.map(item => ({
      id: item.id,
    })) as Product[],
    wishlistCount: savedWishlists.length
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

      const savedWishlists: WishlistId[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
      savedWishlists.push({
        id: product.id.toString(),
      });
      localStorage.setItem('wishlists', JSON.stringify(savedWishlists));
    }
  },
  removeFromWishlist: (productId) => {
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== productId),
      wishlistCount: state.wishlistCount - 1,
    }));

    const savedWishlists: WishlistId[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
    const updatedWishlists = savedWishlists.filter(item => item.id !== productId);
    localStorage.setItem('wishlists', JSON.stringify(updatedWishlists));
  },
  isWishlisted: (productId) => {
    const savedWishlists: WishlistId[] = JSON.parse(localStorage.getItem('wishlists') || '[]');
    return savedWishlists.some(item => item.id === productId);
  },
}));
