"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

import { useCart } from "@/app/context/CartContext";

export default function CartPage() {

  const {

    cartItems: cart,

    removeFromCart,

    increaseQty: increaseQuantity,

    decreaseQty: decreaseQuantity,

    totalPrice,

  } = useCart();

  return (

    <section className="min-h-screen py-32 px-6 relative overflow-hidden">

      {/* BG */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C8A96B]/20 blur-[140px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[140px] rounded-full" />

      </div>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-16">

          <div>

            <p className="text-[#C8A96B] text-xl mb-3">

              سلة التسوق

            </p>

            <h1 className="text-6xl font-black text-white">

              Cart
            </h1>

          </div>

          <Link

            href="/"

            className="
              flex
              items-center
              gap-3
              text-white
              hover:text-[#C8A96B]
              transition-all
            "
          >

            العودة للرئيسية

            <ArrowLeft />

          </Link>

        </div>

        {/* EMPTY */}

        {cart.length === 0 && (

          <div
            className="
              glass
              rounded-[40px]
              p-20
              text-center
            "
          >

            <ShoppingBag
              size={80}
              className="mx-auto mb-8 text-[#C8A96B]"
            />

            <h2 className="text-4xl font-black text-white mb-5">

              السلة فارغة

            </h2>

            <p className="text-zinc-400 text-xl mb-10">

              لم تقم بإضافة أي منتجات بعد

            </p>

            <Link

              href="/"

              className="
                inline-flex
                items-center
                justify-center
                px-10
                h-16
                rounded-3xl
                bg-[#C8A96B]
                text-black
                font-black
                text-xl
              "
            >

              ابدأ التسوق

            </Link>

          </div>

        )}

        {/* CONTENT */}

        {cart.length > 0 && (

          <div className="grid lg:grid-cols-3 gap-10">

            {/* PRODUCTS */}

            <div className="lg:col-span-2 space-y-6">

              {cart.map((item, index) => (

                <motion.div

                  key={item._id}

                  initial={{
                    opacity: 0,
                    y: 40,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: index * 0.1,
                  }}

                  className="
                    glass
                    rounded-[35px]
                    p-6
                    flex
                    flex-col
                    md:flex-row
                    gap-6
                    items-center
                  "
                >

                  {/* IMAGE */}

                  <img

                    src={item.images?.[0]}

                    alt={item.title}

                    className="
                      w-full
                      md:w-44
                      h-44
                      object-cover
                      rounded-3xl
                    "
                  />

                  {/* INFO */}

                  <div className="flex-1 w-full">

                    <h2 className="text-3xl font-black text-white mb-4">

                      {item.title}

                    </h2>

                    <p className="text-[#C8A96B] text-2xl font-black mb-6">

                      {(item.finalPrice || item.price)} EGP

                    </p>

                    {/* QUANTITY */}

                    <div className="flex items-center gap-4">

                      <button

                        onClick={() =>
                          decreaseQuantity(item._id)
                        }

                        className="
                          w-12
                          h-12
                          rounded-2xl
                          glass
                          flex
                          items-center
                          justify-center
                          text-white
                        "
                      >

                        <Minus size={18} />

                      </button>

                      <span className="text-white text-2xl font-black">

                        {item.quantity}

                      </span>

                      <button

                        onClick={() =>
                          increaseQuantity(item._id)
                        }

                        className="
                          w-12
                          h-12
                          rounded-2xl
                          bg-[#C8A96B]
                          flex
                          items-center
                          justify-center
                          text-black
                        "
                      >

                        <Plus size={18} />

                      </button>

                    </div>

                  </div>

                  {/* REMOVE */}

                  <button

                    onClick={() =>
                      removeFromCart(item._id)
                    }

                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-red-500/10
                      border
                      border-red-500/20
                      flex
                      items-center
                      justify-center
                      text-red-500
                      hover:scale-110
                      transition-all
                    "
                  >

                    <Trash2 />

                  </button>

                </motion.div>

              ))}

            </div>

            {/* SUMMARY */}

            <div
              className="
                glass
                rounded-[40px]
                p-8
                h-fit
                sticky
                top-28
              "
            >

              <h2 className="text-4xl font-black text-white mb-10">

                ملخص الطلب

              </h2>

              <div className="space-y-6 mb-10">

                <div className="flex items-center justify-between">

                  <span className="text-zinc-400 text-xl">

                    إجمالي المنتجات

                  </span>

                  <span className="text-white text-2xl font-bold">

                    {totalPrice} EGP

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-zinc-400 text-xl">

                    الشحن

                  </span>

                  <span className="text-white text-2xl font-bold">

                    يتم تحديده لاحقًا

                  </span>

                </div>

              </div>

              <div className="h-px bg-white/10 mb-8" />

              <div className="flex items-center justify-between mb-10">

                <span className="text-white text-2xl font-black">

                  الإجمالي

                </span>

                <span className="text-[#C8A96B] text-4xl font-black">

                  {totalPrice} EGP

                </span>

              </div>

              <a

                href={`https://wa.me/201080691028?text=مرحباً، أريد تأكيد طلب المنتجات الموجودة في السلة بقيمة ${totalPrice} جنيه`}

                target="_blank"

                className="
                  w-full
                  h-16
                  rounded-3xl
                  bg-[#C8A96B]
                  text-black
                  font-black
                  text-xl
                  flex
                  items-center
                  justify-center
                  shadow-[0_10px_40px_rgba(200,169,107,.35)]
                "
              >

                تأكيد الطلب عبر واتساب

              </a>

            </div>

          </div>

        )}

      </div>

    </section>

  );

}