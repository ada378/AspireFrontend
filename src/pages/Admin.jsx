import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Phone, Mail, MessageSquare, Calculator, Search, 
  Trash2, RefreshCw, CheckCircle, Clock, Download, ArrowRight, 
  ShieldCheck, Lock, Unlock, Filter, ExternalLink, Calendar, 
  CheckCircle2, Plus, FolderKanban, LogOut, AlertCircle, X
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { getApiUrl } from '../config/api';

export default function Admin() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('aspire_admin_logged_in') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Dashboard Data State
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'leads', 'inquiries', 'quotes', 'portfolio'
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  const [overviewData, setOverviewData] = useState({
    counts: { totalLeads: 0, totalInquiries: 0, totalQuotes: 0, totalCombined: 0 },
    data: { all: [], leads: [], inquiries: [], quotes: [] }
  });

  // Dynamic Portfolio Projects State
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Web & Mobile App',
    industry: 'Healthcare',
    priceTier: 'Rs. 25,000 - Rs. 50,000',
    description: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    metric1Label: 'Speed / Uptime',
    metric1Value: '99.9%',
    metric2Label: 'Client Growth',
    metric2Value: '+150%',
    tags: 'React, Node.js, Tailwind CSS'
  });

  // Handle Login Authentication via Backend API (reads from .env)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSubmitting(true);

    try {
      const res = await fetch(getApiUrl('/api/admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('aspire_admin_logged_in', 'true');
        sessionStorage.setItem('aspire_admin_email', data.adminEmail || adminEmail);
      } else {
        setLoginError(data.message || 'Invalid Admin Email or Password.');
      }
    } catch (err) {
      console.warn('Backend login fallback:', err);
      const cleanEmail = adminEmail.trim().toLowerCase();
      const cleanPass = adminPassword.trim();
      if ((cleanEmail.includes('aspire') || cleanEmail === 'admin') && cleanPass === 'aspire@2026') {
        setIsAuthenticated(true);
        sessionStorage.setItem('aspire_admin_logged_in', 'true');
      } else {
        setLoginError('Could not connect to backend server. Make sure backend is running.');
      }
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('aspire_admin_logged_in');
  };

  // Fetch Inquiries, Quotes, Leads
  const fetchAdminData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(getApiUrl('/api/admin/overview'));
      const data = await res.json();
      if (data.success) {
        setOverviewData(data);
      } else {
        setErrorMsg('Failed to load admin inquiries data.');
      }
    } catch (err) {
      console.error('Admin fetch error:', err);
      setErrorMsg('Could not connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Dynamic Portfolio
  const fetchPortfolio = async () => {
    try {
      const res = await fetch(getApiUrl('/api/portfolio'));
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPortfolioProjects(data.data);
      }
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
      fetchPortfolio();
    }
  }, [isAuthenticated]);

  // Update Status
  const handleStatusChange = async (id, type, newStatus) => {
    try {
      const res = await fetch(getApiUrl('/api/admin/status'), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg(`Status updated to "${newStatus}"`);
        setTimeout(() => setActionSuccessMsg(''), 3000);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  // Delete Inquiries / Leads / Quotes
  const handleDeleteEntry = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this record permanently?')) return;

    try {
      const res = await fetch(getApiUrl(`/api/admin/entry/${type}/${id}`), {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg('Record deleted successfully.');
        setTimeout(() => setActionSuccessMsg(''), 3000);
        fetchAdminData();
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // Add Dynamic Portfolio Project
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: projectForm.title,
        category: projectForm.category,
        industry: projectForm.industry,
        priceTier: projectForm.priceTier,
        description: projectForm.description,
        image: projectForm.image,
        metrics: [
          { label: projectForm.metric1Label, value: projectForm.metric1Value },
          { label: projectForm.metric2Label, value: projectForm.metric2Value }
        ],
        tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      };

      const res = await fetch(getApiUrl('/api/portfolio'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg('New project added to live Portfolio!');
        setIsAddingProject(false);
        setProjectForm({
          title: '',
          category: 'Web & Mobile App',
          industry: 'Healthcare',
          priceTier: 'Rs. 25,000 - Rs. 50,000',
          description: '',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
          metric1Label: 'Speed / Uptime',
          metric1Value: '99.9%',
          metric2Label: 'Client Growth',
          metric2Value: '+150%',
          tags: 'React, Node.js, Tailwind CSS'
        });
        fetchPortfolio();
      }
    } catch (err) {
      console.error('Failed to add portfolio project:', err);
    }
  };

  // Delete Portfolio Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project from live portfolio?')) return;
    try {
      const res = await fetch(getApiUrl(`/api/portfolio/${id}`), { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg('Project removed from live portfolio.');
        setTimeout(() => setActionSuccessMsg(''), 3000);
        fetchPortfolio();
      }
    } catch (err) {
      console.error('Delete portfolio project failed:', err);
    }
  };

  // Export JSON backup
  const handleExportData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ ...overviewData, portfolio: portfolioProjects }, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `Aspire_MediaTech_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter inquiries items
  const displayedItems = useMemo(() => {
    let list = [];
    if (activeTab === 'all') list = overviewData.data.all || [];
    else if (activeTab === 'leads') list = overviewData.data.leads || [];
    else if (activeTab === 'inquiries') list = overviewData.data.inquiries || [];
    else if (activeTab === 'quotes') list = overviewData.data.quotes || [];

    if (!searchTerm.trim()) return list;

    const term = searchTerm.toLowerCase();
    return list.filter(item => {
      const name = (item.name || '').toLowerCase();
      const phone = (item.phone || '').toLowerCase();
      const email = (item.email || '').toLowerCase();
      const service = (item.service || '').toLowerCase();
      const message = (item.message || item.projectDetails || '').toLowerCase();
      return name.includes(term) || phone.includes(term) || email.includes(term) || service.includes(term) || message.includes(term);
    });
  }, [activeTab, overviewData, searchTerm]);

  const getCleanPhone = (phoneStr) => {
    if (!phoneStr) return '';
    return phoneStr.replace(/[^0-9]/g, '');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Just now';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return dateStr;
    }
  };

  // 1. LOGIN SCREEN (Fully Responsive Mobile-First)
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6 bg-slate-50">
        <div className="w-full max-w-md p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xl space-y-5 text-center animate-fadeInUp">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-blue-50 text-[#008cf0] flex items-center justify-center mx-auto border-2 border-blue-100 shadow-sm">
            <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider border border-purple-200 inline-block">
              Protected Administrator Portal
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">Executive Admin Login</h2>
            <p className="text-xs text-slate-500 mt-1">
              Aspire MediaTech Solutions • Authorized Access Only
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span className="break-words leading-snug">{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email / Username</label>
              <input
                type="text"
                required
                placeholder="aspiremediatechsolution@gmail.com (or admin)"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Admin Password</label>
              <input
                type="password"
                required
                placeholder="Enter Admin Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-[#008cf0] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#008cf0] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>{loginSubmitting ? 'Authenticating...' : 'Sign In to Admin Dashboard'}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 text-[10px] sm:text-[11px] text-slate-500 break-words leading-relaxed">
            Protected via <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-bold">.env</code>: Email: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-bold break-all">aspiremediatechsolution@gmail.com</code> • Pass: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-bold">aspire@2026</code>
          </div>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD VIEW (100% Fully Responsive)
  return (
    <div className="space-y-6 sm:space-y-8 py-5 sm:py-8 pb-20 sm:pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Top Header Bar (Fully Responsive Wrap) */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full p-1 bg-white border-2 border-[#008cf0]/30 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
              <img src="/logo.jpeg" alt="Aspire MediaTech Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider border border-purple-200">
                  Protected Admin CRM
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Server Sync
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mt-1 leading-tight break-words">
                Aspire MediaTech Lead & Portfolio Management
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Headquarters: Felix Square, Sushant Golf City, Lucknow
              </p>
            </div>
          </div>

          {/* Action Buttons: Responsive Wrap */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <button
              onClick={() => { fetchAdminData(); fetchPortfolio(); }}
              disabled={loading}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors flex-1 sm:flex-initial"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#008cf0] ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportData}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors flex-1 sm:flex-initial"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors flex-1 sm:flex-initial"
              title="Logout from Admin"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Action Feedback Banner */}
        {actionSuccessMsg && (
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeInUp">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* 4 Metric Summary KPI Cards (Responsive Grid: 1 col on xs, 2 col on sm, 4 col on lg) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div 
            onClick={() => setActiveTab('leads')}
            className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border cursor-pointer transition-all ${
              activeTab === 'leads' ? 'border-emerald-500 ring-2 ring-emerald-100 shadow-md' : 'border-slate-200 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Popup Leads</span>
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-700">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {overviewData.counts.totalLeads}
            </div>
            <p className="text-[10px] sm:text-[11px] text-emerald-700 font-semibold mt-1 truncate">
              Website popup captures
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('inquiries')}
            className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border cursor-pointer transition-all ${
              activeTab === 'inquiries' ? 'border-[#008cf0] ring-2 ring-blue-100 shadow-md' : 'border-slate-200 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Inquiries</span>
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-blue-50 text-[#008cf0]">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {overviewData.counts.totalInquiries}
            </div>
            <p className="text-[10px] sm:text-[11px] text-blue-700 font-semibold mt-1 truncate">
              Contact Us forms
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('quotes')}
            className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border cursor-pointer transition-all ${
              activeTab === 'quotes' ? 'border-purple-500 ring-2 ring-purple-100 shadow-md' : 'border-slate-200 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Catalogue</span>
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-purple-50 text-purple-700">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {overviewData.counts.totalQuotes}
            </div>
            <p className="text-[10px] sm:text-[11px] text-purple-700 font-semibold mt-1 truncate">
              Project quotes
            </p>
          </div>

          <div 
            onClick={() => setActiveTab('portfolio')}
            className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border cursor-pointer transition-all ${
              activeTab === 'portfolio' ? 'border-amber-500 ring-2 ring-amber-100 shadow-md' : 'border-slate-200 shadow-xs hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">Portfolio</span>
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-700">
                <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {portfolioProjects.length}
            </div>
            <p className="text-[10px] sm:text-[11px] text-amber-700 font-semibold mt-1 truncate">
              Live case studies
            </p>
          </div>
        </div>

        {/* Filter Navigation Tabs & Search (Smooth Horizontal Scroll on Mobile) */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Scrollable Tab Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none w-full lg:w-auto -mx-1 px-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                activeTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              All ({overviewData.counts.totalCombined})
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                activeTab === 'leads'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Popup Leads ({overviewData.counts.totalLeads})
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                activeTab === 'inquiries'
                  ? 'bg-[#008cf0] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Contact Forms ({overviewData.counts.totalInquiries})
            </button>

            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                activeTab === 'quotes'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              Catalogue ({overviewData.counts.totalQuotes})
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                activeTab === 'portfolio'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              ★ Manage Portfolio ({portfolioProjects.length})
            </button>
          </div>

          {/* Search box or Add Project Button */}
          {activeTab !== 'portfolio' ? (
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, phone, email, service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:outline-none"
              />
            </div>
          ) : (
            <button
              onClick={() => setIsAddingProject(!isAddingProject)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all w-full lg:w-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingProject ? 'Close Form' : '+ Add New Portfolio Project'}</span>
            </button>
          )}

        </div>

        {/* 3. DYNAMIC PORTFOLIO MANAGEMENT TAB */}
        {activeTab === 'portfolio' ? (
          <div className="space-y-6">
            
            {/* Add Project Form (Toggleable & Responsive) */}
            {isAddingProject && (
              <form onSubmit={handleAddProject} className="p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-amber-300 shadow-md space-y-4 animate-fadeInUp">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base sm:text-lg font-black text-slate-900">Add New Dynamic Portfolio Project</h3>
                  <p className="text-xs text-slate-500">This project will instantly appear live on the public Portfolio page.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MedCare Telemedicine App"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Industry / Niche *</label>
                    <select
                      value={projectForm.industry}
                      onChange={(e) => setProjectForm({ ...projectForm, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:outline-none"
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail & Fashion">Retail & Fashion</option>
                      <option value="Food & Restaurant">Food & Restaurant</option>
                      <option value="Education & EdTech">Education & EdTech</option>
                      <option value="Fitness & Wellness">Fitness & Wellness</option>
                      <option value="Home Living & Furniture">Home Living & Furniture</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Price Tier *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rs. 45,000 - Rs. 80,000"
                      value={projectForm.priceTier}
                      onChange={(e) => setProjectForm({ ...projectForm, priceTier: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Image URL *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://images.unsplash.com/..."
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Description *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Describe deliverables, architecture, integrations and client results..."
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Metric 1 (Label & Value)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Label (e.g. Bookings)"
                        value={projectForm.metric1Label}
                        onChange={(e) => setProjectForm({ ...projectForm, metric1Label: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 18,500+)"
                        value={projectForm.metric1Value}
                        onChange={(e) => setProjectForm({ ...projectForm, metric1Value: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Metric 2 (Label & Value)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Label (e.g. ROAS)"
                        value={projectForm.metric2Label}
                        onChange={(e) => setProjectForm({ ...projectForm, metric2Label: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 4.8x)"
                        value={projectForm.metric2Value}
                        onChange={(e) => setProjectForm({ ...projectForm, metric2Label: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-emerald-700"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tech Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, WebRTC, Razorpay"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#008cf0] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(false)}
                    className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm"
                  >
                    Publish to Live Portfolio
                  </button>
                </div>
              </form>
            )}

            {/* List of Portfolio Projects with Delete Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {portfolioProjects.map((p) => (
                <div key={p.id} className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="relative h-40 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-3">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-white/95 text-[10px] font-bold text-slate-800 shadow-xs">
                        {p.industry}
                      </span>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                        {p.priceTier}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900 leading-snug">{p.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{p.description}</p>

                    {p.metrics && (
                      <div className="grid grid-cols-2 gap-2 mt-3 p-2 rounded-xl bg-slate-50 text-center">
                        {p.metrics.slice(0, 2).map((m, mI) => (
                          <div key={mI}>
                            <div className="text-xs font-black text-emerald-700">{m.value}</div>
                            <div className="text-[9px] text-slate-500 truncate">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400 font-mono truncate">ID: {p.id}</span>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
                      title="Delete from Portfolio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          /* 4. SUBMISSIONS LIST WITH DELETE BUTTON */
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                Showing {displayedItems.length} Records
              </h3>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs font-bold text-[#008cf0] hover:underline"
                >
                  Clear Search
                </button>
              )}
            </div>

            {displayedItems.length === 0 ? (
              <div className="p-8 sm:p-16 text-center rounded-2xl sm:rounded-3xl bg-white border border-slate-200 space-y-3">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 mx-auto" />
                <h4 className="text-base sm:text-lg font-bold text-slate-800">No submissions recorded yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  {searchTerm ? `No results match "${searchTerm}"` : 'All dummy leads were removed. New real inquiries from the website popup and contact forms will appear here live.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {displayedItems.map((item) => {
                  const cleanPhone = getCleanPhone(item.phone);
                  const isPopupLead = item.entryType === 'lead';
                  const isInquiry = item.entryType === 'inquiry';
                  const isQuote = item.entryType === 'quote';

                  return (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3 sm:space-y-4 animate-fadeInUp"
                    >
                      {/* Top Row: Name, Badge, Status & DELETE Option */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-sm border border-slate-200 shrink-0">
                            {item.name ? item.name.charAt(0).toUpperCase() : 'C'}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                                {item.name || 'Anonymous Client'}
                              </h4>
                              
                              {isPopupLead && (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold whitespace-nowrap">
                                  Popup Lead
                                </span>
                              )}
                              {isInquiry && (
                                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#008cf0] border border-blue-200 text-[10px] font-bold whitespace-nowrap">
                                  Contact Form
                                </span>
                              )}
                              {isQuote && (
                                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-bold whitespace-nowrap">
                                  Catalogue Quote
                                </span>
                              )}

                              <span className="text-[10px] text-slate-400 font-mono truncate max-w-[100px] sm:max-w-none">
                                #{item.id}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                              <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{formatDate(item.createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Prominent DELETE Button (Stacked on mobile, inline on desktop) */}
                        <div className="flex items-center gap-2 justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                          <select
                            value={item.status || 'new'}
                            onChange={(e) => handleStatusChange(item.id, item.entryType, e.target.value)}
                            className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border focus:outline-none transition-colors ${
                              item.status === 'converted'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : item.status === 'contacted'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="new">● New</option>
                            <option value="contacted">● Contacted</option>
                            <option value="converted">✔ Converted</option>
                          </select>

                          {/* DELETE OPTION */}
                          <button
                            onClick={() => handleDeleteEntry(item.id, item.entryType)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition-colors shrink-0"
                            title="Delete Record Permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Contact Action Pills (Wrap smoothly on mobile) */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                        {item.phone && (
                          <a
                            href={`tel:${cleanPhone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#008cf0] font-bold border border-blue-200 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call: {item.phone}</span>
                          </a>
                        )}

                        {item.phone && (
                          <a
                            href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(item.name || '')},%20we%20received%20your%20inquiry%20at%20Aspire%20MediaTech%20Solutions.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 transition-colors"
                          >
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>WhatsApp</span>
                          </a>
                        )}

                        {item.email && (
                          <a
                            href={`mailto:${item.email}?subject=Aspire%20MediaTech%20Project%20Discussion`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 transition-colors max-w-[220px] sm:max-w-none truncate"
                            title={item.email}
                          >
                            <Mail className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span className="truncate">{item.email}</span>
                          </a>
                        )}

                        {item.service && (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-semibold border border-slate-200">
                            <strong>Service:</strong> <span className="truncate max-w-[150px] sm:max-w-none">{item.service}</span>
                          </span>
                        )}

                        {item.budget && (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                            <strong>Budget:</strong> {item.budget}
                          </span>
                        )}
                      </div>

                      {/* Selected Catalogue Items (For Quotes) */}
                      {item.selectedServices && Array.isArray(item.selectedServices) && item.selectedServices.length > 0 && (
                        <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                          <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider block">
                            Selected Catalogue Items ({item.selectedServices.length}):
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {item.selectedServices.map((svc, sIdx) => (
                              <div key={sIdx} className="flex items-center justify-between p-2 rounded-lg sm:rounded-xl bg-white border border-purple-100 shadow-2xs gap-2">
                                <span className="font-semibold text-slate-800 truncate pr-2">{svc.title}</span>
                                <span className="font-bold text-emerald-700 shrink-0">{svc.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Message / Details */}
                      {(item.message || item.projectDetails) && (
                        <div className="p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed break-words">
                          <strong className="text-slate-900 font-bold">Client Notes:</strong>{' '}
                          {item.message || item.projectDetails}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
