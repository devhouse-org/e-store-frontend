import { useState } from "react";
import {
  Heart,
  Share2,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Plus,
  Minus,
  Star,
  BadgeCheck,
  HandCoins,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { IconType } from "react-icons";

const Product = () => {
  const [selectedStorage, setSelectedStorage] = useState("256 GB");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://imgs.search.brave.com/Iu8pnU8UWn5aXg7p7t92b0hRJn_Qe4Lfey2zmgQEtd4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDEzbGk5dllnc0wu/anBn",
    "https://imgs.search.brave.com/eE2kKeLp3k12tKnSqo4v-fR4u5xaz_4HFn7LenjQfFE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/YjQ0ZWRlZmNhMzIx/YTFlMmQwYzJhYTYv/NjM0YWUzODc5OTAy/MzY2YjQyN2U0MGZi/X0RpbWVuc2lvbnMt/RGlnaXRhbC1BcHBs/ZS1pUGhvbmVzLUFw/cGxlLWlQaG9uZS0x/NC1JY29uLnN2Zw",
    "https://imgs.search.brave.com/eE2kKeLp3k12tKnSqo4v-fR4u5xaz_4HFn7LenjQfFE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/YjQ0ZWRlZmNhMzIx/YTFlMmQwYzJhYTYv/NjM0YWUzODc5OTAy/MzY2YjQyN2U0MGZi/X0RpbWVuc2lvbnMt/RGlnaXRhbC1BcHBs/ZS1pUGhvbmVzLUFw/cGxlLWlQaG9uZS0x/NC1JY29uLnN2Zw",
    "https://imgs.search.brave.com/qOD6uChP39kxoPmOSSZlF6aDCCMh4Xp5SAVE_CK82wA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/YjQ0ZWRlZmNhMzIx/YTFlMmQwYzJhYTYv/NjE0Yjk4ZTNhOTUw/OGE1ZjE0OTI4NWY3/X0RpbWVuc2lvbnMt/RGlnaXRhbC1BcHBs/ZS1pUGhvbmUtMTMt/UHJvLU1heC0zRC5q/cGc",
  ];

  const storageOptions = ["512 GB", "256 GB", "128 GB"];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className=" bg-white shadow my-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-gray-100 rounded-xl p-4 flex justify-center">
              <img
                src={images[currentImage]}
                alt="iPhone"
                className="w-full max-w-xs lg:w-80 object-contain transition-opacity duration-300"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 lg:gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`relative cursor-pointer group ${
                    currentImage === idx
                      ? "ring-2 ring-orange-500 rounded-lg"
                      : ""
                  }`}
                  onClick={() => setCurrentImage(idx)}
                >
                  <img
                    src={img}
                    alt={`iPhone view ${idx + 1}`}
                    className={`w-full rounded-lg border transition
                    ${currentImage === idx ? "opacity-100" : "opacity-60"}
                    group-hover:opacity-100`}
                  />
                  <div
                    className={`absolute inset-0 border-2 rounded-lg transition
                    ${
                      currentImage === idx
                        ? "border-orange-500"
                        : "border-transparent"
                    }
                    group-hover:border-orange-500`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <h1
                className="text-xl lg:text-2xl font-tajawal-medium text-right"
                dir="rtl"
              >
                ايفون 16 برو ماكس ثنائي الشريحة - لون بنفسجي
              </h1>
              <Heart className="text-gray-400 hover:text-red-500 cursor-pointer shrink-0" />
            </div>

            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-orange-500">
                  <Star size={"20"} />
                </span>
              ))}
              <span className="text-gray-500 mr-2">(2000+)</span>
            </div>
            <Separator className="bg-gray-200 p-[.5px]" />

            <div className="space-y-4">
              <h3 className="text-lg font-tajawal-medium text-right">
                ابرز الخصائص
              </h3>
              <ul className="space-y-2 font-tajawal-regular text-right text-blue-600 list-disc pr-4">
                <li>شاشة Super Retina XDR مقاس 6.7 بوصة مع تقنية ProMotion</li>
                <li>كاميرا احترافية ثلاثية بدقة 48 ميجابكسل</li>
                <li>معالج A17 Pro للأداء الاستثنائي</li>
                <li>تصميم من التيتانيوم</li>
              </ul>
            </div>
            <Separator className="bg-gray-200 p-[.5px]" />

            <div className="space-y-4">
              <h3 className="text-lg font-tajawal-medium text-right">
                سعة الذاكرة
              </h3>
              <div
                dir="ltr"
                className="flex flex-wrap font-tajawal-medium justify-end gap-2 lg:gap-4"
              >
                {storageOptions.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-3 lg:px-4 py-2 rounded border ${
                      selectedStorage === storage
                        ? "border-orange-500 text-orange-500"
                        : "border-gray-300"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex font-tajawal-medium justify-end items-center gap-4 border w-fit p-0.5 rounded">
              <Button
                variant="arrows"
                size="sm"
                className="text-red-600"
                Icon={Minus as IconType}
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              />
              <span className="px-2">{quantity}</span>
              <Button
                variant="arrows"
                size="sm"
                className="text-red-600"
                Icon={Plus as IconType}
                onClick={() => setQuantity(quantity + 1)}
              />
            </div>

            <div className="text-right">
              <div className="text-2xl lg:text-3xl font-tajawal-medium text-orange-500">
                د.ع. 1,720,000
              </div>
            </div>

            <Separator className="bg-gray-200 p-[.5px]" />

            <div className="flex gap-4 w-full lg:w-fit">
              <Button size="lg" className="flex-1" label="اشتري الآن" />
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                label="إضافة الى السلة"
              />
            </div>
          </div>
        </div>

        {/* The Last Line */}
        <div className="flex flex-col lg:flex-row justify-between mt-8 gap-6 items-center">
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
            <h3 className="text-gray-500">مشاركة: </h3>
            <Mail className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
            <Twitter className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
            <Share2 className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
            <Instagram className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
            <Facebook className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-gray-700" />
          </div>
        </div>
      </div>
      {/* Description section */}
      <div>
        <div className=" ">
          <h1>Desc</h1>
        </div>
      </div>
    </div>
  );
};

export default Product;
