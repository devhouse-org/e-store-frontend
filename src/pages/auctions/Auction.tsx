import { AuctionDialog } from "@/components/AuctionDialog";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { prices } from "@/utils/dummy_data/data";
import { BadgeCheck, Facebook, HandCoins, Heart, Instagram, Mail, Share2, Truck, Twitter, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

type Props = {};

type timeType = {
  seconds: number;
  hours: number;
  minutes: number;
  days: number;
};
const Auction = (props: Props) => {
  const { id } = useParams();
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const [remainingTime, setRemainingTime] = useState<timeType | null>(null);

  const endTime = "2024-12-15T12:00:00";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        setRemainingTime({
          seconds: 0,
          hours: 0,
          minutes: 0,
          days: 0,
        });
        clearInterval(intervalId); // Stop the interval when time is up
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
  }, [endTime]);

  const totalPrice = selectedPrices.reduce((acc, value) => acc + value, 0);

  const handlePriceSelection = (priceValue: number) => {
    setSelectedPrices((prev) => {
      const newSelectedPrices = prev.includes(priceValue)
        ? prev.filter((value) => value !== priceValue)
        : [...prev, priceValue];

      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);

      return newSelectedPrices;
    });
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Item Details */}
      <div className="mb-8 bg-white shadow-md shadow-light-600 rounded-md border border-light-200 overflow-hidden">
        <div className=" flex">
          {/* Right */}
          <div className="flex-1 p-4 max-w-[650px]">
            <div className="active_image">
              <div className="replace_with_img w-full h-[300px] rounded-md border-2 bg-dark-300"></div>
              <div className="other_images flex flex-wrap items-center gap-2 my-2">
                {[1, 2, 3, 4].slice(0, 12).map((item) => (
                  <div className="cursor-pointer border-2 bg-green-200 h-24 w-32 object-contain rounded-md" />
                ))}
              </div>
            </div>
          </div>

          {/* Left */}
          <div className="flex-1 p-4">
            <div className="title_and_rate py-2 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p className="truncate font-tajawal-bold text-[18px] md:text-[20px] lg:text-[22px] text-black">
                    ايفون 16 برو ماكس ثنائي الشريحة - لون بنفسجي
                  </p>

                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <>
                        {4 >= index + 1 ? (
                          <TiStarFullOutline className="text-orange-400" />
                        ) : (
                          <TiStarOutline className="text-slate-400" />
                        )}
                      </>
                    ))}
                    <p className="px-2">(2000)</p>
                  </div>
                </div>
                <Heart />
              </div>
            </div>
            <div className="current_price py-4 border-b">
              <p className="font-tajawal-bold text-black">السعر الحالي</p>

              <p className="font-tajawal-bold pb-2 text-[24px] text-orange-500">
                720,000 د.ع
              </p>
            </div>
            <div className="time_remained py-4 border-b">
              <p className="font-tajawal-bold pb-2 text-black">
                الوقت المتبقي لنهاية المزاد
              </p>
              <div className="w-[380px]">
                <div className="px-4 flex justify-between items-center w-full  border-2 pt-2 pb-1 bg-light-500 text--500 rounded-md">
                  <p className="font-tajawal-regular border-l border-dark-100 pl-6">
                    {remainingTime?.seconds} ثانية
                  </p>
                  <p className="font-tajawal-regular border-l border-dark-100 pl-6">
                    {remainingTime?.minutes} دقيقة
                  </p>
                  <p className="font-tajawal-regular border-l border-dark-100 pl-6">
                    {remainingTime?.hours} ساعة
                  </p>
                  <p className="font-tajawal-regular">
                    {remainingTime?.days} يوم
                  </p>
                </div>
              </div>
            </div>
            <div className="auction_prices py-4 border-b">
              <p className="font-tajawal-bold pb-2 text-black">ضع سعرك</p>

              <div className="flex gap-2 flex-wrap">
                {prices.map(
                  (price: { id: number; label: string; value: number }) => (
                    <div
                      onClick={() => handlePriceSelection(price.value)}
                      key={price.id}
                      className={`cursor-pointer hover:border-orange-400 pt-2 transition ease-in-out font-tajawal-regular bg-light-500 px-2 py-1 border rounded-md border-dark-200 ${selectedPrices.includes(price.value)
                        ? "bg-orange-200 border-orange-400"
                        : ""
                        }`}
                    >
                      <p className="text-[16px]">{price.label}</p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="details_footer py-4">
              <p className="font-tajawal-bold text-black">سعر المزايدة</p>
              <p className="font-tajawal-bold pb-2 text-[24px] text-orange-500">
                {totalPrice.toLocaleString()}د.ع
              </p>
              <div className="flex justify-between">
                <Button disabled={totalPrice <= 0} label="مزايدة" />
              </div>
            </div>
          </div>


        </div>
        <div className="px-4 pb-4 flex flex-col lg:flex-row justify-between mt-8 gap-6 items-center">
          <div className="grid grid-cols-3 gap-4 lg:gap-12 text-center text-sm w-full lg:w-auto">
            <div className="items-center flex flex-col gap-y-1">
              <BadgeCheck size={24} className="lg:w-8 lg:h-8" />
              <div className="flex-col flex font-tajawal-medium">
                <p>منتجات اصلية</p>
                <p>وبضمان حقيقي</p>
              </div>
            </div>

            <div className="items-center flex flex-col gap-y-1">
              <HandCoins size={24} className="lg:w-8 lg:h-8" />
              <div className="flex-col flex font-tajawal-medium">
                <p>دفع عند الاستلام</p>
              </div>
            </div>

            <div className="items-center flex flex-col gap-y-1">
              <Truck size={24} className="lg:w-8 lg:h-8" />
              <div className="flex-col flex font-tajawal-medium">
                <p>شحن سريع وامن</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 text-orange-500">
            <h3 className="text-gray-500 font-tajawal-medium">مشاركة: </h3>
            <Mail className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
            <Twitter className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
            <Share2 className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
            <Instagram className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
            <Facebook className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
          </div>
        </div>
      </div>

      {/* More Auctions */}
      <div className="shadow-md border shadow-light-600 mt-2 rounded-md overflow-hidden mb-8 p-4">
        <h1 className="font-tajawal-bold border-b mb-4 text-black text-[18px]">
          مزايدات اخرى
        </h1>
        <div className="flex hide-scrollbar overflow-x-scroll gap-x-4 py-2">
          {[1, 2, 3, 4, 5].map(() => (
            <ProductCard
              size="sm"
              productName="ريلمي 9 آي - اسود"
              productPrice={165000}
              productImage="https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw" // Replace with the actual image URL
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Auction;
