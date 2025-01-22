export interface Auction {
  id: string;
  title: string;
  currentPrice: number;
  startingPrice: number;
  endTime: string;
  image: string;
  brand: string;
  description: string;
}

export const auctions: Auction[] = [
  {
    id: "1",
    title: "ايفون 14 برو ماكس",
    currentPrice: 850000,
    startingPrice: 800000,
    endTime: "2024-04-01T15:00:00",
    image: "/src/assets/images/iphone14.jpg",
    brand: "Apple",
    description: "هاتف ايفون 14 برو ماكس بحالة ممتازة",
  },
  {
    id: "2",
    title: "سامسونج S23 الترا",
    currentPrice: 750000,
    startingPrice: 700000,
    endTime: "2024-04-02T18:00:00",
    image: "/src/assets/images/s23.jpg",
    brand: "Samsung",
    description: "هاتف سامسونج S23 الترا الرائد",
  },
  // Add more auction items as needed
];

// Helper functions similar to products
export const getAuctionById = (id: string): Auction | undefined => {
  return auctions.find((auction) => auction.id === id);
};

export const getAuctionsByBrand = (brand: string): Auction[] => {
  return auctions.filter((auction) => auction.brand === brand);
};

export const getBrands = (): string[] => {
  return [...new Set(auctions.map((auction) => auction.brand))];
};
