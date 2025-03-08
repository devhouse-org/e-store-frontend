import { useRef, useState } from "react";
import { Product, products } from "@/utils/data/products";
import AuctionSection from "@/components/AuctionSection";
import Banner from "@/components/Banner";
import CarouselCard from "@/components/CarouselCard";
import ProductCard from "@/components/ProductCard";
import SpecialProducts from "@/components/SpecialProducts";
import { Button } from "@/components/ui/button";
import {
  carouselCardData,
  productsData,
  techLogos,
} from "@/utils/dummy_data/data";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { IconType } from "react-icons";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Heart, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

import ban1 from "@/assets/images/banners/1.webp";
import ban2 from "@/assets/images/banners/2.webp";
import ban3 from "@/assets/images/banners/3.webp";
import ban4 from "@/assets/images/banners/4.webp";
import ban5 from "@/assets/images/banners/5.webp";
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2 transition-all duration-200"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-md rounded-full p-2 transition-all duration-200"
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
          className={`w-full h-full ${i === activeSlide ? "bg-orange-500" : "bg-orange-100"} rounded-full`}
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
    prevArrow: <CustomPrevArrow />
  };
  const categoryCarouselSettings = {
    autoPlay: true,
    autoPlaySpeed: 900,
    speed: 900,
    slidesToShow: 11,
    slidesToScroll: 4,
    nextArrow: <LucideArrowLeft className="bg-black text-white" />,
    prevArrow: <LucideArrowRight className="bg-black text-white" />,
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
  const { data: bannersData, isLoading: isBannersLoading } = useQuery<BannersResponse>({
    queryKey: ['banners'],
    queryFn: async () => {
      const response = await axiosInstance.post('/products/banners', {
        currentOffset: 0,
        limit: 10
      });
      console.log("banners", response.data)
      return response.data;
    }
  });

  // Replace the banners array with the fetched data
  const banners = bannersData?.banners.map(banner =>
    `data:image/png;base64,${banner.x_studio_banner_image}`
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
    <div className=" pt-4 px-4 md:px-12 mx-auto">
      <div className="pb-14 pt-8 relative">
        {isBannersLoading ? (
          <div className="h-[280px] md:h-[380px] lg:h-[480px] flex items-center justify-center bg-gray-100 rounded-xl">
            <p className="text-gray-500">جاري تحميل البانرات...</p>
          </div>
        ) : banners.length > 0 ? (
          <Slider {...settings}>
            {banners.map((item, i) => (
              <Link
                key={i}
                className="h-[280px] md:h-[380px] lg:h-[480px] overflow-hidden relative cursor-pointer"
                // onClick={() => handleBannerClick(bannersData!.banners[i])}
                to={bannersData?.banners[i].x_studio_product_link ? `${bannersData?.banners[i].x_studio_product_link}` : `/banner/${bannersData?.banners[i].id}`}
              >
                <img
                  src={item}
                  alt={`Banner ${i + 1}`}
                  className="focus:outline-none border-none w-full h-full object-cover"
                />
                {/* {bannersData?.banners[i].x_studio_discount && (
                  <div className="z-[100] absolute top-4 pt-2 font-tajawal-bold right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                    {bannersData.banners[i].x_studio_discount}% خصم
                  </div>
                )} */}
              </Link>
            ))}
          </Slider>
        ) : (
          <div className="h-[280px] md:h-[380px] lg:h-[480px] flex items-center justify-center bg-gray-100 rounded-xl">
            <p className="text-gray-500">لا توجد بانرات متاحة</p>
          </div>
        )}
      </div>

      {/* Category Carousel */}
      <div className="mb-20 bg-white p-4 rounded-md shadow-md">
        <div className="relative">
          <button
            onClick={() => scrollCategories("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
          >
            <LucideArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => scrollCategories("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
          >
            <LucideArrowRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Categories */}
          <div className="flex mb-6 gap-x-4 overflow-x-auto hide-scrollbar categories-scroll px-12 scroll-smooth">
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
          >
            <LucideArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => scrollCategories("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
          >
            <LucideArrowRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Products Grid */}
          <div
            ref={scrollContainerRef}
            className="grid grid-flow-col auto-cols-max gap-8 py-6 overflow-x-auto hide-scrollbar px-8"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="w-[220px] bg-white rounded-2xl p-4 transition-shadow duration-200 hover:shadow-lg border border-gray-100"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative mb-4">
                    <div className="relative rounded-xl overflow-hidden bg-gray-50 p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[180px] object-contain"
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
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Heart
                        className={`w-5 h-5 ${useWishlistStore.getState().isWishlisted(product.id)
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

          <div className="grid grid-rows-2 gap-4 h-full">
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
      <div className="w-full mx-auto p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
          {/* Left banner taking full height */}
          <div className="group cursor-pointer relative bg-gray-100 rounded-lg h-full w-full overflow-hidden">
            <img
              className="object-cover group-hover:scale-110 transition-all duration-300 w-full h-full"
              src="https://framerusercontent.com/images/7xR7TetootHNEHS8SguWlmMjAW8.jpg?scale-down-to=1024"
              alt="Left banner"
            />
            <div className="absolute top-10 right-0 p-4">
              <p className="text-black text-sm font-tajawal-medium">
                سريع ودقيق
              </p>
              <h3 className="text-black text-2xl font-tajawal-medium">
                التركيز التلقائي مع مستشعر Lidar
              </h3>
            </div>
          </div>

          {/* Right column with two banners */}
          <div className="grid grid-rows-2 gap-4 h-full">
            {/* Top right banner */}
            <div className="group relative cursor-pointer bg-gray-100 rounded-lg overflow-hidden h-[295px]">
              <img
                className="object-cover group-hover:scale-110 cursor-pointer transition-all duration-300 w-full h-full"
                src="https://assets.awwwards.com/awards/element/2024/12/676eaa2d9e4c8553309056.png"
                alt="Top right banner"
              />
              <div className="absolute bottom-0 right-0 p-4">
                <p className="text-white text-sm font-tajawal-medium">
                  سريع ودقيق
                </p>
                <h3 className="text-white text-2xl font-tajawal-medium">
                  التركيز التلقائي مع مستشعر Lidar
                </h3>
              </div>
            </div>

            {/* Bottom right banner */}
            <div className="group relative cursor-pointer bg-gray-100 rounded-lg overflow-hidden h-[295px]">
              <img
                className="object-cover group-hover:scale-110 transition-all duration-300 w-full h-full"
                src="https://assets.awwwards.com/awards/element/2024/12/676eaa2d93cc3558396192.png"
                alt="Bottom right banner"
              />
              <div className="absolute bottom-0 right-0 p-4">
                <p className="text-white text-sm font-tajawal-medium">
                  سريع ودقيق
                </p>
                <h3 className="text-white text-2xl font-tajawal-medium">
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
        <div className="flex justify-between items-center mb-8 px-4">
          <h2 className="font-tajawal-medium text-xl relative after:absolute after:bottom-0 after:right-0 after:w-full after:h-0.5 after:bg-gradient-to-l after:from-orange-500 after:to-orange-300 pb-2">
            الاكثر مبيعاً
          </h2>
          <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:shadow-md transition-all duration-300 flex items-center gap-2">
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
        <div className="relative bg-white p-6 rounded-2xl shadow-md bg-gradient-to-b from-white to-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 relative z-10">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group relative bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full"
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
                  className="absolute top-2 right-2 z-10 p-2 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white"
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
                <div className="aspect-square p-4 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="mt-auto flex items-center justify-between pt-2">
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
                      className="p-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors duration-200 relative overflow-hidden group-hover:shadow-sm"
                      aria-label="إضافة للسلة"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="absolute inset-0 bg-orange-500 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 opacity-0 group-hover:opacity-10"></span>
                    </button>
                  </div>
                </div>

                {/* Bottom shine effect on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Link>
            ))}
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-orange-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-50 rounded-full translate-x-1/4 translate-y-1/4 opacity-40 blur-3xl"></div>
        </div>
      </div>

      {/* Special Products */}
      <div className="mb-20">
        <SpecialProducts />
      </div>

      {/* Brands Carousel */}
      <div className="mb-16 bg-white p-4 rounded-md shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <h2 className="font-tajawal-medium text-lg border-b-2 border-orange-400 w-fit">
              تسوق بالماركات
            </h2>
            <span className="absolute -bottom-1 right-0 w-1/3 h-[2px] bg-gray-100" />
          </div>
          {/* <Button label="عرض جميع الماركات" /> */}
          <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:shadow-md transition-all duration-300 flex items-center gap-2">
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
        <div className="grid grid-flow-col auto-cols-max gap-6 py-4 overflow-x-auto hide-scrollbar px-1">
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
