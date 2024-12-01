import CarouselCard from "@/components/CarouselCard";
import Button from "@/components/CustomButton";
import Footer from "@/components/Footer";
import { carouselCardData } from "@/utils/dummy_data/data";

import CustomInput from "@/components/CustomInput";
import Navbar from "@/components/Navbar";
import { Button as Button1 } from "@/components/ui/button";
import { Home } from "lucide-react";
import AuctionCard from "@/components/AuctionCard";

const handleSubscribe = () => {
  alert("Subscribed!");
};
const Components = () => {
  return (
    <div className="bg-light-200 px-14 flex flex-col gap-x-20">
      <div className="navbar_and_footer">
        <SectionTitle title="Navbar & Footer" />
        <Navbar hasAd adTitle="خصم 15% على قسم الاكسسوارات" />

        <div className="footer mt-10">
          <Footer />
        </div>
      </div>

      <div className="btns">
        <SectionTitle title="Cards" />

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

        <div className="flex gap-x-4 py-2 overflow-x-auto">

          {
            carouselCardData.map((item) => (
              <>
                <CarouselCard label={item.label} key={item.label} link={item.link} Icon={item.Icon} />
              </>
            ))
          }
          <div className="flex gap-x-4 py-2 flex-row-reverse overflow-x-auto">
            {carouselCardData.map((item) => (
              <>
                <CarouselCard
                  label={item.label}
                  key={item.label}
                  link={item.link}
                  Icon={item.Icon}
                />
              </>
            ))}
          </div>
        </div>

        <div className="btns">
          <SectionTitle title="Buttons" />
          <Button
            label="Submit"
            action={() => alert("Button clicked!")}
            variation="fill"
            color="orange"
          />
          <Button label="Delete" variation="outline" color="orange" disabled />
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
