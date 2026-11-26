import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import catalogData from '../data/catalogData.json';
import MotionReveal from '../components/MotionReveal';
import { 
  Code, Smartphone, ShoppingCart, Video, Palette, TrendingUp, 
  Layers, CheckCircle2, ArrowRight, ShieldCheck, Download, Sparkles, ExternalLink
} from 'lucide-react';

export default function Services() {
  const [activeTab, setActiveTab] = useState('web-development');

  const categories = catalogData.categories.filter(c => c.id !== 'mega-plans');

  const iconMap = {
    'web-development': Code,
    'app-development': Smartphone,
    'industry-apps': Layers,
    'app-addons-bundles': Smartphone,
    'ecommerce-bundles': ShoppingCart,
    'creative-video': Video,
    'digital-ads': TrendingUp,
  };

  const selectedCategory = categories.find(c => c.id === activeTab) || categories[0];
  const IconComponent = iconMap[selectedCategory.id] || Code;

  return (
    <div className="space-y-20 py-12 pb-24 bg-white">
      {/* Header */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold uppercase tracking-wider">
          Lucknow Digital Marketing & Software Services
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
          Best Digital Marketing & <br />
          <span className="text-gradient-blue-green">
            Software Development in Lucknow
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto">
          Custom websites, mobile apps, SEO, Google Ads, and Meta Ads tailored for startups and businesses across Lucknow.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-200">
          {categories.map((cat) => {
            const CatIcon = iconMap[cat.id] || Code;
            const isSelected = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-blue text-white shadow-brand border border-brand-blue'
                    : 'bg-white text-slate-700 hover:text-brand-blue hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <CatIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-brand-blue'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Category Content */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-10 space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-brand-blue border border-blue-200">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {selectedCategory.name}
              </h2>
              <p className="text-slate-600 text-sm">
                {selectedCategory.description}
              </p>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCategory.items.map((item, idx) => (
            <div
              key={`${selectedCategory.id}-${idx}`}
              className="rounded-2xl bg-white border border-slate-200 hover:border-brand-blue p-6 flex flex-col justify-between space-y-5 transition-all duration-300 hover:-translate-y-1.5 shadow-card hover:shadow-card-hover animate-fadeInUp"
              style={{ animationDelay: `${idx * 65}ms` }}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {item.price}
                  </span>
                </div>

                {item.duration && (
                  <div className="text-[11px] font-semibold text-slate-600 mb-3">
                    ⏱ Estimated Timeline: <span className="text-slate-900">{item.duration}</span>
                  </div>
                )}
                {item.platform && (
                  <div className="text-[11px] font-semibold text-slate-600 mb-3">
                    🌐 Platform: <span className="text-slate-900">{item.platform}</span>
                  </div>
                )}
                {item.category && (
                  <div className="text-[11px] font-semibold text-slate-600 mb-3">
                    📌 Category: <span className="text-slate-900">{item.category}</span>
                  </div>
                )}

                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {item.features?.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/catalogue"
                  className="text-xs font-bold text-brand-blue hover:text-emerald-600 flex items-center gap-1"
                >
                  Catalogue Details <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  to="/contact"
                  className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-brand-blue text-brand-blue hover:text-white border border-blue-200 text-xs font-bold transition-colors"
                >
                  Order Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider">
              Engineered for Speed & Scale
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Our Technology & Production Arsenal
            </h2>
            <p className="text-slate-600 text-sm">
              We leverage modern industry standards to guarantee rock-solid stability, sub-second latency, and maximum search ranking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-brand-blue uppercase tracking-wider">Frontend</h4>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• React.js & Next.js (App Router)</li>
                <li>• TypeScript & Modern ESNext</li>
                <li>• Tailwind CSS & CSS Modules</li>
                <li>• Accessible, Mobile-First Design</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wider">Backend & Cloud</h4>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• Node.js & Express.js REST/GraphQL</li>
                <li>• Python (Django / FastAPI)</li>
                <li>• PostgreSQL, MongoDB, Redis</li>
                <li>• AWS (EC2, S3, CloudFront), Docker</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-blue-700 uppercase tracking-wider">Mobile Apps</h4>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• React Native (Android & iOS)</li>
                <li>• Flutter Cross-Platform</li>
                <li>• Firebase Push Notifications</li>
                <li>• Razorpay / Stripe Mobile SDK</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-purple-700 uppercase tracking-wider">Growth & Marketing</h4>
              <ul className="text-xs text-slate-600 space-y-1.5 font-medium">
                <li>• Meta Ads (CAPI & Dynamic Catalog)</li>
                <li>• Google Ads (Search & Shopping)</li>
                <li>• App Store Optimization (ASO)</li>
                <li>• Technical On-Page & Off-Page SEO</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Download Catalogue CTA */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <div className="p-10 rounded-2xl bg-white border-2 border-slate-200 space-y-4 shadow-card">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Need the Complete Official Price Catalog?
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Download our verified 21-page PDF service portfolio complete with deliverable matrices, timelines, and package comparisons.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/catalog.pdf"
              download="Aspire_MediaTech_Catalog.pdf"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-emerald-600 hover:from-blue-600 hover:to-emerald-700 text-white font-bold text-sm shadow-brand flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-200" />
              <span>Download Official Catalog (PDF)</span>
            </a>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-sm"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
