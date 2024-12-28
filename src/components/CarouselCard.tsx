import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type Props = {
  label?: string;
  Icon?: IconType;
  link: string;
  hasBg?: boolean;
  img?: string;
};

const CarouselCard = ({ img, label, Icon, link, hasBg = true }: Props) => {
  return (
    <div className="">
      <div
        className={`w-[80px] md:w-[120px] flex justify-center items-center py-2 lg:py-4 px-1 rounded-xl overflow-hidden my-2 flex-col ${hasBg && "bg-white shadow-sm"
          }  border border-transparent hover:border-orange-100`}
      >
        {img && (
          <div className="icon w-[80px] h-[80px] py-2">
            <img src={img} alt="" className="h-full w-full object-contain" />
          </div>
        )}

        <div className="icon w-[40px] py-2">
          {Icon && <Icon className="w-full" />}
        </div>
        {label && (
          <div className="label font-tajawal-regular w-full truncate text-center">
            {label}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselCard;
