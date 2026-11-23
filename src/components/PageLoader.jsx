import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, MapPin } from 'lucide-react';

export default function PageLoader() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(15);
  const [routeLoading, setRouteLoading] = useState(false);
  const location = useLocation();

  // 1. Initial Splash Loader with Smooth Progress
  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(45), 200);
    const timer2 = setTimeout(() => setProgress(78), 500);
    const timer3 = setTimeout(() => setProgress(100), 850);

    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1100);

    const removeTimer = setTimeout(() => {
      setInitialLoading(false);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // 2. Top Bar Loading Effect on Route Change
  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Top Slim Glow Progress Bar on Navigation */}
      {routeLoading && !initialLoading && (
        <div className="fixed top-0 left-0 right-0 z-[9998] h-[3px] overflow-hidden pointer-events-none">
          <div className="h-full bg-gradient-to-r from-emerald-400 via-[#008cf0] to-cyan-400 shadow-[0_0_12px_rgba(0,140,240,0.8)] animate-pulse w-full transition-all duration-300" />
        </div>
      )}

      {/* Main Full-Screen Brand Splash Loader */}
      {initialLoading && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030914] text-white transition-all duration-700 ease-in-out ${
            fadeOut ? 'opacity-0 scale-102 pointer-events-none' : 'opacity-100 scale-100'
          }`}
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Ambient Radial Background Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#008cf0]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Center Brand Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
            
            {/* Spinning & Glowing Logo Wrapper */}
            <div className="relative mb-6">
              {/* Outer Rotating Glowing Ring */}
              <div className="absolute -inset-2 rounded-full border-2 border-transparent border-t-[#008cf0] border-r-emerald-400 animate-spin" style={{ animationDuration: '2s' }} />
              
              {/* Pulsing Glow Aura */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#008cf0]/40 to-emerald-400/30 blur-md animate-pulse" />

              {/* Logo Circle */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-2xl border-2 border-slate-700/60 overflow-hidden flex items-center justify-center">
                <img
                  src="/logo.jpeg"
                  alt="Aspire MediaTech Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Brand Title */}
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
              ASPIRE <span className="text-[#008cf0]">MEDIATECH</span>
            </h1>

            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>INNOVATE • OPTIMIZE • GROW</span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-64 sm:w-72 bg-slate-800/80 rounded-full h-2 p-0.5 border border-slate-700/80 shadow-inner overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-[#008cf0] to-cyan-400 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(0,140,240,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Progress Percentage & Status */}
            <div className="flex items-center justify-between w-64 sm:w-72 text-[11px] font-mono text-slate-400 mb-6">
              <span className="text-slate-400">Loading Experience...</span>
              <span className="text-emerald-400 font-bold">{progress}%</span>
            </div>

            {/* Bottom Verified Headquarters Pill */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lucknow HQ • Near Lulu Mall</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

