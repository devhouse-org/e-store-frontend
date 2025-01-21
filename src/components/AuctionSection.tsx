import { products } from "@/utils/data/products";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const AuctionSection = () => {
  // Get first 4 products for auctions section
  const auctionProducts = products.slice(0, 4);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <h2 className="font-tajawal-medium text-lg border-b-2 border-orange-400 w-fit">
            المزادات النشطة
          </h2>
          <span className="absolute -bottom-1 right-0 w-1/3 h-[2px] bg-gray-100" />
        </div>
        <Button label="عرض جميع المزادات" />
      </div>

      {/* Auction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {auctionProducts.map((product) => (
          <ProductCard key={product.id} product={product} size="lg" />
        ))}
      </div>
    </div>
  );
};

export default AuctionSection;
