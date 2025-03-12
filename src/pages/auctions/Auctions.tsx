import AuctionCard from "@/components/AuctionCard";
import LoadingComponent from "@/components/loading";
import Pagination from "@/components/Pagination";
import axiosInstance from "@/utils/axiosInstance";
import { Auction } from "@/utils/data/auctions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

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

const useAuctions = () => {
  return useQuery<BackendResponse, Error, TransformedResponse>({
    queryKey: ["auctions"],
    queryFn: async () => {
      const response = await axiosInstance.get<BackendResponse>("/auctions");
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
    }),
  });
};

const Auctions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useAuctions();

  const handleSubscribe = () => {
    alert("Subscribed!");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div className="px-12 mx-auto mt-8">Error loading auctions</div>;
  }

  return (
    <div className="px-12 mx-auto mt-8">
      {/* Title */}
      <div className="title pb-4">
        <h1 className="font-tajawal-bold text-[18px] md:text-[22px] lg:text-[32px]">
          المزادات
        </h1>
      </div>

      {/* Auction Cards and Pagination */}
      <div className="">
        {/* Auction Cards Section */}
        <div className="auction_cards flex flex-row flex-wrap justify-center gap-4">
          {data?.auctions.map((auction) => (
            <Link key={auction.id} to={`/auction/${auction.id}`}>
              <AuctionCard auction={auction} onSubscribe={handleSubscribe} />
            </Link>
          ))}
        </div>
        <div className="pagination mb-14 mt-20">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((data?.auctions.length || 0) / 12)} // Assuming 12 items per page
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Auctions;
