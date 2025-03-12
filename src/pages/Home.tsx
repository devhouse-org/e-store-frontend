import { useRef, useState } from "react";
import { Product, products } from "@/utils/data/products";
import AuctionSection from "@/components/AuctionSection";
import Banner from "@/components/Banner";
import CarouselCard from "@/components/CarouselCard";
import SpecialProducts from "@/components/SpecialProducts";
import { Button } from "@/components/ui/button";
import {
  carouselCardData,
  productsData,
  techLogos,
} from "@/utils/dummy_data/data";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/ui/LoadingState";

import { useCartStore } from "@/store/useCartStore";
import LogoPlaceholder from "@/assets/images/Logo.png";

interface Banner {
  id: number;
  x_name: string;
  x_studio_banner_image: string;
  x_studio_start_date: string;
  x_studio_end_date: string;
  x_studio_publish: boolean;
  x_studio_discount: number;
  x_studio_product_link: number;
}

interface BannersResponse {
  success: boolean;
  banners: Banner[];
}

interface Brand {
  id: number;
  name: string;
  sequence: number;
  html_color: boolean | string;
  display_name: string;
  image: string | null;
}

interface BrandsResponse {
  id: number;
  name: string;
  display_type: string;
  create_variant: string;
  values: Brand[];
}

interface AdBanner {
  id: number;
  x_name: string;
  x_studio_banner_image: string;
  x_studio_start_date: string;
  x_studio_end_date: string;
  x_studio_publish: boolean;
  x_studio_discount: number;
  x_studio_product_link: number | false;
  x_studio_description: string;
  create_date: string;
}

interface AdBannerResponse {
  success: boolean;
  banner: AdBanner;
}

interface ThreeAdBanner {
  id: number;
  x_name: string;
  x_studio_banner_image: string;
  x_studio_start_date: string;
  x_studio_end_date: string;
  x_studio_publish: boolean;
  x_studio_discount: number;
  x_studio_product_link: string | false;
  x_studio_description: string;
  create_date: string;
  x_studio_is_3_ad: boolean;
  x_studio_many2many_field_6sm_1ilj3d1qm: number[];
}

interface ThreeAdBannersResponse {
  success: boolean;
  banners: ThreeAdBanner[];
}

interface Category {
  id: number;
  name: string;
  parent_id: [number, string] | false;
  child_id: number[];
}

interface CategoryProduct {
  id: number;
  name: string;
  list_price: number;
  image_1920: string;
  description_sale?: string;
}

interface CategoryProductsResponse {
  products: CategoryProduct[];
  total: number;
  offset: number;
  limit: number;
}

// Update CartItem to match the expected types
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Add WishlistItem interface to match Product type
interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

