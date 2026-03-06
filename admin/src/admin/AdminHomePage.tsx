import React, { useEffect, useState } from 'react';
import { api } from './api';
import { API_BASE } from '../api';
import { UploadField } from './UploadField';
import { PairsEditor } from './PairsEditor';
import { ListEditor } from './ListEditor';
import { useSearchParams } from 'react-router-dom';
import { AdminBusinessAreas } from './AdminBusinessAreas';
import { AdminServices } from './AdminServices';
import { AdminPartners } from './AdminPartners';
import { AdminProducts } from './AdminProducts';

export const AdminHomePage = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<any>({
    heroTitle: 'One Shop for\nAll IT Needs',
    heroSubtitle: 'Your Trusted Technology Partner',
    heroDescription: 'Diyar Power Link LLP is a multi-vertical trading and technology solutions provider delivering reliable supply, competitive pricing, and professional support across industries.',
    home: {
      heroBackgroundImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
      heroPrimaryLabel: 'View Products',
      heroPrimaryLink: '/products',
      heroSecondaryLabel: 'Contact Us',
      heroSecondaryLink: '/contact',
      heroBadges: [
        { title: 'On-time Delivery', description: 'Truck' },
        { title: 'Genuine Warranties', description: 'ShieldCheck' },
        { title: 'Trusted Brands', description: 'Award' }
      ],
      businessStripItems: [
        'Trading Business B2B & B2C',
        'Import & Export',
        'Distribution & Supply',
        'Wholesale & Retail',
        'Services & Support Maintenance'
      ],
      whoTitle: 'Who We Are',
      whoSubtitle: 'The primary focus of Diyar is General Trading, supply of Consumables and IT consultancy.',
      whoDescription: 'Our primary focus is the General Trading supply of Consumables and IT consultancy and support of computer hardware and software, web design, program applications and services. Our team\'s experience together with long-standing manufacturer relationships makes us the ideal partner.',
      whoBullets: [
        'IT Hardware & Software',
        'Thermal Paper Products',
        'Medical Supplies',
        'Packaging Solutions',
        'Import & Export',
        'IT Consultancy'
      ],
      whoImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80',
      whoStatValue: '10+',
      whoStatLabel: 'Years of Industry\nExperience',
      whoCtaLabel: 'Learn more about us',
      whoCtaLink: '/about',
      businessAreasTitle: 'Business Areas',
      businessAreasSubtitle: 'Focused expertise across our core B2B sectors.',
      businessAreasCtaLabel: 'View Products',
      servicesTitle: 'Services',
      servicesSubtitle: 'Professional support designed for enterprise reliability.',
      servicesCtaLabel: 'View All Services',
      whyTitle: 'Why Choose Us',
      whySubtitle: 'Consistent quality and delivery backed by technical expertise.',
      whyItems: [
        { title: 'Quality Products', description: 'Sourced from trusted manufacturers with genuine warranties.' },
        { title: 'Reliable Supply', description: 'On-time delivery supported by proven logistics.' },
        { title: 'Competitive Pricing', description: 'Cost-effective solutions across product categories.' },
        { title: 'Technical Expertise', description: 'Experienced team for installation, support, and guidance.' }
      ],
      partnersTitle: 'Our Technology Partners',
      partnersSubtitle: 'We are proud to partner with world-renowned technology brands to deliver the best solutions to our clients.',
      productsPreviewTitle: 'Featured Products',
      productsPreviewSubtitle: 'A snapshot of our most requested product categories and solutions.',
      productsPreviewCtaLabel: 'View All Products',
      productsPreviewCtaLink: '/products'
    }
  });
  const [section, setSection] = useState('Hero Section');
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
            home: { ...prev.home, ...(data.home || {}) }
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
          heroTitle: form.heroTitle,
          heroSubtitle: form.heroSubtitle,
          heroDescription: form.heroDescription,
          home: form.home
        })
      });
      setSaveState(res.ok ? 'saved' : 'error');
    } catch {
      setSaveState('error');
    }
  };

  const clearSection = () => {
    if (section === 'Hero Section') {
      setForm({
        ...form,
        heroTitle: '',
        heroSubtitle: '',
        heroDescription: '',
        home: { ...form.home, businessStripItems: [] }
      });
      return;
    }
    if (section === 'Hero Buttons & Badges') {
      setForm({ ...form, home: { ...form.home, heroPrimaryLabel: '', heroPrimaryLink: '', heroSecondaryLabel: '', heroSecondaryLink: '', heroBadges: [] } });
      return;
    }
    if (section === 'Background Images') {
      setForm({ ...form, home: { ...form.home, heroBackgroundImage: '', whoImage: '' } });
      return;
    }
    if (section === 'Who We Are') {
      setForm({ ...form, home: { ...form.home, whoTitle: '', whoSubtitle: '', whoDescription: '', whoBullets: [], whoStatValue: '', whoStatLabel: '', whoCtaLabel: '', whoCtaLink: '' } });
      return;
    }
    if (section === 'Business Areas') {
      setForm({ ...form, home: { ...form.home, businessAreasTitle: '', businessAreasSubtitle: '', businessAreasCtaLabel: '' } });
      return;
    }
    if (section === 'Services Preview') {
      setForm({ ...form, home: { ...form.home, servicesTitle: '', servicesSubtitle: '', servicesCtaLabel: '' } });
      return;
    }
    if (section === 'Products Preview') {
      setForm({ ...form, home: { ...form.home, productsPreviewTitle: '', productsPreviewSubtitle: '', productsPreviewCtaLabel: '', productsPreviewCtaLink: '' } });
      return;
    }
    if (section === 'Why Choose Us') {
      setForm({ ...form, home: { ...form.home, whyTitle: '', whySubtitle: '', whyItems: [] } });
      return;
    }
    if (section === 'Partners / Brand Logos') {
      setForm({ ...form, home: { ...form.home, partnersTitle: '', partnersSubtitle: '' } });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Home Page</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {['Hero Section', 'Hero Buttons & Badges', 'Background Images', 'Who We Are', 'Business Areas', 'Services Preview', 'Products Preview', 'Why Choose Us', 'Partners / Brand Logos'].map((item) => (
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
        {section === 'Hero Section' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Hero</h2>
            <textarea placeholder="Hero Title (use new lines)" value={form.heroTitle || ''} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Hero Subtitle" value={form.heroSubtitle || ''} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Hero Description" value={form.heroDescription || ''} onChange={(e) => setForm({ ...form, heroDescription: e.target.value })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />

            <h2 className="text-lg font-semibold text-slate-800 pt-4 border-t border-slate-200">Business Strip</h2>
            <ListEditor
              label="Business Strip Items"
              items={form.home?.businessStripItems || []}
              onChange={(items) => setForm({ ...form, home: { ...form.home, businessStripItems: items } })}
              addLabel="Add Strip Item"
              placeholder="Business strip text"
            />
          </>
        )}

        {section === 'Hero Buttons & Badges' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Hero Buttons & Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <textarea rows={2} placeholder="Primary Button Label" value={form.home?.heroPrimaryLabel || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, heroPrimaryLabel: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
              <textarea rows={2} placeholder="Primary Button Link" value={form.home?.heroPrimaryLink || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, heroPrimaryLink: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
              <textarea rows={2} placeholder="Secondary Button Label" value={form.home?.heroSecondaryLabel || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, heroSecondaryLabel: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
              <textarea rows={2} placeholder="Secondary Button Link" value={form.home?.heroSecondaryLink || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, heroSecondaryLink: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
            </div>
            <PairsEditor
              label="Hero Badges (Title + Icon Name)"
              items={form.home?.heroBadges || []}
              onChange={(items) => setForm({ ...form, home: { ...form.home, heroBadges: items } })}
              addLabel="Add Badge"
            />
            <p className="text-xs text-slate-500">Use icon names from lucide-react (e.g., Truck, ShieldCheck, Award).</p>
          </>
        )}

        {section === 'Background Images' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Background Images</h2>
            <UploadField
              label="Hero Background Image"
              value={form.home?.heroBackgroundImage || ''}
              onChange={(val) => setForm({ ...form, home: { ...form.home, heroBackgroundImage: val } })}
            />
            <UploadField
              label="Who We Are Image"
              value={form.home?.whoImage || ''}
              onChange={(val) => setForm({ ...form, home: { ...form.home, whoImage: val } })}
            />
          </>
        )}

        {section === 'Who We Are' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Who We Are</h2>
            <textarea rows={2} placeholder="Who We Are Title" value={form.home?.whoTitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, whoTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Who We Are Subtitle" value={form.home?.whoSubtitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, whoSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Who We Are Description" value={form.home?.whoDescription || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, whoDescription: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <ListEditor
              label="Who We Are Bullet Points"
              items={form.home?.whoBullets || []}
              onChange={(items) => setForm({ ...form, home: { ...form.home, whoBullets: items } })}
              addLabel="Add Bullet"
              placeholder="Bullet text"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <textarea rows={2} placeholder="Stat Value (e.g., 10+)" value={form.home?.whoStatValue || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, whoStatValue: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
              <textarea rows={2} placeholder="Stat Label (use new lines)" value={form.home?.whoStatLabel || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, whoStatLabel: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <textarea rows={2} placeholder="CTA Label" value={form.home?.whoCtaLabel || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, whoCtaLabel: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
              <textarea rows={2} placeholder="CTA Link" value={form.home?.whoCtaLink || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, whoCtaLink: e.target.value } })} className="border border-slate-200 rounded-xl px-3 py-2" />
            </div>
          </>
        )}

        {section === 'Business Areas' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Business Areas</h2>
            <textarea rows={2} placeholder="Business Areas Title" value={form.home?.businessAreasTitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, businessAreasTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Business Areas Subtitle" value={form.home?.businessAreasSubtitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, businessAreasSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Business Areas Button Label" value={form.home?.businessAreasCtaLabel || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, businessAreasCtaLabel: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <div className="pt-4 border-t border-slate-200">
              <AdminBusinessAreas embedded />
            </div>
          </>
        )}

        {section === 'Services Preview' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Services Preview</h2>
            <textarea rows={2} placeholder="Services Title" value={form.home?.servicesTitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, servicesTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Services Subtitle" value={form.home?.servicesSubtitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, servicesSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Services Button Label" value={form.home?.servicesCtaLabel || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, servicesCtaLabel: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <div className="pt-4 border-t border-slate-200">
              <AdminServices embedded />
            </div>
          </>
        )}

        {section === 'Products Preview' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Products Preview</h2>
            <textarea rows={2} placeholder="Products Preview Title" value={form.home?.productsPreviewTitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, productsPreviewTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Products Preview Subtitle" value={form.home?.productsPreviewSubtitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, productsPreviewSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Products Button Label" value={form.home?.productsPreviewCtaLabel || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, productsPreviewCtaLabel: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea rows={2} placeholder="Products Button Link" value={form.home?.productsPreviewCtaLink || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, productsPreviewCtaLink: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <div className="pt-4 border-t border-slate-200">
              <AdminProducts />
            </div>
          </>
        )}

        {section === 'Why Choose Us' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Why Choose Us</h2>
            <textarea rows={2} placeholder="Why Title" value={form.home?.whyTitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, whyTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Why Subtitle" value={form.home?.whySubtitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, whySubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <PairsEditor
              label="Why Items"
              items={form.home?.whyItems || []}
              onChange={(items) => setForm({ ...form, home: { ...form.home, whyItems: items } })}
              addLabel="Add Why Item"
            />
          </>
        )}

        {section === 'Partners / Brand Logos' && (
          <>
            <h2 className="text-lg font-semibold text-slate-800">Partners / Brand Logos</h2>
            <textarea rows={2} placeholder="Partners Title" value={form.home?.partnersTitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, partnersTitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <textarea placeholder="Partners Subtitle" value={form.home?.partnersSubtitle || ''} onChange={(e) => setForm({ ...form, home: { ...form.home, partnersSubtitle: e.target.value } })} className="w-full border border-slate-200 rounded-xl px-3 py-2" />
            <div className="pt-4 border-t border-slate-200">
              <AdminPartners embedded />
            </div>
          </>
        )}

        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold">
            {saveState === 'saving' ? 'Saving...' : 'Save Home Page'}
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
