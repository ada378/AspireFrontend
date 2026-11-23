import React from 'react';
import { Link } from 'react-router-dom';
import HeroAutoCarousel from '../components/HeroAutoCarousel';
import { companyInfo } from '../data/companyInfo';
import { portfolioProjects } from '../data/portfolioData';
import catalogData from '../data/catalogData.json';
import {
  Code, Smartphone, ShoppingCart, Video, Palette, TrendingUp,
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Download,
  Layers, ChevronRight, Sparkles, Building2, PhoneCall, Building, Star
} from 'lucide-react';

export default function Home() {
  const serviceCards = [
    {
      icon: Code,
      title: 'Web & Custom Applications',
      price: 'Starting ₹8,000',
      desc: 'High-speed, conversion-focused websites, MERN web applications, client portals & custom software.',
      tag: 'Full-Stack MERN'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      price: 'Starting ₹20,000',
      desc: 'Native & cross-platform Android & iOS apps with real-time GPS, maps & payment gateway integration.',
      tag: 'Android & iOS'
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce Infrastructure',
      price: 'Starting ₹12,000',
      desc: 'Shopify Plus, WooCommerce custom architectures, Amazon & Flipkart brand stores and ad setup.',
      tag: 'Shopify / Custom'
    },
    {
      icon: TrendingUp,
      title: 'Meta & Google Ads Management',
      price: 'Starting ₹3,000',
      desc: 'Data-driven high ROAS campaigns, search ads, dynamic retargeting, and budget optimization.',
      tag: 'High ROAS'
    },
    {
      icon: Video,
      title: 'Short Reels & Video Production',
      price: 'Starting ₹800/video',
      desc: 'High-engagement Instagram reels, YouTube long-form editing, promo videos & motion graphics.',
      tag: 'Viral Formats'
    },
    {
      icon: Palette,
      title: 'Brand Identity & UI/UX Systems',
      price: 'Starting ₹2,000',
      desc: 'Distinctive logo design, complete brand identity guidelines, social media assets & Figma systems.',
      tag: 'Brand Kits'
    }
  ];

  const megaPlans = catalogData.categories.find(c => c.id === 'mega-plans')?.items || [];

  return (
    <div className="space-y-20 pb-20 bg-white">

      {/* Hero Section with Auto Photo Carousel (Directly under Navbar as requested) */}
      <HeroAutoCarousel />

      {/* Trusted Clients Social Proof Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-7 px-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Trusted by Progressive Indian Brands:
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {companyInfo.clients.map((c, i) => (
              <div key={i} className="flex items-center gap-2 group">
                <Building className="w-4 h-4 text-brand-green" />
                <span className="text-sm font-bold text-slate-800 group-hover:text-brand-blue transition-colors">
                  {c.name}
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  • {c.industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews & Rating Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-amber-50 via-white to-blue-50/70 border border-amber-200/90 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white border border-amber-200 shadow-md flex flex-col items-center justify-center p-2 shrink-0">
              {/* Google colored G icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span className="text-[10px] font-black text-slate-800">4.9 ★</span>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
                <div className="flex text-amber-500 text-xs sm:text-sm">
                  ★ ★ ★ ★ ★
                </div>
                <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                  4.9 / 5.0 Rating on Google
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                Loved Working With Us? Leave a Review on Google!
              </h3>
              <p className="text-xs text-slate-600 max-w-xl">
                Your feedback helps us continuously innovate and supports growing businesses across Lucknow in choosing the right digital partner.
              </p>
            </div>
          </div>

          <a
            href={companyInfo.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shrink-0 whitespace-nowrap"
          >
            <Star className="w-4 h-4 fill-white text-white" />
            <span>Review Us on Google</span>
            <ArrowRight className="w-4 h-4 text-amber-200" />
          </a>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold tracking-wider uppercase">
              Full-Stack Digital Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              End-to-End Technology & Growth Services
            </h2>
            <p className="text-slate-600 max-w-xl text-sm sm:text-base">
              Every deliverable is engineered with precision, documented source code, and transparent pricing.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-emerald-600 transition-colors group self-start md:self-auto"
          >
            <span>Explore All 8 Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-white border border-slate-200 hover:border-brand-blue p-7 transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 p-2.5 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Icon className="w-full h-full" />
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800">
                    {srv.price}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-brand-blue tracking-wider uppercase mb-1">
                  {srv.tag}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-blue transition-colors">
                  {srv.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {srv.desc}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <Link to="/catalogue" className="text-brand-blue hover:text-emerald-600 flex items-center gap-1">
                    Check Pricing Matrix <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link to="/contact" className="text-slate-500 hover:text-slate-900">
                    Request Proposal
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Digital Catalogue Spotlight Section (White, Blue, Green with Unclipped Badge) */}
      <section className="relative overflow-visible bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
              OFFICIAL 21-PAGE DIGITAL CATALOGUE & PRICING
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900">
              Transparent Pricing. Zero Hidden Fees.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Every deliverable, timeline, add-on, and bundled package from our official catalog is organized right here. No guessing, just clear ROI.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/catalogue"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-emerald-600 hover:from-blue-600 hover:to-emerald-700 text-white font-bold text-sm shadow-brand hover:shadow-green transition-all flex items-center gap-2"
              >
                <span>Open Interactive Catalogue & Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/catalog.pdf"
                download="Aspire_MediaTech_Catalog.pdf"
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-semibold text-sm transition-colors flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-brand-blue" />
                <span>Download Official PDF (11 MB)</span>
              </a>
            </div>
          </div>

          {/* Mega Growth Plans Grid (Clean in-flow badge: NEVER CLIPPED!) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {megaPlans.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl p-8 transition-all flex flex-col justify-between ${plan.isPopular
                  ? 'bg-white border-2 border-emerald-500 shadow-xl'
                  : 'bg-white border-2 border-slate-200 shadow-card'
                  }`}
              >
                <div>
                  {/* Top Tag Row with Badge in normal flow (Never Clipped!) */}
                  <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                      {plan.audience}
                    </span>
                    {plan.isPopular && (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                        ★ Most Selected Growth Program
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {plan.title}
                    </h3>
                    <p className="text-xs italic text-emerald-700 font-bold">
                      "{plan.tagline}"
                    </p>

                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {plan.savings}
                    </p>
                  </div>

                  {/* Services included list */}
                  <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      What's Included in Package:
                    </h4>
                    <ul className="space-y-2.5">
                      {plan.services.map((s, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900">{s.name}: </span>
                            <span className="text-slate-600">{s.details}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Free Bonuses */}
                  <div className="mt-6 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Bonus Privileges Included:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-700 font-medium">
                      {plan.bonuses.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5">
                          <span className="text-emerald-600 font-bold">✔</span> {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/contact"
                    className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${plan.isPopular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-green'
                      : 'bg-brand-blue hover:bg-blue-600 text-white shadow-brand'
                      }`}
                  >
                    <span>Get Started With {plan.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Aspire MediaTech Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold tracking-wider uppercase">
            The Aspire Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why Businesses Across India Partner With Us
          </h2>
          <p className="text-slate-600 text-base">
            We combine high-level technical engineering with high-converting creative performance marketing under one unified roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 hover:border-brand-blue shadow-card hover:shadow-card-hover transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-sm border border-blue-100">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5-Step Agile Delivery Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50 rounded-2xl p-8 sm:p-12 border border-slate-200">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Structured Execution
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Our 5-Step Agile Delivery Workflow
          </h2>
          <p className="text-slate-600 text-sm">
            From initial research to automated AWS deployment, we follow a transparent sprint methodology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {companyInfo.workflow.map((item, idx) => (
            <div key={idx} className="relative p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-2xl font-black text-brand-blue">
                {item.step}
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Portfolio Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Recent Case Studies & Solutions
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-emerald-600"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioProjects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white border border-slate-200 overflow-hidden hover:border-brand-blue transition-all hover:-translate-y-1 shadow-card hover:shadow-card-hover flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 text-slate-900 text-[11px] font-bold shadow-sm">
                  {project.industry}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300 shadow-sm">
                  {project.priceTier}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center bg-slate-50 rounded-xl">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-xs font-bold text-emerald-700">{m.value}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-brand-blue border border-blue-100 font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lucknow Office CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand-blue via-blue-600 to-emerald-700 p-8 sm:p-14 text-white shadow-brand">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              <Building2 className="w-3.5 h-3.5 text-emerald-300" /> Felix Square, Sushant Golf City, Lucknow
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Accelerate Your Digital Revenue?
            </h2>
            <p className="text-blue-50 text-base sm:text-lg leading-relaxed">
              Contact our engineering and growth specialists today for a free discovery session, architecture audit, or tailored project quote.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Book Free Discovery Call</span>
                <ArrowRight className="w-4 h-4 text-brand-blue" />
              </Link>
              <a
                href={`tel:${companyInfo.phoneClean}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/40 hover:bg-slate-900/60 text-white font-bold text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-300" />
                <span>Call: {companyInfo.phone}</span>
              </a>
              <a
                href={companyInfo.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Review Us on Google</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
