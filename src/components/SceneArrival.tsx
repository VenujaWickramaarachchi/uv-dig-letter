"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SceneArrival() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background transition: cold midnight blue/purple to warm golden orange
  const bgOpacity = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const princessScale = useTransform(scrollYProgress, [0.1, 0.9], [0.95, 1.05]);
  const princessY = useTransform(scrollYProgress, [0.1, 0.9], [40, -20]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.9], [30, 0, 0, -20]);
  
  // Flower bloom values: scale and rotation
  const flowerScale = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const flowerRotate = useTransform(scrollYProgress, [0.2, 0.6], [-30, 0]);

  // Sparkle burst scale
  const sparkleScale = useTransform(scrollYProgress, [0.3, 0.7], [0.5, 1.2]);
  const sparkleOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.8, 0]);

  return (
    <section
      id="scene-arrival"
      ref={containerRef}
      className="relative min-h-[120vh] w-full flex flex-col justify-center items-center py-24 overflow-hidden bg-[#0d091a] text-ivory"
    >
      {/* Dynamic Background Transitions */}
      {/* Base: Royal Purple */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d091a] via-[#1c122c] to-[#25102a]" />

      {/* Layer 2: Warm Gold overlay that fades in */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#2e1823] via-[#4b271d] to-[#4c3919] z-0"
      />

      {/* Video Placeholder */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/princess-arrival.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0d091a]/40 to-transparent" />
      </div>

      {/* Light Rays Effect */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-antique-gold/15 via-transparent to-transparent pointer-events-none z-10"
      />

      {/* Silhouette of the Princess */}
      <motion.div
        style={{ scale: princessScale, y: princessY }}
        className="absolute bottom-0 right-[10%] md:right-[20%] w-72 h-[60vh] opacity-20 pointer-events-none select-none z-10"
      >
        <svg
          viewBox="0 0 100 200"
          className="w-full h-full"
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Stylized female silhouette with gown */}
          <path
            fill="#060408"
            d="M50,40 Q47,40 47,35 Q47,30 50,30 Q53,30 53,35 Q53,40 50,40 Z 
               M48,41 L52,41 L54,58 L46,58 Z 
               M46,58 Q20,110 15,200 L85,200 Q80,110 54,58 Z"
          />
          {/* Glowing halo */}
          <circle cx="50" cy="35" r="12" fill="none" stroke="#E5B8A8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Blooming SVG Flowers (Left side and Right side corners) */}
      <motion.div
        style={{ scale: flowerScale, rotate: flowerRotate }}
        className="absolute bottom-4 left-4 md:left-12 w-48 h-48 pointer-events-none select-none z-20 origin-bottom-left text-antique-gold/40"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          {/* Stem & Vines */}
          <path d="M0,100 C20,90 30,70 30,50 C30,35 25,25 40,20 C45,18 55,25 60,30" fill="none" stroke="currentColor" strokeWidth="2" />
          {/* Large Bloom */}
          <circle cx="40" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M40,10 C45,5 50,15 40,20 C30,15 35,5 40,10 Z" />
          <path d="M30,20 C25,25 35,30 40,20 C45,30 55,25 30,20 Z" />
          <path d="M40,30 C45,35 50,25 40,20 C30,25 35,35 40,30 Z" />
          {/* Leaves */}
          <path d="M22,78 C15,70 20,60 30,70 Z" />
          <path d="M28,60 C35,55 40,62 30,68 Z" />
        </svg>
      </motion.div>

      <motion.div
        style={{ scale: flowerScale, rotate: useTransform(flowerRotate, (r) => -r) }}
        className="absolute bottom-10 right-4 md:right-12 w-40 h-40 pointer-events-none select-none z-20 origin-bottom-right text-rose-gold/45"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <path d="M100,100 C80,90 70,70 70,50 C70,35 75,25 60,20" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="60" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M60,12 C65,8 70,16 60,20 C50,16 55,8 60,12 Z" />
          <path d="M52,20 C48,24 56,28 60,20 C64,28 72,24 52,20 Z" />
          {/* Leaves */}
          <path d="M78,78 C85,70 80,60 70,70 Z" />
        </svg>
      </motion.div>

      {/* Sparkles overlay */}
      <motion.div
        style={{ scale: sparkleScale, opacity: sparkleOpacity }}
        className="absolute top-1/3 left-1/4 w-32 h-32 pointer-events-none select-none z-10 text-antique-gold"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <polygon points="50,10 53,40 80,50 53,60 50,90 47,60 20,50 47,40" />
          <circle cx="20" cy="20" r="2" />
          <circle cx="80" cy="70" r="3" />
        </svg>
      </motion.div>

      {/* Narrative Section */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          style={{ opacity: textOpacity, y: textY }}
          className="text-4xl md:text-6xl font-serif text-antique-gold tracking-wide mb-8 uppercase drop-shadow-[0_0_8px_rgba(229,184,168,0.3)]"
        >
          The Arrival
        </motion.h2>

        <motion.p
          style={{ opacity: textOpacity, y: textY }}
          className="font-serif text-lg md:text-2xl leading-relaxed text-ivory/95 max-w-2xl mx-auto font-light drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
        >
          Then, like a quiet sunrise breaking over the frost-locked hills, she arrived.
          <br />
          <br />
          Wherever her steps brushed the cold, grey stone, golden vines tangled and wild roses unfurled in quiet rebellion against the winter. She brought with her the light of a thousand mornings, and the prince knew, in that single heartbeat, that his castle would never be empty again.
        </motion.p>
      </div>
    </section>
  );
}
