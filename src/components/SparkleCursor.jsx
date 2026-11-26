import React, { useEffect, useRef, useState } from 'react';

const SPARKLE_COLORS = [
  '#008cf0', // Brand Blue
  '#10b981', // Brand Emerald
  '#38bdf8', // Sky Cyan
  '#f59e0b', // Gold Star
  '#a855f7', // Violet Accent
  '#34d399'  // Mint Glow
];

export default function SparkleCursor() {
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setEnabled(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];
    let ripples = [];
    let trailPoints = [];

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100, scale: 1, targetScale: 1 };
    let isHoveringInteractive = false;
    let isVisible = false;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createSparkle = (x, y, burst = false) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? Math.random() * 4.2 + 1.4 : Math.random() * 1.6 + 0.35;
      particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.35,
        size: burst ? Math.random() * 4.8 + 2.5 : Math.random() * 3.4 + 1.8,
        alpha: 1,
        decay: burst ? 0.022 : 0.026,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.16,
        twinkleOffset: Math.random() * Math.PI * 2,
        isStar: Math.random() > 0.28
      });
    };

    let lastSparkleTime = 0;
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isVisible = true;

      // Check if hovering interactive element
      const target = e.target;
      const interactive = target?.closest?.('a, button, input, select, textarea, [role="button"]');
      isHoveringInteractive = Boolean(interactive);
      ring.targetScale = isHoveringInteractive ? 1.55 : 1;

      // Add smooth ribbon trail point
      trailPoints.push({ x: mouse.x, y: mouse.y, life: 1 });
      if (trailPoints.length > 18) trailPoints.shift();

      const now = performance.now();
      if (now - lastSparkleTime > 16) {
        createSparkle(mouse.x, mouse.y, false);
        if (Math.random() > 0.35) {
          createSparkle(mouse.x, mouse.y, false);
        }
        lastSparkleTime = now;
      }
    };

    const handleMouseDown = (e) => {
      ring.targetScale = 0.8;
      // Expanding click shockwave ripple
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 42,
        alpha: 0.75,
        color: isHoveringInteractive ? '#10b981' : '#008cf0'
      });

      // Celebratory sparkle burst
      for (let i = 0; i < 14; i++) {
        createSparkle(e.clientX, e.clientY, true);
      }
    };

    const handleMouseUp = () => {
      ring.targetScale = isHoveringInteractive ? 1.55 : 1;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const drawStar = (cx, cy, outerRadius, rotation, color, alpha) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      const spikes = 4;
      const innerRadius = outerRadius * 0.36;
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth spring interpolation for outer magnetic ring
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;
      ring.scale += (ring.targetScale - ring.scale) * 0.2;

      if (ringRef.current && dotRef.current) {
        if (isVisible) {
          ringRef.current.style.opacity = '1';
          dotRef.current.style.opacity = '1';
          ringRef.current.style.transform = `translate3d(${ring.x - 18}px, ${ring.y - 18}px, 0) scale(${ring.scale})`;
          dotRef.current.style.transform = `translate3d(${mouse.x - 4}px, ${mouse.y - 4}px, 0)`;
          ringRef.current.style.borderColor = isHoveringInteractive
            ? 'rgba(16, 185, 129, 0.85)'
            : 'rgba(0, 140, 240, 0.65)';
          ringRef.current.style.backgroundColor = isHoveringInteractive
            ? 'rgba(16, 185, 129, 0.12)'
            : 'rgba(0, 140, 240, 0.06)';
        } else {
          ringRef.current.style.opacity = '0';
          dotRef.current.style.opacity = '0';
        }
      }

      // Draw silky luminous comet ribbon trail
      if (trailPoints.length > 2) {
        for (let i = 1; i < trailPoints.length; i++) {
          const p0 = trailPoints[i - 1];
          const p1 = trailPoints[i];
          p0.life -= 0.045;
          if (p0.life <= 0) continue;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = i % 2 === 0 ? '#008cf0' : '#10b981';
          ctx.globalAlpha = Math.max(0, p0.life * 0.45);
          ctx.lineWidth = Math.max(0.8, (i / trailPoints.length) * 3.5);
          ctx.lineCap = 'round';
          ctx.shadowColor = '#008cf0';
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.restore();
        }
        trailPoints = trailPoints.filter((p) => p.life > 0);
      }

      // Draw expanding click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.4;
        r.alpha -= 0.04;
        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = r.color;
        ctx.globalAlpha = Math.max(0, r.alpha);
        ctx.lineWidth = 2;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      // Draw twinkling star sparkles
      const time = performance.now() * 0.01;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const twinkle = 0.75 + 0.25 * Math.sin(time + p.twinkleOffset);
        const renderAlpha = p.alpha * twinkle;

        if (p.isStar) {
          drawStar(p.x, p.y, p.size * 1.45, p.rotation, p.color, renderAlpha);
        } else {
          ctx.save();
          ctx.globalAlpha = Math.max(0, renderAlpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      if (particles.length > 160) {
        particles = particles.slice(particles.length - 160);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
        aria-hidden="true"
      />
      {enabled && (
        <>
          {/* Outer Smooth Magnetic Glow Ring */}
          <div
            ref={ringRef}
            className="fixed top-0 left-0 w-9 h-9 rounded-full border-2 pointer-events-none z-[9998] opacity-0 transition-colors duration-200 backdrop-blur-[1px]"
            style={{
              boxShadow: '0 0 14px rgba(0, 140, 240, 0.28)',
              willChange: 'transform, opacity'
            }}
            aria-hidden="true"
          />
          {/* Crisp Glowing Center Dot */}
          <div
            ref={dotRef}
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gradient-to-tr from-[#008cf0] to-emerald-400 pointer-events-none z-[9999] opacity-0"
            style={{
              boxShadow: '0 0 8px rgba(16, 185, 129, 0.75)',
              willChange: 'transform, opacity'
            }}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}
