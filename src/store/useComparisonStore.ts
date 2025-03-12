import { create } from "zustand";
import { Product } from "@/utils/data/products";

interface ComparisonStore {
  comparisonItems: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  isCompared: (productId: string) => boolean;
  clearComparison: () => void;
  initializeFromStorage: () => void;
}

// Load comparison item IDs from localStorage and return empty array if none found
const loadFromStorage = (): string[] => {
  try {
    const items = localStorage.getItem('comparisonItemIds');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error loading comparison item IDs from storage:', error);
    return [];
  }
};

// Save comparison item IDs to localStorage
const saveToStorage = (items: Product[]) => {
  try {
    const itemIds = items.map(item => item.id);
    localStorage.setItem('comparisonItemIds', JSON.stringify(itemIds));
  } catch (error) {
    console.error('Error saving comparison item IDs to storage:', error);
  }
};

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  comparisonItems: [],

  initializeFromStorage: () => {
    const itemIds = loadFromStorage();
    // Here we only set the IDs since we'll fetch the full product data when needed
    set({ comparisonItems: itemIds.map(id => ({ id })) as Product[] });
  },

  addToComparison: (product) => {
    const currentItems = get().comparisonItems;

    // Check if product is already in comparison
    if (currentItems.some((item) => item.id === product.id)) {
      return;
    }

    // Check if comparison list is full (max 4 items)
    if (currentItems.length >= 4) {
      return;
    }

    // Update both store and localStorage
    const updatedItems = [...currentItems, product];
    saveToStorage(updatedItems);
    set({ comparisonItems: updatedItems });
  },

  removeFromComparison: (productId) => {
    const currentItems = get().comparisonItems;
    const updatedItems = currentItems.filter((item) => item.id !== productId);
    saveToStorage(updatedItems);
    set({ comparisonItems: updatedItems });
  },

  isCompared: (productId) => {
    const itemIds = loadFromStorage();
    return itemIds.includes(productId);
  },

  clearComparison: () => {
    localStorage.removeItem('comparisonItemIds');
    set({ comparisonItems: [] });
  },
}));
