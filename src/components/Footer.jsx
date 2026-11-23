import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowUpRight, Download, ShieldCheck, Navigation } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center shrink-0 overflow-hidden">
                <img src="/logo.jpeg" alt="Aspire MediaTech Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  ASPIRE <span className="text-[#008cf0]">MEDIATECH</span>
                </span>
                <p className="text-[11px] font-bold text-emerald-400 tracking-widest uppercase">
                  INNOVATE • OPTIMIZE • GROW
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Headquartered in Lucknow, Aspire MediaTech Solutions bridges the gap between technology and measurable business growth. We deliver production-grade web applications, custom mobile apps, e-commerce ecosystems, and high-converting marketing campaigns.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="/catalog.pdf"
                download="Aspire_MediaTech_Catalog.pdf"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download 21-Page Catalog PDF</span>
              </a>
            </div>
          </div>

          {/* Quick Pages */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#008cf0] transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-[#008cf0] transition-colors">About Our Agency</Link></li>
              <li><Link to="/services" className="hover:text-[#008cf0] transition-colors">Full Services</Link></li>
              <li><Link to="/catalogue" className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-semibold text-slate-200">Digital Catalogue <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold">Official</span></Link></li>
              <li><Link to="/portfolio" className="hover:text-[#008cf0] transition-colors">Portfolio & Work</Link></li>
              <li><Link to="/contact" className="hover:text-[#008cf0] transition-colors">Contact Office</Link></li>
            </ul>
          </div>

          {/* Digital Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Capabilities</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-[#008cf0] transition-colors">Website & MERN Apps</Link></li>
              <li><Link to="/services" className="hover:text-[#008cf0] transition-colors">Android & iOS Apps</Link></li>
              <li><Link to="/services" className="hover:text-[#008cf0] transition-colors">Shopify & WooCommerce</Link></li>
              <li><Link to="/services" className="hover:text-[#008cf0] transition-colors">Meta & Google Ads</Link></li>
              <li><Link to="/services" className="hover:text-[#008cf0] transition-colors">Short Reels & Videos</Link></li>
              <li><Link to="/catalogue" className="text-emerald-400 hover:underline flex items-center gap-1 font-medium">Market Dominator Plan (₹65k) <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Lucknow Office</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span className="text-slate-300 leading-snug">
                  {companyInfo.address}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#008cf0] shrink-0" />
                <a href={`tel:${companyInfo.phoneClean}`} className="text-slate-200 hover:text-[#008cf0] font-medium">
                  {companyInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="text-slate-300 hover:text-white break-all">
                  {companyInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300">
                  {companyInfo.website}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Embedded Google Map Card (GMB Verified Location) */}
        <div className="py-10 border-b border-slate-800">
          <div className="bg-slate-950/90 rounded-3xl border border-slate-800 p-5 sm:p-7 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" /> Google My Business Verified Office
                </div>
                <h3 className="text-white font-extrabold text-lg sm:text-xl mt-2">
                  Visit Aspire MediaTech Solutions — Near Lulu Mall, Lucknow
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  1st Floor, 203 A, Felix Square, Sushant Golf City, Ansal API, Near Lulu Mall, Lucknow, Uttar Pradesh 226030
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={`tel:${companyInfo.phoneClean}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#008cf0]" />
                  <span>+91 9194035877</span>
                </a>

                <a
                  href={companyInfo.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md"
                  title="Write a Google Review for Aspire MediaTech Solutions"
                >
                  <span className="text-amber-950 font-black">★</span>
                  <span>Review on Google</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={companyInfo.gmbSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#008cf0] to-blue-600 hover:from-blue-600 hover:to-[#008cf0] text-white text-xs font-bold transition-all shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Iframe */}
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.6012343108514!2d80.98716667521958!3d26.78143307672545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be56c204af0a9%3A0x45896baee3262ec8!2sAspire%20MediaTech%20Solutions!5e1!3m2!1sen!2sin!4v1795459051751!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Aspire MediaTech Solutions Official Google Map Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aspire MediaTech Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Felix Square, Near Lulu Mall, Lucknow, UP</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">ISO-Aligned Delivery & Transparency</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
