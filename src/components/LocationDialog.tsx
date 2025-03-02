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

type Props = {
  id: number;
  location?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
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
  onUpdate
}: Props) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    street: location || "",
    street2: phoneNumber2 || "",
    phone: phoneNumber || "",
    city: city || "",
    state_id: province || "",
    country_id: country || ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
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
              label="المحافظة"
              value={formData.state_id}
              onChange={(e) => handleInputChange('state_id', e.target.value)}
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
            <CustomInput
              label="الدولة"
              value={formData.country_id}
              onChange={(e) => handleInputChange('country_id', e.target.value)}
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
