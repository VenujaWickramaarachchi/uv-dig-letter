"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import FunnyVideoGallery from "@/components/FunnyVideoGallery";
import MemoryGallery from "@/components/MemoryGallery";
import SurpriseChest from "@/components/SurpriseChest";
import StickyNoteBoard from "@/components/StickyNoteBoard";

interface Butterfly {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  angle: number;
  flapSpeed: number;
  color: string;
}

export default function SmileSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Butterfly canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const butterflies: Butterfly[] = [];
    const colors = [
      "rgba(255, 200, 221, 0.7)",  // Soft pink
      "rgba(200, 182, 255, 0.7)",  // Lavender
      "rgba(212, 175, 55, 0.65)",  // Antique Gold
    ];

    for (let i = 0; i < 10; i++) {
      butterflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 4,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 0.8 - 0.3,
        angle: Math.random() * Math.PI * 2,
        flapSpeed: Math.random() * 0.15 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      butterflies.forEach((b) => {
        b.angle += b.flapSpeed;
        b.x += b.vx + Math.sin(b.angle * 0.5) * 0.4;
        b.y += b.vy;

        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }
        if (b.x < -20) b.x = width + 20;
        if (b.x > width + 20) b.x = -20;

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.fillStyle = b.color;
        
        const wingScale = Math.sin(b.angle);

        ctx.beginPath();
        ctx.ellipse(-b.size * 0.8, -b.size * 0.2, b.size * 0.8 * Math.abs(wingScale), b.size * 1.2, -Math.PI/6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(b.size * 0.8, -b.size * 0.2, b.size * 0.8 * Math.abs(wingScale), b.size * 1.2, Math.PI/6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(249, 245, 236, 0.8)";
        ctx.beginPath();
        ctx.ellipse(0, 0, b.size * 0.2, b.size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* 1. Bright Garden Hero entrance (extends the scroll path) */}
      <section
        id="scene-smile-hero"
        className="relative h-screen w-full flex flex-col justify-center items-center py-20 px-4 text-center overflow-hidden bg-[#04060d] border-t border-antique-gold/10"
      >
        {/* Background Video / Gradient */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-25">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/happy-garden.jpg"
          >
            <source src="/videos/happy-garden.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04060d]/60 to-[#04060d]" />
        </div>

        {/* Sunlight Spotlight */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />
        
        {/* Butterfly Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70" />

        <div className="relative z-20 max-w-3xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.65, y: 0 }}
            className="text-xs uppercase tracking-[0.35em] text-antique-gold font-serif block mb-6"
          >
            Chapter IX: The Princess's Smile
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif text-antique-gold tracking-wide leading-tight uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] font-bold"
          >
            A Place Made To <br /> Make You Smile
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-6 text-sm md:text-lg text-rose-gold tracking-widest max-w-lg mx-auto font-light leading-relaxed italic"
          >
            "This chapter is reserved for laughter, happiness, and little moments worth keeping."
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-45 animate-bounce">
          <span className="text-[9px] tracking-[0.25em] text-rose-gold uppercase font-serif">Scroll For Joy</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-rose-gold to-transparent" />
        </div>
      </section>

      {/* 2. Funny Videos */}
      <FunnyVideoGallery />

      {/* 3. Happy Memories */}
      <MemoryGallery />

      {/* 4. Surprise Box */}
      <SurpriseChest />

      {/* 5. Sticky Note Board */}
      <StickyNoteBoard />
    </div>
  );
}
