"use client";

import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24">

      {/* GOLD LIGHTS */}

      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#C8A96B]/20 blur-[180px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[180px] rounded-full" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

        {/* CONTENT */}

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
            duration: 1,
          }}
        >
          {/* BADGE */}

          <span
            className="
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              bg-[#C8A96B]/10
              border
              border-[#C8A96B]/30
              text-[#C8A96B]
              font-bold
              tracking-widest
              mb-8
            "
          >
            PREMIUM HOME COLLECTION
          </span>

          {/* TITLE */}

          <h1
            className={`
              ${cinzel.className}
              text-7xl
              lg:text-[130px]
              font-bold
              leading-none
              mb-8
              tracking-[0.15em]
            `}
          >
            <span className="text-white">
              Sham
            </span>

            <span className="text-[#C8A96B]">
              {" "}Tex
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              text-zinc-400
              text-xl
              lg:text-2xl
              leading-loose
              mb-12
              max-w-2xl
            "
          >
            لأن بيتك يستاهل الأفضل…
            مفروشات تجمع بين الراحة،
            الأناقة، والجودة في كل تفصيلة.
          </p>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-5">

            <a
              href="#products"
              className="
                px-10
                h-16
                rounded-2xl
                bg-[#C8A96B]
                text-black
                font-black
                flex
                items-center
                justify-center
                hover:scale-105
                transition-all
                duration-300
                shadow-2xl
              "
            >
              تسوق الآن
            </a>

            <a
              href="#categories"
              className="
                px-10
                h-16
                rounded-2xl
                border
                border-white/10
                text-white
                flex
                items-center
                justify-center
                hover:bg-white/5
                transition-all
                duration-300
              "
            >
              استكشف الأقسام
            </a>

          </div>

        </motion.div>

        {/* IMAGES */}

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
            duration: 1,
          }}
          className="relative"
        >

          <div className="grid grid-cols-2 gap-5">

            <motion.img
              src="/hero-1.webp"
              alt="hero"
              className="
                w-full
                h-[300px]
                object-cover
                rounded-[35px]
                shadow-2xl
              "
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />

            <motion.img
              src="/hero-2.webp"
              alt="hero"
              className="
                w-full
                h-[420px]
                object-cover
                rounded-[35px]
                shadow-2xl
                mt-10
              "
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
            />

            <motion.img
              src="/hero-3.webp"
              alt="hero"
              className="
                w-full
                h-[420px]
                object-cover
                rounded-[35px]
                shadow-2xl
                -mt-10
              "
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
              }}
            />

            <motion.img
              src="/hero-4.webp"
              alt="hero"
              className="
                w-full
                h-[300px]
                object-cover
                rounded-[35px]
                shadow-2xl
              "
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />

          </div>

          {/* GLOW */}

          <div className="absolute inset-0 bg-[#C8A96B]/5 blur-3xl -z-10 rounded-full" />

        </motion.div>

      </div>

    </section>
  );
}