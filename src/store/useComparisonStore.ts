import { create } from "zustand";
import { Product } from "@/utils/data/products";

interface ComparisonStore {
    comparisonItems: Product[];
    addToComparison: (product: Product) => void;
    removeFromComparison: (productId: string) => void;
    isCompared: (productId: string) => boolean;
    clearComparison: () => void;
}

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
    comparisonItems: [],

    addToComparison: (product) => {
        const { comparisonItems } = get();

        // Check if product is already in comparison
        if (comparisonItems.some(item => item.id === product.id)) {
            return;
        }

        // Check if comparison list is full (max 4 items)
        if (comparisonItems.length >= 4) {
            return;
        }

        set(state => ({
            comparisonItems: [...state.comparisonItems, product]
        }));
    },

    removeFromComparison: (productId) => {
        set(state => ({
            comparisonItems: state.comparisonItems.filter(item => item.id !== productId)
        }));
    },

    isCompared: (productId) => {
        const { comparisonItems } = get();
        return comparisonItems.some(item => item.id === productId);
    },

    clearComparison: () => {
        set({ comparisonItems: [] });
    }
})); 