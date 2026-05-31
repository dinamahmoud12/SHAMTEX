"use client";

import {

  useEffect,

  useMemo,

  useState,

} from "react";

import {

  motion,

} from "framer-motion";

import {

  Package,

  Truck,

  CheckCircle2,

  Clock3,

  Trash2,

  Phone,

  MapPin,

  Wallet,

} from "lucide-react";

import toast from "react-hot-toast";

export default function OrdersPage() {

  const [orders,
    setOrders] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders =
    async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/orders"
        );

        const data =
          await res.json();

        setOrders(data);

      } catch (error) {

        console.log(error);

      }

      setLoading(false);

    };

  /* UPDATE STATUS */

  const updateStatus =
    async (
      id: string,
      status: string
    ) => {

      try {

        await fetch(
          `http://localhost:5000/api/orders/${id}`,
          {

            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status,
            }),

          }
        );

        toast.success(
          "تم تحديث الحالة"
        );

        loadOrders();

      } catch (error) {

        console.log(error);

      }

    };

  /* DELETE */

  const deleteOrder =
    async (
      id: string
    ) => {

      const confirmDelete =
        confirm(
          "هل تريد حذف الطلب؟"
        );

      if (
        !confirmDelete
      ) return;

      try {

        await fetch(
          `http://localhost:5000/api/orders/${id}`,
          {
            method: "DELETE",
          }
        );

        toast.success(
          "تم حذف الطلب"
        );

        loadOrders();

      } catch (error) {

        console.log(error);

      }

    };

  /* ANALYTICS */

  const totalRevenue =
    useMemo(() => {

      return orders.reduce(

        (
          acc,
          order
        ) =>

          acc +
          (order.totalPrice || 0),

        0

      );

    }, [orders]);

  const deliveredOrders =
    orders.filter(
      (o) =>
        o.status ===
        "تم التسليم"
    ).length;

  const shippingOrders =
    orders.filter(
      (o) =>
        o.status ===
        "تم الشحن"
    ).length;

  const pendingOrders =
    orders.filter(
      (o) =>
        o.status ===
        "جديد"
    ).length;

  const stats = [

    {

      title:
        "إجمالي الطلبات",

      value:
        orders.length,

      icon:
        Package,

    },

    {

      title:
        "إجمالي الأرباح",

      value:
        `${totalRevenue} EGP`,

      icon:
        Wallet,

    },

    {

      title:
        "تم الشحن",

      value:
        shippingOrders,

      icon:
        Truck,

    },

    {

      title:
        "تم التسليم",

      value:
        deliveredOrders,

      icon:
        CheckCircle2,

    },

  ];

  return (

    <section className="min-h-screen py-20 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-14">

          <h1 className="text-6xl font-black text-white mb-4">

            إدارة الطلبات

          </h1>

          <p className="text-zinc-400 text-xl">

            متابعة وإدارة جميع طلبات العملاء

          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">

          {stats.map((
            stat,
            index
          ) => {

            const Icon =
              stat.icon;

            return (

              <motion.div

                key={stat.title}

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    index * 0.1,
                }}

                className="glass rounded-[32px] p-8 border border-white/10"
              >

                <div className="flex items-center justify-between mb-6">

                  <div className="w-16 h-16 rounded-2xl bg-[#C8A96B]/20 flex items-center justify-center">

                    <Icon
                      className="text-[#C8A96B]"
                      size={32}
                    />

                  </div>

                </div>

                <h3 className="text-zinc-400 text-lg mb-3">

                  {stat.title}

                </h3>

                <p className="text-white text-4xl font-black">

                  {stat.value}

                </p>

              </motion.div>

            );

          })}

        </div>

        {/* LOADING */}

        {loading && (

          <div className="text-center text-white text-3xl py-20">

            جاري تحميل الطلبات...

          </div>

        )}

        {/* ORDERS */}

        <div className="space-y-8">

          {orders.map((
            order,
            index
          ) => (

            <motion.div

              key={order._id}

              initial={{
                opacity: 0,
                y: 50,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay:
                  index * 0.05,
              }}

              className="glass rounded-[40px] p-8 border border-white/10"
            >

              {/* TOP */}

              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-10">

                {/* CUSTOMER */}

                <div>

                  <h2 className="text-4xl font-black text-white mb-5">

                    {order.customerName}

                  </h2>

                  <div className="space-y-3">

                    <div className="flex items-center gap-3 text-zinc-400">

                      <Phone size={18} />

                      <span>

                        {order.phone}

                      </span>

                    </div>

                    <div className="flex items-center gap-3 text-zinc-400">

                      <MapPin size={18} />

                      <span>

                        {order.city}

                      </span>

                    </div>

                  </div>

                </div>

                {/* TOTAL */}

                <div>

                  <p className="text-zinc-400 mb-3">

                    إجمالي الطلب

                  </p>

                  <h3 className="text-[#C8A96B] text-5xl font-black">

                    {order.totalPrice} EGP

                  </h3>

                </div>

                {/* STATUS */}

                <div className="w-full xl:w-[280px]">

                  <p className="text-zinc-400 mb-4">

                    حالة الطلب

                  </p>

                  <select

                    value={order.status}

                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }

                    className="w-full h-16 rounded-2xl bg-black/30 border border-white/10 px-5 text-white outline-none"
                  >

                    <option value="جديد">

                      جديد

                    </option>

                    <option value="جاري التجهيز">

                      جاري التجهيز

                    </option>

                    <option value="تم الشحن">

                      تم الشحن

                    </option>

                    <option value="تم التسليم">

                      تم التسليم

                    </option>

                  </select>

                </div>

              </div>

              {/* PRODUCTS */}

              <div>

                <h3 className="text-2xl font-bold text-white mb-6">

                  المنتجات

                </h3>

                <div className="space-y-5">

                  {order.products?.map(
                    (
                      item: any,
                      idx: number
                    ) => (

                      <div

                        key={idx}

                        className="bg-black/20 rounded-3xl p-5 flex items-center gap-5"
                      >

                        <img

                          src={
                            item.images?.[0]
                          }

                          className="w-24 h-24 rounded-2xl object-cover"
                        />

                        <div className="flex-1">

                          <h4 className="text-white text-2xl font-bold mb-2">

                            {item.title}

                          </h4>

                          <p className="text-zinc-400">

                            الكمية:
                            {item.quantity}

                          </p>

                        </div>

                        <p className="text-[#C8A96B] text-3xl font-black">

                          {(item.finalPrice ||
                            item.price) *
                            item.quantity} EGP

                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* FOOTER */}

              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

                <div>

                  <p className="text-zinc-400 mb-2">

                    العنوان

                  </p>

                  <p className="text-white text-lg leading-loose">

                    {order.address}

                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <div className="glass px-6 py-4 rounded-2xl flex items-center gap-3 text-white">

                    <Clock3
                      size={20}
                    />

                    {order.status}

                  </div>

                  <button

                    onClick={() =>
                      deleteOrder(
                        order._id
                      )
                    }

                    className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center"
                  >

                    <Trash2 />

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

        {/* EMPTY */}

        {!loading &&
          orders.length === 0 && (

          <div className="glass rounded-[40px] p-20 text-center">

            <Package
              className="mx-auto text-zinc-500 mb-6"
              size={80}
            />

            <h2 className="text-4xl font-black text-white mb-4">

              لا توجد طلبات

            </h2>

            <p className="text-zinc-400 text-xl">

              ستظهر الطلبات الجديدة هنا

            </p>

          </div>

        )}

      </div>

    </section>

  );

}