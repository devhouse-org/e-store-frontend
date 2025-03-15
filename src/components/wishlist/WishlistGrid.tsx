import { Product } from "@/types/product";
import WishlistItem from "./WishlistItem";

interface WishlistGridProps {
  products: Product[];
  removeFromWishlist: (productId: string) => void;
  isSelected: (productId: string) => boolean;
  onToggleSelect: (productId: string) => void;
}

const WishlistGrid = ({
  products,
  removeFromWishlist,
  isSelected,
  onToggleSelect,
}: WishlistGridProps) => {
  if (products.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">لا توجد منتجات متطابقة في المفضلة.</p>
      </div>
    );
  }

  return (
    <div className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-10 grid grid-cols-1 gap-8">
      {products.map((product) => (
        <WishlistItem
          key={product.id}
          product={product}
          removeFromWishlist={removeFromWishlist}
          isSelected={isSelected(product.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;
