import { Product } from "@/utils/data/products";
import { create } from "zustand";

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
  updateWishlistCount: () => void;
}

// Get initial state from localStorage
const getInitialState = () => {
  const savedIds: string[] = JSON.parse(
    localStorage.getItem("wishlists") || "[]"
  );
  return {
    wishlist: savedIds.map((id) => ({ id })) as Product[],
    wishlistCount: savedIds.length,
    selectedItems: new Set<string>(),
  };
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  ...getInitialState(),
  updateWishlistCount: () => {
    const savedIds: string[] = JSON.parse(
      localStorage.getItem("wishlists") || "[]"
    );
    set({ wishlistCount: savedIds.length });
  },
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

      const savedIds: string[] = JSON.parse(
        localStorage.getItem("wishlists") || "[]"
      );
      savedIds.push(product.id.toString());
      localStorage.setItem("wishlists", JSON.stringify(savedIds));
      get().updateWishlistCount();
    }
  },
  removeFromWishlist: (productId) => {
    const savedIds: string[] = JSON.parse(
      localStorage.getItem("wishlists") || "[]"
    );
    const index = savedIds.indexOf(productId.toString());

    if (index > -1) {
      savedIds.splice(index, 1);
      localStorage.setItem("wishlists", JSON.stringify(savedIds));
    }

    set((state) => {
      const newWishlist = state.wishlist.filter(
        (item) => item.id !== productId
      );
      const newSelectedItems = new Set(state.selectedItems);
      newSelectedItems.delete(productId);

      return {
        wishlist: newWishlist,
        wishlistCount: savedIds.length, // Use the updated savedIds length
        selectedItems: newSelectedItems,
      };
    });

    // Update the count after removal
    get().updateWishlistCount();
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
    selectedItems.forEach((productId) => {
      get().removeFromWishlist(productId);
    });
    set({ selectedItems: new Set() });
    // Update the count after bulk deletion
    get().updateWishlistCount();
  },
  isWishlisted: (productId) => {
    const savedIds: string[] = JSON.parse(
      localStorage.getItem("wishlists") || "[]"
    );
    return savedIds.includes(productId.toString());
  },
  isSelected: (productId) => {
    return get().selectedItems.has(productId);
  },
}));
