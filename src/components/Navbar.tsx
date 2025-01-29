import { CircleDashed, Heart, Search, ShoppingCart, UserRound } from "lucide-react";
import logo from "../assets/images/Logo.png";
import CustomInput from "./CustomInput";
import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import { useComparisonStore } from "@/store/useComparisonStore";

type Props = {
  hasAd?: boolean;
  adTitle?: string;
};

const links = [
  {
    id: 1,
    label: "الرئيسية",
    link: "/",
  },

  {
    id: 2,
    label: "المزاد",
    link: "/auctions",
  },
  {
    id: 3,
    label: "التدوينات",
    link: "/blog",
  },
  {
    id: 4,
    label: "الماركات التجارية",
    link: "/brands",
  },
  {
    id: 5,
    label: "تسوق",
    link: "/products",
  },
];

const Navbar = (props: Props) => {
  const cartCount = useCartStore((state) => state.cartCount);
  const wishlistCount = useWishlistStore((state) => state.wishlistCount);
  const comparisonItems = useComparisonStore((state) => state.comparisonItems);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  // Watch for changes in cartCount and trigger animation
  useEffect(() => {
    if (cartCount > 0) {
      setIsCartAnimating(true);
      const timer = setTimeout(() => {
        setIsCartAnimating(false);
      }, 300); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <div className="bg-white shadow-sm overflow-hidden fixed top-0 left-0 right-0 z-40">
      {props.hasAd && (
        <div className="ad bg-orange-500 text-white font-bold flex justify-center items-center py-1">
          <h1 className="font-tajawal-regular">{props.adTitle}</h1>
        </div>
      )}

      <div
        dir="rtl"
        className="navigation flex items-center py-4 px-12 justify-between"
      >
        <ul className="flex-wrap hidden md:flex gap-x-4 list-none flex-1">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.link}
              className={({ isActive }) => `
                text-nowrap mt-1.5 cursor-pointer transition ease-in-out py-1 px-2 rounded-md font-tajawal-regular
                ${isActive ? 'bg-orange-100 text-orange-500' : 'hover:bg-orange-100/70'}
              `}
            >
              {link.label}
            </NavLink>
          ))}
        </ul>
        <div className="logo md:flex-1 flex justify-center items-center">
          <Link to="/">
            <img src={logo} alt="e-store logo" />
          </Link>
        </div>
        <div dir="ltr" className="icons flex-1">
          <div className="flex items-center gap-x-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `
                transition ease-in-out cursor-pointer
                ${isActive ? 'text-orange-500' : 'hover:text-orange-500'}
              `}
            >
              <UserRound />
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) => `
                text-white gap-x-2 flex items-center justify-center px-4 py-1
                transition-all duration-300 cursor-pointer rounded-full
                ${isCartAnimating ? 'scale-110 bg-green-500' : ''}
                ${isActive ? 'bg-orange-600' : 'bg-orange-500 hover:bg-orange-500/90'}
              `}
            >
              <ShoppingCart className={`transition-transform duration-300 ${isCartAnimating ? 'scale-110' : ''}`} />
              <p className={`hidden md:block transition-all duration-300 ${isCartAnimating ? 'scale-110' : ''}`}>
                {cartCount}
              </p>
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) => `
                relative transition ease-in-out cursor-pointer
                ${isActive ? 'text-orange-500' : 'hover:text-orange-500'}
              `}
            >
              <Heart />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/comparison"
              className={({ isActive }) => `
                relative transition ease-in-out cursor-pointer
                ${isActive ? 'text-orange-500' : 'hover:text-orange-500'}
              `}
            >
              <CircleDashed />
              {comparisonItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {comparisonItems.length}
                </span>
              )}
            </NavLink>

            <div className="hidden md:block">
              <div onClick={() => setIsSearchModalOpen(true)}>
                <CustomInput placeholder="ما الذي تبحث عنه" readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
};
export default Navbar;
