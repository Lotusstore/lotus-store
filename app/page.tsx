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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_22%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_22%),linear-gradient(135deg,#07111f_0%,#0a1020_30%,#12091d_65%,#0a0f1f_100%)] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={logoUrl}
              alt="Lotus Store"
              className="h-11 w-11 rounded-2xl object-cover ring-2 ring-cyan-400/40"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="hidden sm:block">
              <p className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-lg font-black tracking-tight text-transparent">
                Lotus Store
              </p>
              <p className="text-xs text-white/70">Colorful Game & App Shop</p>
            </div>
          </div>

          <div className="relative ml-auto hidden max-w-2xl flex-1 md:block">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200/70" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาเกมหรือแอพที่ต้องการ..."
              className="h-11 w-full rounded-full border border-white/10 bg-white/10 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-cyan-300/40 focus:bg-white/15"
            />
          </div>

          <a
            href={`${facebookPage}?text=${selectedCheckoutMessage}`}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 px-4 py-2 text-sm font-extrabold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] md:inline-flex"
          >
            ติดต่อเพจ
          </a>

          <button
            onClick={() => setShowCart(true)}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-slate-900 shadow-lg shadow-fuchsia-500/20 transition hover:scale-[1.03]"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-1 text-[10px] font-bold text-white ring-2 ring-slate-900">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="pb-32 pt-16">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_18%),radial-gradient(circle_at_80%_10%,rgba(217,70,239,0.16),transparent_18%),radial-gradient(circle_at_80%_80%,rgba(250,204,21,0.12),transparent_16%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
            <div className="relative z-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                ร้านเกมโทนสดใส สีสันชัด ดูน่าเข้าและสั่งซื้อง่าย
              </div>

              <h1 className="max-w-3xl leading-[0.95] tracking-tight">
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-4xl font-black text-transparent drop-shadow sm:text-5xl lg:text-7xl">
                  ซื้อเกมและแอพ
                  <br />
                  แบบโคตรคุ้ม
                </span>
                <span className="mt-4 block text-lg font-medium text-white/75 sm:text-2xl lg:text-3xl">
                  เว็บดูสดใส มีสีสัน สไตล์ร้านเกม กดเลือกง่าย สั่งซื้อไว
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                รองรับทั้ง iOS และ Android พร้อมหน้าเว็บสไตล์เกมมิ่งที่ดึงสายตากว่าเดิม
                ช่วยให้ลูกค้าดูสินค้าไว ตัดสินใจง่าย และรู้สึกว่าร้านดูน่าเชื่อถือมากขึ้น
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-500 px-6 py-3 font-extrabold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-[1.02]"
                >
                  เริ่มเลือกสินค้า
                </a>
                <a
                  href={`${facebookPage}?text=${encodeURIComponent(
                    "สวัสดีครับ สนใจดูรายละเอียดสินค้าในร้าน Lotus Store"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  ทักแชทเลย
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { icon: ShieldCheck, title: "การันตี", desc: "ใช้งานได้" },
                  { icon: Truck, title: "ตอบไว", desc: "คุยง่าย" },
                  { icon: Headphones, title: "ซัพพอร์ต", desc: "ก่อน-หลังขาย" },
                  { icon: BadgePercent, title: "ดีลคุ้ม", desc: "ลดแรงหลายเกม" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-xl shadow-cyan-950/20 backdrop-blur-md"
                  >
                    <item.icon className="mb-3 h-5 w-5 text-cyan-300" />
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-sm text-white/65">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-fuchsia-500/15 p-5 text-white shadow-2xl shadow-cyan-900/20 backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-cyan-100">Flash Deal</p>
                  <span className="rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-1 text-xs font-bold text-white">
                    ลดสูงสุด{" "}
                    {Math.max(...products.map((p) => discountPercent(p.price, p.oldPrice)))}%
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={popularProducts[0]?.image ?? "https://placehold.co/400x400"}
                    alt={popularProducts[0]?.name ?? "สินค้าแนะนำ"}
                    className="h-24 w-24 rounded-2xl object-cover ring-2 ring-white/10"
                  />
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-lg font-black">
                      {popularProducts[0]?.name ?? "สินค้าแนะนำ"}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">
                      {popularProducts[0]?.description ??
                        "เลือกสินค้าที่คุ้มที่สุดวันนี้"}
                    </p>
                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-2xl font-black text-cyan-300">
                        {formatBaht(popularProducts[0]?.price ?? 0)}
                      </span>
                      <span className="text-sm text-white/40 line-through">
                        {formatBaht(popularProducts[0]?.oldPrice ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "รีวิวลูกค้า", value: "4.9/5", color: "from-cyan-400 to-blue-500" },
                  { label: "ออเดอร์รวม", value: "1,500+", color: "from-fuchsia-500 to-pink-500" },
                  { label: "สินค้า", value: `${products.length}+`, color: "from-emerald-400 to-teal-500" },
                  { label: "พร้อมตอบ", value: "ทุกวัน", color: "from-amber-400 to-orange-500" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[28px] border border-white/10 bg-white/10 p-5 text-white shadow-xl backdrop-blur"
                  >
                    <p className="text-sm text-white/60">{item.label}</p>
                    <p className={`mt-2 bg-gradient-to-r ${item.color} bg-clip-text text-2xl font-black text-transparent`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[30px] border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold text-cyan-200">หมวดสินค้า</p>
                  <h2 className="mt-1 text-2xl font-black text-white">
                    เลือกดูสินค้าได้เร็วขึ้น
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {typeFilters.map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                        activeType === type
                          ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 shadow-lg"
                          : "border border-white/10 bg-white/10 text-white hover:bg-white/15"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="relative md:col-span-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50 md:hidden" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ค้นหาเกมหรือแอพ..."
                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/10 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/45 focus:border-cyan-300/40 md:hidden"
                  />
                  <div className="hidden h-12 items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 text-white/75 md:flex">
                    <LayoutGrid className="h-4 w-4 text-cyan-300" />
                    <span className="text-sm font-semibold">
                      สินค้าทั้งหมด {filteredProducts.length} รายการ
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto md:col-span-1">
                  {platformFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-bold transition ${
                        activeFilter === filter
                          ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
                          : "border border-white/10 bg-white/10 text-white/85 hover:bg-white/15"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="relative md:col-span-1">
                  <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/10 pl-11 pr-4 text-sm font-semibold text-white outline-none"
                  >
                    <option value="popular" className="text-black">
                      เรียง: ยอดนิยม
                    </option>
                    <option value="price-low" className="text-black">
                      ราคา: น้อยไปมาก
                    </option>
                    <option value="price-high" className="text-black">
                      ราคา: มากไปน้อย
                    </option>
                    <option value="discount" className="text-black">
                      ส่วนลดสูงสุด
                    </option>
                    <option value="rating" className="text-black">
                      คะแนนรีวิว
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-fuchsia-500/15 via-violet-500/10 to-cyan-500/10 p-5 shadow-xl backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-white/65">โซนแนะนำ</p>
                  <h3 className="text-lg font-black text-white">
                    สินค้ามาแรงประจำร้าน
                  </h3>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {popularProducts.slice(0, 3).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 text-left transition hover:bg-white/15"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-white">{product.name}</p>
                      <p className="text-sm text-white/60">{product.badge}</p>
                    </div>
                    <span className="font-black text-cyan-300">
                      {formatBaht(product.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
  {filteredProducts.map((product) => (
    <div
      key={product.id}
      className="group overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b from-[#111111] to-[#0a0a0a] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50"
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

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              {product.category}
            </p>
            <h3 className="mt-2 line-clamp-2 text-[1.75rem] font-black leading-tight text-white">
              {product.name}
            </h3>
          </div>

          {product.popular && (
            <span className="shrink-0 rounded-full border border-red-500/30 bg-red-500/15 px-3 py-1 text-xs font-bold text-red-300">
              ขายดี
            </span>
          )}
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
          {product.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="font-bold text-yellow-300">{product.rating}</span>
          </div>

          <span className="text-zinc-500">ขายแล้ว {product.sold}</span>

          <span className="truncate text-zinc-400">
            {product.platform.join(" / ")}
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-[#101010] p-4">
          <div className="flex items-end gap-2">
            <p className="text-3xl font-black text-cyan-300">
              {formatBaht(product.price)}
            </p>
            <p className="text-sm text-zinc-500 line-through">
              {formatBaht(product.oldPrice)}
            </p>
          </div>

          <p className="mt-2 text-sm font-medium text-emerald-400">
            ประหยัด {formatBaht(product.oldPrice - product.price)}
          </p>
        </div>

        <div className="mt-5 flex gap-2">
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
  ))}
</div>

          {filteredProducts.length === 0 && (
            <div className="mt-8 rounded-3xl border border-dashed border-white/15 bg-white/10 p-10 text-center backdrop-blur">
              <p className="text-lg font-bold text-white">ไม่พบสินค้าที่ค้นหา</p>
              <p className="mt-2 text-sm text-white/65">
                ลองเปลี่ยนคำค้นหา ประเภท หรือแพลตฟอร์ม
              </p>
            </div>
          )}
        </section>

        <section className="mx-auto mt-8 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              "บริการดี ตอบไว แนะนำสินค้าเข้าใจง่าย สั่งซื้อสะดวกมาก",
              "ราคาดี เว็บสีสันสวย ดูน่าเชื่อถือและใช้งานง่าย",
              "หน้าเว็บดูเป็นร้านเกมมากขึ้น ลูกค้าเห็นแล้วน่ากดต่อ",
            ].map((text, index) => (
              <div
                key={index}
                className="rounded-[30px] border border-white/10 bg-white/10 p-6 shadow-sm backdrop-blur"
              >
                <div className="mb-3 flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <h3 className="text-lg font-black text-white">รีวิวลูกค้า</h3>
                <p className="mt-3 text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm sm:items-center">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(14,23,38,0.98),rgba(22,12,35,0.98))] shadow-2xl shadow-black/40">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-72 w-full object-cover md:h-full"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-3 py-1 text-xs font-extrabold text-slate-950">
                    {selectedProduct.badge}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-7">
                <p className="text-sm font-bold text-cyan-200">{selectedProduct.category}</p>
                <h3 className="mt-2 text-2xl font-black text-white">
                  {selectedProduct.name}
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-amber-300">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">{selectedProduct.rating}</span>
                  </div>
                  <div className="text-white/60">ขายแล้ว {selectedProduct.sold}</div>
                  <div className="text-white/60">
                    รองรับ {selectedProduct.platform.join(" / ")}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/70">
                  {selectedProduct.description}
                </p>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-4">
                  <p className="text-sm text-white/60">ราคาพิเศษวันนี้</p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-4xl font-black text-cyan-300">
                      {formatBaht(selectedProduct.price)}
                    </span>
                    <span className="mb-1 text-sm text-white/35 line-through">
                      {formatBaht(selectedProduct.oldPrice)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-emerald-300">
                    ประหยัด {formatBaht(selectedProduct.oldPrice - selectedProduct.price)}
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => addToCart(selectedProduct)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-500 px-5 py-3 font-extrabold text-slate-950 transition hover:scale-[1.02]"
                  >
                    <Plus className="h-4 w-4" />
                    ใส่ตะกร้า
                  </button>

                  <a
                    href={`${facebookPage}?text=${selectedCheckoutMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/15"
                  >
                    <Facebook className="h-4 w-4" />
                    สั่งซื้อทางแชท
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm">
          <div className="ml-auto flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[linear-gradient(180deg,rgba(9,16,30,0.98),rgba(19,10,30,0.98))] shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-sm text-white/60">ตะกร้าสินค้า</p>
                <h3 className="text-xl font-black text-white">
                  {cartCount} รายการ
                </h3>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/15 bg-white/10 p-8 text-center">
                  <ShoppingCart className="mx-auto h-10 w-10 text-white/35" />
                  <p className="mt-3 font-bold text-white">ยังไม่มีสินค้าในตะกร้า</p>
                  <p className="mt-2 text-sm text-white/60">
                    เลือกเกมหรือแอพที่ต้องการแล้วกดใส่ตะกร้าได้เลย
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="rounded-3xl border border-white/10 bg-white/10 p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-2xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 font-bold text-white">
                            {item.product.name}
                          </p>
                          <p className="mt-1 text-sm text-white/55">
                            {item.product.badge}
                          </p>
                          <p className="mt-2 text-lg font-black text-cyan-300">
                            {formatBaht(item.product.price)}
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-white/10 bg-black/20">
                              <button
                                onClick={() => updateQty(item.product.id, -1)}
                                className="px-3 py-2 text-white/80"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-2 text-sm font-bold text-white">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.product.id, 1)}
                                className="px-3 py-2 text-white/80"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-rose-300 transition hover:bg-white/15"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-black/20 p-5">
              <div className="space-y-2 rounded-3xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center justify-between text-sm text-white/65">
                  <span>ยอดสินค้า</span>
                  <span>{formatBaht(cartSubtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-emerald-300">
                  <span>ส่วนลดที่ได้</span>
                  <span>{formatBaht(cartSavings)}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-black text-white">
                  <span>รวมทั้งหมด</span>
                  <span className="text-cyan-300">{formatBaht(cartSubtotal)}</span>
                </div>
              </div>

              <a
                href={`${facebookPage}?text=${checkoutMessage}`}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-extrabold transition ${
                  cart.length === 0
                    ? "pointer-events-none bg-white/10 text-white/35"
                    : "bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-500 text-slate-950 hover:scale-[1.01]"
                }`}
              >
                <Store className="h-4 w-4" />
                สั่งซื้อผ่านแชท
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}