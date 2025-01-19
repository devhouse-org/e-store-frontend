import { auctionSectionData, prices } from "@/utils/dummy_data/data";
import { AuctionDialog } from "./AuctionDialog";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

type TimeType = {
  seconds: number;
  hours: number;
  minutes: number;
  days: number;
};
type Props = {};

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
              <div className="px-4 flex justify-between items-center w-full bg-light-100 border pt-2 pb-1 my-4  text--500 rounded-md">
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
              <div className="flex flex-wrap gap-4">
                {auctionSectionData.map((product) => (
                  <div onClick={() => setActiveAuctionSectionItem(product)}>
                    <ProductCard
                      size="sm"
                      productName={product.title}
                      productPrice={product.currentPrice}
                      productImage={product.image}
                      activeCard={activeAuctionSectionItem.id === product.id}
                    />
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
