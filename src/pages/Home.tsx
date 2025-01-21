import { useState } from "react";
import { products } from "@/utils/data/products";
import AuctionSection from "@/components/AuctionSection";
import Banner from "@/components/Banner";
import CarouselCard from "@/components/CarouselCard";
import ProductCard from "@/components/ProductCard";
import SpecialProducts from "@/components/SpecialProducts";
import { Button } from "@/components/ui/button";
import { carouselCardData, techLogos } from "@/utils/dummy_data/data";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { IconType } from "react-icons";
import Slider from "react-slick";

function Home() {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 6000,
    cssEase: "ease-out",
    rtl: true,
    dotsClass: "slick-dots slick-thumb",
    pauseOnHover: true,
    beforeChange: (current: any, next: any) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: (current: any) => setActiveSlide2(current),
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

  return (
    <div className="containe pt-4 px-4 md:px-12 mx-auto">
      {/* Slider */}
      <div className="pb-14 pt-8">
        <Slider {...settings}>
          {[1, 2, 3, 4, 5].map((item, i) => (
            <div
              key={i}
              className={`h-[240px] md:h-[360px] lg:h-[480px] rounded-xl overflow-hidden border border-orange-500/20 bg-green-${
                i + 3
              }00`}
            >
              <h3>{i + 1}</h3>
            </div>
          ))}
        </Slider>
      </div>

      {/* Category Carousel */}
      <div className="mb-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <h2 className="font-tajawal-medium text-lg border-b-2 border-orange-400 w-fit">
              أفضل الفئات
            </h2>
            <span className="absolute -bottom-1 right-0 w-1/3 h-[2px] bg-gray-100" />
          </div>
          <Button label="عرض جميع الفئات" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-flow-col auto-cols-max gap-6 py-4 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 px-1">
          {carouselCardData.map((item) => (
            <div
              key={item.label}
              className="min-w-[130px] transition-transform duration-300 hover:-translate-y-1"
            >
              <CarouselCard
                label={item.label}
                link={item.link}
                Icon={item.Icon as IconType}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Auctions Section */}
      <div className="mb-20">
        <AuctionSection />
      </div>

      {/* Banner Section */}
      <div className="mb-20">
        <Banner
          title="بيكسل 9 برو"
          subtitle="عرض ملحمي للذكاء الاصطناعي من كوكل."
          price={320000}
          primaryImage="https://imgs.search.brave.com/6jvVwjfcZkPlC9DY9B3xPr5Qzhc_-dt0fSl_ALBxX1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmFucG9pbWFn/ZXMuY29tL3dvcmRw/cmVzcy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wOC9nb29n/bGUtcGl4ZWwtOS1w/cm8teGwucG5n"
        />
      </div>

      {/* Products Cards */}
      <div className="mb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-tajawal-medium text-lg border-b-2 border-orange-400 w-fit">
            منتجات مميزة
          </h2>
          <Button label="عرض المزيد" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} size="lg" />
          ))}
        </div>
      </div>

      {/* Special Products */}
      <div className="mb-20">
        <SpecialProducts />
      </div>

      {/* Brands Carousel */}
      <div className="mb-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <h2 className="font-tajawal-medium text-lg border-b-2 border-orange-400 w-fit">
              تسوق بالماركات
            </h2>
            <span className="absolute -bottom-1 right-0 w-1/3 h-[2px] bg-gray-100" />
          </div>
          <Button label="عرض جميع الماركات" />
        </div>

        {/* Brands Grid */}
        <div className="grid grid-flow-col auto-cols-max gap-6 py-4 overflow-x-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 px-1">
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
