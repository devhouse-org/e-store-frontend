import LoadingComponent from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/useCartStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { useSavedComparisonsStore } from "@/store/useSavedComparisonsStore";
import axiosInstance from "@/utils/axiosInstance";
import { Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

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
      className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full"
    >
      <Plus className="w-8 h-8 text-gray-400" />
    </Link>
    <p className="font-tajawal-regular text-center text-gray-500">
      أضف جهازاً للمقارنة
    </p>
    <Link
      to="/products"
      className="hover:text-orange-600 font-tajawal-regular text-sm text-orange-500"
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
                className="-top-2 -right-2 hover:bg-red-200 absolute p-1 transition-colors bg-red-100 rounded-full"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
              <img
                src={`data:image/png;base64,${product.image_1920}`}
                alt={product.name}
                className="object-cover w-24 h-24 mx-auto rounded-lg"
              />
            </div>
            <h3 className="font-tajawal-regular text-sm font-semibold">
              {product.name}
            </h3>
            <p className="font-tajawal-regular text-orange-500">
              {product.list_price.toLocaleString()} د.ع
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              className="hover:bg-orange-600 font-tajawal-regular px-3 py-1 text-sm text-white transition-colors bg-orange-500 rounded-full"
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
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-tajawal-regular text-2xl font-bold">
          مقارنة المنتجات
        </h1>
        {productDetails.some((item) => item !== null) && (
          <Button
            label="حفظ المقارنة"
            Icon={Save as IconType}
            onClick={handleSaveComparison}
            className="hover:bg-orange-600 flex items-center gap-2 px-4 py-2 text-white bg-orange-500 rounded-lg"
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-50 font-tajawal-regular p-4 border">
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
