import React, { useState, useEffect } from "react";
import { AuctionDialog } from "./AuctionDialog";
import { prices } from "@/utils/dummy_data/data";

interface AuctionCardProps {
  productName: string;
  currentPrice: number;
  startingPrice: number;
  endTime: string;
  imageSrc: string;
  onSubscribe: () => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  productName,
  currentPrice,
  startingPrice,
  endTime,
  imageSrc,
  onSubscribe,
}) => {
  // State to track the remaining time
  const [remainingTime, setRemainingTime] =
    useState<string>("00 : 00 : 00 : 00");

  useEffect(() => {
    // Function to update the remaining time
    const updateTime = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      // If the auction has ended
      if (distance < 0) {
        setRemainingTime("00 : 00 : 00 : 00");
        clearInterval(intervalId); // Stop the interval when time is up
        return;
      }

      // Calculate time components (days, hours, minutes, seconds)
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setRemainingTime(
        `${days.toString().padStart(2, "0")} : ${hours
          .toString()
          .padStart(2, "0")} : ${minutes
            .toString()
            .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
      );
    };

    // Initial call to set the time immediately
    updateTime();

    // Update time every second
    const intervalId = setInterval(updateTime, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [endTime]); // Re-run effect when endTime changes

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg border border-gray-300 overflow-hidden">
      <div className="p-6  flex flex-col md:items-center">
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <div className="mx-auto md:mx-0">
            {/* Product Image */}
            <img
              src={imageSrc}
              alt={productName}
              className="min-w-16 w-32 h-32 object-contain mt-4 mb-6 sm:mb-0"
            />
          </div>
          <div className="flex flex-col justify-between sm:h-full">
            {/* Product Name */}
            <h2 className="text-xl truncate text-center md:text-start font-semibold text-gray-800 mb-2 md:mb-4 font-tajawal-bold">
              {productName}
            </h2>

            {/* Prices */}
            <div className="flex sm:flex-col justify-between text-center mb-2 sm:mb-4">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <p className="text-gray-500 font-tajawal-regular">
                  السعر الحالي
                </p>
                <p className="text-orange-500 font-tajawal-bold text-xl">
                  {currentPrice.toLocaleString()} د.ع
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4 md:mt-2 sm:mt-0">
                <p className="text-gray-500 font-tajawal-regular">
                  تبدأ المزايدة من
                </p>
                <p className="text-orange-500 font-tajawal-bold text-xl">
                  {startingPrice.toLocaleString()} د.ع
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row-reverse justify-between items-center sm:mt-4 sm:gap-12">
          {/* Timer */}
          <div className="flex items-center justify-center w-full sm:w-auto border border-orange-500 rounded-md p-2 text-orange-500 font-medium mb-4 sm:mb-0">
            <span className="ml-2 text-gray-700 font-tajawal-regular">
              الوقت المتبقي
            </span>
            <p>{remainingTime}</p>
          </div>
          {/* Button */}
          <AuctionDialog prices={prices} endTime="2025-12-28T12:00:00" />
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
