import AuctionSection from "@/components/AuctionSection";
import Banner from "@/components/Banner";
import CarouselCard from "@/components/CarouselCard";
import SpecialProducts from "@/components/SpecialProducts";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/useWishlistStore";
import axiosInstance from "@/utils/axiosInstance";
import { Product, products } from "@/utils/data/products";
import {
  carouselCardData,
  productsData,
  techLogos,
} from "@/utils/dummy_data/data";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  LucideArrowLeft,
  LucideArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";

import LoadingComponent from "@/components/loading";
import { useCartStore } from "@/store/useCartStore";

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
        className="left-4 top-1/2 bg-white/80 hover:bg-white absolute z-10 p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-md"
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
        className="right-4 top-1/2 bg-white/80 hover:bg-white absolute z-10 p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-md"
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
          className={`w-full h-full ${
            i === activeSlide ? "bg-orange-500" : "bg-orange-100"
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

  const [selectedCategory, setSelectedCategory] = useState(
    carouselCardData[0].label
  );

  const filteredProducts = productsData.filter(
    (product) => product.category === selectedCategory
  );

  const handleBannerClick = (banner: Banner) => {
    if (banner.x_studio_product_link) {
      navigate(`${banner.x_studio_product_link}`);
    } else {
      navigate(`/banner/${banner.id}`);
    }
  };

  return (
    <div className=" md:px-12 px-4 pt-4 mx-auto">
      <div className="pb-14 relative pt-8">
        {isBannersLoading ? (
          <LoadingComponent />
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
                  className="focus:outline-none object-cover w-full h-full border-none"
                />
                {/* {bannersData?.banners[i].x_studio_discount && (
                  <div className="z-[100] absolute top-4 pt-2 font-tajawal-bold right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                    {bannersData.banners[i].x_studio_discount}% خصم
                  </div>
                )} */}
                <Link
                  className="bottom-10 right-10 h-14 font-tajawal-bold absolute flex items-center justify-center w-20 text-white bg-orange-500 rounded-sm"
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

      {/* Category Carousel */}
      <div className="p-4 mb-20 bg-white rounded-md shadow-md">
        <div className="relative">
          <button
            onClick={() => scrollCategories("left")}
            className="top-1/2 hover:bg-gray-50 absolute left-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md"
          >
            <LucideArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => scrollCategories("right")}
            className="top-1/2 hover:bg-gray-50 absolute right-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md"
          >
            <LucideArrowRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Categories */}
          <div className="gap-x-4 hide-scrollbar categories-scroll scroll-smooth flex px-12 mb-6 overflow-x-auto">
            {carouselCardData.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCategory(item.label)}
                className=""
              >
                <Button
                  variant={
                    selectedCategory === item.label ? "default" : "outline"
                  }
                  color="orange"
                  label={item.label}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <button
            onClick={() => scrollCategories("left")}
            className="top-1/2 hover:bg-gray-50 absolute left-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md"
          >
            <LucideArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => scrollCategories("right")}
            className="top-1/2 hover:bg-gray-50 absolute right-0 z-10 p-2 -translate-y-1/2 bg-white rounded-full shadow-md"
          >
            <LucideArrowRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Products Grid */}
          <div
            ref={scrollContainerRef}
            className="auto-cols-max hide-scrollbar grid grid-flow-col gap-8 px-8 py-6 overflow-x-auto"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-[220px] group bg-white rounded-2xl p-4 transition-shadow duration-200 hover:shadow-lg border border-gray-100"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative mb-4">
                    <div className="rounded-xl bg-gray-50 relative p-4 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[180px] object-contain mix-blend-multiply transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        useWishlistStore.getState().isWishlisted(product.id)
                          ? useWishlistStore
                              .getState()
                              .removeFromWishlist(product.id)
                          : useWishlistStore
                              .getState()
                              .addToWishlist(product as Product);
                      }}
                      className="top-3 right-3 hover:bg-gray-50 absolute p-2 transition-colors duration-200 bg-white rounded-full shadow-lg"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          useWishlistStore.getState().isWishlisted(product.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
                      {product.name}
                    </h3>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-lg font-bold text-gray-900">
                        {product.price.toLocaleString()} د.ع
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* new banner section */}
      {/* <div className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h[600px]">
          <div className="h-full">
            <Banner
              title="بيكسل 9 برو"
              subtitle="عرض ملحمي للذكاء الاصطناعي من كوكل."
              price={320000}
              primaryImage="https://imgs.search.brave.com/6jvVwjfcZkPlC9DY9B3xPr5Qzhc_-dt0fSl_ALBxX1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmFucG9pbWFn/ZXMuY29tL3dvcmRw/cmVzcy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wOC9nb29n/bGUtcGl4ZWwtOS1w/cm8teGwucG5n"
              className="h-full"
            />
          </div>

          <div className="grid h-full grid-rows-2 gap-4">
            <Banner
              title="ايفون 15 برو ماكس"
              subtitle="تجربة تصوير احترافية مع كاميرا متطورة."
              price={450000}
              primaryImage="https://imgs.search.brave.com/6jvVwjfcZkPlC9DY9B3xPr5Qzhc_-dt0fSl_ALBxX1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmFucG9pbWFn/ZXMuY29tL3dvcmRw/cmVzcy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wOC9nb29n/bGUtcGl4ZWwtOS1w/cm8teGwucG5n"
            />

            <Banner
              title="سامسونج جالكسي زد فولد 5"
              subtitle="الجيل الجديد من الهواتف القابلة للطي."
              price={380000}
              primaryImage="https://imgs.search.brave.com/6jvVwjfcZkPlC9DY9B3xPr5Qzhc_-dt0fSl_ALBxX1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmFucG9pbWFn/ZXMuY29tL3dvcmRw/cmVzcy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wOC9nb29n/bGUtcGl4ZWwtOS1w/cm8teGwucG5n"
            />
          </div>
        </div>
      </div> */}

      {/* Auctions Section */}
      <div className="mb-20">
        <AuctionSection />
      </div>

      {/* old Banner Section */}
      <div className="mb-20">
        <Banner
          title="بيكسل 9 برو"
          subtitle="عرض ملحمي للذكاء الاصطناعي من كوكل."
          price={320000}
          primaryImage="https://imgs.search.brave.com/6jvVwjfcZkPlC9DY9B3xPr5Qzhc_-dt0fSl_ALBxX1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmFucG9pbWFn/ZXMuY29tL3dvcmRw/cmVzcy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wOC9nb29n/bGUtcGl4ZWwtOS1w/cm8teGwucG5n"
        />
      </div>

      {/* Grid Banner */}
      {/* Grid Banner */}
      <div className="w-full p-4 mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
          {/* Left banner taking full height */}
          <div className="group relative w-full h-full overflow-hidden bg-gray-100 rounded-lg cursor-pointer">
            <img
              className="group-hover:scale-110 object-cover w-full h-full transition-all duration-300"
              src="https://framerusercontent.com/images/7xR7TetootHNEHS8SguWlmMjAW8.jpg?scale-down-to=1024"
              alt="Left banner"
            />
            <div className="top-10 absolute right-0 p-4">
              <p className="font-tajawal-medium text-sm text-black">
                سريع ودقيق
              </p>
              <h3 className="font-tajawal-medium text-2xl text-black">
                التركيز التلقائي مع مستشعر Lidar
              </h3>
            </div>
          </div>

          {/* Right column with two banners */}
          <div className="grid h-full grid-rows-2 gap-4">
            {/* Top right banner */}
            <div className="group relative cursor-pointer bg-gray-100 rounded-lg overflow-hidden h-[295px]">
              <img
                className="group-hover:scale-110 object-cover w-full h-full transition-all duration-300 cursor-pointer"
                src="https://assets.awwwards.com/awards/element/2024/12/676eaa2d9e4c8553309056.png"
                alt="Top right banner"
              />
              <div className="absolute bottom-0 right-0 p-4">
                <p className="font-tajawal-medium text-sm text-white">
                  سريع ودقيق
                </p>
                <h3 className="font-tajawal-medium text-2xl text-white">
                  التركيز التلقائي مع مستشعر Lidar
                </h3>
              </div>
            </div>

            {/* Bottom right banner */}
            <div className="group relative cursor-pointer bg-gray-100 rounded-lg overflow-hidden h-[295px]">
              <img
                className="group-hover:scale-110 object-cover w-full h-full transition-all duration-300"
                src="https://assets.awwwards.com/awards/element/2024/12/676eaa2d93cc3558396192.png"
                alt="Bottom right banner"
              />
              <div className="absolute bottom-0 right-0 p-4">
                <p className="font-tajawal-medium text-sm text-white">
                  سريع ودقيق
                </p>
                <h3 className="font-tajawal-medium text-2xl text-white">
                  التركيز التلقائي مع مستشعر Lidar
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="mb-20">
        {/* Section Header */}
        <div className="flex items-center justify-between px-4 mb-8">
          <h2 className="font-tajawal-medium text-xl relative after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-gradient-to-l after:from-orange-500 after:to-orange-300 pb-2">
            الاكثر مبيعاً
          </h2>
          <button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:shadow-md flex items-center gap-2 px-4 py-2 text-sm text-white transition-all duration-300 rounded-lg">
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

        {/* Products Container */}
        <div className="rounded-2xl bg-gradient-to-b from-white to-gray-50 relative p-6 bg-white shadow-md">
          <div className="md:grid-cols-3 lg:grid-cols-6 relative z-10 grid grid-cols-2 gap-5">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group rounded-xl hover:shadow-lg relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100"
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
                  className="top-2 right-2 bg-white/90 group-hover:opacity-100 hover:bg-white absolute z-10 p-2 transition-all duration-200 rounded-full shadow-sm opacity-0"
                  aria-label="إضافة للمفضلة"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      useWishlistStore.getState().isWishlisted(product.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-4/5 group-hover:scale-110 object-contain w-4/5 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="line-clamp-2 group-hover:text-orange-600 mb-2 text-sm font-medium text-gray-800 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between pt-2 mt-auto">
                    <p className="text-sm font-bold text-orange-600">
                      {product.price.toLocaleString()} د.ع
                    </p>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        useCartStore.getState().addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          quantity: 1,
                          storage: product.storage,
                        });
                      }}
                      className="hover:bg-orange-200 group-hover:shadow-sm relative p-2 overflow-hidden text-orange-600 transition-colors duration-200 bg-orange-100 rounded-lg"
                      aria-label="إضافة للسلة"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="group-hover:scale-x-100 group-hover:opacity-10 absolute inset-0 transition-transform duration-300 origin-left scale-x-0 bg-orange-500 opacity-0"></span>
                    </button>
                  </div>
                </div>

                {/* Bottom shine effect on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Link>
            ))}
          </div>

          {/* Decorative background elements */}
          <div className="bg-orange-50 opacity-30 blur-2xl absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="bg-orange-50 translate-x-1/4 translate-y-1/4 opacity-40 blur-3xl absolute bottom-0 right-0 w-40 h-40 rounded-full"></div>
        </div>
      </div>

      {/* Special Products */}
      <div className="mb-20">
        <SpecialProducts />
      </div>

      {/* Brands Carousel */}
      <div className="p-4 mb-16 bg-white rounded-md shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <h2 className="font-tajawal-medium w-fit text-lg border-b-2 border-orange-400">
              تسوق بالماركات
            </h2>
            <span className="absolute -bottom-1 right-0 w-1/3 h-[2px] bg-gray-100" />
          </div>
          {/* <Button label="عرض جميع الماركات" /> */}
          <button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:shadow-md flex items-center gap-2 px-4 py-2 text-sm text-white transition-all duration-300 rounded-lg">
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
          </button>
        </div>

        {/* Brands Grid */}
        <div className="auto-cols-max hide-scrollbar grid grid-flow-col gap-6 px-1 py-4 overflow-x-auto">
          {techLogos.map((item) => (
            <div
              key={item.label}
              className="min-w-[130px] transition-transform duration-300 hover:-translate-y-1"
            >
              <CarouselCard img={item.image} link={item.link} hasBg={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
