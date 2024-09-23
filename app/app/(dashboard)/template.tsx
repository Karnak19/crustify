"use client";

import type React from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.2 }}
      className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0"
    >
      {children}
    </motion.main>
  );
}
