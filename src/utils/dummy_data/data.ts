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

export const productsData = [
  // Smartphones
  {
    id: "phone-1",
    name: "آيفون 15 برو ماكس",
    price: 1800000,
    category: "هواتف",
    image: "https://m.media-amazon.com/images/I/41K6b4oqxyL._AC_SX522_.jpg"
  },
  {
    id: "phone-2",
    name: "سامسونج جالاكسي S24 الترا",
    price: 1500000,
    category: "هواتف",
    image: "https://m.media-amazon.com/images/I/51EldjH4K8L._AC_SX522_.jpg"
  },
  {
    id: "phone-3",
    name: "جوجل بكسل 8 برو",
    price: 1200000,
    category: "هواتف",
    image: "https://m.media-amazon.com/images/I/71h9zq4viSL._AC_SX679_.jpg"
  },
  {
    id: "phone-4",
    name: "شاومي 14 برو",
    price: 900000,
    category: "هواتف",
    image: "https://m.media-amazon.com/images/I/617yVE1WoQL._AC_SX569_.jpg"
  },
  {
    id: "phone-5",
    name: "ون بلس 12",
    price: 850000,
    category: "هواتف",
    image: "https://m.media-amazon.com/images/I/71xMs88FYbL._AC_SX679_.jpg"
  },

  // Watches
  {
    id: "watch-1",
    name: "ابل واتش سيريس 9",
    price: 650000,
    category: "ساعات",
    image: "https://m.media-amazon.com/images/I/61-VgGHcz1L.__AC_SY445_SX342_QL70_FMwebp_.jpg"
  },
  {
    id: "watch-2",
    name: "سامسونج جالاكسي واتش 6",
    price: 450000,
    category: "ساعات",
    image: "https://m.media-amazon.com/images/I/71ba0zsZtnL._AC_SX679_.jpg"
  },
  {
    id: "watch-3",
    name: "جارمن فينكس 7",
    price: 800000,
    category: "ساعات",
    image: "https://m.media-amazon.com/images/I/61M40lfqX9L.__AC_SX300_SY300_QL70_FMwebp_.jpg"
  },
  {
    id: "watch-4",
    name: "فيت بيت سينس",
    price: 250000,
    category: "ساعات",
    image: "https://m.media-amazon.com/images/I/81KpKPb0pzL._AC_SX679_.jpg"
  },
  {
    id: "watch-5",
    name: "هواوي واتش GT4",
    price: 350000,
    category: "ساعات",
    image: "https://m.media-amazon.com/images/I/71u9PXWPzFL._AC_SX466_.jpg"
  },

  // Chargers
  {
    id: "charger-1",
    name: "شاحن ابل ماجسيف",
    price: 75000,
    category: "شواحن",
    image: "https://m.media-amazon.com/images/I/51ZTUXXpT1L._AC_SX466_.jpg"
  },
  {
    id: "charger-2",
    name: "شاحن سامسونج السريع 45W",
    price: 65000,
    category: "شواحن",
    image: "https://m.media-amazon.com/images/I/51iH8MHrCkL._AC_SX679_.jpg"
  },
  {
    id: "charger-3",
    name: "انكر نانو II 65W",
    price: 85000,
    category: "شواحن",
    image: "https://m.media-amazon.com/images/I/61PRvw0FyDL._AC_SX425_.jpg"
  },
  {
    id: "charger-4",
    name: "بيلكن شاحن لاسلكي 15W",
    price: 55000,
    category: "شواحن",
    image: "https://m.media-amazon.com/images/I/61XBmb46FVL._AC_SX522_.jpg"
  },
  {
    id: "charger-5",
    name: "شاحن شاومي 120W",
    price: 95000,
    category: "شواحن",
    image: "https://m.media-amazon.com/images/I/51tYeIpyDIL._AC_SX466_.jpg"
  },

  // Headphones
  {
    id: "headphone-1",
    name: "ايربودز برو 2",
    price: 450000,
    category: "سماعات الرأس",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361"
  },
  {
    id: "headphone-2",
    name: "سوني WH-1000XM5",
    price: 550000,
    category: "سماعات الرأس",
    image: "https://m.media-amazon.com/images/I/51aXvjzcukL._AC_SX466_.jpg"
  },
  {
    id: "headphone-3",
    name: "بوز 700",
    price: 500000,
    category: "سماعات الرأس",
    image: "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/noise_cancelling_headphones_700/product_silo_images/noise_cancelling_headphones_700_blk_EC_hero.psd/jcr:content/renditions/cq5dam.web.1000.1000.png"
  },
  {
    id: "headphone-4",
    name: "سينهايزر موميتنم 4",
    price: 480000,
    category: "سماعات الرأس",
    image: "https://m.media-amazon.com/images/I/71zsm84mJsL._AC_SX466_.jpg"
  },
  {
    id: "headphone-5",
    name: "جابرا إيليت 85t",
    price: 350000,
    category: "سماعات الرأس",
    image: "https://m.media-amazon.com/images/I/81sOW3KB1NL._AC_SX466_.jpg"
  },

  // Monitors
  {
    id: "monitor-1",
    name: "سامسونج اوديسي G7",
    price: 1200000,
    category: "شاشات",
    image: "https://m.media-amazon.com/images/I/81zfTnM1LJL._AC_SX679_.jpg"
  },
  {
    id: "monitor-2",
    name: "ال جي الترا جير",
    price: 1500000,
    category: "شاشات",
    image: "https://m.media-amazon.com/images/I/91VnxRlSVgL._AC_SX466_.jpg"
  },
  {
    id: "monitor-3",
    name: "ديل اليينوير 34",
    price: 1300000,
    category: "شاشات",
    image: "https://m.media-amazon.com/images/I/71ufV5NQ44L._AC_SX466_.jpg"
  },
  {
    id: "monitor-4",
    name: "ايسر بريداتور X28",
    price: 900000,
    category: "شاشات",
    image: "https://m.media-amazon.com/images/I/81VM6LxyOaL._AC_SX569_.jpg"
  },
  {
    id: "monitor-5",
    name: "بينكيو موبيوز EX2780Q",
    price: 850000,
    category: "شاشات",
    image: "https://m.media-amazon.com/images/I/71yaqgjp11L._AC_SX466_.jpg"
  },

  // Gaming
  {
    id: "gaming-1",
    name: "بلايستيشن 5",
    price: 850000,
    category: "اجهزة العاب",
    image: "https://m.media-amazon.com/images/I/31JaiPXYI8L._SX425_.jpg"
  },
  {
    id: "gaming-2",
    name: "اكس بوكس سيريس X",
    price: 800000,
    category: "اجهزة العاب",
    image: "https://m.media-amazon.com/images/I/51bcwM0qLaL._SX522_.jpg"
  },
  {
    id: "gaming-3",
    name: "نينتندو سويتش OLED",
    price: 450000,
    category: "اجهزة العاب",
    image: "https://m.media-amazon.com/images/I/61qENJUYWJL._SX522_.jpg"
  },
  {
    id: "gaming-4",
    name: "رازر كيشي الترا",
    price: 350000,
    category: "اجهزة العاب",
    image: "https://m.media-amazon.com/images/I/71vamojjeKL._SX522_.jpg"
  },
  {
    id: "gaming-5",
    name: "ستيم ديك",
    price: 750000,
    category: "اجهزة العاب",
    image: "https://m.media-amazon.com/images/I/61zWyTEc20L._SX522_.jpg"
  },

  // Bluetooth Speakers
  {
    id: "speaker-1",
    name: "جي بي ال تشارج 5",
    price: 250000,
    category: "سماعات بلوتوث",
    image: "https://m.media-amazon.com/images/I/61v6ZwLc6rL._AC_SX466_.jpg"
  },
  {
    id: "speaker-2",
    name: "سوني SRS-XB43",
    price: 300000,
    category: "سماعات بلوتوث",
    image: "https://m.media-amazon.com/images/I/61wLLPUu+4L._AC_SX466_.jpg"
  },
  {
    id: "speaker-3",
    name: "بوز ساوند لينك فليكس",
    price: 280000,
    category: "سماعات بلوتوث",
    image: "https://m.media-amazon.com/images/I/7192Qca-fUL._AC_SX466_.jpg"
  },
  {
    id: "speaker-4",
    name: "انكر ساوند كور",
    price: 150000,
    category: "سماعات بلوتوث",
    image: "https://m.media-amazon.com/images/I/51l80KVua0L._AC_SX466_.jpg"
  },
  {
    id: "speaker-5",
    name: "مارشال ستانمور III",
    price: 450000,
    category: "سماعات بلوتوث",
    image: "https://m.media-amazon.com/images/I/61fD3NJRtYL._AC_SX466_.jpg"
  },

  // Cables
  {
    id: "cable-1",
    name: "كيبل ابل USB-C",
    price: 35000,
    category: "كيبلات",
    image: "https://m.media-amazon.com/images/I/51OOuFYEvSL._SX522_.jpg"
  },
  {
    id: "cable-2",
    name: "انكر نايلون USB-C",
    price: 25000,
    category: "كيبلات",
    image: "https://m.media-amazon.com/images/I/81NNdgl36mL._SX425_.jpg"
  },
  {
    id: "cable-3",
    name: "بيلكن ثندربولت 4",
    price: 45000,
    category: "كيبلات",
    image: "https://m.media-amazon.com/images/I/51vkZxD5-QL._SX522_.jpg"
  },
  {
    id: "cable-4",
    name: "سامسونج كيبل سريع",
    price: 20000,
    category: "كيبلات",
    image: "https://m.media-amazon.com/images/I/71DBmLMejHL._AC_SX679_.jpg"
  },
  {
    id: "cable-5",
    name: "باسيوس USB-C 100W",
    price: 30000,
    category: "كيبلات",
    image: "https://m.media-amazon.com/images/I/616VkuL2B0L._SX425_.jpg"
  },

  // Mouse
  {
    id: "mouse-1",
    name: "لوجيتك G Pro X",
    price: 180000,
    category: "ماوسات",
    image: "https://m.media-amazon.com/images/I/51uy8gOG-iL._AC_SY450_.jpg"
  },
  {
    id: "mouse-2",
    name: "ريزر فايبر الترا",
    price: 200000,
    category: "ماوسات",
    image: "https://m.media-amazon.com/images/I/619xpFKAXPL._AC_SX466_.jpg"
  },
  {
    id: "mouse-3",
    name: "ماوس ابل ماجيك",
    price: 150000,
    category: "ماوسات",
    image: "https://m.media-amazon.com/images/I/21eyev4xHxL._AC_SY450_.jpg"
  },
  {
    id: "mouse-4",
    name: "ماوس مايكروسوفت برو",
    price: 120000,
    category: "ماوسات",
    image: "https://m.media-amazon.com/images/I/51DzzJGjG5L._AC_SX679_.jpg"
  },
  {
    id: "mouse-5",
    name: "جلوريوس Model O",
    price: 90000,
    category: "ماوسات",
    image: "https://m.media-amazon.com/images/I/71iH3LE9MYL._AC_SX522_.jpg"
  }
];

