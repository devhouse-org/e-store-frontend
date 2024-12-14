import React, { useState } from 'react'

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
    const [active, setActive] = useState(steps[0]);

    const activeStep = () => {
        switch (active.value) {
            case StepsEnum.ITEMS:
                return (
                    <div>
                        <h1>items</h1>
                        <button onClick={() => setActive(steps[1])}>Delivery</button>
                    </div>
                );

            case StepsEnum.ADDRESS:
                return (
                    <div>
                        <h1>delivery</h1>
                        <button onClick={() => setActive(steps[2])}>payment</button>
                        <button onClick={() => setActive(steps[0])}>Products</button>
                    </div>
                );

            case StepsEnum.PAYMENT:
                return (
                    <div>
                        <h1>Payment</h1>
                        <button onClick={() => setActive(steps[2])}>Delivery</button>
                        <button onClick={() => setActive(steps[0])}>Products</button>
                    </div>
                );

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
            {activeStep()}
        </div>
    )
}

export default Cart