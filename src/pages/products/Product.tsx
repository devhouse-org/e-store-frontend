import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Mail,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Product = () => {
  const [selectedStorage, setSelectedStorage] = useState("256 GB");
  const [quantity, setQuantity] = useState(1);

  const images = [
    "https://imgs.search.brave.com/Iu8pnU8UWn5aXg7p7t92b0hRJn_Qe4Lfey2zmgQEtd4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDEzbGk5dllnc0wu/anBn",
    "https://imgs.search.brave.com/iGxPvmk46BBq4NJKisP10Uf2NIGULJ7NBvYPeGzbM-s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXBwbGUuY29tL3Yv/aXBob25lLTE2LXBy/by9kL2ltYWdlcy9z/cGVjcy9kaW1lbnNp/b25zX2lwaG9uZV9w/cm9fbWF4X19kbHh3/MWMwZnpqeXFfbGFy/Z2UuanBn",
    "https://imgs.search.brave.com/7UVNpc_k7URvAA_cPcLkgXQEyoZjk5YqGFPhMVokfBc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/YjQ0ZWRlZmNhMzIx/YTFlMmQwYzJhYTYv/NWY4OWE2MWZjZTNm/YjMyOGE5YWJkM2U2/X0RpbWVuc2lvbnMt/RGlnaXRhbC1BcHBs/ZS1pUGhvbmVzLUFw/cGxlLWlQaG9uZS0x/Mi1JY29uLnN2Zw",
    "https://imgs.search.brave.com/qOD6uChP39kxoPmOSSZlF6aDCCMh4Xp5SAVE_CK82wA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/YjQ0ZWRlZmNhMzIx/YTFlMmQwYzJhYTYv/NjE0Yjk4ZTNhOTUw/OGE1ZjE0OTI4NWY3/X0RpbWVuc2lvbnMt/RGlnaXRhbC1BcHBs/ZS1pUGhvbmUtMTMt/UHJvLU1heC0zRC5q/cGc",
  ];

  const storageOptions = ["512 GB", "256 GB", "128 GB"];

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-xl p-4">
            <img
              src={images[0]}
              alt="iPhone"
              className="w-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`iPhone view ${idx + 1}`}
                className="w-full rounded-lg cursor-pointer hover:opacity-75 transition"
              />
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-semibold text-right" dir="rtl">
              ايفون 16 برو ماكس ثنائي الشريحة - لون بنفسجي
            </h1>
            <Heart className="text-gray-400 hover:text-red-500 cursor-pointer" />
          </div>

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400">
                ★
              </span>
            ))}
            <span className="text-gray-500 mr-2">(2000+)</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-right">ابرز الخصائص</h3>
            <ul className="space-y-2 text-right text-blue-600">
              <li>شاشة Super Retina XDR مقاس 6.7 بوصة مع تقنية ProMotion</li>
              <li>كاميرا احترافية ثلاثية بدقة 48 ميجابكسل</li>
              <li>معالج A17 Pro للأداء الاستثنائي</li>
              <li>تصميم من التيتانيوم</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-right">سعة الذاكرة</h3>
            <div className="flex justify-end gap-4">
              {storageOptions.map((storage) => (
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-4 py-2 rounded-full border ${
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

          <div className="flex justify-end items-center gap-4">
            <button
              onClick={() => setQuantity(Math.min(quantity + 1, 10))}
              className="px-3 py-1 border rounded-lg"
            >
              +
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              className="px-3 py-1 border rounded-lg"
            >
              -
            </button>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-orange-500">
              د.ع. 1,720,000
            </div>
          </div>

          <div className="flex gap-4">
            <Button size={"lg"} className="flex-1" label="اشتري الآن" />
            <Button
              variant={"outline"}
              size={"lg"}
              className="flex-1"
              label="إضافة الى السلة"
            />
          </div>

          <div className="flex justify-center gap-6 text-gray-500">
            <Mail className="w-6 h-6 cursor-pointer hover:text-gray-700" />
            <Twitter className="w-6 h-6 cursor-pointer hover:text-gray-700" />
            <Share2 className="w-6 h-6 cursor-pointer hover:text-gray-700" />
            <Instagram className="w-6 h-6 cursor-pointer hover:text-gray-700" />
            <Facebook className="w-6 h-6 cursor-pointer hover:text-gray-700" />
            {/* <WhatsApp className="w-6 h-6 cursor-pointer hover:text-gray-700" /> */}
          </div>

          <div className="flex justify-around text-center text-sm text-gray-500">
            <div>
              <div className="mb-2">✓</div>
              <div>شحن سريع ومجاني</div>
            </div>
            <div>
              <div className="mb-2">↻</div>
              <div>دفع عند الاستلام</div>
            </div>
            <div>
              <div className="mb-2">⌚</div>
              <div>ضمانات اصلية وإمكانية تقسيط</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
