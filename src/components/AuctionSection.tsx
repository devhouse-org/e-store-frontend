import { useEffect, useState } from "react";
import { AuctionDialog } from "./AuctionDialog";
import AuctionCard from "./AuctionCard";
import axiosInstance from "@/utils/axiosInstance";
import { prices } from "@/utils/dummy_data/data";

interface TimeType {
  seconds: number;
  hours: number;
  minutes: number;
  days: number;
}

interface Auction {
  id: number;
  x_name: string;
  x_studio_description: string;
  x_studio_publish: boolean;
  x_studio_starting_bid_1: number;
  x_studio_currency_id: [number, string];
  x_studio_start_date: string;
  x_studio_end_date: string;
  x_studio_current_user: [number, string] | false;
  x_studio_current_bid: number;
  x_studio_max_bid: number;
  x_studio_product: [number, string];
  product: {
    id: number;
    name: string;
    description: string | false;
    image_1920: string;
  };
}

const AuctionSection = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [activeAuction, setActiveAuction] = useState<Auction | null>(null);
  const [remainingTime, setRemainingTime] = useState<TimeType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axiosInstance.get("/auctions", {
          params: {
            limit: 3,
          },
        });
        if (response.data.success && response.data.auctions.length > 0) {
          setAuctions(response.data.auctions);
          setActiveAuction(response.data.auctions[0]);
        }
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  useEffect(() => {
    if (!activeAuction) return;

    const updateTime = () => {
      const now = new Date().getTime();
      const end = new Date(activeAuction.x_studio_end_date).getTime();
      const distance = end - now;

      if (distance < 0) {
        setRemainingTime({
          seconds: 0,
          hours: 0,
          minutes: 0,
          days: 0,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setRemainingTime({
        seconds,
        hours,
        minutes,
        days,
      });
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [activeAuction]);

  if (loading) {
    return (
      <div className="bg-white border border-slate-200 shadow-md rounded-md py-6 px-14">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-24 mb-4"></div>
          <div className="space-y-3">
            <div className="h-40 bg-slate-200 rounded"></div>
            <div className="h-8 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!activeAuction || auctions.length === 0) {
    return (
      <div className="bg-white border border-slate-200 shadow-md rounded-md py-6 px-14">
        <div className="text-center py-8">
          <h2 className="text-xl font-tajawal-medium text-gray-600">
            لا توجد مزايدات نشطة حالياً
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 shadow-md rounded-md py-6 px-14">
      <div className="border-b">
        <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit">
          مزايدات
        </h1>
      </div>
      {/* main div */}
      <div className="my-4 flex flex-col-reverse lg:flex-row justify-between">
        {/* Right Section */}
        <div className="flex-[.5] flex flex-col mt-6 lg:mt-0">
          <h1 className="font-tajawal-bold text-3xl mb-6 mt-4">
            {activeAuction.x_name}
          </h1>
          <h3 className="font-tajawal-medium mb-2">
            {activeAuction.x_studio_description || ""}
          </h3>
          {/* prices */}
          <div className="flex flex-col max-w-[16rem]">
            <div className="flex justify-between">
              <h3 className="font-tajawal-regular">أعلى مزايدة</h3>
              <p className="text-orange-500 font-tajawal-bold">
                {activeAuction.x_studio_current_bid.toLocaleString()}{" "}
                {activeAuction.x_studio_currency_id[1] === "IQD"
                  ? "د.ع"
                  : activeAuction.x_studio_currency_id[1]}
              </p>
            </div>
            <div className="flex justify-between">
              <h3 className="font-tajawal-regular">تبدأ المزايدة من</h3>
              <p className="text-orange-500 font-tajawal-bold">
                {activeAuction.x_studio_starting_bid_1.toLocaleString()}{" "}
                {activeAuction.x_studio_currency_id[1] === "IQD"
                  ? "د.ع"
                  : activeAuction.x_studio_currency_id[1]}
              </p>
            </div>
            <div className="">
              <h3 className="font-tajawal-medium mt-4">الوقت المتبقي</h3>
              <div className="px-4 flex justify-between items-center w-full bg-light-100 border pt-2 pb-1 my-4 text--500 rounded-md">
                <p className="font-tajawal-regular border-l text-center border-dark-100 px-2">
                  {remainingTime?.seconds} ثانية
                </p>
                <p className="font-tajawal-regular border-l text-center border-dark-100 px-2">
                  {remainingTime?.minutes} دقيقة
                </p>
                <p className="font-tajawal-regular border-l text-center border-dark-100 px-2">
                  {remainingTime?.hours} ساعة
                </p>
                <p className="font-tajawal-regular text-center border-dark-100 px-2">
                  {remainingTime?.days} يوم
                </p>
              </div>
            </div>
          </div>
          {/* section two */}
          <div className="mt-8">
            <AuctionDialog
              id={Number(activeAuction.id)}
              prices={prices}
              endTime={activeAuction.x_studio_end_date}
              title={activeAuction.x_name}
              currentPrice={activeAuction.x_studio_current_bid}
              image={`data:image/jpeg;base64,${activeAuction.product?.image_1920}`}
            />
            <div className="mt-6">
              <h3 className="font-tajawal-regular">مزادات أخرى</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {auctions.map((auction) => (
                  <div
                    key={auction.id}
                    onClick={() => setActiveAuction(auction)}
                  >
                    <div
                      className={`
                        relative group cursor-pointer transition-all duration-300 ease-in-out
                        ${
                          activeAuction.id === auction.id
                            ? "border-orange-400 shadow-md"
                            : "border-gray-500/5 hover:shadow-md"
                        }
                        border bg-white rounded-xl overflow-hidden text-center
                         hover:shadow-md w-40 p-2
                      `}
                    >
                      <div
                        className={`
                          relative overflow-hidden rounded-lg
                          flex justify-center items-center p-4
                        `}
                      >
                        <img
                          src={`data:image/jpeg;base64,${auction.product?.image_1920}`}
                          alt={auction.x_name}
                          className={`
                            transition-all duration-300
                            object-contain group-hover:scale-105 h-24 w-24
                          `}
                        />
                      </div>

                      <div className={`mt-3 space-y-2 px-2`}>
                        <h2
                          className={`
                            text-gray-800 font-tajawal-medium truncate text-sm
                            group-hover:text-orange-500 transition-colors duration-300
                          `}
                        >
                          {auction.x_name}
                        </h2>

                        <p
                          className={`
                            text-orange-500 font-tajawal-bold text-base 
                            group-hover:text-orange-600 transition-colors duration-300
                          `}
                        >
                          {auction.x_studio_current_bid.toLocaleString()}{" "}
                          {auction.x_studio_currency_id[1]}
                        </p>
                      </div>

                      {activeAuction.id === auction.id && (
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Left Section */}
        <div className="flex-[.5] flex justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="w-[400px] h-[400px]">
              <img
                className="w-full h-full object-cover"
                src={`data:image/jpeg;base64,${activeAuction.product?.image_1920}`}
                alt={activeAuction.x_name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionSection;
