import type { Metadata } from "next";

import {
  Cairo,
  Poppins,
  Cinzel,
} from "next/font/google";

import "./globals.css";

import Providers from "./providers";

import { Toaster } from "react-hot-toast";

import CartProvider from "./context/CartContext";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
  ],
  variable: "--font-poppins",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: [
    "400",
    "600",
    "700",
    "900",
  ],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Sham Tex",
  description: "Luxury Home Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${cairo.variable} ${poppins.variable} ${cinzel.variable}`}
    >

      <body className="bg-black text-white overflow-x-hidden">

        <Providers>

          <CartProvider>

            <Toaster position="top-center" />

            {children}

          </CartProvider>

        </Providers>

      </body>

    </html>

  );

}