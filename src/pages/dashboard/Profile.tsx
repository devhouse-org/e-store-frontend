import AddLocationDialog from "@/components/AddLocationDialog";
import ChangePasswordDialog from "@/components/ChangePasswordDialog";
import LocationCard from "@/components/LocationCard";
import Loader from "@/components/ui/LoadingState";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LucideCamera } from "lucide-react";
import React, { useEffect, useState } from "react";

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
  image_medium: string;
}

interface PartnerData {
  success: boolean;
  partner: {
    id: number;
    name: string;
    email: string;
    phone: string | false;
    image_medium: string;
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
      const response = await axiosInstance.post<AddressesResponse>(
        "/user/addresses",
        {
          partner_id: Number(userId),
        }
      );
      return response.data.addresses;
    },
    enabled: !!userId,
  });
};

const useUserData = (userId: string | null) => {
  return useQuery({
    queryKey: ["user-data", userId],
    queryFn: async () => {
      const response = await axiosInstance.get<UserData>(
        `/user/partner/${userId}`
      );
      return response.data;
    },
    enabled: !!userId,
  });
};

const usePartnerData = (userId: string | null) => {
  return useQuery({
    queryKey: ["partner-data", userId],
    queryFn: async () => {
      const response = await axiosInstance.get<PartnerData>(
        `/user/partner/${userId}`
      );
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
    phoneNumber: "",
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const userId = localStorage.getItem("id");
  const localEmail = localStorage.getItem("email");
  console.log("userId: ", userId);
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useUserData(userId);

  const {
    data: partnerData,
    isLoading: isLoadingPartner,
    error: partnerError,
    refetch: refetchPartner,
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
        phoneNumber: partnerData.partner.phone || "",
      });
    } else if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setPhoneNumber(userData.phone || "");

      setOriginalValues({
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phone || "",
      });
    }
  }, [userData, partnerData]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      setError(null);
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

  const handleDelete = async (id: number) => {
    try {
      await deleteAddress.mutateAsync(id);
      refetch();
    } catch (err) {
      console.error("Error deleting location:", err);
    }
  };

  const hasChanges = () => {
    return (
      name !== originalValues.name ||
      email !== originalValues.email ||
      phoneNumber !== originalValues.phoneNumber
    );
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

      const response = await axiosInstance.put(
        `/user/partner/${userId}`,
        updatedFields
      );

      if (response.data.success) {
        // Update localStorage only for changed values
        if (updatedFields.name) localStorage.setItem("name", name);
        if (updatedFields.email) localStorage.setItem("email", email);
        if (updatedFields.phone) localStorage.setItem("phone", phoneNumber);

        // Update original values with current values
        setOriginalValues({
          name,
          email,
          phoneNumber,
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
        description:
          apiError.response?.data?.message ||
          apiError.message ||
          "حدث خطأ أثناء تحديث الملف الشخصي",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h1 className="font-tajawal-bold text-xl text-gray-500">الملف الشخصي</h1>
      {/* Profile Form */}
      <div className="p-6 bg-white rounded shadow">
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="gap-y-2 gap-x-2 flex flex-col items-center justify-center flex-1 pb-4 border-b">
              <label htmlFor="image" className="relative cursor-pointer">
                <div className="overflow-hidden w-[120px] h-[120px] bg-gray-300 rounded-full shadow-sm">
                  <img
                    className="object-contain w-full h-full"
                    src={`data:image/png;base64,${userData?.partner?.image_medium}`}
                    alt=""
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-orange-500 rounded-full flex items-center justify-center">
                  <LucideCamera size={16} className="text-white" />
                </div>
              </label>
              <input type="file" id="image" className="hidden" />
              <p className="text-[14px] text-gray-500">
                اضغط لتغيير الصورة الشخصية
              </p>
            </div>
            <div className="gap-x-2 flex items-center flex-1">
              <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">
                الاسم الكامل
              </label>
              <input
                type="text"
                className=" block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md outline-none"
                placeholder="أدخل اسمك الكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="gap-x-2 flex items-center flex-1">
              <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                className=" block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md outline-none cursor-not-allowed"
                placeholder="أدخل بريدك الإلكتروني"
                value={localEmail || email}
                // onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="gap-x-2 flex items-center flex-1">
              <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">
                رقم الهاتف
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-1 text-right border border-gray-300 rounded-md outline-none"
                placeholder="أدخل رقم هاتفك"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                dir="ltr"
              />
            </div>
            {/* <div className="gap-x-2 flex items-center flex-1">
              <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">الصورة شخصية</label>
              <input
                type="text"
                className=" block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md outline-none"
                placeholder="الصورة شخصية"
              />
            </div> */}
          </div>

          <div className="flex justify-between pt-8">
            <div className="gap-x-2 flex">
              {hasChanges() && (
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="hover:bg-orange-200 px-6 py-2 text-black transition duration-300 bg-orange-100 rounded-md shadow-md"
                >
                  الغاء
                </button>
              )}
              <button
                type="submit"
                disabled={isUpdating || !hasChanges()}
                className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300 ${
                  isUpdating || !hasChanges()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isUpdating ? "جاري التحديث..." : "تحديث الملف الشخصي"}
              </button>
            </div>
            <ChangePasswordDialog />
          </div>
        </form>
      </div>

      {/* Locations */}
      <div className="p-6 bg-white rounded shadow">
        <div className="border-light-200 flex items-center justify-between pb-1 mb-4 border-b">
          <h2 className="font-tajawal-medium text-lg">عناوين التوصيل</h2>
          <AddLocationDialog onSuccess={refetch} />
        </div>
        {loading ? (
          <div className="py-4 text-center">
            <Loader />
          </div>
        ) : locationsError ? (
          <div className="py-4 text-center text-red-500">
            {locationsError.message}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {locations.length > 0 ? (
              locations.map((location) => (
                <LocationCard
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
                  onUpdate={refetch}
                  deletable
                  handleDelete={() => handleDelete(location.id)}
                />
              ))
            ) : (
              <div className="w-full py-4 text-center">
                <p className="font-tajawal-medium text-gray-500">
                  لا توجد عناوين
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
