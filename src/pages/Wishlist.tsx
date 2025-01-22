import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto animate-pulse">
            <Heart className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-3xl font-tajawal-bold text-gray-800">
            قائمة المفضلة فارغة
          </h2>
          <p className="text-gray-600 font-tajawal-regular text-lg">
            لم تقم بإضافة أي منتج إلى قائمة المفضلة بعد
          </p>
        </div>

        <Link to="/products">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl
              transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-200"
          >
            اضف منتجات للمفضلة
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 py-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-tajawal-bold text-gray-800">
            قائمة المفضلة
          </h1>
          <span className="bg-orange-100 px-4 py-2 rounded-full text-orange-600 font-tajawal-medium">
            {wishlist.length} منتجات
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="transform transition-transform duration-300  p-2"
            >
              <ProductCard product={product} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
