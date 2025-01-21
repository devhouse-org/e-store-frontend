export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  brand: string;
  // Add any other fields you need
}

export const products: Product[] = [
  {
    id: "1",
    name: "ريلمي 9 آي - اسود",
    price: 165000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Realme",
    description: "هاتف ريلمي 9 آي بمواصفات رائعة وسعر مناسب",
  },
  {
    id: "2",
    name: "سامسونج جالاكسي A13",
    price: 120000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Samsung",
    description: "هاتف سامسونج A13 بمواصفات متميزة",
  },
  {
    id: "3",
    name: "شاومي نوت 11 برو",
    price: 180000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Xiaomi",
    description: "هاتف شاومي نوت 11 برو بمواصفات عالية",
  },
  {
    id: "4",
    name: "ايفون 13 برو ماكس",
    price: 900000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Apple",
    description: "هاتف ايفون 13 برو ماكس الرائد",
  },
  {
    id: "5",
    name: "هواوي P50 بوكيت",
    price: 780000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Huawei",
    description: "هاتف هواوي P50 بوكيت المتميز",
  },
  {
    id: "6",
    name: "نوكيا XR20",
    price: 135000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Nokia",
    description: "هاتف نوكيا XR20 المتين",
  },
  {
    id: "7",
    name: "ريلمي C25Y",
    price: 95000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Realme",
    description: "هاتف ريلمي C25Y الاقتصادي",
  },
  {
    id: "8",
    name: "سامسونج M32",
    price: 160000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Samsung",
    description: "هاتف سامسونج M32 متوسط المدى",
  },
  {
    id: "9",
    name: "اوبو رينو 6",
    price: 195000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Oppo",
    description: "هاتف اوبو رينو 6 المتطور",
  },
  {
    id: "10",
    name: "فيفو Y21T",
    price: 112000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    category: "phones",
    brand: "Vivo",
    description: "هاتف فيفو Y21T الاقتصادي",
  },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

// Helper function to get products by brand
export const getProductsByBrand = (brand: string): Product[] => {
  return products.filter((product) => product.brand === brand);
};

// Get unique categories
export const getCategories = (): string[] => {
  return [...new Set(products.map((product) => product.category || ""))];
};

// Get unique brands
export const getBrands = (): string[] => {
  return [...new Set(products.map((product) => product.brand || ""))];
};
