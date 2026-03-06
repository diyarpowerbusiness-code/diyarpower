import React from 'react';

type ListEditorProps = {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel?: string;
  placeholder?: string;
};

export const ListEditor = ({ label, items, onChange, addLabel, placeholder }: ListEditorProps) => {
  const updateItem = (idx: number, value: string) => {
    const next = items.map((item, i) => (i === idx ? value : item));
    onChange(next);
  };

  const addItem = () => {
    onChange([...(items || []), '']);
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
            <textarea
              placeholder={placeholder || 'Item'}
              value={item || ''}
              onChange={(e) => updateItem(idx, e.target.value)}
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
        {addLabel || 'Add Item'}
      </button>
    </div>
  );
};
