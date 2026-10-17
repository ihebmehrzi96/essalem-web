"use client";

import { motion, useReducedMotion } from "motion/react";

/** Entrée latérale au défilement. `className` est appliqué au conteneur
 *  animé lui-même : indispensable pour les enfants directs d'une grille. */
export default function SlideIn({
  children,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const offset = from === "left" ? -48 : 48;

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, x: offset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}