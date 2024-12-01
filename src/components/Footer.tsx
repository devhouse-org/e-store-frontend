import { Home, Mail, Paperclip, Pin, Recycle, Shield, UsersRound } from 'lucide-react'
import React from 'react'
import location from "../assets/images/location.png"
import cash from "../assets/images/cash.png"

type Props = {}

const Footer = (props: Props) => {
    return (
        <div className='bg-blue-800 rounded-lg overflow-hidden'>
            <div className='px-4 py-4'>
                <h1 className='font-tajawal-medium my-4 text-orange-400 text-2xl'>متواجدون دائماً لمساعدتكم</h1>
                <div className="top flex justify-between ">
                    <div className='flex gap-x-12'>

                        <div className="flex-1">
                            <div className=''>
                                <h1 className='font-tajawal-medium text-white border-b border-b-light-800'>تواصل معنا</h1>
                                <div className='flex gap-x-4 py-4'>
                                    <Home className='text-white' />
                                    <div className='gap-x-4 items-center'>
                                        <p className='font-tajawal-bold text-orange-400'>واتساب</p>
                                        <p className='text-white'>9647712345643+</p>
                                        <p className='text-white'>9647812345643+</p>
                                    </div>
                                </div>
                                <div className='flex gap-x-4 py-4'>
                                    <Mail className='text-white' />
                                    <div className='gap-x-4 items-center'>
                                        <p className='font-tajawal-bold text-orange-400'>بريد الكتروني</p>
                                        <p className='text-white'>info@estoreiraq.com</p>
                                    </div>
                                </div>
                                <div className='flex gap-x-4 py-4'>
                                    <Pin className='text-white' />
                                    <div className='gap-x-4 items-center'>
                                        <p className='font-tajawal-bold text-orange-400'>العنوان</p>
                                        <p className='text-white font-tajawal-regular'>العراق - البصرة - شارع الجزائر</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className=''>
                                <h1 className='font-tajawal-medium text-white border-b border-b-light-800'>طرق الدفع</h1>
                                <div className='flex gap-x-4 py-4'>
                                    <div className='gap-y-4 flex flex-col items-center'>
                                        <div className='bg-black flex justify-center p-4 rounded-md'>
                                            <img className='w-[80px]' src="https://zaincash.iq/assets/images/logo.png?v=0.0.2.5" alt="" />
                                        </div>
                                        <div className='bg-white flex justify-center p-4 rounded-md'>
                                            <img className='w-[80px]' src="https://taifpay.iq/images/logo2.png" alt="" />
                                        </div>
                                        <div className='bg-black flex justify-center p-4 rounded-md'>
                                            <img className='w-[80px]' src={cash} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div>
                        <div className="header">
                            <div>
                                <h1 className='font-tajawal-medium text-white border-b border-b-light-800 text-[1.2rem]'>نوصلك لكل مكان</h1>
                                <div className='flex gap-x-4 items-center'>
                                    <div className='w-[300px] h-[200px] mt-2'>
                                        <img src={location} alt="e-store location" className='object-cover rounded-lg' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-orange-500 text-white font-bold flex justify-between py-2 px-4 items-center" >
                <ul className='flex items-center gap-x-8 font-tajawal-regular list-none'>
                    <li className='flex gap-x-2 items-center justify-center'>
                        <Paperclip />
                        <p>الشروط والاحكام</p>
                    </li>
                    <li className='flex gap-x-2 items-center'>
                        <Shield />
                        <p>سياسة الخصوصية</p>
                    </li>
                    <li className='flex gap-x-2 items-center'>
                        <Recycle />
                        <p>سياسة الاسترجاع</p>
                    </li>
                    <li className='flex gap-x-2 items-center'>
                        <UsersRound />
                        <p>من نحن</p>
                    </li>
                </ul>
                <h1 className='font-tajawal-regular'>حقوق النشر 2024 متجر إي ستور. جميع الحقوق محفوظة.</h1>
            </div>
        </div>
    )
}

export default Footer