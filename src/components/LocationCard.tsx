import LocationDialog from "./LocationDialog";

type Props = {
  location?: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  city?: string;
  province?: string;
  country?: string;
};

const LocationCard = ({
  location,
  phoneNumber2,
  phoneNumber,
  city,
  province,
  country,
}: Props) => {
  return (
    <div className="bg-white border border-light-200 shadow-sm p-6 rounded-md">
      <div className="flex flex-col gap-y-2">
        <p className="flex justify-between gap-x-8 font-tajawal-regular">
          <strong>العنوان: </strong>
          {location}
        </p>
        <p className="flex justify-between gap-x-8 font-tajawal-regular">
          <strong>رقم الهاتف: </strong>
          {phoneNumber}
        </p>
        <p className="flex justify-between gap-x-8 font-tajawal-regular">
          <strong>رقم الهاتف الإضافي: </strong>
          {phoneNumber2}
        </p>
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

        <div className="mt-2">
          <LocationDialog
            location={location}
            phoneNumber={phoneNumber}
            phoneNumber2={phoneNumber2}
            province={province}
            city={city}
            country={country}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
