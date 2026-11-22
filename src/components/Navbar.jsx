import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Catalogue', path: '/catalogue', isBadge: 'Pricing' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly ONE line flex container with generous height for prominent logo */}
        <div className="flex items-center justify-between h-24 sm:h-28 flex-nowrap gap-3 sm:gap-6">
          
          {/* 1. Left: Brand & Prominent, Larger Circular Logo (single row, no wrapping) */}
          <Link to="/" className="flex items-center gap-3 sm:gap-4 shrink-0 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[80px] lg:h-[80px] rounded-full p-1.5 bg-white border-2 border-slate-200 shadow-md group-hover:border-[#008cf0] group-hover:shadow-lg transition-all duration-300 flex items-center justify-center shrink-0 overflow-hidden">
              <img 
                src="/logo.jpeg" 
                alt="Aspire MediaTech Solutions Logo" 
                className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-black text-xl sm:text-2xl lg:text-[26px] tracking-tight text-slate-900 whitespace-nowrap group-hover:text-[#008cf0] transition-colors">
                ASPIRE <span className="text-[#008cf0]">MEDIATECH</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-emerald-600 uppercase whitespace-nowrap mt-1">
                INNOVATE • OPTIMIZE • GROW
              </span>
            </div>
          </Link>

          {/* 2. Center: Desktop Nav Links (strictly one line, corporate refined styling) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-nowrap shrink-0">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                    active
                      ? 'text-[#008cf0] bg-blue-50/90 font-bold border border-blue-200/80 shadow-2xs'
                      : link.isAdminBadge
                        ? 'text-purple-700 bg-purple-50/80 hover:bg-purple-100 hover:text-purple-900 border border-purple-200/80'
                        : 'text-slate-700 hover:text-[#008cf0] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.isBadge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {link.isBadge}
                    </span>
                  )}
                  {link.isAdminBadge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded-full bg-purple-200 text-purple-900">
                      CRM
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Quick Action Buttons (strictly one line) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0 flex-nowrap">
            <a
              href={`tel:${companyInfo.phoneClean}`}
              className="inline-flex items-center gap-2 text-xs font-bold px-3.5 py-2.5 rounded-xl text-slate-800 hover:text-[#008cf0] bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-200 transition-all shadow-2xs whitespace-nowrap"
              title="Call Aspire MediaTech Lucknow HQ"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{companyInfo.phone}</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#008cf0] to-blue-600 hover:from-blue-600 hover:to-[#008cf0] text-white shadow-sm hover:shadow-brand transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
            </Link>
          </div>

          {/* 4. Mobile Actions (Call icon & Hamburger) */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <a
              href={`tel:${companyInfo.phoneClean}`}
              className="p-2.5 rounded-xl bg-blue-50 text-[#008cf0] border border-blue-200 shadow-2xs"
              aria-label="Call Aspire MediaTech"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold ${
                isActive(link.path)
                  ? 'bg-blue-50 text-[#008cf0] border border-blue-200 font-bold'
                  : link.isAdminBadge
                    ? 'bg-purple-50 text-purple-800 border border-purple-200 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{link.name}</span>
              {link.isBadge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {link.isBadge}
                </span>
              )}
              {link.isAdminBadge && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-purple-200 text-purple-900">
                  Dashboard
                </span>
              )}
            </Link>
          ))}
          
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <a
              href={`tel:${companyInfo.phoneClean}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              Call Office: {companyInfo.phone}
            </a>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#008cf0] text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              <span>Request Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-200" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