function Home() {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollCategories = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const container = scrollContainerRef.current;

      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute z-10 p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-md left-4 top-1/2 bg-white/80 hover:bg-white"
      >
        <LucideArrowLeft className="w-6 h-6 text-gray-600" />
      </button>
    );
  };

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute z-10 p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-md right-4 top-1/2 bg-white/80 hover:bg-white"
      >
        <LucideArrowRight className="w-6 h-6 text-gray-600" />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 4000,
    cssEase: "ease-out",
    rtl: true,
    dotsClass: "slick-dots slick-thumb",
    customPaging: (i: any) => (
      <div className="w-8 h-1 px-1 my-2">
        <div
          className={`w-full h-full ${i === activeSlide ? "bg-orange-500" : "bg-orange-100"
            } rounded-full`}
        />
      </div>
    ),
    beforeChange: (current: any, next: any) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: (current: any) => setActiveSlide2(current),
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  const categoryCarouselSettings = {
    autoPlay: true,
    autoPlaySpeed: 900,
    speed: 900,
    slidesToShow: 11,
    slidesToScroll: 4,
    nextArrow: <LucideArrowLeft className="text-white bg-black" />,
    prevArrow: <LucideArrowRight className="text-white bg-black" />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  // Get first 5 products for featured section
  const featuredProducts = products.slice(0, 5);

  // Add this query to fetch banners
  const { data: bannersData, isLoading: isBannersLoading } =
    useQuery<BannersResponse>({
      queryKey: ["banners"],
      queryFn: async () => {
        const response = await axiosInstance.post("/products/banners", {
          currentOffset: 0,
          limit: 10,
        });
        console.log("banners", response.data);
        return response.data;
      },
    });

  // Replace the banners array with the fetched data
  const banners =
    bannersData?.banners.map(
      (banner) => `data:image/png;base64,${banner.x_studio_banner_image}`
    ) || [];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Add categories query
  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.post("/products/categories", {});
      // Filter out categories with parent_id to get only root categories
      const rootCategories = response.data.filter((category: Category) => !category.parent_id);
      // Set the first category as default if we have categories and no category is selected
      if (rootCategories.length > 0 && !selectedCategory) {
        setSelectedCategory(rootCategories[0].id);
      }
      return rootCategories;
    },
  });

  // Add category products query
  const { data: categoryProductsData, isLoading: isCategoryProductsLoading } = useQuery<CategoryProductsResponse>({
    queryKey: ["categoryProducts", selectedCategory],
    queryFn: async () => {
      if (!selectedCategory) return { products: [], total: 0, offset: 0, limit: 12 };
      const response = await axiosInstance.post("/products", {
        category_id: selectedCategory,
        limit: 12,
        page: 1,
      });
      return response.data;
    },
    enabled: !!selectedCategory, // Only run query if we have a selected category
  });

  const handleBannerClick = (banner: Banner) => {
    if (banner.x_studio_product_link) {
      navigate(`${banner.x_studio_product_link}`);
    } else {
      navigate(`/banner/${banner.id}`);
    }
  };

  // Add this query to fetch special products
  const { data: specialProductsData, isLoading: isSpecialProductsLoading } =
    useQuery({
      queryKey: ["specialProducts"],
      queryFn: async () => {
        const response = await axiosInstance.get("/products/special", {
          params: { limit: 10 },
        });
        return response.data;
      },
    });

  // Add this query near your other queries
  const { data: brandsData, isLoading: isBrandsLoading } =
    useQuery<BrandsResponse>({
      queryKey: ["brands"],
      queryFn: async () => {
        const response = await axiosInstance.post("/products/brands", {
          limit: 10,
        });
        return response.data;
      },
    });

  // Add this query near your other queries
  const { data: adBannerData, isLoading: isAdBannerLoading } =
    useQuery<AdBannerResponse>({
      queryKey: ["latestAdBanner"],
      queryFn: async () => {
        const response = await axiosInstance.get("/products/latest-ad-banner");
        return response.data;
      },
    });

  // Add this query near your other queries
  const { data: threeAdBannersData, isLoading: isThreeAdBannersLoading } =
    useQuery<ThreeAdBannersResponse>({
      queryKey: ["latestThreeAdBanners"],
      queryFn: async () => {
        const response = await axiosInstance.get(
          "/products/latest-three-ad-banners"
        );
        return response.data;
      },
    });

  return (
    <div className="px-4 pt-4 mx-auto md:px-12">
      <div className="relative pt-8 pb-14">
        {isBannersLoading ? (
          <div className="h-[280px] md:h-[380px] lg:h-[480px] flex items-center justify-center bg-gray-100 rounded-xl">
            <div role="status" className="w-full h-full animate-pulse">
              <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-sm dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            </div>
          </div>
        ) : banners.length > 0 ? (
          <Slider {...settings}>
            {banners.map((item, i) => (
              <div
                key={i}
                className="h-[280px] md:h-[380px] lg:h-[480px] overflow-hidden relative cursor-pointer"
              // onClick={() => handleBannerClick(bannersData!.banners[i])}
              >
                <img
                  src={item}
                  alt={`Banner ${i + 1}`}
                  className="object-cover w-full h-full border-none focus:outline-none"
                />
                {/* {bannersData?.banners[i].x_studio_discount && (
                  <div className="z-[100] absolute top-4 pt-2 font-tajawal-bold right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                    {bannersData.banners[i].x_studio_discount}% خصم
                  </div>
                )} */}
                <Link
                  className="absolute flex items-center justify-center w-20 text-white bg-orange-500 rounded-sm bottom-10 right-10 h-14 font-tajawal-bold"
                  to={
                    bannersData?.banners[i].x_studio_product_link
                      ? `${bannersData?.banners[i].x_studio_product_link}`
                      : `/banner/${bannersData?.banners[i].id}`
                  }
                >
                  افتح
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="h-[280px] md:h-[380px] lg:h-[480px] flex items-center justify-center bg-gray-100 rounded-xl">
            <p className="text-gray-500">لا توجد بانرات متاحة</p>
          </div>
        )}
      </div>

      {/* category product section */}
      <div className="mb-20">
        {/* Section Header */}
        <div className="flex flex-col gap-6 px-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="font-tajawal-medium text-xl relative after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-gradient-to-l after:from-orange-500 after:to-orange-300 pb-2">
              منتجات الفئة
            </h2>
            <Link
              to="/categories"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 hover:shadow-md"
            >
              عرض المزيد
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rtl:rotate-180"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>

          {/* Categories List */}
          {!isCategoriesLoading && categoriesData && (
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
              {categoriesData.map((category: Category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ${selectedCategory === category.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative p-6 bg-white shadow-md rounded-2xl bg-gradient-to-b from-white to-gray-50">
          {isCategoriesLoading || isCategoryProductsLoading ? (
            // Loading state
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
                  <div className="w-3/4 h-4 mt-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-4 mt-2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : categoryProductsData?.products?.length ? (
            <div className="relative z-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
              {categoryProductsData.products.map((product: CategoryProduct) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 group rounded-xl hover:shadow-lg"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const wishlistItem: WishlistItem = {
                        id: product.id.toString(),
                        name: product.name,
                        price: product.list_price,
                        image: `data:image/jpeg;base64,${product.image_1920}`,
                        description: product.description_sale || product.name,
                      };
                      useWishlistStore.getState().isWishlisted(product.id.toString())
                        ? useWishlistStore.getState().removeFromWishlist(product.id.toString())
                        : useWishlistStore.getState().addToWishlist(wishlistItem);
                    }}
                    className="absolute z-10 p-2 transition-all duration-200 rounded-full shadow-sm opacity-0 top-2 right-2 bg-white/90 group-hover:opacity-100 hover:bg-white"
                    aria-label="إضافة للمفضلة"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${useWishlistStore.getState().isWishlisted(product.id.toString())
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400 group-hover:text-gray-600"
                        }`}
                    />
                  </button>

                  {/* Product Image */}
                  <div className="flex items-center justify-center p-4 aspect-square bg-gradient-to-b from-gray-50 to-white">
                    <img
                      src={`data:image/jpeg;base64,${product.image_1920}`}
                      alt={product.name}
                      className="object-contain w-4/5 transition-transform duration-300 h-4/5 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="mb-2 text-sm font-medium text-gray-800 transition-colors line-clamp-2 group-hover:text-orange-600">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between pt-2 mt-auto">
                      <p className="text-sm font-bold text-orange-600">
                        {product.list_price.toLocaleString()} د.ع
                      </p>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const cartItem: CartItem = {
                            id: product.id.toString(),
                            name: product.name,
                            price: product.list_price,
                            image: `data:image/jpeg;base64,${product.image_1920}`,
                            quantity: 1,
                          };
                          useCartStore.getState().addToCart(cartItem);
                        }}
                        className="relative p-2 overflow-hidden text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg hover:bg-orange-200 group-hover:shadow-sm"
                        aria-label="إضافة للسلة"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="absolute inset-0 transition-transform duration-300 origin-left scale-x-0 bg-orange-500 opacity-0 group-hover:scale-x-100 group-hover:opacity-10"></span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom shine effect on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">لا توجد منتجات متاحة</p>
            </div>
          )}

          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-50 opacity-30 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-orange-50 translate-x-1/4 translate-y-1/4 opacity-40 blur-3xl"></div>
        </div>
      </div>

      {/* Auctions Section */}
      <div className="mb-20">
        <AuctionSection />
      </div>

      {/* single ad banner section */}
      <div className="mb-20">
        {isAdBannerLoading ? (
          <div className="w-full h-[300px] bg-gray-100 rounded-xl animate-pulse">
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <svg
                className="w-10 h-10 text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        ) : adBannerData?.banner ? (
          <Link
            to={
              adBannerData.banner.x_studio_product_link
                ? `/product/${adBannerData.banner.x_studio_product_link}`
                : `/banner/${adBannerData.banner.id}`
            }
            className="block"
          >
            <Banner
              title={adBannerData.banner.x_name}
              subtitle={adBannerData.banner.x_studio_description}
              discount={adBannerData.banner.x_studio_discount}
              primaryImage={`data:image/png;base64,${adBannerData.banner.x_studio_banner_image}`}
            />
          </Link>
        ) : (
          <div className="flex items-center justify-center w-full h-[300px] bg-gray-100 rounded-xl">
            <p className="text-gray-500">لا يوجد إعلان متاح</p>
          </div>
        )}
      </div>

      {/* three ad banners section */}
      <div className="w-full p-4 mx-auto mb-8">
        {isThreeAdBannersLoading ? (
          // Loading state
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
            <div className="animate-pulse bg-gray-200 rounded-lg h-full" />
            <div className="grid h-full grid-rows-2 gap-4">
              <div className="animate-pulse bg-gray-200 rounded-lg" />
              <div className="animate-pulse bg-gray-200 rounded-lg" />
            </div>
          </div>
        ) : threeAdBannersData?.banners &&
          threeAdBannersData.banners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
            {threeAdBannersData.banners.length <= 2 ? (
              // Show banners side by side if 2 or fewer
              <>
                {threeAdBannersData.banners.map((banner) => (
                  <Link
                    key={banner.id}
                    to={
                      banner.x_studio_product_link
                        ? banner.x_studio_product_link
                        : `/banner/${banner.id}`
                    }
                    className="relative w-full h-full overflow-hidden bg-gray-100 rounded-lg cursor-pointer group"
                  >
                    <img
                      className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                      src={`data:image/png;base64,${banner.x_studio_banner_image}`}
                      alt={banner.x_name}
                    />
                    <div className="absolute right-0 p-4 bottom-10">
                      <p className="text-sm text-black font-tajawal-medium bg-gray-300/50 w-fit p-2 rounded-full">
                        {banner.x_studio_discount &&
                          `خصم ${banner.x_studio_discount}%`}
                      </p>
                      <h3 className="text-2xl text-black line-clamp-1 font-tajawal-bold">
                        {banner.x_name}
                      </h3>
                      <p className="mt-2 text-md line-clamp-2 text-black font-tajawal-medium">
                        {banner.x_studio_description}
                      </p>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              // Show first banner on left, others on right
              <>
                <Link
                  to={
                    threeAdBannersData.banners[0].x_studio_product_link
                      ? threeAdBannersData.banners[0].x_studio_product_link
                      : `/banner/${threeAdBannersData.banners[0].id}`
                  }
                  className="relative w-full h-full overflow-hidden bg-gray-100 rounded-lg cursor-pointer group"
                >
                  <img
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                    src={`data:image/png;base64,${threeAdBannersData.banners[0].x_studio_banner_image}`}
                    alt={threeAdBannersData.banners[0].x_name}
                  />
                  <div className="absolute right-0 p-4 top-10">
                    <p className="text-sm text-black font-tajawal-medium">
                      {threeAdBannersData.banners[0].x_studio_discount &&
                        `خصم ${threeAdBannersData.banners[0].x_studio_discount}%`}
                    </p>
                    <h3 className="text-2xl text-black font-tajawal-medium">
                      {threeAdBannersData.banners[0].x_name}
                    </h3>
                    <p className="mt-2 text-sm text-black font-tajawal-medium">
                      {threeAdBannersData.banners[0].x_studio_description}
                    </p>
                  </div>
                </Link>

                <div className="grid h-full grid-rows-2 gap-4">
                  {threeAdBannersData.banners.slice(1).map((banner) => (
                    <Link
                      key={banner.id}
                      to={
                        banner.x_studio_product_link
                          ? banner.x_studio_product_link
                          : `/banner/${banner.id}`
                      }
                      className="group relative cursor-pointer bg-gray-100 rounded-lg overflow-hidden h-[295px]"
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                        src={`data:image/png;base64,${banner.x_studio_banner_image}`}
                        alt={banner.x_name}
                      />
                      <div className="absolute bottom-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent w-full">
                        <p className="text-sm text-white font-tajawal-medium">
                          {banner.x_studio_discount &&
                            `خصم ${banner.x_studio_discount}%`}
                        </p>
                        <h3 className="text-2xl text-white font-tajawal-medium">
                          {banner.x_name}
                        </h3>
                        <p className="mt-2 text-sm text-white font-tajawal-medium">
                          {banner.x_studio_description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[600px] bg-gray-100 rounded-xl">
            <p className="text-gray-500">لا توجد إعلانات متاحة</p>
          </div>
        )}
      </div>

      {/* special products section */}
      <div className="mb-20">
        {/* Section Header */}
        <div className="flex items-center justify-between px-4 mb-8">
          <h2 className="font-tajawal-medium text-xl relative after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-gradient-to-l after:from-orange-500 after:to-orange-300 pb-2">
            المنتجات المميزة
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 hover:shadow-md">
            عرض المزيد
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rtl:rotate-180"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="relative p-6 bg-white shadow-md rounded-2xl bg-gradient-to-b from-white to-gray-50">
          {isSpecialProductsLoading ? (
            // Loading state
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
                  <div className="w-3/4 h-4 mt-4 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-4 mt-2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : specialProductsData?.products?.length > 0 ? (
            <div className="relative z-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
              {specialProductsData.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 group rounded-xl hover:shadow-lg"
                >
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      useWishlistStore.getState().isWishlisted(product.id)
                        ? useWishlistStore
                          .getState()
                          .removeFromWishlist(product.id)
                        : useWishlistStore.getState().addToWishlist(product);
                    }}
                    className="absolute z-10 p-2 transition-all duration-200 rounded-full shadow-sm opacity-0 top-2 right-2 bg-white/90 group-hover:opacity-100 hover:bg-white"
                    aria-label="إضافة للمفضلة"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${useWishlistStore.getState().isWishlisted(product.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400 group-hover:text-gray-600"
                        }`}
                    />
                  </button>

                  {/* Product Image */}
                  <div className="flex items-center justify-center p-4 aspect-square bg-gradient-to-b from-gray-50 to-white">
                    <img
                      src={`data:image/jpeg;base64,${product.image_1920}`}
                      alt={product.name}
                      className="object-contain w-4/5 transition-transform duration-300 h-4/5 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="mb-2 text-sm line-clamp-1 font-bold text-gray-800 transition-colors group-hover:text-orange-600">
                      {product.name}
                    </h3>

                    {
                      product.description && (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: product.description
                          }}
                          className="mb-2 text-sm line-clamp-2 font-tajawal-regular text-gray-800 transition-colors"
                        />
                      )
                    }

                    <div className="flex items-center justify-between pt-2 mt-auto">
                      <p className="text-sm font-bold text-orange-600">
                        {product.list_price.toLocaleString()} د.ع
                      </p>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          useCartStore.getState().addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.list_price,
                            image: `data:image/jpeg;base64,${product.image_1920}`,
                            quantity: 1,
                          });
                        }}
                        className="relative p-2 overflow-hidden text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg hover:bg-orange-200 group-hover:shadow-sm"
                        aria-label="إضافة للسلة"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span className="absolute inset-0 transition-transform duration-300 origin-left scale-x-0 bg-orange-500 opacity-0 group-hover:scale-x-100 group-hover:opacity-10"></span>
                      </button>
                    </div>
                  </div>

                  {/* Bottom shine effect on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">لا توجد منتجات مميزة متاحة</p>
            </div>
          )}

          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-50 opacity-30 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-orange-50 translate-x-1/4 translate-y-1/4 opacity-40 blur-3xl"></div>
        </div>
      </div>

      {/* Brands Carousel */}
      <div className="p-4 mb-16 bg-white rounded-md shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <h2 className="text-lg border-b-2 border-orange-400 font-tajawal-medium w-fit">
              تسوق بالماركات
            </h2>
            <span className="absolute -bottom-1 right-0 w-1/3 h-[2px] bg-gray-100" />
          </div>
          <Link
            to={"/brands"}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 hover:shadow-md"
          >
            عرض جميع الماركات
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rtl:rotate-180"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        {/* Brands Grid */}
        {isBrandsLoading ? (
          // Loading state
          <div className="grid grid-flow-col gap-6 px-1 py-4 overflow-x-auto auto-cols-max hide-scrollbar">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse min-w-[130px] h-[80px] bg-gray-200 rounded-lg"
              />
            ))}
          </div>
        ) : brandsData?.values && brandsData.values.length > 0 ? (
          <div className="grid grid-flow-col gap-6 px-1 py-4 overflow-x-auto auto-cols-max hide-scrollbar">
            {brandsData.values.map((brand) => (
              <div
                key={brand.id}
                className="min-w-[130px] transition-transform duration-300 hover:-translate-y-1"
              >
                <Link
                  to={`/products?brand=${brand.id}`}
                  className="flex flex-col items-center p-4 space-y-2 bg-white border rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <img
                    src={brand.image || LogoPlaceholder}
                    alt={brand.name}
                    className="object-contain w-20 h-12"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {brand.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">لا توجد ماركات متاحة</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
