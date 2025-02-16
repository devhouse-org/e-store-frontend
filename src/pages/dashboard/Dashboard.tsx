import { LucideBookHeart, LucidePackageCheck, LucideShoppingCart } from 'lucide-react';
import React from 'react';

const Dashboard = () => {
  return (
    <div className="p4 space-y-4">
      {/* Header */}
      <h1 className="text-xl text-gray-500 font-tajawal-bold">لوحة التحكم</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white flex items-start gap-x-4 p-4 rounded shadow">
          <div className="bg-orange-500 shadow-lg p-4 flex justify-center items-center rounded-full">
            <LucideShoppingCart className="text-white" size={40} />
          </div>
          <div>
            <h2 className="text-lg font-tajawal-medium">4 منتجات في السلة</h2>
            <p className='font-tajawal-regular'>اضغط لإكمال عملية التسوق</p>
            <a href="#" className="text-orange-500 font-tajawal-regular">رؤية المزيد</a>
          </div>
        </div>
        <div className="bg-white flex items-start gap-x-4 p-4 rounded shadow">
          <div className="bg-orange-500 shadow-lg p-4 flex justify-center items-center rounded-full">
            <LucideBookHeart className="text-white" size={40} />
          </div>
          <div>
            <h2 className="text-lg font-tajawal-medium">5 منتجات في المفضلات</h2>
            <p className='font-tajawal-regular'>تصفح المنتجات لإضافة المزيد...</p>
            <a href="#" className="text-orange-500 font-tajawal-regular">رؤية المزيد</a>
          </div>
        </div>
        <div className="bg-white flex items-start gap-x-4 p-4 rounded shadow">
          <div className="bg-orange-500 shadow-lg p-4 flex justify-center items-center rounded-full">
            <LucidePackageCheck className="text-white" size={40} />
          </div>
          <div>
            <h2 className="text-lg font-tajawal-medium">2 طلبات</h2>
            <p className='font-tajawal-regular'>راجع طلباتك وتأكد من وصولها</p>
            <a href="#" className="text-orange-500 font-tajawal-regular">رؤية المزيد</a>
          </div>
        </div>
      </div>

      {/* Notifications and Orders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Orders */}
        <div className="bg-white p-4 rounded shadow col-span-2">
          <h2 className="text-lg font-tajawal-medium">الطلبات الحالية (4)</h2>
          <table className="w-full mt-2">
            <thead className='bg-black/5 text-black'>
              <tr className="text-left h-10">
                <th className='text-right px-2'>#</th>
                <th className='text-right'>رقم الطلب</th>
                <th className='text-right'>التاريخ</th>
                <th className='text-right'>المبلغ</th>
                <th className='text-right'>حالة التسليم</th>
                <th className='text-right'>حالة التسديد</th>
              </tr>
            </thead>
            <tbody>
              {Array(4).fill(0).map((_, index) => (
                <tr key={index} className="border-t h-10">
                  <td className='px-2'>{index + 1}</td>
                  <td>20230126</td>
                  <td>26-01-2023</td>
                  <td>980.000 د.ع</td>
                  <td>قيد الانتظار</td>
                  <td>تم التسليم</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded shadow col-span-1">
          <h2 className="text-lg font-tajawal-medium">الإشعارات</h2>
          <ul className="space-y-2">
            {Array(6).fill(0).map((_, index) => (
              <li key={index} className="flex bg-white shadow p-2 rounded-md gap-x-4 items-center space-x-2">
                <div className='w-10 h-10 rounded-full overflow-hidden'>
                  <img src="https://images.unsplash.com/photo-1652018145149-b61a9566b245?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className='font-tajawal-medium line-clamp-1'>فريق دعم إي ستور</p>
                  <p className="text-sm text-gray-500 font-tajawal-regular line-clamp-1">تم فتح تذكرة جديدة</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Shipping Addresses */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-tajawal-medium">عناوين الشحن</h2>
        <table className="w-full mt-2">
          <thead className='bg-black/5 text-black'>
            <tr className="text-left h-10">
              <th className='text-right px-2'>#</th>
              <th className='text-right'>المدينة</th>
              <th className='text-right'>رقم الهاتف</th>
              <th className='text-right'>المحافظة</th>
              <th className='text-right'>الدولة</th>
              <th className='text-right'>الخيارات</th>
            </tr>
          </thead>
          <tbody>
            {Array(2).fill(0).map((_, index) => (
              <tr key={index} className="border-t h-10">
                <td className='px-2'>{index + 1}</td>
                <td>الكاظمية</td>
                <td>07701234567</td>
                <td>بغداد</td>
                <td>العراق</td>
                <td>
                  <button className="text-green-500">تعديل</button>
                  <button className="text-red-500 ml-2">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
