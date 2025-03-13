import type { Auction } from "@/utils/data/auctions";
import { prices } from "@/utils/dummy_data/data";
import React, { useEffect, useState } from "react";
import { AuctionDialog } from "./AuctionDialog";

interface AuctionCardProps {
  auction: Auction;
  onSubscribe?: () => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction, onSubscribe }) => {
  const [remainingTime, setRemainingTime] =
    useState<string>("00 : 00 : 00 : 00");

  useEffect(() => {
    let intervalId: NodeJS.Timeout; // Declare intervalId here

    // Function to update the remaining time
    const updateTime = () => {
      const now = new Date().getTime();
      const end = new Date(auction.endTime).getTime();
      const distance = end - now;

      // If the auction has ended
      if (distance < 0) {
        setRemainingTime("00 : 00 : 00 : 00");
        if (intervalId) {
          clearInterval(intervalId); // Stop the interval when time is up
        }
        return;
      }

      // Calculate time components
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
    intervalId = setInterval(updateTime, 1000);

    // Clean up the interval on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [auction.endTime]); // Re-run effect when endTime changes

  return (
    <div className="w-full max-w-md overflow-hidden bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="md:items-center flex flex-col p-6">
        <div className="sm:flex-row sm:gap-8 flex flex-col">
          <div className="md:mx-0 mx-auto">
            {/* Product Image */}
            <img
              src={auction.image}
              alt={auction.title}
              className="min-w-16 sm:mb-0 mix-blend-multiply object-contain w-32 h-32 mt-4 mb-6"
            />
          </div>
          <div className="sm:h-full flex flex-col justify-between">
            {/* Product Name */}
            <h2 className="md:text-start md:mb-4 font-tajawal-bold mb-2 text-xl font-semibold text-center text-gray-800 truncate">
              {auction.title}
            </h2>

            {/* Prices */}
            <div className="sm:flex-col sm:mb-4 flex justify-between mb-2 text-center">
              <div className="sm:flex-row sm:gap-4 flex flex-col">
                <p className="font-tajawal-regular text-gray-500">
                  السعر الحالي
                </p>
                <p className="font-tajawal-bold text-xl text-orange-500">
                  {auction.currentPrice.toLocaleString()} د.ع
                </p>
              </div>
              <div className="sm:flex-row sm:gap-4 md:mt-2 sm:mt-0 flex flex-col">
                <p className="font-tajawal-regular text-gray-500">
                  تبدأ المزايدة من
                </p>
                <p className="font-tajawal-bold text-xl text-orange-500">
                  {auction.startingPrice.toLocaleString()} د.ع
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:flex-row-reverse sm:mt-4 sm:gap-12 flex flex-col items-center justify-between">
          {/* Timer */}
          <div className="sm:w-auto sm:mb-0 flex items-center justify-center w-full p-2 mb-4 font-medium text-orange-500 border border-orange-500 rounded-md">
            <span className="font-tajawal-regular ml-2 text-gray-700">
              الوقت المتبقي
            </span>
            <p>{remainingTime}</p>
          </div>
          {/* Button */}
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <AuctionDialog
              id={Number(auction.id)}
              title={auction.title}
              endTime={auction.endTime}
              prices={prices}
              currentPrice={auction.currentPrice}
              image={auction.image}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
