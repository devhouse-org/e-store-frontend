import {
  CircleDashed,
  Heart,
  Search,
  ShoppingCart,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import CustomInput from "./CustomInput";
import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";
import { useComparisonStore } from "@/store/useComparisonStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";
import HeartWishList from "./HeartWishlist";

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
  const cartCount = useCartStore((state) =>
    state.products.reduce((total, product) => total + product.quantity, 0)
  );
  const wishlistCount = useWishlistStore((state) => state.wishlistCount);
  const comparisonItems = useComparisonStore((state) => state.comparisonItems);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [comparisonItemsNo, setComparisonItemsNo] = useState(0);

  // Update comparison items count when items change
  useEffect(() => {
    const items = localStorage.getItem("comparisonItemIds");
    const comparisonList = items ? JSON.parse(items) : [];
    setComparisonItemsNo(comparisonList.length);
  }, [comparisonItems]);
  const [localWishlistCount, setLocalWishlistCount] = useState(0);

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

  // Fetch wishlist count from local storage
  useEffect(() => {
    const wishlists = JSON.parse(localStorage.getItem("wishlists") || "[]");
    setLocalWishlistCount(wishlists.length);
  }, [wishlistCount]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const MobileNav = () => (
    <>
      {/* Overlay with fade animation */}
      <div
        className={`fixed inset-0 bg-black/20 xl:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Sidebar with slide and fade animation */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-72 bg-white border-l shadow-lg 
          transition-all duration-300 ease-in-out transform
          ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } xl:hidden`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Link to="/" onClick={toggleMenu}>
              <img src="/Logo.png" alt="e-store logo" className="w-auto h-12" />
            </Link>
          </div>

          {/* Search Input */}
          <div className="px-2 mb-6">
            <div
              onClick={() => {
                setIsSearchModalOpen(true);
                toggleMenu();
              }}
            >
              <CustomInput
                placeholder="ما الذي تبحث عنه"
                readOnly
                className="w-full h-10 text-sm"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow">
            <nav className="space-y-1">
              {links.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.link}
                  onClick={toggleMenu}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 rounded-lg transition-colors text-lg font-tajawal-regular
                    ${
                      isActive
                        ? "bg-orange-100 text-orange-500"
                        : "text-gray-700 hover:bg-orange-50"
                    }
                  `}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-40 overflow-hidden bg-white shadow-sm">
      {props.hasAd && (
        <div className="relative flex items-center justify-center py-1 overflow-hidden font-bold text-white bg-orange-500 ad">
          <h1 className="font-tajawal-regular">{props.adTitle}</h1>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-light-effect"></div>
        </div>
      )}

      <div
        dir="rtl"
        className="flex items-center justify-between px-4 py-4 navigation lg:px-12"
      >
        {/* Left Section */}
        <div className="flex items-center flex-1 gap-x-4">
          {/* Mobile Menu Button */}
          <button
            className="p-2 text-gray-700 rounded-lg xl:hidden hover:bg-gray-100"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Desktop Navigation */}
          <ul className="flex-wrap flex-1 hidden list-none xl:flex gap-x-4">
            {links.map((link) => (
              <NavLink
                key={link.id}
                to={link.link}
                className={({ isActive }) => `
                  text-nowrap mt-1.5 cursor-pointer transition ease-in-out py-1 px-2 rounded-md font-tajawal-regular
                  ${
                    isActive
                      ? "bg-orange-100 text-orange-500"
                      : "hover:bg-orange-100/70"
                  }
                `}
              >
                {link.label}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Center Logo */}
        <div className="flex items-center justify-center logo lg:flex-1">
          <Link to="/">
            <img src="/Logo.png" alt="e-store logo" />
          </Link>
        </div>

        {/* Right Section - Icons */}
        <div dir="ltr" className="flex-1 icons">
          <div className="flex items-center gap-x-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `
                transition ease-in-out cursor-pointer
                ${isActive ? "text-orange-500" : "hover:text-orange-500"}
              `}
            >
              <UserRound />
            </NavLink>

            {/* Cart Button */}
            <NavLink
              to="/cart"
              className={({ isActive }) => `
                text-white gap-x-2 flex items-center justify-center px-4 py-1
                transition-all duration-300 cursor-pointer rounded-full
                ${isCartAnimating ? "scale-110 bg-green-500" : ""}
                ${
                  isActive
                    ? "bg-orange-600"
                    : "bg-orange-500 hover:bg-orange-500/90"
                }
              `}
            >
              <ShoppingCart
                className={`transition-transform duration-300 ${
                  isCartAnimating ? "scale-110" : ""
                }`}
              />
              <p
                className={`hidden md:block transition-all duration-300 ${
                  isCartAnimating ? "scale-110" : ""
                }`}
              >
                {cartCount}
              </p>
            </NavLink>

            <HeartWishList localWishlistCount={localWishlistCount} />

            <NavLink
              to="/comparison"
              className={({ isActive }) => `
                relative p-1.5 rounded-lg transition-all
                ${
                  isActive
                    ? "text-orange-500"
                    : "hover:text-orange-500 hover:bg-orange-50"
                }
              `}
            >
              <CircleDashed className="h-[18px] w-[18px]" />
              {comparisonItemsNo > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">
                  {comparisonItemsNo}
                </span>
              )}
            </NavLink>

            {/* Search Icon (mobile only) */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-orange-50"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Search Input (tablet and up) */}
            <div className="hidden md:block">
              <div
                onClick={() => setIsSearchModalOpen(true)}
                className="w-[40px] h-[40px] lg:w-[180px] xl:w-[220px]"
              >
                <CustomInput
                  placeholder="ما الذي تبحث عنه"
                  readOnly
                  className="h-8 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </div>
  );
};

export default Navbar;
