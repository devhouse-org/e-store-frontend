import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface WishlistItemProps {
  product: Product;
  removeFromWishlist: (productId: string) => void;
  isSelected: boolean;
  onToggleSelect: (productId: string) => void;
}

const WishlistItem = ({
  product,
  removeFromWishlist,
  isSelected,
  onToggleSelect,
}: WishlistItemProps) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productId = String(product.id);
    removeFromWishlist(productId);
  };

  return (
    <div className="group relative p-4 bg-white rounded-lg shadow-md">
      <div className="top-2 right-2 absolute z-10">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggleSelect(String(product.id))}
          className="w-5 h-5 border-2 border-orange-500"
        />
      </div>
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={`data:image/png;base64,${product.image_1920}`}
          alt={product.name}
          className="object-cover w-full h-48 rounded-md"
          loading="lazy"
        />
        <div className="mt-4">
          <h3 className="font-tajawal-bold mb-2 text-lg text-gray-800">
            {product.name}
          </h3>
          <p className="font-tajawal-bold text-lg text-orange-600">
            {product.list_price.toLocaleString("ar-IQ")} د.ع
          </p>
        </div>
      </Link>
      <button
        onClick={handleRemove}
        className="hover:bg-red-600 flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
        aria-label="إزالة من المفضلة"
      >
        <span>إزالة من المفضلة</span>
        <Heart className="w-5 h-5" />
      </button>
    </div>
  );
};

export default React.memo(WishlistItem);
