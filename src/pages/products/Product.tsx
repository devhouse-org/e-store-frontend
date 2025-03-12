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
import { products } from "@/utils/data/products";
import { reviews } from "@/utils/data/reviews";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

// Update Product interface to match API response
interface ProductDetails {
  id: number;
  name: string;
  list_price: number;
  description?: string;
  description_sale?: string;
  image_1920: string;
  product_variant_ids?: number[];
  attribute_line_ids?: number[];
  attributes?: {
    id: number;
    name: string;
    display_type: string;
    values: {
      id: number;
      name: string;
      price_extra: number;
    }[];
  }[];
}

const useProductDetails = (productId: string | undefined) => {
  return useQuery<ProductDetails, Error>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await axiosInstance.post<ProductDetails>(
        "/products/product-details",
        { product_id: parseInt(productId || "0") }
      );
      return response.data;
    },
    enabled: !!productId,
  });
};

const Product = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: product, isLoading, error } = useProductDetails(id);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, number>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    product?.image_1920,
    // Add more images if available from the API
  ].filter(Boolean);

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

  const { addToWishlist, removeFromWishlist, isWishlisted } =
    useWishlistStore();
  const isInWishlist = product ? isWishlisted(product.id.toString()) : false;

  const { addToComparison, removeFromComparison, isCompared } =
    useComparisonStore();
  const isInComparison = product ? isCompared(product.id.toString()) : false;

  const handleAddToCart = () => {
    if (product) {
      const selectedAttributeValues = Object.entries(selectedAttributes).map(
        ([attributeId, valueId]) => {
          const attribute = product.attributes?.find(
            (attr) => attr.id === parseInt(attributeId)
          );
          const value = attribute?.values.find((val) => val.id === valueId);
          return {
            attribute_id: parseInt(attributeId),
            value_id: valueId,
            attribute_name: attribute?.name,
            value_name: value?.name,
          };
        }
      );

      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.list_price,
        image: product.image_1920,
        quantity: quantity,
        selected_attributes: selectedAttributeValues,
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
        removeFromWishlist(product.id.toString());
      } else {
        addToWishlist({
          id: product.id.toString(),
          name: product.name,
          price: product.list_price,
          image: product.image_1920,
          description: product.description || product.description_sale || "",
        });
      }
    }
  };

  const handleComparisonClick = () => {
    if (product) {
      if (isInComparison) {
        removeFromComparison(product.id.toString());
      } else {
        addToComparison({
          id: product.id.toString(),
          name: product.name,
          price: product.list_price,
          image: product.image_1920,
          description: product.description || product.description_sale || "",
        });
      }
    }
  };

  const handleAttributeChange = (attributeId: number, valueId: number) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: valueId,
    }));
  };

  // Get 4 related products (excluding current product)
  const relatedProducts = products
    .filter((p) => p.id.toString() !== id)
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-8 h-8 border-t-2 border-b-2 border-orange-500 rounded-full"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Product not found
      </div>
    );
  }

  return (
    <div className="px-12 py-6">
      <div className="w-full p-4 my-10 bg-white rounded-md shadow">
        <div className="lg:grid-cols-12 grid grid-cols-1 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-xl flex justify-center p-4 bg-gray-100">
              <img
                src={`data:image/png;base64,${product.image_1920}`}
                alt={product.name}
                className="lg:w-80 mix-blend-multiply object-contain w-full max-w-xs transition-opacity duration-300"
              />
            </div>
            {images.length > 1 && (
              <div className="lg:gap-4 grid grid-cols-4 gap-2">
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
                      alt={`Product view ${idx + 1}`}
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
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h1
                className="text-wrap max-w-[90%] text-xl lg:text-2xl font-tajawal-medium text-right"
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
              <span className="mr-2 text-gray-500">(2000+)</span>
            </div>
            <Separator className="bg-gray-200 p-[.5px]" />

            <div className="space-y-4">
              <h3 className="font-tajawal-medium text-lg text-right">
                ابرز الخصائص
              </h3>
              <ul className="font-tajawal-regular pr-4 space-y-2 text-right text-blue-600 list-disc">
                <li>
                  <div
                    className="line-clamp-2 mb-2 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: product?.description || "",
                    }}
                  />
                </li>
              </ul>
            </div>
            <Separator className="bg-gray-200 p-[.5px]" />

            {/* Product Attributes */}
            {product.attributes &&
              product.attributes.map((attribute) => (
                <div key={attribute.id} className="space-y-4">
                  <h3 className="font-tajawal-medium text-lg text-right">
                    {attribute.name}
                  </h3>
                  <div
                    dir="ltr"
                    className="font-tajawal-medium lg:gap-4 flex flex-wrap justify-end gap-2"
                  >
                    {attribute.values.map((value) => (
                      <button
                        key={value.id}
                        onClick={() =>
                          handleAttributeChange(attribute.id, value.id)
                        }
                        className={`px-3 lg:px-4 py-2 rounded border ${
                          selectedAttributes[attribute.id] === value.id
                            ? "border-orange-500 text-orange-500"
                            : "border-gray-300"
                        }`}
                      >
                        {value.name}
                        {value.price_extra > 0 && ` (+${value.price_extra})`}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

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
              <div className="lg:text-3xl font-tajawal-medium text-2xl text-orange-500">
                {product.list_price.toLocaleString()} د.ع
              </div>
            </div>

            <Separator className="bg-gray-200 p-[.5px]" />

            <div className="lg:w-fit flex w-full gap-4">
              <Button
                size="lg"
                className="hover:bg-orange-600 flex-1 bg-orange-500"
                onClick={handleBuyNow}
                label="شراء الآن"
              />
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-orange-200 flex-1 text-orange-500 bg-orange-100"
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
        <div className="lg:flex-row flex flex-col items-center justify-between gap-6 mt-8">
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
            <h3 className="text-gray-500">مشاركة: </h3>
            <Mail className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
            <Twitter className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
            <Share2 className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
            <Instagram className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
            <Facebook className="lg:w-8 lg:h-8 hover:text-gray-700 w-6 h-6 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Description section */}
      <div>
        <div className="border-light-100 lg:flex-row flex flex-col gap-4 p-4 bg-white border shadow-md">
          {/* Product Description Section */}
          <div className="w-full md:flex-[0.8]">
            <div className="flex flex-col justify-between">
              <div className="border-b">
                <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit">
                  وصف المنتج
                </h1>
              </div>
              <div className="pt-4">
                <div
                  className="md:text-base text-sm leading-relaxed text-right"
                  dangerouslySetInnerHTML={{
                    __html: product?.description || "",
                  }}
                />
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
              <div className="gap-y-2 flex flex-col pt-4">
                <ReviewCard reviews={reviews} />
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-light-600 p-4 mt-2 mb-8 overflow-hidden bg-white border rounded-md shadow-md">
          <div className="mb-4 border-b">
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
