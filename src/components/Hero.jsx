import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, TrendingUp, Shield, Rocket, Smartphone, Globe, Sparkles } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-[#001030] via-[#051636] to-[#001030]">
      {/* Background Glows and Brand Gradients matching the logo (#0080f0, #80c000, #7020f0) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-brand-blue/20 via-brand-purple/20 to-brand-lime/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-brand-blue/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-lime/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0080f00a_1px,transparent_1px),linear-gradient(to_bottom,#0080f00a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-brand-blue/40 shadow-glow-blue animate-pulse-glow">
            <span className="w-2 h-2 rounded-full bg-brand-lime animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Lucknow's Premier Full-Stack & Growth Agency
            </span>
            <span className="text-brand-lime text-xs font-semibold">•</span>
            <span className="text-xs font-semibold text-brand-cyan">Innovate. Optimize. Grow.</span>
          </div>

          {/* Main Title with Brand Gradient */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Turn Your Digital Vision Into <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-blue-400">
              Unstoppable Market Growth
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            We build high-performance web applications, native & cross-platform mobile apps, bespoke e-commerce systems, and high-ROI Meta & Google ad campaigns under one single roof.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/catalogue"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-brand-blue via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-brand-blue text-white font-bold text-base shadow-brand hover:shadow-glow-blue transition-all transform hover:-translate-y-1"
            >
              <BookOpen className="w-5 h-5 text-brand-lime" />
              <span>Explore Digital Catalogue & Prices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-base border border-slate-700 hover:border-brand-blue/50 transition-all"
            >
              <Sparkles className="w-5 h-5 text-brand-cyan" />
              <span>Get Free Quote Consultation</span>
            </Link>
          </div>

          {/* Feature Badges list */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Transparent Pricing
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Modern MERN & Mobile Tech
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Dedicated Account Manager
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-lime" /> Felix Square, Lucknow Office
            </span>
          </div>

        </div>

        {/* Floating Brand Dashboard & Stats Showcase */}
        <div className="mt-16 sm:mt-20">
          <div className="relative mx-auto max-w-5xl rounded-2xl p-1 bg-gradient-to-r from-brand-blue/40 via-brand-purple/30 to-brand-lime/30 shadow-2xl">
            <div className="rounded-[15px] bg-[#071630]/95 backdrop-blur-xl p-6 sm:p-10 border border-brand-blue/20">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
                {companyInfo.stats.map((stat, idx) => (
                  <div key={idx} className="pt-4 md:pt-0 px-2 space-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brand-cyan">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Capabilities Ticker */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Featured Tech Stack & Frameworks:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {['React.js', 'Next.js', 'Node/Express', 'React Native', 'Tailwind CSS', 'Shopify', 'Meta Ads', 'Google Ads', 'AWS'].map((tag) => (
                    <span 
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 hover:border-brand-blue/40 hover:text-white transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

