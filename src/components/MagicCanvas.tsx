"use client";

import { useEffect, useRef } from "react";

interface Firefly {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  angle: number;
  speedMultiplier: number;
}

interface RosePetal {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  swingSpeed: number;
  swingWidth: number;
  swingPhase: number;
  color: string;
}

interface GoldDust {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  sparkleSpeed: number;
  phase: number;
}

interface MagicSparkle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

export default function MagicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize lists
    const fireflies: Firefly[] = [];
    const rosePetals: RosePetal[] = [];
    const goldDusts: GoldDust[] = [];
    const sparkles: MagicSparkle[] = [];
    const stars: Star[] = [];

    // Colors list matching the palette
    const petalColors = [
      "rgba(229, 184, 168, 0.6)", // Rose Gold
      "rgba(240, 198, 184, 0.55)", // Soft petal pink
      "rgba(212, 175, 55, 0.4)",  // Antique Gold touch
    ];

    const sparkleColors = [
      "rgba(212, 175, 55, 0.8)",  // Gold
      "rgba(229, 184, 168, 0.8)",  // Rose Gold
      "rgba(200, 182, 255, 0.7)",  // Soft Lavender
      "rgba(249, 245, 236, 0.9)",  // Ivory
    ];

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    // Initialize stars (static background constellation points)
    const initStars = () => {
      stars.length = 0;
      const count = Math.floor((width * height) / 12000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.9, // mostly top-middle of the viewport
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Spawn initial entities
    const initEntities = () => {
      // Fireflies
      const ffCount = Math.min(35, Math.floor(width / 40));
      for (let i = 0; i < ffCount; i++) {
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.5 + 1,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random(),
          maxAlpha: Math.random() * 0.6 + 0.4,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          angle: Math.random() * Math.PI * 2,
          speedMultiplier: Math.random() * 0.3 + 0.1,
        });
      }

      // Rose Petals
      const petalCount = Math.min(25, Math.floor(width / 60));
      for (let i = 0; i < petalCount; i++) {
        rosePetals.push({
          x: Math.random() * width,
          y: Math.random() * -height, // start off-screen top
          size: Math.random() * 7 + 4,
          vx: (Math.random() - 0.3) * 0.6,
          vy: Math.random() * 0.8 + 0.5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          swingSpeed: Math.random() * 0.01 + 0.005,
          swingWidth: Math.random() * 25 + 10,
          swingPhase: Math.random() * Math.PI * 2,
          color: petalColors[Math.floor(Math.random() * petalColors.length)],
        });
      }

      // Gold Dust
      const dustCount = Math.min(45, Math.floor(width / 35));
      for (let i = 0; i < dustCount; i++) {
        goldDusts.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -(Math.random() * 0.3 + 0.1), // drift up
          alpha: Math.random(),
          sparkleSpeed: Math.random() * 0.05 + 0.02,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    initStars();
    initEntities();

    // Mouse movement tracker
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;

      // Spawn mouse trail magic particles
      if (Math.random() < 0.35) {
        sparkles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          alpha: 1,
          decay: Math.random() * 0.03 + 0.015,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        });
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // 1. Draw Star Constellations (interactive)
      stars.forEach((star) => {
        star.phase += star.pulseSpeed;
        const currentAlpha = Math.max(0.1, star.alpha * (0.6 + 0.4 * Math.sin(star.phase)));
        ctx.fillStyle = `rgba(249, 245, 236, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Check distance to mouse
        if (mouse.x > -500 && mouse.y > -500) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            // Draw connecting line to mouse
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Connect to other stars close by
            stars.forEach((otherStar) => {
              if (otherStar === star) return;
              const odx = otherStar.x - star.x;
              const ody = otherStar.y - star.y;
              const odist = Math.sqrt(odx * odx + ody * ody);
              if (odist < 90) {
                ctx.strokeStyle = `rgba(200, 182, 255, ${0.08 * (1 - dist / 120) * (1 - odist / 90)})`;
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(otherStar.x, otherStar.y);
                ctx.stroke();
              }
            });
          }
        }
      });

      // 2. Draw Fireflies (glowing, drifting)
      fireflies.forEach((ff) => {
        ff.angle += ff.speedMultiplier * 0.05;
        ff.x += ff.vx + Math.sin(ff.angle) * 0.15;
        ff.y += ff.vy + Math.cos(ff.angle) * 0.15;
        ff.alpha += ff.pulseSpeed;

        if (ff.alpha > ff.maxAlpha || ff.alpha < 0.1) {
          ff.pulseSpeed = -ff.pulseSpeed;
        }

        // Keep inside bounds
        if (ff.x < 0) ff.x = width;
        if (ff.x > width) ff.x = 0;
        if (ff.y < 0) ff.y = height;
        if (ff.y > height) ff.y = 0;

        // Draw radial glow for firefly
        const gradient = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.size * 5);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${ff.alpha})`);
        gradient.addColorStop(0.3, `rgba(212, 175, 55, ${ff.alpha * 0.4})`);
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ff.x, ff.y, ff.size * 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Gold Dust (magical sparkles)
      goldDusts.forEach((gd) => {
        gd.y += gd.vy;
        gd.x += gd.vx;
        gd.phase += gd.sparkleSpeed;

        const currentAlpha = Math.max(0.1, gd.alpha * (0.5 + 0.5 * Math.sin(gd.phase)));

        if (gd.y < 0) {
          gd.y = height;
          gd.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(212, 175, 55, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(gd.x, gd.y, gd.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw Falling Rose Petals (rotating, fluttering)
      rosePetals.forEach((p) => {
        p.y += p.vy;
        p.swingPhase += p.swingSpeed;
        p.x += p.vx + Math.sin(p.swingPhase) * 0.4;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.vy = Math.random() * 0.8 + 0.5;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // Draw a simple beautiful rose petal shape (curved path)
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.quadraticCurveTo(p.size / 2, -p.size / 2, p.size / 3, p.size / 2);
        ctx.quadraticCurveTo(0, p.size, -p.size / 3, p.size / 2);
        ctx.quadraticCurveTo(-p.size / 2, -p.size / 2, 0, -p.size / 2);
        ctx.fill();

        ctx.restore();
      });

      // 5. Draw Mouse Trail Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.fillStyle = s.color;
        
        // Draw standard sparkle star shape (four points)
        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          ctx.rotate(Math.PI / 2);
          ctx.lineTo(0, s.size * s.alpha);
          ctx.lineTo(s.size * 0.3 * s.alpha, 0);
        }
        ctx.fill();
        ctx.restore();
      }

      // Draw subtle cursor follow spotlight overlay (ambient glow effect)
      if (mouse.x > -500 && mouse.y > -500) {
        const glowRad = 350;
        const radialGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRad);
        radialGlow.addColorStop(0, "rgba(200, 182, 255, 0.04)"); // soft lavender glow
        radialGlow.addColorStop(0.5, "rgba(229, 184, 168, 0.02)"); // rose gold tint
        radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = radialGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRad, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
