import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, CheckCircle2, ShieldCheck, 
  ChevronLeft, ChevronRight, Sparkles, PhoneCall 
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function HeroAutoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const photoSlides = [
    {
      id: 'web-dev',
      title: 'Web Engineering & Enterprise Portals',
      category: 'MERN & Full-Stack Architecture',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
      badge: 'Web Innovation',
      metric: 'Starting ₹8,000',
      desc: 'Sub-second latency, on-page SEO, custom CMS & automated AWS deployments.'
    },
    {
      id: 'mobile-apps',
      title: 'Cross-Platform Android & iOS Apps',
      category: 'Telemedicine & Delivery Ecosystems',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&auto=format&fit=crop&q=80',
      badge: 'Mobile Product',
      metric: 'Starting ₹20,000',
      desc: 'Real-time GPS tracking, video consultation, and instant payment gateways.'
    },
    {
      id: 'ecommerce',
      title: 'Turnkey E-Commerce & Marketplace Scaling',
      category: 'Shopify Plus, WooCommerce & Amazon',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
      badge: 'Commerce Growth',
      metric: 'Stores from ₹25,000',
      desc: 'High-converting checkout funnels, dynamic inventory sync, and Amazon A+ content.'
    },
    {
      id: 'performance-ads',
      title: 'Precision Meta & Google Ad Campaigns',
      category: 'Performance Marketing & High ROAS',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80',
      badge: '4.8x Average ROAS',
      metric: 'Ads from ₹3,000',
      desc: 'Full-funnel audience retargeting, search intent harvesting, and monthly ROI audits.'
    },
    {
      id: 'creative-reels',
      title: 'High-Energy Reels & Brand Identity',
      category: 'Commercial Video & Graphic Systems',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&auto=format&fit=crop&q=80',
      badge: 'Viral Formats',
      metric: 'Reels from ₹800',
      desc: 'Scroll-stopping vertical video edits, sound mastering, motion graphics, and logo kits.'
    }
  ];

  // Auto-advance photos every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photoSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [photoSlides.length]);

  const active = photoSlides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200">
      
      {/* Subtle decorative background shapes with pulse animation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#008cf0]/5 rounded-full blur-3xl pointer-events-none animate-pulseGlow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none animate-pulseGlow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 animate-fadeInUp">
            
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Turn Your Digital Vision Into <br />
              <span className="text-gradient-blue-green">
                Unstoppable Market Growth
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              We engineer production-grade web applications, cross-platform mobile apps, turnkey e-commerce systems, and high-ROI Meta & Google ad campaigns under one unified roof in Lucknow.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/catalogue"
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#008cf0] to-emerald-600 hover:from-blue-600 hover:to-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              >
                <BookOpen className="w-4 h-4 text-emerald-200" />
                <span>Explore Digital Catalogue & Prices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${companyInfo.phoneClean}`}
                className="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Call {companyInfo.phone}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600 border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Outsourcing Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ISO & Code Review Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#008cf0]" />
                <span>Lucknow Felix Square HQ</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Photo Carousel with Floating Animations (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              
              {/* Photo Frame with smooth transition */}
              <div className="relative h-80 sm:h-96 md:h-[420px] w-full overflow-hidden">
                <img
                  src={active.image}
                  alt={active.title}
                  key={active.id}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover transition-all duration-700 ease-out transform scale-100 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                {/* Top Corner Badge */}
                <div className="absolute top-4 left-4 z-10 animate-float">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-bold shadow-lg border border-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#008cf0]" />
                    <span>{active.badge}</span>
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10 animate-floatSlow">
                  <span className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-lg">
                    {active.metric}
                  </span>
                </div>

                {/* Bottom Photo Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1.5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl">
                  <span className="text-[10px] font-extrabold tracking-wider text-[#008cf0] uppercase">
                    {active.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                    {active.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-snug">
                    {active.desc}
                  </p>
                </div>
              </div>

              {/* Prev / Next controls */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + photoSlides.length) % photoSlides.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % photoSlides.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 z-20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide Navigation Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {photoSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'w-8 bg-[#008cf0]'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
