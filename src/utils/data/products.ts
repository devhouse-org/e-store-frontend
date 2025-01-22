export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  brand: string;
  // New specifications
  ram: string;
  cpu: string;
  screenSize: string;
  frontCamera: string;
  backCamera: string;
  storage: string;
  os: string;
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
    ram: "4GB",
    cpu: "MediaTek Helio G35",
    screenSize: "6.5 inches",
    frontCamera: "8MP",
    backCamera: "13MP + 2MP + 2MP",
    storage: "64GB",
    os: "Android 11",
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
    ram: "4GB",
    cpu: "Exynos 850",
    screenSize: "6.6 inches",
    frontCamera: "8MP",
    backCamera: "50MP + 5MP + 2MP + 2MP",
    storage: "128GB",
    os: "Android 12",
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
    ram: "8GB",
    cpu: "MediaTek Dimensity 920",
    screenSize: "6.67 inches",
    frontCamera: "16MP",
    backCamera: "108MP + 8MP + 2MP",
    storage: "128GB",
    os: "Android 11, MIUI 12.5",
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
    ram: "6GB",
    cpu: "Apple A15 Bionic",
    screenSize: "6.7 inches",
    frontCamera: "12MP",
    backCamera: "12MP + 12MP + 12MP",
    storage: "256GB",
    os: "iOS 15",
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
    ram: "8GB",
    cpu: "Kirin 9000",
    screenSize: "6.8 inches",
    frontCamera: "13MP",
    backCamera: "50MP + 13MP + 12MP",
    storage: "256GB",
    os: "HarmonyOS 2",
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
    ram: "6GB",
    cpu: "Qualcomm Snapdragon 778G",
    screenSize: "6.67 inches",
    frontCamera: "16MP",
    backCamera: "48MP + 16MP + 5MP",
    storage: "128GB",
    os: "Android 11",
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
    ram: "4GB",
    cpu: "MediaTek Helio G35",
    screenSize: "6.5 inches",
    frontCamera: "8MP",
    backCamera: "13MP + 2MP + 2MP",
    storage: "64GB",
    os: "Android 11",
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
    ram: "6GB",
    cpu: "Exynos 1280",
    screenSize: "6.6 inches",
    frontCamera: "13MP",
    backCamera: "50MP + 12MP + 5MP",
    storage: "128GB",
    os: "Android 12",
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
    ram: "8GB",
    cpu: "MediaTek Dimensity 900",
    screenSize: "6.5 inches",
    frontCamera: "16MP",
    backCamera: "48MP + 2MP",
    storage: "128GB",
    os: "Android 11",
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
    ram: "8GB",
    cpu: "Qualcomm Snapdragon 778G",
    screenSize: "6.58 inches",
    frontCamera: "16MP",
    backCamera: "48MP + 2MP",
    storage: "128GB",
    os: "Android 11",
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
