import React from 'react'
import AuctionCard from './AuctionCard'
import ProductCard from './ProductCard'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = {}

const SpecialProducts = (props: Props) => {
    return (
        <div className='wrapper bg-white border border-slate-200 shadow-md rounded-md p-4'>
            <div className="header border-b ">
                <h1 className='font-tajawal-medium text-[16px]'>المنتجات المميزة</h1>
            </div>
            <div className='products my-4 flex justify-between'>
                <div className='flex-[.5] flex items-center gap-x-4'>
                    <ArrowRight className='bg-white' />
                    <div className="right grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-4">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                                <ProductCard
                                    size="sm"
                                    productName="ريلمي 9 آي - اسود"
                                    productPrice={165000}
                                    productImage="https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw" // Replace with the actual image URL
                                />
                            ))
                        }
                    </div>
                    <ArrowLeft />
                </div>
                <div className="left flex-[.5]">
                    <div className="flex justify-center items-center">
                        <div className='w-[50%] '>
                            <img className='w-full object-contain' src="https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialProducts