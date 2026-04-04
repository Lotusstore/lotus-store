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
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={logoUrl}
              alt="Lotus Store"
              className="h-10 w-10 rounded-2xl object-cover ring-1 ring-white/10"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="hidden sm:block">
              <p className="text-lg font-black tracking-tight text-white">
                Lotus Store
              </p>
              <p className="text-xs text-zinc-400">Game & App Shop • ตอบไวผ่านเพจ</p>
            </div>
          </div>

          <div className="relative ml-auto hidden max-w-2xl flex-1 md:block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาเกมหรือแอพที่ต้องการ..."
              className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/20 focus:bg-white/10"
            />
          </div>

          <a
            href={`${facebookPage}?text=${encodeURIComponent(
              "สวัสดีครับ สนใจดูรายละเอียดสินค้าในร้าน Lotus Store"
            )}`}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:scale-[1.02] hover:bg-red-700 md:inline-flex"
          >
            ติดต่อเพจ
          </a>

          <button
            onClick={() => setShowCart(true)}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-black shadow-lg shadow-black/40 transition hover:scale-[1.03] hover:bg-zinc-200"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white ring-1 ring-white/10">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="pb-32 pt-16">
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.18),transparent_28%),linear-gradient(135deg,#0b0b0b_0%,#050505_45%,#111111_100%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Premium mobile game & app storefront
              </div>

              <h1 className="max-w-3xl leading-[0.95] tracking-tight">
                <span className="block text-4xl font-black text-white sm:text-5xl lg:text-7xl">
                  ซื้อเกมและแอพราคาคุ้ม
                </span>
                <span className="mt-3 block text-xl font-medium text-zinc-400 sm:text-2xl lg:text-3xl">
                  ดูง่าย กดสั่งซื้อได้ทันที
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                รวมเกมและแอพยอดนิยมสำหรับ iOS และ Android เลือกง่าย
                สั่งไว และคุยกับเพจได้ทันทีในหน้าต่างแชท
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="rounded-full bg-red-600 px-6 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-red-700"
                >
                  เริ่มเลือกสินค้า
                </a>
                <a
                  href={`${facebookPage}?text=${encodeURIComponent(
                    "สวัสดีครับ สนใจดูรายละเอียดสินค้าในร้าน Lotus Store"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  ทักแชทเลย
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { icon: ShieldCheck, title: "การันตี", desc: "ใช้งานได้" },
                  { icon: MessageCircle, title: "ตอบไว", desc: "คุยง่าย" },
                  { icon: Headphones, title: "ซัพพอร์ต", desc: "ก่อน-หลังขาย" },
                  { icon: BadgePercent, title: "ดีลคุ้ม", desc: "ลดแรงหลายเกม" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
                  >
                    <item.icon className="mb-3 h-5 w-5 text-white" />
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[32px] border border-white/10 bg-[#111111] p-5 text-white shadow-2xl shadow-black/40">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-white">Flash Deal</p>
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    ลดสูงสุด{" "}
                    {Math.max(...products.map((p) => discountPercent(p.price, p.oldPrice)))}%
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={popularProducts[0]?.image ?? "https://placehold.co/400x400"}
                    alt={popularProducts[0]?.name ?? "สินค้าแนะนำ"}
                    className="h-24 w-24 rounded-2xl bg-[#191919] object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-lg font-black">
                      {popularProducts[0]?.name ?? "สินค้าแนะนำ"}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {popularProducts[0]?.description ??
                        "เลือกสินค้าที่คุ้มที่สุดวันนี้"}
                    </p>
                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-2xl font-black text-cyan-300">
                        {formatBaht(popularProducts[0]?.price ?? 0)}
                      </span>
                      <span className="text-sm text-zinc-500 line-through">
                        {formatBaht(popularProducts[0]?.oldPrice ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "รีวิวลูกค้า", value: "4.9/5" },
                  { label: "ออเดอร์รวม", value: "1,500+" },
                  { label: "สินค้า", value: `${products.length}+` },
                  { label: "พร้อมตอบ", value: "ทุกวัน" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[28px] border border-white/10 bg-[#0f0f0f] p-5 text-white shadow-xl shadow-black/30"
                  >
                    <p className="text-sm text-zinc-500">{item.label}</p>
                    <p className="mt-2 text-2xl font-black">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { title: "ร้านน่าเชื่อถือ", desc: "มีรีวิวและสินค้าขายดี", icon: Store },
              { title: "รองรับหลายแพลตฟอร์ม", desc: "iOS / Android", icon: Smartphone },
              { title: "สินค้าฮิตอัปเดต", desc: "เกมดังและแอพยอดนิยม", icon: Flame },
              { title: "ใช้งานง่าย", desc: "เลือกสะดวก สั่งซื้อรวดเร็ว", icon: LayoutGrid },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-white/10 bg-[#0d0d0d] p-5 shadow-lg shadow-black/30"
              >
                <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="products"
          className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-[32px] border border-white/10 bg-[#090909] p-5 shadow-2xl shadow-black/40 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Lotus Store Collection
                </p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                  เลือกสินค้าในร้าน
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {typeFilters.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      activeType === type
                        ? "bg-red-600 text-white"
                        : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {platformFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      activeFilter === filter
                        ? "bg-white text-black"
                        : "border border-white/10 bg-[#111111] text-zinc-300 hover:bg-[#171717]"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Filter className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-[#111111] pl-11 pr-10 text-sm font-semibold text-white outline-none transition hover:bg-[#171717] lg:w-[220px]"
                >
                  <option value="popular">เรียงตามความนิยม</option>
                  <option value="price-low">ราคาต่ำไปสูง</option>
                  <option value="price-high">ราคาสูงไปต่ำ</option>
                  <option value="discount">ส่วนลดมากสุด</option>
                  <option value="rating">คะแนนสูงสุด</option>
                </select>
              </div>
            </div>

           <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
  {filteredProducts.map((product) => (
    <article
      key={product.id}
      className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b from-[#111111] to-[#0a0a0a] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50"
    >
      <div className="relative overflow-hidden bg-[#0f0f0f] p-4">
        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/10 bg-black/80 px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur">
          {product.badge}
        </div>

        <div className="absolute right-4 top-4 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
          -{discountPercent(product.price, product.oldPrice)}%
        </div>

        <div className="flex h-56 items-center justify-center rounded-2xl bg-[#151515] p-3">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full w-full rounded-2xl object-contain transition duration-300 group-hover:scale-[1.03]"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x600/111111/ffffff?text=Image";
            }}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              {product.category}
            </p>

            <h3 className="mt-2 min-h-[72px] line-clamp-2 text-[1.65rem] font-black leading-tight text-white">
              {product.name}
            </h3>
          </div>

          {product.popular && (
            <span className="shrink-0 rounded-full border border-red-500/30 bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300">
              ขายดี
            </span>
          )}
        </div>

        <p className="mt-3 min-h-[48px] line-clamp-2 text-sm leading-6 text-zinc-400">
          {product.description}
        </p>

        <div className="mt-4 grid min-h-[52px] grid-cols-[auto_auto_1fr] items-center gap-3 text-sm text-zinc-400">
          <div className="flex items-center gap-1 whitespace-nowrap">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="font-bold text-yellow-300">{product.rating}</span>
          </div>

          <span className="whitespace-nowrap text-zinc-500">
            ขายแล้ว {product.sold}
          </span>

          <span className="truncate text-right text-zinc-400">
            {product.platform.join(" / ")}
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-[#101010] p-4">
          <div className="flex min-h-[44px] items-end gap-2">
            <p className="text-3xl font-black text-cyan-300">
              {formatBaht(product.price)}
            </p>
            <p className="pb-1 text-sm text-zinc-500 line-through">
              {formatBaht(product.oldPrice)}
            </p>
          </div>

          <p className="mt-2 min-h-[24px] text-sm font-medium text-emerald-400">
            ประหยัด {formatBaht(product.oldPrice - product.price)}
          </p>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedProduct(product)}
              className="flex-1 rounded-full border border-white/10 bg-[#151515] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1b1b1b]"
            >
              ดูสินค้า
            </button>

            <button
              onClick={() => addToCart(product)}
              className="flex-1 rounded-full bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
            >
              ใส่ตะกร้า
            </button>
          </div>
        </div>
      </div>
    </article>
  ))}
</div>

            {filteredProducts.length === 0 && (
              <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-[#111111] p-10 text-center">
                <p className="text-lg font-bold text-white">ไม่พบสินค้าที่ค้นหา</p>
                <p className="mt-2 text-sm text-zinc-400">
                  ลองเปลี่ยนคำค้นหา ประเภท หรือแพลตฟอร์ม
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-white/10 bg-[#0b0b0b] p-6 shadow-xl shadow-black/30">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Why Lotus Store
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">
                ทำไมลูกค้าถึงเลือกซื้อกับเรา
              </h2>
              <p className="mt-3 text-zinc-400">
                เน้นความเรียบง่าย เลือกง่าย คุยง่าย และมีข้อมูลชัดเจน
                เพื่อให้ลูกค้าตัดสินใจได้ไวขึ้น
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "มั่นใจได้มากขึ้น",
                  desc: "หน้าเว็บชัดเจน มีรีวิว มีรายละเอียด และมีปุ่มสั่งซื้อที่ตรงไปตรงมา",
                },
                {
                  icon: MessageCircle,
                  title: "คุยกับเพจได้ทันที",
                  desc: "ไม่ต้องงมหาช่องทางติดต่อ กดสั่งซื้อแล้วเด้งไปแชทพร้อมข้อความอัตโนมัติ",
                },
                {
                  icon: CheckCircle2,
                  title: "เลือกง่ายกว่าเดิม",
                  desc: "มีตัวกรอง แยกแพลตฟอร์ม และจัดเรียงสินค้าให้ดูสินค้าที่ใช่ได้เร็วขึ้น",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-[28px] border border-white/10 bg-[#111111] p-5"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-red-600/15 p-3 text-red-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[32px] border border-white/10 bg-[#0d0d0d] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Order flow
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">ขั้นตอนการสั่งซื้อ</h2>

              <div className="mt-6 space-y-4">
                {[
                  "เลือกเกมหรือแอพที่ต้องการจากหน้าเว็บ",
                  "กดดูสินค้า หรือใส่ตะกร้าเพื่อรวมหลายรายการ",
                  "กดสั่งซื้อผ่านเพจ ระบบจะเปิดแชทพร้อมข้อความอัตโนมัติ",
                  "คุยรายละเอียดเพิ่มเติม แล้วปิดการสั่งซื้อได้ทันที",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 font-black text-white">
                      {index + 1}
                    </div>
                    <div className="pt-1 text-zinc-300">{step}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-[#0d0d0d] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Quick trust
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">
                จุดที่ช่วยให้ลูกค้าตัดสินใจไวขึ้น
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "มีรีวิวลูกค้า",
                  "ปุ่มสั่งซื้อชัดเจน",
                  "ราคาและส่วนลดเด่น",
                  "รองรับหลายแพลตฟอร์ม",
                  "มีสินค้าหลากหลาย",
                  "ทักเพจได้ทันที",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111111] p-4 text-zinc-300"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={`${facebookPage}?text=${encodeURIComponent(
                  "สวัสดีครับ สนใจสั่งซื้อสินค้าในร้าน Lotus Store"
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
              >
                เริ่มคุยกับเพจตอนนี้
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              "บริการดี ตอบไว แนะนำสินค้าเข้าใจง่าย สั่งซื้อสะดวกมาก",
              "ราคาดี ดูน่าเชื่อถือ และหน้าเว็บใช้งานง่ายกว่าที่คิด",
              "หน้าเว็บดูเหมือนร้านจริงมากขึ้น ลูกค้าน่าจะมั่นใจขึ้นเยอะ",
            ].map((text, index) => (
              <div
                key={index}
                className="rounded-[30px] border border-white/10 bg-[#0d0d0d] p-6 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-1 text-white">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <h3 className="text-lg font-black text-white">รีวิวลูกค้า</h3>
                <p className="mt-3 text-zinc-400">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#050505]">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logoUrl}
                  alt="Lotus Store"
                  className="h-10 w-10 rounded-2xl object-cover ring-1 ring-white/10"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div>
                  <p className="text-lg font-black text-white">Lotus Store</p>
                  <p className="text-sm text-zinc-500">Game & App Shop</p>
                </div>
              </div>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
                ร้านขายเกมและแอพโทนพรีเมียมที่เน้นความชัดเจนในการเลือกสินค้า
                และช่วยให้ลูกค้าทักแชทสั่งซื้อได้ง่ายขึ้นจากทุกจุดของหน้าเว็บ
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  ช่องทางสั่งซื้อ
                </p>
                <a
                  href={`${facebookPage}?text=${encodeURIComponent(
                    "สวัสดีครับ สนใจสั่งซื้อสินค้าในร้าน Lotus Store"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex rounded-full bg-red-600 px-4 py-2 font-bold text-white transition hover:bg-red-700"
                >
                  ทักเพจ Lotus Store
                </a>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  รองรับ
                </p>
                <p className="mt-3 text-zinc-300">iOS / Android / แอพ / เกม</p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[32px] border border-white/10 bg-[#0d0d0d] shadow-2xl shadow-black/60">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 p-5 md:grid-cols-2 md:p-8">
              <div className="rounded-[28px] bg-[#141414] p-5">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-[320px] w-full rounded-[24px] bg-[#1a1a1a] object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/600x600/111111/ffffff?text=Image";
                  }}
                />
              </div>

              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white">
                    {selectedProduct.badge}
                  </span>
                  {selectedProduct.popular && (
                    <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                      แนะนำ
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-black leading-tight text-white">
                  {selectedProduct.name}
                </h2>

                <p className="mt-3 text-zinc-400">{selectedProduct.description}</p>

                <div className="mt-5 flex items-center gap-2 text-sm text-zinc-300">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="font-bold text-white">{selectedProduct.rating}</span>
                  <span className="text-zinc-500">• ขายแล้ว {selectedProduct.sold} ครั้ง</span>
                </div>

                <div className="mt-6 rounded-[24px] border border-white/10 bg-[#111111] p-5">
                  <p className="text-sm text-zinc-500">ราคาพิเศษวันนี้</p>
                  <div className="mt-2 flex items-end gap-3">
                    <span className="text-4xl font-black text-cyan-300">
                      {formatBaht(selectedProduct.price)}
                    </span>
                    <span className="text-lg text-zinc-500 line-through">
                      {formatBaht(selectedProduct.oldPrice)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-emerald-400">
                    ประหยัด{" "}
                    {formatBaht(selectedProduct.oldPrice - selectedProduct.price)} • ลด{" "}
                    {discountPercent(selectedProduct.price, selectedProduct.oldPrice)}%
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="rounded-full bg-red-600 px-5 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-red-700"
                  >
                    ใส่ตะกร้า
                  </button>
                  <a
                    href={`${facebookPage}?text=${selectedCheckoutMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-bold text-white transition hover:scale-[1.02] hover:bg-white/10"
                  >
                    สั่งซื้อผ่านเพจ
                  </a>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                    <p className="text-sm text-zinc-500">แพลตฟอร์ม</p>
                    <p className="mt-1 font-bold text-white">
                      {selectedProduct.platform.join(" / ")}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                    <p className="text-sm text-zinc-500">สถานะ</p>
                    <p className="mt-1 font-bold text-white">พร้อมขาย</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed right-0 top-0 z-[80] h-full w-full max-w-md transform border-l border-white/10 bg-[#090909] shadow-2xl shadow-black/60 transition duration-300 ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div>
            <h3 className="text-lg font-black text-white">ตะกร้าสินค้า</h3>
            <p className="text-xs text-zinc-500">{cartCount} รายการ</p>
          </div>
          <button
            onClick={() => setShowCart(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex h-[calc(100%-64px)] flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-[#111111] p-8 text-center">
                <ShoppingCart className="mx-auto h-10 w-10 text-zinc-600" />
                <p className="mt-4 text-lg font-bold text-white">
                  ยังไม่มีสินค้าในตะกร้า
                </p>
                <p className="mt-2 text-sm text-zinc-400">
                  เลือกสินค้าแล้วกดใส่ตะกร้าได้เลย
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="rounded-3xl border border-white/10 bg-[#111111] p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-2xl bg-[#1a1a1a] object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/300x300/111111/ffffff?text=Image";
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="line-clamp-2 font-black text-white">
                        {item.product.name}
                      </h4>
                      <p className="mt-1 text-sm text-zinc-400">
                        {formatBaht(item.product.price)} / ชิ้น
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#181818] px-2 py-1">
                          <button
                            onClick={() => updateQty(item.product.id, -1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-bold text-white">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, 1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
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

          <div className="border-t border-white/10 bg-[#090909] p-5">
            <div className="space-y-3 rounded-3xl border border-white/10 bg-[#111111] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">ยอดสินค้า</span>
                <span className="font-bold text-white">{formatBaht(cartSubtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">ส่วนลดรวม</span>
                <span className="font-bold text-zinc-200">
                  {formatBaht(cartSavings)}
                </span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-white">ยอดรวม</span>
                <span className="text-2xl font-black text-white">
                  {formatBaht(cartSubtotal)}
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              <a
                href={`${facebookPage}?text=${checkoutMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-4 font-bold text-white transition hover:scale-[1.01] hover:bg-red-700"
              >
                <Facebook className="h-4 w-4" />
                สั่งซื้อผ่านเพจ
              </a>

              <button
                onClick={() => setShowCart(false)}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-4 font-bold text-white transition hover:bg-white/10"
              >
                เลือกสินค้าต่อ
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCart && (
        <button
          aria-label="close overlay"
          onClick={() => setShowCart(false)}
          className="fixed inset-0 z-[75] bg-black/55 backdrop-blur-[1px]"
        />
      )}
    </div>
  );
}