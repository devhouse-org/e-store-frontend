import { prices } from "@/utils/dummy_data/data";
import { AuctionDialog } from "./AuctionDialog";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type Props = {};

const AuctionSection = (props: Props) => {
  return (
    <div className="bg-white border border-slate-200 shadow-md rounded-md py-6 px-14">
      <div className="border-b ">
        <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit ">
          مزايدات
        </h1>
      </div>
      {/* main div */}
      <div className="my-4 flex flex-col-reverse lg:flex-row justify-between ">
        {/* Right Section */}
        <div className="flex-[.5] flex flex-col mt-6 lg:mt-0">
          <h1 className="font-tajawal-bold text-3xl mb-6 mt-4">ساعة بكسل 3</h1>
          <h3 className="font-tajawal-medium mb-2">
            ساعة عالية الجودة تم تطويره بواسطة Google
          </h3>
          {/* prices */}
          <div className="flex flex-col max-w-[16rem]">
            <div className="flex justify-between ">
              <h3 className="font-tajawal-regular">إعلى مزايدة</h3>
              <p className="text-orange-500 font-tajawal-bold">د,ع 310,000</p>
            </div>
            <div className="flex justify-between ">
              <h3 className="font-tajawal-regular">تبدأ المزايدة من</h3>
              <p className="text-orange-500 font-tajawal-bold">د,ع 250,000</p>
            </div>
          </div>
          {/* section two */}
          <div className="mt-12">
            <AuctionDialog prices={prices} endTime="2024-12-15T12:00:00" />
            <div className="mt-6">
              <Label>مزادات أخرى</Label>
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3].map(() => (
                  <ProductCard
                    size="sm"
                    productName="ريلمي 9 آي - اسود"
                    productPrice={165000}
                    productImage="https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw" // Replace with the actual image URL
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Left Section */}
        <div className="flex-[.5]">
          <div className="flex justify-center items-center">
            <div className="w-[50%] ">
              <img
                className="w-full object-contain"
                src="https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionSection;
