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
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

interface Category {
  id: number;
  name: string;
  parent_id: false | [number, string];
  child_id: number[];
  children: Category[];
}

interface ProductsResponse {
  products: Array<{
    id: number;
    name: string;
    image_1920: string;
    list_price: number;
    description?: string;
  }>;
}

const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.post<Category[]>(
        "/products/categories"
      );
      return response.data;
    },
  });
};

const useProducts = (params: {
  currentUid: number;
  currentOffset: number;
  category_id?: number | null;
  variants?: { attribute_id: number; value_id: number }[];
}) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await axiosInstance.post<ProductsResponse>(
        "/products",
        params
      );
      return response.data;
    },
  });
};

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [prods, setProds] = useState<ProductsResponse>({ products: [] });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null
  );
  const [selectedVariants, setSelectedVariants] = useState<
    { attribute_id: number; value_id: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const { data: categoriesData = [], isLoading: categoriesLoading } =
    useCategories();

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts({
    currentUid: Number(localStorage.getItem("session_id")) || 0,
    currentOffset: 0,
    category_id: selectedSubcategory || selectedCategory,
    variants: selectedVariants,
  });

  // Function to check if URL has any filter parameters
  const hasUrlFilters = () => {
    return searchParams.has("category");
  };

  // Function to update URL with current filters
  const updateUrlParams = () => {
    const params = new URLSearchParams();

    // Add category and subcategory
    if (selectedCategory !== null) {
      const categoryParam =
        selectedSubcategory !== null
          ? `${selectedCategory}-${selectedSubcategory}`
          : `${selectedCategory}`;
      params.set("category", categoryParam);
    }

    setSearchParams(params);
  };

  // Function to parse URL params and set initial state
  const parseUrlParams = () => {
    // Parse category parameter
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const [catId, subCatId] = categoryParam.split("-").map(Number);
      setSelectedCategory(catId || null);
      setSelectedSubcategory(subCatId || null);
    } else {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }
  };

  // Initial load - fetch categories and handle URL params
  useEffect(() => {
    const initializeData = async () => {
      if (hasUrlFilters()) {
        parseUrlParams();
      }
    };
    initializeData();
  }, []); // Only run once on mount

  // Effect to update URL when category filters change
  useEffect(() => {
    if (!categoriesLoading) {
      // Only update URL after initial load
      if (selectedCategory === null) {
        // Clear URL if no category is active
        setSearchParams(new URLSearchParams());
      } else {
        updateUrlParams();
      }
    }
  }, [selectedCategory, selectedSubcategory]);

  // Effect to handle URL parameter changes
  useEffect(() => {
    if (!categoriesLoading && hasUrlFilters()) {
      parseUrlParams();
    }
  }, [searchParams]);

  const filteredProducts =
    selectedBrand === "all"
      ? products
      : products.filter((product) => product.brand === selectedBrand);

  const handleAddToCart = (product: any) => {
    const cartItem = cartProducts.find((item) => item.id === product.id);
    console.log(product);
    if (!cartItem) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.list_price,
        image: product.image_1920,
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

  const scrollCategories = (
    direction: "left" | "right",
    elementClass: string
  ) => {
    const container = document.querySelector(`.${elementClass}`);
    if (container) {
      const scrollAmount = 200; // Adjust this value to control scroll distance
      container.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  // Get subcategories for selected category
  const getSubcategories = () => {
    if (!selectedCategory) return [];
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category?.children || [];
  };

  // Update category click handler
  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setSelectedSubcategory(null);
    setSelectedVariants([]);
  };

  // Update subcategory click handler
  const handleSubcategoryClick = (subcategoryId: number) => {
    setSelectedSubcategory(
      subcategoryId === selectedSubcategory ? null : subcategoryId
    );
    setSelectedVariants([]);
  };

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
          <Filter
            selectedCategory={selectedCategory}
            onFilterChange={(variants) => setSelectedVariants(variants)}
            initialVariants={selectedVariants}
          />
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
        {/* Categories section */}
        <div className="mb-8">
          <h1 className="font-tajawal-bold text-2xl mb-6">الفئات</h1>

          {/* Categories */}
          {categoriesLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => scrollCategories("left", "categories-scroll")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              >
                <ArrowLeft className="text-gray-600" size={20} />
              </button>

              <div className="categories-scroll flex gap-3 overflow-x-hidden scroll-smooth relative px-12">
                {categoriesData?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`
                      px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap
                      ${
                        selectedCategory === category.id
                          ? "bg-orange-500 text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }
                    `}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollCategories("right", "categories-scroll")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              >
                <ArrowRight className="text-gray-600" size={20} />
              </button>
            </div>
          )}

          {/* Subcategories */}
          {!categoriesLoading &&
            selectedCategory &&
            getSubcategories().length > 0 && (
              <div className="mt-4 relative">
                <button
                  onClick={() =>
                    scrollCategories("left", "subcategories-scroll")
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                >
                  <ArrowLeft className="text-gray-600" size={20} />
                </button>

                <div className="subcategories-scroll flex gap-3 overflow-x-hidden scroll-smooth relative px-12">
                  {getSubcategories().map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategoryClick(subcategory.id)}
                      className={`
                      px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap
                      ${
                        selectedSubcategory === subcategory.id
                          ? "bg-orange-500 text-white shadow-md"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }
                    `}
                    >
                      {subcategory.name}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    scrollCategories("right", "subcategories-scroll")
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                >
                  <ArrowRight className="text-gray-600" size={20} />
                </button>
              </div>
            )}
        </div>

        {/* Products grid */}
        {productsLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
              <p className="text-gray-500 font-tajawal-medium">
                جاري تحميل المنتجات...
              </p>
            </div>
          </div>
        ) : productsError ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-500 font-tajawal-medium text-lg mb-4">
                {productsError.message}
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setSelectedVariants([]);
                }}
                className="bg-orange-500 text-white hover:bg-orange-600"
                label="إعادة المحاولة"
              />
            </div>
          </div>
        ) : productsData?.products.length === 0 ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 font-tajawal-medium text-lg mb-2">
                {selectedCategory
                  ? "لا توجد منتجات في هذه الفئة"
                  : "لا توجد منتجات متوفرة"}
              </p>
              {selectedCategory && (
                <p className="text-gray-400 font-tajawal-regular">
                  يرجى اختيار فئة أخرى لعرض منتجاتها
                </p>
              )}
              <Button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                }}
                className="mt-4"
                variant="outline"
                label="عرض كل المنتجات"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsData?.products.map((product: any) => {
              const cartItem = cartProducts.find(
                (item) => item.id === product.id
              );

              return (
                <Link
                  to={`/product/${product.id}`}
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

                    <div
                      className="text-sm text-gray-600 mb-2 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: product?.description || "",
                      }}
                    />

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
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleUpdateQuantity(
                                  product,
                                  cartItem.quantity + 1
                                );
                              }}
                              Icon={Plus as IconType}
                            />
                            <span className="w-6 text-center font-tajawal-medium">
                              {cartItem.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-orange-500"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleUpdateQuantity(
                                  product,
                                  cartItem.quantity - 1
                                );
                              }}
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
                          ${
                            isCompared(product.id)
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
                </Link>
              );
            })}
          </div>
        )}

        {!productsLoading && productsData.products.length > 0 && (
          <div className="pagination mt-20 mb-14">
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
