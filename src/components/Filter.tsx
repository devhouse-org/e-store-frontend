import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { IconType } from "react-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/ui/LoadingState";

interface FilterProps {
  selectedCategory: number | null;
  onFilterChange: (variants: { attribute_id: number; value_id: number }[]) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  initialVariants?: { attribute_id: number; value_id: number }[];
  initialPriceRange?: { min: number; max: number };
}

interface Variant {
  id: number;
  name: string;
  display_type: string;
  create_variant: boolean;
  values: {
    id: number;
    name: string;
    html_color?: string;
    sequence: number;
  }[];
}

// Add useDebounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Filter = ({ selectedCategory, onFilterChange, onPriceChange, initialVariants = [], initialPriceRange }: FilterProps) => {
  const [variantsOpen, setVariantsOpen] = useState<{ [key: number]: boolean }>({});
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedValues, setSelectedValues] = useState<{ [key: number]: number[] }>({});
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([initialPriceRange?.max || 3000000]);
  const [isPriceConfirmNeeded, setIsPriceConfirmNeeded] = useState(false);

  // Initialize price range from URL params if available
  useEffect(() => {
    if (initialPriceRange) {
      setPriceRange([initialPriceRange.max]);
    }
  }, [initialPriceRange]);

  // Debounce the selected values with a shorter delay
  const debouncedSelectedValues = useDebounce(selectedValues, 200);

  // Initialize selected values from initialVariants
  useEffect(() => {
    if (initialVariants.length > 0) {
      setSelectedValues(prev => {
        const newSelectedValues: { [key: number]: number[] } = {};
        initialVariants.forEach(variant => {
          if (!newSelectedValues[variant.attribute_id]) {
            newSelectedValues[variant.attribute_id] = [];
          }
          newSelectedValues[variant.attribute_id].push(variant.value_id);
        });
        return JSON.stringify(prev) === JSON.stringify(newSelectedValues) ? prev : newSelectedValues;
      });
    } else {
      setSelectedValues({});
    }
  }, [initialVariants]);

  const fetchVariants = async () => {
    try {
      setError(null);
      setVariantsLoading(true);
      const response = await axiosInstance.post("/products/variants",
        selectedCategory ? { category_id: selectedCategory } : {}
      );
      // Filter out variants with empty values array
      const filteredVariants = response.data.filter((variant: Variant) => variant.values.length > 0);
      setVariants(filteredVariants);
      // Initialize open state for new variants
      const newOpenState = filteredVariants.reduce((acc: any, variant: Variant) => {
        acc[variant.id] = false;
        return acc;
      }, {});
      setVariantsOpen(newOpenState);
      // Only reset selected values if no initial variants
      if (!initialVariants.length) {
        setSelectedValues({});
      }
    } catch (error: any) {
      console.error("Error fetching variants:", error);
      setVariants([]);
      if (error.code === "ERR_NETWORK") {
        setError("عذراً، لا يمكن الاتصال بالخادم");
      } else if (error.response) {
        setError("عذراً، حدث خطأ أثناء تحميل الخصائص");
      } else {
        setError("عذراً، حدث خطأ غير متوقع");
      }
    } finally {
      setVariantsLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, [selectedCategory]);

  // Modify the useEffect that calls onFilterChange to use debounced values
  useEffect(() => {
    const selectedVariants = Object.entries(debouncedSelectedValues).flatMap(([attributeId, valueIds]) =>
      valueIds.map(valueId => ({
        attribute_id: Number(attributeId),
        value_id: valueId
      }))
    );

    // Only call onFilterChange if there are actual changes
    const hasValues = Object.values(debouncedSelectedValues).some(arr => arr.length > 0);
    if (hasValues || initialVariants.length > 0) {
      onFilterChange(selectedVariants);
    }
  }, [debouncedSelectedValues]);

  const handleValueChange = (attributeId: number, valueId: number) => {
    setSelectedValues(prev => {
      const currentValues = prev[attributeId] || [];
      const newValues = currentValues.includes(valueId)
        ? currentValues.filter(id => id !== valueId)
        : [...currentValues, valueId];

      // If the new values array is empty, remove the key entirely
      const newState = {
        ...prev,
        [attributeId]: newValues
      };

      if (newValues.length === 0) {
        delete newState[attributeId];
      }

      return newState;
    });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    setIsPriceConfirmNeeded(true);
  };

  const confirmPriceRange = () => {
    onPriceChange(1000, priceRange[0]);
    setIsPriceConfirmNeeded(false);
  };

  const clearAllFilters = () => {
    setPriceRange([3000000]);
    setSelectedValues({});
    onPriceChange(0, 0);
    setIsPriceConfirmNeeded(false);
  };

  const clearPriceFilter = () => {
    setPriceRange([3000000]);
    onPriceChange(0, 0);
    setIsPriceConfirmNeeded(false);
  };

  return (
    <Card className="w-full border-0 shadow-none" dir="rtl">
      <CardHeader className="sticky top-0 z-10 pb-3 bg-white">
        <div className="flex items-center justify-between font-tajawal-medium">
          <CardTitle className="text-lg font-medium">فلتر</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            label="حذف الفلتر"
            className="text-orange-500 border-2 border-orange-500 hover:text-orange-600"
            onClick={clearAllFilters}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range Section */}
        <div>
          <div className="flex items-center justify-between p-2 mb-3 text-white bg-orange-500 rounded-md font-tajawal-bold">
            <span>نطاق السعر</span>
            <Button
              variant="ghost"
              size="sm"
              label="حذف"
              className="h-auto py-0 text-white hover:text-white/80"
              onClick={clearPriceFilter}
            />
          </div>
          <div className="px-2">
            <Slider
              value={priceRange}
              max={3000000}
              min={1000}
              step={1000}
              className="w-full"
              onValueChange={handlePriceChange}
              dir="ltr"
            />
            <div className="flex justify-between mt-2 font-tajawal-medium">
              <span className="text-sm text-gray-600">3,000,000 د.ع</span>
              <span className="text-sm text-gray-600">{priceRange[0].toLocaleString()} د.ع</span>
            </div>
            {isPriceConfirmNeeded && (
              <Button
                variant="outline"
                size="sm"
                label="تأكيد السعر"
                className="w-full mt-2 text-orange-500 border-2 border-orange-500 hover:text-orange-600"
                onClick={confirmPriceRange}
              />
            )}
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Dynamic Variants Sections */}
        {variantsLoading ? (
          <div className="flex items-center justify-center pt-12">
            <Loader />
          </div>
        ) : error ? (
          <div className="py-4 text-center">
            <p className="mb-2 text-sm text-red-500">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              label="إعادة المحاولة"
              className="text-orange-500 hover:text-orange-600"
              onClick={() => fetchVariants()}
            />
          </div>
        ) : variants.map((variant) => (
          <div key={variant.id}>
            <Collapsible
              open={variantsOpen[variant.id]}
              onOpenChange={(isOpen) =>
                setVariantsOpen((prev) => ({ ...prev, [variant.id]: isOpen }))
              }
            >
              <div className="p-2 mb-3 text-white bg-orange-500 rounded-md font-tajawal-bold">
                {variant.name}
              </div>
              <div className="space-y-3">
                {variant.values.slice(0, 3).map((value) => (
                  <div
                    key={value.id}
                    className="flex items-center space-x-2 space-x-reverse"
                  >
                    <Checkbox
                      id={`variant-${variant.id}-${value.id}`}
                      checked={(selectedValues[variant.id] || []).includes(value.id)}
                      onCheckedChange={() => handleValueChange(variant.id, value.id)}
                      className="border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <label
                      htmlFor={`variant-${variant.id}-${value.id}`}
                      className="text-sm leading-none font-tajawal-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {value.name}
                    </label>
                  </div>
                ))}
              </div>

              {variant.values.length > 3 && (
                <>
                  <CollapsibleContent className="mt-2 space-y-3">
                    {variant.values.slice(3).map((value) => (
                      <div
                        key={value.id}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <Checkbox
                          id={`variant-${variant.id}-${value.id}`}
                          checked={(selectedValues[variant.id] || []).includes(value.id)}
                          onCheckedChange={() => handleValueChange(variant.id, value.id)}
                          className="border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <label
                          htmlFor={`variant-${variant.id}-${value.id}`}
                          className="text-sm leading-none font-tajawal-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {value.name}
                        </label>
                      </div>
                    ))}
                  </CollapsibleContent>

                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      label={variantsOpen[variant.id] ? "عرض اقل" : "عرض المزيد"}
                      Icon={ChevronDown as IconType}
                      className="mt-2 text-orange-500 hover:text-orange-600 font-tajawal-regular"
                    />
                  </CollapsibleTrigger>
                </>
              )}
            </Collapsible>
            <Separator className="my-4 bg-gray-200" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Filter;
