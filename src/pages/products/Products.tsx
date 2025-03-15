import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/LoadingState";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/useCartStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const {
    addToCart,
    products: cartProducts,
    updateQuantity,
    removeFromCart,
  } = useCartStore();
  const {
    addToComparison,
    removeFromComparison,
    isCompared,
    initializeFromStorage,
  } = useComparisonStore();
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

  const { data: categoriesData = [], isLoading: categoriesLoading } =
    useCategories();

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

  // Add this new function to handle centering of selected category/subcategory
  const scrollToCenter = (elementId: string, selectedId: number | null) => {
    if (!selectedId) return;

    const container = document.getElementById(elementId);
    const selectedElement = document.getElementById(
      `${elementId}-${selectedId}`
    );

    if (container && selectedElement) {
      const containerWidth = container.offsetWidth;
      const elementWidth = selectedElement.offsetWidth;
      const elementLeft = selectedElement.offsetLeft;

      const scrollPosition =
        elementLeft - containerWidth / 2 + elementWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
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
    const newCategoryId = categoryId === selectedCategory ? null : categoryId;
    setSelectedCategory(newCategoryId);
    setSelectedSubcategory(null);
    setSelectedVariants([]);

    // Scroll category to center after selection
    if (newCategoryId) {
      scrollToCenter("categories-container", newCategoryId);
    }
  };

  // Update subcategory click handler
  const handleSubcategoryClick = (subcategoryId: number) => {
    const newSubcategoryId =
      subcategoryId === selectedSubcategory ? null : subcategoryId;
    setSelectedSubcategory(newSubcategoryId);
    setSelectedVariants([]);

    // Scroll subcategory to center after selection
    if (newSubcategoryId) {
      scrollToCenter("subcategories-container", newSubcategoryId);
    }
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
            <div
              id="categories-container"
              className="scrollbar-custom flex gap-3 pb-2 overflow-x-auto"
            >
              {categoriesData?.map((category) => (
                <button
                  key={category.id}
                  id={`categories-container-${category.id}`}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap
                    ${
                      selectedCategory === category.id
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-white hover:bg-gray-200 text-gray-700"
                    }
                `}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          {selectedCategory && getSubcategories().length > 0 && (
            <div className="relative mt-4">
              <div
                id="subcategories-container"
                className="scrollbar-custom flex gap-3 pb-2 overflow-x-auto"
              >
                {getSubcategories().map((subcategory) => (
                  <button
                    key={subcategory.id}
                    id={`subcategories-container-${subcategory.id}`}
                    onClick={() => handleSubcategoryClick(subcategory.id)}
                    className={`
                      px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap
                      ${
                        selectedSubcategory === subcategory.id
                          ? "bg-orange-500 text-white shadow-md"
                          : "border border-gray-200 text-gray-600 hover:bg-white"
                      }
                    `}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
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
              {productsData?.products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
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