export const carouselCardData = [
  { id: 1, label: "هواتف", Icon: Smartphone, link: "/" },
  { id: 2, label: "ساعات", Icon: Watch, link: "#" },
  { id: 3, label: "شواحن", Icon: Plug, link: "#" },
  { id: 4, label: "سماعات الرأس", Icon: Headphones, link: "#" },
  { id: 5, label: "شاشات", Icon: Monitor, link: "#" },
  { id: 6, label: "اجهزة العاب", Icon: Gamepad, link: "#" },
  { id: 7, label: "سماعات بلوتوث", Icon: Bluetooth, link: "#" },
  { id: 8, label: "كيبلات", Icon: Cable, link: "#" },
  { id: 9, label: "ماوسات", Icon: Mouse, link: "#" },
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
    endTime: "2025-12-01T12:00:00",
  },
  {
    id: 2,
    title: "سماعات سوني ام 5",
    description: "وصف عن المنتج",
    image:
      "https://imgs.search.brave.com/Lf6H3PQeV7pgKNyV1e-JJwaXmH8LNzp4qooD5CwV3Fs/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFhWHZqemN1a0wu/anBn",
    startingPrice: 25000,
    currentPrice: 80000,
    endTime: "2025-08-24T12:00:00",
  },
  {
    id: 3,
    title: "امازون ايكو دوت الجيل الرابع",
    description: "وصف عن المنتج",
    image:
      "https://imgs.search.brave.com/DrWVLiwpG3-si2kMlVEFKQkYJU3xo2ao1b4iy2gzV5Y/rs:fit:360:283:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFtdTNVeWtHUUwu/anBn",
    startingPrice: 25000,
    currentPrice: 100000,
    endTime: "2025-11-11T12:00:00",
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
