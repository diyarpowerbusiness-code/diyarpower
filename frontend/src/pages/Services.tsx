import React from 'react';
import { SectionHeader, ServiceCard } from '../components/UI';
import { SERVICES } from '../constants';
import { motion } from 'motion/react';
import { Settings, Shield, Cpu, Network, Globe, Headphones } from 'lucide-react';

export const Services = () => {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Digital Services"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-6">Our Services</h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Unlocking the Power of Our Services. We provide comprehensive IT solutions tailored to your business needs, from hardware supply to technical support.
          </p>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 bg-slate-50 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="What We Offer"
            subtitle="A comprehensive suite of services designed to keep your business running at peak performance."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <SectionHeader
                title="IT & Technical Expertise"
                subtitle="Diyar Computers provides end-to-end IT solutions to ensure your business infrastructure is robust, efficient, and future-ready."
                centered={false}
              />
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our team's expertise spans across various domains of information technology. We don't just supply products; we provide comprehensive services including hardware supply, installation, network infrastructure (LAN/Fiber), and ongoing maintenance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Network size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Network Infrastructure</h4>
                    <p className="text-xs text-slate-500">LAN/Fiber Optic cabling and wireless network solutions.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Hardware Support</h4>
                    <p className="text-xs text-slate-500">Onsite and remote support for all your computing devices.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Web & App Solutions</h4>
                    <p className="text-xs text-slate-500">Modern web design and program applications for your business.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <Headphones size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Expert Consultancy</h4>
                    <p className="text-xs text-slate-500">Tailored IT advice to align technology with your business goals.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
                  alt="Technical Support"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <Headphones size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">Expert Support</p>
                    <p className="text-xs text-slate-500">Dedicated Technical Team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-24 bg-slate-50 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Service Process"
            subtitle="How we deliver excellence from initial consultation to ongoing support."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We listen to your needs and analyze your current infrastructure to understand requirements.' },
              { step: '02', title: 'Strategy', desc: 'Our experts design a customized solution that fits your budget and business IT needs.' },
              { step: '03', title: 'Execution', desc: 'Professional installation and deployment with minimal disruption to your operations.' },
              { step: '04', title: 'Support', desc: 'Ongoing maintenance and technical support to ensure smooth, continuous operations.' }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full group-hover:border-blue-300 group-hover:shadow-md transition-all">
                  <span className="text-6xl font-display font-bold text-blue-100 absolute top-4 right-6 group-hover:text-blue-200 transition-colors">{item.step}</span>
                  <h3 className="text-xl font-bold text-primary mb-4 relative z-10">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed relative z-10">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Card */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Settings size={160} />
            </div>
            <h3 className="text-3xl font-display font-bold mb-6">Enterprise IT Solutions</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Our team is dedicated to resolving any reported hardware and software issues quickly and efficiently, minimizing downtime for your business.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['System Maintenance', 'Software Updates', 'Security Audits', 'Data Recovery', 'Computer Services', 'Printer Services', 'Hardware Installation', 'Repair & Maintenance'].map((item, i) => (
                <li key={i} className="flex items-center text-sm">
                  <Shield size={16} className="text-blue-400 mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
