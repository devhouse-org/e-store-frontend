import CarouselCard from "@/components/CarouselCard";
import Footer from "@/components/Footer";
import {
  carouselCardData,
  prices,
  cart,
  locations,
  techLogos,
} from "@/utils/dummy_data/data";
import CustomInput from "@/components/CustomInput";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import AuctionCard from "@/components/AuctionCard";
import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import { AuctionDialog } from "@/components/AuctionDialog";
import ProductsTable from "@/components/CustomTable";
import { useState } from "react";
import { IconType } from "react-icons";
import ReviewCard from "@/components/ReviewCard";
import useProductStore from "@/stores/productStore";
import CartReviewCard from "@/components/CartReviewCard";
import SpecialProducts from "@/components/SpecialProducts";
import AuctionSection from "@/components/AuctionSection";
import Filter from "@/components/Filter";
import LocationCard from "@/components/LocationCard";
import Stepper from "@/components/Stepper";
import Slider from "react-slick";

const tabs = ["سلة التسوق", "الشحن والتسليم", "الدفع"];

const Components = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

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

  const handleSubscribe = () => {
    alert("Subscribed!");
  };

  const { products } = useProductStore();

  const priceToNumber = (price: string): number => {
    return Number(price.replace(/[^\d.]/g, "").replace(/,/g, ""));
  };

  const formatPrice = (number: number): string => {
    return `${number.toLocaleString()} د.ع`;
  };

  const calculateTotal = (): string => {
    const totalAmount = products.reduce((sum, product) => {
      const price = priceToNumber(product.price);
      return sum + price * product.quantity;
    }, 0);

    return formatPrice(totalAmount);
  };

  const total = calculateTotal();

  const imgsrc = "https://plchldr.co/i/1070x200?bg=CE86ED";

  return (
    <div className="bg-light-200 px2 flex flex-col gap-x-20 overflow-x-hidden">
      <div className="mx-4 mt-4 mb-8">
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
      <div className="navbar_and_footer">
        <div className="hidden md:block">
          <SectionTitle title="Navbar & Footer" />
        </div>
        <Navbar hasAd adTitle="خصم 15% على قسم الاكسسوارات" />

        <div className="footer mt-10">
          <Footer />
        </div>
      </div>

      <div className="special-products">
        <SectionTitle title="Special Products" />
        <SpecialProducts />
      </div>

      <div className="cards">
        <SectionTitle title="Stepper" />
        <div>
          <Stepper
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>

      <div className="cards">
        <SectionTitle title="Cards" />

        <div className="flex flex-col md:flex-row gap-4">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location.location}
              phoneNumber={location.phoneNumber}
              phoneNumber2={location.phoneNumber2}
              province={location.province}
              city={location.city}
              country={location.country}
            />
          ))}
        </div>

        <div>
          <Banner
            title="بيكسل 9 برو"
            subtitle="عرض ملحمي للذكاء الاصطناعي من كوكل."
            price={520}
            primaryImage="https://imgs.search.brave.com/6jvVwjfcZkPlC9DY9B3xPr5Qzhc_-dt0fSl_ALBxX1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmFucG9pbWFn/ZXMuY29tL3dvcmRw/cmVzcy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wOC9nb29n/bGUtcGl4ZWwtOS1w/cm8teGwucG5n"
            className="my-8"
          />
        </div>

        <AuctionDialog prices={prices} endTime="2024-12-28T12:00:00" />

        <div className="flex py-8">
          <CartReviewCard cart={cart} />
        </div>

        <div className="py-4 flex flex-col justify-start items-start gap-y-3">
          <ReviewCard
            rating={3.5}
            name="علاء"
            date="2024-10-12"
            comment="يدعم الهاتف معظم المستشعرات"
          />
          <ReviewCard
            rating={2}
            name="ياسر"
            date="2024-10-12"
            comment="يدعم الهاتف معظم المستشعرات"
          />
          <ReviewCard
            rating={5}
            name="حسن"
            date="2024-10-12"
            comment="يدعم الهاتف معظم المستشعرات"
          />
          <ReviewCard
            rating={0}
            name="محمد"
            date="2024-10-12"
            comment="يدعم الهاتف معظم المستشعرات"
          />
        </div>

        <div className="my-4">
          <AuctionCard
            productName="اكس بوكس سيريس اكس"
            currentPrice={310000}
            startingPrice={25000}
            endTime="2025-12-28T12:00:00" // Set the actual auction end time here
            imageSrc="https://ardes.bg/uploads/original/konzola-xbox-series-x-1tb-466538.jpg"
            onSubscribe={handleSubscribe}
          />
        </div>

        <div className="flex gap-4 items-center">
          <ProductCard
            size="lg"
            productName="ريلمي 9 آي - اسود"
            productPrice={165000}
            productImage="https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw" // Replace with the actual image URL
          />
          <ProductCard
            size="sm"
            productName="ريلمي 9 آي - اسود"
            productPrice={165000}
            productImage="https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw" // Replace with the actual image URL
          />
        </div>

        <div className="">
          <div className="flex  gap-x-4 py-2 overflow-x-auto">
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
          </div>

          <div className="flex  gap-x-4 py-2 overflow-x-auto">
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

          <div className="btns flex flex-col w-fit gap-2">
            <SectionTitle title="Buttons" />
            <Button
              label="Submit"
              action={() => alert("Button clicked!")}
              variant={"default"}
            />
            <Button
              label="Delete"
              variant={"default"}
              color="orange"
              disabled
            />
            <Button label="Ghost" variant={"ghost"} color="orange" />
            <Button label="Outline" variant={"outline"} />
          </div>

          <div className="input flex gap-4 mt-4">
            <CustomInput
              label="الاسم"
              type="text"
              placeholder="ادخل الاسم"
              value=""
              onChange={(e) => console.log(e.target.value)}
              name="name"
              required
            />
            <CustomInput
              label="البريد الالكتروني"
              type="email"
              placeholder="ادخل بريدك الالكتروني"
              value=""
              onChange={(e) => console.log(e.target.value)}
              name="email"
              required
            />
            <CustomInput
              label="كلمة السر"
              type="password"
              placeholder="ادخل كلمة السر"
              value=""
              onChange={(e) => console.log(e.target.value)}
              name="password"
              required
            />
          </div>
          {/* Table */}
          <div className="my-20">
            <ProductsTable total={total} />
          </div>
          {/* Auction Section */}
          <div>
            <AuctionSection />
          </div>
          {/* Filter */}
          <div className="my-5">
            <Filter />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Components;

type SectionTitleProps = {
  title: string;
};
const SectionTitle = ({ title }: SectionTitleProps) => (
  <h1 className="text-[32px]">{title}</h1>
);
