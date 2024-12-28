import React from "react";

interface BannerProps {
  title: string;
  subtitle: string;
  price: number;
  primaryImage?: string;
  secondaryImage?: string;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  price,
  primaryImage = "/api/placeholder/300/600",
  className = "",
}) => {
  return (
    <div
      className={`relative w-full bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      <div className="flex flex-col md:flex-row justify-between p-4 md:p-8">
        {/* Left content */}
        <div className="flex flex-col justify-center space-y-4 text-center md:text-right md:mr-8">
          <h1 className="text-3xl md:text-5xl font-tajawal-bold text-black">
            {title}
          </h1>
          <p className="text-lg md:text-2xl text-black font-tajawal-medium">
            {subtitle}
          </p>
          <div className="flex justify-center md:justify-start items-center">
            <span className="px-4 md:px-8 py-1.5 bg-gray-200 rounded-full text-orange-500 font-tajawal-medium text-lg md:text-xl">
              {price.toLocaleString()} د.ع
            </span>
          </div>
        </div>

        {/* Right content - Phone Images */}
        <div className="relative w-full md:w-1/2 h-48 md:h-64 mt-4 md:mt-0 flex justify-center items-center">
          <div className="relative flex items-end space-x-4">
            <img
              src={primaryImage}
              alt={`${title} Composite View`}
              className="h-40 md:h-80 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
