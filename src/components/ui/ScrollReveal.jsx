import React from 'react';
import { motion } from 'framer-motion';

export const ScrollReveal = ({ children, delay = 0, className = "", noBlur = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: noBlur ? 'none' : 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: noBlur ? 'none' : 'blur(0px)' }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
