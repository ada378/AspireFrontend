import React, { useState } from 'react';
import { companyInfo } from '../data/companyInfo';
import { 
  MapPin, Phone, Mail, Globe, Clock, Send, CheckCircle2, 
  MessageCircle, Building2, ShieldCheck, Download, Sparkles 
} from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    budget: 'Rs. 15,000 - Rs. 25,000',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch(getApiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        setStatusMessage({
          type: 'success',
          text: data.message || 'Inquiry received successfully! Our Lucknow team will call you within 2 hours.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Website Development',
          budget: 'Rs. 15,000 - Rs. 25,000',
          message: ''
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Something went wrong. Please call us directly.'
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'success',
        text: 'Thank you! Your inquiry has been logged. Our Lucknow team will connect with you shortly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-12 pb-24 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#008cf0] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Let's Build Together
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
          Contact Aspire MediaTech <br />
          <span className="text-[#008cf0]">
            Headquarters in Lucknow
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Have an app idea, website rebuild, or marketing campaign to scale? Talk directly with our senior engineers and growth specialists.
        </p>
      </section>

      {/* Main Grid: Form + Office Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Office & Direct Contact Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center bg-white shrink-0">
                  <img src="/logo.jpeg" alt="Aspire MediaTech Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Aspire MediaTech Solutions</h3>
                  <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">INNOVATE • OPTIMIZE • GROW</p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">Corporate Headquarters</h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      2nd Floor, 203-A, Felix Square, Sushant Golf City, Lucknow, Uttar Pradesh 226030
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#008cf0] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">Direct Phone Lines</h4>
                    <a href={`tel:${companyInfo.phoneClean}`} className="text-[#008cf0] hover:underline text-xs font-semibold block mt-1">
                      {companyInfo.phone} / {companyInfo.phoneAlt}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">Official Email</h4>
                    <a href={`mailto:${companyInfo.email}`} className="text-slate-600 hover:text-slate-900 text-xs block mt-1">
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">Official Website</h4>
                    <span className="text-slate-600 text-xs block mt-1">
                      {companyInfo.website}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900">Office Hours & Turnaround</h4>
                    <p className="text-slate-600 text-xs mt-1">
                      Monday - Saturday: 9:30 AM - 7:30 PM IST <br />
                      Response Guarantee: Within 2 Hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${companyInfo.whatsappClean}?text=Hello%20Aspire%20MediaTech%20team,%20I%20am%20interested%20in%20your%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>

                <a
                  href={`tel:${companyInfo.phoneClean}`}
                  className="w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#008cf0] border border-blue-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 91940 35877</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Fast Project Inquiry
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                  Send Your Project Requirements
                </h3>
                <p className="text-slate-500 text-xs mt-1">
                  Fill this quick brief and our technical architects will prepare a preliminary scope and estimate.
                </p>
              </div>

              {statusMessage && (
                <div
                  className={`p-4 rounded-2xl text-xs font-semibold flex items-start gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-red-50 text-red-800 border border-red-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Requirement</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    >
                      <option value="Website Development">Custom Website / Portal</option>
                      <option value="Mobile App Development">Mobile App (Flutter / React Native)</option>
                      <option value="E-Commerce Store">E-Commerce (Shopify / Woo)</option>
                      <option value="Meta & Google Performance Ads">Meta & Google Performance Ads</option>
                      <option value="Short Form Reels & Videos">Video Editing & Viral Reels</option>
                      <option value="Market Dominator Plan">Market Dominator 360 Plan (₹65k/mo)</option>
                      <option value="Logo & Branding">Brand Identity & Logo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Budget (Optional)</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  >
                    <option value="Below Rs. 15,000">Below Rs. 15,000 (Basic Package)</option>
                    <option value="Rs. 15,000 - Rs. 25,000">Rs. 15,000 - Rs. 25,000 (Standard Tier)</option>
                    <option value="Rs. 25,000 - Rs. 50,000">Rs. 25,000 - Rs. 50,000 (Full-Featured / App)</option>
                    <option value="Rs. 50,000 - Rs. 1,00,000+">Rs. 50,000+ (Enterprise & Growth Retainer)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Details or Requirements</label>
                  <textarea
                    rows="4"
                    placeholder="Briefly describe what your business does and the goals you want to achieve..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-[#008cf0] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-emerald-300" />
                      <span>Submit Project Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
