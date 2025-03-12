import { create } from "zustand";
import { Product } from "@/utils/data/products";

interface ComparisonStore {
  comparisonItems: Product[];
  categoryId: number | null;
  addToComparison: (product: Product, categoryId: number) => void;
  removeFromComparison: (productId: string) => void;
  isCompared: (productId: string) => boolean;
  clearComparison: () => void;
}

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  comparisonItems: [],
  categoryId: null,

  addToComparison: (product, categoryId) => {
    const { comparisonItems, categoryId: currentCategoryId } = get();

    // Check if product is already in comparison
    if (comparisonItems.some((item) => item.id === product.id)) {
      return;
    }

    // Check if comparison list is full (max 4 items)
    if (comparisonItems.length >= 4) {
      return;
    }

    // If this is the first item, set the category ID
    if (comparisonItems.length === 0) {
      set((state) => ({
        comparisonItems: [product],
        categoryId: categoryId
      }));
      return;
    }

    // If there are existing items, check category match
    if (currentCategoryId !== categoryId) {
      return;
    }

    set((state) => ({
      comparisonItems: [...state.comparisonItems, product],
    }));
  },

  removeFromComparison: (productId) => {
    set((state) => {
      const newItems = state.comparisonItems.filter(
        (item) => item.id !== productId
      );
      return {
        comparisonItems: newItems,
        // Reset categoryId if no items left
        categoryId: newItems.length === 0 ? null : state.categoryId
      };
    });
  },

  isCompared: (productId) => {
    const { comparisonItems } = get();
    return comparisonItems.some((item) => item.id === productId);
  },

  clearComparison: () => {
    set({ comparisonItems: [], categoryId: null });
  },
}));
