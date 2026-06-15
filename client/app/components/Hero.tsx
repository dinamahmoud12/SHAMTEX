"use client";

import { motion } from "framer-motion";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"] });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-24 bg-[var(--bg)] text-[var(--text)]">

      {/* GOLD LIGHTS */}

      <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[var(--primary)]/15 blur-[180px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--secondary)]/10 blur-[180px] rounded-full" />

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
              bg-[var(--primary)]/10
              border
              border-[var(--primary)]/30
              text-[var(--primary)]
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
            <span className="text-[var(--text)]">
              Sham
            </span>

            <span className="text-[var(--primary)]">
              {" "}Tex
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              text-[var(--muted)]
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
                bg-[var(--primary)]
                text-black
                font-black
                flex
                items-center
                justify-center
                hover:scale-105
                transition-all
                duration-300
                shadow-[0_10px_40px_rgba(199,168,106,.35)]
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
                border-[var(--secondary)]/30
                text-[var(--text)]
                bg-[var(--card)]
                flex
                items-center
                justify-center
                hover:bg-[var(--bg)]
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

          <div className="absolute inset-0 bg-[var(--primary)]/10 blur-3xl -z-10 rounded-full" />

        </motion.div>

      </div>

    </section>
  );
}
