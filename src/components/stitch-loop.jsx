"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const StitchLoop = ({ children, index = 0, animate = true, className = "" }) => {
  if (!animate) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StitchSection = ({ children, className = "" }) => {
  return (
    <section className={`py-12 md:py-20 px-6 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};
