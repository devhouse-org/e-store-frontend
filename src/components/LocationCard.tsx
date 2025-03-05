import LocationDialog from "./LocationDialog";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {
  id?: number;
  location?: string;
  // phoneNumber?: string;
  // phoneNumber2?: string;
  city?: string;
  province?: string;
  country?: string;
  selectable?: boolean;
  deletable?: boolean;
  isSelected?: boolean;
  onUpdate?: () => void;
  handleSelect?: () => void;
  handleDelete?: () => Promise<void>;
};

const LocationCard = ({
  id,
  location,
  // phoneNumber2,
  // phoneNumber,
  city,
  province,
  country,
  selectable = false,
  isSelected = false,
  deletable = false,
  onUpdate,
  handleSelect,
  handleDelete,
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

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
    <div onClick={handleSelect} className={`bg-white border cursor-pointer ${isSelected ? 'border-orange-500' : 'border-light-200'} shadow-sm p-6 rounded-md`}>
      <div className="flex flex-col gap-y-2">
        <p className="flex justify-between gap-x-8 font-tajawal-regular">
          <strong>العنوان: </strong>
          {location}
        </p>
        {/* <p className="flex justify-between gap-x-8 font-tajawal-regular">
          <strong>رقم الهاتف: </strong>
          {phoneNumber}
        </p> */}
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

        <div className="flex items-center gap-x-2 mt-2">
          {id && (
            <LocationDialog
              id={id}
              location={location}
              // phoneNumber={phoneNumber}
              // phoneNumber2={phoneNumber2}
              province={province}
              city={city}
              country={country}
              onUpdate={onUpdate}
            />
          )}
          {selectable && (
            <Button label="اختيار" onClick={handleSelect} variant="secondary" />
          )}
          {deletable && (
            <Button
              label={isDeleting ? "جاري الحذف..." : "حذف"}
              onClick={handleDeleteClick}
              variant="destructive"
              disabled={isDeleting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
