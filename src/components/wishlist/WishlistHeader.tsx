import { buttonVariants } from "@/components/ui/button";
import { Trash, X } from "lucide-react";

interface WishlistHeaderProps {
  wishlistCount: number;
  selectedCount: number;
  selectAll: () => void;
  clearSelection: () => void;
  deleteSelectedItems: () => void;
}

const WishlistHeader = ({
  wishlistCount,
  selectedCount,
  selectAll,
  clearSelection,
  deleteSelectedItems,
}: WishlistHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-12">
      <div className="flex items-center gap-4">
        <h1 className="font-tajawal-bold text-3xl text-gray-800">
          قائمة المفضلة
        </h1>
        <span className="font-tajawal-medium px-4 py-2 bg-orange-100 rounded-full">
          {wishlistCount} منتجات
        </span>
      </div>

      {wishlistCount > 0 && (
        <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
          {selectedCount > 0 ? (
            <>
              <span className="font-tajawal-medium text-sm text-gray-600">
                تم اختيار {selectedCount} منتج
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearSelection}
                  className={buttonVariants({ variant: "outline" })}
                >
                  <span>مسح التحديد</span>
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={deleteSelectedItems}
                  className={buttonVariants({ variant: "destructive" })}
                >
                  <span>حذف المنتجات</span>
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={selectAll}
              className={buttonVariants({ variant: "outline" })}
            >
              <span>تحديد الكل</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WishlistHeader;
