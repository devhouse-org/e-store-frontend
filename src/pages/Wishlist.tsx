import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
// import Layout from "@/components/Layout";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  return (
    <div className="container mx-auto px-12 mt-8 py-6 min-h-[calc(100vh-200px)] ">
      <h1 className="text-2xl font-tajawal-bold mb-6">قائمة المفضلة</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">لا توجد منتجات في قائمة المفضلة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} size="lg" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
