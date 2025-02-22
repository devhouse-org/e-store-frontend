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

interface FilterProps {
  selectedCategory: number | null;
  onFilterChange: (variants: { attribute_id: number; value_id: number }[]) => void;
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

const Filter = ({ selectedCategory, onFilterChange }: FilterProps) => {
  const [variantsOpen, setVariantsOpen] = useState<{ [key: number]: boolean }>({});
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedValues, setSelectedValues] = useState<{ [key: number]: number[] }>({});
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([110]);

  useEffect(() => {
    const fetchVariants = async () => {
      if (!selectedCategory) {
        setVariants([]);
        setSelectedValues({});
        return;
      }

      try {
        setVariantsLoading(true);
        const response = await axiosInstance.post("/variants", {
          category_id: selectedCategory,
        });
        setVariants(response.data);
        // Initialize open state for new variants
        const newOpenState = response.data.reduce((acc: any, variant: Variant) => {
          acc[variant.id] = false;
          return acc;
        }, {});
        setVariantsOpen(newOpenState);
        // Reset selected values when category changes
        setSelectedValues({});
      } catch (error) {
        console.error("Error fetching variants:", error);
        setVariants([]);
      } finally {
        setVariantsLoading(false);
      }
    };

    fetchVariants();
  }, [selectedCategory]);

  useEffect(() => {
    // Convert selected values to the format expected by the API
    const selectedVariants = Object.entries(selectedValues).flatMap(([attributeId, valueIds]) =>
      valueIds.map(valueId => ({
        attribute_id: Number(attributeId),
        value_id: valueId
      }))
    );
    onFilterChange(selectedVariants);
  }, [selectedValues]);

  const handleValueChange = (attributeId: number, valueId: number) => {
    setSelectedValues(prev => {
      const currentValues = prev[attributeId] || [];
      const newValues = currentValues.includes(valueId)
        ? currentValues.filter(id => id !== valueId)
        : [...currentValues, valueId];

      return {
        ...prev,
        [attributeId]: newValues
      };
    });
  };

  const clearAllFilters = () => {
    setPriceRange([0]);
    setSelectedValues({});
  };

  return (
    <Card className="w-full border-0 shadow-none" dir="rtl">
      <CardHeader className="pb-3 sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center font-tajawal-medium">
          <CardTitle className="text-lg font-medium">فلتر</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            label="حذف الفلتر"
            className="text-orange-500 hover:text-orange-600 border-2 border-orange-500"
            onClick={clearAllFilters}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range Section */}
        <div>
          <div className="bg-orange-500 text-white p-2 rounded-md mb-3 font-tajawal-bold">
            نطاق السعر
          </div>
          <div className="px-2">
            <Slider
              value={priceRange}
              max={1440}
              min={110}
              step={1}
              className="w-full"
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2 font-tajawal-medium">
              <span className="text-sm text-gray-600">1440$</span>
              <span className="text-sm text-gray-600">{priceRange[0]}$</span>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Dynamic Variants Sections */}
        {variantsLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : variants.map((variant) => (
          <div key={variant.id}>
            <Collapsible
              open={variantsOpen[variant.id]}
              onOpenChange={(isOpen) =>
                setVariantsOpen((prev) => ({ ...prev, [variant.id]: isOpen }))
              }
            >
              <div className="bg-orange-500 text-white p-2 rounded-md mb-3 font-tajawal-bold">
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
                      className="text-sm font-tajawal-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {value.name}
                    </label>
                  </div>
                ))}
              </div>

              {variant.values.length > 3 && (
                <>
                  <CollapsibleContent className="space-y-3 mt-2">
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
                          className="text-sm font-tajawal-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                      className="text-orange-500 mt-2 hover:text-orange-600 font-tajawal-regular"
                    />
                  </CollapsibleTrigger>
                </>
              )}
            </Collapsible>
            <Separator className="bg-gray-200 my-4" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Filter;
