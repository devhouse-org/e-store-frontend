import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

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

interface WishlistItem {
  id: string;
  price: number;
  image: string;
}

const getWishlistProducts = useQuery<ProductsResponse, Error>({
  queryKey: ["wishlistProducts"],
  queryFn: async () => {
    const wishlists = JSON.parse(localStorage.getItem('wishlists') || '[]');
    const productIds = wishlists.map((item: WishlistItem) => item.id);

    const response = await axiosInstance.post<ProductsResponse>(
      "/products",
      { ids: productIds }
    );
    return response.data;
  },
});

function WishlistItemCard({ 
  product, 
  removeFromWishlist, 
  setSavedProducts 
}: { 
  product: WishlistItem, 
  removeFromWishlist: (productId: string) => void, 
  setSavedProducts: Dispatch<SetStateAction<WishlistItem[]>> 
}) {
  return (
    <Link to={`/product/${product.id}`} key={product.id} className="p-4 bg-white rounded-lg shadow-md">
      <img 
        src={`data:image/png;base64,${product.image}`} 
        alt="Product" 
        className="object-cover w-full h-48 rounded-md"
      />
      <div className="mt-4">
        <p className="text-lg text-orange-600 font-tajawal-bold">
          {product.price.toLocaleString('ar-IQ')} د.ع
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            removeFromWishlist(product.id);
            setSavedProducts(prev => prev.filter(p => p.id !== product.id));
          }}
          className="w-full py-2 mt-2 text-red-600 transition-colors rounded-md bg-red-50 hover:bg-red-100"
        >
          إزالة من المفضلة
        </button>
      </div>
    </Link>
  );
}

const Wishlist = () => {
  const [savedProducts, setSavedProducts] = useState<WishlistItem[]>([]);
  const { removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    setSavedProducts(getWishlistProducts || []);
  }, []);

  if (savedProducts.length === 0) {
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

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 py-8 min-h-[calc(100vh-200px)]">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl text-gray-800 font-tajawal-bold">
            قائمة المفضلة
          </h1>
          <span className="px-4 py-2 text-orange-600 bg-orange-100 rounded-full font-tajawal-medium">
            {savedProducts.length} منتجات
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10">
          {savedProducts.map((product) => (
            <WishlistItemCard 
              key={product.id}
              product={product}
              removeFromWishlist={removeFromWishlist}
              setSavedProducts={setSavedProducts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
