import { HeartCrack } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const WishlistEmpty = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
      <div className="space-y-4 text-center">
        <div className="w-fit animate-pulse p-4 mx-auto bg-orange-100 rounded-full">
          <HeartCrack className="w-10 h-10 text-orange-500" />
        </div>
        <h2 className="font-tajawal-bold text-3xl text-gray-800">
          المفضلة فارغة
        </h2>
        <p className="font-tajawal-regular text-lg text-gray-600">
          لم تقم بإضافة أي منتج إلى المفضلة بعد
        </p>
      </div>

      <Link to="/products">
        <Button
          label="تسوق الآن"
          className="hover:bg-orange-600 rounded-xl hover:shadow-orange-200 px-8 py-6 text-lg text-white transition-all duration-300 bg-orange-500 shadow-lg"
        />
      </Link>
    </div>
  );
};

export default WishlistEmpty;
