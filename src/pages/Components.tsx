import Button from "@/components/CustomButton";

type SectionTitleProps = {
  title: string;
};
const SectionTitle = ({ title }: SectionTitleProps) => (
  <h1 className="text-[32px]">{title}</h1>
);

const Components = () => {
  return (
    <div className="px-14 flex flex-col gap-x-20">
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
