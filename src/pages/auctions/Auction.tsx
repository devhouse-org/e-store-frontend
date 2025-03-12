import AuctionCard from "@/components/AuctionCard";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/LoadingState";
import axiosInstance from "@/utils/axiosInstance";
import { products } from "@/utils/data/products";
import { prices } from "@/utils/dummy_data/data";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  Facebook,
  HandCoins,
  Instagram,
  Mail,
  Share2,
  Truck,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
interface BackendAuction {
  id: number;
  x_name: string;
  x_studio_description: string;
  x_studio_starting_bid: number;
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
            response.data.auction.x_studio_starting_bid,
          startingPrice: response.data.auction.x_studio_starting_bid,
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

interface Auction {
  id: number;
  x_name: string;
  x_studio_description: string;
  x_studio_publish: boolean;
  x_studio_starting_bid: number;
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

const Auction = (props: Props) => {
  const { id } = useParams();
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [remainingTime, setRemainingTime] = useState<timeType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  const { data, isLoading: queryLoading, error } = useAuction(id || "");

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axiosInstance.get("/auctions", {
          params: {
            limit: 4,
          },
        });
        if (response.data.success && response.data.auctions.length > 0) {
          setAuctions(response.data.auctions);
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

  if (queryLoading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <Loader />
      </div>
    );
  }

  if (error || !data?.auction) {
    return <div className="container px-4 py-8 mx-auto">لا يوجد مزايدات</div>;
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

      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Auction details */}
      <div className="shadow-light-600 border-light-200 mb-8 overflow-hidden bg-white border rounded-md shadow-md">
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
            </div>
          </div>

          {/* Left */}
          <div className="flex-1 p-4">
            <div className="title_and_rate py-2 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <p className="truncate font-tajawal-bold text-[18px] md:text-[20px] lg:text-[22px] text-black">
                    {auction.title}
                  </p>

                  <p className="font-tajawal-regular text-md text-gray-500">
                    {auction.description}{" "}
                  </p>

                  <div className="flex items-center">
                    {/* {[1, 2, 3, 4, 5].map((_, index) => (
                      <span key={index}>
                        {4 >= index + 1 ? (
                          <TiStarFullOutline className="text-orange-400" />
                        ) : (
                          <TiStarOutline className="text-slate-400" />
                        )}
                      </span>
                    ))} */}
                    {/* <p className="px-2">(2000)</p> */}
                  </div>
                </div>
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
                <div className="bg-light-500 text--500 flex items-center justify-between w-full px-4 pt-2 pb-1 border-2 rounded-md">
                  <p className="font-tajawal-regular border-dark-100 pl-6 border-l">
                    {remainingTime?.seconds} ثانية
                  </p>
                  <p className="font-tajawal-regular border-dark-100 pl-6 border-l">
                    {remainingTime?.minutes} دقيقة
                  </p>
                  <p className="font-tajawal-regular border-dark-100 pl-6 border-l">
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

              <div className="flex flex-wrap gap-2">
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
              <p className="font-tajawal-bold pb-2 text-[24px] text-orange-500">
                {totalPrice <= 0
                  ? "0.00"
                  : (totalPrice + (auction.currentPrice || 0)).toLocaleString()}
                د.ع
              </p>
              <div className="flex justify-between">
                <button
                  disabled={totalPrice <= 0 || isLoading}
                  onClick={handlePlaceBid}
                  className="hover:bg-orange-500/90 disabled:bg-orange-300 px-4 py-2 text-white transition-colors bg-orange-500 rounded-md"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center w-full">
                      <Loader />
                    </div>
                  ) : (
                    <span className="font-tajawal-regular">مزايدة</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex-row flex flex-col items-center justify-between gap-6 px-4 pb-4 mt-8">
          <div className="lg:gap-12 lg:w-auto grid w-full grid-cols-3 gap-4 text-sm text-center">
            <div className="gap-y-1 flex flex-col items-center">
              <BadgeCheck size={24} className="lg:w-8 lg:h-8" />
              <div className="font-tajawal-medium flex flex-col">
                <p>منتجات اصلية</p>
                <p>وبضمان حقيقي</p>
              </div>
            </div>

            <div className="gap-y-1 flex flex-col items-center">
              <HandCoins size={24} className="lg:w-8 lg:h-8" />
              <div className="font-tajawal-medium flex flex-col">
                <p>دفع عند الاستلام</p>
              </div>
            </div>

            <div className="gap-y-1 flex flex-col items-center">
              <Truck size={24} className="lg:w-8 lg:h-8" />
              <div className="font-tajawal-medium flex flex-col">
                <p>شحن سريع وامن</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-orange-500">
            <h3 className="font-tajawal-medium text-gray-500">مشاركة: </h3>
            <Mail className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
            <Twitter className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
            <Share2 className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
            <Instagram className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
            <Facebook className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* other auctions */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-tajawal-bold mb-6 text-2xl font-bold">
            مزادات أُخرى
          </h2>
          <Link to="/auctions">
            <Button
              variant="default"
              label="رؤية المزيد"
              className="text-white"
            />
          </Link>
        </div>
        <div className="md:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-6">
          {loading ? (
            <div className="col-span-full py-8 text-center">
              <Loader />
            </div>
          ) : auctions.length > 0 ? (
            auctions.map((auction) => (
              <Link key={auction.id} to={`/auction/${auction.id}`}>
                <AuctionCard
                  auction={{
                    currentPrice: auction.x_studio_current_bid,
                    startingPrice: auction.x_studio_starting_bid,
                    endTime: auction.x_studio_end_date,
                    image:
                      "data:image/jpeg;base64," + auction.product?.image_1920,
                    title: auction.x_name,
                    description: auction.x_studio_description,
                    id: auction.id.toString(),
                  }}
                />
              </Link>
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              No other auctions available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auction;
