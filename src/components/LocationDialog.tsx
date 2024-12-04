import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomInput from "./CustomInput";

type Props = {
  location?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  city?: string;
  province?: string;
  country?: string;
};

const LocationDialog = ({
  location,
  phoneNumber2,
  phoneNumber,
  city,
  province,
  country,
}: Props) => {
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
            <CustomInput label="العنوان" placeholder={location} />
          </div>
          <div className="mt-4">
            <CustomInput label="رقم الهاتف" placeholder={phoneNumber} />
          </div>
          <div className="mt-4">
            <CustomInput
              label="رقم الهاتف الاحتياطي"
              placeholder={phoneNumber2}
            />
          </div>
          <div className="mt-4">
            <CustomInput label="المحافظة" placeholder={province} />
          </div>
          <div className="mt-4">
            <CustomInput label="المدينة" placeholder={city} />
          </div>
          <div className="mt-4">
            <CustomInput label="الدولة" placeholder={country} />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button label="إلغاء" variant={"outline"} />
          </DialogClose>
          <Button label="حفظ" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
