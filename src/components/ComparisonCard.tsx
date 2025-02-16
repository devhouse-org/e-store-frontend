import { Product } from "src/types/index.ts";
import { formatDate } from "@/lib/utils";
import { ArrowRight, LucideArrowRight, Smartphone, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { IconType } from "react-icons";

interface ComparisonCardProps {
  id: string;
  products: Product[];
  date: string;
  onDelete: () => void;
}

const ComparisonCard = ({
  id,
  products,
  date,
  onDelete,
}: ComparisonCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <Link to={`/comparison/${id}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h3 className="font-tajawal-bold text-lg text-gray-800">
              مقارنة {products.length} منتجات
            </h3>
            <p className="text-gray-500 text-sm font-tajawal-regular">
              {formatDate(date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="icon"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                e.stopPropagation(); // Stop the event from bubbling up
                onDelete();
              }}
              className="h-8 w-8"
              Icon={Trash2 as IconType}
            >
              {/* <Trash2 className="w-4 h-4" /> */}
            </Button>
            {/* <Link
              to={`/comparison/${id}`}
              className="text-orange-500 hover:text-orange-600 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </Link> */}
          </div>
        </div>

        <div className="flex gap-4 mb-4 overflow-x-auto pb-2">
          {products.map((product, i) => (
            <div key={product.id} className="flex items-center flex-shrink-0">
              {product.image_1920 ? (
                <img
                  src={`data:image/png;base64,${product.image_1920}`}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {products.map((product) => (
            <span
              key={product.id}
              className="bg-gray-100 px-2 py-1 rounded-full text-sm font-tajawal-regular text-gray-600"
            >
              {product.name}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ComparisonCard;
