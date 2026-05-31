"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {

  ShoppingBag,

  Menu,

  Moon,

} from "lucide-react";

import {

  useTheme,

} from "next-themes";

import {

  useState,

} from "react";

export default function Navbar() {

  const {
    theme,
    setTheme,
  } = useTheme();

  const [menu,
    setMenu] =
    useState(false);

  const links = [

    {
      name: "الرئيسية",
      href: "/",
    },

    {
      name: "المنتجات",
      href: "#products",
    },

    {
      name: "الأقسام",
      href: "#categories",
    },

    {
      name: "تواصل",
      href: "#contact",
    },

  ];

  return (

    <motion.nav

      initial={{
        y: -100,
        opacity: 0,
      }}

      animate={{
        y: 0,
        opacity: 1,
      }}

      transition={{
        duration: 0.8,
      }}

      className="fixed top-0 left-0 w-full z-50"
    >

      <div className="max-w-7xl mx-auto px-6 pt-5">

        <div className="glass rounded-[30px] px-7 h-24 flex items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >

            <motion.img

              whileHover={{
                rotate: 10,
                scale: 1.05,
              }}

              src="/logo.png"

              className="w-14 h-14 object-contain"

            />

            <div>

              <h1 className="text-3xl font-black gold-text">

                Sham Tex

              </h1>

              <p className="text-zinc-400 text-sm">

                Luxury Home Collection

              </p>

            </div>

          </Link>

          {/* LINKS */}

          <div className="hidden lg:flex items-center gap-8">

            {links.map((link) => (

              <a

                key={link.name}

                href={link.href}

                className="text-white hover:text-[#C8A96B] transition-all text-lg font-semibold"
              >

                {link.name}

              </a>

            ))}

          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-4">

            {/* THEME */}

            <button

              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }

              className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-white hover:scale-110 transition-all"
            >

              <Moon />

            </button>

            {/* CART */}

            <button
              className="relative w-14 h-14 rounded-2xl gold-btn flex items-center justify-center"
            >

              <ShoppingBag />

              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black text-white text-sm flex items-center justify-center">

                0

              </span>

            </button>

            {/* MOBILE */}

            <button

              onClick={() =>
                setMenu(!menu)
              }

              className="lg:hidden w-14 h-14 rounded-2xl glass flex items-center justify-center text-white"
            >

              <Menu />

            </button>

          </div>

        </div>

        {/* MOBILE MENU */}

        {menu && (

          <motion.div

            initial={{
              opacity: 0,
              y: -20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="glass mt-4 rounded-3xl p-6 lg:hidden"
          >

            <div className="flex flex-col gap-5">

              {links.map((link) => (

                <a

                  key={link.name}

                  href={link.href}

                  onClick={() =>
                    setMenu(false)
                  }

                  className="text-white text-xl font-bold"
                >

                  {link.name}

                </a>

              ))}

            </div>

          </motion.div>

        )}

      </div>

    </motion.nav>

  );

}