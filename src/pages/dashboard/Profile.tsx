import LocationCard from '@/components/LocationCard'
import { Button } from '@/components/ui/button'
import { locations } from '@/utils/dummy_data/data'
import { LucidePlusCircle } from 'lucide-react'
import React from 'react'
import { IconType } from 'react-icons'

const Profile = () => {
    return (
        <div className="p4 space-y-4">
            {/* Header */}
            <h1 className="text-xl text-gray-500 font-tajawal-bold">تعديل الملف الشخصي</h1>

            {/* Profile Form */}
            <div className="bg-white p-6 rounded shadow">
                <form className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex-1 flex items-center gap-x-2">
                            <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">الاسم الكامل</label>
                            <input
                                type="text"
                                className="mt-1 block w-full outline-none border border-gray-300 py-2 px-4 rounded-md "
                                placeholder="أدخل اسمك الكامل"
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-x-2">
                            <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">البريد الإلكتروني</label>
                            <input
                                type="email"
                                className="mt-1 block w-full outline-none border border-gray-300 py-2 px-4 rounded-md "
                                placeholder="أدخل بريدك الإلكتروني"
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-x-2">
                            <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">رقم الهاتف</label>
                            <input
                                type="text"
                                className="mt-1 block w-full outline-none border border-gray-300 py-2 px-4 rounded-md "
                                placeholder="أدخل رقم هاتفك"
                            />
                        </div>
                        {/* <div className="flex-1 flex items-center gap-x-2">
                            <label className="block text-nowrap w-[120px] text-sm font-tajawal-medium text-gray-700">الصورة شخصية</label>
                            <input
                                type="text"
                                className="mt-1 block w-full outline-none border border-gray-300 py-2 px-4 rounded-md "
                                placeholder="الصورة شخصية"
                            />
                        </div> */}
                    </div>

                    <div className="flex pt-8 justify-between">
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
                        >
                            تغيير كلمة المرور
                        </button>
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
                        >
                            تحديث الملف الشخصي
                        </button>
                    </div>
                </form>
            </div>

            {/* Locations */}
            <div className="bg-white p-6 rounded shadow">
                <div className='flex justify-between items-center mb-4 pb-1 border-b border-light-200'>
                    <h2 className="text-lg font-tajawal-medium">عناوين التوصيل</h2>
                    <Button
                        label="إضافة عنوان"
                        Icon={LucidePlusCircle as IconType}
                    />
                </div>
                <div className="flex flex-wrap gap-4">
                    {locations.map((location) => (
                        <LocationCard
                            key={location.id}
                            location={location.location}
                            phoneNumber={location.phoneNumber}
                            phoneNumber2={location.phoneNumber2}
                            province={location.province}
                            city={location.city}
                            country={location.country}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile