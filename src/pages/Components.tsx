import Button from "@/components/CustomButton";
import Navbar from "@/components/Navbar";

const Components = () => {
  return (
    <div className="px-14 flex flex-col gap-x-20">
      <div className="navbar_and_footer">
        <SectionTitle title="Navbar & Footer" />
        <Navbar hasAd adTitle="50% off on the Mobile covers section" />
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
