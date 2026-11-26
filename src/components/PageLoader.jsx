import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageLoader() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const location = useLocation();

  // Simple, fast initial page loader
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 350);
    const removeTimer = setTimeout(() => setInitialLoading(false), 650);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Slim top bar on route transitions
  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => setRouteLoading(false), 280);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Slim top progress bar on page navigation */}
      {routeLoading && !initialLoading && (
        <div className="fixed top-0 left-0 right-0 z-[9998] h-[3px] pointer-events-none overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#008cf0] via-emerald-400 to-[#008cf0] animate-pulse w-full" />
        </div>
      )}

      {/* Simple, clean minimal loader */}
      {initialLoading && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity duration-300 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-11 h-11 rounded-full border-[3.5px] border-slate-200 border-t-[#008cf0] border-r-emerald-500 animate-spin" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
              Loading...
            </span>
          </div>
        </div>
      )}
    </>
  );
}
