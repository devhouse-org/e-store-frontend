import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute z-10 p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-md -left-4 top-1/2 bg-white/80 hover:bg-white"
        >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
    );
};

const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute z-10 p-2 transition-all duration-200 -translate-y-1/2 rounded-full shadow-md -right-4 top-1/2 bg-white/80 hover:bg-white"
        >
            <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
    );
};

export const CategorySelector = ({ onCategorySelect, disabled = false }: CategorySelectorProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
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
        if (disabled) return;
        setSelectedCategory(category);
        onCategorySelect(category.id);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
        rtl: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    };

    if (loading) {
        return (
            <div className="grid grid-cols-6 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded-full animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="relative px-6">
            <Slider {...settings}>
                {categories.map((category) => (
                    <div key={category.id} className="px-2">
                        <button
                            onClick={() => handleCategorySelect(category)}
                            className={`w-full px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ${selectedCategory?.id === category.id
                                ? "bg-orange-500 text-white"
                                : disabled
                                    ? "bg-white text-gray-400 cursor-not-allowed"
                                    : "bg-white text-gray-600 hover:bg-gray-200"
                                }`}
                            disabled={disabled}
                        >
                            {category.name}
                        </button>
                    </div>
                ))}
            </Slider>

            {disabled && (
                <div className="mt-2 text-sm text-orange-500 font-tajawal-regular">
                    يجب مسح قائمة المقارنة الحالية قبل تغيير الفئة
                </div>
            )}
        </div>
    );
}; 