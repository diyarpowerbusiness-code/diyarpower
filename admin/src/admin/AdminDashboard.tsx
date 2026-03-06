import React, { useEffect, useState } from 'react';
import { api } from './api';

export const AdminDashboard = () => {
  const [summary, setSummary] = useState<any>({});

  useEffect(() => {
    api.summary().then(setSummary).catch(() => setSummary({}));
  }, []);

  const cards = [
    { label: 'Total Products', value: summary.totalProducts || 0 },
    { label: 'Total Categories', value: summary.totalCategories || 0 },
    { label: 'Total Messages', value: summary.totalMessages || 0 },
    { label: 'Recent Updates', value: summary.recentUpdates ? new Date(summary.recentUpdates).toLocaleDateString() : '-' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <p className="text-xs text-slate-500 mb-2">{c.label}</p>
            <p className="text-2xl font-bold text-slate-900">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
