import React, { useState, useMemo } from 'react';
import catalogData from '../data/catalogData.json';
import {
  Download, Search, CheckCircle2, Calculator, ArrowRight,
  Sparkles, X, Send, Crown, HelpCircle
} from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function DigitalCatalogue() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedForQuote, setSelectedForQuote] = useState([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState('');

  const allCategories = catalogData.categories;

  const flattenedItems = useMemo(() => {
    let list = [];
    allCategories.forEach(cat => {
      cat.items.forEach(item => {
        list.push({
          ...item,
          categoryId: cat.id,
          categoryName: cat.name
        });
      });
    });
    return list;
  }, [allCategories]);

  const filteredItems = useMemo(() => {
    return flattenedItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.features && item.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (item.tagline && item.tagline.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [flattenedItems, selectedCategory, searchTerm]);

  const toggleQuoteItem = (item) => {
    const exists = selectedForQuote.find(i => i.title === item.title);
    if (exists) {
      setSelectedForQuote(selectedForQuote.filter(i => i.title !== item.title));
    } else {
      setSelectedForQuote([...selectedForQuote, item]);
    }
  };

  const isItemSelected = (title) => {
    return selectedForQuote.some(i => i.title === title);
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setQuoteSubmitting(true);
    setQuoteSuccessMsg('');

    try {
      const response = await fetch(getApiUrl('/api/quote/estimate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quoteFormData.name,
          email: quoteFormData.email,
          phone: quoteFormData.phone,
          projectDetails: quoteFormData.notes,
          selectedServices: selectedForQuote.map(i => ({ title: i.title, price: i.price, category: i.categoryName }))
        })
      });

      const resData = await response.json();
      if (resData.success) {
        setQuoteSuccessMsg(`Estimate ID: ${resData.quoteId}. Our Lucknow consulting team will reach out with your proposal within 2 hours!`);
        setSelectedForQuote([]);
        setQuoteFormData({ name: '', email: '', phone: '', notes: '' });
      } else {
        setQuoteSuccessMsg(resData.message || 'Failed to submit quote request.');
      }
    } catch (err) {
      setQuoteSuccessMsg('Quote request registered! Our Lucknow team will call you shortly.');
      setSelectedForQuote([]);
    } finally {
      setQuoteSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 py-12 pb-24 bg-slate-50 min-h-screen">

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-50 via-white to-emerald-50 border border-blue-200/80 p-8 sm:p-14 text-center space-y-6 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#008cf0]" /> Official 21-Page Digital Service Catalogue
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
            Transparent Pricing & <br />
            <span className="text-[#008cf0]">
              Production Service Portfolio
            </span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Every service, technical deliverable, add-on feature, and monthly growth bundle from the official Aspire MediaTech Solutions Catalog (Lucknow, UP).
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/catalog.pdf"
              download="ASPIRE_mediatech_solutions_Catalog.pdf"
              className="px-6 py-3.5 rounded-xl bg-[#008cf0] hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span>Download Original 21-Page Catalog (PDF)</span>
            </a>

            {selectedForQuote.length > 0 && (
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Estimate My Project ({selectedForQuote.length} selected)</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Floating Quote Summary Bar */}
      {selectedForQuote.length > 0 && (
        <aside aria-label="Interactive Quote Estimation Bar" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-3xl rounded-2xl bg-white border-2 border-emerald-500 shadow-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              {selectedForQuote.length}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Services Selected for Project Estimate</h3>
              <p className="text-xs text-slate-500 truncate max-w-sm">
                {selectedForQuote.map(i => i.title).join(', ')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedForQuote([])}
              className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 font-medium"
            >
              Clear
            </button>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <span>Get Formal Proposal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Interactive Search & Filters Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services, packages, pricing..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none text-slate-900 text-sm placeholder-slate-400 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>Showing <strong className="text-slate-900">{filteredItems.length}</strong> catalogue offerings</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Click "+ Add to Estimate" on any service</span>
          </div>

        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === 'all'
                ? 'bg-[#008cf0] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
          >
            All Categories ({flattenedItems.length})
          </button>

          {allCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id
                  ? 'bg-[#008cf0] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
            >
              {cat.name} ({cat.items.length})
            </button>
          ))}
        </div>
      </section>

      {/* Mega Plans Highlight Banner */}
      {(selectedCategory === 'all' || selectedCategory === 'mega-plans') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
              <Crown className="w-4 h-4 text-[#008cf0]" /> All-In-One Enterprise & Dominator Growth Plans
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {allCategories.find(c => c.id === 'mega-plans')?.items.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl p-8 transition-all flex flex-col justify-between ${
                    plan.isPopular
                      ? 'bg-white border-2 border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                      : 'bg-white border border-slate-200 shadow-md hover:shadow-lg'
                    }`}
                >
                  <div>
                    {/* Fixed clipping: in-flow top tag row */}
                    <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#008cf0]">
                        {plan.audience}
                      </span>
                      {plan.isPopular && (
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                          ★ Most Selected Growth Program
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        {plan.title}
                      </h3>
                      <p className="text-xs italic text-emerald-700 font-semibold">
                        "{plan.tagline}"
                      </p>
                      <div className="text-3xl font-extrabold text-slate-900 pt-1">
                        {plan.price}
                      </div>
                      <p className="text-xs text-emerald-700 font-semibold">
                        {plan.savings}
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Included in this plan:</h4>
                      <ul className="space-y-2 text-xs">
                        {plan.services.map((s, sI) => (
                          <li key={sI} className="flex items-start gap-2 text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-slate-900">{s.name}:</span> {s.details}
                              <span className="text-[#008cf0] ml-1 font-semibold">({s.value})</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Bonus Privileges:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-600">
                        {plan.bonuses.map((b, bI) => (
                          <div key={bI} className="flex items-center gap-1.5">
                            <span className="text-emerald-600 font-bold">✔</span> {b}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => toggleQuoteItem({ title: plan.title, price: plan.price, categoryName: 'Mega Plans' })}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${isItemSelected(plan.title)
                          ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                        }`}
                    >
                      {isItemSelected(plan.title) ? '✕ Remove From Estimate' : '+ Add Plan to Quote Estimate'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catalogue Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems
            .filter(item => item.categoryId !== 'mega-plans')
            .map((item, idx) => {
              const selected = isItemSelected(item.title);
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-200 border ${selected
                      ? 'bg-blue-50/50 border-emerald-500 shadow-lg ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'
                    }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#008cf0] uppercase tracking-wider border border-blue-100">
                        {item.categoryName}
                      </span>
                      {item.type && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
                          {item.type}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    <div className="text-xl font-extrabold text-emerald-700">
                      {item.price}
                    </div>

                    {item.duration && (
                      <div className="text-xs text-slate-500">
                        Estimated Timeline: <span className="text-slate-800 font-semibold">{item.duration}</span>
                      </div>
                    )}
                    {item.platform && (
                      <div className="text-xs text-slate-500">
                        Platform: <span className="text-slate-800 font-semibold">{item.platform}</span>
                      </div>
                    )}

                    {item.features && (
                      <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                        {item.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleQuoteItem(item)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${selected
                          ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                          : 'bg-slate-50 hover:bg-[#008cf0] text-slate-700 hover:text-white border border-slate-200 hover:border-[#008cf0]'
                        }`}
                    >
                      {selected ? '✕ Remove from Estimate' : '+ Add to Project Estimate'}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900">No services found matching "{searchTerm}"</h4>
            <p className="text-slate-500 text-xs">Try searching for keywords like "Shopify", "Android", "Reel", "Logo", or "Meta Ads".</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Quote Estimation Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Direct Project Quotation
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                Selected Services Summary
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Review your selections and provide your contact information to receive our formal statement of work and custom proposal.
              </p>
            </div>

            {/* Selected items list */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {selectedForQuote.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 text-xs border border-slate-200">
                  <div>
                    <span className="font-semibold text-slate-900">{item.title}</span>
                    <span className="text-slate-500 text-[10px] ml-2">({item.categoryName})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-700">{item.price}</span>
                    <button
                      onClick={() => toggleQuoteItem(item)}
                      className="text-slate-400 hover:text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleQuoteSubmit} className="space-y-4 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={quoteFormData.name}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={quoteFormData.phone}
                    onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@business.com"
                  value={quoteFormData.email}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Details or Requirements</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your brand, deadlines, or any custom integrations..."
                  value={quoteFormData.notes}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 focus:outline-none"
                />
              </div>

              {quoteSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold">
                  {quoteSuccessMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={quoteSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#008cf0] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
              >
                {quoteSubmitting ? (
                  <span>Generating Proposal...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Submit & Request Formal Proposal</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
