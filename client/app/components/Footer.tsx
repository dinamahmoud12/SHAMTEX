"use client";

import { motion } from "framer-motion";

import {
  Phone,
  MapPin,
  Mail,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {

  return (

    <footer
      id="contact"
      className="relative pt-32 pb-10 px-6 overflow-hidden"
    >

      {/* BG */}

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4B06A]/10 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">

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

          className="glass rounded-[40px] p-10 lg:p-16 mb-12"
        >

          <div className="grid lg:grid-cols-4 gap-12">

            {/* BRAND */}

            <div>

              <h2 className="text-5xl font-black text-[#D4B06A] mb-6">

                Sham Tex

              </h2>

              <p className="text-zinc-400 leading-loose text-lg">

                متجر متخصص في المفروشات
                الفاخرة والخامات عالية الجودة
                بأحدث التصميمات العصرية.

              </p>

            </div>

            {/* LINKS */}

            <div>

              <h3 className="text-white text-2xl font-black mb-6">

                روابط سريعة

              </h3>

              <div className="space-y-4">

                <a
                  href="#"
                  className="block text-zinc-400 hover:text-[#D4B06A] transition-all"
                >

                  الرئيسية

                </a>

                <a
                  href="#products"
                  className="block text-zinc-400 hover:text-[#D4B06A] transition-all"
                >

                  المنتجات

                </a>

                <a
                  href="#categories"
                  className="block text-zinc-400 hover:text-[#D4B06A] transition-all"
                >

                  الأقسام

                </a>

              </div>

            </div>

            {/* CONTACT */}

            <div>

              <h3 className="text-white text-2xl font-black mb-6">

                تواصل معنا

              </h3>

              <div className="space-y-5">

                <div className="flex items-center gap-4 text-zinc-400">

                  <Phone />

                  <p>
                    01080691028
                  </p>

                </div>

                <div className="flex items-center gap-4 text-zinc-400">

                  <Mail />

                  <p>
                    shamtex10@gmail.com
                  </p>

                </div>

                <div className="flex items-center gap-4 text-zinc-400">

                  <MapPin />

                  <p>
                    Alexandria, Egypt
                  </p>

                </div>

              </div>

            </div>

            {/* SOCIAL */}

            <div>

              <h3 className="text-white text-2xl font-black mb-6">

                السوشيال

              </h3>

              <div className="flex gap-5">

                {/* INSTAGRAM */}

                <a

                  href="https://www.instagram.com/shamtexstyle/"

                  target="_blank"

                  className="
                    w-16
                    h-16
                    rounded-3xl
                    bg-gradient-to-br
                    from-pink-500
                    via-red-500
                    to-yellow-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-2xl
                    shadow-2xl
                    hover:scale-110
                    hover:rotate-6
                    transition-all
                    duration-500
                  "
                >

                  <FaInstagram />

                </a>

                {/* FACEBOOK */}

                <a

                  href="https://www.facebook.com/profile.php?id=61589015472724"

                  target="_blank"

                  className="
                    w-16
                    h-16
                    rounded-3xl
                    bg-blue-600
                    flex
                    items-center
                    justify-center
                    text-white
                    text-2xl
                    shadow-2xl
                    hover:scale-110
                    hover:-rotate-6
                    transition-all
                    duration-500
                  "
                >

                  <FaFacebookF />

                </a>

                {/* WHATSAPP */}

                <a

                  href="https://wa.me/201080691028"

                  target="_blank"

                  className="
                    w-16
                    h-16
                    rounded-3xl
                    bg-green-500
                    flex
                    items-center
                    justify-center
                    text-white
                    text-2xl
                    shadow-2xl
                    hover:scale-110
                    hover:rotate-6
                    transition-all
                    duration-500
                  "
                >

                  <FaWhatsapp />

                </a>

              </div>

            </div>

          </div>

        </motion.div>

        <div className="text-center text-zinc-500">

          © 2026 Sham Tex — All Rights Reserved

        </div>

      </div>

    </footer>

  );

}
