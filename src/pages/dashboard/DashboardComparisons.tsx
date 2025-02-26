import { Button } from "@/components/ui/button";
import ComparisonCard from "@/components/ComparisonCard";
import { LucideCircleDashed, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSavedComparisonsStore } from "@/store/useSavedComparisonsStore";
import { useToast } from "@/components/ui/toast";
import { IconType } from "react-icons";

const DashboardComparisons = () => {
  const { savedComparisons, deleteComparison, clearAllComparisons } =
    useSavedComparisonsStore();
  const { toast } = useToast();

  const handleDeleteComparison = (id: string) => {
    deleteComparison(id);
    toast({
      title: "تم حذف المقارنة",
      description: "تم حذف المقارنة بنجاح",
    });
  };

  const handleClearAll = () => {
    clearAllComparisons();
    toast({
      title: "تم حذف جميع المقارنات",
      description: "تم حذف جميع المقارنات المحفوظة بنجاح",
    });
  };

  if (savedComparisons.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto animate-pulse">
            <LucideCircleDashed className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-3xl font-tajawal-bold text-gray-800">
            لا توجد مقارنات
          </h2>
          <p className="text-gray-600 font-tajawal-regular text-lg">
            لم تقم بحفظ اي مقارنات
          </p>
        </div>

        <Link to="/products">
          <Button
            label="إبدأ المقارنة"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-200"
          ></Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-gray-500 font-tajawal-bold ">المقارنات</h1>
        <div className="flex justify-between items-center">
          <Button
            variant="destructive"
            onClick={handleClearAll}
            className="flex items-center gap-2"
            label="حذف الكل"
            Icon={Trash2 as IconType}
          >
            <span>حذف الكل</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedComparisons.map((comparison) => (
          <ComparisonCard
            key={comparison.id}
            {...comparison}
            onDelete={() => handleDeleteComparison(comparison.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardComparisons;
