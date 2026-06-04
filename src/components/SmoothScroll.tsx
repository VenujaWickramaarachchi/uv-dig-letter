"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smooth stop
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Hook Lenis into GSAP ticker
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateRaf);

    // Disable GSAP lag smoothing to keep scroll animations in sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
