"use client";

import Navbar from "./components/Navbar";

import Hero from "./components/Hero";

import Categories from "./components/Categories";

import Products from "./components/Products";

import Footer from "./components/Footer";

import { motion } from "framer-motion";

export default function Home() {

  return (

    <main className="min-h-screen overflow-hidden bg-[var(--bg)]">

      {/* BACKGROUND EFFECT */}

      <div className="fixed inset-0 -z-10">

        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[var(--primary)]/10 blur-[200px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--secondary)]/10 blur-[180px] rounded-full" />

      </div>

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <motion.div

        initial={{
          opacity: 0,
          y: 60,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 1,
        }}
      >

        <Hero />

      </motion.div>

      {/* CATEGORIES */}

      <motion.div

        initial={{
          opacity: 0,
          y: 80,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
        }}

        transition={{
          duration: 0.8,
        }}
      >

        <Categories />

      </motion.div>

      {/* PRODUCTS */}

      <motion.div

        initial={{
          opacity: 0,
          y: 80,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
        }}

        transition={{
          duration: 0.8,
        }}
      >

        <Products />

      </motion.div>

      {/* FOOTER */}

      <Footer />

      {/* FLOATING LIGHT */}

      <div className="fixed top-1/3 left-10 w-72 h-72 bg-[var(--primary)]/10 rounded-full blur-[100px] pointer-events-none float" />

      <div className="fixed bottom-20 right-10 w-72 h-72 bg-[var(--secondary)]/10 rounded-full blur-[100px] pointer-events-none float" />

    </main>

  );

}
