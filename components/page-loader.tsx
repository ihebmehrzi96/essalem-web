"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

let hasSeenInMemory = false;

/**
 * Écran de chargement : rendu dès le SSR (visible par défaut) pour éviter
 * tout flash de l'image Hero avant l'hydratation React, puis disparaît en fondu.
 * Ne réapparaît pas lors des changements de langue ou navigations internes.
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(() => !hasSeenInMemory);

  useEffect(() => {
    // Déjà vu pendant cette session : masquer immédiatement sans animation
    if (hasSeenInMemory || sessionStorage.getItem("loader-seen")) {
      hasSeenInMemory = true;
      setVisible(false);
      return;
    }

    const MIN_DURATION = 2200;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);

      setTimeout(() => {
        hasSeenInMemory = true;
        sessionStorage.setItem("loader-seen", "1");
        setVisible(false);
      }, wait);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `try{if(sessionStorage.getItem("loader-seen")){var s=document.createElement("style");s.textContent="#page-loader-overlay{display:none!important}";document.head.appendChild(s)}}catch(e){}`,
        }}
      />
      <AnimatePresence>
        {visible && (
          <motion.div
            id="page-loader-overlay"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper pointer-events-auto"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/logo-essalem.svg"
                alt=""
                width={142}
                height={107}
                priority
                className="h-20 w-auto sm:h-24 object-contain"
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
    </>
  );
}
