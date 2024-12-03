import CarouselCard from "@/components/CarouselCard";
import Button from "@/components/CustomButton";
import Footer from "@/components/Footer";
import { carouselCardData, cart, prices } from "@/utils/dummy_data/data";

import CustomInput from "@/components/CustomInput";
import Navbar from "@/components/Navbar";
import { Button as Button1 } from "@/components/ui/button";
import { Home } from "lucide-react";
import AuctionCard from "@/components/AuctionCard";
import ProductCard from "@/components/ProductCard";
import Banner from "@/components/Banner";
import Slider from "react-slick";
import { AuctionDialog } from "@/components/AuctionDialog";
import ProductsTable from "@/components/CustomTable";
import { useState } from "react";
import { IconType } from "react-icons";
import ReviewCard from "@/components/ReviewCard";
import CartReviewCard from "@/components/CartReviewCard";

const Components = () => {
  const handleSubscribe = () => {
    alert("Subscribed!");
  };

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "بلي ستيشن 5 اوربن 2",
      description: "ابيض - 825 غ ب",
      price: "500,000 د.ع",
      quantity: 1,
      image:
        "https://www.albadeel.com.ly/wp-content/uploads/2023/12/sony-playstation-5-slim-console-disc-edition-2.png",
    },
    {
      id: 2,
      name: "امازون ايكو دوت جيل الرابع",
      description: "ازرق",
      price: "75,000 د.ع",
      quantity: 2,
      image:
        "https://cdn.salla.sa/lvble/CWfzTsJm0akaqFuTOac8R7xgaRApnKD9HHr0GCmM.jpg",
    },
    {
      id: 3,
      name: "سماعات سوني ام 5",
      description: "أسود",
      price: "90,000 د.ع",
      quantity: 1,
      image:
        "https://www.albadeel.com.ly/wp-content/uploads/2023/12/sony-playstation-5-slim-console-disc-edition-2.png",
    },
  ]);

  // Helper functions as defined above
  const priceToNumber = (price: string): number => {
    return Number(price.replace(/[^\d.]/g, "").replace(/,/g, ""));
  };

  const formatPrice = (number: number): string => {
    return `${number.toLocaleString()} د.ع`;
  };

  const calculateTotal = (products: Product[]): string => {
    const totalAmount = products.reduce((sum, product) => {
      const price = priceToNumber(product.price);
      return sum + price * product.quantity;
    }, 0);

    return formatPrice(totalAmount);
  };

  const handleQuantityChange = (
    productId: number | string,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      // Remove the product if quantity reaches zero
      handleRemove(productId);
    } else {
      // Update quantity if it's greater than zero
      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, quantity: newQuantity }
            : product
        )
      );
    }
  };

  const handleRemove = (productId: number | string) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  // Calculate total dynamically
  const total = calculateTotal(products);
  return (
    <div className="bg-light-200 px-10 flex flex-col gap-x-20">
      <div className="navbar_and_footer">
        <SectionTitle title="Navbar & Footer" />
        <Navbar hasAd adTitle="خصم 15% على قسم الاكسسوارات" />

        <div className="footer mt-10">
          <Footer />
        </div>
      </div>

      <div className="btns">
        <SectionTitle title="Cards" />
        <div>
          <Banner
            title="بيكسل 9 برو"
            subtitle="عرض ملحمي للذكاء الاصطناعي من كوكل."
            price={520}
            primaryImage="https://imgs.search.brave.com/6jvVwjfcZkPlC9DY9B3xPr5Qzhc_-dt0fSl_ALBxX1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmFucG9pbWFn/ZXMuY29tL3dvcmRw/cmVzcy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wOC9nb29n/bGUtcGl4ZWwtOS1w/cm8teGwucG5n"
            className="my-8"
          />
        </div>

        <AuctionDialog
          prices={prices}
          endTime="2024-12-15T12:00:00"
        />

        <div className="flex py-8">
          <CartReviewCard cart={cart} />
        </div>

        <div className="py-4 flex flex-col justify-start items-start gap-y-3">

          <ReviewCard rating={3.5} name="علاء" date="2024-10-12" comment="يدعم الهاتف معظم المستشعرات" />
          <ReviewCard rating={2} name="ياسر" date="2024-10-12" comment="يدعم الهاتف معظم المستشعرات" />
          <ReviewCard rating={5} name="حسن" date="2024-10-12" comment="يدعم الهاتف معظم المستشعرات" />
          <ReviewCard rating={0} name="محمد" date="2024-10-12" comment="يدعم الهاتف معظم المستشعرات" />
        </div>

        <div className="my-4">
          <AuctionCard
            productName="اكس بوكس سيريس اكس"
            currentPrice={310000}
            startingPrice={25000}
            endTime="2024-12-15T12:00:00" // Set the actual auction end time here
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
          {/* <Slider {...settings}>
          {
            carouselCardData.map((item) => (
              <div draggable="false">
                <CarouselCard label={item.label} key={item.label} link={item.link} Icon={item.Icon} />
              </div>
            ))
          }
        </Slider> */}

          <div className="flex gap-x-4 py-2 overflow-x-auto">
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

          <div className="btns">
            <SectionTitle title="Buttons" />
            <Button
              label="Submit"
              action={() => alert("Button clicked!")}
              variation="fill"
              color="orange"
            />
            <Button
              label="Delete"
              variation="outline"
              color="orange"
              disabled
            />
            <Button label="Ghost" variation="ghost" color="orange" />
            <Button
              label="Submit"
              action={() => alert("Button clicked!")}
              variation="fill"
              isLoading
              color="orange"
            />
            <Button1 label="shadcn" variation="outline" />
          </div>

          <div className="input flex  gap-4 mt-4">
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
            <ProductsTable
              products={products}
              total={total}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
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
