"use client";

import {

  useState,

} from "react";

import {

  useRouter,

} from "next/navigation";

import {

  motion,

} from "framer-motion";

import {

  ShieldCheck,

  LockKeyhole,

  Mail,

} from "lucide-react";

import toast from "react-hot-toast";

export default function LoginPage() {

  const router =
    useRouter();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleLogin =
    async (
      e: any
    ) => {

      e.preventDefault();

      setLoading(true);

      try {

        const res =
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/login`,
            {

              method:
                "POST",

              credentials:
                "include",

              headers: {

                "Content-Type":
                  "application/json",

              },

              body: JSON.stringify({

                email,

                password,

              }),

            }

          );

        const data =
          await res.json();

        if (
          data.success
        ) {

          toast.success(
            "تم تسجيل الدخول"
          );

          router.push(
            "/dashboard"
          );

        } else {

          toast.error(
            "بيانات غير صحيحة"
          );

        }

      } catch {

        toast.error(
          "حدث خطأ"
        );

      }

      setLoading(false);

    };

  return (

    <section className="min-h-screen bg-black flex items-center justify-center px-6 overflow-hidden relative">

      {/* BG */}

      <div className="absolute inset-0 opacity-20">

        <div className="absolute top-20 left-20 w-96 h-96 bg-[#D4B06A] rounded-full blur-[180px]" />

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-[180px]" />

      </div>

      {/* CARD */}

      <motion.div

        initial={{
          opacity: 0,
          y: 80,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        className="relative z-10 w-full max-w-xl glass rounded-[40px] p-10 border border-white/10"
      >

        {/* ICON */}

        <div className="w-28 h-28 rounded-[32px] bg-[#D4B06A]/20 flex items-center justify-center mx-auto mb-8">

          <ShieldCheck
            className="text-[#D4B06A]"
            size={60}
          />

        </div>

        {/* TITLE */}

        <h1 className="text-5xl font-black text-white text-center mb-4">

          Admin Login

        </h1>

        <p className="text-zinc-400 text-center text-xl mb-12">

          تسجيل الدخول للوحة التحكم

        </p>

        {/* FORM */}

        <form
          onSubmit={
            handleLogin
          }
          className="space-y-6"
        >

          {/* EMAIL */}

          <div className="relative">

            <Mail
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
              size={24}
            />

            <input

              type="email"

              placeholder="البريد الإلكتروني"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              className="w-full h-16 rounded-2xl bg-black/30 border border-white/10 pr-16 pl-6 text-white outline-none"
            />

          </div>

          {/* PASSWORD */}

          <div className="relative">

            <LockKeyhole
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
              size={24}
            />

            <input

              type="password"

              placeholder="كلمة المرور"

              value={password}

              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }

              className="w-full h-16 rounded-2xl bg-black/30 border border-white/10 pr-16 pl-6 text-white outline-none"
            />

          </div>

          {/* BTN */}

          <button

            disabled={loading}

            className="luxury-btn w-full h-16 rounded-2xl text-2xl font-black"
          >

            {loading
              ? "جاري الدخول..."
              : "تسجيل الدخول"}

          </button>

        </form>

        {/* LOGIN INFO */}

        <div className="mt-10 glass rounded-3xl p-6 text-center">

          <p className="text-zinc-400 mb-2">

            بيانات الدخول الافتراضية

          </p>

          <p className="text-white font-bold">

            admin@shamtex.com

          </p>

          <p className="text-[#D4B06A] font-bold mt-2">

            123456

          </p>

        </div>

      </motion.div>

    </section>

  );

}
