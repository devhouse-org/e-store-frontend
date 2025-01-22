import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

type TimeType = {
  seconds: number;
  hours: number;
  minutes: number;
  days: number;
};

type AuctionItemType = {
  prices: any;
  endTime: any;
  currentPrice?: number;
  image?: string;
  title?: string;
};

interface AuctionDialogProps {
  endTime: string;
  prices?: number[];
}

export function AuctionDialog({
  prices = [],
  endTime,
  currentPrice,
  image,
  title,
}: AuctionItemType) {
  const imgSrc =
    "https://ardes.bg/uploads/original/konzola-xbox-series-x-1tb-466538.jpg";
  const [remainingTime, setRemainingTime] = useState<TimeType | null>(null);

  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

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
  }, [endTime]);

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

  const totalPrice = selectedPrices.reduce((acc, value) => acc + value, 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="زايد الان" variant={"blue"} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="py-8" dir="rtl">
          <div className="flex gap-x-4">
            <div className="w-[80px] h-[80px]">
              <img src={image ? image : imgSrc} alt="" />
            </div>
            <p className="font-tajawal-bold text-xl mt-4 max-w-[250px] truncate">
              {title}
            </p>
          </div>

          <div className="px-4 flex justify-between items-center w-full  border-2 pt-2 pb-1 my-4 bg-light-500 text--500 rounded-md">
            <p className="font-tajawal-regular border-l border-dark-100 pl-6">
              {remainingTime?.seconds} ثانية
            </p>
            <p className="font-tajawal-regular border-l border-dark-100 pl-6">
              {remainingTime?.minutes} دقيقة
            </p>
            <p className="font-tajawal-regular border-l border-dark-100 pl-6">
              {remainingTime?.hours} ساعة
            </p>
            <p className="font-tajawal-regular">{remainingTime?.days} يوم</p>
          </div>
          <div className="px-2 flex justify-between items-center w-full border-2 pt-2 pb-1 my-4 border-orange-500 text-orange-500 rounded-md">
            <p className="font-tajawal-regular">السعر الحالي</p>
            <p className="font-tajawal-regular">
              {currentPrice?.toLocaleString()} د.ع
            </p>
          </div>

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
        <DialogFooter className="sm:justify-start items-center gap-2">
          <DialogClose asChild>
            <Button
              label="إلغاء"
              className="w-full flex-[.7]"
              variant={"secondary"}
            />
          </DialogClose>

          <div
            className={`p-2 flex justify-between items-center w-full bg-orange-500
                            hover:bg-orange-500/90 transition ease-in-out cursor-pointer 
                            rounded-md text-white ${
                              isAnimating && "bg-orange-300"
                            }`}
          >
            <p className="font-tajawal-regular">
              {totalPrice.toLocaleString()}د.ع
            </p>
            <p className="font-tajawal-regular">تأكيد</p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
