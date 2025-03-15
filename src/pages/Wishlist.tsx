import useWishlistProducts from "@/hooks/useWishlistProducts";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// Import components from index file
import {
  WishlistEmpty,
  WishlistGrid,
  WishlistHeader,
  WishlistSkeleton,
} from "@/components/wishlist";

const Wishlist = () => {
  const queryClient = useQueryClient();
  const {
    wishlistIds,
    removeFromWishlist: storeRemoveFromWishlist,
    toggleSelectItem,
    selectAll,
    deleteSelectedItems: storeDeleteSelectedItems,
    isSelected,
    clearSelection,
    getWishlistCount,
    getSelectedCount,
  } = useWishlistStore();

  const { data, isLoading, error } = useWishlistProducts(wishlistIds);
  const selectedCount = getSelectedCount();
  const wishlistCount = getWishlistCount();

  const handleRemoveFromWishlist = useCallback(
    (productId: string) => {
      storeRemoveFromWishlist(String(productId));
      queryClient.invalidateQueries({
        queryKey: ["wishlistProducts", wishlistIds],
      });
    },
    [storeRemoveFromWishlist, queryClient, wishlistIds]
  );

  const handleToggleSelect = useCallback(
    (productId: string) => {
      toggleSelectItem(String(productId));
    },
    [toggleSelectItem]
  );

  const handleDeleteSelected = useCallback(() => {
    storeDeleteSelectedItems();
    queryClient.invalidateQueries({
      queryKey: ["wishlistProducts", wishlistIds],
    });
  }, [storeDeleteSelectedItems, queryClient, wishlistIds]);

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
    return <WishlistEmpty />;
  }

  // Safely access products
  const products = data?.products || [];

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 py-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto">
        <WishlistHeader
          wishlistCount={wishlistCount}
          selectedCount={selectedCount}
          selectAll={selectAll}
          clearSelection={clearSelection}
          deleteSelectedItems={handleDeleteSelected}
        />

        <WishlistGrid
          products={products}
          removeFromWishlist={handleRemoveFromWishlist}
          isSelected={isSelected}
          onToggleSelect={handleToggleSelect}
        />
      </div>
    </div>
  );
};

export default Wishlist;
