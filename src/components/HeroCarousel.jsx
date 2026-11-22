import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, ArrowRight, BookOpen, ShieldCheck, 
  Code, Smartphone, ShoppingCart, TrendingUp, Crown, CheckCircle2,
  Clock, Sparkles
} from 'lucide-react';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideInterval = useRef(null);

  const slides = [
    {
      id: 'web-apps',
      pillar: 'ENGINEERING & ARCHITECTURE',
      tagline: 'INNOVATE',
      title: 'High-Performance Web Applications & Portals',
      subtitle: 'From responsive business websites to custom full-stack MERN portals. Engineered with clean architecture, sub-second latency, and search engine dominance.',
      priceTag: 'Projects from ₹8,000 | Business Suite ₹15,000 - ₹25,000',
      icon: Code,
      accentColor: 'text-[#8cc800]',
      bgGradient: 'from-[#008cf0]/20 via-[#040d1a] to-[#040d1a]',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80',
      metrics: [
        { label: 'Architecture', val: 'MERN / Next.js' },
        { label: 'Turnaround', val: '7 - 14 Days' },
        { label: 'Deliverable', val: '100% Source Code' }
      ],
      highlights: [
        'Custom Web Applications & Enterprise Dashboards',
        'Built-in Payment Gateway & SSL Security',
        'Speed Optimization with 90+ PageSpeed Scores',
        'Tailored Role-Based Access Control (RBAC)'
      ],
      primaryLink: '/services',
      primaryBtnText: 'Explore Web Engineering',
      secondaryLink: '/catalogue',
      secondaryBtnText: 'View Pricing in Catalogue'
    },
    {
      id: 'mobile-ecosystem',
      pillar: 'MOBILE PRODUCT DEVELOPMENT',
      tagline: 'TRANSFORM',
      title: 'Native & Cross-Platform Mobile Applications',
      subtitle: 'Purpose-built applications for Android & iOS: Healthcare Telemedicine, Swiggy-type Food Delivery, E-Learning Portals, and On-Demand Services.',
      priceTag: 'Android Apps from ₹20,000 | Turnkey Systems ₹60,000+',
      icon: Smartphone,
      accentColor: 'text-[#00b4d8]',
      bgGradient: 'from-[#00b4d8]/20 via-[#040d1a] to-[#040d1a]',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000&auto=format&fit=crop&q=80',
      metrics: [
        { label: 'Platform', val: 'Android & iOS' },
        { label: 'Core Stack', val: 'React Native / Flutter' },
        { label: 'Backend', val: 'Node.js REST APIs' }
      ],
      highlights: [
        'Real-time GPS Tracking & Map Integrations',
        'Doctor Appointment & Telemedicine Systems',
        'In-app Payment Escrow & Auto-Invoicing',
        'App Store & Play Store Publishing Support'
      ],
      primaryLink: '/services',
      primaryBtnText: 'Explore Mobile Solutions',
      secondaryLink: '/catalogue',
      secondaryBtnText: 'Check App Bundles'
    },
    {
      id: 'ecommerce-growth',
      pillar: 'E-COMMERCE & MARKETPLACE',
      tagline: 'OPTIMIZE',
      title: 'End-to-End Online Stores & Amazon Domination',
      subtitle: 'Complete e-commerce infrastructure: custom headless storefronts, Shopify Plus setup, WooCommerce scaling, Amazon A+ Content, and Brand Stores.',
      priceTag: 'Starter Store ₹25,000 | Growth Store ₹45,000 | Elite ₹80,000',
      icon: ShoppingCart,
      accentColor: 'text-[#8cc800]',
      bgGradient: 'from-[#8cc800]/20 via-[#040d1a] to-[#040d1a]',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
      metrics: [
        { label: 'Store Types', val: 'Shopify / Custom' },
        { label: 'Marketplaces', val: 'Amazon & Flipkart' },
        { label: 'Conversion', val: 'Optimized Checkout' }
      ],
      highlights: [
        'Payment Gateway Integration (Razorpay, Cashfree)',
        'Product Photography Editing & Listing Design',
        'Competitor Analysis & Keyword Indexing',
        'Automated Shipping & WhatsApp Order Updates'
      ],
      primaryLink: '/services',
      primaryBtnText: 'Explore E-Commerce',
      secondaryLink: '/catalogue',
      secondaryBtnText: 'View Store Bundles'
    },
    {
      id: 'performance-marketing',
      pillar: 'PERFORMANCE MARKETING & ADS',
      tagline: 'SCALE',
      title: 'Precision Meta & Google Ads With Proven ROAS',
      subtitle: 'Stop wasting budget on guesswork. We deploy full-funnel ad campaigns across Meta, Google Search, and Shopping with strict CPA and ROI targets.',
      priceTag: 'Ad Setup from ₹3,000 | Monthly Management from ₹5,000/mo',
      icon: TrendingUp,
      accentColor: 'text-[#008cf0]',
      bgGradient: 'from-[#008cf0]/20 via-[#040d1a] to-[#040d1a]',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
      metrics: [
        { label: 'Ad Channels', val: 'Meta & Google Ads' },
        { label: 'Client Spend', val: '₹1.5Cr+ Managed' },
        { label: 'Average ROAS', val: '4.8x' }
      ],
      highlights: [
        'Meta Conversions API (CAPI) & Dynamic Retargeting',
        'Google High-Intent Search & Performance Max Ads',
        'A/B Creative Testing & Ad Copywriting',
        'Live Real-time Performance Tracking'
      ],
      primaryLink: '/services',
      primaryBtnText: 'Explore Ad Management',
      secondaryLink: '/catalogue',
      secondaryBtnText: 'Compare Ad Packages'
    },
    {
      id: 'market-dominator',
      pillar: 'ALL-IN-ONE GROWTH PROGRAM',
      tagline: 'DOMINATE',
      title: 'Market Dominator Suite: Complete Business Engine',
      subtitle: 'The flagship monthly program for businesses ready to dominate their category: custom website, e-commerce store, 20 social designs, 8 reels, and ads.',
      priceTag: 'All-Inclusive: ₹65,000 / month (Save ₹32,000+ standalone)',
      icon: Crown,
      accentColor: 'text-[#8cc800]',
      bgGradient: 'from-[#7828f0]/20 via-[#040d1a] to-[#040d1a]',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80',
      metrics: [
        { label: 'Package Type', val: 'All-Inclusive Growth' },
        { label: 'Target Audience', val: 'Established Brands' },
        { label: 'Support', val: 'Dedicated Lead' }
      ],
      highlights: [
        'Advanced Website + SEO + Speed Optimization',
        'Full Online Store Setup + Payment Gateway',
        '20 Premium Brand Creatives + 8 High-Energy Reels',
        'Full Meta & Google Ad Campaign Management',
        'BONUS: FREE Live Dashboard & Strategy Sessions'
      ],
      primaryLink: '/catalogue',
      primaryBtnText: 'Review Dominator Plan',
      secondaryLink: '/contact',
      secondaryBtnText: 'Claim Your Slot'
    }
  ];

  // Auto-play logic
  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6500);
    }
    return () => clearInterval(slideInterval.current);
  }, [isPaused, slides.length]);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section 
      className="relative overflow-hidden bg-[#040d1a] border-b border-[#008cf0]/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Innovative Services Showcase"
    >
      {/* Background Subtle Gradient & Grid matching the logo */}
      <div className={`absolute inset-0 bg-gradient-to-r ${active.bgGradient} transition-colors duration-700 opacity-70`} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#008cf00a_1px,transparent_1px),linear-gradient(to_bottom,#008cf00a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:py-20">
        
        {/* Main Slide Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline & Pillar Tag */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-md bg-[#008cf0]/15 border border-[#008cf0]/30 text-slate-200 text-xs font-semibold tracking-wider uppercase">
                {active.pillar}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#8cc800]/20 border border-[#8cc800]/40 text-[#8cc800] text-xs font-bold tracking-widest uppercase">
                {active.tagline}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] transition-all">
              {active.title}
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {active.subtitle}
            </p>

            {/* Price Anchor Box */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#091b36] border border-[#008cf0]/30 text-xs sm:text-sm font-semibold text-slate-200 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8cc800]" />
              <span>{active.priceTag}</span>
            </div>

            {/* Key Deliverables Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {active.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#8cc800] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to={active.primaryLink}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#008cf0] to-[#0070d8] hover:from-[#0070d8] hover:to-[#008cf0] text-white font-bold text-sm shadow-brand transition-all flex items-center justify-center gap-2"
              >
                <span>{active.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 text-[#8cc800]" />
              </Link>
              <Link
                to={active.secondaryLink}
                className="px-6 py-3.5 rounded-xl bg-[#091b36] hover:bg-[#0e274e] text-slate-200 border border-[#008cf0]/30 text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#8cc800]" />
                <span>{active.secondaryBtnText}</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Visual Case Presentation (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-[#091b36] border border-[#008cf0]/30 shadow-card group">
              
              {/* Image with subtle gradient mask */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img 
                  src={active.image} 
                  alt={active.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091b36] via-[#091b36]/30 to-transparent" />
                
                <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-[#040d1a]/90 text-[#8cc800] text-xs font-bold border border-[#008cf0]/30 backdrop-blur-md">
                  Active Capability
                </div>
              </div>

              {/* Specs & Metrics Cards */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center border-b border-slate-800 pb-4">
                  {active.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-sm sm:text-base font-extrabold text-white">
                        {m.val}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#8cc800]" /> Verified Delivery Guarantee
                  </span>
                  <span className="font-semibold text-slate-300">
                    Sushant Golf City, Lucknow
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Carousel Bottom Control Bar */}
        <div className="mt-12 pt-6 border-t border-[#008cf0]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Quick Pillar Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {slides.map((s, idx) => {
              const isSelected = idx === currentSlide;
              const IconComp = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#008cf0] text-white shadow-brand border border-[#008cf0]'
                      : 'bg-[#091b36] text-slate-300 hover:text-white hover:bg-[#0e274e] border border-[#008cf0]/20'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-[#8cc800]' : 'text-[#008cf0]'}`} />
                  <span>{s.tagline}: {s.id === 'market-dominator' ? 'Dominator' : s.id.split('-')[0].toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* Prev / Next & Indicators */}
          <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
            <span className="text-xs text-slate-400 font-mono">
              0{currentSlide + 1} / 0{slides.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="p-2 rounded-xl bg-[#091b36] hover:bg-[#0f294e] text-slate-200 hover:text-white border border-[#008cf0]/30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="p-2 rounded-xl bg-[#091b36] hover:bg-[#0f294e] text-slate-200 hover:text-white border border-[#008cf0]/30 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
