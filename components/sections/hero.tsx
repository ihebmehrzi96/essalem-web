"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";

export default function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const lines = [t("line1"), t("line2")];

  useEffect(() => {
    const section = ref.current;
    const h1 = h1Ref.current;
    const cursor = cursorRef.current;
    if (!section || !h1) return;

    // 3 trailing shape coordinates (shape-1, shape-2, shape-3)
    const shapes = [
      { x: -999, y: -999 },
      { x: -999, y: -999 },
      { x: -999, y: -999 },
    ];

    const onMouseMove = (event: MouseEvent) => {
      const rect = h1.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (cursor) {
        gsap.set(cursor, {
          x: event.clientX,
          y: event.clientY,
          opacity: 1,
        });
      }

      gsap.to(shapes, {
        x: mouseX,
        y: mouseY,
        stagger: -0.1,
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
          h1.style.setProperty("--x1", `${shapes[0].x}px`);
          h1.style.setProperty("--y1", `${shapes[0].y}px`);
          h1.style.setProperty("--x2", `${shapes[1].x}px`);
          h1.style.setProperty("--y2", `${shapes[1].y}px`);
          h1.style.setProperty("--x3", `${shapes[2].x}px`);
          h1.style.setProperty("--y3", `${shapes[2].y}px`);
        },
      });
    };

    const onMouseLeave = () => {
      if (cursor) {
        gsap.to(cursor, { opacity: 0, duration: 0.25 });
      }
      gsap.to(shapes, {
        x: -999,
        y: -999,
        stagger: -0.08,
        duration: 0.6,
        ease: "power2.in",
        overwrite: "auto",
        onUpdate: () => {
          h1.style.setProperty("--x1", `${shapes[0].x}px`);
          h1.style.setProperty("--y1", `${shapes[0].y}px`);
          h1.style.setProperty("--x2", `${shapes[1].x}px`);
          h1.style.setProperty("--y2", `${shapes[1].y}px`);
          h1.style.setProperty("--x3", `${shapes[2].x}px`);
          h1.style.setProperty("--y3", `${shapes[2].y}px`);
        },
      });
    };

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[74svh] min-h-[480px] overflow-hidden rounded-none sm:h-[105svh] sm:cursor-none"
    >
      {/* Custom Santé Cursor (Medical Heartbeat Pulse / Cross Badge) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-40 -mt-6 -ml-6 hidden h-12 w-12 items-center justify-center rounded-full border border-leaf/60 bg-ink/50 text-leaf opacity-0 shadow-[0_0_24px_rgba(28,138,95,0.55)] backdrop-blur-md transition-opacity duration-200 sm:flex"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          aria-hidden="true"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </div>

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
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-5 pb-28 sm:px-6 sm:pb-28 md:px-12 md:pb-36">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            className="mb-3.5 inline-flex items-center gap-3 rounded-none bg-white/15 px-3.5 py-2 backdrop-blur-md sm:mb-7 sm:px-4 sm:py-3"
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

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              ref={h1Ref}
              style={{
                backgroundImage: `
                  radial-gradient(circle 120px at var(--x3, -999px) var(--y3, -999px), #34d399 0%, #34d399 99%, transparent 100%),
                  radial-gradient(circle 205px at var(--x2, -999px) var(--y2, -999px), #1c8a5f 0%, #1c8a5f 99%, transparent 100%),
                  radial-gradient(circle 310px at var(--x1, -999px) var(--y1, -999px), #0f6343 0%, #0f6343 99%, transparent 100%),
                  linear-gradient(#ffffff, #ffffff)
                `,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
              className="max-w-[18ch] text-[clamp(2.1rem,7vw,5.6rem)] leading-[1.18] select-none"
            >
              {lines[0]}
              <br />
              {lines[1]}
            </h1>
          </motion.div>

          <motion.p
            className="mt-3.5 max-w-[52ch] text-[0.95rem] leading-relaxed text-paper/80 sm:mt-6 sm:text-[1.05rem]"
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
