import React, { useEffect, useState } from 'react';
import { api } from './api';

export const AdminMessages = ({ embedded = false }: { embedded?: boolean }) => {
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const load = () => api.list('messages').then(setItems);
  useEffect(() => { load(); }, []);

  const markRead = async (id: string, read: boolean) => { await api.patch('messages', id, { read }); load(); };
  const remove = async (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    await api.remove('messages', id);
    load();
  };

  return (
    <div>
      {!embedded && <h1 className="text-2xl font-bold text-slate-900 mb-6">Messages</h1>}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left font-semibold px-4 py-3">Status</th>
              <th className="text-left font-semibold px-4 py-3">Name</th>
              <th className="text-left font-semibold px-4 py-3">Email</th>
              <th className="text-left font-semibold px-4 py-3">Phone</th>
              <th className="text-left font-semibold px-4 py-3">Subject</th>
              <th className="text-left font-semibold px-4 py-3">Date</th>
              <th className="text-left font-semibold px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m._id} className="border-t border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${m.read ? 'bg-slate-100 text-slate-600' : 'bg-blue-100 text-blue-700'}`}>
                    {m.read ? 'Read' : 'New'}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{m.name}</td>
                <td className="px-4 py-3 text-slate-700">{m.email}</td>
                <td className="px-4 py-3 text-slate-700">{m.phone || '-'}</td>
                <td className="px-4 py-3 text-slate-700">{m.subject || '-'}</td>
                <td className="px-4 py-3 text-slate-600">{new Date(m.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => setSelected(m)} className="text-sm text-blue-600">View</button>
                    <button onClick={() => markRead(m._id, !m.read)} className="text-sm text-slate-700">
                      {m.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button onClick={() => remove(m._id)} className="text-sm text-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length == 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-500">No messages yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Message from {selected.name}</h2>
                <p className="text-xs text-slate-500">{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-sm text-slate-600">Close</button>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <p><span className="font-semibold">Email:</span> {selected.email}</p>
              {selected.phone && <p><span className="font-semibold">Phone:</span> {selected.phone}</p>}
              {selected.subject && <p><span className="font-semibold">Subject:</span> {selected.subject}</p>}
              <div className="border-t border-slate-100 pt-3">
                <p className="font-semibold text-slate-900 mb-2">Message</p>
                <p className="text-slate-700 whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
