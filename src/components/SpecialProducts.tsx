import { products } from "@/utils/data/products";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { IconType } from "react-icons";

const SpecialProducts = () => {
  return (
    <Card className="bg-white border border-slate-200 shadow-md rounded-md py-6 px-14">
      <div className="border-b mb-4">
        <h1 className="font-tajawal-medium text-[16px] border-b-2 border-orange-400 w-fit ">
          المنتجات المميزة
        </h1>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-2/3 space-y-4 p-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-0 gap-0 flex my-2">
              {products.map((product, index) => (
                <CarouselItem
                  key={product.id}
                  className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/6 flex-shrink-0 pl-0"
                >
                  <div className="pr-2 space-y-4">
                    <ProductCard product={product} size="sm" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              Icon={ArrowBigLeft as IconType}
              className="-left-10 bg-white hover:bg-gray-100"
            />
            <CarouselNext
              Icon={ArrowBigRight as IconType}
              className="-right-10 bg-white hover:bg-gray-100"
            />
          </Carousel>
        </div>

        <div className="lg:w-1/3 flex justify-center items-center">
          <div className="w-2/3">
            <img
              className="w-full object-contain "
              src="https://imgs.search.brave.com/WHP2l_3EHf2gg19MN7siqwYx7WPyHycjFStijWLttwE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxczB4RlZtSVFM/LmpwZw"
              alt="Featured Product"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SpecialProducts;
