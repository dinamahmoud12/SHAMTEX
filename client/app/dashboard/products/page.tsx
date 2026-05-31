"use client";

import { useEffect, useState } from "react";

interface Product {

  _id: string;

  title: string;

  price: number;

  finalPrice: number;

  discount: number;

  category: string;

  images: string[];

}

export default function DashboardProducts() {

  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {

    try {

      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/products"
      );

      const data = await res.json();

      if (Array.isArray(data)) {

        setProducts(data);

      } else {

        setProducts([]);

      }

    } catch (error) {

      console.log(error);

      setProducts([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadProducts();

  }, []);

  const deleteProduct = async (id: string) => {

    const confirmDelete = confirm(
      "هل تريد حذف المنتج؟"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      loadProducts();

    } catch (error) {

      console.log(error);

    }

  };

  const filteredProducts = products.filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <section className="bg-black min-h-screen py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row gap-5 md:items-center md:justify-between mb-12">

          <h1 className="text-5xl font-bold text-[#C8A96B]">
            إدارة المنتجات
          </h1>

          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-white p-4 rounded-2xl w-full md:w-96 outline-none"
          />

        </div>

        {loading ? (

          <div className="text-center text-white text-2xl">
            جاري تحميل المنتجات...
          </div>

        ) : filteredProducts.length === 0 ? (

          <div className="text-center text-zinc-400 text-2xl">
            لا توجد منتجات
          </div>

        ) : (

          <div className="grid md:grid-cols-4 gap-8">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="bg-zinc-900 rounded-3xl overflow-hidden border border-[#C8A96B]/20 hover:border-[#C8A96B] duration-300"
              >

                <img
                  src={
                    product.images?.[0] ||
                    "/placeholder.png"
                  }
                  className="w-full h-72 object-cover"
                />

                <div className="p-5">

                  <span className="text-xs bg-[#C8A96B]/20 text-[#C8A96B] px-3 py-1 rounded-full">
                    {product.category}
                  </span>

                  <h2 className="text-white text-2xl font-bold my-4 line-clamp-1">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-3 mb-3">

                    <p className="text-[#C8A96B] text-3xl font-bold">
                      {product.finalPrice} EGP
                    </p>

                    <p className="text-zinc-500 line-through">
                      {product.price} EGP
                    </p>

                  </div>

                  <div className="bg-red-500/20 text-red-400 text-sm px-3 py-1 rounded-xl inline-block mb-5">
                    خصم {product.discount}%
                  </div>

                  <div className="flex gap-3">

                    <a
                      href={`/dashboard/products/${product._id}`}
                      className="bg-blue-500 text-white py-3 rounded-xl w-full text-center font-bold"
                    >
                      عرض
                    </a>

                    <a
                      href={`/dashboard/products/edit/${product._id}`}
                      className="bg-[#C8A96B] text-black py-3 rounded-xl w-full text-center font-bold"
                    >
                      تعديل
                    </a>

                    <button
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                      className="bg-red-500 text-white py-3 rounded-xl w-full"
                    >
                      حذف
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}