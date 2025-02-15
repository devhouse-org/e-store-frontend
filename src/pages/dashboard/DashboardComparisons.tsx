import { Button } from '@/components/ui/button';
import { LucideCircleDashed } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

type Props = {}

const DashboardComparisons = (props: Props) => {

    const [comparisons, setComparisons] = useState([]);

    if (comparisons.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-8 px-4 max-w-md mx-auto">
                <div className="text-center space-y-4">
                    <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto animate-pulse">
                        <LucideCircleDashed className="w-10 h-10 text-orange-500" />
                    </div>
                    <h2 className="text-3xl font-tajawal-bold text-gray-800">
                        لا توجد مقارنات
                    </h2>
                    <p className="text-gray-600 font-tajawal-regular text-lg">
                        لم تقم بحفظ اي مقارنات
                    </p>
                </div>

                <Link to="/products">
                    <Button
                        label="إبدأ المقارنة"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl
              transition-all duration-300  shadow-lg hover:shadow-orange-200"
                    ></Button>
                </Link>
            </div>
        );
    }

    return (
        <div>DashboardComparisons</div>
    )
}

export default DashboardComparisons