"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  motion,
} from "framer-motion";

import {
  ShoppingBag,
  Heart,
  Eye,
  Star,
} from "lucide-react";

interface Product {

  _id: string;

  title: string;

  price: number;

  oldPrice?: number;

  images: string[];

  category?: string;

}

export default function Products() {

  const [products,
    setProducts] =
    useState<Product[]>([]);

  useEffect(() => {

    fetch(
      "http://localhost:5000/api/products"
    )

      .then((res) =>
        res.json()
      )

      .then((data) => {

        if (
          Array.isArray(data)
        ) {

          setProducts(data);

        }

      })

      .catch((err) =>
        console.log(err)
      );

  }, []);

  return (

    <section
      id="products"
      className="relative py-32 px-6 overflow-hidden"
    >

      {/* BG EFFECTS */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#C8A96B]/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}

        <motion.div

          initial={{
            opacity: 0,
            y: 50,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.8,
          }}

          className="text-center mb-24"
        >

          <span className="inline-block px-6 py-2 rounded-full bg-[#C8A96B]/10 border border-[#C8A96B]/20 text-[#C8A96B] font-bold mb-6">

            SHAM TEX COLLECTION

          </span>

          <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">

            منتجات مختارة
            <span className="text-[#C8A96B]">

              {" "}بعناية

            </span>

          </h2>

          <p className="text-zinc-400 text-xl max-w-3xl mx-auto leading-loose">

            اكتشف تشكيلة من المفروشات الراقية
            المصممة لتمنح منزلك إحساسًا بالفخامة
            والدفء مع خامات عالية الجودة
            وتصميمات عصرية فريدة.

          </p>

        </motion.div>

        {/* PRODUCTS GRID */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {products.map((product, index) => (

            <motion.div

              key={product._id}

              initial={{
                opacity: 0,
                y: 100,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                delay: index * 0.1,
                duration: 0.7,
              }}

              className="
                group
                relative
                rounded-[35px]
                overflow-hidden
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-2xl
                hover:-translate-y-4
                transition-all
                duration-700
                shadow-[0_10px_40px_rgba(0,0,0,.35)]
                hover:shadow-[0_20px_60px_rgba(200,169,107,.2)]
              "
            >

              {/* TOP BADGE */}

              <div className="absolute top-5 right-5 z-20">

                <div className="bg-[#C8A96B] text-black text-sm font-black px-4 py-2 rounded-full shadow-2xl">

                  جديد

                </div>

              </div>

              {/* IMAGE */}

              <div className="relative h-[420px] overflow-hidden">

                <img

                  src={product.images?.[0]}

                  alt={product.title}

                  className="
                    w-full
                    h-full
                    object-cover
                    transition-all
                    duration-1000
                    group-hover:scale-110
                    group-hover:rotate-1
                  "
                />

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* GLOW */}

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-[#C8A96B]/10" />

                {/* ACTIONS */}

                <div className="absolute top-5 left-5 flex flex-col gap-3 z-20">

                  <button
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white/10
                      backdrop-blur-xl
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      text-white
                      hover:bg-[#C8A96B]
                      hover:text-black
                      hover:scale-110
                      transition-all
                    "
                  >

                    <Heart size={20} />

                  </button>

                  <button
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white/10
                      backdrop-blur-xl
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      text-white
                      hover:bg-[#C8A96B]
                      hover:text-black
                      hover:scale-110
                      transition-all
                    "
                  >

                    <Eye size={20} />

                  </button>

                </div>

                {/* CATEGORY */}

                <div className="absolute bottom-5 right-5 z-20">

                  <span className="px-5 py-2 rounded-full bg-black/40 backdrop-blur-xl text-white text-sm border border-white/10">

                    {product.category || "Luxury"}

                  </span>

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-7">

                {/* RATING */}

                <div className="flex items-center gap-1 mb-4">

                  {[1, 2, 3, 4, 5].map((item) => (

                    <Star
                      key={item}
                      size={16}
                      className="fill-[#C8A96B] text-[#C8A96B]"
                    />

                  ))}

                </div>

                {/* TITLE */}

                <h3 className="text-white text-3xl font-black mb-5 line-clamp-1 group-hover:text-[#C8A96B] transition-all">

                  {product.title}

                </h3>

                {/* PRICE */}

                <div className="flex items-center gap-4 mb-8">

                  <p className="text-[#C8A96B] text-3xl font-black">

                    {product.price} EGP

                  </p>

                  {product.oldPrice && (

                    <p className="text-zinc-500 line-through text-lg">

                      {product.oldPrice} EGP

                    </p>

                  )}

                </div>

                {/* BUTTONS */}

                <div className="flex gap-3">

                  <Link

                    href={`/product/${product._id}`}

                    className="
                      flex-1
                      h-14
                      rounded-2xl
                      bg-[#C8A96B]
                      text-black
                      font-black
                      flex
                      items-center
                      justify-center
                      gap-3
                      hover:scale-[1.03]
                      transition-all
                      duration-300
                    "
                  >

                    عرض المنتج

                    <ShoppingBag size={20} />

                  </Link>

                  <a

                    href="https://wa.me/201080691028"

                    target="_blank"

                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      text-white
                      hover:bg-[#25D366]
                      hover:border-[#25D366]
                      hover:scale-110
                      transition-all
                      duration-300
                    "
                  >

                    <ShoppingBag size={20} />

                  </a>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

}