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
  {
  id: 27,
  name: "Terraria",
  price: 59,
  oldPrice: 199,
  platform: ["iOS", "Android"],
  category: "เอาชีวิตรอด",
  type: "เกม",
  badge: "iOS / Android",
  image: "https://m.media-amazon.com/images/I/31V6N3J7NVL.png",
  popular: true,
  description: "เกมเอาชีวิตรอด 2D สุดฮิต เล่นฟรียาวมาก",
  rating: 4.9,
  sold: 180,
},
{
  id: 28,
  name: "Unpacking",
  price: 69,
  oldPrice: 299,
  platform: ["iOS"],
  category: "ผ่อนคลาย",
  type: "เกม",
  badge: "iOS Only",
  image: "https://store-images.s-microsoft.com/image/apps.13051.13636460453065260.ecf51b77-0a2c-413e-97f7-3aacd9282ab3.dd5a85c1-2cf9-4128-850a-e931036fb1b6",
  popular: true,
  description: "เกมจัดของสุดชิล เล่นเพลินแบบไม่รู้ตัว",
  rating: 4.8,
  sold: 95,
},
{
  id: 29,
  name: "Townscaper",
  price: 59,
  oldPrice: 199,
  platform: ["iOS"],
  category: "จำลอง",
  type: "เกม",
  badge: "iOS Only",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6wtwZFQjolF9jjqCKLJXseEY4Zy3h7Y_DKQ&s",
  popular: true,
  description: "สร้างเมืองสวยๆ ได้แบบง่ายๆ โคตรเพลิน",
  rating: 4.8,
  sold: 88,
},
{
  id: 30,
  name: "Human: Fall Flat",
  price: 59,
  oldPrice: 249,
  platform: ["iOS", "Android"],
  category: "ปริศนา",
  type: "เกม",
  badge: "iOS / Android",
  image: "https://cdn1.idcgames.com/storage/image/1348/game_banner/4x5_1-1_72.jpg",
  popular: true,
  description: "เกมแก้ปริศนาฮาๆ เล่นกับเพื่อนได้",
  rating: 4.8,
  sold: 120,
},
{
  id: 31,
  name: "Incredibox",
  price: 69,
  oldPrice: 199,
  platform: ["iOS"],
  category: "ดนตรี",
  type: "เกม",
  badge: "iOS Only",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf4MWsSNpl1U_lBoNfsXlDdPgm4Q6J4ZMb2w&s",
  popular: true,
  description: "สร้างเพลงเองได้แบบง่ายๆ โคตรเท่",
  rating: 4.9,
  sold: 70,
},
{
  id: 32,
  name: "Don't Starve Shipwrecked",
  price: 69,
  oldPrice: 249,
  platform: ["iOS"],
  category: "เอาชีวิตรอด",
  type: "เกม",
  badge: "iOS Only",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlOQDtAiRHUwofdF-0oioS8fOzD9SjIq2xmQ&s",
  popular: true,
  description: "เอาชีวิตรอดบนเกาะ โหดแต่โคตรมัน",
  rating: 4.8,
  sold: 90,
},
{
  id: 33,
  name: "Construction Simulator 4",
  price: 59,
  oldPrice: 199,
  platform: ["iOS", "Android"],
  category: "จำลอง",
  type: "เกม",
  badge: "iOS / Android",
  image: "https://play-lh.googleusercontent.com/XgzdBgl_62OgGF1PqpnfFTzRjJL6tlc39wFo6eiBETPEMfvZnThTQwtT1V9FFpH-Gg",
  popular: false,
  description: "จำลองงานก่อสร้างสมจริง ขับเครื่องจักรครบ",
  rating: 4.6,
  sold: 50,
},
{
  id: 34,
  name: "Little Nightmares",
  price: 79,
  oldPrice: 399,
  platform: ["iOS"],
  category: "สยองขวัญ",
  type: "เกม",
  badge: "iOS Only",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWHIiw5KiPhETgd3ZqCIZiRq4jl2Bn1GBhKw&s",
  popular: true,
  description: "เกมสยองขวัญบรรยากาศโคตรดี เล่นแล้วหลอน",
  rating: 4.9,
  sold: 110,
},
{
  id: 35,
  name: "Kingdom Two Crowns",
  price: 69,
  oldPrice: 249,
  platform: ["iOS", "Android"],
  category: "วางแผน",
  type: "เกม",
  badge: "iOS / Android",
  image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/54/25/e3/5425e30c-03a7-e5cc-8aa2-c11abc30d1c4/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/320x320bb.jpg",
  popular: true,
  description: "สร้างอาณาจักร ป้องกันศัตรู เล่นฟรียาว",
  rating: 4.8,
  sold: 85,
}
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const productRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  const searchSuggestions = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    if (!keyword) return [];

    return products
      .filter((product) => {
        const matchesType = product.type === activeType;
        const matchesName = product.name.toLowerCase().includes(keyword);
        return matchesType && matchesName;
      })
      .slice(0, 6);
  }, [query, activeType]);

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
  const scrollToProduct = (product: Product) => {
  setQuery(product.name);
  setShowSuggestions(false);

  setTimeout(() => {
    const element = productRefs.current[product.id];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.classList.add("ring-2", "ring-red-500");

      setTimeout(() => {
        element.classList.remove("ring-2", "ring-red-500");
      }, 1600);
    }
  }, 100);
};

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src={logoUrl}
              alt="Lotus Store"
              className="h-9 w-9 rounded-2xl object-cover ring-1 ring-white/10 sm:h-10 sm:w-10"
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

          <div className="relative ml-1 flex-1 md:max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 z-20 h-4 w-4 -translate-y-1/2 text-zinc-500" />

           <input
  value={query}
  onChange={(e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter" && searchSuggestions.length > 0) {
      scrollToProduct(searchSuggestions[0]);
    }
  }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              placeholder="ค้นหาเกมหรือแอพ..."
              className="relative z-10 h-10 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/20 focus:bg-white/10 sm:h-11"
            />

            {showSuggestions && query.trim() !== "" && searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-2xl shadow-black/40">
                {searchSuggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => scrollToProduct(product)}
                    className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-3 text-left transition hover:bg-white/5 last:border-b-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-xl object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/100x100";
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {product.name}
                      </p>
                      <p className="text-xs text-zinc-400">{product.category}</p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-red-400">
                      {formatBaht(product.price)}
                    </span>
                  </button>
                ))}
              </div>
            )}
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
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white text-black shadow-lg shadow-black/40 transition hover:scale-[1.03] hover:bg-zinc-200 sm:h-11 sm:w-11"
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

      <main className="pb-32 pt-14 sm:pt-16">
        <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.18),transparent_28%),linear-gradient(135deg,#0b0b0b_0%,#050505_45%,#111111_100%)]">
          <div className="mx-auto grid max-w-7xl gap-6 px-3 py-6 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 backdrop-blur sm:mb-5 sm:px-4 sm:text-sm">
                <Sparkles className="h-4 w-4" />
                Premium mobile game & app storefront
              </div>

              <h1 className="max-w-3xl leading-[0.95] tracking-tight">
                <span className="block text-3xl font-black text-white sm:text-5xl lg:text-7xl">
                  ซื้อเกมและแอพราคาคุ้ม
                </span>
                <span className="mt-2 block text-base font-medium text-zinc-400 sm:mt-3 sm:text-2xl lg:text-3xl">
                  ดูง่าย กดสั่งซื้อได้ทันที
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
                รวมเกมและแอพยอดนิยมสำหรับ iOS และ Android เลือกง่าย
                สั่งไว และคุยกับเพจได้ทันทีในหน้าต่างแชท
              </p>

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
                <a
                  href="#products"
                  className="rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.02] hover:bg-red-700 sm:px-6"
                >
                  เริ่มเลือกสินค้า
                </a>
                <a
                  href={`${facebookPage}?text=${encodeURIComponent(
                    "สวัสดีครับ สนใจดูรายละเอียดสินค้าในร้าน Lotus Store"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 sm:px-6"
                >
                  ทักแชทเลย
                </a>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3 md:grid-cols-4">
                {[
                  { icon: ShieldCheck, title: "การันตี", desc: "ใช้งานได้" },
                  { icon: MessageCircle, title: "ตอบไว", desc: "คุยง่าย" },
                  { icon: Headphones, title: "ซัพพอร์ต", desc: "ก่อน-หลังขาย" },
                  { icon: BadgePercent, title: "ดีลคุ้ม", desc: "ลดแรงหลายเกม" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:rounded-3xl sm:p-4"
                  >
                    <item.icon className="mb-2 h-5 w-5 text-white sm:mb-3" />
                    <p className="text-sm font-bold text-white sm:text-base">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-400 sm:text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[28px] border border-white/10 bg-[#111111] p-4 text-white shadow-2xl shadow-black/40 sm:rounded-[32px] sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-white">Flash Deal</p>
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    ลดสูงสุด{" "}
                    {Math.max(...products.map((p) => discountPercent(p.price, p.oldPrice)))}%
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={popularProducts[0]?.image ?? "https://placehold.co/400x400"}
                    alt={popularProducts[0]?.name ?? "สินค้าแนะนำ"}
                    className="h-20 w-20 rounded-2xl bg-[#191919] object-cover sm:h-24 sm:w-24"
                  />
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-base font-black sm:text-lg">
                      {popularProducts[0]?.name ?? "สินค้าแนะนำ"}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                      {popularProducts[0]?.description ??
                        "เลือกสินค้าที่คุ้มที่สุดวันนี้"}
                    </p>
                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-xl font-black text-cyan-300 sm:text-2xl">
                        {formatBaht(popularProducts[0]?.price ?? 0)}
                      </span>
                      <span className="text-xs text-zinc-500 line-through sm:text-sm">
                        {formatBaht(popularProducts[0]?.oldPrice ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: "รีวิวลูกค้า", value: "4.9/5" },
                  { label: "ออเดอร์รวม", value: "1,500+" },
                  { label: "สินค้า", value: `${products.length}+` },
                  { label: "พร้อมตอบ", value: "ทุกวัน" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/10 bg-[#0f0f0f] p-4 text-white shadow-xl shadow-black/30 sm:rounded-[28px] sm:p-5"
                  >
                    <p className="text-xl font-black sm:text-2xl">{item.value}</p>
                    <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:rounded-[28px] sm:p-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {typeFilters.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                    activeType === type
                      ? "bg-white text-black"
                      : "bg-white/5 text-zinc-300 border border-white/10"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {platformFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeFilter === filter
                      ? "bg-red-600 text-white"
                      : "bg-white/5 text-zinc-300 border border-white/10"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative">
              <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 w-full appearance-none rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none"
              >
                <option value="popular" className="text-black">
                  เรียงตามความนิยม
                </option>
                <option value="price-low" className="text-black">
                  ราคาน้อยไปมาก
                </option>
                <option value="price-high" className="text-black">
                  ราคามากไปน้อย
                </option>
                <option value="discount" className="text-black">
                  ส่วนลดมากสุด
                </option>
                <option value="rating" className="text-black">
                  คะแนนสูงสุด
                </option>
              </select>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-3 pb-3 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-black text-white sm:text-xl">สินค้าขายดี</h2>
            <span className="inline-flex items-center gap-1 text-sm text-red-400">
              <Flame className="h-4 w-4" />
              Hot
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {popularProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5 text-left transition hover:scale-[1.01]"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/500x500";
                    }}
                  />
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 min-h-[40px] text-sm font-bold text-white">
                    {product.name}
                  </p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-base font-black text-red-400 sm:text-lg">
                      {formatBaht(product.price)}
                    </span>
                    <span className="text-xs text-zinc-500 line-through">
                      {formatBaht(product.oldPrice)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-white sm:text-xl">สินค้าทั้งหมด</h2>
            <p className="text-xs text-zinc-400 sm:text-sm">
              พบ {filteredProducts.length} รายการ
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-lg font-bold text-white">ไม่พบสินค้าที่ค้นหา</p>
              <p className="mt-2 text-sm text-zinc-400">
                ลองเปลี่ยนคำค้นหรือหมวดสินค้า
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
  key={product.id}
  ref={(el) => {
    productRefs.current[product.id] = el;
  }}
  className="overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition"
>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="block w-full text-left"
                  >
                    <div className="relative aspect-[4/4.8] overflow-hidden bg-[#111111]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/600x800";
                        }}
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                        {product.badge}
                      </span>
                      {discountPercent(product.price, product.oldPrice) > 0 && (
                        <span className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold text-white">
                          -{discountPercent(product.price, product.oldPrice)}%
                        </span>
                      )}
                    </div>
                  </button>

                  <div className="p-3">
                    <p className="line-clamp-2 min-h-[40px] text-sm font-bold text-white">
                      {product.name}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {product.rating}
                      </span>
                      <span>ขายแล้ว {product.sold}</span>
                    </div>

                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-lg font-black text-red-400">
                        {formatBaht(product.price)}
                      </span>
                      <span className="text-xs text-zinc-500 line-through">
                        {formatBaht(product.oldPrice)}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                      >
                        ดูรายละเอียด
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
                      >
                        เพิ่มลงตะกร้า
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4">
          <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#0c0c0c] shadow-2xl shadow-black/50 sm:max-w-lg sm:rounded-[32px]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0c0c0c]/95 p-4 backdrop-blur">
              <p className="text-base font-black text-white">รายละเอียดสินค้า</p>
              <button
                onClick={() => setSelectedProduct(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="overflow-hidden rounded-[24px] bg-[#111111]">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="aspect-[4/3] w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/800x600";
                  }}
                />
              </div>

              <h3 className="mt-4 text-xl font-black text-white">
                {selectedProduct.name}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {selectedProduct.badge}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {selectedProduct.category}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl font-black text-red-400">
                  {formatBaht(selectedProduct.price)}
                </span>
                <span className="text-sm text-zinc-500 line-through">
                  {formatBaht(selectedProduct.oldPrice)}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-3 text-sm text-zinc-400">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {selectedProduct.rating}
                </span>
                <span>ขายแล้ว {selectedProduct.sold}</span>
              </div>

              <p className="mt-4 text-sm leading-7 text-zinc-300">
                {selectedProduct.description}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white"
                >
                  เพิ่มลงตะกร้า
                </button>

                <a
                  href={`${facebookPage}?text=${selectedCheckoutMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-red-600 px-4 py-3 text-center text-sm font-bold text-white"
                >
                  ซื้อเลย
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed inset-y-0 right-0 z-[80] flex w-full justify-end bg-black/50 transition ${
          showCart ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setShowCart(false)}
      >
        <div
          className={`h-full w-full max-w-md transform border-l border-white/10 bg-[#0b0b0b] shadow-2xl shadow-black/50 transition-transform duration-300 ${
            showCart ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div>
                <p className="text-lg font-black text-white">ตะกร้าสินค้า</p>
                <p className="text-xs text-zinc-400">ทั้งหมด {cartCount} ชิ้น</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-center">
                  <p className="font-bold text-white">ยังไม่มีสินค้าในตะกร้า</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    เพิ่มสินค้าแล้วกลับมาดูได้ที่นี่
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="rounded-[24px] border border-white/10 bg-white/5 p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-2xl object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/200x200";
                          }}
                        />

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-bold text-white">
                            {item.product.name}
                          </p>
                          <p className="mt-1 text-sm font-bold text-red-400">
                            {formatBaht(item.product.price)}
                          </p>

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-2 py-1">
                              <button
                                onClick={() => updateQty(item.product.id, -1)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="min-w-[20px] text-center text-sm font-bold text-white">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.product.id, 1)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600/15 text-red-400"
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

            <div className="border-t border-white/10 p-4">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">ยอดรวม</span>
                  <span className="font-bold text-white">
                    {formatBaht(cartSubtotal)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-zinc-400">ประหยัด</span>
                  <span className="font-bold text-emerald-400">
                    {formatBaht(cartSavings)}
                  </span>
                </div>
              </div>

              <a
                href={`${facebookPage}?text=${checkoutMessage}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-red-600 px-4 py-3 text-sm font-bold text-white"
              >
                ซื้อเลยผ่าน Messenger
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/80 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <button
            onClick={() => setShowCart(true)}
            className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href={`${facebookPage}?text=${checkoutMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-red-600 px-4 text-sm font-black text-white"
          >
            ซื้อเลย / ทักเพจ
          </a>
        </div>
      </div>
    </div>
  );
}