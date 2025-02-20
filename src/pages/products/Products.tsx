import { useEffect, useState } from "react";
import { products, getBrands } from "@/utils/data/products";
import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import {
  LucideCircleDashed,
  LucideCreditCard,
  LucideShoppingCart,
  Plus,
  Minus,
  Menu,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";
import axiosInstance from "@/utils/axiosInstance";

interface Category {
  id: number;
  name: string;
  parent_id: false | [number, string];
  child_id: number[];
  children: Category[];
}

const Products = () => {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const brands = getBrands();
  const {
    addToCart,
    products: cartProducts,
    updateQuantity,
    removeFromCart,
  } = useCartStore();
  const { addToComparison, removeFromComparison, isCompared } =
    useComparisonStore();
  const [prods, setProds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const fetchProducts = async (
    currentUid: number,
    currentOffset: number,
    domain: any[] = []
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/products", {
        currentUid,
        currentOffset,
        domain,
      });

      const data = response.data;
      setProds(data);
      console.log("Fetched Products:", data);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.post("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(0, 0, []);
  }, []);

  const filteredProducts =
    selectedBrand === "all"
      ? products
      : products.filter((product) => product.brand === selectedBrand);

  const handleAddToCart = (product: any) => {
    const cartItem = cartProducts.find((item) => item.id === product.id);
    if (!cartItem) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        storage: product.storage,
      });
    }
  };

  const handleBuyNow = (product: any) => {
    handleAddToCart(product);
    navigate("/cart");
  };

  const handleComparisonClick = (product: any) => {
    const isInComparison = isCompared(product.id);
    if (isInComparison) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  const handleUpdateQuantity = (product: any, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const scrollCategories = (direction: 'left' | 'right', elementClass: string) => {
    const container = document.querySelector(`.${elementClass}`);
    if (container) {
      const scrollAmount = 200; // Adjust this value to control scroll distance
      container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  // Get subcategories for selected category
  const getSubcategories = () => {
    if (!selectedCategory) return [];
    const category = categories.find(cat => cat.id === selectedCategory);
    return category?.children || [];
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-gray-500 font-tajawal-medium">
            جاري تحميل المنتجات...
          </p>
        </div>
      </div>
    );
  }

  if (prods.length === 0 && !loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 font-tajawal-medium text-lg">
            لا توجد منتجات متوفرة
          </p>
          <Button
            onClick={() =>
              fetchProducts(Number(localStorage.getItem("session_id")), 0, [])
            }
            className="mt-4"
            variant="outline"
            label="إعادة المحاولة"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col lg:flex-row">
      {/* Mobile Filter Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        Icon={Menu as IconType}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-30 bg-orange-500 text-white hover:bg-orange-600 rounded-full w-12 h-12 shadow-lg"
      />

      {/* Filter sidebar */}
      <div
        className={`
          fixed lg:sticky lg:top-[72px] top-[100px] right-0 z-30 w-[280px] bg-white 
          transform transition-transform duration-300 ease-in-out h-[calc(100vh-72px)]
          overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
          lg:transform-none lg:transition-none
          border-l
        `}
      >
        <div className="h-full">
          <Filter />
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed top-[72px] inset-x-0 bottom-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 px-4 md:px-8 lg:px-12 pb-20 pt-4">
        {/* Title and Categories section */}
        <div className="title_and_filter pb-4 flex flex-col gap-4 mt-10">
          <div className="title w-full">
            <h1 className="font-tajawal-bold text-[18px] md:text-[22px] lg:text-[32px] mb-4">
              الفئات
            </h1>

            {/* Categories Carousel */}
            <div className="relative">
              <button
                onClick={() => scrollCategories('left', 'categories-scroll')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              >
                <ArrowLeft className="text-gray-600" size={20} />
              </button>

              <div className="categories-scroll flex gap-x-2 overflow-x-hidden scroll-smooth relative px-12">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`bg-white p-2 rounded-md text-black text-nowrap flex-shrink-0 cursor-pointer transition-colors
                      ${selectedCategory === category.id ? 'bg-orange-500 text-white' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollCategories('right', 'categories-scroll')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              >
                <ArrowRight className="text-gray-600" size={20} />
              </button>
            </div>

            {/* Subcategories Carousel */}
            <div className="relative mt-2">
              <button
                onClick={() => scrollCategories('left', 'subcategories-scroll')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              >
                <ArrowLeft className="text-gray-600" size={20} />
              </button>

              <div className="subcategories-scroll flex gap-x-2 overflow-x-hidden scroll-smooth relative px-12">
                {getSubcategories().map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="bg-white p-2 rounded-md text-black text-nowrap flex-shrink-0 cursor-pointer hover:bg-gray-50"
                  >
                    {subcategory.name}
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollCategories('right', 'subcategories-scroll')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              >
                <ArrowRight className="text-gray-600" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prods.products.map((product: any) => {
            const cartItem = cartProducts.find(
              (item) => item.id === product.id
            );

            return (
              <div
                key={product.id}
                className="relative flex flex-col rounded-xl bg-white bg-clip-border shadow-md h-full"
              >
                {/* Product image */}
                <div className="relative mx-4 p-1 mt-4 h-48 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border">
                  <img
                    src={`data:image/png;base64,${product.image_1920}`}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product content */}
                <div className="p-6 flex flex-col h-full">
                  <h5 className="mb-2 block text-lg font-tajawal-medium leading-snug tracking-normal antialiased">
                    {product.name}
                  </h5>

                  {/* Price and buttons */}
                  <div className="mt-auto pt-4">
                    <p className="mb-4 font-tajawal-bold text-orange-500 text-xl">
                      د.ع {product.list_price.toLocaleString()}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Cart controls */}
                      {cartItem ? (
                        <div className="flex items-center justify-center gap-2 px-2 bg-orange-100/25 rounded-md py-1 flex-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-black"
                            onClick={() =>
                              handleUpdateQuantity(
                                product,
                                cartItem.quantity + 1
                              )
                            }
                            Icon={Plus as IconType}
                          />
                          <span className="w-6 text-center font-tajawal-medium">
                            {cartItem.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-orange-500"
                            onClick={() =>
                              handleUpdateQuantity(
                                product,
                                cartItem.quantity - 1
                              )
                            }
                            Icon={Minus as IconType}
                          />
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                          className="flex-1 select-none rounded-lg bg-orange-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          <LucideShoppingCart className="mx-auto" />
                        </button>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleBuyNow(product);
                          }}
                          className="select-none rounded-lg bg-orange-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                          <LucideCreditCard />
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleComparisonClick(product);
                          }}
                          className={`select-none rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                          ${isCompared(product.id)
                              ? "bg-orange-500 shadow-blue-500/20 hover:shadow-blue-500/40"
                              : "bg-orange-200 shadow-orange-200/20 hover:shadow-orange-200/40"
                            }`}
                        >
                          <LucideCircleDashed />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pagination mt-20 mb-14">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Products;
