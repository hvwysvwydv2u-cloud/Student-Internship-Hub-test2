"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const StitchLoop = ({ children, index = 0, animate = true, className = "" }) => {
  if (!animate) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StitchSection = ({ children, className = "" }) => {
  return (
    <section className={`py-10 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};
