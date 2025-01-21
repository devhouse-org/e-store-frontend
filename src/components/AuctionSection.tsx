import { auctionSectionData, prices } from "@/utils/dummy_data/data";
import { AuctionDialog } from "./AuctionDialog";
import AuctionCard from "./AuctionCard";
import { useEffect, useState } from "react";

type TimeType = {
  seconds: number;
  hours: number;
  minutes: number;
  days: number;
};
type Props = {};

const size = "sm"; // or pass it as a prop if needed

const AuctionSection = (props: Props) => {
  const [activeAuctionSectionItem, setActiveAuctionSectionItem] = useState(
    auctionSectionData[0]
  );

  const [remainingTime, setRemainingTime] = useState<TimeType | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const end = new Date(activeAuctionSectionItem.endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        setRemainingTime({
          seconds: 0,
          hours: 0,
          minutes: 0,
          days: 0,
        });
        clearInterval(intervalId);
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
  }, [activeAuctionSectionItem.endTime]);

  return (
    <div className="bg-white border border-slate-200 shadow-md rounded-md py-6 px-14">
      <div className="border-b ">
        <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit ">
          مزايدات
        </h1>
      </div>
      {/* main div */}
      <div className="my-4 flex flex-col-reverse lg:flex-row justify-between ">
        {/* Right Section */}
        <div className="flex-[.5] flex flex-col mt-6 lg:mt-0">
          <h1 className="font-tajawal-bold text-3xl mb-6 mt-4">
            {activeAuctionSectionItem.title}
          </h1>
          <h3 className="font-tajawal-medium mb-2">
            {activeAuctionSectionItem.description}
          </h3>
          {/* prices */}
          <div className="flex flex-col max-w-[16rem]">
            <div className="flex justify-between ">
              <h3 className="font-tajawal-regular">إعلى مزايدة</h3>
              <p className="text-orange-500 font-tajawal-bold">
                {activeAuctionSectionItem.currentPrice.toLocaleString()} د,ع
              </p>
            </div>
            <div className="flex justify-between ">
              <h3 className="font-tajawal-regular">تبدأ المزايدة من</h3>
              <p className="text-orange-500 font-tajawal-bold">
                {" "}
                {activeAuctionSectionItem.startingPrice} د,ع
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
              prices={prices}
              endTime={activeAuctionSectionItem.endTime}
              title={activeAuctionSectionItem.title}
              currentPrice={activeAuctionSectionItem.currentPrice}
              image={activeAuctionSectionItem.image}
            />
            <div className="mt-6">
              <h3 className="font-tajawal-regular">مزادات أخرى</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {auctionSectionData.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setActiveAuctionSectionItem(product)}
                  >
                    <div
                      className={`
                        relative group cursor-pointer transition-all duration-300 ease-in-out
                        ${
                          activeAuctionSectionItem.id === product.id
                            ? "border-orange-400 shadow-md"
                            : "border-transparent hover:shadow-md"
                        }
                        border-2 bg-white rounded-xl overflow-hidden text-center
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
                          src={product.image}
                          alt={product.title}
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
                          {product.title}
                        </h2>

                        <p
                          className={`
                            text-orange-500 font-tajawal-bold text-base 
                            group-hover:text-orange-600 transition-colors duration-300
                          `}
                        >
                          {product.currentPrice.toLocaleString()} د.ع
                        </p>
                      </div>
                      {/* {activeAuctionSectionItem.id === product.id && (
                        <div className="absolute top-0 right-0">
                          <Heart className="text-orange-500" />
                        </div>
                      )} */}

                      {activeAuctionSectionItem.id === product.id && (
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
                src={activeAuctionSectionItem.image}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionSection;
