import React from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/companyInfo';
import { 
  Building, MapPin, Award, Users, CheckCircle2, ArrowRight, 
  Target, Eye, Zap, Shield, Laptop, TrendingUp, Phone, Mail, Download
} from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-24 py-12 pb-24 bg-white">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold uppercase tracking-wider">
          Company Profile & Engineering DNA
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
          Bridging the Gap Between <br />
          <span className="text-gradient-blue-green">
            Technology & Measurable Business Growth
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Aspire MediaTech Solutions is an end-to-end technology and digital marketing company headquartered in Lucknow, Uttar Pradesh.
        </p>
      </section>

      {/* Story & Headquarter Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
              Founded With Vision
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              We Don't Just Offer Services — We Build Long-Term Growth Partnerships
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Founded with a clear vision to bridge the gap between complex modern engineering and direct business revenue, Aspire MediaTech Solutions combines technical mastery with creative thinking to deliver measurable results.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every solution we deliver is tailored to your unique business needs, ensuring maximum Return on Investment (ROI) and sustainable digital growth. Our team of passionate professionals brings years of industry experience across modern web development, cross-platform mobile apps, digital advertising (Meta & Google Ads), SEO, and multimedia production.
            </p>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Headquarters: Lucknow, Uttar Pradesh</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    2nd Floor, 203-A, Felix Square, Sushant Golf City, Lucknow, UP 226030
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/catalogue"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-emerald-600 hover:from-blue-600 hover:to-emerald-700 text-white font-bold text-sm shadow-brand flex items-center gap-2"
              >
                <span>View Full Service Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/catalog.pdf"
                download="Aspire_MediaTech_Catalog.pdf"
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 text-sm font-semibold flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-brand-blue" />
                <span>Download Catalog PDF</span>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white p-8 space-y-8 shadow-card">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="p-1 bg-white rounded-full shadow-md border-2 border-brand-blue/30">
                  <img src="/logo.jpeg" alt="Aspire MediaTech Logo" className="w-14 h-14 object-contain rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Aspire MediaTech Solutions</h3>
                  <p className="text-xs text-emerald-700 font-bold tracking-wider uppercase">
                    INNOVATE • OPTIMIZE • GROW
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {companyInfo.stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-3xl font-extrabold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-100 space-y-2">
                <div className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                  Our Commitment to Every Client
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  "No guesswork, no vague promises. We provide live analytics dashboards, dedicated account managers, and documented monthly ROI performance reports."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl bg-white border border-slate-200 p-8 space-y-4 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be the premier digital transformation engine for Indian enterprises and emerging brands, enabling them to outpace competitors through cutting-edge technology and precision marketing.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-8 space-y-4 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Empowering business owners with scalable, production-grade software and transparent, high-ROI marketing strategies that generate tangible revenue growth without unpredictable costs.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-8 space-y-4 shadow-card hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Core Values</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Transparency, technical rigor, speed of execution, creative innovation, and relentless focus on client ROI. We win only when our clients win.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Detailed Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
            The 4 Foundational Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why Partner With Aspire MediaTech?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {companyInfo.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center font-extrabold text-sm border border-blue-100">
                  {idx + 1}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed pl-11">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Connect with Leadership */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-700 text-white space-y-6 shadow-brand">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Looking for a Trusted Tech & Marketing Partner?
          </h3>
          <p className="text-blue-50 text-sm sm:text-base max-w-2xl mx-auto">
            Schedule a direct consultation with our technical leads and campaign managers at our Lucknow office or via video conference.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl bg-white text-slate-900 hover:bg-slate-50 font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-4 h-4 text-brand-blue" />
            </Link>
            <a
              href={`tel:${companyInfo.phoneClean}`}
              className="px-6 py-3.5 rounded-xl bg-black/25 hover:bg-black/40 text-white font-semibold text-sm border border-white/20 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>{companyInfo.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
