import { CircleDashed, Heart, ShoppingBasket, ShoppingCart, UserRound } from "lucide-react";
import logo from "../assets/images/Logo.png"
import CustomInput from "./CustomInput";

type Props = {
  hasAd?: boolean;
  adTitle?: string;
};

const links = [
  {
    id: 1,
    label: "الرئيسية",
    link: "#",
  },

  {
    id: 2,
    label: "المزاد",
    link: "#",
  },
  {
    id: 3,
    label: "التدوينات",
    link: "#",
  },
  {
    id: 4,
    label: "الماركات التجارية",
    link: "#",
  },
  {
    id: 5,
    label: "تسوق",
    link: "#",
  },
]

const Navbar = (props: Props) => {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      {props.hasAd && (
        <div className="ad bg-orange-500 text-white font-bold flex justify-center items-center py-1">
          <h1 className="font-tajawal-regular">{props.adTitle}</h1>
        </div>
      )}

      <div
        dir="rtl"
        className="navigation flex items-center p-4 justify-between"
      >
        <ul className="flex flex-wrap gap-x-4 list-none flex-1">
          {
            links.map((link) => (
              <li key={link.id} className="text-nowrap px-1 hover:bg-gray-500/50 font-tajawal-regular">
                {link.label}
              </li>
            ))
          }
        </ul>
        <div className="logo flex-1 flex justify-center items-center">
          <img src={logo} alt="e-store logo" />
        </div>
        <div dir="ltr" className="icons flex-1">
          <div className="flex items-center gap-x-4">
            <UserRound className="hover:text-blue-500 transition ease-in-out cursor-pointer" />
            <div className="text-white gap-x-2 flex items-center justify-center px-4 py-1
             bg-orange-500 hover:bg-orange-500/90 transition ease-in-out cursor-pointer rounded-full">
              <ShoppingCart className="" />
              <p>1</p>
            </div>
            <Heart className="hover:text-blue-500 transition ease-in-out cursor-pointer" />
            <CircleDashed className="hover:text-blue-500 transition ease-in-out cursor-pointer" />
            <CustomInput placeholder="ما الذي تبحث عنه" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
