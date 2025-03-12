import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/ui/LoadingState";
import { Checkbox } from "@/components/ui/checkbox";

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
      const response = await axiosInstance.post<ProductsResponse>(
        "/products",
        {
          product_ids: productIds.map(id => parseInt(id)),
          limit: productIds.length,
          offset: 0
        }
      );
      return response.data;
    },
    enabled: productIds.length > 0
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
    <div className="relative p-4 bg-white rounded-lg shadow-md group">
      <div className="absolute top-2 right-2 z-10">
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
          <h3 className="mb-2 text-lg text-gray-800 font-tajawal-bold">{product.name}</h3>
          <p className="text-lg text-orange-600 font-tajawal-bold">
            {product.list_price.toLocaleString('ar-IQ')} د.ع
          </p>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeFromWishlist(product.id);
        }}
        className="w-full py-2 mt-2 text-red-600 transition-colors rounded-md bg-red-50 hover:bg-red-100"
      >
        إزالة من المفضلة
      </button>
    </div>
  );
}

const Wishlist = () => {
  const { 
    removeFromWishlist, 
    toggleSelectItem, 
    deleteSelectedItems,
    isSelected,
    selectedItems,
    clearSelection
  } = useWishlistStore();
  
  const savedIds = JSON.parse(localStorage.getItem('wishlists') || '[]');
  const { data, isLoading, error } = useWishlistProducts(savedIds);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader />
      </div>
    );
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
          <div className="p-4 mx-auto bg-orange-100 rounded-full w-fit animate-pulse">
            <Heart className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-3xl text-gray-800 font-tajawal-bold">
            قائمة المفضلة فارغة
          </h2>
          <p className="text-lg text-gray-600 font-tajawal-regular">
            لم تقم بإضافة أي منتج إلى قائمة المفضلة بعد
          </p>
        </div>

        <Link to="/products">
          <Button
            label="اضف منتجات للمفضلة"
            className="px-8 py-6 text-lg text-white transition-all duration-300 bg-orange-500 shadow-lg hover:bg-orange-600 rounded-xl hover:shadow-orange-200"
          />
        </Link>
      </div>
    );
  }

  const selectedCount = selectedItems.size;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 py-8 min-h-[calc(100vh-200px)]">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl text-gray-800 font-tajawal-bold">
              قائمة المفضلة
            </h1>
            <span className="px-4 py-2 text-orange-600 bg-orange-100 rounded-full font-tajawal-medium">
              {data.products.length} منتجات
            </span>
          </div>
          
          {selectedCount > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                تم اختيار {selectedCount} منتج
              </span>
              <Button
                onClick={clearSelection}
                variant="outline"
                className="text-gray-600"
              >
                إلغاء التحديد
              </Button>
              <Button
                onClick={deleteSelectedItems}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                حذف المحدد
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10">
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
