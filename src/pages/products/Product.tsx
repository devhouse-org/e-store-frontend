import { useState, useEffect } from "react";
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
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { IconType } from "react-icons";
import ReviewCard from "@/components/ReviewCard";
import ProductCard from "@/components/ProductCard";
import Slider from "react-slick";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, products } from "@/utils/data/products";
import { reviews } from "@/utils/data/reviews";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import axiosInstance from "@/utils/axiosInstance";

const Product = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState("256 GB");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://imgs.search.brave.com/Iu8pnU8UWn5aXg7p7t92b0hRJn_Qe4Lfey2zmgQEtd4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDEzbGk5dllnc0wu/anBn",
    "https://imgs.search.brave.com/eE2kKeLp3k12tKnSqo4v-fR4u5xaz_4HFn7LenjQfFE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/YjQ0ZWRlZmNhMzIx/YTFlMmQwYzJhYTYv/NjM0YWUzODc5OTAy/MzY2YjQyN2U0MGZi/X0RpbWVuc2lvbnMt/RGlnaXRhbC1BcHBs/ZS1pUGhvbmVzLUFw/cGxlLWlQaG9uZS0x/NC1JY29uLnN2Zw",
    "https://imgs.search.brave.com/eE2kKeLp3k12tKnSqo4v-fR4u5xaz_4HFn7LenjQfFE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/YjQ0ZWRlZmNhMzIx/YTFlMmQwYzJhYTYv/NjM0YWUzODc5OTAy/MzY2YjQyN2U0MGZi/X0RpbWVuc2lvbnMt/RGlnaXRhbC1BcHBs/ZS1pUGhvbmVzLUFw/cGxlLWlQaG9uZS0x/NC1JY29uLnN2Zw",
    "https://imgs.search.brave.com/qOD6uChP39kxoPmOSSZlF6aDCCMh4Xp5SAVE_CK82wA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/YjQ0ZWRlZmNhMzIx/YTFlMmQwYzJhYTYv/NjE0Yjk4ZTNhOTUw/OGE1ZjE0OTI4NWY3/X0RpbWVuc2lvbnMt/RGlnaXRhbC1BcHBs/ZS1pUGhvbmUtMTMt/UHJvLU1heC0zRC5q/cGc",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const storageOptions = ["512 GB", "256 GB", "128 GB"];

  const { addToWishlist, removeFromWishlist, isWishlisted } =
    useWishlistStore();
  const isInWishlist = product ? isWishlisted(product.id) : false;

  const { addToComparison, removeFromComparison, isCompared } =
    useComparisonStore();
  const isInComparison = product ? isCompared(product.id) : false;

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        storage: selectedStorage,
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleWishlistClick = () => {
    if (product) {
      if (isInWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  const handleComparisonClick = () => {
    if (product) {
      if (isInComparison) {
        removeFromComparison(product.id);
      } else {
        addToComparison(product);
      }
    }
  };

  // Get 4 related products (excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== id && p.category === product?.category)
    .slice(0, 4);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          "/product-details",
          { product_id: id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data.error) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.data();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-gray-500 font-tajawal-medium">
            جاري تحميل المنتج...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 font-tajawal-medium text-lg">
            {error || "المنتج غير موجود"}
          </p>
          <Button
            onClick={() => window.history.back()}
            className="mt-4"
            variant="outline"
            label="العودة للخلف"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="px-12 py-6">
      <div className="bg-white w-full p-4 rounded-md shadow my-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-gray-100 rounded-xl p-4 flex justify-center">
              <img
                src={product.image}
                alt={product.name}
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
                {product.name}
              </h1>
              <Heart
                className={`cursor-pointer transition-colors ${
                  isInWishlist
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
                onClick={handleWishlistClick}
              />
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
                <li>{product.description}</li>
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
                {product.price.toLocaleString()} د.ع
              </div>
            </div>

            <Separator className="bg-gray-200 p-[.5px]" />

            <div className="flex gap-4 w-full lg:w-fit">
              <Button
                size="lg"
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                onClick={handleBuyNow}
                label="شراء الآن"
              />
              <Button
                variant="outline"
                size="lg"
                className="flex-1 bg-orange-100 text-orange-500 hover:bg-orange-200"
                onClick={handleAddToCart}
                label="إضافة للسلة"
              />
              <Button
                variant="outline"
                size="lg"
                className={`flex-1 ${
                  isInComparison
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-orange-100 text-orange-500 hover:bg-orange-200"
                }`}
                onClick={handleComparisonClick}
                label={isInComparison ? "إزالة من المقارنة" : "إضافة للمقارنة"}
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
        <div className="bg-white border border-light-100 p-4 shadow-md flex flex-col lg:flex-row gap-4">
          {/* Product Description Section */}
          <div className="w-full md:flex-[0.8]">
            <div className="flex flex-col justify-between">
              <div className="border-b">
                <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit">
                  وصف المنتج
                </h1>
              </div>
              <div className="pt-4">
                <p className="text-right text-sm md:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="w-full md:flex-[0.3]">
            <div className="flex flex-col justify-between">
              <div className="border-b">
                <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit">
                  المراجعات
                </h1>
              </div>
              <div className="flex flex-col pt-4 gap-y-2">
                <ReviewCard reviews={reviews} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md border shadow-light-600 mt-2 rounded-md overflow-hidden mb-8 p-4">
          <div className="border-b mb-4">
            <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit">
              منتجات ذات صلة
            </h1>
          </div>
          <Slider className="my-4" {...settings}>
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="px-2">
                <ProductCard product={relatedProduct} size="sm" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Product;
