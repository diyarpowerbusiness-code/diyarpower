import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Clock, Award } from 'lucide-react';
import * as Icons from 'lucide-react';
import { SectionHeader, ProductCard, ServiceCard } from '../components/UI';
import { PRODUCTS, SERVICES, PARTNERS, COMPANY_NAME } from '../constants';
import { Link } from 'react-router-dom';

export const Home = () => {
  const featuredProducts = PRODUCTS.filter(p => ['it1', 'p1', 'm1', 'pk1', 'it3', 'p2'].includes(p.id));
  const featuredServices = SERVICES.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center pt-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/40 z-10" />
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
            alt="IT Solutions"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20">
          <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-sm font-semibold mb-6">
                Diyar Power Link LLP
              </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
              One Shop for<br /><span className="text-blue-500">All IT Needs</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Your Trusted Technology Partner. Diyar Computers specializes in IT-related items and network solutions.
              We deliver the highest quality brands, competitive pricing, and guaranteed on-time delivery across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
              <Link to="/products" className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 group">
                Explore Products
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
                <Link to="/contact" className="bg-white/5 text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm">
                  Contact Us
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'On‑time Delivery', icon: Truck },
                  { label: 'Genuine Warranties', icon: ShieldCheck },
                  { label: 'Trusted Brands', icon: Award }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400">
                      <item.icon size={20} />
                    </div>
                    <span className="text-sm text-slate-200 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* Business Categories Strip */}
      <section className="py-6 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-white text-sm font-medium">
            {['Trading Business B2B & B2C', 'Import & Export', 'Distribution & Supply', 'Wholesale & Retail', 'Services & Support Maintenance'].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-200" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
                  alt="Our Office"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold mb-1">10+</p>
                <p className="text-sm font-medium opacity-90">Years of Industry<br />Experience</p>
              </div>
            </div>

            <div>
              <SectionHeader
                title="Who We Are"
                subtitle="The primary focus of Diyar is General Trading, supply of Consumables and IT consultancy."
                centered={false}
              />
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our primary focus is the General Trading supply of Consumables and IT consultancy and support of computer hardware and software, web design, program applications and services. Our team's experience together with long-standing manufacturer relationships makes us the ideal partner.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  'IT Hardware & Software',
                  'Thermal Paper Products',
                  'Medical Supplies',
                  'Packaging Solutions',
                  'Import & Export',
                  'IT Consultancy'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0" size={18} />
                    <span className="font-medium text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="text-blue-600 font-semibold flex items-center hover:underline">
                Learn more about us
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business Divisions */}
      <section className="py-24 bg-slate-50 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Business Divisions"
            subtitle="Operating across diverse industries with specialized products and technical expertise."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'IT & Technology', desc: 'Hardware, software, networking solutions and IT consultancy for modern enterprises.', icon: 'Laptop', color: 'bg-blue-600', link: '/products' },
              { title: 'Paper Products', desc: 'Thermal rolls, labels, carbonless paper and POS printers for all industries.', icon: 'FileText', color: 'bg-emerald-600', link: '/products' },
              { title: 'Medical Supplies', desc: 'Patient ID wristbands, PPE clothing and hospital consumables for healthcare.', icon: 'Activity', color: 'bg-rose-600', link: '/products' },
              { title: 'Packaging Solutions', desc: 'Heavy-duty strapping, stretch film, strapping tools and adhesive tapes.', icon: 'Package', color: 'bg-amber-600', link: '/products' }
            ].map((sector, i) => {
              const Icon = (Icons as any)[sector.icon];
              return (
                <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-14 h-14 ${sector.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{sector.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{sector.desc}</p>
                  <Link to={sector.link} className="text-blue-600 text-sm font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                    View Products <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Products"
            subtitle="Explore our wide range of high-quality products across multiple categories."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/products" className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all">
              View All Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-slate-50 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Unlocking the Power of Our Services"
            subtitle="We provide comprehensive IT solutions tailored to your business needs, from hardware supply to technical support."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center text-blue-600 font-semibold hover:underline">
              View All Services <ArrowRight className="ml-1" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                title="Why Choose Diyar?"
                subtitle="We deliver the best in everything from IT to customer services, with a global perspective and a passion to innovate."
                centered={false}
                light={true}
              />
              <div className="space-y-8 mt-12">
                {[
                  { icon: ShieldCheck, title: 'Genuine Warranties', desc: 'All our products are backed by genuine warranties with quick recovery from any component failure.' },
                  { icon: Truck, title: 'Guaranteed Delivery', desc: 'We guarantee our deliveries on the back of our proven track record and logistics expertise.' },
                  { icon: Award, title: 'Quality Products', desc: 'Genuine best quality items sourced directly from manufacturers keeping pace with innovation.' },
                  { icon: Clock, title: 'Quick Support', desc: 'Our technicians resolve any reported hardware and software issues quickly and efficiently.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-1 rounded-3xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80"
                alt="Support Team"
                className="rounded-3xl w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Technology Partners"
            subtitle="We are proud to partner with world-renowned technology brands to deliver the best solutions to our clients."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {[
              { name: 'Microsoft', color: 'bg-[#F25022]', text: 'MS' },
              { name: 'Adobe', color: 'bg-[#FF0000]', text: 'Ae' },
              { name: 'Autodesk', color: 'bg-[#0696D7]', text: 'Au' },
              { name: 'Kaspersky', color: 'bg-[#006D5B]', text: 'KL' },
              { name: 'ESET', color: 'bg-[#1A9E3F]', text: 'ES' },
              { name: 'Norton', color: 'bg-[#FDB714]', text: 'No' },
            ].map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className={`w-14 h-14 ${partner.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                  <span className="text-white font-bold text-lg">{partner.text}</span>
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Get in touch with our experts today for a customized solution that fits your specific needs.
          </p>
          <Link to="/contact" className="inline-flex items-center bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl">
            Get in Touch
            <ArrowRight className="ml-2" size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};
