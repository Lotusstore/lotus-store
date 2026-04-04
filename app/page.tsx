"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Facebook,
  ShoppingCart,
  ShieldCheck,
  Smartphone,
  Flame,
  LayoutGrid,
  Star,
  Plus,
  Minus,
  Trash2,
  Filter,
  Sparkles,
  BadgePercent,
  Store,
  Headphones,
  Truck,
  X,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const facebookPage = "https://m.me/LotusstoreTH";
const logoUrl = "/logo.png";

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  platform: string[];
  category: string;
  type: "เกม" | "แอพ";
  badge: string;
  image: string;
  popular: boolean;
  description: string;
  rating: number;
  sold: number;
};

type CartItem = {
  product: Product;
  qty: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Red Dead Redemption",
    price: 99,
    oldPrice: 1270,
    platform: ["iOS", "Android"],
    category: "แอ็กชั่น",
    type: "เกม",
    badge: "iOS / Android",
    image: "https://i.postimg.cc/76KkFZC3/red-dead1.png",
    popular: true,
    description: "เกมแอ็กชันโลกเปิด เล่นสนุก ภาพสวย",
    rating: 4.9,
    sold: 182,
  },
  {
    id: 2,
    name: "Hitman: Absolution",
    price: 69,
    oldPrice: 419,
    platform: ["iOS", "Android"],
    category: "การลอบสังหาร",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/sZ2vcnPx2dGILYDxX4e6VIFZq1lWdBvekVFSGphJa2Lnreo7ghXsaP11nIKq77Rl775JN6zgf7v9whOmKwpWMoY",
    popular: false,
    description: "เกมลอบเร้น วางแผนภารกิจสุดมัน",
    rating: 4.7,
    sold: 94,
  },
  {
    id: 3,
    name: "GRID Legends",
    price: 79,
    oldPrice: 419,
    platform: ["iOS"],
    category: "แข่งรถ",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://www.latestmodapks.com/wp-content/uploads/2025/01/GRID-Legends-logo-media.png",
    popular: true,
    description: "เกมแข่งรถภาพสวย เล่นลื่น มันส์มาก",
    rating: 4.8,
    sold: 133,
  },
  {
    id: 4,
    name: "GRID Autosport",
    price: 69,
    oldPrice: 419,
    platform: ["iOS", "Android"],
    category: "แข่งรถ",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/stwUFdYIiKFCOU1uOCPQK5mRxr2fnZraDbM0ra32_-QxhudPDBGaehpzz_o9xLQl7A_v",
    popular: false,
    description: "สายแข่งรถต้องมี เล่นฟรีลื่น ภาพดี",
    rating: 4.6,
    sold: 71,
  },
  {
    id: 5,
    name: "Rome: Total War",
    price: 69,
    oldPrice: 279,
    platform: ["iOS"],
    category: "ยุทธศาสตร์",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://m.media-amazon.com/images/M/MV5BY2M2YTRiOWQtMmRkYy00YWQyLWJhZDctMjYxZmZlMGI1ZTZjXkEyXkFqcGc@._V1_.jpg",
    popular: false,
    description: "วางแผนการรบ บริหารกองทัพแบบจัดเต็ม",
    rating: 4.7,
    sold: 58,
  },
  {
    id: 6,
    name: "Medieval II: Total War",
    price: 69,
    oldPrice: 419,
    platform: ["iOS"],
    category: "ยุทธศาสตร์",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/NcwYpmoO_x5c_H3p70ccQLQXHrUsuT2ciRMj0tH93R45QfT2ZX2Pz7aIsjRKbBfzMG8=w240-h480-rw",
    popular: false,
    description: "สายวางแผนยุคกลาง เล่นเพลินมาก",
    rating: 4.8,
    sold: 62,
  },
  {
    id: 7,
    name: "Empire: Total War",
    price: 79,
    oldPrice: 549,
    platform: ["iOS"],
    category: "ยุทธศาสตร์",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/_jVd9_2tmJPxse-PDnoowF0PjDtG2kYHP494zd3BQmyCR36l6HNoiOt1pzUuB12hXw",
    popular: false,
    description: "สงครามระดับจักรวรรดิ เล่นลึกและคุ้ม",
    rating: 4.7,
    sold: 43,
  },
  {
    id: 8,
    name: "Tomb Raider",
    price: 79,
    oldPrice: 549,
    platform: ["iOS", "Android"],
    category: "แอ็กชั่น",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/7HgM2hUw-T74b4Hgwu8u9iShbH_VX_Sz-LudBGxZ0pmvQ6OOVVd4kWf4G1MUr_mSyonQBMyls-McHAyeGhlfSQ",
    popular: true,
    description: "ซีรีส์เกมแอ็กชันผจญภัยระดับตำนาน",
    rating: 4.8,
    sold: 120,
  },
  {
    id: 9,
    name: "Monoposto",
    price: 59,
    oldPrice: 129,
    platform: ["iOS"],
    category: "แข่งรถ",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/OXDfcG00jAGMeNSFn-lWvXhMSEVTBvEH_GCwMyvc6ePlZJ6D2Lv0BEcnt8Gyk9_uym38TMkws1OrTe2UeNAc5GU=w240-h480-rw",
    popular: true,
    description: "เกมแข่งรถแนว Formula สไตล์อินดี้ที่เน้นความสมจริง",
    rating: 4.8,
    sold: 96,
  },
  {
    id: 10,
    name: "Minecraft",
    price: 20,
    oldPrice: 79,
    platform: ["iOS", "Android"],
    category: "เกมจำลองการสร้างบล็อก",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/gfNz1N2GNi5piz24IB08RQ4ZGfUnN_kOH8Edhh7uCiotI2P7IBWBXdHzR8gC01ppNnU=w720-h405-rw",
    popular: true,
    description: "เอาชีวิตรอดได้ตามจินตนาการอย่างไร้ขีดจำกัด",
    rating: 5.0,
    sold: 500,
  },
  {
    id: 11,
    name: "Bully",
    price: 69,
    oldPrice: 249,
    platform: ["iOS", "Android"],
    category: "ผจญภัย",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://assets1.ignimgs.com/2016/12/08/bully-anniversary-edition---button-1481236555145.jpg?crop=1%3A1%2Csmart&format=jpg&auto=webp&quality=80",
    popular: false,
    description:
      "เป็นเกมที่เติมเต็มความฝันของคนที่อยากลองเกรียนในโรงเรียนโดยไม่ต้องโดนไล่ออกจริงๆ",
    rating: 4.9,
    sold: 207,
  },
  {
    id: 12,
    name: "Dealers Life 2",
    price: 59,
    oldPrice: 249,
    platform: ["iOS", "Android"],
    category: "จำลองสถานการณ์บริหารร้านรับจำนำ",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/aXVwHjGZWrGP5isAhQqCUXp_EeazWeQ_cr94rIDzLQ6owDeMjWuti44LO8UfJC3c5E0",
    popular: false,
    description:
      "จำลองสถานการณ์บริหารร้านรับจำนำ ผสมผสานอารมณ์ขันและการชิงไหวชิงพริบ",
    rating: 4.6,
    sold: 49,
  },
  {
    id: 13,
    name: "GTA San Andreas Definitive Edition",
    price: 79,
    oldPrice: 500,
    platform: ["iOS"],
    category: "แอ็กชัน-ผจญภัย",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://cdn1.epicgames.com/offer/3262906d93334603b399e106492b1217/EGS_GrandTheftAutoSanAndreasTheDefinitiveEdition_RockstarGames_S1_2560x1440-3daa3396c39d5310e071d9093689fdde",
    popular: false,
    description: "เกมเวอร์ชันรีมาสเตอร์ของเกมระดับตำนานอย่าง GTA San Andreas",
    rating: 4.8,
    sold: 84,
  },
  {
    id: 14,
    name: "Dealer's Life Legend",
    price: 59,
    oldPrice: 249,
    platform: ["iOS", "Android"],
    category: "จำลองสถานการณ์บริหารร้านรับจำนำ",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/aXVwHjGZWrGP5isAhQqCUXp_EeazWeQ_cr94rIDzLQ6owDeMjWuti44LO8UfJC3c5E0",
    popular: true,
    description:
      "จำลองสถานการณ์บริหารร้านรับจำนำ ผสมผสานอารมณ์ขันและการชิงไหวชิงพริบ",
    rating: 4.7,
    sold: 88,
  },
  {
    id: 15,
    name: "Subnautica",
    price: 69,
    oldPrice: 299,
    platform: ["iOS"],
    category: "ผจญภัย",
    type: "เกม",
    badge: "iOS",
    image: "https://i.postimg.cc/pX10d20x/IMG-4326.webp",
    popular: true,
    description:
      "เกมแนวผจญภัยเอาชีวิตรอด (Survival) แบบ Open World ใต้ทะเลลึก",
    rating: 4.8,
    sold: 86,
  },
  {
    id: 16,
    name: "Balatro",
    price: 69,
    oldPrice: 349,
    platform: ["iOS"],
    category: "การ์ด",
    type: "เกม",
    badge: "iOS",
    image:
      "https://store-images.s-microsoft.com/image/apps.51959.14272217582130616.02bf9982-d980-42d9-93e6-372b4b7e36d8.31c1e585-05c9-4f32-b695-4b900c913466",
    popular: false,
    description:
      "เกมแนว Roguelike Deck-builder ผสมโป๊กเกอร์ที่โด่งดังและได้รับรางวัลมากมายในปี 2024",
    rating: 4.9,
    sold: 73,
  },
  {
    id: 17,
    name: "Maneater",
    price: 69,
    oldPrice: 179,
    platform: ["iOS"],
    category: "แอ็กชั่น",
    type: "เกม",
    badge: "iOS",
    image:
      "https://cdn1.epicgames.com/offer/turtle/Maneater_EGS_Landscape_2560x1440-2560x1440-cf27e86a8daeeb2915a49a8b4c954dbd_2560x1440-73fc4959c67434d944d8b9cdabe3ffdf",
    popular: false,
    description:
      "เกมแนว Action RPG (ShaRkPG) แบบ Open World มุมมองบุคคลที่สาม ที่ผู้เล่นรับบทเป็นฉลามหัวค้อนตัวเล็กที่ต้องเอาชีวิตรอดในมหาสมุทร",
    rating: 4.7,
    sold: 39,
  },
  {
    id: 18,
    name: "Passpartout: Starving Artist",
    price: 69,
    oldPrice: 199,
    platform: ["iOS", "Android"],
    category: "จำลองสถานการณ์",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/AZbfYj6GeHsHj_MHctm-BWGTu69alv_nyepx2Nh0bgU2hf_nJ4_gWBQgNlBo65IoJg",
    popular: false,
    description:
      "เกมจำลองสถานการณ์แนวอินดี้ที่ให้ผู้เล่นรับบทเป็นจิตรกรชาวฝรั่งเศส พยายามวาดภาพขายเพื่อหาเงินเลี้ยงชีพ",
    rating: 4.6,
    sold: 28,
  },
  {
    id: 19,
    name: "Subnautica Below Zero",
    price: 69,
    oldPrice: 399,
    platform: ["iOS", "Android"],
    category: "แอ็กชั่น",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/yNRNX4CKTIGMZ23D3P0xwiEAhf-vCsZW9W9YZckeTflpnoU7MYAufdsfI15RDwcP1k96CNArzkPNdBey2kylwg",
    popular: true,
    description:
      "เกมแนวเอาชีวิตรอดและสำรวจโลกใต้น้ำภาคต่อจาก Subnautica พัฒนาโดย Unknown Worlds Entertainment",
    rating: 4.8,
    sold: 91,
  },
  {
    id: 20,
    name: "Way of the Hunter: Wild Europe",
    price: 69,
    oldPrice: 179,
    platform: ["iOS"],
    category: "เกมจำลองการล่าสัตว์",
    type: "เกม",
    badge: "iOS",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRkMXD7_FdGipCxDA-5Uty7WnqRQ2UrlMdiA&s",
    popular: false,
    description:
      "เกมจำลองการล่าสัตว์สุดสมจริงฉบับพกพาบนมือถือ ที่พัฒนาโดย Nine Rocks Games",
    rating: 4.5,
    sold: 25,
  },
  {
    id: 21,
    name: "Naruto: Ultimate Ninja Storm",
    price: 69,
    oldPrice: 479,
    platform: ["iOS", "Android"],
    category: "แอ็กชั่น",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://dl.memuplay.com/new_market/img/com.bandainamcoent.ultimateninjastorm.icon.2024-10-04-15-38-07.png",
    popular: false,
    description:
      "ซีรีส์เกมต่อสู้แอ็กชัน 3D ที่สร้างจากอนิเมะและมังงะชื่อดัง นารูโตะ นินจาจอมคาถา",
    rating: 4.8,
    sold: 67,
  },
  {
    id: 22,
    name: "Farming Simulator 23 Mobile",
    price: 49,
    oldPrice: 99,
    platform: ["iOS", "Android"],
    category: "จำลองสถานการณ์",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/ZqZ9mW1y-DW4kNHEC0WmzKbayuFhe_seQq-zUdqV4Dn-rmOKYQYljSYtMZCI0JWirw=w1024",
    popular: true,
    description:
      "เกมจำลองการทำฟาร์มที่สมจริงพัฒนาโดย GIANTS Software สำหรับมือถือ",
    rating: 4.7,
    sold: 110,
  },
  {
    id: 23,
    name: "Nomad Sculpt",
    price: 69,
    oldPrice: 699,
    platform: ["iOS"],
    category: "ปั้นโมเดล 3 มิติ",
    type: "แอพ",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/H--AktreIu_qdZiFI3GQhexMzPXZhnUevfbViDeNXKyc9MonV8bE1v_nP4y9XjNoxgY=w256",
    popular: true,
    description:
      "แอปพลิเคชันปั้นโมเดล 3 มิติคุณภาพสูงบนอุปกรณ์พกพา ใช้งานง่ายและเหมาะกับสายสร้างงาน",
    rating: 4.9,
    sold: 52,
  },
  {
    id: 24,
    name: "Procreate",
    price: 69,
    oldPrice: 399,
    platform: ["iOS"],
    category: "วาดภาพ",
    type: "แอพ",
    badge: "iOS Only",
    image:
      "https://yt3.googleusercontent.com/ytc/AIdro_nodCAR388ZAG2uYqxYZTuQ21H_tceLJIrfdGjWOq06g-U=s900-c-k-c0x00ffffff-no-rj",
    popular: true,
    description: "แอพวาดรูปยอดนิยม ฟีลมืออาชีพ ใช้งานลื่น",
    rating: 4.9,
    sold: 103,
  },
  {
    id: 25,
    name: "LumaFusion",
    price: 99,
    oldPrice: 999,
    platform: ["iOS"],
    category: "ตัดต่อวิดีโอ",
    type: "แอพ",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/hpxaOSJvrFC3yIbX-Bw83p_CdAsUj0N9Z66WoVLNYKMg9eQR0h_uREQpLMcChJs8KQ",
    popular: false,
    description: "แอพตัดต่อวิดีโอระดับโปรสำหรับ iPhone และ iPad",
    rating: 4.8,
    sold: 44,
  },
  {
    id: 26,
    name: "GoodNotes 6",
    price: 69,
    oldPrice: 839,
    platform: ["iOS"],
    category: "จดโน้ต",
    type: "แอพ",
    badge: "iOS Only",
    image:
      "https://www.iphonejd.com/wp-content/uploads/2023/08/6a010535fde333970c02b751ae6870200c.png",
    popular: true,
    description: "แอพจดโน้ตยอดนิยมสำหรับเรียนและทำงาน",
    rating: 4.9,
    sold: 77,
  },
];

