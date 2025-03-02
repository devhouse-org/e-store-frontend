import CartReviewCard from '@/components/CartReviewCard'
import LocationCard from '@/components/LocationCard'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/useCartStore'
import axiosInstance from '@/utils/axiosInstance'
import { cart, locations } from '@/utils/dummy_data/data'
import React, { useEffect, useState } from 'react'

type Location = {
    id: number;
    street: string;
    street2?: string;
    phone?: string;
    state_id: [number, string];
    city: string;
    country_id: [number, string];
}

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
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const fetchLocations = async () => {
        try {
            setLoading(true);
            setError(null);
            const userId = localStorage.getItem("id");
            console.log(userId)
            const response = await axiosInstance.post("/user/addresses", { user_id: userId });
            setLocations(response.data);
        } catch (err) {
            setError("Failed to fetch locations");
            console.error("Error fetching locations:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const { products } = useCartStore();

    const handleSelect = (location: Location) => {
        setSelectedLocation(location);
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
                {
                    loading ? <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
                    </div> : <div className="grid grid-cols-2 gap-4">
                        {locations.map((location) => (
                            <LocationCard
                                key={location.id}
                                location={`${location.street}${location.street2 ? `, ${location.street2}` : ''}`}
                                phoneNumber={location.phone || ''}
                                phoneNumber2=""
                                province={location.state_id[1]}
                                city={location.city}
                                country={location.country_id[1]}
                                selectable
                                isSelected={selectedLocation?.id === location.id}
                                handleSelect={() => {
                                    handleSelect(location)
                                }}
                            />
                        ))}
                    </div>
                }


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
                <CartReviewCard cart={products} />
            </div>
        </div>
    )
}

export default Address