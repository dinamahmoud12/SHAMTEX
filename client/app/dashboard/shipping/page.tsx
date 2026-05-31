"use client";

import {
  useEffect,
  useState
} from "react";

export default function ShippingPage() {

  const [shipping, setShipping] =
    useState<any[]>([]);

  const [governorate,
    setGovernorate] =
    useState("");

  const [price, setPrice] =
    useState("");

  const governorates = [

  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية",
  "البحر الأحمر",
  "البحيرة",
  "الفيوم",
  "الغربية",
  "الإسماعيلية",
  "المنوفية",
  "المنيا",
  "القليوبية",
  "الوادي الجديد",
  "السويس",
  "اسوان",
  "اسيوط",
  "بني سويف",
  "بورسعيد",
  "دمياط",
  "الشرقية",
  "جنوب سيناء",
  "كفر الشيخ",
  "مطروح",
  "الأقصر",
  "قنا",
  "شمال سيناء",
  "سوهاج",

];

  const addAllGovernorates =
  async () => {

    for (const gov of governorates) {

      await fetch(
        "http://localhost:5000/api/shipping",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            governorate: gov,

            price: 0,

          }),

        }
      );

    }

    loadShipping();

    alert(
      "تم إضافة المحافظات"
    );

  };

  useEffect(() => {

    loadShipping();

  }, []);

  const loadShipping = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/shipping"
      );

      const data = await res.json();

      setShipping(data);

    } catch (error) {

      console.log(error);

    }

  };

  const addShipping = async (
    e: any
  ) => {

    e.preventDefault();

    const res = await fetch(
      "http://localhost:5000/api/shipping",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          governorate,

          price,

        }),

      }
    );

    if (res.ok) {

      setGovernorate("");

      setPrice("");

      loadShipping();

    }

  };

  const updateShipping =
    async (
      id: string,
      newPrice: number
    ) => {

      await fetch(
        `http://localhost:5000/api/shipping/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            price: newPrice,

          }),

        }
      );

      loadShipping();

    };

  return (

    <section className="bg-black min-h-screen py-20 px-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-[#C8A96B] mb-10">

          أسعار الشحن

        </h1>

        <button
          onClick={addAllGovernorates}
          className="bg-[#C8A96B] text-black px-8 py-4 rounded-2xl font-bold text-xl mb-10"
        >

          إضافة كل المحافظات

        </button>

        {/* ADD */}

        <form
          onSubmit={addShipping}
          className="bg-zinc-900 p-8 rounded-3xl mb-10 grid md:grid-cols-3 gap-5"
        >

          <select
            value={governorate}
            onChange={(e) =>
              setGovernorate(
                e.target.value
              )
            }
            className="bg-black p-5 rounded-2xl text-white"
          >

            <option value="">
              اختر المحافظة
            </option>

            {governorates.map((gov) => (

              <option
                key={gov}
                value={gov}
              >
                {gov}
              </option>

            ))}

          </select>

          <input
            type="number"
            placeholder="سعر الشحن"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="bg-black p-5 rounded-2xl text-white"
          />

          <button
            className="bg-[#C8A96B] text-black rounded-2xl font-bold text-xl"
          >
            إضافة
          </button>

        </form>

        {/* SHIPPING */}

        <div className="space-y-5">

          {shipping.map((item) => (

            <div
              key={item._id}
              className="bg-zinc-900 p-6 rounded-3xl flex items-center justify-between"
            >

              <div>

                <h2 className="text-3xl text-white font-bold mb-2">

                  {item.governorate}

                </h2>

                <p className="text-[#C8A96B] text-2xl">

                  {item.price} EGP

                </p>

              </div>

              <input
                type="number"
                defaultValue={item.price}
                onBlur={(e) =>
                  updateShipping(
                    item._id,
                    Number(e.target.value)
                  )
                }
                className="bg-black text-white p-4 rounded-2xl w-40"
              />

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}