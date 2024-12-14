import CartReviewCard from '@/components/CartReviewCard'
import { Button } from '@/components/ui/button'
import { cart } from '@/utils/dummy_data/data'
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

const payments = [
    {
        id: 1,
        label: "دفع عند الاستلام",
        icon: "",
    },
    {
        id: 2,
        label: "زين كاش",
        icon: "",
    },
    {
        id: 3,
        label: "ماستر كارد",
        icon: "",
    },
]

const Payment = ({ setActive }: any) => {
    const [selected, setSelected] = useState(payments[0]);

    return (
        <div>

            <div className="flex items-start justify-between">
                <div className="grid grid-cols-1 sm:grid-cols-2">
                    {payments.map((item) => <div onClick={() => setSelected(item)} className={`py-2 px-4 cursor-pointer hover:shadow-lg transition ease-in-out bg-white border ${selected.label === item.label ? "border-orange-500" : "border-light-200"} shadow-md rounded-md w-[300px] m-1`}>{item.label}</div>)}
                </div>

                <div className='hidden md:block'>
                    <CartReviewCard cart={cart} />
                </div>
            </div>

            <div className='footer mt-4 flex items-center justify-between'>
                {/* <button onClick={() => setActive(steps[1])}>Delivery</button> */}
                <Button label='الشحن والتسليم' variant={"secondary"} onClick={() => setActive(steps[1])} />
                <Button label='تأكيد' />
            </div>
        </div>
    )
}

export default Payment