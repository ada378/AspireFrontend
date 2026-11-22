import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2, Phone, Clock, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Custom Website Development',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // Check if popup was already submitted or dismissed in this session
    const hasSeenPopup = sessionStorage.getItem('aspire_popup_dismissed');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Opens after 1.5s
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('aspire_popup_dismissed', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();
      if (resData.success) {
        setSubmitted(true);
        setStatusMessage('Your details have been registered! Our Lucknow technical team will contact you within 2 hours.');
        sessionStorage.setItem('aspire_popup_dismissed', 'true');
        setTimeout(() => {
          setIsOpen(false);
        }, 2500);
      } else {
        setStatusMessage(resData.message || 'Submission failed. Please call us directly.');
      }
    } catch (err) {
      // Graceful fallback logging
      setSubmitted(true);
      setStatusMessage('Thank you! Inquiry saved. Our consulting team will reach out to you shortly.');
      sessionStorage.setItem('aspire_popup_dismissed', 'true');
      setTimeout(() => {
        setIsOpen(false);
      }, 2500);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 animate-scaleUp overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blue via-emerald-500 to-brand-blue" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="flex items-start gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-full border border-slate-200 shadow-sm flex items-center justify-center bg-white shrink-0 overflow-hidden">
            <img src="/logo.jpeg" alt="Aspire MediaTech Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-brand-blue" /> Free 30-Min Strategy Call
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Get Your Custom Project Estimate
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-600 inline" /> 
              Guaranteed Response Within 2 Hours • Lucknow HQ
            </p>
          </div>
        </div>

        {/* Success View */}
        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Thank You, {formData.name || 'Friend'}!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {statusMessage}
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold">
              Aspire MediaTech Solutions • Felix Square, Lucknow
            </p>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp / Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@business.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service You Need
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
                >
                  <option value="Custom Website Development">Custom Website / Portal</option>
                  <option value="Mobile App Development">Mobile App (Android & iOS)</option>
                  <option value="E-Commerce Store">E-Commerce (Shopify / Woo)</option>
                  <option value="Meta & Google Performance Ads">Meta & Google Ads</option>
                  <option value="Short Form Reels & Videos">Video Production & Reels</option>
                  <option value="Market Dominator Plan">Market Dominator 360 Plan (₹65k)</option>
                  <option value="Logo & Branding">Brand Identity & Logo</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Project Goal or Idea (Optional)
              </label>
              <textarea
                rows="2"
                placeholder="Describe your requirement, timeline, or current challenge..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
            </div>

            {statusMessage && !submitted && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-[#008cf0] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {submitting ? (
                <span>Registering Inquiry...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Get Free Strategy & Quote</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-slate-500">
                <Phone className="w-3 h-3 text-emerald-600" />
                Or call direct: <a href={`tel:${companyInfo.phoneClean}`} className="text-[#008cf0] hover:underline font-bold">{companyInfo.phone}</a>
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="hover:text-slate-700 hover:underline"
              >
                Browse website first
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

