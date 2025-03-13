import { Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

interface HeartWishListProps {
  localWishlistCount: number;
}

export default function HeartWishList ({ localWishlistCount }: HeartWishListProps) {
  return (
    <NavLink
      to="/wishlist"
      className={({ isActive }) => `
  relative p-1.5 rounded-lg transition-all
  ${isActive
    ? "text-orange-500"
    : "hover:text-orange-500 hover:bg-orange-50"
  }
`}
>
<Heart className="h-[18px] w-[18px]" />
{localWishlistCount > 0 && (
  <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">
    {localWishlistCount}
  </span>
)}
</NavLink>
  );
}
