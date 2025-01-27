import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  CircleDashed,
  CreditCard,
  HeartCrack,
  Plus,
  Minus,
  X
} from "lucide-react";
import { Product } from "@/utils/data/products";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";

interface ProductCardProps {
  product: Product;
  size?: "sm" | "lg";
  activeCard?: boolean;
  showBtns?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  size = "lg",
  activeCard,
  showBtns = false
}) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();
  const {
    addToCart,
    products: cartProducts,
    updateQuantity,
    removeFromCart
  } = useCartStore();
  const { addToComparison, removeFromComparison, isCompared } = useComparisonStore();

  const isInWishlist = isWishlisted(product.id);
  const isInComparison = isCompared(product.id);
  const cartItem = cartProducts.find(item => item.id === product.id);

  const handleAddToCart = () => {
    if (!cartItem) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        storage: product.storage
      });
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (cartItem) {
      if (newQuantity < 1) {
        removeFromCart(product.id);
      } else {
        updateQuantity(product.id, newQuantity);
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleComparisonClick = () => {
    if (isInComparison) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div
        className={`
          relative group cursor-pointer transition-all duration-300 ease-in-out
          ${size === "lg" ? "w-72 p-4" : "w-40 p-2"}
          ${activeCard
            ? "border-orange-400 shadow-md"
            : "bordertransparent hover:shadow-md"
          }
          border bg-white rounded-xl overflow-hidden textcenter
        `}
      >
        {/* Product Image Container */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className={`
              w-full object-contain rounded-lg
              ${size === "lg" ? "h-[280px]" : "h-[220px]"}
            `}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWishlistClick();
            }}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <Heart
              className={`w-5 h-5 ${isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            />
          </button>
        </div>

        {/* Product Info Container */}
        <div className={`mt-3 space-y-2 ${size === "lg" ? "px-4" : "px-2"}`}>
          <h2
            className={`
              ${size === "lg" ? "text-lg" : "text-sm"}
              text-gray-800 font-tajawal-medium truncate
              group-hover:text-orange-500 transition-colors duration-300
            `}
          >
            {product.name}
          </h2>

          <p
            className={`
              ${size === "lg" ? "text-xl" : "text-base"}
              text-orange-500 font-tajawal-bold
              group-hover:text-orange-600 transition-colors duration-300
            `}
          >
            {product.price.toLocaleString()} د.ع
          </p>

          {showBtns && (
            <div className="flex items-center justify-between">
              {/* Left side buttons */}
              <div className="flex gap-2">
                <Button
                  size="icon"
                  Icon={CreditCard as IconType}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleBuyNow();
                  }}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className={isInComparison
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-orange-100 hover:bg-orange-200 text-orange-500"
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleComparisonClick();
                  }}
                  Icon={CircleDashed as IconType}
                />
              </div>

              {/* Right side - Cart button or quantity controls */}
              {cartItem ? (
                <div
                  className="flex items-center gap-2 px-2 bg-orange-100/25 rounded-md py-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-orange-500"
                    onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
                    Icon={Minus as IconType}
                  />
                  <span className="w-6 text-center font-tajawal-medium">
                    {cartItem.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-black"
                    onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
                    Icon={Plus as IconType}
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-orange-100 hover:bg-orange-200 text-orange-500"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  Icon={ShoppingCart as IconType}
                />
              )}
            </div>
          )}
        </div>

        {/* Active Indicator */}
        {activeCard && (
          <div className="absolute top-2 right-2">
            <div className="bg-orange-500 text-white p-1.5 rounded-full shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;