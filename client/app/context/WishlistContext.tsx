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
  category?: string;
}

interface WishlistContextType {
  wishlistItems: Product[];
  toggleWishlist: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

const WishlistContext =
  createContext<WishlistContextType | null>(
    null
  );

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistItems,
    setWishlistItems] =
    useState<Product[]>([]);

  useEffect(() => {
    const savedWishlist =
      localStorage.getItem(
        "wishlist"
      );

    if (savedWishlist) {
      setWishlistItems(
        JSON.parse(savedWishlist)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const isFavorite = (productId: string) =>
    wishlistItems.some(
      (item) => item._id === productId
    );

  const toggleWishlist = (product: Product) => {
    const alreadyFavorite =
      isFavorite(product._id);

    if (alreadyFavorite) {
      setWishlistItems(
        wishlistItems.filter(
          (item) =>
            item._id !== product._id
        )
      );
      toast.success("تمت الإزالة من المفضلة");
      return;
    }

    setWishlistItems([
      ...wishlistItems,
      product,
    ]);
    toast.success("تمت الإضافة للمفضلة");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isFavorite,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(
    WishlistContext
  );

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
};
