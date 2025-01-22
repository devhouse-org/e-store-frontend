import CartReviewCard from "@/components/CartReviewCard";
import { Button } from "@/components/ui/button";
import { cart } from "@/utils/dummy_data/data";
import React, { useState } from "react";
import { CreditCard, Wallet, Truck, CheckCircle } from "lucide-react";
import CreditCardForm from "@/components/CreditCardForm";
import { useNavigate } from "react-router-dom";

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

const payments = [
  {
    id: 1,
    label: "دفع عند الاستلام",
    icon: <Truck className="w-6 h-6" />,
    description: "الدفع نقداً عند استلام الطلب",
  },
  {
    id: 2,
    label: "زين كاش",
    icon: <Wallet className="w-6 h-6" />,
    description: "الدفع باستخدام محفظة زين كاش",
  },
  {
    id: 3,
    label: "ماستر كارد",
    icon: <CreditCard className="w-6 h-6" />,
    description: "الدفع باستخدام البطاقة الائتمانية",
  },
];

const Payment = ({ setActive }: any) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(payments[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);

  const handlePaymentSubmit = () => {
    switch (selected.id) {
      case 1: // Cash on delivery
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        break;
      case 2: // Zain Cash
        window.open("https://zaincash.com", "_blank");
        break;
      case 3: // Credit Card
        setShowCreditCardForm(true);
        break;
    }
  };

  const handleCreditCardSubmit = () => {
    setShowSuccess(true);
    setShowCreditCardForm(false);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center space-y-4 animate-fade-in">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
          <h2 className="text-2xl font-semibold text-gray-800">
            تم الدفع بنجاح!
          </h2>
          <p className="text-gray-600">جاري تحويلك للصفحة الرئيسية...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-right">
        اختر طريقة الدفع
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {!showCreditCardForm ? (
            <>
              <div className="grid grid-cols-1 gap-4">
                {payments.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className={`p-4 cursor-pointer transition-all duration-200 bg-white border-2 
                                        ${
                                          selected.id === item.id
                                            ? "border-orange-500 ring-2 ring-orange-200"
                                            : "border-gray-100 hover:border-orange-200"
                                        } 
                                        rounded-lg shadow-sm`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`${
                          selected.id === item.id
                            ? "text-orange-500"
                            : "text-gray-500"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{item.label}</h3>
                        <p className="text-gray-500 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button
                  label="الشحن والتسليم"
                  variant="secondary"
                  onClick={() => setActive(steps[1])}
                />
                <Button
                  label="تأكيد الدفع"
                  className="min-w-[120px]"
                  onClick={handlePaymentSubmit}
                />
              </div>
            </>
          ) : (
            <CreditCardForm onSubmit={handleCreditCardSubmit} />
          )}
        </div>

        <div className="w-full md:w-[380px]">
          <CartReviewCard cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
