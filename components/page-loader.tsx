"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Écran de chargement : s'affiche au premier chargement du site seulement,
 * puis disparaît en fondu. Durée minimale pour éviter un flash.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Déjà vu pendant cette session : on ne le montre pas à nouveau.
    if (sessionStorage.getItem("loader-seen")) {
      setVisible(false);
      return;
    }

    const MIN_DURATION = 3000;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);

      setTimeout(() => {
        sessionStorage.setItem("loader-seen", "1");
        setVisible(false);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/logo-essalem.png"
              alt=""
              width={675}
              height={372}
              priority
              className="h-24 w-auto sm:h-28"
            />
          </motion.div>

          {/* Barre de progression */}
          <div className="mt-10 h-[3px] w-40 overflow-hidden rounded-full bg-mist-deep">
            <motion.div
              className="h-full rounded-full bg-leaf"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}