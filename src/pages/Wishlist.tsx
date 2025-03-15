import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useWishlistStore } from "@/store/useWishlistStore";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Trash, X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  image_1920: string;
  list_price: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  offset: number;
  limit: number;
}

const useWishlistProducts = (productIds: string[]) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["wishlistProducts", productIds],
    queryFn: async () => {
      if (productIds.length === 0) {
        return { products: [], total: 0, offset: 0, limit: 0 };
      }

      try {
        const numericIds = productIds.map((id) => parseInt(id, 10));

        // Make the API request
        const response = await axiosInstance.post<ProductsResponse>(
          "/products",
          {
            product_ids: numericIds,
            limit: 100,
            offset: 0,
          }
        );

        const allProducts = response.data.products || [];
        const filteredProducts = allProducts.filter((product) =>
          productIds.includes(String(product.id))
        );

        return {
          products: filteredProducts,
          total: filteredProducts.length,
          offset: 0,
          limit: filteredProducts.length,
        };
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
        throw error;
      }
    },
    enabled: productIds.length > 0,
  });
};

function WishlistItemCard({
  product,
  removeFromWishlist,
  isSelected,
  onToggleSelect,
}: {
  product: Product;
  removeFromWishlist: (productId: string) => void;
  isSelected: boolean;
  onToggleSelect: (productId: string) => void;
}) {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productId = String(product.id);
    removeFromWishlist(productId);
  };

  return (
    <div className="group relative p-4 bg-white rounded-lg shadow-md">
      <div className="top-2 right-2 absolute z-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(String(product.id))}
          className="w-5 h-5 border-2 border-orange-500"
        />
      </div>
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={`data:image/png;base64,${product.image_1920}`}
          alt={product.name}
          className="object-cover w-full h-48 rounded-md"
        />
        <div className="mt-4">
          <h3 className="font-tajawal-bold mb-2 text-lg text-gray-800">
            {product.name}
          </h3>
          <p className="font-tajawal-bold text-lg text-orange-600">
            {product.list_price.toLocaleString("ar-IQ")} د.ع
          </p>
        </div>
      </Link>
      <button
        onClick={handleRemove}
        className="hover:bg-red-600 flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
        aria-label="إزالة من المفضلة"
      >
        <span>إزالة من المفضلة</span>
        <Heart className="w-5 h-5" />
      </button>
    </div>
  );
}

const WishlistSkeleton = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 py-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-24 h-8 rounded-full" />
          </div>
        </div>

        <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10 grid grid-cols-1 gap-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
              <div className="top-2 right-2 absolute z-10">
                <Skeleton className="w-5 h-5 rounded" />
              </div>
              <Skeleton className="w-full h-48 rounded-md" />
              <div className="mt-4 space-y-3">
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-1/3 h-6" />
              </div>
              <Skeleton className="w-full h-10 mt-4 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const queryClient = useQueryClient();
  const {
    wishlistIds,
    removeFromWishlist,
    toggleSelectItem,
    selectAll,
    deleteSelectedItems,
    isSelected,
    clearSelection,
    getWishlistCount,
    getSelectedCount,
  } = useWishlistStore();

  const { data, isLoading, error, refetch } = useWishlistProducts(wishlistIds);
  const selectedCount = getSelectedCount();
  const wishlistCount = getWishlistCount();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["wishlistProducts"] });
    refetch();
  }, [wishlistIds, refetch, queryClient]);

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(String(productId));
    queryClient.invalidateQueries({ queryKey: ["wishlistProducts"] });
    setTimeout(() => refetch(), 0);
  };

  const handleToggleSelect = (productId: string) => {
    toggleSelectItem(String(productId));
  };

  const handleDeleteSelected = () => {
    deleteSelectedItems();
    queryClient.invalidateQueries({ queryKey: ["wishlistProducts"] });
    setTimeout(() => refetch(), 0);
  };

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  if (error) {
    console.error("Error loading wishlist:", error);
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <p className="text-red-500">
          حدث خطأ أثناء تحميل المفضلة. يرجى المحاولة مرة أخرى.
        </p>
      </div>
    );
  }

  if (wishlistCount === 0 || !data?.products || data.products.length === 0) {
    return (
      <div className="container px-4 py-20 mx-auto text-center">
        <h1 className="font-tajawal-bold mb-4 text-3xl text-gray-800">
          قائمة المفضلة
        </h1>
        <p className="mb-8 text-gray-600">لا توجد منتجات في المفضلة.</p>
        <Link
          to="/products"
          className="hover:bg-orange-600 inline-block px-6 py-3 text-white bg-orange-500 rounded-md"
        >
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  const products = data.products;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 py-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h1 className="font-tajawal-bold text-3xl text-gray-800">
              قائمة المفضلة
            </h1>
            <span className="font-tajawal-medium px-4 py-2 bg-orange-100 rounded-full">
              {wishlistCount} منتجات
            </span>
          </div>

          {wishlistCount > 0 && (
            <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
              {selectedCount > 0 ? (
                <>
                  <span className="font-tajawal-medium text-sm text-gray-600">
                    تم اختيار {selectedCount} منتج
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearSelection}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <span>مسح التحديد</span>
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDeleteSelected}
                      className={buttonVariants({ variant: "destructive" })}
                    >
                      <span>حذف المنتجات</span>
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={selectAll}
                  className={buttonVariants({ variant: "outline" })}
                >
                  <span>تحديد الكل</span>
                </button>
              )}
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-600">لا توجد منتجات متطابقة في المفضلة.</p>
          </div>
        ) : (
          <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10 grid grid-cols-1 gap-8">
            {products.map((product) => (
              <WishlistItemCard
                key={product.id}
                product={product}
                removeFromWishlist={handleRemoveFromWishlist}
                isSelected={isSelected(product.id)}
                onToggleSelect={handleToggleSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
