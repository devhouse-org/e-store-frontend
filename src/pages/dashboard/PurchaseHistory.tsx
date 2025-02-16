import { Button } from '@/components/ui/button';
import { LucideHistory } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

type Props = {}

const PurchaseHistory = (props: Props) => {

    const [history, setHistory] = useState([]);

    if (history.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
                <div className="text-center space-y-4">
                    <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto animate-pulse">
                        <LucideHistory className="w-10 h-10 text-orange-500" />
                    </div>
                    <h2 className="text-3xl font-tajawal-bold text-gray-800">
                        لا توجد طلبات شراء
                    </h2>
                    <p className="text-gray-600 font-tajawal-regular text-lg">
                        لم تقم بشراء أي منتج بعد
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
        );
    }
    return (
        <div>PurchaseHistory</div>
    )
}

export default PurchaseHistory