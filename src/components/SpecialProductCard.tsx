import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart, ShoppingCart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export interface SpecialProduct {
  id: string | number;
  name: string;
  list_price: number;
  image_1920: string;
  description?: string;
  description_sale?: string;
}

interface SpecialProductCardProps {
  product: SpecialProduct;
  className?: string;
}

const SpecialProductCard: React.FC<SpecialProductCardProps> = ({
  product,
  className,
}) => {
  const { isWishlisted, addToWishlist, removeFromWishlist } =
    useWishlistStore();
  const { addToCart } = useCartStore();

  const isInWishlist = isWishlisted(product.id.toString());

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlistItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.list_price,
      image: `data:image/jpeg;base64,${product.image_1920}`,
      description: product.description_sale || product.name,
    };

    isInWishlist
      ? removeFromWishlist(product.id.toString())
      : addToWishlist(wishlistItem);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.list_price,
      image: `data:image/jpeg;base64,${product.image_1920}`,
      quantity: 1,
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        "group rounded-xl hover:shadow-lg relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100",
        className
      )}
    >
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={cn(
          "top-2 right-2 absolute bg-white/90 hover:bg-white p-2 transition-all duration-200 rounded-full shadow-sm",
          isInWishlist ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        aria-label="إضافة للمفضلة"
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-colors",
            isInWishlist
              ? "text-red-500 fill-red-500"
              : "text-gray-400 group-hover:text-gray-600"
          )}
        />
      </button>

      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <img
          src={`data:image/jpeg;base64,${product.image_1920}`}
          alt={product.name}
          className="h-4/5 group-hover:scale-110 mix-blend-multiply object-contain w-4/5 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="line-clamp-1 group-hover:text-orange-600 mb-2 text-sm font-bold text-gray-800 transition-colors">
          {product.name}
        </h3>

        {product.description && (
          <p
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
            className="line-clamp-2 font-tajawal-regular mb-2 text-sm text-gray-800 transition-colors"
          />
        )}

        <div className="flex items-center justify-between pt-2 mt-auto">
          <p className="text-sm font-bold text-orange-600">
            {product.list_price.toLocaleString()} د.ع
          </p>

          <button
            onClick={handleAddToCart}
            className="hover:bg-orange-200 group-hover:shadow-sm relative p-2 overflow-hidden text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg"
            aria-label="إضافة للسلة"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="group-hover:scale-x-100 group-hover:opacity-10 absolute inset-0 transition-transform duration-300 origin-left scale-x-0 bg-orange-500 opacity-0"></span>
          </button>
        </div>
      </div>

      {/* Bottom shine effect on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </Link>
  );
};

export default SpecialProductCard;
