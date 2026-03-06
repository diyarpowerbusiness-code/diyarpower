import React, { useEffect, useState } from 'react';
import { api } from './api';
import { UploadField } from './UploadField';
import { resolveImageUrl } from './resolveImage';

const empty = { name: '', slug: '', description: '', image: '', featured: false };

export const AdminCategories = ({ embedded = false }: { embedded?: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const load = () => api.list('categories').then(setItems);
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) {
      setFormError('Image is required.');
      setSaveState('error');
      return;
    }
    setFormError('');
    setSaveState('saving');
    try {
      if (editingId) await api.update('categories', editingId, form);
      else await api.create('categories', form);
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
      await api.remove('categories', id);
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
    load();
  };

  return (
    <div>
      {!embedded && <h1 className="text-2xl font-bold text-slate-900 mb-6">Categories</h1>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Category' : 'Add Category'}</h2>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
          <input placeholder="Slug (e.g., it-solutions)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" required />
          <UploadField label="Image" value={form.image} onChange={(val) => setForm({ ...form, image: val })} onUploadingChange={setUploadingImage} />
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={!!form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured on Homepage
          </label>
          {formError && <div className="text-xs text-red-600">{formError}</div>}
          <div className="flex items-center gap-3">
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-semibold" disabled={uploadingImage}>
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
                <div className="aspect-[16/9] bg-white border border-slate-100 rounded-xl overflow-hidden mb-3">
                  {item.image ? (
                    <img src={resolveImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No image</div>
                  )}
                </div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500 mb-2">{item.slug}</p>
                <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                {item.featured && <p className="text-xs font-semibold text-blue-600 mb-2">Featured</p>}
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
