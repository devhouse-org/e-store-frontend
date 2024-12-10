import { CircleDashed, Heart, ShoppingCart, UserRound } from "lucide-react";
import logo from "../assets/images/Logo.png";
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
];

const Navbar = (props: Props) => {
  return (
    <div className="bg-white shadow-sm overflow-hidden">
      {props.hasAd && (
        <div className="ad bg-orange-500 text-white font-bold flex justify-center items-center py-1">
          <h1 className="font-tajawal-regular">{props.adTitle}</h1>
        </div>
      )}

      <div
        dir="rtl"
        className="navigation flex items-center p-4 justify-between"
      >
        <ul className="flex-wrap hidden md:flex gap-x-4 list-none flex-1">
          {links.map((link) => (
            <li
              key={link.id}
              className="text-nowrap hover:bg-orange-100/70 cursor-pointer transition ease-in-out py-1 px-2 rounded-md font-tajawal-regular"
            >
              {link.label}
            </li>
          ))}
        </ul>
        <div className="logo md:flex-1 flex justify-center items-center">
          <img src={logo} alt="e-store logo" />
        </div>
        <div dir="ltr" className="icons flex-1">
          <div className="flex items-center gap-x-4">
            <UserRound className="hover:text-blue-500 transition ease-in-out cursor-pointer" />
            <div
              className="text-white gap-x-2 flex items-center justify-center px-4 py-1
             bg-orange-500 hover:bg-orange-500/90 transition ease-in-out cursor-pointer rounded-full"
            >
              <ShoppingCart className="" />
              <p className="hidden md:block">1</p>
            </div>
            <Heart className="hover:text-blue-500 transition ease-in-out cursor-pointer" />
            <CircleDashed className="hover:text-blue-500 transition ease-in-out cursor-pointer" />
            <div className="hidden md:block">
              <CustomInput placeholder="ما الذي تبحث عنه" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
