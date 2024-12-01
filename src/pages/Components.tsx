import Button from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
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
  );
};
export default Components;

type SectionTitleProps = {
  title: string;
};
const SectionTitle = ({ title }: SectionTitleProps) => (
  <h1 className="text-[32px]">{title}</h1>
);
