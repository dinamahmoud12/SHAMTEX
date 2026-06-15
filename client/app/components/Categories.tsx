"use client";

import { motion } from "framer-motion";

const categories = [

  {
    title: "مفارش تركي",
    image: "/cat-1.webp",
  },

  {
    title: "ملايات",
    image: "/cat-2.webp",
  },

  {
    title: "بطاطين",
    image: "/cat-3.webp",
  },

  {
    title: "ألحفه",
    image: "/cat-4.webp",
  },

  {
    title: "أطقم سفرة",
    image: "/cat-5.webp",
  },

  {
    title: "مناشف",
    image: "/cat-6.webp",
  },

];

export default function Categories() {

  return (

    <section
      id="categories"
      className="relative py-32 px-6"
    >

      {/* LIGHT */}

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4B06A]/10 blur-[140px] rounded-full" />

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

          className="text-center mb-20"
        >

          <p className="text-[#D4B06A] text-xl mb-4 font-semibold">

            الأقسام

          </p>

          <h2 className="text-6xl font-black text-white mb-6">

            أقسام المنتجات

          </h2>

          <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-loose">

            اكتشف تشكيلات متنوعة من
            المفروشات والخامات الفاخرة
            المناسبة لكل منزل عصري.

          </p>

        </motion.div>

        {/* GRID */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {categories.map((
            category,
            index
          ) => (

            <motion.div

              key={category.title}

              initial={{
                opacity: 0,
                y: 60,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                delay:
                  index * 0.1,
              }}

              className="group relative overflow-hidden rounded-[35px] h-[420px] hover-card glass"
            >

              {/* IMAGE */}

              <img

                src={category.image}

                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"

              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* CONTENT */}

              <div className="absolute bottom-0 left-0 w-full p-8">

                <div className="glass rounded-3xl p-6">

                  <h3 className="text-white text-4xl font-black mb-3">

                    {category.title}

                  </h3>

                  <p className="text-zinc-300 leading-loose">

                    خامات فاخرة وتصميمات
                    عصرية تضيف لمسة
                    أناقة وراحة لمنزلك.

                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

}
