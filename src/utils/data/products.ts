export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "ريلمي 9 آي - اسود",
    price: 165000,
    image:
      "https://images.unsplash.com/photo-1623593476267-c7e98d1fb572?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "هاتف ريلمي 9 آي بمواصفات رائعة وسعر مناسب",
  },
  {
    id: "2",
    name: "سامسونج جالاكسي A13",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1691449808001-bb8c157f0094?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "هاتف سامسونج A13 بمواصفات متميزة",
  },
  {
    id: "3",
    name: "شاومي نوت 11 برو",
    price: 180000,
    image:
      "https://images.unsplash.com/photo-1673718424091-5fb734062c05?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "هاتف شاومي نوت 11 برو بمواصفات عالية",
  },
  {
    id: "4",
    name: "ايفون 13 برو ماكس",
    price: 900000,
    image:
      "https://plus.unsplash.com/premium_photo-1680537094641-b5934cb72850?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "هاتف ايفون 13 برو ماكس الرائد",
  },
  {
    id: "5",
    name: "هواوي P50 بوكيت",
    price: 780000,
    image:
      "https://images.unsplash.com/photo-1555375771-14b2a63968a9?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "هاتف هواوي P50 بوكيت المتميز",
  },
  {
    id: "6",
    name: "نوكيا XR20",
    price: 135000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    description: "هاتف نوكيا XR20 المتين",
  },
  {
    id: "7",
    name: "ريلمي C25Y",
    price: 95000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    description: "هاتف ريلمي C25Y الاقتصادي",
  },
  {
    id: "8",
    name: "سامسونج M32",
    price: 160000,
    image:
      "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    description: "هاتف سامسونج M32 متوسط المدى",
  },
  {
    id: "9",
    name: "اوبو رينو 6",
    price: 195000,
    image: "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    description: "هاتف اوبو رينو 6 المتطور",
  },
  {
    id: "10",
    name: "فيفو Y21T",
    price: 112000,
    image: "https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw",
    description: "هاتف فيفو Y21T الاقتصادي",
  },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

