import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type Props = {
  label?: string;
  Icon?: IconType;
  link: string;
};

const CarouselCard = ({ label, Icon, link }: Props) => {
  return (
    <Link to={link} className="">
      <div className="w-[120px] flex justify-center items-center py-4 rounded-xl overflow-hidden my-2 flex-col bg-white shadow-sm border border-transparent hover:border-orange-100">
        <div className="icon w-[40px] py-2">
          {Icon && <Icon className="w-full" />}
        </div>
        <div className="label font-tajawal-regular w-full truncate text-center">
          {label}
        </div>
      </div>
    </Link>
  );
};

export default CarouselCard;
