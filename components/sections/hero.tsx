"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export default function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const lines = [t("line1"), t("line2")];

  return (
    <section
      ref={ref}
      className="relative h-[80svh] min-h-[520px] overflow-hidden rounded-b-[1.25rem] sm:h-[92svh] sm:rounded-b-[2rem]"
    >
      <motion.div
        style={reduced ? undefined : { y: mediaY, scale: mediaScale }}
        className="absolute inset-0"
      >
        <video
          src="/clinique-essalem.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-transparent to-transparent sm:from-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-6 sm:pb-14 md:px-12 md:pb-20">
        <div className="mx-auto max-w-[1280px]">

          <motion.div
            className="mb-5 inline-flex items-center gap-3 rounded-xl bg-white/15 px-3.5 py-2.5 backdrop-blur-md sm:mb-7 sm:px-4 sm:py-3"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <span className="font-display text-2xl leading-none text-paper sm:text-3xl">
              20+
            </span>
            <span className="max-w-[18ch] text-[0.8rem] leading-tight text-paper/85 sm:text-sm">
              {t("badge")}
            </span>
          </motion.div>

                  <h1 className="max-w-[18ch] text-[clamp(2.1rem,7vw,5.6rem)] leading-[1.18] text-paper">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-5 max-w-[52ch] text-[0.95rem] leading-relaxed text-paper/80 sm:mt-6 sm:text-[1.05rem]"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {t("intro")}
          </motion.p>

        </div>
      </div>
    </section>
  );
}