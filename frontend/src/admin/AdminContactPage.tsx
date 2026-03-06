import React, { useEffect, useState } from 'react';
import { api } from './api';
import { API_BASE } from '../api';
import { useSearchParams } from 'react-router-dom';
import { PairsEditor } from './PairsEditor';
import { ListEditor } from './ListEditor';
import { AdminMessages } from './AdminMessages';

export const AdminContactPage = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<any>({
    contactAddress: 'Building 10-6-87/2, Street Rural Police Station, Srinivasa Colony, Mahabubnagar - 509001, Telangana, India',
    contactPhone: '+91 8688050498',
    contactEmail: 'info@diyarpowerlink.com',
    businessHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    footerText: 'Diyar Power Link LLP and Diyar Computers: Your One Shop for All IT Needs. Providing high-quality IT hardware, specialized paper products, medical supplies, and industrial packaging solutions across India.',
    footerDivisions: [
      'IT Solutions & Infrastructure',
      'Paper Products & Thermal Rolls',
      'Medical Supplies & Wristbands',
      'Packaging Materials & Tools',
      'Technical Services & Support'
    ],
    contactPage: {
      heroTitle: 'Get in Touch',
      heroSubtitle: 'We appreciate your time and attention. Reach out to us for all your IT needs.',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Quick answers to common inquiries about our products and services.',
      faqs: [],
      infoTitle: 'Get in Touch',
      formTitle: 'Send us a Message',
      mapLabel: 'Open in Google Maps',
      mapSubLabel: 'Mahabubnagar, Telangana, India'
    }
  });
  const [section, setSection] = useState('Hero');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setSection(tab);
  }, [searchParams]);

  useEffect(() => {
    api.list('settings')
      .then((data) => {
        if (data && data._id) {
          setForm((prev: any) => ({
            ...prev,
            ...data,
            contactPage: { ...prev.contactPage, ...(data.contactPage || {}) }
          }));
        }
      })
      .catch(() => null);
  }, []);

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
        body: JSON.stringify({
          contactAddress: form.contactAddress,
          contactPhone: form.contactPhone,
          contactEmail: form.contactEmail,
          businessHours: form.businessHours,
          footerText: form.footerText,
          footerDivisions: form.footerDivisions,
          contactPage: form.contactPage
        })
      });
      setSaveState(res.ok ? 'saved' : 'error');
    } catch {
      setSaveState('error');
    }
  };

  const clearSection = () => {
    if (section === 'Hero') {
      setForm({ ...form, contactPage: { ...form.contactPage, heroTitle: '', heroSubtitle: '' } });
      return;
    }
    if (section === 'FAQ') {
      setForm({ ...form, contactPage: { ...form.contactPage, faqTitle: '', faqSubtitle: '', faqs: [] } });
      return;
    }
    if (section === 'Contact Details') {
      setForm({
        ...form,
        contactAddress: '',
        contactPhone: '',
        contactEmail: '',
        businessHours: '',
        footerText: '',
        footerDivisions: []
      });
      return;
    }
    if (section === 'Form + Map') {
      setForm({ ...form, contactPage: { ...form.contactPage, infoTitle: '', formTitle: '', mapLabel: '', mapSubLabel: '' } });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Contact Page</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {['Hero', 'FAQ', 'Contact Details', 'Form + Map', 'Messages'].map((item) => (
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
      <form onSubmit={submit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        {section === 'Hero' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Hero</h2>
            <textarea rows={2} placeholder="Hero Title" value={form.contactPage?.heroTitle || ''} onChange={(e) => setForm({ ...form, contactPage: { ...form.contactPage, heroTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Hero Subtitle" value={form.contactPage?.heroSubtitle || ''} onChange={(e) => setForm({ ...form, contactPage: { ...form.contactPage, heroSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
          </>
        )}

        {section === 'FAQ' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">FAQ</h2>
            <textarea rows={2} placeholder="FAQ Title" value={form.contactPage?.faqTitle || ''} onChange={(e) => setForm({ ...form, contactPage: { ...form.contactPage, faqTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="FAQ Subtitle" value={form.contactPage?.faqSubtitle || ''} onChange={(e) => setForm({ ...form, contactPage: { ...form.contactPage, faqSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <PairsEditor
              label="FAQs"
              items={(form.contactPage?.faqs || []).map((item: any) => ({ title: item.question, description: item.answer }))}
              onChange={(items) => setForm({ ...form, contactPage: { ...form.contactPage, faqs: items.map((i) => ({ question: i.title, answer: i.description })) } })}
              addLabel="Add FAQ"
              titleLabel="Question"
              descriptionLabel="Answer"
            />
          </>
        )}

        {section === 'Contact Details' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Contact Details</h2>
            <textarea placeholder="Address" value={form.contactAddress || ''} onChange={(e) => setForm({ ...form, contactAddress: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <input placeholder="Phone" value={form.contactPhone || ''} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <input placeholder="Email" value={form.contactEmail || ''} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <input placeholder="Business Hours" value={form.businessHours || ''} onChange={(e) => setForm({ ...form, businessHours: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <h3 className="text-sm font-semibold text-slate-700 pt-3">Footer</h3>
            <textarea placeholder="Footer Text" value={form.footerText || ''} onChange={(e) => setForm({ ...form, footerText: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <ListEditor
              label="Footer Divisions"
              items={Array.isArray(form.footerDivisions) ? form.footerDivisions : []}
              onChange={(items) => setForm({ ...form, footerDivisions: items })}
              addLabel="Add Division"
              placeholder="Division text"
            />
          </>
        )}

        {section === 'Form + Map' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Form + Map</h2>
            <textarea rows={2} placeholder="Info Section Title" value={form.contactPage?.infoTitle || ''} onChange={(e) => setForm({ ...form, contactPage: { ...form.contactPage, infoTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Form Title" value={form.contactPage?.formTitle || ''} onChange={(e) => setForm({ ...form, contactPage: { ...form.contactPage, formTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Map Label" value={form.contactPage?.mapLabel || ''} onChange={(e) => setForm({ ...form, contactPage: { ...form.contactPage, mapLabel: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Map Sub Label" value={form.contactPage?.mapSubLabel || ''} onChange={(e) => setForm({ ...form, contactPage: { ...form.contactPage, mapSubLabel: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
          </>
        )}
        {section === 'Messages' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <AdminMessages embedded />
          </div>
        )}

        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold">
            {saveState === 'saving' ? 'Saving...' : 'Save Contact Page'}
          </button>
          <button type="button" onClick={clearSection} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm">
            Clear Section
          </button>
          {saveState === 'saved' && <span className="text-sm text-emerald-600">Saved</span>}
          {saveState === 'error' && <span className="text-sm text-red-600">Save failed</span>}
        </div>
      </form>
    </div>
  );
};
