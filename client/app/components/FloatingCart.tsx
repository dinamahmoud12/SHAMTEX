"use client";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function FloatingCart() {

  const [open,
    setOpen] =
    useState(false);

  const {
    cartItems,
    totalItems,
    totalPrice,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  return (

    <>

      {/* FLOATING BUTTON */}

      <motion.button

        whileHover={{
          scale: 1.08,
        }}

        whileTap={{
          scale: 0.95,
        }}

        onClick={() =>
          setOpen(true)
        }

        className="fixed bottom-8 left-8 z-[999] w-20 h-20 rounded-full luxury-btn flex items-center justify-center shadow-2xl"
      >

        <ShoppingBag
          size={32}
        />

        {totalItems > 0 && (

          <span className="absolute -top-2 -right-2 bg-white text-black text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">

            {totalItems}

          </span>

        )}

      </motion.button>

      {/* DRAWER */}

      <AnimatePresence>

        {open && (

          <>

            {/* OVERLAY */}

            <motion.div

              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              exit={{
                opacity: 0,
              }}

              onClick={() =>
                setOpen(false)
              }

              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
            />

            {/* SIDEBAR */}

            <motion.div

              initial={{
                x: -500,
              }}

              animate={{
                x: 0,
              }}

              exit={{
                x: -500,
              }}

              transition={{
                type: "spring",
                damping: 25,
              }}

              className="fixed top-0 left-0 h-screen w-full sm:w-[500px] glass z-[999] p-8 overflow-y-auto"
            >

              {/* HEADER */}

              <div className="flex items-center justify-between mb-10">

                <h2 className="text-4xl font-black text-white">

                  سلة التسوق

                </h2>

                <button

                  onClick={() =>
                    setOpen(false)
                  }

                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white"
                >

                  <X />

                </button>

              </div>

              {/* EMPTY */}

              {cartItems.length === 0 && (

                <div className="h-[70vh] flex items-center justify-center text-zinc-400 text-xl">

                  السلة فارغة

                </div>

              )}

              {/* ITEMS */}

              <div className="space-y-6">

                {cartItems.map((item) => (

                  <div

                    key={`${item._id}-${item.size || "default"}`}

                    className="glass rounded-3xl p-5 flex gap-5"
                  >

                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden">
                      <Image
                        src={item.images?.[0] || "/hero-1.webp"}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div className="flex-1">

                      <h3 className="text-white text-xl font-bold mb-3">

                        {item.title}

                      </h3>

                      {item.size && (
                        <p className="text-zinc-400 mb-2">
                          المقاس: {item.size}
                        </p>
                      )}

                      <p className="text-[#D4B06A] text-2xl font-black mb-4">

                        {(item.finalPrice || item.price) *
                          (item.quantity || 1)} EGP

                      </p>

                      {/* QUANTITY */}

                      <div className="flex items-center gap-3">

                        <button

                          onClick={() =>
                            decreaseQty(
                              item._id,
                              item.size
                            )
                          }

                          className="w-10 h-10 rounded-xl glass text-white flex items-center justify-center"
                        >

                          <Minus size={18} />

                        </button>

                        <span className="text-white text-lg font-bold">

                          {item.quantity}

                        </span>

                        <button

                          onClick={() =>
                            increaseQty(
                              item._id,
                              item.size
                            )
                          }

                          className="w-10 h-10 rounded-xl glass text-white flex items-center justify-center"
                        >

                          <Plus size={18} />

                        </button>

                        <button

                          onClick={() =>
                            removeFromCart(
                              item._id,
                              item.size
                            )
                          }

                          className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mr-auto"
                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

              {/* FOOTER */}

              {cartItems.length > 0 && (

                <div className="mt-10 pt-8 border-t border-white/10">

                  <div className="flex items-center justify-between mb-8">

                    <p className="text-zinc-400 text-xl">

                      الإجمالي

                    </p>

                    <h3 className="text-[#D4B06A] text-4xl font-black">

                      {totalPrice} EGP

                    </h3>

                  </div>

                  <Link

                    href="/checkout"

                    onClick={() =>
                      setOpen(false)
                    }

                    className="luxury-btn w-full py-5 rounded-3xl text-center text-2xl font-bold block"
                  >

                    إتمام الطلب

                  </Link>

                </div>

              )}

            </motion.div>

          </>

        )}

      </AnimatePresence>

    </>

  );

}
