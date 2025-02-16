import CartReviewCard from '@/components/CartReviewCard'
import LocationCard from '@/components/LocationCard'
import { Button } from '@/components/ui/button'
import { cart, locations } from '@/utils/dummy_data/data'
import React from 'react'

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

const Address = ({ setActive }: any) => {
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                    {locations.map((location) => (
                        <LocationCard
                            key={location.id}
                            location={location.location}
                            phoneNumber={location.phoneNumber}
                            phoneNumber2={location.phoneNumber2}
                            province={location.province}
                            city={location.city}
                            country={location.country}
                        />
                    ))}
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <Button
                        label="المنتجات"
                        variant="secondary"
                        onClick={() => setActive(steps[0])}
                    />
                    <Button
                        label="الدفع"
                        onClick={() => setActive(steps[2])}
                    />
                </div>
            </div>

            <div className="w-full md:w-[380px]">
                <CartReviewCard cart={cart} />
            </div>
        </div>
    )
}

export default Address