import LocationCard from "@/components/LocationCard";
import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddLocationDialog from "@/components/AddLocationDialog";

interface Location {
  id: number;
  name: string;
  street: string;
  street2: string | false;
  city: string;
  state_id: [number, string];
  country_id: [number, string];
  phone: string | false;
  type: string;
  is_main: boolean;
  address_type: string;
}

const useUserAddresses = (userId: string | null) => {
  return useQuery<Location[], Error>({
    queryKey: ["user-addresses", userId],
    queryFn: async () => {
      const response = await axiosInstance.post<Location[]>("/user/addresses", {
        user_id: userId,
      });
      return response.data;
    },
    enabled: !!userId,
  });
};

const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (addressId: number) => {
      await axiosInstance.delete(`/user/address/${addressId}`);
    },
    onSuccess: () => {
      // Invalidate and refetch addresses after deletion
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
  });
};

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userId = localStorage.getItem("id");
  const {
    data: locationsData,
    isLoading,
    error: locationsError,
    refetch,
  } = useUserAddresses(userId);
  const deleteAddress = useDeleteAddress();

  const fetchLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post("/user/addresses", {
        user_id: userId,
      });
      setLocations(response.data);
    } catch (err) {
      setError("Failed to fetch locations");
      console.error("Error fetching locations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setEmail(localStorage.getItem("email") || "");
    setPhoneNumber(localStorage.getItem("phone") || "");
    fetchLocations();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteAddress.mutateAsync(id);
      refetch();
    } catch (err) {
      console.error("Error deleting location:", err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h1 className="text-xl text-gray-500 font-tajawal-bold">الملف الشخصي</h1>
      {/* Profile Form */}
      <div className="bg-white p-6 rounded shadow">
        <form className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex-1 flex items-center gap-x-2">
              <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">
                الاسم الكامل
              </label>
              <input
                type="text"
                className="mt-1 block w-full outline-none border border-gray-300 py-2 px-4 rounded-md "
                placeholder="أدخل اسمك الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center gap-x-2">
              <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                className="mt-1 block w-full outline-none border border-gray-300 py-2 px-4 rounded-md "
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center gap-x-2">
              <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">
                رقم الهاتف
              </label>
              <input
                type="text"
                className="mt-1 block w-full outline-none border border-gray-300 py-2 px-4 rounded-md "
                placeholder="أدخل رقم هاتفك"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {/* <div className="flex-1 flex items-center gap-x-2">
                            <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">الصورة شخصية</label>
                            <input
                                type="text"
                                className="mt-1 block w-full outline-none border border-gray-300 py-2 px-4 rounded-md "
                                placeholder="الصورة شخصية"
                            />
                        </div> */}
          </div>

          <div className="flex pt-8 justify-between">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300">
              تغيير كلمة المرور
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300">
              تحديث الملف الشخصي
            </button>
          </div>
        </form>
      </div>

      {/* Locations */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4 pb-1 border-b border-light-200">
          <h2 className="text-lg font-tajawal-medium">عناوين التوصيل</h2>
          <AddLocationDialog onSuccess={refetch} />
        </div>
        {loading ? (
          <div className="text-center py-4">جاري التحميل...</div>
        ) : locationsError ? (
          <div className="text-red-500 text-center py-4">
            {locationsError.message}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location.street}
                phoneNumber={location.phone || ""}
                phoneNumber2={location.street2 || ""}
                province={location.state_id[1]}
                city={location.city}
                country={location.country_id[1]}
                id={location.id}
                onUpdate={refetch}
                deletable
                handleDelete={() => handleDelete(location.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
