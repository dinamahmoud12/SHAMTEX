"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import Link from "next/link";

import {
  motion,
} from "framer-motion";

import {
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
  Heart,
  Check,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

import { useCart } from "@/app/context/CartContext";

interface Product {

  _id: string;

  title: string;

  price: number;

  finalPrice?: number;

  oldPrice?: number;

  description: string;

  images: string[];

  category: string;

}

export default function ProductPage() {

  const params = useParams();

  const [product,
    setProduct] =
    useState<Product | null>(
      null
    );

  const [products,
    setProducts] =
    useState<Product[]>([]);

  const [mainImage,
    setMainImage] =
    useState("");

  const [selectedSize,
    setSelectedSize] =
    useState("Large");

  const { addToCart } =
    useCart();

  useEffect(() => {

    fetch(
      `http://localhost:5000/api/products/${params.id}`
    )

      .then((res) =>
        res.json()
      )

      .then((data) => {

        setProduct(data);

        setMainImage(
          data.images?.[0]
        );

        fetch(
          "http://localhost:5000/api/products"
        )

          .then((res) =>
            res.json()
          )

          .then((allProducts) => {

            const related =
              allProducts.filter(
                (item: Product) =>
                  item.category === data.category &&
                  item._id !== data._id
              );

            setProducts(related);

          });

      });

  }, []);

  if (!product) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-black">

        <div className="text-4xl font-black text-[#C8A96B] animate-pulse">

          جاري تحميل المنتج...

        </div>

      </div>

    );

  }

  return (

    <section className="relative min-h-screen py-32 px-6 overflow-hidden">

      {/* BACKGROUND */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C8A96B]/15 blur-[160px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 blur-[160px] rounded-full" />

      </div>

      {/* MAIN */}

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">

        {/* IMAGES */}

        <motion.div

          initial={{
            opacity: 0,
            x: -80,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.8,
          }}
        >

          <div
            className="
              relative
              rounded-[40px]
              overflow-hidden
              border
              border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
            "
          >

            <motion.img

              key={mainImage}

              initial={{
                opacity: 0,
                scale: 1.1,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              transition={{
                duration: 0.5,
              }}

              src={
                mainImage ||
                "/hero-1.webp"
              }

              className="
                w-full
                h-[750px]
                object-cover
                hover:scale-110
                transition-all
                duration-1000
              "
            />

            <div className="absolute top-6 right-6">

              <div className="bg-[#C8A96B] text-black px-5 py-3 rounded-full font-black">

                الأكثر مبيعًا

              </div>

            </div>

            <button
              className="
                absolute
                top-6
                left-6
                w-14
                h-14
                rounded-2xl
                bg-black/30
                backdrop-blur-xl
                border
                border-white/10
                flex
                items-center
                justify-center
                text-white
                hover:bg-[#C8A96B]
                hover:text-black
                transition-all
              "
            >

              <Heart size={24} />

            </button>

          </div>

          {/* THUMBNAILS */}

          <div className="flex gap-4 mt-6 overflow-auto pb-2">

            {product.images?.map(
              (img, index) => (

                <motion.img

                  whileHover={{
                    scale: 1.06,
                  }}

                  key={index}

                  src={img}

                  onClick={() =>
                    setMainImage(img)
                  }

                  className={`

                    w-28
                    h-28
                    object-cover
                    rounded-3xl
                    cursor-pointer
                    transition-all
                    duration-300
                    border-2

                    ${
                      mainImage === img

                        ? "border-[#C8A96B] scale-105"

                        : "border-white/10 opacity-70 hover:opacity-100"
                    }

                  `}
                />

              )
            )}

          </div>

        </motion.div>

        {/* DETAILS */}

        <motion.div

          initial={{
            opacity: 0,
            x: 80,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          transition={{
            duration: 0.8,
          }}

          className="flex flex-col justify-center"
        >

          <div className="mb-6">

            <span
              className="
                inline-flex
                items-center
                gap-2
                px-5
                py-2
                rounded-full
                bg-[#C8A96B]/10
                border
                border-[#C8A96B]/20
                text-[#C8A96B]
                font-bold
              "
            >

              <Sparkles size={18} />

              {product.category}

            </span>

          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight mb-8">

            {product.title}

          </h1>

          <div className="flex items-center gap-2 mb-8">

            {[1,2,3,4,5].map((i) => (

              <Star
                key={i}
                className="text-[#C8A96B] fill-[#C8A96B]"
                size={22}
              />

            ))}

            <span className="text-zinc-400 mr-3 text-lg">

              تقييم 4.9

            </span>

          </div>

          <div className="flex items-center gap-5 mb-10">

            <p className="text-[#C8A96B] text-5xl font-black">

              {product.finalPrice ||
                product.price} EGP

            </p>

            {product.oldPrice && (

              <p className="text-zinc-500 line-through text-3xl">

                {product.oldPrice} EGP

              </p>

            )}

          </div>

          <p className="text-zinc-300 text-xl leading-loose mb-12">

            {product.description}

          </p>

          {/* SIZES */}

          <div className="mb-12">

            <h3 className="text-white text-2xl font-black mb-5">

              اختر المقاس

            </h3>

            <div className="flex flex-wrap gap-4">

              {["Small", "Medium", "Large", "XL"].map((size) => (

                <button

                  key={size}

                  onClick={() =>
                    setSelectedSize(size)
                  }

                  className={`

                    px-7
                    h-14
                    rounded-2xl
                    border
                    transition-all
                    duration-300
                    font-bold

                    ${
                      selectedSize === size

                        ? "bg-[#C8A96B] text-black border-[#C8A96B] scale-105"

                        : "border-white/10 text-white hover:border-[#C8A96B]"
                    }

                  `}
                >

                  {size}

                </button>

              ))}

            </div>

          </div>

          {/* FEATURES */}

          <div className="grid sm:grid-cols-3 gap-5 mb-14">

            <div className="glass p-6 rounded-3xl text-center">

              <Truck
                className="mx-auto mb-4 text-[#C8A96B]"
                size={34}
              />

              <p className="text-white font-bold">

                شحن سريع

              </p>

            </div>

            <div className="glass p-6 rounded-3xl text-center">

              <ShieldCheck
                className="mx-auto mb-4 text-[#C8A96B]"
                size={34}
              />

              <p className="text-white font-bold">

                جودة مضمونة

              </p>

            </div>

            <div className="glass p-6 rounded-3xl text-center">

              <Check
                className="mx-auto mb-4 text-[#C8A96B]"
                size={34}
              />

              <p className="text-white font-bold">

                خامات فاخرة

              </p>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-5">

            <motion.a

              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.97,
              }}

              href={`https://wa.me/201080691028?text=أريد طلب ${product.title}`}

              target="_blank"

              className="
                flex-1
                h-16
                rounded-3xl
                bg-[#C8A96B]
                text-black
                text-2xl
                font-black
                flex
                items-center
                justify-center
                gap-3
              "
            >

              اطلب الآن

              <ShoppingBag size={24} />

            </motion.a>

            <motion.button

              whileHover={{
                scale: 1.03,
              }}

              whileTap={{
                scale: 0.97,
              }}

              onClick={() =>
                addToCart(product)
              }

              className="
                flex-1
                h-16
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                text-white
                text-2xl
                font-bold
              "
            >

              إضافة للسلة

            </motion.button>

          </div>

        </motion.div>

      </div>

      {/* RELATED PRODUCTS */}

      {products.length > 0 && (

        <div className="max-w-7xl mx-auto mt-40">

          <div className="text-center mb-20">

            <p className="text-[#C8A96B] text-xl mb-4 font-semibold">

              منتجات مشابهة

            </p>

            <h2 className="text-6xl font-black text-white mb-6">

              قد يعجبك أيضًا

            </h2>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            {products.slice(0,4).map((item, index) => (

              <motion.div

                key={item._id}

                initial={{
                  opacity: 0,
                  y: 80,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: index * 0.1,
                }}

                viewport={{
                  once: true,
                }}

                className="group glass rounded-[35px] overflow-hidden hover-card"
              >

                <div className="relative overflow-hidden">

                  <img

                    src={item.images?.[0]}

                    className="w-full h-[420px] object-cover group-hover:scale-110 transition-all duration-700"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-white text-2xl font-black mb-4 line-clamp-1">

                    {item.title}

                  </h3>

                  <p className="text-[#C8A96B] text-3xl font-black mb-6">

                    {item.price} EGP

                  </p>

                  <Link

                    href={`/product/${item._id}`}

                    className="
                      h-14
                      rounded-2xl
                      bg-[#C8A96B]
                      text-black
                      font-black
                      flex
                      items-center
                      justify-center
                      gap-3
                      hover:scale-105
                      transition-all
                    "
                  >

                    عرض المنتج

                    <ArrowLeft size={20} />

                  </Link>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      )}

    </section>

  );

}