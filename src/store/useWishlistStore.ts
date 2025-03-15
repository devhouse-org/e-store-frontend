import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  // Store only the IDs in the state
  wishlistIds: string[];
  selectedIds: Set<string>;

  // Actions
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleSelectItem: (productId: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  deleteSelectedItems: () => void;

  // Selectors
  isWishlisted: (productId: string) => boolean;
  isSelected: (productId: string) => boolean;
  getWishlistCount: () => number;
  getSelectedCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistIds: [],
      selectedIds: new Set<string>(),

      addToWishlist: (productId: string) => {
        const stringProductId = String(productId);
        const { wishlistIds } = get();

        if (!wishlistIds.includes(stringProductId)) {
          set({ wishlistIds: [...wishlistIds, stringProductId] });
        }
      },

      removeFromWishlist: (productId: string) => {
        const stringProductId = String(productId);

        const { wishlistIds, selectedIds } = get();

        // Create a new Set from the current selectedIds
        const newSelectedIds = new Set(Array.from(selectedIds));
        // Remove the product from selection if it's selected
        newSelectedIds.delete(stringProductId);

        // Remove the product from wishlist
        const newWishlistIds = wishlistIds.filter(
          (id) => id !== stringProductId
        );

        // Update state
        set({
          wishlistIds: newWishlistIds,
          selectedIds: newSelectedIds,
        });
      },

      // Toggle selection of a product
      toggleSelectItem: (productId: string) => {
        // Convert to string to ensure type consistency
        const stringProductId = String(productId);

        set((state) => {
          // Create a new Set from the current selectedIds
          const newSelectedIds = new Set(Array.from(state.selectedIds));

          // Check if the product is already selected
          const isCurrentlySelected = newSelectedIds.has(stringProductId);

          // Toggle the selection
          if (isCurrentlySelected) {
            newSelectedIds.delete(stringProductId);
          } else {
            newSelectedIds.add(stringProductId);
          }

          // Return the updated state
          return { selectedIds: newSelectedIds };
        });
      },

      // Select all products in wishlist
      selectAll: () => {
        const { wishlistIds } = get();
        const stringWishlistIds = wishlistIds.map(String);
        set({ selectedIds: new Set(stringWishlistIds) });
      },

      // Clear all selections
      clearSelection: () => {
        set({ selectedIds: new Set() });
      },

      // Delete all selected items
      deleteSelectedItems: () => {
        const { wishlistIds, selectedIds } = get();

        // Convert selectedIds to array for easier processing
        const selectedArray = Array.from(selectedIds).map(String);

        // Filter out selected IDs from wishlist
        const newWishlistIds = wishlistIds.filter(
          (id) => !selectedArray.includes(String(id))
        );

        // Update state
        set({
          wishlistIds: newWishlistIds,
          selectedIds: new Set(), // Clear selection after deletion
        });
      },

      // Check if a product is in wishlist
      isWishlisted: (productId: string) => {
        return get().wishlistIds.includes(productId);
      },

      // Check if a product is selected
      isSelected: (productId: string) => {
        const stringProductId = String(productId);
        const selected = get().selectedIds.has(stringProductId);
        return selected;
      },

      // Get wishlist count
      getWishlistCount: () => {
        return get().wishlistIds.length;
      },

      // Get selected items count
      getSelectedCount: () => {
        return get().selectedIds.size;
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        wishlistIds: state.wishlistIds,
      }),
    }
  )
);
