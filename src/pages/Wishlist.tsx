import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useWishlistStore } from "@/store/useWishlistStore";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Heart, Trash, X } from "lucide-react";
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
    queryKey: ["products", { productIds }],
    queryFn: async () => {
      if (productIds.length === 0) {
        return { products: [], total: 0, offset: 0, limit: 0 };
      }
      const response = await axiosInstance.post<ProductsResponse>("/products", {
        product_ids: productIds.map((id) => parseInt(id)),
        limit: productIds.length,
        offset: 0,
      });
      return response.data;
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
  return (
    <div className="group relative p-4 bg-white rounded-lg shadow-md">
      <div className="top-2 right-2 absolute z-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(product.id)}
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
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeFromWishlist(product.id);
        }}
        className="bg-red-50 hover:bg-red-100 w-full py-2 mt-2 text-red-600 transition-colors rounded-md"
      >
        إزالة من المفضلة
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
  const {
    removeFromWishlist,
    toggleSelectItem,
    deleteSelectedItems,
    isSelected,
    selectedItems,
    clearSelection,
  } = useWishlistStore();

  const savedIds = JSON.parse(localStorage.getItem("wishlists") || "[]");
  const { data, isLoading, error } = useWishlistProducts(savedIds);

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-red-500">حدث خطأ: {error.message}</div>
      </div>
    );
  }

  if (!data?.products?.length) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
        <div className="space-y-4 text-center">
          <div className="w-fit animate-pulse p-4 mx-auto bg-orange-100 rounded-full">
            <Heart className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="font-tajawal-bold text-3xl text-gray-800">
            قائمة المفضلة فارغة
          </h2>
          <p className="font-tajawal-regular text-lg text-gray-600">
            لم تقم بإضافة أي منتج إلى قائمة المفضلة بعد
          </p>
        </div>

        <Link to="/products">
          <Button
            label="اضف منتجات للمفضلة"
            className="hover:bg-orange-600 rounded-xl hover:shadow-orange-200 px-8 py-6 text-lg text-white transition-all duration-300 bg-orange-500 shadow-lg"
          />
        </Link>
      </div>
    );
  }

  const selectedCount = selectedItems.size;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 py-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h1 className="font-tajawal-bold text-3xl text-gray-800">
              قائمة المفضلة
            </h1>
            <span className="font-tajawal-medium px-4 py-2 bg-orange-100 rounded-full">
              {data.products.length} منتجات
            </span>
          </div>

          {selectedCount > 0 && (
            <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
              <span className="font-tajawal-medium text-sm text-gray-600">
                تم اختيار {selectedCount} منتج
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearSelection}
                  className="hover:bg-red-600 flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-md"
                >
                  <span>مسح التحديد</span>
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={deleteSelectedItems}
                  className="hover:bg-red-600 flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-md"
                >
                  <span>حذف المنتجات</span>
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10 grid grid-cols-1 gap-8">
          {data.products.map((product) => (
            <WishlistItemCard
              key={product.id}
              product={product}
              removeFromWishlist={removeFromWishlist}
              isSelected={isSelected(product.id)}
              onToggleSelect={toggleSelectItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
