import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useComparisonStore } from "@/store/useComparisonStore";
import { Product as ComparisonProduct } from "@/utils/data/products";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useToast } from "@/hooks/use-toast";

interface Product {
    id: number;
    name: string;
    list_price: number;
    image_1920: string;
    description?: string;
}

interface CategoryProductsProps {
    categoryId: number | null;
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

export const CategoryProducts = ({ categoryId }: CategoryProductsProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const { addToComparison, isCompared, comparisonItems } = useComparisonStore();
    const { toast } = useToast();

    useEffect(() => {
        const fetchProducts = async () => {
            if (!categoryId) return;

            setLoading(true);
            try {
                const response = await axiosInstance.post("/products", {
                    category_id: categoryId
                });
                setProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    const handleAddToComparison = (product: Product) => {
        if (comparisonItems.length >= 4) {
            toast({
                title: "تم الوصول إلى الحد الأقصى",
                description: "يمكنك مقارنة 4 منتجات كحد أقصى",
                variant: "destructive",
            });
            return;
        }

        const comparisonProduct: ComparisonProduct = {
            id: product.id.toString(),
            name: product.name,
            price: product.list_price,
            image: `data:image/png;base64,${product.image_1920}`,
            description: product.description || "",
        };
        addToComparison(comparisonProduct);
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        rtl: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    };

    if (!categoryId) {
        return (
            <div className="flex items-center justify-center p-8 text-gray-500 font-tajawal-regular">
                الرجاء اختيار فئة لعرض المنتجات
            </div>
        );
    }

    if (loading) {
        return (
            <div className="relative px-6">
                <div className="grid grid-cols-5 gap-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="p-4 border rounded-lg animate-pulse">
                            <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
                            <div className="w-3/4 h-4 mt-4 bg-gray-200 rounded"></div>
                            <div className="w-1/2 h-4 mt-2 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex items-center justify-center p-8 text-gray-500 font-tajawal-regular">
                لا توجد منتجات في هذه الفئة
            </div>
        );
    }

    return (
        <div className="relative px-6">
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className="px-2">
                        <div className="group rounded-xl hover:shadow-lg relative flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100">
                            <div className="aspect-square bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
                                <img
                                    src={`data:image/png;base64,${product.image_1920}`}
                                    alt={product.name}
                                    className="h-4/5 group-hover:scale-110 mix-blend-multiply object-contain w-4/5 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-col flex-grow p-4">
                                <h3 className="line-clamp-2 group-hover:text-orange-600 mb-2 text-sm font-semibold text-gray-800 transition-colors font-tajawal-regular">
                                    {product.name}
                                </h3>
                                <p className="text-orange-500 font-tajawal-regular">
                                    {product.list_price.toLocaleString()} د.ع
                                </p>
                                <button
                                    onClick={() => handleAddToComparison(product)}
                                    disabled={isCompared(product.id.toString())}
                                    className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-tajawal-regular w-full justify-center ${isCompared(product.id.toString())
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : "bg-orange-500 text-white hover:bg-orange-600"
                                        }`}
                                >
                                    <Plus className="w-4 h-4" />
                                    {isCompared(product.id.toString())
                                        ? "تمت الإضافة"
                                        : "أضف للمقارنة"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}; 