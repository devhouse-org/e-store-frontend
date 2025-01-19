import React from "react";

interface ProductCardProps {
  productName: string;
  productPrice: number;
  productImage: string;
  size: "sm" | "lg";
  activeCard?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  productPrice,
  productImage,
  size,
  activeCard,
}) => {
  return (
    <div
      className={`
        relative group cursor-pointer transition-all duration-300 ease-in-out
        ${size === "lg" ? "w-64 p-4" : "w-40 p-2"}
        ${
          activeCard
            ? "border-orange-400 shadow-md"
            : "border-transparent hover:shadow-md"
        }
        border-2 bg-white rounded-xl overflow-hidden text-center
      `}
    >
      {/* Product Image Container */}
      <div
        className={`
          relative overflow-hidden rounded-lg
          ${size === "lg" ? "p-6" : "p-4"}
          flex justify-center items-center
        `}
      >
        <img
          src={productImage}
          alt={productName}
          className={`
            transition-all duration-300
            ${size === "lg" ? "w-full h-26" : "h-24 w-24"}
            object-contain group-hover:scale-105
          `}
        />
      </div>

      {/* Product Info Container */}
      <div className={`mt-3 space-y-2 ${size === "lg" ? "px-4" : "px-2"}`}>
        {/* Product Name */}
        <h2
          className={`
            ${size === "lg" ? "text-lg" : "text-sm"}
            text-gray-800 font-tajawal-medium truncate
            group-hover:text-orange-500 transition-colors duration-300
          `}
        >
          {productName}
        </h2>

        {/* Product Price */}
        <p
          className={`
            ${size === "lg" ? "text-xl" : "text-base"}
            text-orange-500 font-tajawal-bold
            group-hover:text-orange-600 transition-colors duration-300
          `}
        >
          {productPrice.toLocaleString()} د.ع
        </p>
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
  );
};

export default ProductCard;
