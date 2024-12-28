import AuctionSection from "@/components/AuctionSection";
import Banner from "@/components/Banner";
import CarouselCard from "@/components/CarouselCard";
import ProductCard from "@/components/ProductCard";
import SpecialProducts from "@/components/SpecialProducts";
import { Button } from "@/components/ui/button";
import { carouselCardData, techLogos } from "@/utils/dummy_data/data";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { useState } from "react";
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
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          initialSlide: 1,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      }
    ]
  };

  return (
    <div className="containe pt-4 px-4 md:px-12 mx-auto">
      {/* Slider */}
      <div className="pb-14 pt-8">
        <Slider {...settings}>
          {[1, 2, 3, 4, 5].map((item, i) => (
            <div
              className={`h-[200px] md:h-[300px] lg:h-[400px] rounded-md overflow-hidden border-2 border-orange-500 bg-green-${i + 3
                }00`}
            >
              <h3>{i + 1}</h3>
            </div>
          ))}
        </Slider>
      </div>
      {/* Category Carousel */}
      <>
        <div className=" flex justify-between pt-4">
          <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit ">
            أفضل الفئات
          </h1>
          <Button label="عرض جميع الفئات" />
        </div>
        <Slider {...categoryCarouselSettings}>
          {carouselCardData.map((item) => (
            <div>
              <CarouselCard
                label={item.label}
                key={item.label}
                link={item.link}
                Icon={item.Icon as IconType}
              />
            </div>
          ))}
        </Slider>
        {/* <div className="flex gap-x-4 overflow-x-auto scrollbar-thin">

          {carouselCardData.map((item) => (
            <div>
              <CarouselCard
                label={item.label}
                key={item.label}
                link={item.link}
                Icon={item.Icon as IconType}
              />
            </div>
          ))}
        </div> */}
      </>
      {/* Auctions Section */}
      <div className="pt-16">
        <AuctionSection />
      </div>
      {/* Banner Section */}
      <div className="pt-16">
        <Banner
          title="بيكسل 9 برو"
          subtitle="عرض ملحمي للذكاء الاصطناعي من كوكل."
          price={520}
          primaryImage="https://imgs.search.brave.com/6jvVwjfcZkPlC9DY9B3xPr5Qzhc_-dt0fSl_ALBxX1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmFucG9pbWFn/ZXMuY29tL3dvcmRw/cmVzcy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wOC9nb29n/bGUtcGl4ZWwtOS1w/cm8teGwucG5n"
        //   className="my-8"
        />
      </div>
      {/* Products Cards */}
      <div className="flex gap-8 pt-16 ">
        {[1, 2, 3, 4, 5].map((item) => (
          <ProductCard
            key={item}
            size="lg"
            productName="ريلمي 9 آي - اسود"
            productPrice={165000}
            productImage="https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw"
          />
        ))}
      </div>
      {/* Special Products */}
      <div className="pt-16">
        <SpecialProducts />
      </div>
      {/* Brands Carousel */}
      <div className="pt-16 pb-8">
        <div className="flex justify-between pt-4">
          <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit ">
            تسوق بالماركات
          </h1>
          <Button label="عرض جميع الماركات" />
        </div>
        <div className="flex gap-x-2 py-2 overflow-x-auto scrollbar-thin">
          {techLogos.map((item) => (
            <div>
              <CarouselCard
                // label={item.label}
                img={item.image}
                key={item.label}
                link={item.link}
                hasBg={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
