"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";

export default function FavoritesPage() {
  const {
    wishlistItems,
    toggleWishlist,
  } = useWishlist();

  return (
    <section className="min-h-screen py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#D4B06A]/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-[#D4B06A] text-xl mb-3">المفضلة</p>
            <h1 className="text-6xl font-black text-white">Favorites</h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 text-white hover:text-[#D4B06A] transition-all"
          >
            العودة للرئيسية
            <ArrowLeft />
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="glass rounded-[40px] p-20 text-center">
            <Heart size={80} className="mx-auto mb-8 text-[#D4B06A]" />
            <h2 className="text-4xl font-black text-white mb-5">قائمة المفضلة فارغة</h2>
            <p className="text-zinc-400 text-xl mb-10">
              لم تقم بإضافة أي منتجات للمفضلة بعد.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-10 h-16 rounded-3xl bg-[#D4B06A] text-black font-black text-xl"
            >
              ابدأ التسوق
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div key={item._id} className="glass rounded-[35px] overflow-hidden">
                <div className="relative h-[340px]">
                  <Image
                    src={item.images?.[0] || "/hero-1.webp"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-white text-2xl font-black">{item.title}</h3>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[#D4B06A] hover:bg-[#D4B06A]/20 transition-all"
                    >
                      <Heart size={22} />
                    </button>
                  </div>
                  <p className="text-[#D4B06A] text-3xl font-black">{item.price} EGP</p>
                  <Link
                    href={`/product/${item._id}`}
                    className="inline-flex items-center justify-center w-full h-14 rounded-3xl bg-[#D4B06A] text-black font-black text-lg"
                  >
                    عرض المنتج
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

