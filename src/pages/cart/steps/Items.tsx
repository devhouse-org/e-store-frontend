import ProductsTable from "@/components/CustomTable";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";
import CartReviewCard from "@/components/CartReviewCard";
import { cart } from "@/utils/dummy_data/data";
import { useCart } from "@/context/CartContext";

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
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <ProductsTable />
        <div className="mt-8 flex items-center justify-between">
          <Link to={"/"}>
            <Button
              className="w-20"
              Icon={MoveRight as IconType}
              variant={"secondary"}
            />
          </Link>
          <Button label="الشحن والتسليم" onClick={() => setActive(steps[1])} />
        </div>
      </div>

      <div className="w-full md:w-[380px]">
        <CartReviewCard cart={cart} />
      </div>
    </div>
  );
};

export default Items;
