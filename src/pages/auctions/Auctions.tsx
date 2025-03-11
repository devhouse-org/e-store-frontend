import AuctionCard from "@/components/AuctionCard";
import Pagination from "@/components/Pagination";
import { Auction } from "@/utils/data/auctions";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import Loader from "@/components/ui/LoadingState";

interface BackendAuction {
  id: number;
  x_name: string;
  x_studio_description: string;
  x_studio_starting_bid_1: number;
  x_studio_current_bid: number;
  x_studio_end_date: string;
  x_studio_product: [number, string] | false;
  product?: {
    name: string;
    description: string;
    image_1920: string;
  };
}

interface BackendResponse {
  success: boolean;
  auctions: BackendAuction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface TransformedResponse {
  success: boolean;
  auctions: Auction[];
}

const formatBase64Image = (base64String: string) => {
  if (!base64String) return "";
  // Check if the string already has the data URL prefix
  if (base64String.startsWith("data:")) return base64String;
  // Add the appropriate data URL prefix for base64 images
  return `data:image/jpeg;base64,${base64String}`;
};

const useAuctions = (page: number) => {
  return useQuery<BackendResponse, Error, TransformedResponse>({
    queryKey: ["auctions", page],
    queryFn: async () => {
      const response = await axiosInstance.get<BackendResponse>(
        `/auctions?page=${page}`
      );
      return response.data;
    },
    select: (data) => ({
      success: data.success,
      auctions: data.auctions.map((auction) => ({
        id: auction.id.toString(),
        title: auction.x_name,
        currentPrice:
          auction.x_studio_current_bid || auction.x_studio_starting_bid_1,
        startingPrice: auction.x_studio_starting_bid_1,
        endTime: auction.x_studio_end_date,
        image: formatBase64Image(auction.product?.image_1920 || ""),
        description: auction.x_studio_description,
      })),
      pagination: data.pagination,
    }),
  });
};

const Auctions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { data, isLoading, error } = useAuctions(currentPage);

  const handleSubscribe = () => {
    alert("Subscribed!");
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  if (isLoading) {
    return <div className="flex justify-center px-12 mx-auto mt-60">
              <Loader/>
           </div>
  }

  if (error) {
    return <div className="px-12 mx-auto mt-8 text-center">Error loading auctions</div>;
  }

  return (
    <div className="px-12 mx-auto mt-8 overflow-hidden">
      {/* Title */}
      <div className="pb-4 title">
        <h1 className="font-tajawal-bold text-[18px] md:text-[22px] lg:text-[32px]">
          المزادات
        </h1>
      </div>

      {/* Auction Cards and Pagination */}
      <div className="">
        {/* Auction Cards Section */}
        <div className="flex flex-row flex-wrap justify-center gap-4 auction_cards">
          {data?.auctions.map((auction) => (
            <Link key={auction.id} to={`/auction/${auction.id}`}>
              <AuctionCard auction={auction} onSubscribe={handleSubscribe} />
            </Link>
          ))}
        </div>
        <div className="mt-20 pagination mb-14">
          <Pagination 
            currentPage={currentPage}
            totalPages={data?.pagination.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Auctions;
