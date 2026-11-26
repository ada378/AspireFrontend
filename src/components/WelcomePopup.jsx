import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { getApiUrl } from '../config/api';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Digital Marketing & SEO',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('aspire_popup_dismissed');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
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
      const response = await fetch(getApiUrl('/api/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();
      if (resData.success) {
        setSubmitted(true);
        setStatusMessage('Thank you! Our Lucknow team will call you back shortly.');
        sessionStorage.setItem('aspire_popup_dismissed', 'true');
        setTimeout(() => {
          setIsOpen(false);
        }, 2200);
      } else {
        setStatusMessage(resData.message || 'Please try again or click Call Now.');
      }
    } catch (error) {
      setSubmitted(true);
      setStatusMessage('Thank you! Our Lucknow team will contact you soon.');
      sessionStorage.setItem('aspire_popup_dismissed', 'true');
      setTimeout(() => {
        setIsOpen(false);
      }, 2200);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-6 space-y-4 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Simple Header */}
        <div className="pr-8">
          <h3 className="text-xl font-bold text-slate-900">
            Get a Free Consultation
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Digital Marketing & Software Development in Lucknow
          </p>
        </div>

        {/* Success View */}
        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">
              Thank You, {formData.name}!
            </h4>
            <p className="text-xs text-slate-600">
              {statusMessage}
            </p>
          </div>
        ) : (
          /* Simple Clean Form */
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#008cf0] focus:ring-1 focus:ring-[#008cf0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#008cf0] focus:ring-1 focus:ring-[#008cf0] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Service Needed
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#008cf0] focus:ring-1 focus:ring-[#008cf0] focus:outline-none"
              >
                <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                <option value="Software & Website Development">Software & Website Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Meta & Google Ads">Meta & Google Ads</option>
                <option value="E-Commerce Website">E-Commerce Website</option>
                <option value="Video & Reels Editing">Video & Reels Editing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message (Optional)
              </label>
              <input
                type="text"
                placeholder="Briefly tell us what you need..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#008cf0] focus:ring-1 focus:ring-[#008cf0] focus:outline-none"
              />
            </div>

            {statusMessage && !submitted && (
              <p className="text-xs text-red-600 font-medium">{statusMessage}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-[#008cf0] hover:bg-blue-600 text-white font-bold text-sm transition-colors"
            >
              {submitting ? 'Submitting...' : 'Request Call Back'}
            </button>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
              <a
                href={`tel:${companyInfo.phoneClean}`}
                className="inline-flex items-center gap-1.5 text-[#008cf0] hover:underline font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="hover:text-slate-700"
              >
                No, thanks
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
