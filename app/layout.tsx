import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-thai",
});

export const metadata: Metadata = {
  title: "Lotus Store",
  description: "Mobile Game & App Shop",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} ${notoThai.variable}`}>
      <body className="font-sans bg-[#050505] text-white">
        {children}
      </body>
    </html>
  );
}