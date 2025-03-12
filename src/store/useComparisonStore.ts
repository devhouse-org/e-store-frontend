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

// Load comparison items from localStorage
const loadFromStorage = (): Product[] => {
  try {
    const items = localStorage.getItem('comparisonItems');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error loading comparison items from storage:', error);
    return [];
  }
};

// Save comparison items to localStorage
const saveToStorage = (items: Product[]) => {
  try {
    localStorage.setItem('comparisonItems', JSON.stringify(items));
  } catch (error) {
    console.error('Error saving comparison items to storage:', error);
  }
};

export const useComparisonStore = create<ComparisonStore>((set, get) => ({
  comparisonItems: loadFromStorage(),

  initializeFromStorage: () => {
    const items = loadFromStorage();
    set({ comparisonItems: items });
  },

  addToComparison: (product) => {
    const currentItems = loadFromStorage();

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
    const currentItems = loadFromStorage();
    const updatedItems = currentItems.filter((item) => item.id !== productId);
    saveToStorage(updatedItems);
    set({ comparisonItems: updatedItems });
  },

  isCompared: (productId) => {
    const currentItems = loadFromStorage();
    return currentItems.some((item) => item.id === productId);
  },

  clearComparison: () => {
    localStorage.removeItem('comparisonItems');
    set({ comparisonItems: [] });
  },
}));
