import { AuctionDialog } from "@/components/AuctionDialog";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { prices } from "@/utils/dummy_data/data";
import {
  BadgeCheck,
  Facebook,
  HandCoins,
  Heart,
  Instagram,
  Mail,
  Share2,
  Truck,
  Twitter,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { products } from "@/utils/data/products";
// import { toast } from "sonner";

interface BackendAuction {
  id: number;
  x_name: string;
  x_studio_description: string;
  x_studio_starting_bid_1: number;
  x_studio_current_bid: number;
  x_studio_end_date: string;
  x_studio_product: [number, string] | false;
  product?: {
    name: string;
    description: string;
    image_1920: string;
  };
}

interface BackendResponse {
  success: boolean;
  auction: BackendAuction;
}

const formatBase64Image = (base64String: string) => {
  if (!base64String) return "";
  if (base64String.startsWith("data:")) return base64String;
  return `data:image/jpeg;base64,${base64String}`;
};

const useAuction = (id: string) => {
  return useQuery({
    queryKey: ["auction", id],
    queryFn: async () => {
      const response = await axiosInstance.get<BackendResponse>(
        `/auctions/${id}`
      );
      return {
        success: response.data.success,
        auction: {
          id: response.data.auction.id.toString(),
          title: response.data.auction.x_name,
          currentPrice:
            response.data.auction.x_studio_current_bid ||
            response.data.auction.x_studio_starting_bid_1,
          startingPrice: response.data.auction.x_studio_starting_bid_1,
          endTime: response.data.auction.x_studio_end_date,
          image: formatBase64Image(
            response.data.auction.product?.image_1920 || ""
          ),
          description: response.data.auction.x_studio_description,
        },
      };
    },
    enabled: !!id,
  });
};

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

  const { data, isLoading, error } = useAuction(id || "");

  useEffect(() => {
    if (!data?.auction) return;

    let intervalId: NodeJS.Timeout;
    const updateTime = () => {
      const now = new Date().getTime();
      const end = new Date(data.auction.endTime).getTime();
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
    intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [data?.auction]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error || !data?.auction) {
    return <div className="container mx-auto px-4 py-8">Auction not found</div>;
  }

  const auction = data.auction;
  // Get related products (you might want to implement a proper related products logic)
  const relatedProducts = products.slice(0, 4); // Just get first 4 products for example

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

  const handlePlaceBid = async () => {
    if (totalPrice <= 0) return;

    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        // toast.error("يرجى تسجيل الدخول أولاً");
        return;
      }

      const response = await axiosInstance.post(`/auctions/${id}/bid`, {
        bidAmount: totalPrice + (auction.currentPrice || 0),
        partnerId: Number(userId),
      });

      if (response.data.success) {
        // toast.success("تم وضع المزايدة بنجاح");
        // Refresh the auction data
        window.location.reload();
      }
    } catch (error: any) {
      // toast.error(
      //   error.response?.data?.message || "حدث خطأ أثناء وضع المزايدة"
      // );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Auction details */}
      <div className="mb-8 bg-white shadow-md shadow-light-600 rounded-md border border-light-200 overflow-hidden">
        <div className=" flex">
          {/* Right */}
          <div className="flex-1 p-4 max-w-[650px]">
            <div className="active_image">
              <img
                src={auction.image}
                alt={auction.title}
                className="w-full h-[300px] rounded-md border-2 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/path/to/fallback/image.jpg";
                  console.log("Failed to load image:", auction.image);
                }}
              />
              <div className="other_images flex flex-wrap items-center gap-2 my-2">
                {[1, 2, 3, 4].slice(0, 12).map((item) => (
                  <div
                    key={item}
                    className="cursor-pointer border-2 bg-green-200 h-24 w-32 object-contain rounded-md"
                  />
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
                    {auction.title}
                  </p>

                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <span key={index}>
                        {4 >= index + 1 ? (
                          <TiStarFullOutline className="text-orange-400" />
                        ) : (
                          <TiStarOutline className="text-slate-400" />
                        )}
                      </span>
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
                {auction.currentPrice.toLocaleString()} د.ع
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
                      className={`cursor-pointer hover:border-orange-400 pt-2 transition ease-in-out font-tajawal-regular bg-light-500 px-2 py-1 border rounded-md border-dark-200 ${
                        selectedPrices.includes(price.value)
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
              <p className="font-tajawal-regular">
                {totalPrice <= 0 ? (
                  ""
                ) : (
                  <>
                    {totalPrice.toLocaleString()} د.ع +{" "}
                    {auction.currentPrice.toLocaleString()} د.ع
                  </>
                )}
              </p>
              <p className="font-tajawal-bold pb-2 text-[24px] text-orange-500">
                {totalPrice <= 0
                  ? "0.00"
                  : (totalPrice + (auction.currentPrice || 0)).toLocaleString()}
                د.ع
              </p>
              <div className="flex justify-between">
                <Button
                  disabled={totalPrice <= 0}
                  label="مزايدة"
                  onClick={handlePlaceBid}
                />
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

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">منتجات ذات صلة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auction;
