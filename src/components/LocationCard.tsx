import LocationDialog from "./LocationDialog";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type Props = {
  id?: number;
  location?: string;
  // phoneNumber?: string;
  // phoneNumber2?: string;
  city?: string;
  province?: string;
  country?: string;
  country_id?: [number, string];
  state_id?: [number, string];
  selectable?: boolean;
  deletable?: boolean;
  isSelected?: boolean;
  onUpdate?: () => void;
  handleSelect?: () => void;
  handleDelete?: () => Promise<void>;
  editable?: boolean;
};

const LocationCard = ({
  id,
  location,
  // phoneNumber2,
  // phoneNumber,
  city,
  province,
  country,
  country_id,
  state_id,
  selectable = false,
  isSelected = false,
  deletable = false,
  editable = true,
  onUpdate,
  handleSelect,
  handleDelete,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = async () => {
    if (handleDelete) {
      setIsDeleting(true);
      try {
        await handleDelete();
        // Refresh the page after successful deletion
        window.location.reload();
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <div onClick={handleSelect} className={`bg-white border cursor-pointer ${isSelected ? 'border-orange-500' : 'border-light-200'} shadow-sm p-6 rounded-md`}>
        <div className="flex flex-col gap-y-2">
          <p className="flex justify-between gap-x-8 font-tajawal-regular">
            <strong>العنوان: </strong>
            {location}
          </p>
          {/* {phoneNumber && (
            <p className="flex justify-between gap-x-8 font-tajawal-regular">
              <strong>رقم الهاتف: </strong>
              {phoneNumber}
            </p>
          )}
          {phoneNumber2 && (
            <p className="flex justify-between gap-x-8 font-tajawal-regular">
              <strong>رقم الهاتف الإضافي: </strong>
              {phoneNumber2}
            </p>
          )} */}
          <p className="flex justify-between gap-x-8 font-tajawal-regular">
            <strong>المحافظة: </strong>
            {province}
          </p>
          <p className="flex justify-between gap-x-8 font-tajawal-regular">
            <strong>المدينة: </strong>
            {city}
          </p>
          <p className="flex justify-between gap-x-8 font-tajawal-regular">
            <strong>الدولة: </strong>
            {country}
          </p>

          <div className="flex gap-x-2 mt-4">
            {id && editable && (
              <LocationDialog
                id={id}
                location={location}
                // phoneNumber={phoneNumber}
                // phoneNumber2={phoneNumber2}
                province={province}
                city={city}
                country={country}
                country_id={country_id}
                state_id={state_id}
                onUpdate={onUpdate}
              />
            )}
            {selectable && (
              <Button label="اختيار" onClick={handleSelect} variant="secondary" />
            )}
            {deletable && (
              <Button
                label={isDeleting ? "جاري الحذف..." : "حذف"}
                onClick={() => setShowDeleteDialog(true)}
                variant="destructive"
                disabled={isDeleting}
              />
            )}
          </div>
        </div>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-tajawal-bold text-right">تأكيد الحذف</DialogTitle>
            <DialogDescription className="text-right">
              هل أنت متأكد من حذف هذا العنوان؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              label="إلغاء"
            />
            <Button
              variant="destructive"
              onClick={handleDeleteClick}
              disabled={isDeleting}
              label={isDeleting ? "جاري الحذف..." : "حذف"}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationCard;
