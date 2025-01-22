import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center space-y-3">
          <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto">
            <Heart className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-2xl font-tajawal-medium">قائمة المفضلة فارغة</h2>
          <p className="text-gray-500 font-tajawal-regular">
            لم تقم بإضافة أي منتج إلى قائمة المفضلة بعد
          </p>
        </div>

        <Link to="/products">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            label="اضف منتجات للمفضلة"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-12 mt-8 py-6 min-h-[calc(100vh-200px)] ">
      <h1 className="text-2xl font-tajawal-bold mb-6">قائمة المفضلة</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} size="lg" />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
