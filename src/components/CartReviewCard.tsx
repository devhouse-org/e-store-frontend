import React from 'react'

type Props = {
    cart: any;
}

const CartReviewCard = ({ cart }: Props) => {

    const priceToNumber = (price: string): number => {
        return Number(price.replace(/[^\d.]/g, "").replace(/,/g, ""));
    };

    const formatPrice = (number: number): string => {
        return `${number.toLocaleString()} د.ع`;
    };

    const calculateTotal = (cart: any): any => {
        const totalAmount = cart.reduce((sum, item) => {
            const price = priceToNumber(item.price);
            return sum + price * item.quantity;
        }, 0);

        return formatPrice(totalAmount);
    };

    const total = calculateTotal(cart);
    return (
        <div className={"bg-white border  border-slate-200 p-6 rounded-md shadow-md"}>
            <h1 className='font-tajawal-medium  mb-6 text-[18px]'>المنتجات</h1>
            <div className=' flex flex-col gap-y-4'>
                {
                    cart.map((item: any, index: number) => (
                        <div key={item.id} className={`flex items-start gap-x-12 justify-between`}>
                            <div className='flex'>
                                <div className='img w-[50px]'>
                                    <img src={item.image} className='w-full object-cover' alt="" />
                                </div>
                                <div className='title_and_quantity flex flex-col'>
                                    <p className='font-tajawal-light'>{item.title}</p>
                                    <p className='font-tajawal-medium'>x{item.quantity}</p>
                                </div>

                            </div>
                            <div className='price font-tajawal-light'>{item.price}</div>
                        </div>
                    ))
                }
            </div>
            <div className="mt-4 text-right border-t pt-2" dir="rtl">
                <div className="text-lg flex items-center justify-between  font-tajawal-medium">
                    <p>المجموع الكلي</p>
                    <p className='text-orange-500'>{total}</p>
                </div>
            </div>
        </div>
    )
}

export default CartReviewCard