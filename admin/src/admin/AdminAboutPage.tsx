import React, { useEffect, useState } from 'react';
import { api } from './api';
import { API_BASE } from '../api';
import { UploadField } from './UploadField';
import { PairsEditor } from './PairsEditor';
import { useSearchParams } from 'react-router-dom';

export const AdminAboutPage = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<any>({
    about: {
      heroTitle: 'About Our Company',
      heroSubtitle: 'A trusted trading and technology solutions provider empowering organizations to face global challenges.',
      heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80',
      overviewTitle: 'Our Vision, Mission & Philosophy',
      overviewText: '',
      whoTitle: 'Who We Are',
      whoText: '',
      visionText: '',
      missionText: '',
      philosophyText: '',
      strengths: [],
      leadership: [],
      values: []
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
            about: { ...prev.about, ...(data.about || {}) }
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
        body: JSON.stringify({ about: form.about })
      });
      setSaveState(res.ok ? 'saved' : 'error');
    } catch {
      setSaveState('error');
    }
  };

  const clearSection = () => {
    if (section === 'Hero') {
      setForm({ ...form, about: { ...form.about, heroTitle: '', heroSubtitle: '', heroImage: '', image: '' } });
      return;
    }
    if (section === 'Who We Are') {
      setForm({ ...form, about: { ...form.about, whoTitle: '', whoText: '' } });
      return;
    }
    if (section === 'Company Overview') {
      setForm({ ...form, about: { ...form.about, overviewTitle: '', overviewText: '' } });
      return;
    }
    if (section === 'Vision/Mission/Philosophy') {
      setForm({ ...form, about: { ...form.about, visionText: '', missionText: '', philosophyText: '' } });
      return;
    }
    if (section === 'Key Strengths') {
      setForm({ ...form, about: { ...form.about, strengths: [] } });
      return;
    }
    if (section === 'Leadership') {
      setForm({ ...form, about: { ...form.about, leadership: [] } });
      return;
    }
    if (section === 'Core Values') {
      setForm({ ...form, about: { ...form.about, values: [] } });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">About Page</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {['Hero', 'Who We Are', 'Company Overview', 'Vision/Mission/Philosophy', 'Key Strengths', 'Leadership', 'Core Values'].map((item) => (
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
            <textarea rows={2} placeholder="Hero Title" value={form.about?.heroTitle || ''} onChange={(e) => setForm({ ...form, about: { ...form.about, heroTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Hero Subtitle" value={form.about?.heroSubtitle || ''} onChange={(e) => setForm({ ...form, about: { ...form.about, heroSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <UploadField
              label="Hero Image"
              value={form.about?.heroImage || ''}
              onChange={(val) => setForm({ ...form, about: { ...form.about, heroImage: val } })}
            />
            <UploadField
              label="About Image"
              value={form.about?.image || ''}
              onChange={(val) => setForm({ ...form, about: { ...form.about, image: val } })}
            />
          </>
        )}

        {section === 'Who We Are' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Who We Are</h2>
            <textarea rows={2} placeholder="Who We Are Title" value={form.about?.whoTitle || ''} onChange={(e) => setForm({ ...form, about: { ...form.about, whoTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Who We Are Text" value={form.about?.whoText || ''} onChange={(e) => setForm({ ...form, about: { ...form.about, whoText: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
          </>
        )}

        {section === 'Company Overview' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Company Overview</h2>
            <textarea rows={2} placeholder="Overview Title" value={form.about?.overviewTitle || ''} onChange={(e) => setForm({ ...form, about: { ...form.about, overviewTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Overview Text (separate paragraphs with blank lines)" value={form.about?.overviewText || ''} onChange={(e) => setForm({ ...form, about: { ...form.about, overviewText: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
          </>
        )}

        {section === 'Vision/Mission/Philosophy' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Vision / Mission / Philosophy</h2>
            <textarea placeholder="Vision Text" value={form.about?.visionText || ''} onChange={(e) => setForm({ ...form, about: { ...form.about, visionText: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Mission Text" value={form.about?.missionText || ''} onChange={(e) => setForm({ ...form, about: { ...form.about, missionText: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Philosophy Text" value={form.about?.philosophyText || ''} onChange={(e) => setForm({ ...form, about: { ...form.about, philosophyText: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
          </>
        )}

        {section === 'Key Strengths' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Key Strengths</h2>
            <PairsEditor
              label="Strengths"
              items={form.about?.strengths || []}
              onChange={(items) => setForm({ ...form, about: { ...form.about, strengths: items } })}
              addLabel="Add Strength"
            />
          </>
        )}

        {section === 'Leadership' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Leadership</h2>
            <PairsEditor
              label="Leadership"
              items={(form.about?.leadership || []).map((item: any) => ({ title: item.name, description: item.role }))}
              onChange={(items) => setForm({ ...form, about: { ...form.about, leadership: items.map((i) => ({ name: i.title, role: i.description })) } })}
              addLabel="Add Leader"
              titleLabel="Name"
              descriptionLabel="Role"
            />
          </>
        )}

        {section === 'Core Values' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Core Values</h2>
            <PairsEditor
              label="Core Values"
              items={form.about?.values || []}
              onChange={(items) => setForm({ ...form, about: { ...form.about, values: items } })}
              addLabel="Add Value"
            />
          </>
        )}

        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold">
            {saveState === 'saving' ? 'Saving...' : 'Save About Page'}
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
