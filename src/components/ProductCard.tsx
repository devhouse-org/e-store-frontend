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
      className={`${size === "lg" ? "w-64 p-4" : "w-40 p-2"} ${
        activeCard ? "border-orange-400" : "border-transparent"
      } border bg-white shadow-md rounded-lg overflow-hidden text-center`}
    >
      {/* Product Image */}
      <div
        className={`${
          size === "lg" ? "p-6" : "p-4"
        } flex justify-center h-24 items-center`}
      >
        <img
          src={productImage}
          alt={productName}
          className={`${
            size === "lg" ? "w-full" : "w-24"
          } object-cover rounded-md`}
        />
      </div>

      {/* Product Name */}
      <div className={`p-${size === "lg" ? "4" : "2"}`}>
        <h2
          className={`${
            size === "lg" ? "text-lg" : "text-sm"
          } text-gray-800 font-tajawal-medium truncate`}
        >
          {productName}
        </h2>

        {/* Product Price */}
        <p
          className={`${
            size === "lg" ? "text-xl" : "text-sm"
          } text-orange-500 font-tajawal-bold truncate`}
        >
          {productPrice.toLocaleString()} د.ع
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
