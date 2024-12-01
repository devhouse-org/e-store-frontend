import CarouselCard from "@/components/CarouselCard";
import Button from "@/components/CustomButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { carouselCardData } from "@/utils/dummy_data/data";

const Components = () => {
  return (
    <div className="bg-light-200 px-14 flex flex-col gap-x-20">
      <div className="navbar_and_footer">
        <SectionTitle title="Navbar & Footer" />
        <Navbar hasAd adTitle="50% off on the Mobile covers section" />

        <div className="footer mt-10">
          <Footer />
        </div>
      </div>

      <div className="btns">
        <SectionTitle title="Buttons" />

        <div className="flex gap-x-4 py-2 flex-row-reverse overflow-x-auto">

          {
            carouselCardData.map((item) => (
              <>
                <CarouselCard label={item.label} key={item.label} link={item.link} Icon={item.Icon} />
              </>
            ))
          }
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
