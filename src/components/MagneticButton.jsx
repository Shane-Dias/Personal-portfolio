import { motion } from "framer-motion";

export default function MagneticButton({ className = "", children, ...props }) {
  return (
    <motion.a
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={className}
      data-cursor-hover
      {...props}
    >
      {children}
    </motion.a>
  );
}