const platformFilters = ["ทั้งหมด", "iOS", "Android", "iOS / Android"];
const typeFilters: Array<"เกม" | "แอพ"> = ["เกม", "แอพ"];

function formatBaht(value: number) {
  return `฿${value.toLocaleString("th-TH")}`;
}

function discountPercent(price: number, oldPrice: number) {
  if (oldPrice <= 0 || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default function LotusStorePage() {
  const [activeType, setActiveType] = useState<"เกม" | "แอพ">("เกม");
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const popularProducts = useMemo(() => {
    return products.filter((p) => p.popular && p.type === activeType).slice(0, 4);
  }, [activeType]);

  const filteredProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesType = product.type === activeType;

      const matchesPlatform =
        activeFilter === "ทั้งหมด"
          ? true
          : activeFilter === "iOS / Android"
            ? product.platform.includes("iOS") &&
              product.platform.includes("Android")
            : product.platform.includes(activeFilter);

      const matchesKeyword =
        keyword === ""
          ? true
          : product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword);

      return matchesType && matchesPlatform && matchesKeyword;
    });

    const sorted = [...result];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        sorted.sort(
          (a, b) =>
            discountPercent(b.price, b.oldPrice) -
            discountPercent(a.price, a.oldPrice)
        );
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.popular) - Number(a.popular) || b.sold - a.sold
        );
        break;
    }

    return sorted;
  }, [activeFilter, activeType, query, sortBy]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }, [cart]);

  const cartSavings = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + (item.product.oldPrice - item.product.price) * item.qty,
      0
    );
  }, [cart]);

  const checkoutMessage = useMemo(() => {
    if (cart.length === 0) {
      return encodeURIComponent("สวัสดีครับ สนใจสั่งซื้อสินค้าในร้าน Lotus Store");
    }

    const lines = cart.map((item, index) => {
      return `${index + 1}. ${item.product.name} x${item.qty} = ${formatBaht(
        item.product.price * item.qty
      )}`;
    });

    const message = `สวัสดีครับ สนใจสั่งซื้อสินค้าจาก Lotus Store

${lines.join("\n")}

ยอดรวม: ${formatBaht(cartSubtotal)}

ขอรายละเอียดเพิ่มเติมครับ 🙏`;

    return encodeURIComponent(message);
  }, [cart, cartSubtotal]);

  const selectedCheckoutMessage = useMemo(() => {
    if (!selectedProduct) {
      return encodeURIComponent("สวัสดีครับ สนใจสั่งซื้อสินค้าจาก Lotus Store");
    }

    const message = `สวัสดีครับ สนใจสั่งซื้อ ${selectedProduct.name} ราคา ${formatBaht(
      selectedProduct.price
    )} จาก Lotus Store

ขอรายละเอียดเพิ่มเติม + วิธีสั่งซื้อครับ 🙏`;

    return encodeURIComponent(message);
  }, [selectedProduct]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.product.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setShowCart(true);
  };

  const updateQty = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  return (
  <div className="min-h-screen bg-[#f6f6f6] text-zinc-900">
    {/* Top App Bar */}
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 pb-3 pt-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img
              src={logoUrl}
              alt="Lotus Store"
              className="h-10 w-10 rounded-2xl object-cover ring-1 ring-black/5"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="min-w-0">
              <p className="truncate text-base font-black text-zinc-900">
                Lotus Store
              </p>
              <p className="text-[11px] text-zinc-500">
                Game & App Shop
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="relative ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition active:scale-95"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div className="relative mt-3">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาเกมหรือแอพ..."
            className="h-12 w-full rounded-full border border-black/10 bg-[#f7f7f7] pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-red-300 focus:bg-white"
          />
        </div>
      </div>
    </header>

    <main className="pb-32">
      {/* Mini Hero / App-style */}
      <section className="bg-gradient-to-b from-red-500 to-red-400 text-white">
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8">
          <div className="rounded-[26px] bg-white/10 p-4 backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  Mobile Storefront
                </p>
                <h1 className="mt-1 text-2xl font-black leading-tight">
                  ซื้อเกมง่าย
                  <br />
                  กดแชทได้ทันที
                </h1>
                <p className="mt-2 text-sm text-white/90">
                  โฟกัสใช้งานบนมือถือ ปุ่มใหญ่ ไม่แน่น ไม่ล้น
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 px-3 py-2 text-right">
                <p className="text-[11px] text-white/75">พร้อมตอบ</p>
                <p className="text-lg font-black">ทุกวัน</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { label: "สินค้าทั้งหมด", value: `${products.length}+` },
                { label: "ขายดี", value: `${popularProducts.length}+` },
                { label: "รีวิว", value: "4.9/5" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/10 px-3 py-3"
                >
                  <p className="text-lg font-black">{item.value}</p>
                  <p className="text-[11px] text-white/80">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href="#products"
                className="flex-1 rounded-full bg-white px-4 py-3 text-center text-sm font-black text-red-500 transition active:scale-95"
              >
                เลือกสินค้า
              </a>
              <a
                href={`${facebookPage}?text=${encodeURIComponent(
                  "สวัสดีครับ สนใจดูรายละเอียดสินค้าในร้าน Lotus Store"
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-full border border-white/30 bg-white/10 px-4 py-3 text-center text-sm font-bold text-white transition active:scale-95"
              >
                ทักเพจ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Type tabs */}
      <section className="mx-auto mt-4 max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="no-scrollbar -mx-3 overflow-x-auto px-3">
          <div className="flex w-max gap-2">
            {typeFilters.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  activeType === type
                    ? "bg-red-500 text-white shadow-sm"
                    : "bg-white text-zinc-700 ring-1 ring-black/5"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Platform chips + sort */}
      <section className="mx-auto mt-3 max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="rounded-[24px] bg-white p-3 shadow-sm ring-1 ring-black/5">
          <div className="no-scrollbar overflow-x-auto">
            <div className="flex w-max gap-2">
              {platformFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${
                    activeFilter === filter
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-700"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 w-full appearance-none rounded-2xl border border-black/10 bg-[#fafafa] pl-11 pr-4 text-sm font-semibold text-zinc-900 outline-none"
              >
                <option value="popular">เรียงตามความนิยม</option>
                <option value="price-low">ราคาต่ำไปสูง</option>
                <option value="price-high">ราคาสูงไปต่ำ</option>
                <option value="discount">ส่วนลดมากสุด</option>
                <option value="rating">คะแนนสูงสุด</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Best sellers horizontal */}
      <section className="mx-auto mt-4 max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="rounded-[24px] bg-white p-3 shadow-sm ring-1 ring-black/5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-zinc-900">สินค้าขายดี</p>
              <p className="text-xs text-zinc-500">เลือกไว ปิดการขายง่าย</p>
            </div>
            <Flame className="h-5 w-5 text-red-500" />
          </div>

          <div className="no-scrollbar -mx-3 overflow-x-auto px-3">
            <div className="flex w-max gap-3">
              {popularProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="w-[220px] overflow-hidden rounded-[22px] bg-[#fafafa] text-left ring-1 ring-black/5 transition active:scale-[0.98]"
                >
                  <div className="relative h-32 bg-zinc-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/600x400/eeeeee/111111?text=Image";
                      }}
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">
                      ขายดี
                    </span>
                  </div>

                  <div className="p-3">
                    <p className="line-clamp-2 min-h-[40px] text-sm font-bold text-zinc-900">
                      {product.name}
                    </p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-lg font-black text-red-500">
                        {formatBaht(product.price)}
                      </span>
                      <span className="text-xs text-zinc-400 line-through">
                        {formatBaht(product.oldPrice)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="mx-auto mt-4 max-w-7xl px-3 pb-6 sm:px-6 lg:px-8"
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-black/5"
            >
              <div className="relative">
                <div className="aspect-[4/3] bg-zinc-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x450/eeeeee/111111?text=Image";
                    }}
                  />
                </div>

                <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-zinc-900">
                  {product.badge}
                </div>

                <div className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">
                  -{discountPercent(product.price, product.oldPrice)}%
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      {product.category}
                    </p>
                    <h3 className="mt-1 line-clamp-2 min-h-[44px] text-base font-black leading-tight text-zinc-900">
                      {product.name}
                    </h3>
                  </div>

                  {product.popular && (
                    <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-500">
                      ขายดี
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                    <span className="font-bold text-zinc-700">{product.rating}</span>
                  </span>
                  <span>ขายแล้ว {product.sold}</span>
                  <span className="truncate">{product.platform.join(" / ")}</span>
                </div>

                <div className="mt-3">
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-red-500">
                      {formatBaht(product.price)}
                    </span>
                    <span className="pb-0.5 text-xs text-zinc-400 line-through">
                      {formatBaht(product.oldPrice)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-emerald-600">
                    ประหยัด {formatBaht(product.oldPrice - product.price)}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="rounded-full bg-zinc-100 px-4 py-3 text-sm font-bold text-zinc-800 transition active:scale-95"
                  >
                    ดูสินค้า
                  </button>

                  <a
                    href={`${facebookPage}?text=${encodeURIComponent(
                      `สวัสดีครับ สนใจสั่งซื้อ ${product.name} ราคา ${formatBaht(
                        product.price
                      )} จาก Lotus Store\n\nขอรายละเอียดเพิ่มเติม + วิธีสั่งซื้อครับ 🙏`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-red-500 px-4 py-3 text-center text-sm font-black text-white transition active:scale-95"
                  >
                    ซื้อเลย
                  </a>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 w-full rounded-full border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-500 transition active:scale-95"
                >
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-4 rounded-[24px] bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
            <p className="text-base font-black text-zinc-900">ไม่พบสินค้าที่ค้นหา</p>
            <p className="mt-2 text-sm text-zinc-500">
              ลองเปลี่ยนคำค้นหา ประเภท หรือแพลตฟอร์ม
            </p>
          </div>
        )}
      </section>
    </main>

    {/* Product modal */}
    {selectedProduct && (
      <div className="fixed inset-0 z-[70] flex items-end bg-black/50 p-0 sm:items-center sm:justify-center sm:p-4">
        <div className="w-full rounded-t-[28px] bg-white sm:max-w-lg sm:rounded-[28px]">
          <div className="flex items-center justify-between border-b border-black/5 p-4">
            <p className="font-black text-zinc-900">รายละเอียดสินค้า</p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="overflow-hidden rounded-[22px] bg-zinc-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-56 w-full object-cover"
              />
            </div>

            <h3 className="mt-4 text-xl font-black text-zinc-900">
              {selectedProduct.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {selectedProduct.description}
            </p>

            <div className="mt-3 flex items-center gap-3 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-amber-400" />
                <span className="font-bold text-zinc-800">{selectedProduct.rating}</span>
              </span>
              <span>ขายแล้ว {selectedProduct.sold}</span>
            </div>

            <div className="mt-4 rounded-[22px] bg-red-50 p-4">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-red-500">
                  {formatBaht(selectedProduct.price)}
                </span>
                <span className="pb-1 text-sm text-zinc-400 line-through">
                  {formatBaht(selectedProduct.oldPrice)}
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold text-emerald-600">
                ลด {discountPercent(selectedProduct.price, selectedProduct.oldPrice)}%
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => addToCart(selectedProduct)}
                className="rounded-full bg-zinc-100 px-4 py-3 text-sm font-bold text-zinc-800"
              >
                ใส่ตะกร้า
              </button>

              <a
                href={`${facebookPage}?text=${selectedCheckoutMessage}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-red-500 px-4 py-3 text-center text-sm font-black text-white"
              >
                ซื้อเลย
              </a>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Cart drawer */}
    <div
      className={`fixed inset-y-0 right-0 z-[80] w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${
        showCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-black/5 p-4">
          <div>
            <p className="text-lg font-black text-zinc-900">ตะกร้าสินค้า</p>
            <p className="text-xs text-zinc-500">รวม {cartCount} รายการ</p>
          </div>
          <button
            onClick={() => setShowCart(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="rounded-[24px] bg-zinc-50 p-6 text-center">
              <p className="font-black text-zinc-900">ยังไม่มีสินค้าในตะกร้า</p>
              <p className="mt-2 text-sm text-zinc-500">
                เลือกสินค้าแล้วกลับมาปิดการขายได้เลย
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="rounded-[24px] bg-zinc-50 p-3 ring-1 ring-black/5"
              >
                <div className="flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-black text-zinc-900">
                      {item.product.name}
                    </p>
                    <p className="mt-1 text-sm font-bold text-red-500">
                      {formatBaht(item.product.price)}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 ring-1 ring-black/5">
                        <button
                          onClick={() => updateQty(item.product.id, -1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.product.id, 1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-black/5 bg-white p-4">
          <div className="rounded-[24px] bg-zinc-50 p-4">
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>ยอดรวมสินค้า</span>
              <span>{formatBaht(cartSubtotal)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-emerald-600">
              <span>ประหยัด</span>
              <span>{formatBaht(cartSavings)}</span>
            </div>
          </div>

          <a
            href={`${facebookPage}?text=${checkoutMessage}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-red-500 px-4 py-4 text-sm font-black text-white"
          >
            ซื้อเลยผ่าน Messenger
          </a>
        </div>
      </div>
    </div>

    {/* Bottom mobile CTA */}
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-7xl gap-2">
        <button
          onClick={() => setShowCart(true)}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-800"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>

        <a
          href={`${facebookPage}?text=${checkoutMessage}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 rounded-full bg-red-500 px-4 py-3 text-center text-sm font-black text-white"
        >
          ซื้อเลย / ทักเพจ
        </a>
      </div>
    </div>
  </div>
);
}