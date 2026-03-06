import React from 'react';

type StepItem = {
  step: string;
  title: string;
  description: string;
};

type StepsEditorProps = {
  label: string;
  items: StepItem[];
  onChange: (items: StepItem[]) => void;
  addLabel?: string;
};

export const StepsEditor = ({ label, items, onChange, addLabel }: StepsEditorProps) => {
  const updateItem = (idx: number, key: keyof StepItem, value: string) => {
    const next = items.map((item, i) => (i === idx ? { ...item, [key]: value } : item));
    onChange(next);
  };

  const addItem = () => {
    onChange([...(items || []), { step: '', title: '', description: '' }]);
  };

  const removeItem = (idx: number) => {
    const next = items.filter((_, i) => i !== idx);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-700">{label}</h3>
      <div className="space-y-3">
        {(items || []).map((item, idx) => (
          <div key={`${label}-${idx}`} className="border border-slate-200 rounded-xl p-3 space-y-2">
            <input
              placeholder="Step (e.g., 01)"
              value={item.step || ''}
              onChange={(e) => updateItem(idx, 'step', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
            <input
              placeholder="Title"
              value={item.title || ''}
              onChange={(e) => updateItem(idx, 'title', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Short description"
              value={item.description || ''}
              onChange={(e) => updateItem(idx, 'description', e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="text-xs text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-sm"
      >
        {addLabel || 'Add Step'}
      </button>
    </div>
  );
};
