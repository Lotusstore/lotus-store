"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Search,
  ShoppingCart,
  ShieldCheck,
  Flame,
  Star,
  Plus,
  Minus,
  Trash2,
  Filter,
  Sparkles,
  BadgePercent,
  Headphones,
  X,
  MessageCircle,
} from "lucide-react";

const facebookPage = "https://m.me/LotusstoreTH";
const logoUrl = "/logo.png";

type Product = {
  id: number;
  name: string;
  price: number;
  priceiOS?: number;
  priceAndroid?: number;
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
    price: 129,
    priceiOS: 129,
    priceAndroid: 129,
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
    price: 219,
    priceiOS: 219,
    priceAndroid: 219,
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
    priceiOS: 79,
    oldPrice: 419,
    platform: ["iOS"],
    category: "แข่งรถ",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://www.latestmodapks.com/wp-content/uploads/2025/01/GRID-Legends-logo-media.png",
    popular: false,
    description: "เกมแข่งรถภาพสวย เล่นลื่น มันส์มาก",
    rating: 4.8,
    sold: 133,
  },
  {
    id: 4,
    name: "GRID Autosport",
    price: 69,
    priceiOS: 69,
    priceAndroid: 69,
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
    priceiOS: 69,
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
    priceiOS: 69,
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
    priceiOS: 79,
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
    price: 99,
    priceiOS: 99,
    priceAndroid: 99,
    oldPrice: 549,
    platform: ["iOS", "Android"],
    category: "แอ็กชั่น",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/7HgM2hUw-T74b4Hgwu8u9iShbH_VX_Sz-LudBGxZ0pmvQ6OOVVd4kWf4G1MUr_mSyonQBMyls-McHAyeGhlfSQ",
    popular: false,
    description: "ซีรีส์เกมแอ็กชันผจญภัยระดับตำนาน",
    rating: 4.8,
    sold: 120,
  },
  {
    id: 9,
    name: "Monoposto",
    price: 59,
    priceiOS: 59,
    oldPrice: 129,
    platform: ["iOS"],
    category: "แข่งรถ",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/OXDfcG00jAGMeNSFn-lWvXhMSEVTBvEH_GCwMyvc6ePlZJ6D2Lv0BEcnt8Gyk9_uym38TMkws1OrTe2UeNAc5GU=w240-h480-rw",
    popular: false,
    description: "เกมแข่งรถแนว Formula สไตล์อินดี้ที่เน้นความสมจริง",
    rating: 4.8,
    sold: 96,
  },
  {
    id: 10,
    name: "Minecraft",
    price: 20,
    priceiOS: 20,
    priceAndroid: 20,
    oldPrice: 79,
    platform: ["iOS", "Android"],
    category: "Minecraft",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://themineecraft.com/wp-content/uploads/2025/07/Minecraft-For-IOS-and-Apple-768x423.webp",
    popular: false,
    description: "เอาชีวิตรอดได้ตามจินตนาการอย่างไร้ขีดจำกัด",
    rating: 5.0,
    sold: 500,
  },
  {
    id: 11,
    name: "Bully",
    price: 69,
    priceiOS: 69,
    priceAndroid: 69,
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
    priceiOS: 59,
    priceAndroid: 59,
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
    price: 129,
    priceiOS: 129,
    priceAndroid: 129,
    oldPrice: 500,
    platform: ["iOS", "Android"],
    category: "แอ็กชัน-ผจญภัย",
    type: "เกม",
    badge: "iOS / Android",
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
    price: 79,
    priceiOS: 79,
    priceAndroid: 79,
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
    rating: 4.7,
    sold: 88,
  },
  {
    id: 15,
    name: "Subnautica",
    price: 69,
    priceiOS: 69,
    oldPrice: 299,
    platform: ["iOS"],
    category: "ผจญภัย",
    type: "เกม",
    badge: "iOS",
    image: "https://i.postimg.cc/pX10d20x/IMG-4326.webp",
    popular: false,
    description:
      "เกมแนวผจญภัยเอาชีวิตรอด (Survival) แบบ Open World ใต้ทะเลลึก",
    rating: 4.8,
    sold: 86,
  },
  {
    id: 16,
    name: "Balatro",
    price: 69,
    priceiOS: 69,
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
    priceiOS: 69,
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
    priceiOS: 69,
    priceAndroid: 69,
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
    priceiOS: 69,
    priceAndroid: 69,
    oldPrice: 399,
    platform: ["iOS", "Android"],
    category: "แอ็กชั่น",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/yNRNX4CKTIGMZ23D3P0xwiEAhf-vCsZW9W9YZckeTflpnoU7MYAufdsfI15RDwcP1k96CNArzkPNdBey2kylwg",
    popular: false,
    description:
      "เกมแนวเอาชีวิตรอดและสำรวจโลกใต้น้ำภาคต่อจาก Subnautica พัฒนาโดย Unknown Worlds Entertainment",
    rating: 4.8,
    sold: 91,
  },
  {
    id: 20,
    name: "Way of the Hunter: Wild Europe",
    price: 69,
    priceiOS: 69,
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
    price: 79,
    priceiOS: 79,
    priceAndroid: 79,
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
    priceiOS: 49,
    priceAndroid: 49,
    oldPrice: 99,
    platform: ["iOS", "Android"],
    category: "จำลองสถานการณ์",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/ZqZ9mW1y-DW4kNHEC0WmzKbayuFhe_seQq-zUdqV4Dn-rmOKYQYljSYtMZCI0JWirw=w1024",
    popular: false,
    description:
      "เกมจำลองการทำฟาร์มที่สมจริงพัฒนาโดย GIANTS Software สำหรับมือถือ",
    rating: 4.7,
    sold: 110,
  },
  {
    id: 23,
    name: "Nomad Sculpt",
    price: 69,
    priceiOS: 69,
    oldPrice: 699,
    platform: ["iOS"],
    category: "ปั้นโมเดล 3 มิติ",
    type: "แอพ",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/H--AktreIu_qdZiFI3GQhexMzPXZhnUevfbViDeNXKyc9MonV8bE1v_nP4y9XjNoxgY=w256",
    popular: false,
    description:
      "แอปพลิเคชันปั้นโมเดล 3 มิติคุณภาพสูงบนอุปกรณ์พกพา ใช้งานง่ายและเหมาะกับสายสร้างงาน",
    rating: 4.9,
    sold: 52,
  },
  {
    id: 24,
    name: "Procreate",
    price: 69,
    priceiOS: 69,
    oldPrice: 399,
    platform: ["iOS"],
    category: "วาดภาพ",
    type: "แอพ",
    badge: "iOS Only",
    image:
      "https://yt3.googleusercontent.com/ytc/AIdro_nodCAR388ZAG2uYqxYZTuQ21H_tceLJIrfdGjWOq06g-U=s900-c-k-c0x00ffffff-no-rj",
    popular: false,
    description: "แอพวาดรูปยอดนิยม ฟีลมืออาชีพ ใช้งานลื่น",
    rating: 4.9,
    sold: 103,
  },
  {
    id: 25,
    name: "LumaFusion",
    price: 99,
    priceiOS: 99,
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
    priceiOS: 69,
    oldPrice: 839,
    platform: ["iOS"],
    category: "จดโน้ต",
    type: "แอพ",
    badge: "iOS Only",
    image:
      "https://www.iphonejd.com/wp-content/uploads/2023/08/6a010535fde333970c02b751ae6870200c.png",
    popular: false,
    description: "แอพจดโน้ตยอดนิยมสำหรับเรียนและทำงาน",
    rating: 4.9,
    sold: 77,
  },
  {
    id: 27,
    name: "Terraria",
    price: 59,
    priceiOS: 59,
    priceAndroid: 59,
    oldPrice: 199,
    platform: ["iOS", "Android"],
    category: "เอาชีวิตรอด",
    type: "เกม",
    badge: "iOS / Android",
    image: "https://m.media-amazon.com/images/I/31V6N3J7NVL.png",
    popular: false,
    description: "เกมเอาชีวิตรอด 2D สุดฮิต เล่นฟรียาวมาก",
    rating: 4.9,
    sold: 180,
  },
  {
    id: 28,
    name: "Unpacking",
    price: 69,
    priceiOS: 69,
    oldPrice: 299,
    platform: ["iOS"],
    category: "ผ่อนคลาย",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://store-images.s-microsoft.com/image/apps.13051.13636460453065260.ecf51b77-0a2c-413e-97f7-3aacd9282ab3.dd5a85c1-2cf9-4128-850a-e931036fb1b6",
    popular: false,
    description: "เกมจัดของสุดชิล เล่นเพลินแบบไม่รู้ตัว",
    rating: 4.8,
    sold: 95,
  },
  {
    id: 29,
    name: "Townscaper",
    price: 59,
    priceiOS: 59,
    oldPrice: 199,
    platform: ["iOS"],
    category: "จำลอง",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6wtwZFQjolF9jjqCKLJXseEY4Zy3h7Y_DKQ&s",
    popular: false,
    description: "สร้างเมืองสวยๆ ได้แบบง่ายๆ โคตรเพลิน",
    rating: 4.8,
    sold: 88,
  },
  {
    id: 30,
    name: "Human: Fall Flat",
    price: 69,
    priceiOS: 69,
    priceAndroid: 69,
    oldPrice: 249,
    platform: ["iOS", "Android"],
    category: "ปริศนา",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://cdn1.idcgames.com/storage/image/1348/game_banner/4x5_1-1_72.jpg",
    popular: false,
    description: "เกมแก้ปริศนาฮาๆ เล่นกับเพื่อนได้",
    rating: 4.8,
    sold: 120,
  },
  {
    id: 31,
    name: "Incredibox",
    price: 69,
    priceiOS: 69,
    oldPrice: 199,
    platform: ["iOS"],
    category: "ดนตรี",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf4MWsSNpl1U_lBoNfsXlDdPgm4Q6J4ZMb2w&s",
    popular: false,
    description: "สร้างเพลงเองได้แบบง่ายๆ โคตรเท่",
    rating: 4.9,
    sold: 70,
  },
  {
    id: 32,
    name: "Don't Starve Shipwrecked",
    price: 69,
    priceiOS: 69,
    oldPrice: 249,
    platform: ["iOS"],
    category: "เอาชีวิตรอด",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOQDtAiRHUwofdF-0oioS8fOzD9SjIq2xmQ&s",
    popular: false,
    description: "เอาชีวิตรอดบนเกาะ โหดแต่โคตรมัน",
    rating: 4.8,
    sold: 90,
  },
  {
    id: 33,
    name: "Construction Simulator 4",
    price: 59,
    priceiOS: 59,
    priceAndroid: 59,
    oldPrice: 199,
    platform: ["iOS", "Android"],
    category: "จำลอง",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://play-lh.googleusercontent.com/XgzdBgl_62OgGF1PqpnfFTzRjJL6tlc39wFo6eiBETPEMfvZnThTQwtT1V9FFpH-Gg",
    popular: false,
    description: "จำลองงานก่อสร้างสมจริง ขับเครื่องจักรครบ",
    rating: 4.6,
    sold: 50,
  },
  {
    id: 34,
    name: "Little Nightmares",
    price: 59,
    priceiOS: 59,
    oldPrice: 199,
    platform: ["iOS"],
    category: "สยองขวัญ",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHIiw5KiPhETgd3ZqCIZiRq4jl2Bn1GBhKw&s",
    popular: false,
    description: "เกมสยองขวัญบรรยากาศโคตรดี เล่นแล้วหลอน",
    rating: 4.9,
    sold: 110,
  },
  {
    id: 35,
    name: "Kingdom Two Crowns",
    price: 69,
    priceiOS: 69,
    priceAndroid: 69,
    oldPrice: 249,
    platform: ["iOS", "Android"],
    category: "วางแผน",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/54/25/e3/5425e30c-03a7-e5cc-8aa2-c11abc30d1c4/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/320x320bb.jpg",
    popular: false,
    description: "สร้างอาณาจักร ป้องกันศัตรู เล่นฟรียาว",
    rating: 4.8,
    sold: 85,
  },
  {
    id: 36,
    name: "My Time at Portia",
    price: 69,
    priceiOS: 69,
    oldPrice: 299,
    platform: ["iOS"],
    category: "จำลองชีวิต",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/NWmnQmMFKyM-6RrUpa-dbkPehICPanvbw1g5Ec_rA4odTnD-IonuAVeQvUACLNSHmvg=w256",
    popular: false,
    description: "ทำฟาร์ม สร้างบ้าน ใช้ชีวิตสุดชิล เล่นฟรียาวมาก",
    rating: 4.8,
    sold: 95,
  },
  {
    id: 37,
    name: "Tropico",
    price: 79,
    priceiOS: 79,
    oldPrice: 399,
    platform: ["iOS"],
    category: "วางแผน",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/IlCLh9HJ97jmOVL6PAZ0HRidZodotSp0y4dreOT8bPBr4pzPghRk7rtl9pEnJdkyaw",
    popular: false,
    description: "บริหารประเทศแบบผู้นำ สายวางแผนต้องมี",
    rating: 4.7,
    sold: 80,
  },
  {
    id: 38,
    name: "LIMBO",
    price: 69,
    priceiOS: 69,
    oldPrice: 199,
    platform: ["iOS"],
    category: "ปริศนา",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202511/2413/e3c6a091b505264c4f36678473b0439cd2b3b10ade3c6e83.jpg",
    popular: false,
    description: "เกมขาวดำสุดลึกลับ ปริศนาลึก เล่นแล้วติด",
    rating: 4.9,
    sold: 120,
  },
  {
    id: 39,
    name: "Poly Bridge",
    price: 49,
    priceiOS: 49,
    priceAndroid: 49,
    oldPrice: 199,
    platform: ["iOS", "Android"],
    category: "ปริศนา",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://img.tapimg.net/market/images/c06e7f9d5d2be430bafff3178f982e2e.png",
    popular: false,
    description: "สร้างสะพานให้รถผ่าน ท้าทายและสนุกมาก",
    rating: 4.7,
    sold: 70,
  },
  {
    id: 40,
    name: "The Bonfire 2: Uncharted Shores",
    price: 69,
    priceiOS: 69,
    oldPrice: 299,
    platform: ["iOS"],
    category: "เอาชีวิตรอด",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://play-lh.googleusercontent.com/vth6kp9sWQtbxQr2XeiO5nwIv-j2Jk9cwtKDmePaT_ILBXuy2AVu3wcDbupZVz9Jtv8",
    popular: false,
    description: "สร้างเมือง เอาชีวิตรอด และสำรวจโลก",
    rating: 4.8,
    sold: 85,
  },
  {
    id: 41,
    name: "Very Little Nightmares",
    price: 69,
    priceiOS: 69,
    oldPrice: 299,
    platform: ["iOS"],
    category: "สยองขวัญ",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEy_eUxGJlDFvIgmijyxC2AeM5WgfyY7ngig&s",
    popular: false,
    description: "เกมสยองขวัญแนวปริศนา บรรยากาศโคตรดี",
    rating: 4.8,
    sold: 90,
  },
  {
    id: 42,
    name: "Stardew Valley",
    price: 69,
    priceiOS: 69,
    priceAndroid: 69,
    oldPrice: 199,
    platform: ["iOS", "Android"],
    category: "จำลองชีวิต",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/0e/df/12/0edf1230-3f6e-fbb3-7f72-f2aa844d100a/AppIcons-0-0-1x_U007emarketing-0-8-0-85-220.png/320x320bb.jpg",
    popular: false,
    description: "ทำฟาร์ม ปลูกผัก เลี้ยงสัตว์ ใช้ชีวิตชิลๆ เล่นเพลินทั้งวัน",
    rating: 5.0,
    sold: 220,
  },
  {
    id: 43,
    name: "Surgeon Simulator",
    price: 59,
    priceiOS: 59,
    oldPrice: 199,
    platform: ["iOS"],
    category: "จำลอง",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpc8WMmbOpcm9Fol3W4NrZigzcfgieiENnPQ&s",
    popular: false,
    description: "เกมผ่าตัดสุดปั่น ฮาๆ เล่นกับเพื่อนโคตรมัน",
    rating: 4.6,
    sold: 75,
  },
  {
    id: 44,
    name: "Hitman: Blood Money",
    price: 69,
    priceiOS: 69,
    oldPrice: 419,
    platform: ["iOS"],
    category: "ลอบสังหาร",
    type: "เกม",
    badge: "iOS Only",
    image:
      "https://images.nintendolife.com/213989d7c2fac/hitman-blood-money---reprisal-cover.cover_large.jpg",
    popular: false,
    description: "เกมลอบเร้นระดับตำนาน วางแผนฆ่าแบบเนียนๆ",
    rating: 4.9,
    sold: 130,
  },
  {
    id: 45,
    name: "Dead Cells",
    price: 69,
    priceiOS: 69,
    priceAndroid: 69,
    oldPrice: 249,
    platform: ["iOS", "Android"],
    category: "แอ็กชั่น",
    type: "เกม",
    badge: "iOS / Android",
    image:
      "https://assets1.ignimgs.com/2019/06/10/dead-cells---button-fin-1560125633132.jpg?crop=1%3A1%2Csmart&format=jpg&auto=webp&quality=80",
    popular: true,
    description: "เกมแอ็กชั่น Roguelike สุดมัน ตายแล้วเริ่มใหม่ แต่โคตรสนุก",
    rating: 4.9,
    sold: 150,
  },
  {
    id: 46,
    name: "Minecraft PC (Java / Bedrock) เป็นบัญชีแชร์",
    price: 99,
    oldPrice: 1115,
    platform: ["PC"],
    category: "Minecraft",
    type: "เกม",
    badge: "PC",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png",
    popular: true,
    description:
      " Minecraft สำหรับ PC เป็นเมลเเชร์ของทางร้าน✅ สามารถเล่นได้ทั้ง Java และ Bedrock Edition ในราคาเดียว✅",
    rating: 4.8,
    sold: 50,
  },
  {
    id: 47,
    name: "Minecraft PC (Bedrock ) เป็นบัญชีส่วนตัว",
    price: 259,
    oldPrice: 1115,
    platform: ["PC"],
    category: "Minecraft",
    type: "เกม",
    badge: "PC",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png",
    popular: true,
    description:
      " Minecraft สำหรับ PC เป็นเมลส่วนตัว สามารถเล่นเเค่ Bedrock Edition ✅ DonutSMP ไม่ถูกแบน ✅ เปลี่ยนเมล เปลี่ยนรหัสได้เอง ✅",
    rating: 4.9,
    sold: 46,
  },
  {
    id: 48,
    name: "Minecraft PC (Java / Bedrock)เป็นบัญชีส่วนตัว",
    price: 389,
    oldPrice: 1115,
    platform: ["PC"],
    category: "Minecraft",
    type: "เกม",
    badge: "PC",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png",
    popular: true,
    description:
      " Minecraft สำหรับ PC เป็นเมลส่วนตัว✅ เล่นhypixelไม่ได้✅ สามารถเล่นได้ทั้ง Java และ Bedrock Edition  ในราคาเดียว✅ เปลี่ยนเมล เปลี่ยนรหัสได้เอง✅",
    rating: 4.7,
    sold: 38,
  },
  {
    id: 49,
    name: "Minecraft PC (Java / Bedrock)เป็นบัญชีส่วนตัว",
    price: 459,
    oldPrice: 1115,
    platform: ["PC"],
    category: "Minecraft",
    type: "เกม",
    badge: "PC",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png",
    popular: true,
    description:
      " Minecraft สำหรับ PC เป็นเมลส่วนตัว ✅ เล่นhypixelได้✅ สามารถเล่นได้ทั้ง Java และ Bedrock Edition ในราคาเดียว✅ เปลี่ยนเมล เปลี่ยนรหัสได้เอง✅",
    rating: 4.9,
    sold: 29,
  },
  {
    id: 50,
    name: "Terraria - Steam Account (บัญชีส่วนตัว) ",
    price: 99,
    oldPrice: 220,
    platform: ["PC"],
    category: " เกมอินดี้ ",
    type: "เกม",
    badge: "PC",
    image:
      "https://hb.imgix.net/b7c65e77a5f126a1024a8459ec0fd08f879860f1.jpeg?auto=compress,format&fit=crop&h=353&w=616&s=993b7e1d9df1e22a531675612b644e59",
    popular: true,
    description:
      " ขุด, ต่อสู้, สำรวจ, สร้าง! สัมผัสเกมผจญภัยแนว Sandbox ยอดฮิตระดับตำนานในราคาคุ้มค่า✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 22,
  },
  {
    id: 51,
    name: "Squad - Steam Account (บัญชีส่วนตัว ) ",
    price: 299,
    oldPrice: 899,
    platform: ["PC"],
    category: "เกมแอ็คชัน",
    type: "เกม",
    badge: "PC",
    image:
      "https://cdn.prod.website-files.com/651dd1cea3817995c17fa3c1/65e0e49452009f2a2920f3ce_1200x630-key-art.jpeg",
    popular: true,
    description:
      " Squad เป็นเกม FPS เชิงกลยุทธ์ที่มอบประสบการณ์การต่อสู้ที่สมจริงผ่านการทำงานเป็นทีม การสื่อสาร และการต่อสู้ที่สมจริง มันผสมผสานระหว่างเกมยิงแบบอาร์เคดและความสมจริงทางทหารด้วยการต่อสู้ที่มีผู้เล่นสูงสุด 100 คน การรบแบบผสมผสาน และการสร้างฐานทัพ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.8,
    sold: 19,
  },
  {
    id: 52,
    name: "SCUM - Steam Account (บัญชีส่วนตัว ) ",
    price: 319,
    oldPrice: 999,
    platform: ["PC"],
    category: "Open-world Survival",
    type: "เกม",
    badge: "PC",
    image:
      "https://imgproxy.eneba.games/c5LirgQDjLllv9YYX0ytZXzcQsAqP6tk_0AJsmausdI/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9n/b291c1VuZHM2V0p4/eUdENlNJM1REX0ky/LTVMM2JNUTRjMjlO/dEl3YjVVLmpwZWc",
    popular: true,
    description:
      "ผจญภัยในสภาพแวดล้อมที่โหดร้าย เก็บไอเทม สร้างสิ่งของ และหลบหลีกภัยคุกคามต่อชีวิตอย่างต่อเนื่อง ระบบการปรับแต่งและพัฒนาตัวละครที่ไม่เคยมีมาก่อนคือเครื่องมือสำคัญในการเอาชีวิตรอดของคุณ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.8,
    sold: 33,
  },
  {
    id: 53,
    name: "Arma 3 - Steam Account (บัญชีส่วนตัว ) ",
    price: 189,
    oldPrice: 999,
    platform: ["PC"],
    category: " เกมแอ็คชัน",
    type: "เกม",
    badge: "PC",
    image:
      "https://imgproxy.eneba.games/bUl7e9q7gGKNFDI9PEj1HC-HxbDOHyfghk7cul8SvX8/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9a/bkNiZmFWLmpwZw",
    popular: true,
    description:
      "สัมผัสประสบการณ์การเล่นเกมต่อสู้ที่สมจริงในสมรภูมิรบขนาดใหญ่ วางแผนการรบด้วยเนื้อหาแบบเล่นคนเดียวและเล่นหลายคนมากมาย คลังอาวุธและยานพาหนะทันสมัยขนาดใหญ่ และโอกาสในการสร้างสรรค์เนื้อหาอย่างไม่จำกัด สมจริง หลากหลาย เปิดกว้าง - Arma 3 จะพาคุณเข้าสู่สงคราม ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 22,
  },
  {
    id: 54,
    name: "Peak - Steam Account (บัญชีส่วนตัว ) ",
    price: 129,
    oldPrice: 159,
    platform: ["PC"],
    category: "  เกมอินดี้",
    type: "เกม",
    badge: "PC",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlemGZ0zMbpr_iOpejkuoo6gFvILqvB-WfPA&s",
    popular: true,
    description:
      "PEAK เป็นเกมปีนเขาแบบร่วมมือกันที่ความผิดพลาดเพียงเล็กน้อยก็สามารถทำให้คุณชะตาขาดได้ ไม่ว่าจะเป็นการเล่นเดี่ยวหรือเป็นกลุ่มลูกเสือที่ออกไปศึกษาธรรมชาติแล้วหลงทาง ความหวังเดียวที่จะช่วยเหลือคุณออกจากเกาะลึกลับได้คือการปีนเขาที่ตั้งอยู่กลางเกาะ คุณมีคุณสมบัติเพียงพอที่จะพิชิตยอดเขาสูงสุดหรือไม่ ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 42,
  },
  {
    id: 55,
    name: "Stardew Valley - Steam Account (บัญชีส่วนตัว ) ",
    price: 149,
    oldPrice: 315,
    platform: ["PC"],
    category: "  เกมอินดี้",
    type: "เกม",
    badge: "PC",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcwlMJFs08nzPUB1cjJITCbeRvytEK0U86yw&s",
    popular: true,
    description:
      "คุณได้รับมรดกเป็นที่ดินทำฟาร์มเก่าของคุณปู่ในเกม Stardew Valley พร้อมด้วยเครื่องมือเก่าๆ และเงินเพียงเล็กน้อย คุณเริ่มต้นชีวิตใหม่ คุณจะสามารถเรียนรู้ที่จะหาเลี้ยงชีพจากที่ดินและเปลี่ยนทุ่งนาที่รกร้างเหล่านี้ให้กลายเป็นบ้านที่เจริญรุ่งเรืองได้หรือไม่? ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 35,
  },
  {
    id: 56,
    name: "Garry's Mod - Steam Account (บัญชีส่วนตัว ) ",
    price: 149,
    oldPrice: 219,
    platform: ["PC"],
    category: "  เกมอินดี้",
    type: "เกม",
    badge: "PC",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjY4ZWU0Y2YtZWViMi00YjE0LWJjYTItZTk3MWFlYzMyYjUwXkEyXkFqcGc@._V1_.jpg",
    popular: true,
    description:
      "Garry's Mod เป็นเกมจำลองฟิสิกส์แบบแซนด์บ็อกซ์ ไม่มีเป้าหมายหรือจุดประสงค์ที่กำหนดไว้ล่วงหน้า เราให้เครื่องมือแก่คุณ แล้วปล่อยให้คุณเล่นอย่างอิสระ ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 28,
  },
  {
    id: 57,
    name: "ELDEN RING - Steam Account (บัญชีส่วนตัว ) ",
    price: 789,
    oldPrice: 1790,
    platform: ["PC"],
    category: "เกมแอ็คชัน",
    type: "เกม",
    badge: "PC",
    image:
      "https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/D8mYIXWja8knuqYlwqcqVpi1.jpg",
    popular: true,
    description:
      "ELDEN RING เป็นเกมแอ็คชันที่ผสมผสานระหว่างโลกแฟนตาซีและฟิสิกส์ที่สมจริง คุณจะได้รับโอกาสในการสำรวจโลกที่กว้างใหญ่และเผชิญหน้ากับศัตรูที่หลากหลาย ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.8,
    sold: 9,
  },
  {
    id: 58,
    name: "Raft - Steam Account (บัญชีส่วนตัว ) ",
    price: 199,
    oldPrice: 369,
    platform: ["PC"],
    category: "เกมผจญภัย ",
    type: "เกม",
    badge: "PC",
    image:
      "https://store-images.s-microsoft.com/image/apps.32463.14102062639781722.573266e7-686b-44fb-9e48-a2585bc2170f.5424f649-5154-402f-88e5-905dae685f22",
    popular: true,
    description:
      "Raft เป็นเกมผจญภัยแบบเปิดโลกที่คุณจะต้องอยู่รอดบนเรือไม้เล็กๆ ที่ลอยอยู่บนทะเล คุณจะต้องหาวัสดุรวบรวมอาหาร และสร้างสิ่งของเพื่อเอาชีวิตรอด ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 35,
  },
  {
    id: 59,
    name: "Astroneer- Steam Account (บัญชีส่วนตัว ) ",
    price: 289,
    oldPrice: 590,
    platform: ["PC"],
    category: "  เกมผจญภัย ",
    type: "เกม",
    badge: "PC",
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a9/Astroneer_cover_art.jpg",
    popular: true,
    description:
      "Astroneer เป็นเกมผจญภัยในอวกาศที่คุณจะต้องสำรวจและสร้างสรรค์บนดาวเคราะห์ต่างๆ คุณจะต้องจัดการทรัพยากร สร้างฐานที่อยู่ และรักษาชีวิตในสภาพแวดล้อมที่ไม่เอื้ออำนวย ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 20,
  },
  {
    id: 60,
    name: "Palworld- Steam Account (บัญชีส่วนตัว ) ",
    price: 259,
    oldPrice: 590,
    platform: ["PC"],
    category: "  เกมแอ็คชัน ",
    type: "เกม",
    badge: "PC",
    image:
      "https://upload.wikimedia.org/wikipedia/en/f/fb/Palworld_Steam_artwork.jpg",
    popular: true,
    description:
      "Palworld เป็นเกมต่อสู้ ทำฟาร์ม สร้างสิ่งก่อสร้าง และทำงานร่วมกับสิ่งมีชีวิตลึกลับที่เรียกว่า \"เพื่อน\" ในเกมเอาชีวิตรอดและสร้างสิ่งของแบบโอเพ่นเวิลด์สำหรับผู้เล่นหลายคนรูปแบบใหม่ล่าสุดนี้ ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 15,
  },
  {
    id: 61,
    name: "Black Myth: Wukong- Steam Account (บัญชีส่วนตัว ) ",
    price: 699,
    oldPrice: 1799,
    platform: ["PC"],
    category: "  เกมแอ็คชัน ",
    type: "เกม",
    badge: "PC",
    image:
      "https://upload.wikimedia.org/wikipedia/en/a/a6/Black_Myth_Wukong_cover_art.jpg",
    popular: true,
    description:
      "Black Myth: Wukong เป็นเกมแอ็กชันเล่นตามบทบาทที่อ้างอิงมาจากตำนานเทพนิยายจีน คุณจะได้สวมบทบาทเป็น ผู้รับลิขิตสวรรค์ เหยียบย่างไปบนเส้นทางสู่ชมพูทวีปซึ่งเต็มไปด้วยภยันตรายและเรื่องน่าประหลาดใจ เพื่อค้นหาความจริงของตำนานเมื่อครั้งอดีต ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 10,
  },
  {
    id: 62,
    name: "Project Zomboid- Steam Account (บัญชีส่วนตัว ) ",
    price: 129,
    oldPrice: 400,
    platform: ["PC"],
    category: "  เกมเล่นระหว่างการพัฒนา ",
    type: "เกม",
    badge: "PC",
    image:
      "https://assets-prd.ignimgs.com/2023/07/21/projectzomboid-1689959989039.jpg",
    popular: true,
    description:
      "Project Zomboid คือสุดยอดเกมเอาชีวิตรอดจากซอมบี้ เล่นคนเดียวหรือเล่นหลายคนก็ได้ คุณจะต้องเก็บของ สร้างสิ่งก่อสร้าง ประดิษฐ์สิ่งของ ต่อสู้ ทำฟาร์ม และตกปลาเพื่อเอาชีวิตรอด ระบบทักษะ RPG สุดเข้มข้น แผนที่ขนาดใหญ่ โหมดแซนด์บ็อกซ์ที่ปรับแต่งได้มากมาย และแรคคูนตัวน้อยน่ารักที่จะช่วยสอนวิธีการเล่นรอผู้เล่นอยู่ แล้วคุณจะตายอย่างไร? แค่โดนกัดครั้งเดียวก็ตายแล้ว... ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 20,
  },
  {
    id: 63,
    name: "Valheim- Steam Account (บัญชีส่วนตัว ) ",
    price: 209,
    oldPrice: 499,
    platform: ["PC"],
    category: "   เกมแอ็คชัน ",
    type: "เกม",
    badge: "PC",
    image:
      "https://gaming-cdn.com/images/products/7119/orig/valheim-pc-mac-game-steam-cover.jpg?v=1706800610",
    popular: true,
    description:
      "เกมสำรวจและเอาชีวิตรอดสุดโหดสำหรับผู้เล่น 1-10 คน ในดินแดนที่สร้างขึ้นแบบสุ่มโดยได้รับแรงบันดาลใจจากวัฒนธรรมไวกิ้ง ต่อสู้ สร้าง และพิชิตดินแดนเพื่อสร้างมหากาพย์ที่คู่ควรกับการอุปถัมภ์ของเทพโอดิน! ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.9,
    sold: 15,
  },
  {
    id: 64,
    name: "7 Days to Die - Steam Account (บัญชีส่วนตัว ) ",
    price: 289,
    oldPrice: 809,
    platform: ["PC"],
    category: "   เกมแอ็คชัน ",
    type: "เกม",
    badge: "PC",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90wYJszrnTsdAXOdfF7QNgbjMfekx-9ALmw&s",
    popular: true,
    description:
      "7 Days to Die เป็นเกมโอเพ่นเวิลด์ที่ผสมผสานองค์ประกอบต่างๆ เข้าด้วยกันอย่างลงตัว ไม่ว่าจะเป็นเกมยิงมุมมองบุคคลที่หนึ่ง เกมเอาชีวิตรอดจากซอมบี้ เกมป้องกันหอคอย และเกมสวมบทบาท มาเล่นเกม RPG เอาชีวิตรอดจากซอมบี้แบบแซนด์บ็อกซ์สุดคลาสสิกที่มาก่อนใคร! นาเวซกาเนรอคุณอยู่! ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.8,
    sold: 20,
  },
  {
    id: 65,
    name: "Overcooked! 2 - Steam Account (บัญชีส่วนตัว ) ",
    price: 199,
    oldPrice: 490,
    platform: ["PC"],
    category: "   เกมอินดี้  ",
    type: "เกม",
    badge: "PC",
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/728880/header.jpg?t=1776856665",
    popular: true,
    description:
      "Overcooked กลับมาอีกครั้งพร้อมความสนุกสนานวุ่นวายในการทำอาหาร! กลับสู่ดินแดนแห่งหัวหอมและรวบรวมทีมเชฟของคุณในโหมดเล่นร่วมกันแบบคลาสสิก หรือเล่นออนไลน์ได้สูงสุดถึงสี่คน เตรียมผ้ากันเปื้อนให้พร้อม...ถึงเวลาช่วยโลกอีกครั้งแล้ว! ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.8,
    sold: 18,
  },
  {
    id: 66,
    name: "Sekiro: Shadows Die Twice - Steam Account (บัญชีส่วนตัว ) ",
    price: 359,
    oldPrice: 809,
    platform: ["PC"],
    category: "   เกมแอ็คชัน ",
    type: "เกม",
    badge: "PC",
    image:
      "https://image.api.playstation.com/cdn/HP0506/CUSA13910_00/QKJRzanGk86ezpx2pk5QqQaduoXGJV3u8vHIejSav4MYiHA3F7zNgxSOF9bJmt2T.png",
    popular: true,
    description:
      "เกมแห่งปี - The Game Awards 2019 เกมแอ็กชั่นยอดเยี่ยมแห่งปี 2019 - IGN สร้างเส้นทางแห่งการแก้แค้นอันชาญฉลาดของคุณเองในเกมผจญภัยที่ได้รับรางวัลจากผู้พัฒนา FromSoftware ผู้สร้าง Bloodborne และซีรีส์ Dark Souls แก้แค้น กอบกู้เกียรติยศ สังหารอย่างแยบยล ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.8,
    sold: 20,
  },
  {
    id: 67,
    name: "The Isle - Steam Account (บัญชีส่วนตัว ) ",
    price: 279,
    oldPrice: 400,
    platform: ["PC"],
    category: "   เกมแอ็คชัน ",
    type: "เกม",
    badge: "PC",
    image:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/376210/header.jpg?t=1708531123",
    popular: true,
    description:
      "The Isle เป็นเกมแนว Open World Survival ยุคดึกดำบรรพ์ ผู้เล่นสามารถเลือกเล่นเป็นไดโนเสาร์หลากหลายสายพันธุ์เพื่อเอาชีวิตรอดในระบบนิเวศที่สมจริง ✅ เปลี่ยนเมล เปลี่ยนรหัสได้✅",
    rating: 4.7,
    sold: 15,
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category.trim())));
    return ["ทั้งหมด", ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === "ทั้งหมด" || p.category.trim() === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prevCart, { product, qty: 1 }];
    });
  };

  const updateCartQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const totalCartPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="Lotus Store Logo"
              className="w-10 h-10 object-contain rounded-lg bg-slate-800 p-1"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
              โลตัสเกม
            </span>
          </div>

          <div className="flex-1 max-w-md relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาเกม หรือ แอพ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/60 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-rose-500 text-slate-100 placeholder-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <a
              href={facebookPage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">ติดต่อเพจ</span>
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-slate-800 hover:bg-slate-700 p-2.5 rounded-full border border-slate-700 transition"
            >
              <ShoppingCart className="w-5 h-5 text-rose-400" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="px-4 pb-3 sm:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาเกม หรือ แอพ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700/60 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-rose-500 text-slate-100 placeholder-slate-400"
            />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-950/40 to-slate-950 py-12 px-4 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> โลตัสเกม - ร้านค้าดิจิทัลราคาสุดคุ้ม
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            คลังเกมและแอปพลิเคชัน <br />
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              iOS / Android / PC ครบจบในที่เดียว
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            รับประกันไอดีปลอดภัย ราคาสบายกระเป๋า บริการจัดส่งรวดเร็วทันใจ
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition border ${
                selectedCategory === cat
                  ? "bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-950"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="group bg-slate-900/90 rounded-2xl border border-slate-800/80 overflow-hidden hover:border-rose-500/50 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  className="relative aspect-square overflow-hidden cursor-pointer bg-slate-800"
                  onClick={() => setSelectedProduct(p)}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-slate-200 border border-slate-700">
                      {p.badge}
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <div className="text-[11px] text-rose-400 font-semibold mb-0.5">
                    {p.category}
                  </div>
                  <h3
                    onClick={() => setSelectedProduct(p)}
                    className="text-sm font-bold text-slate-100 line-clamp-1 cursor-pointer hover:text-rose-400 transition"
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 min-h-[2rem]">
                    {p.description}
                  </p>

                  {/* Price Area */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500 line-through">
                        ฿{p.oldPrice}
                      </div>
                      <div className="text-base font-extrabold text-rose-400">
                        ฿{p.price}
                      </div>
                    </div>
                    {(p.priceiOS || p.priceAndroid) && (
                      <div className="text-[10px] text-right text-slate-400">
                        {p.priceiOS && <div>iOS: ฿{p.priceiOS}</div>}
                        {p.priceAndroid && <div>Android: ฿{p.priceAndroid}</div>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 pt-0">
                <button
                  onClick={() => addToCart(p)}
                  className="w-full mt-2 bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white py-2 rounded-xl text-xs font-semibold transition border border-slate-700 hover:border-rose-500 flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> ใส่ตะกร้า
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 p-1.5 rounded-full z-10 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row p-4 gap-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full sm:w-40 h-40 object-cover rounded-xl bg-slate-800"
              />
              <div className="flex-1">
                <span className="text-xs font-semibold text-rose-400">
                  {selectedProduct.category}
                </span>
                <h2 className="text-lg font-bold text-slate-100">
                  {selectedProduct.name}
                </h2>
                <p className="text-xs text-slate-400 mt-2">
                  {selectedProduct.description}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-black text-rose-400">
                    ฿{selectedProduct.price}
                  </span>
                  <span className="text-xs text-slate-500 line-through">
                    ฿{selectedProduct.oldPrice}
                  </span>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full mt-5 bg-rose-600 hover:bg-rose-500 text-white font-semibold py-2.5 rounded-xl text-xs transition shadow-lg shadow-rose-950 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" /> เพิ่มใส่ตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between p-4 shadow-2xl animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-rose-400" />
                  <h2 className="font-bold text-slate-100">ตะกร้าสินค้า</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart List */}
              <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="text-center text-slate-500 text-sm py-12">
                    ไม่มีสินค้าในตะกร้า
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-xl gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg bg-slate-800"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-200 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-rose-400 text-xs font-bold mt-0.5">
                          ฿{item.product.price}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateCartQty(item.product.id, -1)}
                          className="bg-slate-700 hover:bg-slate-600 p-1 rounded text-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateCartQty(item.product.id, 1)}
                          className="bg-slate-700 hover:bg-slate-600 p-1 rounded text-slate-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-slate-800 pt-4 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-300">ราคารวมทั้งหมด:</span>
                  <span className="text-xl text-rose-400">฿{totalCartPrice}</span>
                </div>
                <a
                  href={`${facebookPage}?text=${encodeURIComponent(
                    `สนใจสั่งซื้อสินค้าจากโลตัสเกม:\n` +
                      cart
                        .map(
                          (i) =>
                            `- ${i.product.name} x${i.qty} = ฿${
                              i.product.price * i.qty
                            }`
                        )
                        .join("\n") +
                      `\nราคารวม: ฿${totalCartPrice}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-center text-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" /> สั่งซื้อผ่าน Messenger
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}