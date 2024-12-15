import {
  Bluetooth,
  Book,
  Cable,
  Gamepad,
  Headphones,
  Monitor,
  Mouse,
  Plug,
  ShoppingBag,
  Smartphone,
  Watch,
} from "lucide-react";

export const carouselCardData = [
  { id: 1, label: "هواتف", Icon: Smartphone, link: "#" },
  { id: 2, label: "ساعات", Icon: Watch, link: "#" },
  { id: 3, label: "شواحن", Icon: Plug, link: "#" },
  { id: 4, label: "سماعات الرأس", Icon: Headphones, link: "#" },
  { id: 5, label: "شاشات", Icon: Monitor, link: "#" },
  { id: 6, label: "اجهزة العاب", Icon: Gamepad, link: "#" },
  { id: 7, label: "سماعات بلوتوث", Icon: Bluetooth, link: "#" },
  { id: 8, label: "كيبلات", Icon: Cable, link: "#" },
  { id: 9, label: "ماوسات", Icon: Mouse, link: "#" },
  { id: 10, label: "تسوق", Icon: ShoppingBag, link: "#" },
  { id: 11, label: "كتب", Icon: Book, link: "#" },
  { id: 12, label: "ماركات التجارية", Icon: ShoppingBag, link: "#" },
  { id: 13, label: "المزاد", Icon: Book, link: "#" },
  { id: 14, label: "التدوينات", Icon: Book, link: "#" },
];

export const techLogos = [
  { id: 1, label: "Samsung", image: "./realme.png", link: "#" },
  { id: 2, label: "Apple", image: "./apple.png", link: "#" },
  { id: 3, label: "Anker", image: "./Anker.png", link: "#" },
  { id: 4, label: "Belkin", image: "./belkin.png", link: "#" },
  { id: 5, label: "Meta", image: "./meta.png", link: "#" },
  { id: 7, label: "Nintendo", image: "./nintendo.png", link: "#" },
  { id: 8, label: "Oppo", image: "./oppo.png", link: "#" },
  { id: 9, label: "Realme", image: "./realme.png", link: "#" },
  { id: 10, label: "Xiaomi", image: "./xiaomi.png", link: "#" },
  { id: 11, label: "Huawei", image: "./huawei.png", link: "#" },
  { id: 12, label: "OnePlus", image: "./oneplus.png", link: "#" },
  { id: 13, label: "Vivo", image: "./vivo.png", link: "#" },
];

export const prices = [
  {
    id: 1,
    label: "5,000+ د.ع",
    value: 5000,
  },
  {
    id: 2,
    label: "10,000+ د.ع",
    value: 10000,
  },
  {
    id: 3,
    label: "20,000+ د.ع",
    value: 20000,
  },
  {
    id: 4,
    label: "30,000+ د.ع",
    value: 30000,
  },
  {
    id: 5,
    label: "40,000+ د.ع",
    value: 40000,
  },
  {
    id: 7,
    label: "50,000+ د.ع",
    value: 50000,
  },
  {
    id: 6,
    label: "100,000+ د.ع",
    value: 100000,
  },
];

export const cart = [
  {
    id: 1,
    title: "بلي ستيشن 5 اوربي ريجن 2",
    price: "500,000 د.ع",
    quantity: 1,
    image:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-edition-left-mobile-image-block-01-en-24jun24?$1600px--t$",
  },
  {
    id: 2,
    title: "امازون ايكو دوت جيل الرابع",
    price: "75,000 د.ع",
    quantity: 2,
    image:
      "https://imgs.search.brave.com/DrWVLiwpG3-si2kMlVEFKQkYJU3xo2ao1b4iy2gzV5Y/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFtdTNVeWtHUUwu/anBn",
  },
  {
    id: 2,
    title: "سماعات سوني ام 5",
    price: "300,000 د.ع",
    quantity: 1,
    image:
      "https://imgs.search.brave.com/Lf6H3PQeV7pgKNyV1e-JJwaXmH8LNzp4qooD5CwV3Fs/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFhWHZqemN1a0wu/anBn",
  },
];

