import React, { useEffect, useState } from 'react';
import { api } from './api';
import { UploadField } from './UploadField';
import { resolveImageUrl } from './resolveImage';

const empty = { name: '', logo: '', url: '' };

export const AdminPartners = ({ embedded = false }: { embedded?: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const load = () => api.list('partners').then(setItems);
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.logo) {
      setFormError('Logo is required.');
      setSaveState('error');
      return;
    }
    setFormError('');
    setSaveState('saving');
    try {
      if (editingId) await api.update('partners', editingId, form);
      else await api.create('partners', form);
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
    setForm(empty);
    setEditingId(null);
    load();
  };

  const edit = (item: any) => { setEditingId(item._id); setForm(item); };
  const remove = async (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    setSaveState('saving');
    try {
      await api.remove('partners', id);
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
    load();
  };

  return (
    <div>
      {!embedded && <h1 className="text-2xl font-bold text-slate-900 mb-6">Partners</h1>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Partner' : 'Add Partner'}</h2>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
          <UploadField label="Logo" value={form.logo} onChange={(val) => setForm({ ...form, logo: val })} onUploadingChange={setUploadingLogo} />
          {formError && <div className="text-xs text-red-600">{formError}</div>}
          <input placeholder="Website URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
          <div className="flex items-center gap-3">
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold" disabled={uploadingLogo}>
              {saveState === 'saving' ? 'Saving...' : 'Save'}
            </button>
            {saveState === 'saved' && <span className="text-xs text-emerald-600">Saved</span>}
            {saveState === 'error' && <span className="text-xs text-red-600">Save failed</span>}
          </div>
        </form>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item._id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                <div className="h-16 bg-white border border-slate-100 rounded-xl flex items-center justify-center mb-3">
                  {item.logo ? (
                    <img src={resolveImageUrl(item.logo)} alt={item.name} className="max-h-10 max-w-[160px] object-contain" />
                  ) : (
                    <span className="text-xs text-slate-400">No logo</span>
                  )}
                </div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500 mb-3">{item.url}</p>
                <div className="flex gap-2">
                  <button onClick={() => edit(item)} className="text-sm text-blue-600">Edit</button>
                  <button onClick={() => remove(item._id)} className="text-sm text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
