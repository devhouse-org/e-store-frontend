import { Button } from '@/components/ui/button';
import { LucideArrowDownToLine, LucideEye, LucideHistory, LucideTrash } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

type Props = {}

const PurchaseHistory = (props: Props) => {

    const [history, setHistory] = useState([
        {
            id: '20230126-21081239',
            date: '26-01-2023',
            amount: '1,165,000 د.ع',
            deliveryStatus: 'قيد الانتظار',
            paymentStatus: 'غير مدفوع',
        },
        {
            id: '20225869-21081239',
            date: '10-12-2022',
            amount: '31,000 د.ع',
            deliveryStatus: 'تم التسليم',
            paymentStatus: 'تم الدفع',
        },
    ]);

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
        <div className="p-4 space-y-4">
            <h1 className="text-xl text-gray-500 font-tajawal-bold">سجل الشراء</h1>
            <div className="bg-white p-4 rounded shadow">
                <table className="w-full">
                    <thead className="bg-black/5 text-black">
                        <tr className="text-left h-10">
                            <th className="text-right px-2">كود</th>
                            <th className="text-right">التاريخ</th>
                            <th className="text-right">المبلغ</th>
                            <th className="text-right">حالة التسليم</th>
                            <th className="text-right">حالة التسديد</th>
                            <th className="text-right">الخيارات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((order, index) => (
                            <tr key={index} className="border-t h-10">
                                <td className="text-orange-500 px-2">{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.amount}</td>
                                <td>{order.deliveryStatus}</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded ${order.paymentStatus === 'تم الدفع'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                            }`}
                                    >
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="flex items-center py-1 gap-2">
                                    <button className="text-blue-500">
                                        <LucideArrowDownToLine />
                                    </button>
                                    <button className="text-blue-500">
                                        <LucideEye />
                                    </button>
                                    <button className="text-red-500">
                                        <LucideTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PurchaseHistory