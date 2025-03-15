import CartReviewCard from "@/components/CartReviewCard";
import { Button } from "@/components/ui/button";
import { cart } from "@/utils/dummy_data/data";
import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Wallet,
  Truck,
  CheckCircle,
  LucideArrowRight,
  Loader2,
} from "lucide-react";
import CreditCardForm from "@/components/CreditCardForm";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import axiosInstance from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [selected, setSelected] = useState(payments[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { products } = useCartStore();

  useEffect(() => {
    const savedAddress = localStorage.getItem("selectedDeliveryAddress");
    if (savedAddress) {
      setSelectedAddress(JSON.parse(savedAddress));
    }
  }, []);

  const handlePaymentSubmit = async () => {
    switch (selected.id) {
      case 1: // Cash on delivery
        try {
          setIsProcessing(true);
          const partnerId = localStorage.getItem("id");
          const deliveryAddress = JSON.parse(
            localStorage.getItem("selectedDeliveryAddress") || "{}"
          );

          if (!partnerId || !deliveryAddress.id) {
            throw new Error("Missing required data");
          }

          const orderProducts = products.map((product) => {
            const orderProduct: any = {
              product_id: Number(product.id),
              quantity: product.quantity,
            };

            if (
              product.selected_attributes &&
              product.selected_attributes.length > 0
            ) {
              orderProduct.attributes = product.selected_attributes.map(
                (attr: any) => ({
                  attribute_id: attr.attribute_id,
                  value_id: attr.value_id,
                })
              );
            }

            return orderProduct;
          });

          const response = await axiosInstance.post("/products/create-order", {
            partner_id: Number(partnerId),
            partner_shipping_id: deliveryAddress.id,
            products: orderProducts,
          });

          if (response.data.success) {
            // Show success toast
            toast({
              title: "تم إنشاء الطلب بنجاح",
              description: "سيتم تحويلك إلى صفحة سجل الطلبات",
              variant: "success",
            });

            // Clear data
            localStorage.removeItem("selectedDeliveryAddress");
            useCartStore.getState().clearCart();

            // Navigate after a delay
            setTimeout(() => {
              navigate("/dashboard/history");
            }, 2000);
          }
        } catch (error: any) {
          console.error("Error creating order:", error);
          // Show error toast instead of alert
          toast({
            title: "خطأ في إنشاء الطلب",
            description:
              error.response?.data?.message || "يرجى المحاولة مرة أخرى",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
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
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-4 animate-fade-in max-w-md w-full mx-4">
          <div className="relative">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            <Loader2 className="w-24 h-24 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin opacity-20" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">
            تم حجز الطلب بنجاح!
          </h2>
          <p className="text-gray-600">جاري تحويلك لصفحة سجل الطلبات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6 text-right">
          {showCreditCardForm ? (
            <button onClick={() => setShowCreditCardForm(false)}>
              <LucideArrowRight />
            </button>
          ) : (
            "اختر طريقة الدفع"
          )}
          {/* اختر طريقة الدفع */}
        </h2>

        {!showCreditCardForm ? (
          <>
            <div className="grid grid-cols-1 gap-4">
              {payments.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`p-4 cursor-pointer transition-all duration-200 bg-white border 
                                      ${
                                        selected.id === item.id
                                          ? "border-orange-200"
                                          : "border-gray-100 hover:border-orange-100"
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
                disabled={isProcessing}
              />
              <Button
                label={isProcessing ? "جاري المعالجة..." : "تأكيد الدفع"}
                className="min-w-[120px]"
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
                icon={
                  isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : undefined
                }
              />
            </div>
          </>
        ) : (
          <>
            <CreditCardForm onSubmit={handleCreditCardSubmit} />
          </>
        )}
      </div>

      <div className="w-full md:w-[380px] space-y-4">
        {selectedAddress && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-medium text-lg mb-2">عنوان التوصيل</h3>
            <div className="text-gray-600 space-y-1">
              <p>{selectedAddress.street}</p>
              {selectedAddress.street2 && <p>{selectedAddress.street2}</p>}
              <p>{`${selectedAddress.city}, ${selectedAddress.state}`}</p>
              <p>{selectedAddress.country}</p>
              {selectedAddress.phone && <p>{selectedAddress.phone}</p>}
              {selectedAddress.zip && <p>{selectedAddress.zip}</p>}
            </div>
          </div>
        )}
        <CartReviewCard cart={products} />
      </div>
    </div>
  );
};

export default Payment;
