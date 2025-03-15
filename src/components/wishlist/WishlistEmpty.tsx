import { Link } from "react-router-dom";

const WishlistEmpty = () => {
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
};

export default WishlistEmpty;
