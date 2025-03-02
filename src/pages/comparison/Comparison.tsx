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
  <div className="flex flex-col items-center justify-center gap-4 py-8">
    <Link
      to="/products"
      className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center"
    >
      <Plus className="w-8 h-8 text-gray-400" />
    </Link>
    <p className="text-gray-500 text-center font-tajawal-regular">
      أضف جهازاً للمقارنة
    </p>
    <Link
      to="/products"
      className="text-orange-500 hover:text-orange-600 font-tajawal-regular text-sm"
    >
      تصفح المنتجات
    </Link>
  </div>
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

  return (
    <th className="border p-4 bg-gray-50 min-w-[200px]">
      <div className="flex flex-col items-center gap-2">
        {product ? (
          <>
            <div className="relative w-full">
              <button
                onClick={onRemove}
                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
              <img
                src={`data:image/png;base64,${product.image_1920}`}
                alt={product.name}
                className="w-24 h-24 object-cover mx-auto rounded-lg"
              />
            </div>
            <h3 className="font-semibold font-tajawal-regular text-sm">
              {product.name}
            </h3>
            <p className="text-orange-500 font-tajawal-regular">
              {product.list_price.toLocaleString()} د.ع
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600 transition-colors font-tajawal-regular text-sm"
            >
              إضافة إلى السلة
            </button>
          </>
        ) : (
          <EmptySlot />
        )}
      </div>
    </th>
  );
};

// Update DataRow component to include max width
const DataRow = ({
  label,
  getValue,
  slots,
  key,
}: {
  label: string;
  getValue: (product: ProductDetails | null) => string;
  slots: (ProductDetails | null)[];
  key: string;
}) => (
  <tr>
    <td className="border p-4 bg-gray-50 font-tajawal-regular w-[200px]">
      {label}
    </td>
    {slots.map((product, index) => (
      <td key={index} className="border p-4 text-center w-[200px]">
        {key === "description" ? (
          <div
            dangerouslySetInnerHTML={{
              __html: product?.description || "-",
            }}
            className="text-sm text-gray-600 max-h-[150px] overflow-y-auto"
          />
        ) : product ? (
          getValue(product)
        ) : (
          "-"
        )}
      </td>
    ))}
  </tr>
);

const Comparison = () => {
  const { comparisonItems, removeFromComparison } = useComparisonStore();
  const { toast } = useToast();
  const saveComparison = useSavedComparisonsStore(
    (state) => state.saveComparison
  );
  const [productDetails, setProductDetails] = useState<
    (ProductDetails | null)[]
  >([null, null, null, null]);
  const [loading, setLoading] = useState(true);

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

              const response = await axiosInstance.post(
                "/products/product-details",
                {
                  product_id: product.id,
                }
              );
              return response.data;
            })
        );

        setProductDetails(details);
      } catch (error) {
        console.error("Error fetching product details:", error);
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
    { key: "name", label: "المنتج" },
    { key: "list_price", label: "السعر" },
    { key: "description", label: "الوصف" },
    // Add any other specifications you want to display based on the API response
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <p className="text-gray-500 font-tajawal-medium">
            جاري تحميل المقارنة...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-tajawal-regular">
          مقارنة المنتجات
        </h1>
        {productDetails.some(item => item !== null) && (
          <Button
            label="حفظ المقارنة"
            Icon={Save as IconType}
            onClick={handleSaveComparison}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-4 bg-gray-50 font-tajawal-regular">
                المواصفات
              </th>
              {[0, 1, 2, 3].map((index) => (
                <ProductColumn
                  key={`slot-${index}`}
                  product={productDetails[index]}
                  onRemove={() => {
                    if (productDetails[index]) {
                      removeFromComparison(productDetails[index]!.id);
                    }
                  }}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {specifications.map((spec) => (
              <DataRow
                key={spec.key}
                label={spec.label}
                getValue={(product) => {
                  const value = product?.[spec.key];
                  if (typeof value === "boolean" && !value) {
                    return "-";
                  }
                  return value?.toString() || "-";
                }}
                slots={productDetails}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comparison;
