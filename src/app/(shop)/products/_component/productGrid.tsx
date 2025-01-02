"use client";

import { motion } from "motion/react";
import type React from "react";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export default function ProductGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      {children}
    </motion.div>
  );
}