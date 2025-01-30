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

import ban1 from "@/assets/images/banners/1.webp";
import ban2 from "@/assets/images/banners/2.webp";
import ban3 from "@/assets/images/banners/3.webp";
import ban4 from "@/assets/images/banners/4.webp";
import ban5 from "@/assets/images/banners/5.webp";

function Home() {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const banners = [ban1, ban2, ban3, ban4, ban5];

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

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.querySelector('.categories-scroll');
    if (container) {
      const scrollAmount = 300; // Adjust this value to control scroll distance
      container.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className=" pt-4 px-4 md:px-12 mx-auto">
      {/* Slider */}
      <div className="pb-14 pt-8">
        <Slider {...settings}>
          {banners.map((item, i) => (
            <div
              key={i}
              className={`h-[280px] md:h-[380px] outline-none border-none lg:h-[480px] roundedxl overflow-hidden`}
            >
              <img src={item} alt="" className="focus:outline-none border-none w-full h-full object-cover" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Category Carousel */}
      <div className="mb-20 bg-white p-4 rounded-md shadow-md">
        <div className="relative">
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
          >
            <LucideArrowLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50"
          >
            <LucideArrowRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Categories */}
          <div className="flex mb-6 gap-x-4 overflow-x-auto hide-scrollbar categories-scroll px-12 scroll-smooth">
            {[1, 21, 2, 3, 4, 5, 6, 7, 8, 9, 101, 2, 3, 4, 5, 6, 7, 8, 9, 101, 2, 3, 4, 5, 6, 7, 8, 9, 10, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div key={item} className="">
                <Button variant="outline" label={`category ${item}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-flow-col auto-cols-max gap-6 py-4 overflow-x-auto hide-scrollbar px-1">
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

      {/* Products Cards */}
      <div className="mb-20 bg-white p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-tajawal-medium text-lg border-b-2 border-orange-400 w-fit">
            الاكثر مبيعاً
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
      <div className="mb-16 bg-white p-4 rounded-md shadow-md">
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
