"use client";

import {

  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  useCart,

} from "../context/CartContext";

import toast from "react-hot-toast";

export default function CheckoutPage() {

  const {

    cartItems: cart,

    totalPrice,

  } = useCart();

  const [name,
    setName] =
    useState("");

  const [phone,
    setPhone] =
    useState("");

  const [city,
    setCity] =
    useState("");

  const [address,
    setAddress] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const shippingPrices: any = {

    "القاهرة": 80,

    "الجيزة": 80,

    "الإسكندرية": 90,

    "البحيرة": 100,

    "مطروح": 120,

    "كفر الشيخ": 100,

    "الغربية": 100,

    "المنوفية": 100,

    "الدقهلية": 100,

    "الشرقية": 100,

    "بورسعيد": 120,

    "الإسماعيلية": 120,

    "السويس": 120,

    "دمياط": 100,

    "شمال سيناء": 150,

    "جنوب سيناء": 150,

    "بني سويف": 120,

    "الفيوم": 120,

    "المنيا": 140,

    "أسيوط": 150,

    "سوهاج": 160,

    "قنا": 170,

    "الأقصر": 180,

    "أسوان": 200,

    "البحر الأحمر": 200,

    "الوادي الجديد": 220,

  };

  const shipping =
    shippingPrices[city] || 0;

  const finalTotal =
    totalPrice + shipping;

  const handleOrder =
    async () => {

      if (
        !name ||
        !phone ||
        !city ||
        !address
      ) {

        toast.error(
          "من فضلك املأ جميع البيانات"
        );

        return;

      }

      setLoading(true);

      const orderData = {

        customerName: name,

        phone,

        city,

        address,

        products: cart,

        shippingPrice:
          shipping,

        totalPrice:
          finalTotal,

      };

      try {

        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/orders`,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              orderData
            ),

          }
        );

        const productsText =
          cart.map(
            (item) =>

              `• ${item.title}
الكمية: ${item.quantity}
السعر: ${
  (item.finalPrice ||
    item.price) *
  (item.quantity || 1)
} جنيه`

          ).join("\n\n");

        const whatsappMessage = `

طلب جديد 🛍️

الاسم: ${name}

الهاتف: ${phone}

المحافظة: ${city}

العنوان: ${address}

------------------

${productsText}

------------------

الشحن: ${shipping} جنيه

الإجمالي: ${finalTotal} جنيه

`;

        window.open(

          `https://wa.me/201080691028?text=${encodeURIComponent(
            whatsappMessage
          )}`

        );

        toast.success(
          "تم إرسال الطلب بنجاح"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "حدث خطأ"
        );

      }

      setLoading(false);

    };

  return (

    <section className="min-h-screen py-32 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        {/* FORM */}

        <motion.div

          initial={{
            opacity: 0,
            x: 50,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          className="glass rounded-[40px] p-10"
        >

          <h1 className="text-5xl font-black text-white mb-10">

            إتمام الطلب

          </h1>

          <div className="space-y-6">

            <input

              type="text"

              placeholder="الاسم الكامل"

              value={name}

              onChange={(e) =>
                setName(
                  e.target.value
                )
              }

              className="w-full h-16 rounded-2xl bg-black/30 border border-white/10 px-6 text-white outline-none"
            />

            <input

              type="text"

              placeholder="رقم الهاتف"

              value={phone}

              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }

              className="w-full h-16 rounded-2xl bg-black/30 border border-white/10 px-6 text-white outline-none"
            />

            <select

              value={city}

              onChange={(e) =>
                setCity(
                  e.target.value
                )
              }

              className="w-full h-16 rounded-2xl bg-black/30 border border-white/10 px-6 text-white outline-none"
            >

              <option value="">

                اختر المحافظة

              </option>

              {Object.keys(
                shippingPrices
              ).map((city) => (

                <option
                  key={city}
                  value={city}
                >

                  {city}

                </option>

              ))}

            </select>

            <textarea

              placeholder="العنوان بالتفصيل"

              value={address}

              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }

              className="w-full h-40 rounded-2xl bg-black/30 border border-white/10 p-6 text-white outline-none"
            />

            <button

              onClick={handleOrder}

              disabled={loading}

              className="luxury-btn w-full py-5 rounded-3xl text-2xl font-bold"
            >

              {loading
                ? "جاري الإرسال..."
                : "تأكيد الطلب"}

            </button>

          </div>

        </motion.div>

        {/* SUMMARY */}

        <motion.div

          initial={{
            opacity: 0,
            x: -50,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          className="glass rounded-[40px] p-10 h-fit"
        >

          <h2 className="text-4xl font-black text-white mb-10">

            ملخص الطلب

          </h2>

          <div className="space-y-5">

            {cart.map((item) => (

              <div

                key={item._id}

                className="flex items-center gap-4 border-b border-white/10 pb-5"
              >

                <img

                  src={item.images?.[0]}

                  className="w-24 h-24 rounded-2xl object-cover"
                />

                <div className="flex-1">

                  <h3 className="text-white text-xl font-bold">

                    {item.title}

                  </h3>

                  <p className="text-zinc-400">

                    الكمية:
                    {item.quantity}

                  </p>

                </div>

                <p className="text-[#D4B06A] text-2xl font-black">

                  {(item.finalPrice ||
                    item.price) *
                    (item.quantity || 1)} EGP

                </p>

              </div>

            ))}

          </div>

          {/* TOTALS */}

          <div className="mt-10 space-y-5">

            <div className="flex justify-between text-xl">

              <span className="text-zinc-400">

                المنتجات

              </span>

              <span className="text-white">

                {totalPrice} EGP

              </span>

            </div>

            <div className="flex justify-between text-xl">

              <span className="text-zinc-400">

                الشحن

              </span>

              <span className="text-white">

                {shipping} EGP

              </span>

            </div>

            <div className="flex justify-between text-3xl font-black border-t border-white/10 pt-5">

              <span className="text-white">

                الإجمالي

              </span>

              <span className="text-[#D4B06A]">

                {finalTotal} EGP

              </span>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}
