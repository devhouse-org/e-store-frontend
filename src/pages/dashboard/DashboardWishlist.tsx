import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/useWishlistStore";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { LucideHeart } from "lucide-react";
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

const DashboardWishlist = () => {
  const { wishlistIds, getWishlistCount } = useWishlistStore();
  const wishlistCount = getWishlistCount();
  const { data, isLoading } = useWishlistProducts(wishlistIds);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!data?.products?.length) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
        <div className="space-y-4 text-center">
          <div className="w-fit animate-pulse p-4 mx-auto bg-orange-100 rounded-full">
            <LucideHeart className="w-10 h-10 text-orange-500" />
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
            label="إبدأ التسوق"
            className="hover:bg-orange-600 rounded-xl hover:shadow-orange-200 px-8 py-6 text-lg text-white transition-all duration-300 bg-orange-500 shadow-lg"
          ></Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="h-full p-4 space-y-4">
      <h1 className="font-tajawal-bold text-xl text-gray-500">
        المفضلات ({wishlistCount})
      </h1>
      <div className="xl:container xl:mx-auto">
        <div className="mx-auto">
          <div className="flex flex-wrap gap-4">
            {data.products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: parseInt(product.id),
                  name: product.name,
                  list_price: product.list_price,
                  image_1920: product.image_1920,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWishlist;
