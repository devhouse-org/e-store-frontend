import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { ChevronDown } from "lucide-react";

interface Category {
    id: number;
    name: string;
    parent_id: false | [number, string];
    child_id: number[];
    children: Category[];
}

interface CategorySelectorProps {
    onCategorySelect: (categoryId: number) => void;
    disabled?: boolean;
}

export const CategorySelector = ({ onCategorySelect, disabled = false }: CategorySelectorProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.post("/products/categories", {});
                const rootCategories = response.data.filter((cat: Category) => !cat.parent_id);
                setCategories(rootCategories);
                if (rootCategories.length > 0 && !selectedCategory) {
                    setSelectedCategory(rootCategories[0]);
                    onCategorySelect(rootCategories[0].id);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        onCategorySelect(category.id);
        setIsOpen(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-12 px-4 py-2 bg-white border rounded-lg">
                <div className="w-5 h-5 border-t-2 border-orange-500 border-solid rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full px-4 py-2 text-right bg-white border rounded-lg ${disabled ? 'cursor-not-allowed opacity-60' : 'hover:border-orange-500'
                    }`}
                disabled={disabled}
            >
                <span className="font-tajawal-regular">
                    {selectedCategory ? selectedCategory.name : 'اختر الفئة'}
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {isOpen && !disabled && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    <div className="py-1">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category)}
                                className={`w-full px-4 py-2 text-right transition-colors hover:bg-orange-50 ${selectedCategory?.id === category.id ? 'bg-orange-50 text-orange-500' : ''
                                    }`}
                            >
                                <span className="font-tajawal-regular">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {disabled && (
                <div className="mt-2 text-sm text-orange-500 font-tajawal-regular">
                    يجب مسح قائمة المقارنة الحالية قبل تغيير الفئة
                </div>
            )}
        </div>
    );
}; 