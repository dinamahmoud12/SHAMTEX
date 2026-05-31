"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

interface Product {

  _id: string;

  title: string;

  price: number;

  finalPrice?: number;

  images: string[];

  quantity?: number;

}

interface CartContextType {

  cartItems: Product[];

  addToCart: (
    product: Product
  ) => void;

  removeFromCart: (
    id: string
  ) => void;

  increaseQty: (
    id: string
  ) => void;

  decreaseQty: (
    id: string
  ) => void;

  totalPrice: number;

  totalItems: number;

}

const CartContext =
  createContext<CartContextType | null>(
    null
  );

export default function CartProvider({

  children,

}: {

  children: React.ReactNode;

}) {

  const [cartItems,
    setCartItems] =
    useState<Product[]>([]);

  /* LOAD */

  useEffect(() => {

    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {

      setCartItems(
        JSON.parse(savedCart)
      );

    }

  }, []);

  /* SAVE */

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  /* ADD */

  const addToCart = (
    product: Product
  ) => {

    const existing =
      cartItems.find(
        (item) =>
          item._id ===
          product._id
      );

    if (existing) {

      setCartItems(

        cartItems.map((item) =>

          item._id ===
          product._id

            ? {

                ...item,

                quantity:
                  (item.quantity || 1) + 1,
              }

            : item

        )

      );

    } else {

      setCartItems([

        ...cartItems,

        {
          ...product,
          quantity: 1,
        },

      ]);

    }

    toast.success(
      "تمت إضافة المنتج للسلة"
    );

  };

  /* REMOVE */

  const removeFromCart = (
    id: string
  ) => {

    setCartItems(

      cartItems.filter(
        (item) =>
          item._id !== id
      )

    );

    toast.success(
      "تم حذف المنتج"
    );

  };

  /* INCREASE */

  const increaseQty = (
    id: string
  ) => {

    setCartItems(

      cartItems.map((item) =>

        item._id === id

          ? {

              ...item,

              quantity:
                (item.quantity || 1) + 1,
            }

          : item

      )

    );

  };

  /* DECREASE */

  const decreaseQty = (
    id: string
  ) => {

    setCartItems(

      cartItems.map((item) =>

        item._id === id

          ? {

              ...item,

              quantity:
                item.quantity! > 1

                  ? item.quantity! - 1

                  : 1,
            }

          : item

      )

    );

  };

  /* TOTALS */

  const totalPrice =
    cartItems.reduce(

      (acc, item) =>

        acc +

        (item.finalPrice ||
          item.price) *

          (item.quantity || 1),

      0

    );

  const totalItems =
    cartItems.reduce(

      (acc, item) =>

        acc + (item.quantity || 1),

      0

    );

  return (

    <CartContext.Provider

      value={{

        cartItems,

        addToCart,

        removeFromCart,

        increaseQty,

        decreaseQty,

        totalPrice,

        totalItems,

      }}

    >

      {children}

    </CartContext.Provider>

  );

}

export const useCart = () => {

  const context =
    useContext(CartContext);

  if (!context) {

    throw new Error(
      "useCart must be used inside CartProvider"
    );

  }

  return context;

};