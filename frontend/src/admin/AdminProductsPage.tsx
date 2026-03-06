import React, { useEffect, useState } from 'react';
import { api } from './api';
import { API_BASE } from '../api';
import { useSearchParams } from 'react-router-dom';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';

export const AdminProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [section, setSection] = useState('Product Categories');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [form, setForm] = useState<any>({
    productsPage: {
      heroTitle: 'Our Product Categories',
      heroSubtitle: 'Explore our professional B2B catalog organized by category for quick selection and procurement.',
      sectionTitle: 'Browse by Category',
      sectionSubtitle: 'Select a category to view products in a clean, structured grid.'
    }
  });

  useEffect(() => {
    api.list('settings')
      .then((data) => {
        if (data && data._id) {
          setForm((prev: any) => ({
            ...prev,
            productsPage: { ...prev.productsPage, ...(data.productsPage || {}) }
          }));
        }
      })
      .catch(() => null);
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setSection(tab);
  }, [searchParams]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveState('saving');
    try {
      const res = await fetch(`${API_BASE}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(localStorage.getItem('admin_token')
            ? { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
            : {})
        },
        body: JSON.stringify({ productsPage: form.productsPage })
      });
      setSaveState(res.ok ? 'saved' : 'error');
    } catch {
      setSaveState('error');
    }
  };

  const clearSection = () => {
    setForm({
      ...form,
      productsPage: {
        ...form.productsPage,
        heroTitle: '',
        heroSubtitle: '',
        sectionTitle: '',
        sectionSubtitle: ''
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Products Page</h1>
        <div className="flex flex-wrap gap-2">
          {['Product Categories', 'Products List'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSection(item)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${section === item ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {section === 'Product Categories' && (
        <>
          <form onSubmit={submit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <textarea rows={2} placeholder="Hero Title" value={form.productsPage?.heroTitle || ''} onChange={(e) => setForm({ ...form, productsPage: { ...form.productsPage, heroTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Hero Subtitle" value={form.productsPage?.heroSubtitle || ''} onChange={(e) => setForm({ ...form, productsPage: { ...form.productsPage, heroSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Section Title" value={form.productsPage?.sectionTitle || ''} onChange={(e) => setForm({ ...form, productsPage: { ...form.productsPage, sectionTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Section Subtitle" value={form.productsPage?.sectionSubtitle || ''} onChange={(e) => setForm({ ...form, productsPage: { ...form.productsPage, sectionSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
          <div className="flex items-center gap-3">
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold">
              {saveState === 'saving' ? 'Saving...' : 'Save Products Page'}
            </button>
            <button type="button" onClick={clearSection} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm">
              Clear Section
            </button>
            {saveState === 'saved' && <span className="text-sm text-emerald-600">Saved</span>}
            {saveState === 'error' && <span className="text-sm text-red-600">Save failed</span>}
          </div>
          </form>
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <AdminCategories embedded />
          </div>
        </>
      )}
      {section === 'Products List' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <AdminProducts />
        </div>
      )}
    </div>
  );
};
