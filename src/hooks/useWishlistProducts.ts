import { ProductsResponse } from "@/types/product";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const useWishlistProducts = (productIds: string[]) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ["wishlistProducts", productIds],
    queryFn: async () => {
      if (productIds.length === 0) {
        return { products: [], total: 0, offset: 0, limit: 0 };
      }

      try {
        const numericIds = productIds.map((id) => parseInt(id, 10));

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
    staleTime: 60000,
    gcTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useWishlistProducts;
