"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Raindrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export default function SceneStorm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lightningFlash, setLightningFlash] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale rain density & speed based on scroll progress
  // At start (0): moderate rain. In middle (0.5): intense storm. At end (1): slowing down.
  const rainIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.4]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.95], [40, 0, 0, -30]);

  // Rain animation logic in local Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const raindrops: Raindrop[] = [];
    const maxDrops = 150;

    for (let i = 0; i < maxDrops; i++) {
      raindrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 15 + 15,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Get current intensity multiplier
      const intensity = rainIntensity.get();
      const currentDrops = Math.floor(maxDrops * intensity);

      ctx.strokeStyle = "rgba(174, 194, 224, 0.6)";
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      for (let i = 0; i < currentDrops; i++) {
        const drop = raindrops[i];
        if (!drop) continue;

        ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity * intensity})`;
        
        ctx.beginPath();
        // Draw slanted lines representing wind-swept rain
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 2, drop.y + drop.length);
        ctx.stroke();

        // Update raindrop position (slanted downwards)
        drop.y += drop.speed * (0.8 + intensity * 0.4);
        drop.x -= 2 * (0.8 + intensity * 0.4);

        // Reset drop to top if it goes off-screen
        if (drop.y > height) {
          drop.y = -20;
          drop.x = Math.random() * width;
        }
        if (drop.x < 0) {
          drop.x = width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rainIntensity]);

  // Occasional random lightning flashes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const triggerLightning = () => {
      // Trigger flash
      setLightningFlash(true);
      
      // First quick flicker
      setTimeout(() => {
        setLightningFlash(false);
        
        // Second main flash after 150ms
        setTimeout(() => {
          setLightningFlash(true);
          setTimeout(() => {
            setLightningFlash(false);
          }, 200);
        }, 150);
      }, 80);

      // Schedule next flash (between 6 to 12 seconds)
      const nextTime = Math.random() * 6000 + 6000;
      timer = setTimeout(triggerLightning, nextTime);
    };

    // First trigger after 4s
    timer = setTimeout(triggerLightning, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="scene-storm"
      ref={containerRef}
      className="relative min-h-[120vh] w-full flex flex-col justify-center items-center py-24 overflow-hidden bg-gradient-to-b from-[#0c0d1c] via-[#080914] to-[#120f1c] text-ivory"
    >
      {/* Lightning Flash Overlay */}
      <div
        className={`absolute inset-0 bg-white/70 z-20 pointer-events-none transition-opacity duration-75 ${
          lightningFlash ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Lightning Glow backdrop */}
      <div
        className={`absolute inset-0 bg-sky-500/10 z-10 pointer-events-none transition-opacity duration-300 ${
          lightningFlash ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Cloud shadows / Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#06070e]/80 to-[#06070e] pointer-events-none z-10" />

      {/* Storm Video Backdrop Placeholder */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/storm.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Local Rain Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-screen" />

      {/* Narrative block */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          style={{ opacity: textOpacity, y: textY }}
          className="text-4xl md:text-6xl font-serif text-rose-gold tracking-wide mb-8 uppercase drop-shadow-[0_0_12px_rgba(229,184,168,0.25)]"
        >
          The Storm
        </motion.h2>

        <motion.p
          style={{ opacity: textOpacity, y: textY }}
          className="font-serif text-lg md:text-2xl leading-relaxed text-ivory/90 max-w-2xl mx-auto font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
        >
          But every story has its tempests.
          <br />
          <br />
          The sky blackened, dark and heavy, and a freezing wind swept across the battlements. Mistakes were made, words were left unsaid, and the thunder of regret echoed through the stone courtyard.
          <br />
          <br />
          Yet, it was in the center of the storm that the prince learned to listen—and realized that some bonds are forged deeper in the rain.
        </motion.p>
      </div>

      {/* Floating wind-blown clouds */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-36 bg-slate-900/40 blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-48 bg-purple-950/20 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
    </section>
  );
}
