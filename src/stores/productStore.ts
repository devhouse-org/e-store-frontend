import { create } from "zustand";

interface Product {
  id: number | string;
  name: string;
  description: string;
  price: string;
  quantity: number;
  image: string;
}

interface ProductState {
  products: Product[];
  updateQuantity: (productId: number | string, change: number) => void;
  removeProduct: (productId: number | string) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [
    {
      id: 1,
      name: "بلي ستيشن 5 اوربن 2",
      description: "ابيض - 825 غ ب",
      price: "500,000 د.ع",
      quantity: 1,
      image:
        "https://www.albadeel.com.ly/wp-content/uploads/2023/12/sony-playstation-5-slim-console-disc-edition-2.png",
    },
    {
      id: 2,
      name: "امازون ايكو دوت جيل الرابع",
      description: "ازرق",
      price: "75,000 د.ع",
      quantity: 2,
      image:
        "https://cdn.salla.sa/lvble/CWfzTsJm0akaqFuTOac8R7xgaRApnKD9HHr0GCmM.jpg",
    },
    {
      id: 3,
      name: "سماعات سوني ام 5",
      description: "أسود",
      price: "90,000 د.ع",
      quantity: 1,
      image:
        "https://www.albadeel.com.ly/wp-content/uploads/2023/12/sony-playstation-5-slim-console-disc-edition-2.png",
    },
  ],
  updateQuantity: (productId, change) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity + change) }
          : product
      ),
    })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
}));

export default useProductStore;
