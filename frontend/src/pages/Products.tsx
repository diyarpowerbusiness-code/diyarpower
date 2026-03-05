import React from 'react';
import { SectionHeader, ProductCard } from '../components/UI';
import { PRODUCTS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

export const Products = () => {
  const productList = PRODUCTS || [];

  const categorySections = [
    {
      title: 'IT Hardware & Software',
      desc: 'Desktops, laptops, printers, monitors, networking, and genuine software licenses.',
      images: productList
        .filter((p) => p.category === 'IT Hardware & Software')
        .map((p) => ({ src: p.image, alt: p.name }))
    },
    {
      title: 'Paper Products',
      desc: 'Thermal rolls, labels, carbonless paper, and POS printers.',
      images: [
        { src: '/assets/docx/image9.png', alt: 'Receipt printer' },
        { src: '/assets/docx/image10.png', alt: 'Label printer' }
      ]
    },
    {
      title: 'Medical Supplies',
      desc: 'Patient ID wristbands, PPE clothing, and hospital consumables.',
      images: [
        { src: '/assets/docx/image11.png', alt: 'Patient ID wristbands' },
        { src: '/assets/docx/image12.jpeg', alt: 'Mother infant wristband' },
        { src: '/assets/docx/image13.jpeg', alt: 'RFID wristband' },
        { src: '/assets/docx/image14.jpeg', alt: 'QR wristband' }
      ]
    },
    {
      title: 'Packaging Solutions',
      desc: 'Strapping systems, tools, stretch film, and adhesive tapes.',
      images: [
        '/assets/docx/image29.jpeg',
        '/assets/docx/image30.jpeg',
        '/assets/docx/image31.jpeg',
        '/assets/docx/image32.jpeg',
        '/assets/docx/image33.jpeg',
        '/assets/docx/image34.jpeg',
        '/assets/docx/image35.jpeg',
        '/assets/docx/image36.jpeg',
        '/assets/docx/image37.jpeg',
        '/assets/docx/image38.jpeg',
        '/assets/docx/image39.jpeg',
        '/assets/docx/image42.jpeg',
        '/assets/docx/image43.jpeg',
        '/assets/docx/image44.jpeg',
        '/assets/docx/image45.jpeg',
        '/assets/docx/image46.jpeg',
        '/assets/docx/image47.jpeg',
        '/assets/docx/image48.jpeg',
        '/assets/docx/image49.jpeg',
        '/assets/docx/image50.jpeg',
        '/assets/docx/image51.jpeg',
        '/assets/docx/image52.jpeg',
        '/assets/docx/image53.jpeg',
        '/assets/docx/image54.jpeg',
        '/assets/docx/image55.jpeg',
        '/assets/docx/image56.jpeg'
      ].map((src) => ({ src, alt: 'Packaging solutions' }))
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-primary py-16 md:py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" alt="Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6">Our Products</h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Hardware & Software Solutions, Paper Products, Medical Supplies, and Packaging Materials — all under one roof.
          </p>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-12 md:py-16 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categorySections.map((section) => {
            const productsInCategory = productList.filter((p) => p.category === section.title);
            return (
              <div key={section.title} className="mb-16">
                <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-primary mb-2">{section.title}</h3>
                    <p className="text-sm text-slate-600">{section.desc}</p>
                  </div>
                </div>

                {productsInCategory.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
                    {productsInCategory.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                  {section.images.map((img, idx) => (
                    <div key={`${section.title}-${idx}`} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-3 sm:p-4">
                      <div className="aspect-[4/3] bg-white rounded-xl overflow-hidden">
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-center" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Product Info Banner */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/20 skew-x-12 transform translate-x-1/2" />
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Quality Solutions for Every Industry
              </h2>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                We provide original best quality hardware with minimum 2-year manufacturer warranty and premium software applications. All our products are genuine and sourced directly from manufacturers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Genuine Manufacturer Warranties',
                  'Expert Technical Support',
                  'BPA-Free Paper Products',
                  'Heavy-Duty Packaging Tools',
                  'Global Logistics & On-time Delivery',
                  'Customized Business Solutions'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-blue-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
