import LocationCard from "@/components/LocationCard";
import { Button } from "@/components/ui/button";
import { LucideCamera, LucideKeyRound, LucidePlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import axios from "axios";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AddLocationDialog from "@/components/AddLocationDialog";
import { useToast } from "@/hooks/use-toast";

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

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface PartnerData {
  success: boolean;
  partner: {
    id: number;
    name: string;
    email: string;
    phone: string | false;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const useUserAddresses = (userId: string | null) => {
  return useQuery({
    queryKey: ["user-addresses", userId],
    queryFn: async () => {
      const response = await axiosInstance.post<AddressesResponse>("/user/addresses", {
        partner_id: Number(userId),
      });
      return response.data.addresses;
    },
    enabled: !!userId,
  });
};

const useUserData = (userId: string | null) => {
  return useQuery({
    queryKey: ["user-data", userId],
    queryFn: async () => {
      const response = await axiosInstance.get<UserData>(`/user/partner/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};

const usePartnerData = (userId: string | null) => {
  return useQuery({
    queryKey: ["partner-data", userId],
    queryFn: async () => {
      const response = await axiosInstance.get<PartnerData>(`/user/partner/${userId}`);
      return response.data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes
  });
};

const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: number) => {
      await axiosInstance.delete(`/user/address/${addressId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
  });
};

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [originalValues, setOriginalValues] = useState({
    name: "",
    email: "",
    phoneNumber: ""
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const userId = localStorage.getItem("id");
  console.log("userId: ", userId);
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError
  } = useUserData(userId);

  const {
    data: partnerData,
    isLoading: isLoadingPartner,
    error: partnerError,
    refetch: refetchPartner
  } = usePartnerData(userId);

  const {
    data: locationsData,
    isLoading,
    error: locationsError,
    refetch,
  } = useUserAddresses(userId);
  const deleteAddress = useDeleteAddress();

  useEffect(() => {
    if (partnerData?.partner) {
      setName(partnerData.partner.name);
      setEmail(partnerData.partner.email);
      setPhoneNumber(partnerData.partner.phone || "");

      setOriginalValues({
        name: partnerData.partner.name,
        email: partnerData.partner.email,
        phoneNumber: partnerData.partner.phone || ""
      });
    } else if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setPhoneNumber(userData.phone || "");

      setOriginalValues({
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phone || ""
      });
    }
  }, [userData, partnerData]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post<AddressesResponse>("/user/addresses", {
        partner_id: Number(userId),
      });
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

  const handleDelete = async (id: number) => {
    try {
      await deleteAddress.mutateAsync(id);
      refetch();
    } catch (err) {
      console.error("Error deleting location:", err);
    }
  };

  const hasChanges = () => {
    return name !== originalValues.name ||
      email !== originalValues.email ||
      phoneNumber !== originalValues.phoneNumber;
  };

  const handleDiscard = () => {
    setName(originalValues.name);
    setEmail(originalValues.email);
    setPhoneNumber(originalValues.phoneNumber);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsUpdating(true);
      const userId = localStorage.getItem("id");

      // Create an object with only the changed fields
      const updatedFields: Record<string, string> = {};

      if (name !== originalValues.name) {
        updatedFields.name = name;
      }
      if (email !== originalValues.email) {
        updatedFields.email = email;
      }
      if (phoneNumber !== originalValues.phoneNumber) {
        updatedFields.phone = phoneNumber;
      }

      // Only proceed if there are changes
      if (Object.keys(updatedFields).length === 0) {
        toast({
          title: "تنبيه",
          description: "لم يتم إجراء أي تغييرات",
          variant: "default",
        });
        return;
      }

      const response = await axiosInstance.put(`/user/partner/${userId}`, updatedFields);

      if (response.data.success) {
        // Update localStorage only for changed values
        if (updatedFields.name) localStorage.setItem("name", name);
        if (updatedFields.email) localStorage.setItem("email", email);
        if (updatedFields.phone) localStorage.setItem("phone", phoneNumber);

        // Update original values with current values
        setOriginalValues({
          name,
          email,
          phoneNumber
        });

        // Refetch partner data to ensure we have the latest data
        await refetchPartner();

        toast({
          title: "تم التحديث",
          description: "تم تحديث الملف الشخصي بنجاح",
          variant: "success",
        });
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Error updating profile:", apiError);
      toast({
        title: "خطأ",
        description: apiError.response?.data?.message || apiError.message || "حدث خطأ أثناء تحديث الملف الشخصي",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h1 className="text-xl text-gray-500 font-tajawal-bold">الملف الشخصي</h1>
      {/* Profile Form */}
      <div className="bg-white p-6 rounded shadow">
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex-1 flex-col gap-y-2 flex border-b pb-4 items-center justify-center gap-x-2">
              <label htmlFor="image" className="relative cursor-pointer">
                <div className="overflow-hidden w-[120px] h-[120px] bg-gray-300 rounded-full shadow-sm">
                  <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1569173112611-52a7cd38bea9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-orange-500 rounded-full flex items-center justify-center">
                  <LucideCamera size={16} className="text-white" />
                </div>
              </label>
              <input type="file" id="image" className="hidden" />
              <p className="text-[14px] text-gray-500">اضغط لتغيير الصورة الشخصية</p>
            </div>
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
                // onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="flex-1 flex items-center gap-x-2">
              <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">
                رقم الهاتف
              </label>
              <input
                type="text"
                className="text-right mt-1 block w-full outline-none border border-gray-300 py-2 px-4 rounded-md"
                placeholder="أدخل رقم هاتفك"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                dir="ltr"
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
            <div className="flex gap-x-2">
              {hasChanges() && (
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="bg-orange-100 hover:bg-orange-200 text-black px-6 py-2 rounded-md shadow-md transition duration-300"
                >
                  الغاء
                </button>
              )}
              <button
                type="submit"
                disabled={isUpdating || !hasChanges()}
                className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300 ${(isUpdating || !hasChanges()) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUpdating ? "جاري التحديث..." : "تحديث الملف الشخصي"}
              </button>
            </div>

            <button
              type="button"
              className="flex items-center gap-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
            >
              <LucideKeyRound size={16} />
              تغيير كلمة المرور
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
            {locations.length > 0 ? locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location.street}
                phoneNumber={typeof location.phone === 'string' ? location.phone : ""}
                phoneNumber2={typeof location.street2 === 'string' ? location.street2 : ""}
                province={typeof location.state_id === 'object' ? location.state_id[1] : ""}
                city={location.city}
                country={typeof location.country_id === 'object' ? location.country_id[1] : ""}
                country_id={typeof location.country_id === 'object' ? location.country_id : undefined}
                state_id={typeof location.state_id === 'object' ? location.state_id : undefined}
                id={location.id}
                onUpdate={refetch}
                deletable
                handleDelete={() => handleDelete(location.id)}
              />
            )) : (
              <div className="text-center py-4 w-full">
                <p className="text-gray-500 font-tajawal-medium">لا توجد عناوين</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
