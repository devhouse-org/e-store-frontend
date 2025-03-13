import React from "react";

interface BannerProps {
  title: string;
  subtitle?: string;
  price?: number;
  discount?: number;
  primaryImage?: string;
  secondaryImage?: string;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  price,
  discount,
  primaryImage = "/api/placeholder/300/600",
  secondaryImage,
  className = "",
}) => {
  return (
    <div
      className={`relative w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 ${className}`}
    >
      <div className="flex flex-col md:flex-row justify-between p-6 md:p-10">
        {/* Left content */}
        <div className="flex flex-col justify-center space-y-6 text-center md:text-right md:mr-12">
          <h1 className="text-4xl md:text-6xl font-tajawal-bold text-gray-800 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 font-tajawal-medium">
              {subtitle}
            </p>
          )}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
            {price && (
              <span className="px-6 md:px-8 py-2.5 bg-orange-100 rounded-full text-orange-600 font-tajawal-bold text-xl md:text-2xl transition-transform hover:scale-105">
                {price.toLocaleString()} د.ع
              </span>
            )}
            {discount && (
              <span className="px-6 md:px-8 py-2.5 bg-red-100 rounded-full text-red-600 font-tajawal-bold text-xl md:text-2xl transition-transform hover:scale-105">
                خصم {discount}%
              </span>
            )}
          </div>
        </div>

        {/* Right content - Image */}
        <div className="relative w-full md:w-1/2 h-56 md:h-80 mt-6 md:mt-0 flex justify-center items-center">
          <div className="relative flex items-end space-x-4">
            <img
              src={primaryImage}
              alt={title}
              className="h-48 md:h-96 object-contain transform transition-transform hover:scale-105 duration-300"
            />
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={`${title} Secondary View`}
                className="h-40 md:h-80 object-contain opacity-75 transform transition-transform hover:scale-105 duration-300"
              />
            )}
          </div>
        </div>
      </div>

      {/* Discount badge */}
      {discount && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-tajawal-bold">
          {discount}% خصم
        </div>
      )}
    </div>
  );
};

export default Banner;
