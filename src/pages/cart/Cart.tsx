import React, { useState } from 'react'
import Items from './steps/Items';
import Address from './steps/Address';
import Payment from './steps/Payment';
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

type Props = {}

enum StepsEnum {
    ITEMS = "items",
    ADDRESS = "address",
    PAYMENT = "payment"
}

const steps = [
    {
        id: 1,
        label: { ar: "المنتجات", en: "Products" },
        value: StepsEnum.ITEMS
    },
    {
        id: 2,
        label: { ar: "الشحن والتسليم", en: "Delivery" },
        value: StepsEnum.ADDRESS
    },
    {
        id: 3,
        label: { ar: "الدفع", en: "Payment" },
        value: StepsEnum.PAYMENT
    }
]

const Cart = (props: Props) => {
    const { products: cartProducts } = useCartStore();
    const [active, setActive] = useState(steps[0]);

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
    }


    return (
        <div className='container mx-auto'>

            <div>
                <div
                    className="max-w-xl mx-auto self-center relative mt-8 after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100"
                >
                    <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
                        {
                            steps.map((step, i) => (
                                <li className="flex flex-col items-center gap-2 bg-white p-2">
                                    <span className={`size-6 rounded-full ${step.value === active.value ? "bg-blue-600 text-white" : "bg-gray-100"} text-center text-[10px]/6 font-bold`}>{i + 1}</span>
                                    <span className="hidden sm:block">{step.label.ar}</span>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
            <div className='border border-light-200 mb-8 mt4 p-4 rounded-md shadow-md'>
                {activeStep()}
            </div>
        </div>
    )
}

export default Cart