import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { portfolioProjects as fallbackProjects } from '../data/portfolioData';
import { ArrowRight, Sparkles, Search, Layers, RefreshCw } from 'lucide-react';
import { getApiUrl } from '../config/api';

export default function Portfolio() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Dynamic Portfolio Fetch from Backend API
  const fetchDynamicPortfolio = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/portfolio'));
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setProjects(data.data);
      }
    } catch (err) {
      console.warn('Using local fallback portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDynamicPortfolio();
  }, []);

  // Dynamically extract unique industries/categories from the project list
  const dynamicCategories = useMemo(() => {
    const list = [{ id: 'all', label: 'All Case Studies' }];
    const seen = new Set();
    projects.forEach(p => {
      const ind = p.industry || p.category;
      if (ind && !seen.has(ind)) {
        seen.add(ind);
        list.push({ id: ind, label: ind });
      }
    });
    return list;
  }, [projects]);

  // Filtered by category and search term
  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchCat = filter === 'all' || p.industry === filter || p.category === filter;
      const term = searchTerm.toLowerCase();
      const matchSearch = 
        !term || 
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(term))) ||
        (p.industry && p.industry.toLowerCase().includes(term));
      return matchCat && matchSearch;
    });
  }, [projects, filter, searchTerm]);

  return (
    <div className="space-y-16 py-12 pb-24 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-fadeInUp">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#008cf0] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Dynamic Client Case Studies
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Real Solutions. <br />
          <span className="text-[#008cf0]">
            Measurable Revenue & Scale
          </span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Explore how our custom web applications, native mobile apps, and high-performance ad funnels drive tangible business growth. Managed directly in real-time.
        </p>
      </section>

      {/* Filter Tabs & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-fadeInUp">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Dynamic Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto">
            {dynamicCategories.map(c => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  filter === c.id
                    ? 'bg-[#008cf0] text-white shadow-md border border-[#008cf0]'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-2xs'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search case studies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100 shadow-2xs"
            />
          </div>

        </div>
      </section>

      {/* Dynamic Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, idx) => (
            <div
              key={project.id || idx}
              className="group rounded-3xl bg-white border border-slate-200 hover:border-blue-300 overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl flex flex-col justify-between animate-fadeInUp"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/95 text-slate-800 text-[11px] font-bold shadow-xs border border-slate-200">
                      {project.industry || project.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                      {project.priceTier}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#008cf0] transition-colors mt-1 leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlight Metrics */}
                  {project.metrics && Array.isArray(project.metrics) && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      {project.metrics.map((m, mI) => (
                        <div key={mI}>
                          <div className="text-xs font-black text-emerald-700">{m.value}</div>
                          <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Tags */}
                  {project.tags && Array.isArray(project.tags) && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((t, tI) => (
                        <span key={tI} className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-[#008cf0] border border-blue-100 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                <Link
                  to="/contact"
                  className="w-full mt-4 py-2.5 rounded-xl bg-slate-50 hover:bg-[#008cf0] text-slate-700 hover:text-white border border-slate-200 hover:border-[#008cf0] text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-sm"
                >
                  <span>Build Similar Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 p-8 rounded-3xl bg-white border border-slate-200 space-y-3">
            <Layers className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-lg font-bold text-slate-800">No projects found matching "{searchTerm}"</h4>
            <p className="text-xs text-slate-500">Try searching for keywords like "Shopify", "Mobile", "Telemedicine", or reset filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setFilter('all'); }}
              className="mt-2 text-xs font-bold text-[#008cf0] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Custom Solution Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeInUp">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-50 via-white to-emerald-50 border border-blue-200/80 space-y-4 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Have a Unique Software or Marketing Challenge?
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            From custom enterprise software with multi-tenant architecture to large-scale performance marketing setups, our engineers in Lucknow are ready.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008cf0] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Schedule Strategy Consultation</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
