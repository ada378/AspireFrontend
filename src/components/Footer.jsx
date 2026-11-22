import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowUpRight, Download, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  2nd Floor, 203-A, Felix Square, Sushant Golf City, Lucknow, UP 226030
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

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aspire MediaTech Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Felix Square, Lucknow, UP</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">ISO-Aligned Delivery & Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
