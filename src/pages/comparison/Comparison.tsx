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
import { Skeleton } from "@/components/ui/skeleton";

// Update ProductDetails interface to match API response
interface ProductDetails {
  id: number;
  name: string;
  list_price: number;
  description?: string | false;
  description_sale?: boolean | string;
  image_1920: string;
  public_categ_ids?: number[];
  product_variant_ids?: number[];
  attribute_line_ids?: number[];
}

interface ProductsResponse {
  success: boolean;
  products: ProductDetails[];
  total: number;
}

const EmptySlot = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-8">
    <Link
      to="/products"
      className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full"
    >
      <Plus className="w-8 h-8 text-gray-400" />
    </Link>
    <p className="text-center text-gray-500 font-tajawal-regular">
      أضف جهازاً للمقارنة
    </p>
    <Link
      to="/products"
      className="text-sm text-orange-500 hover:text-orange-600 font-tajawal-regular"
    >
      تصفح المنتجات
    </Link>
  </div>
);

// Update ProductColumn component to handle null values safely
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
    return (
      <th className="border p-4 bg-gray-50 min-w-[200px]">
        <EmptySlot />
      </th>
    );
  }

  // Ensure list_price exists and is a number
  const formattedPrice =
    typeof product.list_price === "number"
      ? product.list_price.toLocaleString()
      : "0";

  return (
    <th className="border p-4 bg-gray-50 min-w-[200px]">
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-full">
          <button
            onClick={onRemove}
            className="absolute p-1 transition-colors bg-red-100 rounded-full -top-2 -right-2 hover:bg-red-200"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
          <img
            src={`data:image/png;base64,${product.image_1920}`}
            alt={product.name}
            className="object-cover w-24 h-24 mx-auto rounded-lg"
          />
        </div>
        <h3 className="text-sm font-semibold font-tajawal-regular">
          {product.name}
        </h3>
        <p className="text-orange-500 font-tajawal-regular">
          {formattedPrice} د.ع
        </p>
        <button
          onClick={() => handleAddToCart(product)}
          className="px-3 py-1 text-sm text-white transition-colors bg-orange-500 rounded-full hover:bg-orange-600 font-tajawal-regular"
        >
          إضافة إلى السلة
        </button>
      </div>
    </th>
  );
};

// Update DataRow component to fix the key prop issue and type safety
const DataRow = ({
  label,
  getValue,
  slots,
  rowKey,
}: {
  label: string;
  getValue: (product: ProductDetails | null) => string;
  slots: (ProductDetails | null)[];
  rowKey: string;
}) => (
  <tr>
    <td className="border p-4 bg-gray-50 font-tajawal-regular w-[200px]">
      {label}
    </td>
    {slots.map((product, index) => (
      <td key={index} className="border p-4 text-center w-[200px]">
        {rowKey === "description" && product?.description ? (
          <div
            dangerouslySetInnerHTML={{
              __html: product.description.toString(),
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

const ComparisonSkeleton = () => {
  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {/* Specifications Header */}
              <th className="p-4 border bg-gray-50 w-[200px]">
                <Skeleton className="h-6 w-24" />
              </th>

              {/* Product Column Headers */}
              {[...Array(4)].map((_, index) => (
                <th key={index} className="border p-4 bg-gray-50 min-w-[200px]">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-full">
                      {/* Product Image Skeleton */}
                      <Skeleton className="w-24 h-24 mx-auto rounded-lg" />
                    </div>
                    {/* Product Name Skeleton */}
                    <Skeleton className="h-4 w-3/4" />
                    {/* Price Skeleton */}
                    <Skeleton className="h-4 w-1/2" />
                    {/* Add to Cart Button Skeleton */}
                    <Skeleton className="h-8 w-32 rounded-full" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Specification Rows */}
            {[...Array(3)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {/* Specification Label */}
                <td className="border p-4 bg-gray-50 w-[200px]">
                  <Skeleton className="h-4 w-24" />
                </td>
                {/* Specification Values */}
                {[...Array(4)].map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="border p-4 text-center w-[200px]"
                  >
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                    {rowIndex === 2 && (
                      <>
                        <Skeleton className="h-4 w-2/3 mx-auto mt-2" />
                        <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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
        // Get IDs from localStorage
        const itemIds = localStorage.getItem("comparisonItemIds");
        const ids = itemIds ? JSON.parse(itemIds) : [];

        if (ids.length === 0) {
          setProductDetails([null, null, null, null]);
          setLoading(false);
          return;
        }

        // Convert string IDs to numbers
        const numericIds = ids.map((id: string) => parseInt(id));

        // Make API call with the IDs
        const response = await axiosInstance.post<ProductsResponse>(
          "/products/by-ids",
          {
            product_ids: numericIds,
          }
        );

        // Create an array of 4 slots, filling with products where available
        const filledProducts = Array(4)
          .fill(null)
          .map((_, index) => {
            return response.data.products[index] || null;
          });

        setProductDetails(filledProducts);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تحميل تفاصيل المنتجات",
          variant: "destructive",
        });
        setProductDetails([null, null, null, null]);
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
  ];

  const handleSaveComparison = () => {
    const nonNullProducts = productDetails.filter(
      (product): product is ProductDetails => product !== null
    );

    if (nonNullProducts.length === 0) {
      toast({
        title: "لا يمكن حفظ المقارنة",
        description: "الرجاء إضافة منتج واحد على الأقل للمقارنة",
        variant: "destructive",
      });
      return;
    }

    saveComparison(
      nonNullProducts.map((product) => ({
        id: product.id.toString(),
        name: product.name,
        price: product.list_price,
        image: product.image_1920,
        description: product.description?.toString() || "",
      }))
    );

    toast({
      title: "تم حفظ المقارنة",
      description: "يمكنك العثور على المقارنة المحفوظة في لوحة التحكم",
      variant: "success",
    });
  };

  if (loading) {
    return <ComparisonSkeleton />;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-tajawal-regular">
          مقارنة المنتجات
        </h1>
        {/* {productDetails.some((item) => item !== null) && (
          <Button
            label="حفظ المقارنة"
            Icon={Save as IconType}
            onClick={handleSaveComparison}
            className="flex items-center gap-2 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600"
          />
        )} */}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 border bg-gray-50 font-tajawal-regular">
                المواصفات
              </th>
              {[0, 1, 2, 3].map((index) => (
                <ProductColumn
                  key={`slot-${index}`}
                  product={productDetails[index]}
                  onRemove={() => {
                    if (productDetails[index]) {
                      removeFromComparison(
                        productDetails[index]!.id.toString()
                      );
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
                rowKey={spec.key}
                getValue={(product) => {
                  if (!product) return "-";
                  switch (spec.key) {
                    case "name":
                      return product.name || "-";
                    case "list_price":
                      return typeof product.list_price === "number"
                        ? `${product.list_price.toLocaleString()} د.ع`
                        : "-";
                    case "description":
                      return product.description?.toString() || "-";
                    default:
                      return "-";
                  }
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
