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

      // Add a product ID to wishlist
      addToWishlist: (productId: string) => {
        // Convert to string to ensure type consistency
        const stringProductId = String(productId);
        const { wishlistIds } = get();

        // Check if the product is already in the wishlist
        if (!wishlistIds.includes(stringProductId)) {
          console.log("Adding product to wishlist:", stringProductId);
          set({ wishlistIds: [...wishlistIds, stringProductId] });
        } else {
          console.log("Product already in wishlist:", stringProductId);
        }
      },

      // Remove a product ID from wishlist
      removeFromWishlist: (productId: string) => {
        // Convert to string to ensure type consistency
        const stringProductId = String(productId);

        const { wishlistIds, selectedIds } = get();
        console.log("Store - removeFromWishlist called for:", stringProductId);
        console.log("Store - Current wishlist:", wishlistIds);

        // Create a new Set from the current selectedIds
        const newSelectedIds = new Set(Array.from(selectedIds));
        // Remove the product from selection if it's selected
        newSelectedIds.delete(stringProductId);

        // Remove the product from wishlist
        const newWishlistIds = wishlistIds.filter(
          (id) => id !== stringProductId
        );
        console.log("Store - New wishlist after removal:", newWishlistIds);

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
        console.log("Store - toggleSelectItem called for:", stringProductId);

        set((state) => {
          // Create a new Set from the current selectedIds
          const newSelectedIds = new Set(Array.from(state.selectedIds));

          // Check if the product is already selected
          const isCurrentlySelected = newSelectedIds.has(stringProductId);
          console.log(
            "Store - Product is currently selected:",
            isCurrentlySelected
          );

          // Toggle the selection
          if (isCurrentlySelected) {
            newSelectedIds.delete(stringProductId);
            console.log("Store - Removed from selection");
          } else {
            newSelectedIds.add(stringProductId);
            console.log("Store - Added to selection");
          }

          console.log("Store - New selection size:", newSelectedIds.size);
          console.log("Store - Selected IDs:", Array.from(newSelectedIds));

          // Return the updated state
          return { selectedIds: newSelectedIds };
        });
      },

      // Select all products in wishlist
      selectAll: () => {
        const { wishlistIds } = get();
        // Convert all IDs to strings for consistency
        const stringWishlistIds = wishlistIds.map(String);
        console.log("Selecting all products:", stringWishlistIds);
        set({ selectedIds: new Set(stringWishlistIds) });
      },

      // Clear all selections
      clearSelection: () => {
        console.log("Clearing all selections");
        set({ selectedIds: new Set() });
      },

      // Delete all selected items
      deleteSelectedItems: () => {
        const { wishlistIds, selectedIds } = get();

        // Convert selectedIds to array for easier processing
        const selectedArray = Array.from(selectedIds).map(String);

        console.log("Store - deleteSelectedItems called");
        console.log("Store - Selected items to delete:", selectedArray);
        console.log("Store - Current wishlist before deletion:", wishlistIds);

        // Filter out selected IDs from wishlist
        const newWishlistIds = wishlistIds.filter(
          (id) => !selectedArray.includes(String(id))
        );

        console.log("Store - New wishlist after deletion:", newWishlistIds);

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
        // Convert to string to ensure type consistency
        const stringProductId = String(productId);
        const selected = get().selectedIds.has(stringProductId);
        console.log(
          `Checking if product ${stringProductId} is selected:`,
          selected
        );
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
      name: "wishlist-storage", // localStorage key
      partialize: (state) => ({
        wishlistIds: state.wishlistIds,
        // We don't persist selectedIds as it's a temporary UI state
      }),
    }
  )
);
