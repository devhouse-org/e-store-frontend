import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/utils/data/products";

interface SavedComparison {
  id: string;
  products: Product[];
  date: string;
}

interface SavedComparisonsStore {
  savedComparisons: SavedComparison[];
  saveComparison: (products: Product[]) => void;
  deleteComparison: (id: string) => void;
  clearAllComparisons: () => void;
}

export const useSavedComparisonsStore = create<SavedComparisonsStore>()(
  persist(
    (set, get) => ({
      savedComparisons: [],

      saveComparison: (products) => {
        if (products.length === 0) return;

        const newComparison: SavedComparison = {
          id: crypto.randomUUID(),
          products,
          date: new Date().toISOString(),
        };

        set((state) => ({
          savedComparisons: [newComparison, ...state.savedComparisons],
        }));
      },

      deleteComparison: (id) => {
        set((state) => ({
          savedComparisons: state.savedComparisons.filter(
            (comparison) => comparison.id !== id
          ),
        }));
      },

      clearAllComparisons: () => {
        set({ savedComparisons: [] });
      },
    }),
    {
      name: "saved-comparisons",
    }
  )
);
