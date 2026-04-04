"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  Facebook,
  ShoppingCart,
  ShieldCheck,
  Smartphone,
  Flame,
  CheckCircle2,
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
} from "lucide-react";

const facebookPage =
  "https://www.facebook.com/share/1AjLqASu3J/?mibextid=wwXIfr";
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

const products = [
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
    description:
      "เกมเวอร์ชันรีมาสเตอร์ของเกมระดับตำนานอย่าง GTA San Andreas",
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
      "เกมจำลองสถานการณ์ (Simulation) แนวอินดี้ที่ให้ผู้เล่นรับบทเป็นจิตรกรชาวฝรั่งเศส พยายามวาดภาพขายเพื่อหาเงินเลี้ยงชีพและไต่เต้าสู่การเป็นศิลปินชื่อดัง",
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
      "เกมจำลองการล่าสัตว์สุดสมจริงฉบับพกพาบนมือถือ (Android และ iOS) ที่พัฒนาโดย Nine Rocks Games",
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
      "ซีรีส์เกมต่อสู้แอ็กชัน 3D (3D Fighting) ที่สร้างจากอนิเมะ/มังงะชื่อดัง นารูโตะ นินจาจอมคาถา",
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
      "เกมจำลองการทำฟาร์มที่สมจริงพัฒนาโดย GIANTS Software สำหรับมือถือ (iOS/Android)",
  },

  // ===== แอพ =====
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
    description: "แอปพลิเคชัน ปั้นโมเดล 3 มิติ (3D Sculpting) คุณภาพสูงบนอุปกรณ์พกพา เช่น iPad หรือ Android Tablet ที่โดดเด่นเรื่องการใช้งานง่าย",
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
            ? product.platform.includes("iOS") && product.platform.includes("Android")
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
          (a, b) => discountPercent(b.price, b.oldPrice) - discountPercent(a.price, a.oldPrice)
        );
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.popular) - Number(a.popular) || b.sold - a.sold);
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

    const message = `สวัสดีครับ สนใจสั่งซื้อสินค้าจาก Lotus Store\n\n${lines.join(
      "\n"
    )}\n\nยอดรวม: ${formatBaht(cartSubtotal)}`;

    return encodeURIComponent(message);
  }, [cart, cartSubtotal]);

  const selectedCheckoutMessage = useMemo(() => {
    if (!selectedProduct) {
      return encodeURIComponent("สวัสดีครับ สนใจสั่งซื้อสินค้าจาก Lotus Store");
    }

    const message = `สวัสดีครับ สนใจสั่งซื้อ ${selectedProduct.name} ราคา ${formatBaht(
      selectedProduct.price
    )} จาก Lotus Store`;

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
    <div className="min-h-screen bg-[#fff6f2] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={logoUrl}
              alt="Lotus Store"
              className="h-10 w-10 rounded-2xl object-cover ring-1 ring-orange-100"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="hidden sm:block">
              <p className="text-lg font-black tracking-tight text-orange-600">Lotus Store</p>
              <p className="text-xs text-slate-500">Lazada Mini Game & App Shop</p>
            </div>
          </div>

          <div className="relative ml-auto hidden max-w-2xl flex-1 md:block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาเกมหรือแอพที่ต้องการ..."
              className="h-11 w-full rounded-full border border-orange-200 bg-[#fff7f3] pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
            />
          </div>

          <a
            href={facebookPage}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-black md:inline-flex"
          >
            ติดต่อเพจ
          </a>

          <button
            onClick={() => setShowCart(true)}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200 transition hover:scale-[1.03] hover:bg-orange-600"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="pb-32 pt-16">
        <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-14">
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Sparkles className="h-4 w-4" />
                เว็บขายเกมและแอพสไตล์ Lazada mini
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                ซื้อเกมและแอพราคาคุ้ม
                <span className="block text-slate-950">ดูง่าย กดใส่ตะกร้าได้ทันที</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base text-white/90 sm:text-lg">
                รองรับทั้ง iOS และ Android พร้อมดีไซน์ใหม่ให้ดูโปรขึ้น น่าเชื่อถือขึ้น
                และปิดการขายได้ดีขึ้น
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="rounded-full bg-slate-950 px-6 py-3 font-bold text-white transition hover:scale-[1.02]"
                >
                  เริ่มเลือกสินค้า
                </a>
                <a
                  href={facebookPage}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/30 bg-white/15 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/25"
                >
                  ทักเพจซื้อทันที
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { icon: ShieldCheck, title: "การันตี", desc: "ใช้งานได้" },
                  { icon: Truck, title: "ส่งไว", desc: "ตอบแชทเร็ว" },
                  { icon: Headphones, title: "ซัพพอร์ต", desc: "ก่อน-หลังขาย" },
                  { icon: BadgePercent, title: "ดีลคุ้ม", desc: "ลดแรงหลายเกม" },
                ].map((item, index) => (
                  <div key={index} className="rounded-3xl bg-white/16 p-4 backdrop-blur-md">
                    <item.icon className="mb-3 h-5 w-5" />
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-white/80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[32px] bg-white p-5 text-slate-900 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-orange-500">Flash Deal</p>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                    วันนี้เท่านั้น
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={popularProducts[0]?.image ?? "https://placehold.co/400x400"}
                    alt={popularProducts[0]?.name ?? "สินค้าแนะนำ"}
                    className="h-24 w-24 rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-lg font-black">
                      {popularProducts[0]?.name ?? "สินค้าแนะนำ"}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {popularProducts[0]?.description ?? "เลือกสินค้าที่คุ้มที่สุดวันนี้"}
                    </p>
                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-2xl font-black text-orange-600">
                        {formatBaht(popularProducts[0]?.price ?? 0)}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
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
                  <div key={item.label} className="rounded-[28px] bg-slate-950 p-5 text-white shadow-xl">
                    <p className="text-sm text-white/60">{item.label}</p>
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
              { title: "ซื้อหลายชิ้นได้", desc: "มีระบบตะกร้าสินค้า", icon: ShoppingCart },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <item.icon className="mb-3 h-6 w-6 text-orange-500" />
                <h3 className="font-black text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <h2 className="text-2xl font-black sm:text-3xl">
              {activeType === "เกม" ? "สินค้าขายดี" : "แอพยอดฮิต"}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-[32px] border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative bg-gradient-to-br from-orange-50 to-white p-4">
                  <div className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                    ขายดี
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
                    -{discountPercent(product.price, product.oldPrice)}%
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mx-auto h-44 w-full rounded-2xl object-contain transition duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x600/f5f5f5/111111?text=Image";
                    }}
                  />
                </div>

                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                    {product.category}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-black leading-tight">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-sm text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold text-slate-700">{product.rating}</span>
                    <span className="text-slate-400">| ขายแล้ว {product.sold}</span>
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-2xl font-black text-orange-600">{formatBaht(product.price)}</p>
                      <p className="text-sm text-slate-400 line-through">{formatBaht(product.oldPrice)}</p>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:scale-[1.02]"
                    >
                      ใส่ตะกร้า
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="products" className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            {[
              { title: "Flash Sale", desc: "ดีลแรงประจำวัน", icon: BadgePercent },
              { title: "ซื้อด่วน", desc: "กดใส่ตะกร้าไว", icon: ShoppingCart },
              { title: "ยอดนิยม", desc: "สินค้าขายดี", icon: Flame },
              { title: "ร้านแนะนำ", desc: "ดีไซน์ใหม่โคตรโปร", icon: Sparkles },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-[28px] border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <item.icon className="mb-3 h-6 w-6 text-orange-500" />
                <p className="font-black text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[36px] border border-orange-100 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
                  สินค้าทั้งหมด
                </p>
                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  รายการ{activeType}พร้อมขาย
                </h2>
                <p className="mt-3 max-w-2xl text-slate-500">
                  เลือกสินค้า ใส่ตะกร้า และส่งรายการไปที่เพจได้ทันที
                  เหมาะกับการขายหลายชิ้นในหนึ่งออเดอร์
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[420px]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`ค้นหา${activeType}...`}
                    className="h-12 w-full rounded-2xl border border-orange-200 bg-[#fff8f4] pl-11 pr-4 outline-none focus:border-orange-400 focus:bg-white"
                  />
                </div>

                <div className="relative">
                  <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-12 w-full appearance-none rounded-2xl border border-orange-200 bg-[#fff8f4] pl-11 pr-4 outline-none focus:border-orange-400 focus:bg-white"
                  >
                    <option value="popular">เรียงตามความนิยม</option>
                    <option value="price-low">ราคาต่ำไปสูง</option>
                    <option value="price-high">ราคาสูงไปต่ำ</option>
                    <option value="discount">ส่วนลดมากสุด</option>
                    <option value="rating">คะแนนรีวิวสูงสุด</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="inline-flex w-fit rounded-full bg-[#fff4ee] p-1">
                {typeFilters.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setActiveType(type);
                      setActiveFilter("ทั้งหมด");
                    }}
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                      activeType === type
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-100"
                        : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {platformFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeFilter === filter
                        ? "bg-slate-950 text-white"
                        : "border border-orange-200 bg-white text-slate-600 hover:border-orange-400 hover:text-slate-950"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-[30px] border border-orange-100 bg-gradient-to-b from-white to-[#fff9f6] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden bg-[#fff4ed] p-4">
                    <div className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-600 shadow-sm">
                      {product.badge}
                    </div>
                    <div className="absolute right-4 top-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                      -{discountPercent(product.price, product.oldPrice)}%
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mx-auto h-52 w-full rounded-2xl object-contain transition duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/600x600/f5f5f5/111111?text=Image";
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                      {product.category}
                    </p>
                    <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight text-slate-900">
                      {product.name}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm text-slate-500">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm ring-1 ring-orange-100">
                      <div>
                        <div className="flex items-center gap-1 text-sm text-amber-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-bold text-slate-700">{product.rating}</span>
                          <span className="text-slate-400">({product.sold} sold)</span>
                        </div>
                        <p className="mt-1 text-xs text-emerald-600">
                          พร้อมขาย • ส่งรายละเอียดทางเพจ
                        </p>
                      </div>
                      {product.popular && (
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                          HIT
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-2xl font-black text-orange-600">{formatBaht(product.price)}</p>
                        <p className="text-sm text-slate-400 line-through">{formatBaht(product.oldPrice)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:scale-[1.02]"
                        >
                          ดูรายละเอียด
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02]"
                        >
                          <Plus className="h-4 w-4" />
                          ใส่ตะกร้า
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="mt-6 rounded-[28px] border border-dashed border-orange-200 bg-[#fff8f4] p-10 text-center">
                <LayoutGrid className="mx-auto mb-4 h-10 w-10 text-orange-400" />
                <h3 className="text-xl font-black">ยังไม่พบ{activeType}ที่ค้นหา</h3>
                <p className="mt-2 text-slate-500">ลองเปลี่ยนคำค้นหา ตัวกรอง หรือประเภทสินค้า</p>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              "ซื้อแล้วใช้งานได้จริง ตอบไวมาก ร้านดูน่าเชื่อถือสุดๆ",
              "ชอบตรงใส่ตะกร้าได้เลย ไม่ต้องทักทีละเกม สะดวกกว่าเดิมมาก",
              "หน้าเว็บดูเหมือนร้านจริงมากขึ้น ลูกค้าน่าจะมั่นใจขึ้นเยอะ",
            ].map((text, index) => (
              <div key={index} className="rounded-[30px] border border-orange-100 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <h3 className="text-lg font-black">รีวิวลูกค้า</h3>
                <p className="mt-3 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-white shadow-2xl">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 p-5 md:grid-cols-2 md:p-8">
              <div className="rounded-[28px] bg-[#fff5ef] p-5">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-[320px] w-full rounded-[24px] bg-white object-contain"
                />
              </div>

              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                    {selectedProduct.badge}
                  </span>
                  {selectedProduct.popular && (
                    <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
                      สินค้าขายดี
                    </span>
                  )}
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                  {selectedProduct.category}
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-slate-900">
                  {selectedProduct.name}
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {selectedProduct.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-slate-700">{selectedProduct.rating}</span>
                  <span className="text-slate-400">ขายแล้ว {selectedProduct.sold}+ ชิ้น</span>
                </div>

                <div className="mt-6 rounded-[28px] border border-orange-100 bg-[#fffaf7] p-5">
                  <p className="text-3xl font-black text-orange-600">
                    {formatBaht(selectedProduct.price)}
                  </p>
                  <p className="mt-1 text-sm text-slate-400 line-through">
                    {formatBaht(selectedProduct.oldPrice)}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-emerald-600">
                    ประหยัด {formatBaht(selectedProduct.oldPrice - selectedProduct.price)}
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="flex h-12 items-center justify-center gap-2 rounded-full bg-slate-950 font-bold text-white transition hover:scale-[1.01]"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    ใส่ตะกร้า
                  </button>

                  <a
                    href={`https://m.me/?text=${selectedCheckoutMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange-500 font-bold text-white transition hover:scale-[1.01] hover:bg-orange-600">
                      <CheckCircle2 className="h-4 w-4" />
                      ซื้อด่วนทันที
                    </button>
                  </a>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {["ส่งรายการง่าย", "รองรับหลายสินค้า", "ตอบแชทไว"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-orange-100 bg-white p-3 text-center text-sm font-semibold text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="flex-1 bg-black/40" onClick={() => setShowCart(false)} />

          <aside className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-orange-100 px-5 py-4">
              <div>
                <h2 className="text-xl font-black">ตะกร้าสินค้า</h2>
                <p className="text-sm text-slate-500">มีสินค้า {cartCount} ชิ้น</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="rounded-[28px] border border-dashed border-orange-200 bg-[#fff8f4] p-8 text-center">
                  <ShoppingCart className="mx-auto mb-4 h-10 w-10 text-orange-400" />
                  <h3 className="text-lg font-black">ตะกร้ายังว่างอยู่</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    เลือกเกมหรือแอพที่ต้องการ แล้วกดใส่ตะกร้าได้เลย
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="rounded-[26px] border border-orange-100 bg-[#fffaf7] p-4"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 font-black">{item.product.name}</h3>
                          <p className="mt-1 text-sm text-slate-500">{item.product.badge}</p>
                          <p className="mt-2 text-lg font-black text-orange-600">
                            {formatBaht(item.product.price)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full bg-white ring-1 ring-orange-100">
                          <button
                            onClick={() => updateQty(item.product.id, -1)}
                            className="px-3 py-2 text-slate-700"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 text-sm font-bold">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.product.id, 1)}
                            className="px-3 py-2 text-slate-700"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <p className="font-black text-slate-900">
                            {formatBaht(item.product.price * item.qty)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="rounded-full bg-red-50 p-2 text-red-500 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-orange-100 bg-[#fffaf7] p-5">
              <div className="space-y-2 rounded-[24px] bg-white p-4 ring-1 ring-orange-100">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>ยอดสินค้า</span>
                  <span>{formatBaht(cartSubtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-emerald-600">
                  <span>ประหยัดไป</span>
                  <span>{formatBaht(cartSavings)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-orange-100 pt-2 text-lg font-black">
                  <span>ยอดรวม</span>
                  <span className="text-orange-600">{formatBaht(cartSubtotal)}</span>
                </div>
              </div>

              <a
                href={facebookPage}
                target="_blank"
                rel="noreferrer"
                className="mt-4 block"
              >
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-950 font-bold text-white transition hover:scale-[1.01]">
                  <Facebook className="h-4 w-4" />
                  ไปที่เพจ
                </button>
              </a>

              <a
                href={`https://m.me/?text=${checkoutMessage}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block"
              >
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange-500 font-bold text-white transition hover:scale-[1.01] hover:bg-orange-600">
                  <CheckCircle2 className="h-4 w-4" />
                  ส่งรายการสั่งซื้อ
                </button>
              </a>

              <p className="mt-3 text-center text-xs text-slate-500">
                ลูกค้าสามารถใส่หลายสินค้าในตะกร้า แล้วส่งรายการไปสั่งซื้อทางเพจได้ทันที
              </p>
            </div>
          </aside>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-orange-100 bg-white/95 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <button
            onClick={() => setShowCart(true)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white font-bold text-slate-900"
          >
            <ShoppingCart className="h-4 w-4" />
            ตะกร้า ({cartCount})
          </button>
          <a
            href={cartCount > 0 ? `https://m.me/?text=${checkoutMessage}` : facebookPage}
            target="_blank"
            rel="noreferrer"
            className="flex-[1.3]"
          >
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-orange-500 font-bold text-white">
              <CheckCircle2 className="h-4 w-4" />
              {cartCount > 0 ? "ซื้อเลย" : "ทักเพจทันที"}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}