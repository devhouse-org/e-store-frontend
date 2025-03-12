import { useState, useEffect } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSavedComparisonsStore } from "@/store/useSavedComparisonsStore";
import { Product } from "@/types";
import { IconType } from "react-icons";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/ui/LoadingState";
import { CategorySelector } from "@/components/CategorySelector";
import { CategoryProducts } from "@/components/CategoryProducts";

// Update ProductDetails interface to match API response
interface ProductDetails {
  id: number;
  name: string;
  list_price: number;
  description?: string;
  description_sale?: boolean | string;
  image_1920: string;
  product_variant_ids?: number[];
  attribute_line_ids?: number[];
  [key: string]: any; // Add index signature for dynamic access
  attributes?: {
    id: number;
    name: string;
    display_type: string;
    values: {
      id: number;
      name: string;
      price_extra: number;
    }[];
  }[];
}

const EmptySlot = () => (
  <td className="border p-4 bg-gray-50 min-w-[200px]">
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <Link
        to="/products"
        className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full"
      >
        <Plus className="w-8 h-8 text-gray-400" />
      </Link>
      <p className="text-center text-gray-500 font-tajawal-regular">
        أضف منتج للمقارنة
      </p>
      <Link
        to="/products"
        className="text-sm text-orange-500 hover:text-orange-600 font-tajawal-regular"
      >
        تصفح المنتجات
      </Link>
    </div>
  </td>
);

// Update ProductColumn component to handle the new data structure
const ProductColumn = ({
  product,
  onRemove,
}: {
  product: ProductDetails | null;
  onRemove: () => void;
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (product: ProductDetails) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.list_price,
      image: product.image_1920,
      quantity: 1,
    });
  };

  if (!product) {
    return <EmptySlot />;
  }

  return (
    <td className="border p-4 bg-gray-50 min-w-[200px]">
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-full">
          <button
            onClick={onRemove}
            className="absolute p-1 transition-colors bg-red-100 rounded-full -top-2 -right-2 hover:bg-red-200"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
          <img
            src={product.image_1920}
            alt={product.name}
            className="object-cover w-24 h-24 mx-auto rounded-lg"
          />
        </div>
        <h3 className="text-sm font-semibold font-tajawal-regular">
          {product.name}
        </h3>
        <p className="text-orange-500 font-tajawal-regular">
          {typeof product.list_price === 'number' ? product.list_price.toLocaleString() : '0'} د.ع
        </p>
        <button
          onClick={() => handleAddToCart(product)}
          className="px-3 py-1 text-sm text-white transition-colors bg-orange-500 rounded-full hover:bg-orange-600 font-tajawal-regular"
        >
          إضافة إلى السلة
        </button>
      </div>
    </td>
  );
};

// Update DataRow component to include max width
const DataRow = ({
  label,
  getValue,
  slots,
  specKey = "",
}: {
  label: string;
  getValue: (product: ProductDetails | null) => string;
  slots: (ProductDetails | null)[];
  specKey?: string;
}) => (
  <tr>
    <td className="border p-4 bg-gray-50 font-tajawal-regular w-[200px]">
      {label}
    </td>
    {slots.map((product, index) => (
      <td key={index} className="border p-4 text-center w-[200px]">
        {specKey === "description" && product ? (
          <div
            dangerouslySetInnerHTML={{
              __html: product.description || "-",
            }}
            className="text-sm text-gray-600 max-h-[150px] overflow-y-auto"
          />
        ) : (
          getValue(product)
        )}
      </td>
    ))}
  </tr>
);

const Comparison = () => {
  const { comparisonItems, removeFromComparison, clearComparison } = useComparisonStore();
  const { toast } = useToast();
  const saveComparison = useSavedComparisonsStore(
    (state) => state.saveComparison
  );
  const [productDetails, setProductDetails] = useState<
    (ProductDetails | null)[]
  >([null, null, null, null]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Fetch product details for each product in comparison
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const details = await Promise.all(
          Array(4)
            .fill(null)
            .map(async (_, index) => {
              const product = comparisonItems[index];
              if (!product) return null;

              // Instead of fetching from API, use the stored comparison item directly
              return {
                id: parseInt(product.id),
                name: product.name,
                list_price: product.price,
                image_1920: product.image,
                description: product.description
              };
            })
        );

        setProductDetails(details);
      } catch (error) {
        console.error("Error processing product details:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تحميل تفاصيل المنتجات",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [comparisonItems]);

  // Update specifications array to match available fields
  const specifications = [
    {
      key: "name",
      label: "المنتج",
      getValue: (product: ProductDetails | null) => product?.name || "-"
    },
    {
      key: "list_price",
      label: "السعر",
      getValue: (product: ProductDetails | null) =>
        product?.list_price ? `${product.list_price.toLocaleString()} د.ع` : "-"
    },
    {
      key: "description",
      label: "الوصف",
      getValue: (product: ProductDetails | null) => product?.description || "-"
    }
  ];

  const handleSaveComparison = () => {
    if (comparisonItems.length === 0) {
      toast({
        title: "لا يمكن حفظ المقارنة",
        description: "الرجاء إضافة منتج واحد على الأقل للمقارنة",
        variant: "destructive",
      });
      return;
    }

    saveComparison(comparisonItems);
    toast({
      title: "تم حفظ المقارنة",
      description: "يمكنك العثور على المقارنة المحفوظة في لوحة التحكم",
      variant: "success",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-t-2 border-b-2 border-orange-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-tajawal-medium">
            <Loader />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-tajawal-regular">
          مقارنة المنتجات
        </h1>
        <div className="flex items-center gap-4">
          {comparisonItems.length > 0 && (
            <Button
              label="مسح المقارنة"
              onClick={clearComparison}
              className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            />
          )}
          {productDetails.some(item => item !== null) && (
            <Button
              label="حفظ المقارنة"
              Icon={Save as IconType}
              onClick={handleSaveComparison}
              className="flex items-center gap-2 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            />
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="max-w-full">
          <CategorySelector
            onCategorySelect={setSelectedCategoryId}
            disabled={comparisonItems.length > 0}
          />
        </div>
      </div>

      <div className="mb-8">
        <CategoryProducts categoryId={selectedCategoryId} />
      </div>

      {comparisonItems.length > 0 && (
        <div className="mt-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border p-4 bg-gray-50 w-[200px]"></td>
                  {productDetails.map((product, index) => (
                    <ProductColumn
                      key={index}
                      product={product}
                      onRemove={() =>
                        removeFromComparison(
                          comparisonItems[index]?.id.toString() || ""
                        )
                      }
                    />
                  ))}
                </tr>
                {specifications.map((spec) => (
                  <DataRow
                    key={spec.key}
                    label={spec.label}
                    specKey={spec.key}
                    getValue={(product) => spec.getValue(product)}
                    slots={productDetails}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comparison;
