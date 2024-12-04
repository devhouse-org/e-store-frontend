import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";

const Filter = () => {
  const [priceRange, setPriceRange] = useState([0]);
  const [selectedProducts, setSelectedProducts] = useState({
    phones: true,
    smartwatches: true,
    watches: false,
    accessories: false,
  });
  const [selectedBrands, setSelectedBrands] = useState({
    iphone: true,
    huawei: false,
    oppo: true,
    samsung: false,
  });
  const [selectedStorage, setSelectedStorage] = useState({
    "32": true,
    "64": false,
    "128": true,
    "256": false,
  });

  const categories = {
    products: [
      { id: "phones", label: "هواتف" },
      { id: "smartwatches", label: "ساعات ذكية" },
      { id: "watches", label: "ساعات" },
      { id: "accessories", label: "اكسسوارات" },
    ],
    brands: [
      { id: "iphone", label: "ايفون" },
      { id: "huawei", label: "هواوي" },
      { id: "oppo", label: "اوبو" },
      { id: "samsung", label: "سامسونج" },
    ],
    storage: [
      { id: "32", label: "32 GB" },
      { id: "64", label: "64 GB" },
      { id: "128", label: "128 GB" },
      { id: "256", label: "256 GB" },
    ],
  };

  const clearAllFilters = () => {
    setPriceRange([110]);
    setSelectedProducts({
      phones: false,
      smartwatches: false,
      watches: false,
      accessories: false,
    });
    setSelectedBrands({
      iphone: false,
      huawei: false,
      oppo: false,
      samsung: false,
    });
    setSelectedStorage({
      "32": false,
      "64": false,
      "128": false,
      "256": false,
    });
  };

  return (
    <Card className="w-64" dir="rtl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">فلتر</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 hover:text-orange-600"
            onClick={clearAllFilters}
          >
            حذف الفلتر
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Products Section */}
        <div>
          <div className="bg-orange-500 text-white p-2 rounded-md mb-3">
            المنتجات
          </div>
          <div className="space-y-3">
            {categories.products.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <Checkbox
                  id={`product-${item.id}`}
                  checked={selectedProducts[item.id]}
                  onCheckedChange={(checked) =>
                    setSelectedProducts((prev) => ({
                      ...prev,
                      [item.id]: checked,
                    }))
                  }
                  className="border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <label
                  htmlFor={`product-${item.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 mt-2 hover:text-orange-600"
          >
            عرض المزيد <ChevronDown className="mr-1 h-4 w-4" />
          </Button>
        </div>

        <Separator className="bg-gray-200" />

        {/* Brands Section */}
        <div>
          <div className="bg-orange-500 text-white p-2 rounded-md mb-3">
            الفئات
          </div>
          <div className="space-y-3">
            {categories.brands.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <Checkbox
                  id={`brand-${item.id}`}
                  checked={selectedBrands[item.id]}
                  onCheckedChange={(checked) =>
                    setSelectedBrands((prev) => ({
                      ...prev,
                      [item.id]: checked,
                    }))
                  }
                  className="border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <label
                  htmlFor={`brand-${item.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 mt-2 hover:text-orange-600"
          >
            عرض المزيد <ChevronDown className="mr-1 h-4 w-4" />
          </Button>
        </div>

        <Separator className="bg-gray-200" />

        {/* Price Range Section */}
        <div>
          <div className="bg-orange-500 text-white p-2 rounded-md mb-3">
            نطاق السعر
          </div>
          <div className="px-2">
            <Slider
              value={priceRange}
              max={1440}
              min={0}
              step={1}
              className="w-full"
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">1440$</span>
              <span className="text-sm text-gray-600">{priceRange[0]}$</span>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Storage Section */}
        <div>
          <div className="bg-orange-500 text-white p-2 rounded-md mb-3">
            سعة الذاكرة
          </div>
          <div className="space-y-3">
            {categories.storage.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-2 space-x-reverse"
              >
                <Checkbox
                  id={`storage-${item.id}`}
                  checked={selectedStorage[item.id]}
                  onCheckedChange={(checked) =>
                    setSelectedStorage((prev) => ({
                      ...prev,
                      [item.id]: checked,
                    }))
                  }
                  className="border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
                <label
                  htmlFor={`storage-${item.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Filter;
