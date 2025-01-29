import React, { useState } from "react";
import Items from "./steps/Items";
import Address from "./steps/Address";
import Payment from "./steps/Payment";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Flag, ShoppingBag } from "lucide-react";

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

const Cart = (props: Props) => {
  const { products: cartProducts } = useCartStore();
  const [active, setActive] = useState(steps[0]);

  // Add this helper function to check if a step is completed or active
  const getStepStatus = (step: (typeof steps)[0]) => {
    if (step.id < active.id) {
      return "completed";
    } else if (step.id === active.id) {
      return "active";
    }
    return "upcoming";
  };

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center space-y-3">
          <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto">
            <ShoppingBag className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-2xl font-tajawal-medium">السلة فارغة</h2>
          <p className="text-gray-500 font-tajawal-regular">
            لم تقم بإضافة أي منتج إلى السلة بعد
          </p>
        </div>

        <Link to="/products">
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
            label="تسوق الآن"
          />
        </Link>
      </div>
    );
  }

  const activeStep = () => {
    switch (active.value) {
      case StepsEnum.ITEMS:
        return <Items setActive={setActive} />;

      case StepsEnum.ADDRESS:
        return <Address setActive={setActive} />;

      case StepsEnum.PAYMENT:
        return <Payment setActive={setActive} />;

      default:
        break;
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <div className="max-w-2xl mx-auto relative mt-8">
          <div className="relative flex items-center justify-between">
            {/* Progress Line */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-orange-200 -translate-y-1/2" />

            {/* Steps */}
            <ol className="relative z-10 flex justify-between w-full items-center">
              {steps.map((step, i) => {
                const status = getStepStatus(step);
                return (
                  <li key={step.id} className="flex flex-col items-center">
                    {i === steps.length - 1 ? (
                      // Last step (flag)
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${status === "upcoming"
                          ? "bg-white text-orange-500"
                          : "bg-orange-500 text-white"
                          } border border-orange-500 font-medium transition-colors duration-200`}
                      >
                        <Flag
                          className={`w-4 h-4 ${status === "upcoming"
                            ? "text-orange-500"
                            : "text-white"
                            }`}
                        />
                      </div>
                    ) : (
                      // Other steps (numbers)
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${status === "upcoming"
                          ? "bg-white text-orange-500"
                          : "bg-orange-500 text-white"
                          } border border-orange-500 font-medium transition-colors duration-200`}
                      >
                        {i + 1}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Dynamically positioned text below */}
          <div
            className={`mt-4 w-full ${active.id === 1
              ? "text-start"
              : active.id === steps.length
                ? "text-end"
                : "text-center"
              }`}
          >
            <span className="text-sm font-medium text-gray-600">
              {active.label.ar}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 border border-light-200 mb-8 bg-white p-4 rounded-md shadow-md">
        {activeStep()}
      </div>
    </div>
  );
};

export default Cart;