export const locations = [
  {
    id: 1,
    location: "كرادة",
    phoneNumber: "07701234567",
    phoneNumber2: "07701234567",
    province: "بغداد",
    city: "بغداد",
    country: "العراق",
  },
  {
    id: 2,
    location: "كرادة",
    phoneNumber: "07701234567",
    phoneNumber2: "07701234567",
    province: "بغداد",
    city: "بغداد",
    country: "العراق",
  },
  {
    id: 3,
    location: "كرادة",
    phoneNumber: "07701234567",
    phoneNumber2: "07701234567",
    province: "بغداد",
    city: "بغداد",
    country: "العراق",
  },
];

export const auctionSectionData = [
  {
    id: 1,
    title: "بلي ستيشن 5 اوربي ريجن 2",
    description: "وصف عن المنتج",
    image:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-edition-left-mobile-image-block-01-en-24jun24?$1600px--t$",
    startingPrice: 25000,
    currentPrice: 325000,
    endTime: "2025-12-28T12:00:00",
  },
  {
    id: 2,
    title: "سماعات سوني ام 5",
    description: "وصف عن المنتج",
    image:
      "https://imgs.search.brave.com/Lf6H3PQeV7pgKNyV1e-JJwaXmH8LNzp4qooD5CwV3Fs/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFhWHZqemN1a0wu/anBn",
    startingPrice: 25000,
    currentPrice: 80000,
    endTime: "2025-12-28T12:00:00",
  },
  {
    id: 3,
    title: "امازون ايكو دوت الجيل الرابع",
    description: "وصف عن المنتج",
    image:
      "https://imgs.search.brave.com/DrWVLiwpG3-si2kMlVEFKQkYJU3xo2ao1b4iy2gzV5Y/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFtdTNVeWtHUUwu/anBn",
    startingPrice: 25000,
    currentPrice: 100000,
    endTime: "2025-12-28T12:00:00",
  },
];

export const auctionPageData = [
  {
    id: 1,
    title: "بلي ستيشن 5 اوربي ريجن 2",
    description: "وصف عن المنتج",
    image:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-edition-left-mobile-image-block-01-en-24jun24?$1600px--t$",
    startingPrice: 25000,
    currentPrice: 325000,
    endTime: "2025-12-28T12:00:00",
  },
  {
    id: 6,
    title: "امازون ايكو دوت الجيل الرابع",
    description: "وصف عن المنتج",
    image:
      "https://imgs.search.brave.com/DrWVLiwpG3-si2kMlVEFKQkYJU3xo2ao1b4iy2gzV5Y/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFtdTNVeWtHUUwu/anBn",
    startingPrice: 25000,
    currentPrice: 100000,
    endTime: "2025-12-28T12:00:00",
  },
  {
    id: 2,
    title: "سماعات سوني ام 5",
    description: "وصف عن المنتج",
    image:
      "https://imgs.search.brave.com/Lf6H3PQeV7pgKNyV1e-JJwaXmH8LNzp4qooD5CwV3Fs/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFhWHZqemN1a0wu/anBn",
    startingPrice: 25000,
    currentPrice: 80000,
    endTime: "2025-12-28T12:00:00",
  },
  {
    id: 4,
    title: "بلي ستيشن 5 اوربي ريجن 2",
    description: "وصف عن المنتج",
    image:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-edition-left-mobile-image-block-01-en-24jun24?$1600px--t$",
    startingPrice: 25000,
    currentPrice: 325000,
    endTime: "2025-12-28T12:00:00",
  },
  {
    id: 3,
    title: "امازون ايكو دوت الجيل الرابع",
    description: "وصف عن المنتج",
    image:
      "https://imgs.search.brave.com/DrWVLiwpG3-si2kMlVEFKQkYJU3xo2ao1b4iy2gzV5Y/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFtdTNVeWtHUUwu/anBn",
    startingPrice: 25000,
    currentPrice: 100000,
    endTime: "2025-12-28T12:00:00",
  },
  {
    id: 5,
    title: "سماعات سوني ام 5",
    description: "وصف عن المنتج",
    image:
      "https://imgs.search.brave.com/Lf6H3PQeV7pgKNyV1e-JJwaXmH8LNzp4qooD5CwV3Fs/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFhWHZqemN1a0wu/anBn",
    startingPrice: 25000,
    currentPrice: 80000,
    endTime: "2025-12-28T12:00:00",
  },
];
