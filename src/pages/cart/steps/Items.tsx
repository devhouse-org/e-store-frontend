import ProductsTable from "@/components/CustomTable";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type Props = {};
enum StepsEnum {
  ITEMS = "items",
  ADDRESS = "address",
  PAYMENT = "payment",
}

const steps = [
  {
    id: 1,
    label: { ar: "المنتجات", en: "Products" },
    value: StepsEnum.ITEMS,
  },
  {
    id: 2,
    label: { ar: "الشحن والتسليم", en: "Delivery" },
    value: StepsEnum.ADDRESS,
  },
  {
    id: 3,
    label: { ar: "الدفع", en: "Payment" },
    value: StepsEnum.PAYMENT,
  },
];

const Items = ({ setActive }: any) => {
  return (
    <div>
      <div className="">
        <ProductsTable />
      </div>
      <div className="footer mt-4 flex items-center justify-between">
        {/* <button onClick={() => setActive(steps[1])}>Delivery</button> */}
        <Link to={"/"}>
          <Button
            className="w-20"
            // label="العودة إلى الرئيسية"
            Icon={MoveRight as IconType}
            variant={"secondary"}
            action={() => setActive(steps[1])}
          />
        </Link>
        <Button label="الشحن والتسليم" onClick={() => setActive(steps[1])} />
      </div>
    </div>
  );
};

export default Items;
