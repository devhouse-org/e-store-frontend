import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { Heart, ShoppingCart, Plus, Minus, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { IconType } from "react-icons";

interface Product {
    id: number;
    name: string;
    list_price: number;
    image_1920: string;
    description_sale: string | false;
}

interface BannerDetailsResponse {
    success: boolean;
    banner_name: string;
    banner_image: string;
    banner_description: string;
    banner_discount: number;
    products: Product[];
}

const BannerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products: cartProducts, addToCart, updateQuantity, removeFromCart } = useCartStore();

    const { data, isLoading } = useQuery<BannerDetailsResponse>({
        queryKey: ['banner-details', id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/products/banners/${id}/products`);
            return response.data;
        }
    });

    const calculateDiscountedPrice = (price: number, discount: number) => {
        return price - (price * (discount / 100));
    };

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        const discountedPrice = calculateDiscountedPrice(product.list_price, data?.banner_discount || 0);
        addToCart({
            id: String(product.id),
            name: product.name,
            price: discountedPrice,
            image: `data:image/jpeg;base64,${product.image_1920}`,
            quantity: 1
        });
    };

    const handleBuyNow = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        handleAddToCart(e, product);
        navigate("/cart");
    };

    const handleUpdateQuantity = (e: React.MouseEvent, product: Product, newQuantity: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (newQuantity < 1) {
            removeFromCart(String(product.id));
        } else {
            updateQuantity(String(product.id), newQuantity);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">جاري التحميل...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">لا يوجد بيانات</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Banner Details Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="relative h-[400px] overflow-hidden">
                    <img
                        src={`data:image/jpeg;base64,${data.banner_image}`}
                        alt={data.banner_name}
                        className="w-full h-full object-cover"
                    />
                    {data.banner_discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-tajawal-bold">
                            خصم {data.banner_discount}%
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <h1 className="text-2xl font-tajawal-bold text-gray-800 mb-4">
                        {data.banner_name}
                    </h1>
                    {data.banner_description && (
                        <p className="text-gray-600 font-tajawal-medium">
                            {data.banner_description}
                        </p>
                    )}
                </div>
            </div>

            {/* Related Products Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-tajawal-bold text-gray-800 mb-6">
                    المنتجات المتعلقة
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.products.map((product) => {
                        const cartItem = cartProducts.find((item) => item.id === String(product.id));
                        const discountedPrice = calculateDiscountedPrice(product.list_price, data.banner_discount);

                        return (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="group relative bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
                            >
                                {/* Wishlist Button */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        useWishlistStore.getState().isWishlisted(String(product.id))
                                            ? useWishlistStore.getState().removeFromWishlist(String(product.id))
                                            : useWishlistStore.getState().addToWishlist({
                                                id: String(product.id),
                                                name: product.name,
                                                price: discountedPrice,
                                                image: `data:image/jpeg;base64,${product.image_1920}`,
                                                description: product.description_sale || ""
                                            });
                                    }}
                                    className="absolute top-2 right-2 z-10 p-2 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white"
                                    aria-label="إضافة للمفضلة"
                                >
                                    <Heart
                                        className={`w-4 h-4 transition-colors ${useWishlistStore.getState().isWishlisted(String(product.id))
                                            ? "text-red-500 fill-red-500"
                                            : "text-gray-400 group-hover:text-gray-600"
                                            }`}
                                    />
                                </button>

                                {/* Product Image */}
                                <div className="aspect-square p-4 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                                    <img
                                        src={`data:image/jpeg;base64,${product.image_1920}`}
                                        alt={product.name}
                                        className="w-4/5 h-4/5 object-contain group-hover:scale-110 transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
                                        {product.name}
                                    </h3>

                                    <div className="mt-auto flex flex-col gap-3">
                                        <div className="flex flex-col">
                                            {data.banner_discount > 0 && (
                                                <span className="text-xs text-gray-500 line-through">
                                                    {product.list_price.toLocaleString()} د.ع
                                                </span>
                                            )}
                                            <span className="text-sm font-bold text-orange-600">
                                                {discountedPrice.toLocaleString()} د.ع
                                            </span>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            {/* Cart controls */}
                                            {cartItem ? (
                                                <div className="flex items-center justify-center gap-2 px-2 bg-orange-100/25 rounded-md py-1 flex-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="w-8 h-8 text-black"
                                                        onClick={(e) => handleUpdateQuantity(e, product, cartItem.quantity + 1)}
                                                        Icon={Plus as IconType}
                                                    />
                                                    <span className="w-6 text-center font-tajawal-medium">
                                                        {cartItem.quantity}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="w-8 h-8 text-orange-500"
                                                        onClick={(e) => handleUpdateQuantity(e, product, cartItem.quantity - 1)}
                                                        Icon={Minus as IconType}
                                                    />
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={(e) => handleAddToCart(e, product)}
                                                    className="flex-1 select-none rounded-lg bg-orange-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                >
                                                    <ShoppingCart className="mx-auto" />
                                                </button>
                                            )}

                                            {/* Buy Now button */}
                                            <button
                                                onClick={(e) => handleBuyNow(e, product)}
                                                className="select-none rounded-lg bg-orange-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                            >
                                                <CreditCard className="mx-auto" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BannerDetails; 