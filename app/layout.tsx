import "./globals.css";
import type { Metadata } from "next";

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
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
