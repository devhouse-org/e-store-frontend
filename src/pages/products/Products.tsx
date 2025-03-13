import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/LoadingState";
import { useCartStore } from "@/store/useCartStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  CircleDashed,
  LucideShoppingCart,
  Menu,
  Minus,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

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
  total: number;
  offset: number;
  limit: number;
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
  limit: number;
  page: number;
  category_id?: number | null;
  variants?: Array<{ attribute_id: number; value_id: number }>;
  min_price?: number;
  max_price?: number;
}) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["products", params],
    queryFn: async () => {
      const requestParams = {
        ...params,
        variants:
          params.variants && params.variants.length > 0
            ? params.variants
            : undefined,
      };

      const response = await axiosInstance.post<ProductsResponse>(
        "/products",
        requestParams
      );
      return response.data;
    },
  });
};

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const {
    addToCart,
    products: cartProducts,
    updateQuantity,
    removeFromCart,
  } = useCartStore();
  const { addToComparison, removeFromComparison, isCompared, initializeFromStorage } = useComparisonStore();
  const [prods, setProds] = useState<ProductsResponse>({
    products: [],
    total: 0,
    offset: 0,
    limit: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null
  );
  const [selectedVariants, setSelectedVariants] = useState<
    { attribute_id: number; value_id: number }[]
  >([]);
  const [priceRange, setPriceRange] = useState<
    { min: number; max: number } | undefined
  >(undefined);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of products per page
  const { toast } = useToast();

  const { data: categoriesData = [], isLoading: categoriesLoading } = useCategories();

  // Add this useEffect to set categories when data is loaded
  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts({
    currentUid: Number(localStorage.getItem("session_id")) || 0,
    currentOffset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
    page: currentPage,
    category_id: selectedSubcategory || selectedCategory,
    variants: selectedVariants.length > 0 ? selectedVariants : undefined,
    min_price: priceRange?.min,
    max_price: priceRange?.max,
  });

  // Initialize comparison items from localStorage
  useEffect(() => {
    initializeFromStorage();
  }, []);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlistStore();

  // Function to check if URL has any filter parameters
  const hasUrlFilters = () => {
    return (
      searchParams.has("category") ||
      searchParams.has("price") ||
      searchParams.has("page") ||
      searchParams.has("variants")
    );
  };

  // Function to update URL with current filters
  const updateUrlParams = () => {
    const params = new URLSearchParams(searchParams);

    // Add category and subcategory
    if (selectedCategory !== null) {
      const categoryParam =
        selectedSubcategory !== null
          ? `${selectedCategory}-${selectedSubcategory}`
          : `${selectedCategory}`;
      params.set("category", categoryParam);
    } else {
      params.delete("category");
    }

    // Add variants to URL
    if (selectedVariants.length > 0) {
      const variantsParam = selectedVariants
        .map((v) => `${v.attribute_id}-${v.value_id}`)
        .join(",");
      params.set("variants", variantsParam);
    } else {
      params.delete("variants");
    }

    // Add price range
    if (priceRange) {
      params.set("price", `${priceRange.min}-${priceRange.max}`);
    } else {
      params.delete("price");
    }

    // Add page number (only if it's not page 1)
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    } else {
      params.delete("page");
    }

    setSearchParams(params);
  };

  // Function to parse URL params and set initial state
  const parseUrlParams = () => {
    // Parse category parameter first, since variants depend on it
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const [catId, subCatId] = categoryParam.split("-").map(Number);
      setSelectedCategory(catId || null);
      setSelectedSubcategory(subCatId || null);
    }

    // Parse price parameter
    const priceParam = searchParams.get("price");
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      setPriceRange({ min, max });
    }

    // Parse variants parameter - do this after setting the category
    const variantsParam = searchParams.get("variants");
    if (variantsParam) {
      // Handle both single variant and multiple variants
      const variantParts = variantsParam.includes(",")
        ? variantsParam.split(",")
        : [variantsParam];

      const variants = variantParts
        .map((v) => {
          const [attributeId, valueId] = v.split("-").map(Number);
          return {
            attribute_id: attributeId,
            value_id: valueId,
          };
        })
        .filter((v) => !isNaN(v.attribute_id) && !isNaN(v.value_id));

      // Only set variants if we have valid ones
      if (variants.length > 0) {
        setSelectedVariants(variants);
      }
    }

    // Parse page parameter
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    }
  };

  // Initial load - fetch categories and handle URL params
  useEffect(() => {
    // Always parse URL parameters on initial load
    parseUrlParams();

    // Set a flag to indicate that we've completed the initial load
    // This prevents the URL from being reset during the initial render cycle
    const initialLoadComplete = true;
  }, []);

  // Effect to update URL when filters change
  useEffect(() => {
    if (!categoriesLoading) {
      const currentUrlVariants = searchParams.get("variants");
      const isInitialLoad = currentUrlVariants && selectedVariants.length === 0;

      if (!isInitialLoad) {
        updateUrlParams();
      }
    }
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedVariants,
    priceRange,
    currentPage,
  ]);

  // Effect to handle URL parameter changes
  useEffect(() => {
    // Only parse URL parameters if they were changed externally (like when opening in a new tab)
    const currentUrlVariants = searchParams.get("variants");
    const currentUrlCategory = searchParams.get("category");

    // If URL has variants but our state doesn't, we need to parse them
    // But only if we also have a category, since variants depend on category
    if (
      currentUrlVariants &&
      selectedVariants.length === 0 &&
      currentUrlCategory
    ) {
      console.log(
        "Found variants in URL but not in state, parsing URL parameters"
      );

      // Use a timeout to ensure this happens after the category is set
      setTimeout(() => {
        parseUrlParams();
      }, 0);
    }
  }, [searchParams]);

  // Effect to handle category changes and ensure variants are properly loaded
  useEffect(() => {
    // If we have a category and variants in the URL but not in state, parse them
    const currentUrlVariants = searchParams.get("variants");
    if (
      selectedCategory !== null &&
      currentUrlVariants &&
      selectedVariants.length === 0
    ) {
      console.log("Category set and variants in URL, parsing variants");
      parseUrlParams();
    }
  }, [selectedCategory]);

  const handlePriceChange = (min: number, max: number) => {
    if (min === 0 && max === 0) {
      setPriceRange(undefined);
      // Remove price parameter from URL if it exists
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("price");
      setSearchParams(newParams);
      refetchProducts();
    } else {
      // Ensure the price values are within valid range
      const validMin = Math.max(1000, min);
      const validMax = Math.min(3000000, max);
      setPriceRange({ min: validMin, max: validMax });
      refetchProducts();
    }
  };

  const handleAddToCart = (product: any) => {
    const cartItem = cartProducts.find((item) => item.id === product.id);
    console.log(product);
    if (!cartItem) {
      console.log(product);
      addToCart({
        id: product.id,
        name: product.name,
        price: product.list_price,

        image: `data:image/png;base64,${product.image_1920}`,
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
    const productId = product.id.toString();
    const isInComparison = isCompared(productId);

    if (isInComparison) {
      removeFromComparison(productId);
      return;
    }

    // Check if comparison list is full
    if (useComparisonStore.getState().comparisonItems.length >= 4) {
      toast({
        title: "تنبيه المقارنة",
        description: "يمكنك مقارنة 4 منتجات كحد أقصى",
        variant: "destructive",
      });
      return;
    }

    addToComparison({
      id: productId,
      name: product.name,
      price: product.list_price,
      image: product.image_1920,
      description: product.description || "",
    });
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

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, selectedVariants, priceRange]);

  // Refetch products when filters change
  useEffect(() => {
    if (selectedVariants.length > 0) {
      refetchProducts();
    }
  }, [selectedVariants]);

  // Update the filter change handler
  const handleFilterChange = (
    variants: Array<{ attribute_id: number; value_id: number }>
  ) => {
    // Update the selectedVariants state
    setSelectedVariants(variants);

    // Reset to first page when filters change
    setCurrentPage(1);

    // Manually update URL to ensure variants are included
    const params = new URLSearchParams(searchParams);

    if (variants.length > 0) {
      const variantsParam = variants
        .map((v) => `${v.attribute_id}-${v.value_id}`)
        .join(",");
      params.set("variants", variantsParam);
    } else {
      params.delete("variants");
    }

    // Reset page parameter when filters change
    params.delete("page");

    // Update URL without triggering a full page reload
    setSearchParams(params);
  };

  // Calculate total pages based on the total count from the API
  const totalPages = productsData
    ? Math.ceil(productsData.total / itemsPerPage)
    : 0;

  return (
    <div className="lg:flex-row relative flex flex-col">
      {/* Mobile Filter Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        Icon={Menu as IconType}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden bottom-4 right-4 hover:bg-orange-600 fixed z-30 w-12 h-12 text-white bg-orange-500 rounded-full shadow-lg"
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
            onFilterChange={handleFilterChange}
            onPriceChange={handlePriceChange}
            initialVariants={selectedVariants}
            initialPriceRange={priceRange}
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
      <div className="md:px-8 lg:px-12 flex-1 px-4 pt-4 pb-20">
        {/* Categories section */}
        <div className="mb-8">
          <h1 className="font-tajawal-bold mb-6 text-2xl">الفئات</h1>

          {/* Categories */}
          <div className="relative">
            <button
              onClick={() => scrollCategories("left", "categories-scroll")}
              className="top-1/2 hover:bg-gray-50 absolute left-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md"
            >
              <ArrowLeft className="text-gray-600" size={20} />
            </button>

            <div className="categories-scroll scroll-smooth relative flex gap-3 px-12 overflow-x-hidden">
              {categoriesData?.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                      px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap
                      ${selectedCategory === category.id
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-white hover:bg-gray-200 text-gray-700"
                    }
                    `}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollCategories("right", "categories-scroll")}
              className="top-1/2 hover:bg-gray-50 absolute right-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md"
            >
              <ArrowRight className="text-gray-600" size={20} />
            </button>
          </div>

          {/* Subcategories */}
          {selectedCategory && getSubcategories().length > 0 && (
            <div className="relative mt-4">
              <button
                onClick={() => scrollCategories("left", "subcategories-scroll")}
                className="top-1/2 hover:bg-gray-50 absolute left-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md"
              >
                <ArrowLeft className="text-gray-600" size={20} />
              </button>

              <div className="subcategories-scroll scroll-smooth relative flex gap-3 px-12 overflow-x-hidden">
                {getSubcategories().map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => handleSubcategoryClick(subcategory.id)}
                    className={`
                      px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap
                      ${selectedSubcategory === subcategory.id
                        ? "bg-orange-500 text-white shadow-md"
                        : "border border-gray-200 text-gray-600 hover:bg-white"
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
                className="top-1/2 hover:bg-gray-50 absolute right-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md"
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
              <p className="font-tajawal-medium text-gray-500">
                <Loader />
              </p>
            </div>
          </div>
        ) : productsError ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="font-tajawal-medium mb-4 text-lg text-red-500">
                {productsError.message}
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setSelectedVariants([]);
                }}
                className="hover:bg-orange-600 text-white bg-orange-500"
                label="إعادة المحاولة"
              />
            </div>
          </div>
        ) : productsData?.products.length === 0 ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="font-tajawal-medium mb-2 text-lg text-gray-500">
                {selectedCategory
                  ? "لا توجد منتجات في هذه الفئة"
                  : "لا توجد منتجات متوفرة"}
              </p>
              {selectedCategory && (
                <p className="font-tajawal-regular text-gray-400">
                  يرجى اختيار فئة أخرى لعرض منتجاتها
                </p>
              )}
              <Button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setSelectedVariants([]);
                  setPriceRange(undefined);
                  // Reset URL parameters
                  const params = new URLSearchParams(searchParams);
                  params.delete("category");
                  params.delete("variants");
                  params.delete("price");
                  params.delete("page");
                  setSearchParams(params);
                }}
                className="mt-4"
                variant="outline"
                label="عرض كل المنتجات"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid grid-cols-1 gap-6">
              {productsData?.products.map((product: any) => {
                const cartItem = cartProducts.find(
                  (item) => item.id === product.id
                );

                return (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className="group rounded-xl hover:shadow-lg relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100"
                  >
                    {/* Wishlist and Comparison Buttons Container */}
                    <div className="absolute z-10 flex gap-2 p-2 top-2 right-2">
                      {/* Wishlist Button */}
                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const wishlistItem = {
                            id: product.id.toString(),
                            name: product.name,
                            price: product.list_price,
                            image: product.image_1920,
                            description: product.description || product.name,
                          };
                          isWishlisted(product.id.toString())
                            ? removeFromWishlist(product.id.toString())
                            : addToWishlist(wishlistItem);
                        }}
                        className="top-2 right-10 bg-white/90 group-hover:opacity-100 hover:bg-white absolute z-10 p-2 transition-all duration-200 rounded-full shadow-sm opacity-0"
                        aria-label="إضافة للمفضلة"
                      >
                        <Heart
                          className={cn("w-4 h-4 transition-colors"
                            , isWishlisted(product.id.toString())
                              ? "text-red-500 fill-red-500"
                              : "text-gray-400 group-hover:text-gray-600"
                          )}
                        />
                      </button>

                      {/* Comparison Button - Always visible when in comparison */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleComparisonClick(product);
                        }}
                        className={`p-2 transition-all duration-200 rounded-full shadow-sm bg-white/90 hover:bg-white ${isCompared(product.id.toString())
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                          }`}
                        aria-label="إضافة للمقارنة"
                      >
                        <CircleDashed
                          className={`w-4 h-4 transition-colors ${isCompared(product.id.toString())
                            ? "text-orange-500"
                            : "text-gray-400 group-hover:text-gray-600"
                            }`}
                        />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
                      <img
                        src={`data:image/png;base64,${product.image_1920}`}
                        alt={product.name}
                        className="h-4/5 group-hover:scale-110 object-contain w-4/5 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col flex-grow p-4">
                      <h3 className="line-clamp-1 group-hover:text-orange-600 mb-2 text-sm font-bold text-gray-800 transition-colors">
                        {product.name}
                      </h3>

                      {product.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                          className="mb-2 text-sm text-gray-800 transition-colors line-clamp-2 font-tajawal-regular"
                        />
                      )}

                      <div className="flex items-center justify-between pt-2 mt-auto">
                        <p className="text-sm font-bold text-orange-600">
                          {product.list_price.toLocaleString()} د.ع
                        </p>

                        {cartItem ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleUpdateQuantity(
                                  product,
                                  cartItem.quantity - 1
                                );
                              }}
                              className="hover:bg-orange-200 p-1 text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-tajawal-medium w-6 text-center">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleUpdateQuantity(
                                  product,
                                  cartItem.quantity + 1
                                );
                              }}
                              className="hover:bg-orange-200 p-1 text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product);
                            }}
                            className="hover:bg-orange-200 group-hover:shadow-sm relative p-2 overflow-hidden text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg"
                            aria-label="إضافة للسلة"
                          >
                            <LucideShoppingCart className="w-4 h-4" />
                            <span className="group-hover:scale-x-100 group-hover:opacity-10 absolute inset-0 transition-transform duration-300 origin-left scale-x-0 bg-orange-500 opacity-0"></span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Bottom shine effect on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mb-14 mt-20">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
