import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { IconType } from "react-icons";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  x_products: Product[];
}

const BannerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    products: cartProducts,
    addToCart,
    updateQuantity,
    removeFromCart,
  } = useCartStore();

  const { data, isLoading } = useQuery<BannerDetailsResponse>({
    queryKey: ["banner-details", id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/products/banners/${id}/products`
      );
      return response.data;
    },
  });

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - price * (discount / 100);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const discountedPrice = calculateDiscountedPrice(
      product.list_price,
      data?.banner_discount || 0
    );
    addToCart({
      id: String(product.id),
      name: product.name,
      price: discountedPrice,
      image: `data:image/jpeg;base64,${product.image_1920}`,
      quantity: 1,
    });
  };

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(e, product);
    navigate("/cart");
  };

  const handleUpdateQuantity = (
    e: React.MouseEvent,
    product: Product,
    newQuantity: number
  ) => {
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
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">جاري التحميل...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">لا يوجد بيانات</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Banner Details Section */}
      <div className="rounded-xl mb-8 overflow-hidden bg-white shadow-md">
        <div className="relative h-[400px] overflow-hidden">
          <img
            src={`data:image/jpeg;base64,${data.banner_image}`}
            alt={data.banner_name}
            className="object-cover w-full h-full"
          />
          {data.banner_discount > 0 && (
            <div className="top-4 right-4 font-tajawal-bold absolute px-4 py-2 text-white bg-red-500 rounded-full">
              خصم {data.banner_discount}%
            </div>
          )}
        </div>
        <div className="p-6">
          <h1 className="font-tajawal-bold mb-4 text-2xl text-gray-800">
            {data.banner_name}
          </h1>
          {data.banner_description && (
            <p className="font-tajawal-medium text-gray-600">
              {data.banner_description}
            </p>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="rounded-xl p-6 bg-white shadow-md">
        <h2 className="font-tajawal-bold mb-6 text-xl text-gray-800">
          المنتجات المتعلقة
        </h2>

        <div className="md:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-6">
          {data.x_products.map((product) => {
            const cartItem = cartProducts.find(
              (item) => item.id === String(product.id)
            );
            const discountedPrice = calculateDiscountedPrice(
              product.list_price,
              data.banner_discount
            );

            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group rounded-xl hover:shadow-lg relative flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    useWishlistStore.getState().isWishlisted(String(product.id))
                      ? useWishlistStore
                          .getState()
                          .removeFromWishlist(String(product.id))
                      : useWishlistStore
                          .getState()
                          .addToWishlist(String(product.id));
                  }}
                  className="hover:bg-orange-100 p-2 transition-colors rounded-full"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      useWishlistStore
                        .getState()
                        .isWishlisted(String(product.id))
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
                  <img
                    src={`data:image/jpeg;base64,${product.image_1920}`}
                    alt={product.name}
                    className="h-4/5 group-hover:scale-110 object-contain w-4/5 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="line-clamp-2 group-hover:text-orange-600 mb-2 text-sm font-medium text-gray-800 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex flex-col gap-3 mt-auto">
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

                    <div className="sm:flex-row flex flex-col gap-3">
                      {/* Cart controls */}
                      {cartItem ? (
                        <div className="bg-orange-100/25 flex items-center justify-center flex-1 gap-2 px-2 py-1 rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-black"
                            onClick={(e) =>
                              handleUpdateQuantity(
                                e,
                                product,
                                cartItem.quantity + 1
                              )
                            }
                            Icon={Plus as IconType}
                          />
                          <span className="font-tajawal-medium w-6 text-center">
                            {cartItem.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-orange-500"
                            onClick={(e) =>
                              handleUpdateQuantity(
                                e,
                                product,
                                cartItem.quantity - 1
                              )
                            }
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
