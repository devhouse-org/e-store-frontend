import { useState } from "react";
import { products } from "@/utils/data/products";
import { Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useComparisonStore } from "@/store/useComparisonStore";

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    brand: string;
    description: string;
    ram: string;
    cpu: string;
    screenSize: string;
    frontCamera: string;
    backCamera: string;
    storage: string;
    os: string;
};

const EmptySlot = () => (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
        <Link

            to="/products"
            className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
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

const ProductColumn = ({ product, onRemove }: { product: Product | null, onRemove: () => void }) => {
    const addToCart = useCartStore(state => state.addToCart);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            storage: product.storage
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
                                src={product.image}
                                alt={product.name}
                                className="w-24 h-24 object-cover mx-auto rounded-lg"
                            />
                        </div>
                        <h3 className="font-semibold font-tajawal-regular text-sm">{product.name}</h3>
                        <p className="text-orange-500 font-tajawal-regular">
                            {product.price.toLocaleString()} د.ع
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

const DataRow = ({
    label,
    getValue,
    slots
}: {
    label: string,
    getValue: (product: Product | null) => string,
    slots: (Product | null)[]
}) => (
    <tr>
        <td className="border p-4 bg-gray-50 font-tajawal-regular">{label}</td>
        {[0, 1, 2, 3].map((index) => (
            <td key={`cell-${index}`} className="border p-4 text-center font-tajawal-regular">
                {slots[index] ? getValue(slots[index]) : "-"}
            </td>
        ))}
    </tr>
);

const Comparison = () => {
    const { comparisonItems, removeFromComparison } = useComparisonStore();

    // Use up to 4 items from comparison store
    const slots = [
        comparisonItems[0] || null,
        comparisonItems[1] || null,
        comparisonItems[2] || null,
        comparisonItems[3] || null
    ];

    const specifications = [
        { label: "العلامة التجارية", key: "brand" },
        { label: "الفئة", key: "category" },
        { label: "الذاكرة العشوائية", key: "ram" },
        { label: "المعالج", key: "cpu" },
        { label: "حجم الشاشة", key: "screenSize" },
        { label: "الكاميرا الأمامية", key: "frontCamera" },
        { label: "الكاميرا الخلفية", key: "backCamera" },
        { label: "سعة التخزين", key: "storage" },
        { label: "نظام التشغيل", key: "os" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 font-tajawal-regular">مقارنة المنتجات</h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-4 bg-gray-50 font-tajawal-regular">المواصفات</th>
                            {/* Fixed column order by using index as position */}
                            {[0, 1, 2, 3].map((index) => (
                                <ProductColumn
                                    key={`slot-${index}`}
                                    product={slots[index]}
                                    onRemove={() => {
                                        if (slots[index]) {
                                            removeFromComparison(slots[index]!.id);
                                        }
                                    }}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {specifications.map(spec => (
                            <DataRow
                                key={spec.key}
                                label={spec.label}
                                getValue={(product) => product?.[spec.key as keyof Product] || "-"}
                                slots={slots}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Comparison; 