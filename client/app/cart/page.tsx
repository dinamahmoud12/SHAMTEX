"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const {
    cartItems: cart,
    removeFromCart,
    increaseQty: increaseQuantity,
    decreaseQty: decreaseQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  const waMessage = cart
    .map(
      (item) =>
        `${item.title} - الكمية: ${item.quantity} - السعر: ${
          item.finalPrice || item.price
        } EGP`
    )
    .join("\n");

  const waLink = `https://wa.me/201080691028?text=${encodeURIComponent(
    `مرحباً، أود تأكيد الطلب:\n\n${waMessage}\n\nالإجمالي: ${totalPrice} EGP`
  )}`;

  return (
    <section className="min-h-screen py-32 px-6 relative overflow-hidden">

      <div className="absolute inset-0 -z-10 bg-[var(--bg)] text-[var(--text)]">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4B06A]/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-16 text-[var(--text)]">
          <div>
            <p className="text-[var(--primary)] text-xl mb-3">سلة التسوق</p>
            <h1 className="text-6xl font-black text-[var(--text)]">Cart</h1>
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 text-[var(--text)] hover:text-[var(--primary)] transition-all"
          >
            <ArrowLeft />
            العودة
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="glass-card rounded-[40px] p-20 text-center">
            <h2 className="text-4xl font-black text-[var(--text)] mb-5">السلة فارغة</h2>
            <p className="text-[var(--muted)] text-xl mb-10">لم تقم بإضافة أي منتجات بعد</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-10 h-16 rounded-3xl bg-[var(--primary)] text-black font-black text-xl"
            >
              ابدأ التسوق
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item._id}-${item.size || "default"}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-[35px] p-6 flex flex-col md:flex-row gap-6 items-center"
                >
                  <div className="relative w-full md:w-44 h-44 rounded-3xl overflow-hidden">
                    <Image
                      src={item.images?.[0] || "/hero-1.webp"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <h2 className="text-3xl font-black text-[var(--text)] mb-4">{item.title}</h2>
                    {item.size && <p className="text-[var(--muted)] text-lg mb-3">المقاس: {item.size}</p>}
                    <p className="text-[var(--primary)] text-2xl font-black mb-6">{(item.finalPrice || item.price)} EGP</p>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => decreaseQuantity(item._id, item.size)}
                        className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-[var(--text)]"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="text-[var(--text)] text-2xl font-black">{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item._id, item.size)}
                        className="w-12 h-12 rounded-2xl bg-[var(--primary)] flex items-center justify-center text-white"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item._id, item.size)}
                    className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:scale-110 transition-all"
                    aria-label="Remove item"
                  >
                    <Trash2 />
                  </button>
                </motion.div>
              ))}
            </div>

            <aside className="glass-card rounded-[40px] p-8 h-fit sticky top-28">
              <h2 className="text-4xl font-black text-[var(--text)] mb-10">ملخص الطلب</h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--muted)] text-xl">إجمالي المنتجات</span>
                  <span className="text-[var(--text)] text-2xl font-bold">{totalPrice} EGP</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--muted)] text-xl">الشحن</span>
                  <span className="text-[var(--text)] text-lg">يتم تحديده لاحقاً</span>
                </div>
              </div>

              <div className="h-px bg-[#E8DDCC] mb-8" />

              <div className="flex items-center justify-between mb-10">
                <span className="text-[var(--text)] text-2xl font-black">الإجمالي</span>
                <span className="text-[var(--primary)] text-4xl font-black">{totalPrice} EGP</span>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-16 rounded-3xl gold-btn text-white font-black text-xl flex items-center justify-center"
              >
                تأكيد الطلب عبر واتساب
              </a>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
