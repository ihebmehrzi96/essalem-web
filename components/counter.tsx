"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export default function Counter({
  to,
  suffix = "",
  todo = false,
}: {
  to: number;
  suffix?: string;
  todo?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || todo) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, todo]);

  return (
    <span ref={ref} className="font-display text-[clamp(2.3rem,4.2vw,3.4rem)] tracking-tight">
      {todo ? "[N]" : `${value}${suffix}`}
    </span>
  );
}