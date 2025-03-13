import CartReviewCard from "@/components/CartReviewCard";
import LocationCard from "@/components/LocationCard";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import Loader from "@/components/ui/LoadingState";
import AddLocationDialog from "@/components/AddLocationDialog";
import { Skeleton } from "@/components/ui/skeleton";

interface Location {
  id: number;
  name: string;
  street: string;
  street2: string | false;
  city: string;
  state_id: boolean | [number, string];
  zip: boolean | string;
  country_id: boolean | [number, string];
  phone: string | false;
  type: string;
}

interface AddressesResponse {
  success: boolean;
  addresses: Location[];
}

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

const CartReviewSkeleton = () => {
  return (
    <div className="p-6 bg-white rounded-lg">
      <Skeleton className="h-6 w-32 mb-6" />

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-28" />
        </div>
      </div>
    </div>
  );
};

const Address = ({ setActive }: any) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const { products } = useCartStore();

  const fetchLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem("id");
      const response = await axiosInstance.post<AddressesResponse>(
        "/user/addresses",
        {
          partner_id: Number(userId),
        }
      );
      setLocations(response.data.addresses);
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

  const handleSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <div className="bg-white p-6 rounded-lg ">
          <div className="flex items-center justify-between pb-4 mb-4">
            <h2 className="text-lg font-tajawal-medium">عناوين التوصيل</h2>
            <AddLocationDialog onSuccess={fetchLocations} />
          </div>

          {loading ? (
            <div className="py-4">
              <CartReviewSkeleton />
            </div>
          ) : error ? (
            <div className="py-4 text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locations.length > 0 ? (
                locations.map((location) => (
                  <LocationCard
                    editable={false}
                    key={location.id}
                    location={location.street}
                    province={
                      typeof location.state_id === "object"
                        ? location.state_id[1]
                        : ""
                    }
                    city={location.city}
                    country={
                      typeof location.country_id === "object"
                        ? location.country_id[1]
                        : ""
                    }
                    country_id={
                      typeof location.country_id === "object"
                        ? location.country_id
                        : undefined
                    }
                    state_id={
                      typeof location.state_id === "object"
                        ? location.state_id
                        : undefined
                    }
                    id={location.id}
                    onUpdate={fetchLocations}
                    selectable
                    isSelected={selectedLocation?.id === location.id}
                    handleSelect={() => handleSelect(location)}
                  />
                ))
              ) : (
                <div className="col-span-2 py-4 text-center">
                  <p className="text-gray-500 font-tajawal-medium">
                    لا توجد عناوين
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            label="المنتجات"
            onClick={() => setActive(steps[0])}
          />
          <Button
            onClick={() => setActive(steps[2])}
            disabled={!selectedLocation}
            label="الدفع"
          />
        </div>
      </div>

      <div className="w-full md:w-[380px]">
        {loading ? <CartReviewSkeleton /> : <CartReviewCard cart={products} />}
      </div>
    </div>
  );
};

export default Address;
