import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomInput from "./CustomInput";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import LocationDropdowns from "./LocationDropdowns";
// {
//   "success": true,
//   "addresses": [
//       {
//           "id": 79,
//           "name": "sgsrgr",
//           "street": "gherhgreh",
//           "street2": "gerherhg",
//           "city": "rtjtrj",
//           "state_id": false,
//           "zip": false,
//           "country_id": false,
//           "phone": false,
//           "type": "delivery"
//       },
//       {
//           "id": 77,
//           "name": "test",
//           "street": "bmw",
//           "street2": "test",
//           "city": "basra",
//           "state_id": false,
//           "zip": false,
//           "country_id": false,
//           "phone": "",
//           "type": "delivery"
//       },
//       {
//           "id": 80,
//           "name": "wash",
//           "street": "awash",
//           "street2": "sahswh",
//           "city": "shqhhw",
//           "state_id": [
//               56,
//               "Washington (US)"
//           ],
//           "zip": false,
//           "country_id": [
//               233,
//               "United States"
//           ],
//           "phone": false,
//           "type": "delivery"
//       }
//   ]
// }
type Props = {
  id: number;
  location?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  country_id?: [number, string];
  state_id?: [number, string];
  city?: string;
  province?: string;
  country?: string;
  onUpdate?: () => void;
};

const LocationDialog = ({
  id,
  location,
  phoneNumber2,
  phoneNumber,
  city,
  province,
  country,
  country_id,
  state_id,
  onUpdate
}: Props) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    street: location || "",
    street2: phoneNumber2 || "",
    phone: phoneNumber || "",
    city: city || "",
    state_id: Array.isArray(state_id) ? state_id[0].toString() : "",
    country_id: Array.isArray(country_id) ? country_id[0].toString() : ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string | [number, string]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axiosInstance.put(`/user/address/${id}`, {
        id,
        ...formData
      });

      toast({
        title: "تم التحديث",
        description: "تم تحديث العنوان بنجاح",
        variant: "success",
      });

      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث العنوان",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button label="تعديل" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="py-8" dir="rtl">
          <div className="flex gap-x-4 border-b">
            <p className="font-tajawal-bold text-xl mt-4 max-w-[250px] truncate">
              عنوان الشحن
            </p>
          </div>

          <div className="mt-4">
            <CustomInput
              label="العنوان"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
            />
          </div>
          <div className="mt-4">
            <CustomInput
              label="العنوان الإضافي"
              value={formData.street2}
              onChange={(e) => handleInputChange('street2', e.target.value)}
            />
          </div>
          <div className="mt-4">
            <CustomInput
              label="رقم الهاتف"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
          <div className="mt-4">
            <CustomInput
              label="المدينة"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>
          <div className="mt-4">
            <LocationDropdowns
              selectedCountryId={formData.country_id}
              selectedStateId={formData.state_id}
              onCountryChange={(value) => handleInputChange('country_id', value)}
              onStateChange={(value) => handleInputChange('state_id', value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button label="إلغاء" variant={"outline"} />
          </DialogClose>
          <Button
            label={loading ? "جاري الحفظ..." : "حفظ"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
