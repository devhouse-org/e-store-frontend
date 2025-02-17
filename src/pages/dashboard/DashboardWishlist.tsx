import ProductCard from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { useWishlistStore } from '@/store/useWishlistStore'
import { LucideHeart } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const DashboardWishlist = (props: Props) => {
    const { wishlist, removeFromWishlist } = useWishlistStore();

    if (wishlist.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
                <div className="text-center space-y-4">
                    <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto animate-pulse">
                        <LucideHeart className="w-10 h-10 text-orange-500" />
                    </div>
                    <h2 className="text-3xl font-tajawal-bold text-gray-800">
                        قائمة المفضلة فارغة
                    </h2>
                    <p className="text-gray-600 font-tajawal-regular text-lg">
                        لم تقم بإضافة أي منتج إلى قائمة المفضلة بعد
                    </p>
                </div>

                <Link to="/products">
                    <Button
                        label="إبدأ التسوق"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl
              transition-all duration-300  shadow-lg hover:shadow-orange-200"
                    ></Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="p-4 space-y-4 h-full">
            <h1 className="text-xl text-gray-500 font-tajawal-bold">المفضلات ({wishlist.length})</h1>
            <div className="">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
                        {wishlist.map((product) => (
                            <ProductCard product={product} size="lg" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardWishlist